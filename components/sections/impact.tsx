'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  {
    value: '700K+',
    unit: 'tons CO₂e',
    label: 'Emissions Reduced',
    description: 'Environmental impact through sustainable engineering solutions',
  },
  {
    value: '0',
    unit: 'LTI',
    label: 'Lost Time Incidents',
    description: 'Safety record on major LNG construction project',
  },
  {
    value: 'GOLD',
    unit: 'PROPER',
    label: 'Certification',
    description: 'Highest environmental compliance rating achieved',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

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

export function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id="impact"
      ref={ref}
      className="py-32 px-6 scroll-mt-28"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}>
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} custom={0} className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Track Record</span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              custom={index + 1}
              className="bg-card p-8 md:p-12 group hover:bg-secondary/50 transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-medium tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  <span className="text-lg text-muted-foreground">{metric.unit}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">{metric.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
