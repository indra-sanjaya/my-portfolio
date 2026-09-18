'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'What projects has Indra built?',
  'Tell me about the AI integrations',
  'Is Indra a fit for a full-stack role?',
];

const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const BARE_URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function LinkifiedUrl({ url, keyPrefix }: { url: string; keyPrefix: string }) {
  const trimmed = url.replace(/[)\].,!?;:]+$/, '');
  const trailing = url.slice(trimmed.length);
  return (
    <span key={keyPrefix}>
      <a
        href={trimmed}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-hazard">
        {trimmed}
      </a>
      {trailing}
    </span>
  );
}

function linkifyBareUrls(text: string, keyPrefix: string): React.ReactNode[] {
  return text
    .split(BARE_URL_PATTERN)
    .map((segment, i) =>
      /^https?:\/\//.test(segment) ?
        <LinkifiedUrl key={`${keyPrefix}-${i}`} url={segment} keyPrefix={`${keyPrefix}-${i}`} />
      : segment,
    );
}

function linkifyText(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  MARKDOWN_LINK_PATTERN.lastIndex = 0;

  while ((match = MARKDOWN_LINK_PATTERN.exec(text)) !== null) {
    const [full, label, url] = match;
    if (match.index > lastIndex) {
      nodes.push(...linkifyBareUrls(text.slice(lastIndex, match.index), `${keyPrefix}-pre${i}`));
    }
    nodes.push(
      <a
        key={`${keyPrefix}-md${i}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-hazard">
        {label}
      </a>,
    );
    lastIndex = match.index + full.length;
    i += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(...linkifyBareUrls(text.slice(lastIndex), `${keyPrefix}-post`));
  }

  return nodes;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const submitMessage = (text: string) => {
    if (!text.trim() || isLoading) return;
    sendMessage({ text });
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[min(92vw,380px)] h-[min(70vh,540px)] rounded-2xl flex flex-col overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 20px 60px -20px rgba(0,0,0,0.5), 0 1.5px 0 rgba(255,255,255,0.4) inset',
            }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">Ask about Indra</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
                aria-label="Close chat">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ask me anything about Indra's projects, skills, or experience — or paste a job description and I'll
                    tell you if it's a fit.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => submitMessage(prompt)}
                        className="text-left text-xs px-3 py-2 rounded-xl border border-border/40 bg-background/40 text-muted-foreground hover:bg-background/60 hover:text-foreground transition-colors">
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user' ?
                        'bg-foreground text-background rounded-br-sm'
                      : 'bg-background/60 border border-border/40 text-foreground rounded-bl-sm'
                    }`}>
                    {m.parts.map((part, i) =>
                      part.type === 'text' ?
                        <span key={i}>{linkifyText(part.text, `${m.id}-${i}`)}</span>
                      : null,
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm px-3.5 py-2.5 bg-background/60 border border-border/40">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3 border-t border-white/10 shrink-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
                placeholder="Ask a question, or paste a job description..."
                rows={1}
                className="flex-1 resize-none bg-background/50 border border-border/40 rounded-2xl px-4 py-2 text-sm outline-none focus:border-primary/40 text-foreground placeholder:text-muted-foreground max-h-32 overflow-y-auto"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="shrink-0 rounded-full p-2.5 bg-foreground text-background disabled:opacity-40 transition-opacity"
                aria-label="Send message">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
        }}
        aria-label="Toggle chat">
        <AnimatePresence mode="wait">
          {open ?
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
              <X className="h-5 w-5 text-white" />
            </motion.div>
          : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
              <MessageCircle className="h-5 w-5 text-white" />
            </motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
