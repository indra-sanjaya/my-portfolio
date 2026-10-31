import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DEFAULT_LANG, isLang } from '@/lib/article-i18n';
import { getAllArticleVariants, getArticleBySlug } from '@/lib/articles';
import { ArticleView } from '@/components/articles/article-view';
import { buildArticleMetadata } from '@/components/articles/article-metadata';

type Params = Promise<{ slug: string; lang: string }>;

// Only translations are generated here; English lives at /articles/[slug].
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticleVariants().filter(({ lang }) => lang !== DEFAULT_LANG);
}

async function load(params: Params) {
  const { slug, lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) return null;
  return getArticleBySlug(slug, lang);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = await load(params);
  return article ? buildArticleMetadata(article) : {};
}

export default async function TranslatedArticlePage({ params }: { params: Params }) {
  const article = await load(params);
  if (!article) notFound();

  return <ArticleView article={article} />;
}
