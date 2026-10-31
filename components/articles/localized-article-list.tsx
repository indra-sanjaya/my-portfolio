'use client';

import { articlePath, DEFAULT_LANG, UI } from '@/lib/article-i18n';
import type { LocalizedArticle } from '@/lib/articles';
import { useArticleLang } from '@/hooks/use-article-lang';
import { ArticleLedger } from './article-ledger';
import { FeaturedEntry, type ListedArticle } from './featured-entry';
import { ListLanguageSwitch } from './language-switch';

/**
 * The /articles index. Titles, descriptions and links follow the reader's
 * language; an article with no translation falls back to English and says so.
 */
export function LocalizedArticleList({
  articles,
  featuredSlug,
}: {
  articles: LocalizedArticle[];
  featuredSlug: string | null;
}) {
  const [lang, setLang] = useArticleLang();
  const t = UI[lang];

  const listed: ListedArticle[] = articles.map((article) => {
    const translation = article.translations[lang];
    const effective = translation ? lang : DEFAULT_LANG;
    return {
      ...article,
      ...(translation ?? article.translations[DEFAULT_LANG]),
      href: articlePath(article.slug, effective),
      onlyEnglish: lang !== DEFAULT_LANG && !translation,
    };
  });

  const featured = listed.find((article) => article.slug === featuredSlug) ?? null;
  const rest = featured ? listed.filter((article) => article.slug !== featured.slug) : listed;

  return (
    <>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-hazard uppercase">{t.fieldLog}</p>
          <h1 className="font-sans text-4xl font-black tracking-tight sm:text-5xl">{t.articles}</h1>
        </div>
        <ListLanguageSwitch current={lang} onChange={setLang} />
      </div>

      {listed.length === 0 && <p className="text-muted-foreground">{t.empty}</p>}

      {featured && (
        <div className="mb-10">
          <FeaturedEntry article={featured} lang={lang} />
        </div>
      )}

      {rest.length > 0 && <ArticleLedger articles={rest} lang={lang} />}
    </>
  );
}
