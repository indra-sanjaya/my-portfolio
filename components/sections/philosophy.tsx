'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    number: '01',
    title: 'Systems first',
    description:
      'My engineering background taught me to think beyond individual features — focusing on how systems behave, scale, and remain reliable under real-world conditions.',
  },
  {
    number: '02',
    title: 'Building for real problems',
    description:
      'I enjoy creating applications that solve operational and human problems, whether through automation, AI-assisted workflows, or better user experiences.',
  },
  {
    number: '03',
    title: 'Scalability and maintainability',
    description:
      'Clean architecture, maintainable code, and long-term scalability matter more to me than short-term hacks or quick fixes.',
  },
  {
    number: '04',
    title: 'Data-driven thinking',
    description:
      'Years of working with compliance systems, environmental reporting, and industrial operations strengthened my analytical mindset and decision-making approach.',
  },
  {
    number: '05',
    title: 'Continuous improvement',
    description:
      'Transitioning from engineering into software development reflects my belief that growth comes from curiosity, adaptability, and consistent learning.',
  },
  {
    number: '06',
    title: 'Technology with impact',
    description:
      'I am especially interested in building scalable web platforms and AI-powered applications that improve workflows, productivity, and decision-making.',
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
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Philosophy</span>

          <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            My Engineering Mindset
          </h2>
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
