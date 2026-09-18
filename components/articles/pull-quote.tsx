'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export function PullQuote({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { duration } = useAnimationConfig();
  const label = String(index).padStart(2, '0');

  return (
    <div ref={ref} className="my-12 flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center pt-1">
        <span className="font-mono text-xs text-hazard">{'→'} {label}</span>
        <motion.div
          className="mt-2 w-px flex-1 origin-top bg-hazard/70"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
        />
      </div>
      <motion.blockquote
        initial={{ opacity: 0, x: -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration, delay: duration ? 0.2 : 0 }}
        className="max-w-2xl font-sans text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
        {children}
      </motion.blockquote>
    </div>
  );
}
