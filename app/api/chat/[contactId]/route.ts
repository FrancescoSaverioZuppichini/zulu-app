import { getUserMission, saveUserChat } from "@/lib/crud";
import { personas } from "@/lib/personas";
import { createPersonaSystemPrompt } from "@/lib/prompts";
import { tools } from "@/lib/tools";
import { google } from "@ai-sdk/google";

import { appendResponseMessages, streamText } from "ai";
import { NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { Mission } from "@/types/types";
import { missions } from "@/lib/missions";
import { auth } from "@/lib/auth";


export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ contactId: string }> }
) {
  const { messages } = await req.json();
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorize" }, { status: 403 })
  const { contactId } = await params;
  const userId = session.user.name || "unknown"

  const completedMissions = await getUserMission(userId, contactId)
  const userMissions = missions[userId]
  let initialMissions: Mission[];
  if (completedMissions.length === 0) {
    initialMissions = userMissions.filter(mission => mission.required_missions.length === 0)
  }
  else {
    initialMissions = userMissions.filter(mission => {
      if (mission.required_missions.length === 0) return false
      return mission.required_missions.every(requiredId =>
        completedMissions.includes(requiredId) && !completedMissions.includes(mission.mission_id)
      );
    });
  }

  console.log("INITIAL completedMissions", initialMissions)

  console.log("user completedMissions", completedMissions)
  // google("gemini-2.5-flash-preview-04-17"),
  const result = streamText({
    system: createPersonaSystemPrompt(personas[contactId], initialMissions),
    maxSteps: 4,
    // model: openai("gpt-4o-mini"),
    model: google("gemini-2.5-flash-preview-04-17"),
    messages,
    tools: tools(userId, contactId, completedMissions),
    async onFinish({ response }) {
      await saveUserChat(
        session?.user?.name || "unknown",
        contactId,
        appendResponseMessages({
          messages,
          responseMessages: response.messages,
        }),
      );
    },
  });

  return result.toDataStreamResponse();
}
