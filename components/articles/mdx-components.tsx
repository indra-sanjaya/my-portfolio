import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { ArticleImage } from './article-image';
import { ArticleLink } from './article-link';
import { CodeFigcaption, CodeFigure, InlineOrBlockCode } from './code-block';
import { PullQuote } from './pull-quote';
import { RagArchitectureDiagram } from './rag-architecture-diagram';
import { PathSeparatorDiagram } from './path-separator-diagram';
import { SectionHeading2, SectionHeading3 } from './section-heading';

export const articleMdxComponents: NonNullable<MDXRemoteProps['components']> = {
  h2: SectionHeading2,
  h3: SectionHeading3,
  a: ArticleLink,
  img: ArticleImage,
  code: InlineOrBlockCode,
  figure: CodeFigure,
  figcaption: CodeFigcaption,
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote {...props} className="my-6 border-l-2 border-hazard/50 pl-4 text-muted-foreground italic" />
  ),
  p: (props: React.ComponentProps<'p'>) => <p {...props} className="my-5 leading-relaxed text-foreground/90" />,
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul {...props} className="my-5 ml-5 list-disc space-y-2 text-foreground/90" />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol {...props} className="my-5 ml-5 list-decimal space-y-2 text-foreground/90" />
  ),
  li: (props: React.ComponentProps<'li'>) => <li {...props} className="leading-relaxed" />,
  hr: () => <hr className="my-12 border-border" />,
  strong: (props: React.ComponentProps<'strong'>) => <strong {...props} className="font-semibold text-foreground" />,
  table: (props: React.ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table {...props} className="w-full border-collapse font-mono text-sm" />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th
      {...props}
      className="border-b border-border bg-muted px-3 py-2 text-left text-xs tracking-wide text-muted-foreground uppercase"
    />
  ),
  td: (props: React.ComponentProps<'td'>) => <td {...props} className="border-b border-border/60 px-3 py-2" />,
  PullQuote,
  RagArchitectureDiagram,
  PathSeparatorDiagram,
};
