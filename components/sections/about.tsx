'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.section
      id="about"
      className="py-32 px-6 scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div variants={itemVariants} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <span className="text-xs tracking-widest uppercase text-muted-foreground">Background</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-foreground">About</h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={0.2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light">
              I started in engineering, solving large-scale environmental and industrial challenges.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, I apply that same analytical thinking to build scalable software systems and data-driven
              applications. My background in oil & gas and sustainability gives me a unique perspective on building
              systems that need to work reliably at scale.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
