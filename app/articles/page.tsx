import type { Metadata } from 'next';
import { getAllArticles, getFeaturedArticle } from '@/lib/articles';
import { ArticleLedger } from '@/components/articles/article-ledger';
import { FeaturedEntry } from '@/components/articles/featured-entry';

export const metadata: Metadata = {
  title: 'Articles | Indra Sanjaya',
  description:
    'Technical field notes on backend engineering, AI systems, and real debugging stories — written by a software developer with an engineering background.',
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const rest = featured ? articles.filter((article) => article.slug !== featured.slug) : articles;

  return (
    <div className="content-container section-padding py-28 sm:py-36">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-hazard uppercase">Field Log</p>
      <h1 className="mb-12 font-sans text-4xl font-black tracking-tight sm:text-5xl">Articles</h1>

      {articles.length === 0 && <p className="text-muted-foreground">No entries logged yet. Check back soon.</p>}

      {featured && (
        <div className="mb-10">
          <FeaturedEntry article={featured} />
        </div>
      )}

      {rest.length > 0 && <ArticleLedger articles={rest} />}
    </div>
  );
}
