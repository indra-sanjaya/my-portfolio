'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    number: '01',
    title: 'Systems over features',
    description: "I don't just build apps — I design systems that scale and evolve.",
  },
  {
    number: '02',
    title: 'Real-world impact',
    description: 'Every line of code should solve a genuine problem, not create new ones.',
  },
  {
    number: '03',
    title: 'Long-term thinking',
    description: 'Prioritizing maintainability and scalability over quick fixes.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id="philosophy"
      className="py-32 px-6 bg-card scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={itemVariants}
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Approach</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-foreground">How I Think</h2>
        </motion.div>

        <div className="space-y-0">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              variants={itemVariants}
              custom={index + 1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group py-8 border-b border-border first:border-t">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                <span className="text-sm text-muted-foreground font-mono">{principle.number}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">{principle.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
