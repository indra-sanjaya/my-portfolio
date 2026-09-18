import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/articles`, lastModified: new Date() },
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
    })),
  ];
}
