import { getUserMission, saveUserChat } from "@/lib/crud";
import { personas } from "@/lib/personas";
import { createPersonaSystemPrompt } from "@/lib/prompts";
import { tools } from "@/lib/tools";
import { google } from "@ai-sdk/google";

import { appendResponseMessages, streamText } from "ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ contactId: string }> }
) {
  const { messages } = await req.json();
  const session = await getServerSession()
  if (!session?.user) return NextResponse.json({ error: "Unauthorize" }, { status: 403 })
  const { contactId } = await params;
  const userId = session.user.name || "unknown"

  const missions = await getUserMission(userId, contactId)
  console.log("user missions", missions)

  const result = streamText({
    system: createPersonaSystemPrompt(personas[contactId]),
    maxSteps: 6,
    model: google("gemini-2.5-flash-preview-04-17"),
    messages,
    tools: tools(userId, contactId, missions),
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
