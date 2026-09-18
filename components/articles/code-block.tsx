'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeFigure({ children, ...props }: React.ComponentProps<'figure'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = containerRef.current?.querySelector('pre')?.textContent ?? '';
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <figure
      {...props}
      className="group/listing relative my-8 overflow-hidden rounded-lg border border-border bg-card">
      <div ref={containerRef}>{children}</div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2.5 right-3 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover/listing:opacity-100 hover:text-hazard">
        {copied ?
          <Check className="h-3.5 w-3.5" />
        : <Copy className="h-3.5 w-3.5" />}
      </button>
    </figure>
  );
}

export function CodeFigcaption(props: React.ComponentProps<'figcaption'>) {
  return (
    <figcaption
      {...props}
      className="border-b border-border/60 bg-muted/40 px-4 py-2 pr-12 font-mono text-xs tracking-wider text-muted-foreground uppercase"
    />
  );
}

export function InlineOrBlockCode(props: React.ComponentProps<'code'> & { 'data-language'?: string }) {
  if (props['data-language'] !== undefined) {
    return <code {...props} />;
  }

  return (
    <code
      {...props}
      className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
    />
  );
}
