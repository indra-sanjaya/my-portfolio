import type { Metadata } from 'next';
import { getAllLocalizedArticles, getFeaturedArticle } from '@/lib/articles';
import { LocalizedArticleList } from '@/components/articles/localized-article-list';

export const metadata: Metadata = {
  title: 'Articles | Indra Sanjaya',
  description:
    'Technical field notes on backend engineering, AI systems, and real debugging stories — written by a software developer with an engineering background.',
};

export default function ArticlesPage() {
  const articles = getAllLocalizedArticles();
  const featured = getFeaturedArticle();

  return (
    <div className="content-container section-padding py-28 sm:py-36">
      <LocalizedArticleList articles={articles} featuredSlug={featured?.slug ?? null} />
    </div>
  );
}
