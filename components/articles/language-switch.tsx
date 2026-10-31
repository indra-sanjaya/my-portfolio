'use client';

import Link from 'next/link';
import { Languages } from 'lucide-react';
import { articlePath, LANG_LABELS, LANGUAGES, UI, type Lang } from '@/lib/article-i18n';
import { saveArticleLang } from '@/hooks/use-article-lang';

const itemClass = (active: boolean, disabled = false) =>
  [
    'rounded-md px-3 py-1.5 font-mono text-xs tracking-wider whitespace-nowrap transition-colors',
    active
      ? 'bg-hazard text-hazard-foreground'
      : disabled
        ? 'cursor-not-allowed text-muted-foreground/40'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  ].join(' ');

const wrapperClass = 'inline-flex items-center gap-1 rounded-lg border border-border bg-card/60 p-1 backdrop-blur';

function Label({ lang }: { lang: Lang }) {
  return (
    <>
      <Languages className="mx-1.5 size-3.5 text-muted-foreground" aria-hidden />
      <span className="sr-only">{UI[lang].language}</span>
    </>
  );
}

/** Switcher for a single article page: each option is a real link, so every language has its own URL. */
export function ArticleLanguageSwitch({
  slug,
  current,
  available,
}: {
  slug: string;
  current: Lang;
  available: Lang[];
}) {
  return (
    <nav aria-label={UI[current].language} className={wrapperClass}>
      <Label lang={current} />
      {LANGUAGES.map((lang) => {
        const exists = available.includes(lang);
        if (!exists) {
          return (
            <span key={lang} className={itemClass(false, true)} aria-disabled="true" title={UI[current].onlyEnglish}>
              {LANG_LABELS[lang].short}
            </span>
          );
        }
        return (
          <Link
            key={lang}
            href={articlePath(slug, lang)}
            hrefLang={lang === 'gaul' ? 'id' : lang}
            lang={lang === 'gaul' ? 'id' : lang}
            aria-current={lang === current ? 'page' : undefined}
            title={LANG_LABELS[lang].full}
            onClick={() => saveArticleLang(lang)}
            className={itemClass(lang === current)}>
            {LANG_LABELS[lang].short}
          </Link>
        );
      })}
    </nav>
  );
}

/** Switcher for the article list: changes the preferred language in place. */
export function ListLanguageSwitch({ current, onChange }: { current: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div role="group" aria-label={UI[current].language} className={wrapperClass}>
      <Label lang={current} />
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          aria-pressed={lang === current}
          title={LANG_LABELS[lang].full}
          onClick={() => onChange(lang)}
          className={itemClass(lang === current)}>
          {LANG_LABELS[lang].short}
        </button>
      ))}
    </div>
  );
}
