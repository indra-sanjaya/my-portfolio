'use client';

import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LANG, isLang, type Lang } from '@/lib/article-i18n';

const STORAGE_KEY = 'article-lang';
const EVENT = 'article-lang-change';

function read(): Lang {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && isLang(value) ? value : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function saveArticleLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage can be blocked; the choice then lasts for this page view only */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** The reader's preferred article language. Starts as English so server and client markup match. */
export function useArticleLang(): [Lang, (lang: Lang) => void] {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const sync = () => setLang(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const update = useCallback((next: Lang) => {
    setLang(next);
    saveArticleLang(next);
  }, []);

  return [lang, update];
}
