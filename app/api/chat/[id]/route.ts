import { personas } from "@/lib/personas";
import { createPersonaSystemPrompt } from "@/lib/prompts";
import { tools } from "@/lib/tools";
import { google } from "@ai-sdk/google";

import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { messages } = await req.json();
  const { id } = await params;

  const result = streamText({
    system: createPersonaSystemPrompt(personas[id]),
    maxSteps: 3,
    model: google("gemini-2.5-flash-preview-04-17"),
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}
