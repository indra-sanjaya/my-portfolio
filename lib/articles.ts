import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DEFAULT_AUTHOR, SITE_URL } from '@/lib/site-config';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const WORDS_PER_MINUTE = 200;

export type ArticleFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readTime?: number;
  author?: string;
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  ogImage?: string;
};

export type ArticleMeta = ArticleFrontmatter & {
  slug: string;
  url: string;
  author: string;
  readTime: number;
};

export type Article = ArticleMeta & {
  content: string;
};

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function listArticleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.mdx'));
}

function readArticleFile(filename: string): Article {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

  return {
    ...frontmatter,
    slug,
    url: `${SITE_URL}/articles/${slug}`,
    author: frontmatter.author ?? DEFAULT_AUTHOR,
    readTime: frontmatter.readTime ?? estimateReadTime(content),
    content,
  };
}

function isPublished(article: Article): boolean {
  return process.env.NODE_ENV !== 'production' || !article.draft;
}

function byPublishedDateDesc(a: Article, b: Article): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getAllArticles(): Article[] {
  return listArticleFiles().map(readArticleFile).filter(isPublished).sort(byPublishedDateDesc);
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getArticleBySlug(slug: string): Article | null {
  const filename = `${slug}.mdx`;
  if (!listArticleFiles().includes(filename)) return null;

  const article = readArticleFile(filename);
  return isPublished(article) ? article : null;
}

export function getFeaturedArticle(): Article | null {
  const articles = getAllArticles();
  if (articles.length === 0) return null;
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getArticleChatSummaries(): Pick<ArticleMeta, 'title' | 'description' | 'tags' | 'url'>[] {
  return getAllArticles().map(({ title, description, tags, url }) => ({ title, description, tags, url }));
}
