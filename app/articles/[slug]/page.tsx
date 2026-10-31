import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { ArticleView } from '@/components/articles/article-view';
import { buildArticleMetadata } from '@/components/articles/article-metadata';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return article ? buildArticleMetadata(article) : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleView article={article} />;
}
