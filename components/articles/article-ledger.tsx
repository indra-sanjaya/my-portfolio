import type { ArticleMeta } from '@/lib/articles';
import { LedgerRow } from './ledger-row';

export function ArticleLedger({ articles }: { articles: ArticleMeta[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border font-mono text-sm">
      <div className="hidden grid-cols-[3rem_1fr_auto_auto] gap-4 border-b border-border bg-muted/40 px-4 py-2 text-xs tracking-wider text-muted-foreground uppercase sm:grid">
        <span>No.</span>
        <span>Title</span>
        <span>Date</span>
        <span>Read</span>
      </div>
      <div className="divide-y divide-border">
        {articles.map((article, index) => (
          <LedgerRow key={article.slug} article={article} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
