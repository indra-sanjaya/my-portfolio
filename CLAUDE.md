# Portfolio conventions

## Articles (content/articles)

Every article ships in three languages, always. When asked to write or add an article, produce all three files in the same change:

| File | Language |
| --- | --- |
| `<slug>.mdx` | English (source of truth; owns the frontmatter) |
| `<slug>.id.mdx` | Indonesian, standard and professional |
| `<slug>.gaul.mdx` | Indonesian, casual ("gaul"): aku/kamu + everyday slang (gak, banget, nih, dong). Fun, but technically accurate |

Rules:
- Translations only need `title` and `description` in frontmatter. Date, tags, images, `featured`, `draft` are inherited from the English file.
- Keep code blocks byte-identical across languages (only translate the `title="LISTING NN — ..."` caption). Keep technical terms, API names, product names and quoted titles in English.
- Translate the prose, pull quotes, table text and headings. Keep the `## [ 01 ] ...` heading format.
- Diagram components accept `label`, `caption` and `alt` props. Pass translated values in the `.id`/`.gaul` files. Text inside the SVG itself stays English. `ArticleFigure` takes translated `label`, `caption`, `alt` directly.
- Inside JSX attribute strings (`caption="..."`) never use a plain `"` or a literal backslash escape. Use “ ” or ' instead, or MDX fails to compile.
- Keep `description` under about 160 characters in every language.
- Sentences that express the author's own opinion or experience stay in first person; keep the author's voice.

Before pushing, check that all three files compile as MDX and that the code blocks match across languages. `lib/articles.ts` picks translations up automatically; the switcher, sitemap and hreflang need no changes.

## Metadata and SEO

- Site URL is `https://indrasanjaya.me` (`lib/site-config.ts`). Canonical is set per page, never only in a shared layout.
- Each article language has its own canonical URL. hreflang covers `en` and `id`; the casual version has no hreflang of its own.
- Social preview image is `public/og-image.png` (1200×630). Articles set their own `ogImage` in frontmatter.

## Workflow

- Vercel deploys from `main`. The owner often asks for a direct push to `main`; fast-forward only.
- Local builds can fail on Google Fonts fetch in sandboxed environments. That is environmental, not a code error.
