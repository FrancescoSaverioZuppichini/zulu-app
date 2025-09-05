import { getUserMission, saveUserChat } from "@/lib/crud";
import { personas } from "@/lib/personas";
import { createPersonaSystemPrompt } from "@/lib/prompts";
import { tools } from "@/lib/tools";
import { google } from "@ai-sdk/google";

import { convertToModelMessages, hasToolCall, streamText, UIMessage } from "ai";
import { NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { Mission } from "@/types/types";
import { missions } from "@/lib/missions";
import { auth } from "@/lib/auth";
import { getUserActiveMissions } from "@/lib/utils";
import { MyUIMessage } from "@/lib/types";



export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ contactId: string }> }
) {
  const { messages }: { messages: MyUIMessage[] } = await req.json();

  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorize" }, { status: 403 })
  const { contactId } = await params;
  const userId = session.user.name || "unknown"

  const completedMissionsIds = await getUserMission(userId, contactId)
  const userMissions = missions[userId]
  let activeMissions = getUserActiveMissions(userMissions, completedMissionsIds)
  console.log("[chat] activeMissions", activeMissions)
  console.log("[chat] completedMissionsIds", completedMissionsIds)
  console.log(messages)
  // google("gemini-2.5-flash-preview-04-17"),
  const result = streamText({
    system: createPersonaSystemPrompt(personas[contactId], activeMissions),
    stopWhen: hasToolCall('introduce_next_missions'),
    // model: openai("gpt-4o-mini"),
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    tools: { mission_tracker: tools.mission_tracker(userId, contactId, completedMissionsIds), introduce_next_missions: tools.introduce_next_missions },
    onError: (err) => console.error(err),
  });


  return result.toUIMessageStreamResponse<MyUIMessage>({
    originalMessages: messages, onFinish: async ({ messages }) => {
      await saveUserChat(
        session?.user?.name || "unknown",
        contactId,
        messages
      );
    }
  });
}
