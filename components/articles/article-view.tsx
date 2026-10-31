import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

import type { Article } from '@/lib/articles';
import { articleMdxComponents } from '@/components/articles/mdx-components';
import { ArticleHero } from '@/components/articles/article-hero';
import { ArticleLanguageSwitch } from '@/components/articles/language-switch';
import { ReadingProgressRuler } from '@/components/articles/reading-progress-ruler';

const CODE_THEME = { light: 'github-light', dark: 'github-dark' } as const;

/** Shared by the English page and the translated pages so they can never drift apart. */
export function ArticleView({ article }: { article: Article }) {
  return (
    <article lang={article.lang === 'gaul' ? 'id' : article.lang}>
      <ReadingProgressRuler />
      <ArticleHero
        title={article.title}
        author={article.author}
        publishedAt={article.publishedAt}
        readTime={article.readTime}
        tags={article.tags}
        lang={article.lang}
        switcher={
          article.availableLanguages.length > 1 ? (
            <ArticleLanguageSwitch
              slug={article.slug}
              current={article.lang}
              available={article.availableLanguages}
            />
          ) : undefined
        }
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
