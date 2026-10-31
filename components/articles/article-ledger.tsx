import { UI, type Lang } from '@/lib/article-i18n';
import type { ListedArticle } from './featured-entry';
import { LedgerRow } from './ledger-row';

export function ArticleLedger({ articles, lang = 'en' }: { articles: ListedArticle[]; lang?: Lang }) {
  const t = UI[lang];
  return (
    <div className="overflow-hidden rounded-lg border border-border font-mono text-sm">
      <div className="hidden grid-cols-[3rem_1fr_auto_auto] gap-4 border-b border-border bg-muted/40 px-4 py-2 text-xs tracking-wider text-muted-foreground uppercase sm:grid">
        <span>{t.no}</span>
        <span>{t.title}</span>
        <span>{t.date}</span>
        <span>{t.read}</span>
      </div>
      <div className="divide-y divide-border">
        {articles.map((article, index) => (
          <LedgerRow key={article.slug} article={article} index={index + 1} lang={lang} />
        ))}
      </div>
    </div>
  );
}
