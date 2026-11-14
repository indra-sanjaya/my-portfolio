import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { buildSystemPrompt } from '@/lib/chat/context';

export const runtime = 'nodejs';
// Must stay above the total timeout below so we can answer with a clear error before the platform kills us.
export const maxDuration = 30;

const MODEL = 'gemini-3.6-flash';
// Keep the conversation short: the system prompt already carries everything the bot knows.
const MAX_HISTORY_MESSAGES = 12;

// Built once per server instance instead of re-reading the MDX files on every request.
let cachedSystemPrompt: string | undefined;
const getSystemPrompt = () => (cachedSystemPrompt ??= buildSystemPrompt());

const FRIENDLY_ERROR = 'The assistant is taking too long or is busy right now. Please try again in a moment.';

export async function POST(req: Request) {
  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('no messages');
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const result = streamText({
    model: google(MODEL),
    system: getSystemPrompt(),
    messages: await convertToModelMessages(messages.slice(-MAX_HISTORY_MESSAGES)),
    // Thinking tokens also count towards this limit, so it needs headroom above the visible answer.
    maxOutputTokens: 1024,
    temperature: 0.4,
    // Gemini 3 thinks at "high" by default, which can delay the first word by many seconds.
    // The answers come straight from the supplied profile data, so light reasoning is enough.
    providerOptions: { google: { thinkingConfig: { thinkingLevel: 'low' } } },
    maxRetries: 1,
    timeout: { firstChunkMs: 12_000, chunkMs: 10_000, totalMs: 20_000 },
    onError: ({ error }) => console.error('[chat] model error:', error),
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error('[chat] stream error:', error);
      return FRIENDLY_ERROR;
    },
  });
}
