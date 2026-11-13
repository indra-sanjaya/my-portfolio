'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { LANG_LOCALE, UI } from '@/lib/article-i18n';
import type { LocalizedArticle } from '@/lib/articles';
import { useArticleLang, saveArticleLang } from '@/hooks/use-article-lang';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { ListLanguageSwitch } from '@/components/articles/language-switch';
import { localizeArticles } from '@/components/articles/localize';
import { TagChip } from '@/components/articles/tag-chip';

const MAX_ARTICLES = 4;
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const ACCENTS = ['#F97316', '#0EA5E9', '#10B981', '#8B5CF6'];

export function ArticlesSection({ articles }: { articles: LocalizedArticle[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { duration, durationFast, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;
  const [lang, setLang] = useArticleLang();
  const t = UI[lang];

  if (articles.length === 0) return null;

  const listed = localizeArticles(articles, lang).slice(0, MAX_ARTICLES);

  return (
    <motion.section
      id="articles"
      ref={ref}
      className="section-y section-padding scroll-mt-28"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration }}>
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: durationFast }}
          className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-eyebrow">{t.homeEyebrow}</span>
            <h2 className="section-title mt-4">{t.homeTitle}</h2>
            <motion.div
              className="mt-4 flex h-1 w-32 origin-left overflow-hidden rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: k * 1, delay: k * 0.3, ease: EASE }}
              aria-hidden="true"
            >
              {ACCENTS.map((color) => (
                <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
              ))}
            </motion.div>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{t.homeSubtitle}</p>
          </div>
          <ListLanguageSwitch current={lang} onChange={setLang} />
        </motion.div>

        <ul className="grid gap-5 md:grid-cols-2">
          {listed.map((article, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            return (
            <motion.li
              key={article.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0, y: 34 },
                visible: { opacity: 1, y: 0, transition: { duration: durationFast, delay: (index % 2) * 0.12, ease: EASE } },
              }}
              style={{ ['--accent' as string]: accent }}>
              <Link
                href={article.href ?? `/articles/${article.slug}`}
                onClick={() => saveArticleLang(lang)}
                className="blueprint-grid group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-[var(--accent)]/50 sm:p-8">
                {/* accent line that fills left to right */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: `${accent}26` }}>
                  <motion.span
                    className="block h-full origin-left"
                    style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}99` }}
                    variants={{
                      hidden: { scaleX: 0 },
                      visible: { scaleX: 1, transition: { duration: k * 1.4, delay: k * 0.25, ease: EASE } },
                    }}
                  />
                </span>
                <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString(LANG_LOCALE[lang], {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                    {' · '}
                    {article.readTime} {t.minRead}
                  </span>
                  {article.onlyEnglish && (
                    <span className="rounded border border-border px-1.5 py-0.5 text-[10px] tracking-wider uppercase">
                      {t.onlyEnglish}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-balance text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <TagChip key={tag} label={tag} />
                    ))}
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                </div>
              </Link>
            </motion.li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95">
            {t.viewAll}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
