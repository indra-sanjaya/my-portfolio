'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const technologies = [
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'GraphQL', category: 'API' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Database' },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.15 + i * 0.04,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id="tech-stack"
      className="py-32 px-6 scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Tools</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-foreground">Tech Stack</h2>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group relative px-6 py-3 bg-card border border-border rounded-full transition-all duration-300 hover:border-muted-foreground/40 hover:bg-secondary/50">
              <span className="text-foreground font-medium">{tech.name}</span>
              <span className="absolute -top-2 -right-1 px-2 py-0.5 text-[10px] tracking-wider uppercase text-muted-foreground bg-background border border-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
