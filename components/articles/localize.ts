import { articlePath, DEFAULT_LANG, type Lang } from '@/lib/article-i18n';
import type { LocalizedArticle } from '@/lib/articles';
import type { ListedArticle } from './featured-entry';

/** Resolve each article to the reader's language, falling back to English when no translation exists. */
export function localizeArticles(articles: LocalizedArticle[], lang: Lang): ListedArticle[] {
  return articles.map((article) => {
    const translation = article.translations[lang];
    const effective = translation ? lang : DEFAULT_LANG;
    return {
      ...article,
      ...(translation ?? article.translations[DEFAULT_LANG]),
      href: articlePath(article.slug, effective),
      onlyEnglish: lang !== DEFAULT_LANG && !translation,
    };
  });
}
