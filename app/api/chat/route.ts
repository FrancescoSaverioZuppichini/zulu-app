import { google } from '@ai-sdk/google';

import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash-preview-05-20'),
    messages,
  });

  return result.toDataStreamResponse();
}