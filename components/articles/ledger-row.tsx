import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';
import { TagChip } from './tag-chip';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export function LedgerRow({ article, index }: { article: ArticleMeta; index: number }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid grid-cols-[2.5rem_1fr] gap-3 px-4 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[3rem_1fr_auto_auto] sm:items-center sm:gap-4">
      <span className="text-muted-foreground">{String(index).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="block font-sans text-base font-semibold text-foreground group-hover:text-hazard sm:truncate">
          {article.title}
        </span>
        <span className="mt-1 block max-h-0 overflow-hidden font-sans text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100">
          {article.description}
        </span>
        <span className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
          {article.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </span>
      </span>
      <span className="hidden text-muted-foreground sm:block">{formatDate(article.publishedAt)}</span>
      <span className="hidden text-muted-foreground sm:block">{article.readTime} min</span>
    </Link>
  );
}
