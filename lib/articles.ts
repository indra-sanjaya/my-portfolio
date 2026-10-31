import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DEFAULT_AUTHOR, SITE_URL } from '@/lib/site-config';
import { articlePath, DEFAULT_LANG, LANGUAGES, type Lang } from '@/lib/article-i18n';

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
  lang: Lang;
  /** Every language this article exists in, English first. */
  availableLanguages: Lang[];
};

export type Article = ArticleMeta & {
  content: string;
};

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Translations live next to the English source: `<slug>.id.mdx`, `<slug>.gaul.mdx`.
// Only the English file is the "base" article; translations inherit its
// frontmatter (date, tags, images) and may override title/description.
const TRANSLATION_SUFFIX = new RegExp(`\\.(${LANGUAGES.filter((l) => l !== DEFAULT_LANG).join('|')})\\.mdx$`);

function listAllFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.mdx'));
}

function listArticleFiles(): string[] {
  return listAllFiles().filter((file) => !TRANSLATION_SUFFIX.test(file));
}

function filenameFor(slug: string, lang: Lang): string {
  return lang === DEFAULT_LANG ? `${slug}.mdx` : `${slug}.${lang}.mdx`;
}

function languagesFor(slug: string): Lang[] {
  const files = new Set(listAllFiles());
  return LANGUAGES.filter((lang) => files.has(filenameFor(slug, lang)));
}

function parseFile(filename: string) {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf8');
  return matter(raw);
}

function readArticleFile(filename: string, lang: Lang = DEFAULT_LANG): Article {
  const slug = filename.replace(/\.mdx$/, '');
  const base = parseFile(filename).data as ArticleFrontmatter;
  const source = parseFile(filenameFor(slug, lang));
  const own = source.data as Partial<ArticleFrontmatter>;
  const frontmatter = { ...base, ...own };

  return {
    ...frontmatter,
    slug,
    lang,
    availableLanguages: languagesFor(slug),
    url: `${SITE_URL}${articlePath(slug, lang)}`,
    author: frontmatter.author ?? DEFAULT_AUTHOR,
    // A translation never inherits the English read time; its word count differs.
    readTime: own.readTime ?? estimateReadTime(source.content),
    content: source.content,
  };
}

function isPublished(article: Article): boolean {
  return process.env.NODE_ENV !== 'production' || !article.draft;
}

function byPublishedDateDesc(a: Article, b: Article): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getAllArticles(): Article[] {
  return listArticleFiles().map((file) => readArticleFile(file)).filter(isPublished).sort(byPublishedDateDesc);
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getArticleBySlug(slug: string, lang: Lang = DEFAULT_LANG): Article | null {
  if (!listArticleFiles().includes(`${slug}.mdx`)) return null;
  if (!languagesFor(slug).includes(lang)) return null;

  const article = readArticleFile(`${slug}.mdx`, lang);
  return isPublished(article) ? article : null;
}

/** Every published (slug, lang) pair, for generateStaticParams and the sitemap. */
export function getAllArticleVariants(): { slug: string; lang: Lang }[] {
  return getAllArticles().flatMap((article) => article.availableLanguages.map((lang) => ({ slug: article.slug, lang })));
}

/** English article plus the title/description/read time of each translation, for the client-side list. */
export type LocalizedArticle = ArticleMeta & {
  translations: Partial<Record<Lang, Pick<ArticleMeta, 'title' | 'description' | 'readTime'>>>;
};

export function getAllLocalizedArticles(): LocalizedArticle[] {
  return getAllArticles().map((article) => {
    const translations: LocalizedArticle['translations'] = {};
    for (const lang of article.availableLanguages) {
      const v = lang === DEFAULT_LANG ? article : readArticleFile(`${article.slug}.mdx`, lang);
      translations[lang] = { title: v.title, description: v.description, readTime: v.readTime };
    }
    return { ...article, translations };
  });
}

export function getFeaturedArticle(): Article | null {
  const articles = getAllArticles();
  if (articles.length === 0) return null;
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getArticleChatSummaries(): Pick<ArticleMeta, 'title' | 'description' | 'tags' | 'url'>[] {
  return getAllArticles().map(({ title, description, tags, url }) => ({ title, description, tags, url }));
}
