import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { buildSystemPrompt } from '@/lib/chat/context';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-3.6-flash'),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
    temperature: 0.4,
  });

  return result.toUIMessageStreamResponse();
}
