'use client';

import { motion } from 'framer-motion';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { TagChip } from './tag-chip';

type ArticleHeroProps = {
  title: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export function ArticleHero({ title, author, publishedAt, readTime, tags }: ArticleHeroProps) {
  const { duration, durationFast } = useAnimationConfig();

  return (
    <header className="blueprint-grid relative overflow-hidden border-b border-border">
      <div className="content-container section-padding pt-28 pb-12 sm:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durationFast }}
          className="mb-4 font-mono text-xs tracking-[0.2em] text-hazard uppercase">
          Field Log
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
          className="text-balance font-sans leading-[0.95] font-black tracking-tight">
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durationFast, delay: durationFast ? 0.15 : 0 }}
          className="mt-8 inline-grid grid-cols-2 gap-x-8 gap-y-3 rounded-lg border border-border bg-card/60 px-5 py-4 font-mono text-xs backdrop-blur sm:grid-cols-4">
          <div>
            <div className="tracking-wider text-muted-foreground uppercase">Author</div>
            <div className="mt-1 text-foreground">{author}</div>
          </div>
          <div>
            <div className="tracking-wider text-muted-foreground uppercase">Published</div>
            <div className="mt-1 text-foreground">{formatDate(publishedAt)}</div>
          </div>
          <div>
            <div className="tracking-wider text-muted-foreground uppercase">Read Time</div>
            <div className="mt-1 text-foreground">{readTime} min</div>
          </div>
          <div>
            <div className="tracking-wider text-muted-foreground uppercase">Tags</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
