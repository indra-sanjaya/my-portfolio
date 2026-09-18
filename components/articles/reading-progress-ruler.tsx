'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgressRuler() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="pointer-events-none fixed top-24 bottom-24 left-4 z-40 hidden w-px lg:block"
      aria-hidden="true">
      <div className="relative h-full w-px bg-border">
        <motion.div
          style={{ scaleY: prefersReduced ? scrollYProgress : scaleY }}
          className="absolute inset-0 w-px origin-top bg-hazard"
        />
      </div>
    </div>
  );
}
