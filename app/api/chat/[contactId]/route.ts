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

export const runtime = 'edge'

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

  const completedMissionsIds = await getUserMission(userId, contactId)
  const userMissions = missions[userId]
  let activeMissions: Mission[];
  if (completedMissionsIds.length === 0) {
    activeMissions = userMissions.filter(mission => mission.required_missions.length === 0)
  }
  else {
    activeMissions = userMissions.filter(mission => {
      if (mission.required_missions.length === 0) return false
      return mission.required_missions.every(requiredId =>
        completedMissionsIds.includes(requiredId) && !completedMissionsIds.includes(mission.mission_id)
      );
    });
  }

  console.log("[chat] activeMissions", activeMissions)
  console.log("[chat] completedMissionsIds", completedMissionsIds)
  // google("gemini-2.5-flash-preview-04-17"),
  const result = streamText({
    system: createPersonaSystemPrompt(personas[contactId], activeMissions),
    maxSteps: 4,
    // model: openai("gpt-4o-mini"),
    model: google("gemini-2.5-flash"),
    messages,
    tools: tools(userId, contactId, completedMissionsIds),
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
