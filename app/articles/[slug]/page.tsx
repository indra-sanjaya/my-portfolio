import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { SITE_URL } from '@/lib/site-config';
import { articleMdxComponents } from '@/components/articles/mdx-components';
import { ArticleHero } from '@/components/articles/article-hero';
import { ReadingProgressRuler } from '@/components/articles/reading-progress-ruler';

const CODE_THEME = { light: 'github-light', dark: 'github-dark' } as const;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const image = article.ogImage ?? article.coverImage ?? '/og-image.png';
  const url = `${SITE_URL}/articles/${article.slug}`;

  return {
    title: `${article.title} | Indra Sanjaya`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article>
      <ReadingProgressRuler />
      <ArticleHero
        title={article.title}
        author={article.author}
        publishedAt={article.publishedAt}
        readTime={article.readTime}
        tags={article.tags}
      />
      <div className="content-container section-padding max-w-3xl py-12">
        <MDXRemote
          source={article.content}
          components={articleMdxComponents}
          options={{
            // Content is our own trusted local .mdx files, not user input — JS
            // expression props like `<PullQuote index={1}>` need blockJS off,
            // otherwise next-mdx-remote strips them and the prop comes through undefined.
            blockJS: false,
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, { theme: CODE_THEME }]],
            },
          }}
        />
      </div>
    </article>
  );
}
