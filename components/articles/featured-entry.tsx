import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';
import { LANG_LOCALE, UI, type Lang } from '@/lib/article-i18n';
import { TagChip } from './tag-chip';

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(LANG_LOCALE[lang], { year: 'numeric', month: 'short', day: '2-digit' });
}

export type ListedArticle = ArticleMeta & { href?: string; onlyEnglish?: boolean };

export function FeaturedEntry({ article, lang = 'en' }: { article: ListedArticle; lang?: Lang }) {
  const t = UI[lang];
  return (
    <Link
      href={article.href ?? `/articles/${article.slug}`}
      className="blueprint-grid group relative block overflow-hidden rounded-xl border border-border p-8 transition-colors hover:border-hazard/50 sm:p-12">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-hazard uppercase">{t.latestEntry}</p>
      <h2 className="max-w-3xl text-balance font-sans text-3xl leading-tight font-black tracking-tight sm:text-5xl">
        {article.title}
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">{article.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
        <span>{formatDate(article.publishedAt, lang)}</span>
        {article.onlyEnglish && (
          <span className="rounded border border-border px-1.5 py-0.5 text-[10px] tracking-wider uppercase">{t.onlyEnglish}</span>
        )}
        <span>·</span>
        <span>{article.readTime} {t.minRead}</span>
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
