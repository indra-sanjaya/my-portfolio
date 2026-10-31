import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { articlePath } from '@/lib/article-i18n';
import { SITE_URL } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/articles`, lastModified: new Date() },
    ...articles.flatMap((article) =>
      article.availableLanguages.map((lang) => ({
        url: `${SITE_URL}${articlePath(article.slug, lang)}`,
        lastModified: new Date(article.updatedAt ?? article.publishedAt),
      })),
    ),
  ];
}
