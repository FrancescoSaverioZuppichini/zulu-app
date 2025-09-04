import { getUserMission, saveUserChat } from "@/lib/crud";
import { personas } from "@/lib/personas";
import { createPersonaSystemPrompt } from "@/lib/prompts";
import { tools } from "@/lib/tools";
import { google } from "@ai-sdk/google";

import { CoreMessage, streamText } from "ai";
import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { Mission } from "@/types/types";
import { missions } from "@/lib/missions";
import { auth } from "@/lib/auth";
import { getUserActiveMissions } from "@/lib/utils";

export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ contactId: string }> }
) {
  const { messages, data } = await req.json();
  const { imageUrl } = data ? JSON.parse(data.imageUrl) : { imageUrl: null };
  if (imageUrl) {
    const lastMessage = messages[messages.length - 1] as CoreMessage;
    messages[messages.length - 1] = {
      ...lastMessage,
      content: [
        {
          type: "text",
          text: lastMessage.content as string,
        },
        {
          type: "image",
          image: new URL(imageUrl),
        },
      ],
    };
  }

  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorize" }, { status: 403 });
  const { contactId } = await params;
  const userId = session.user.name || "unknown";

  const completedMissionsIds = await getUserMission(userId, contactId);
  const userMissions = missions[userId];
  let activeMissions = getUserActiveMissions(userMissions, completedMissionsIds);

  console.log("[chat] activeMissions", activeMissions);
  console.log("[chat] completedMissionsIds", completedMissionsIds);

  const result = streamText({
    system: createPersonaSystemPrompt(personas[contactId], activeMissions),
    maxSteps: 4,
    model: google("gemini-1.5-flash-latest"),
    messages,
    tools: tools(userId, contactId, completedMissionsIds),
    async onFinish(result: any) {
      await saveUserChat(
        session?.user?.name || "unknown",
        contactId,
        result.messages
      );
    },
  });

  return result.toDataStreamResponse();
}
