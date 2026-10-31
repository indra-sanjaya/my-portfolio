export const LANGUAGES = ['en', 'id', 'gaul'] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = 'en';

export function isLang(value: string): value is Lang {
  return (LANGUAGES as readonly string[]).includes(value);
}

/** Short label shown on the switcher, plus the accessible full name. */
export const LANG_LABELS: Record<Lang, { short: string; full: string }> = {
  en: { short: 'ENG', full: 'English' },
  id: { short: 'ID', full: 'Bahasa Indonesia' },
  gaul: { short: 'ID GAUL', full: 'Bahasa Indonesia (gaul)' },
};

/** `lang` attribute / date locale. Both Indonesian variants are `id`. */
export const LANG_LOCALE: Record<Lang, string> = { en: 'en-US', id: 'id-ID', gaul: 'id-ID' };

export function articlePath(slug: string, lang: Lang): string {
  return lang === DEFAULT_LANG ? `/articles/${slug}` : `/articles/${slug}/${lang}`;
}

type UiStrings = {
  fieldLog: string;
  articles: string;
  latestEntry: string;
  author: string;
  published: string;
  readTime: string;
  tags: string;
  minRead: string;
  min: string;
  no: string;
  title: string;
  date: string;
  read: string;
  empty: string;
  language: string;
  onlyEnglish: string;
};

export const UI: Record<Lang, UiStrings> = {
  en: {
    fieldLog: 'Field Log',
    articles: 'Articles',
    latestEntry: 'Latest Entry',
    author: 'Author',
    published: 'Published',
    readTime: 'Read Time',
    tags: 'Tags',
    minRead: 'min read',
    min: 'min',
    no: 'No.',
    title: 'Title',
    date: 'Date',
    read: 'Read',
    empty: 'No entries logged yet. Check back soon.',
    language: 'Language',
    onlyEnglish: 'EN only',
  },
  id: {
    fieldLog: 'Catatan Lapangan',
    articles: 'Artikel',
    latestEntry: 'Tulisan Terbaru',
    author: 'Penulis',
    published: 'Terbit',
    readTime: 'Waktu Baca',
    tags: 'Tag',
    minRead: 'menit baca',
    min: 'mnt',
    no: 'No.',
    title: 'Judul',
    date: 'Tanggal',
    read: 'Baca',
    empty: 'Belum ada tulisan. Silakan cek lagi nanti.',
    language: 'Bahasa',
    onlyEnglish: 'Hanya EN',
  },
  gaul: {
    fieldLog: 'Catatan Lapangan',
    articles: 'Artikel',
    latestEntry: 'Paling Baru Nih',
    author: 'Penulis',
    published: 'Rilis',
    readTime: 'Lama Baca',
    tags: 'Tag',
    minRead: 'menit baca',
    min: 'mnt',
    no: 'No.',
    title: 'Judul',
    date: 'Tanggal',
    read: 'Baca',
    empty: 'Belum ada tulisan nih. Mampir lagi nanti ya!',
    language: 'Bahasa',
    onlyEnglish: 'EN doang',
  },
};
