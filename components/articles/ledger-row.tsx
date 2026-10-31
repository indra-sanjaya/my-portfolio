import Link from 'next/link';
import { LANG_LOCALE, UI, type Lang } from '@/lib/article-i18n';
import type { ListedArticle } from './featured-entry';
import { TagChip } from './tag-chip';

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(LANG_LOCALE[lang], { year: 'numeric', month: 'short', day: '2-digit' });
}

export function LedgerRow({ article, index, lang = 'en' }: { article: ListedArticle; index: number; lang?: Lang }) {
  const t = UI[lang];
  return (
    <Link
      href={article.href ?? `/articles/${article.slug}`}
      className="group grid grid-cols-[2.5rem_1fr] gap-3 px-4 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[3rem_1fr_auto_auto] sm:items-center sm:gap-4">
      <span className="text-muted-foreground">{String(index).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="block font-sans text-base font-semibold text-foreground group-hover:text-hazard sm:truncate">
          {article.title}
          {article.onlyEnglish && (
            <span className="ml-2 rounded border border-border px-1.5 py-0.5 align-middle font-mono text-[10px] font-normal tracking-wider text-muted-foreground uppercase">
              {t.onlyEnglish}
            </span>
          )}
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
      <span className="hidden text-muted-foreground sm:block">{formatDate(article.publishedAt, lang)}</span>
      <span className="hidden text-muted-foreground sm:block">{article.readTime} {t.min}</span>
    </Link>
  );
}
