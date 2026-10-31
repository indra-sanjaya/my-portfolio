import type { Metadata } from 'next';
import { articlePath, type Lang } from '@/lib/article-i18n';
import type { Article } from '@/lib/articles';
import { SITE_URL } from '@/lib/site-config';

/**
 * Per-language metadata. Each language is its own canonical URL. hreflang can
 * only express "en" and "id", so the casual Indonesian version is deliberately
 * left out of `languages` and stands on its own canonical.
 */
export function buildArticleMetadata(article: Article): Metadata {
  const image = article.ogImage ?? article.coverImage ?? '/og-image.png';
  const url = `${SITE_URL}${articlePath(article.slug, article.lang)}`;
  const languages: Record<string, string> = {};
  for (const lang of article.availableLanguages as Lang[]) {
    if (lang !== 'gaul') languages[lang] = `${SITE_URL}${articlePath(article.slug, lang)}`;
  }
  languages['x-default'] = `${SITE_URL}${articlePath(article.slug, 'en')}`;

  return {
    title: `${article.title} | Indra Sanjaya`,
    description: article.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
      locale: article.lang === 'en' ? 'en_US' : 'id_ID',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
      authors: [article.author],
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}
