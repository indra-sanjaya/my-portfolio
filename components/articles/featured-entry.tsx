import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';
import { TagChip } from './tag-chip';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export function FeaturedEntry({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="blueprint-grid group relative block overflow-hidden rounded-xl border border-border p-8 transition-colors hover:border-hazard/50 sm:p-12">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-hazard uppercase">Latest Entry</p>
      <h2 className="max-w-3xl text-balance font-sans text-3xl leading-tight font-black tracking-tight sm:text-5xl">
        {article.title}
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">{article.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
        <span>{formatDate(article.publishedAt)}</span>
        <span>·</span>
        <span>{article.readTime} min read</span>
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
