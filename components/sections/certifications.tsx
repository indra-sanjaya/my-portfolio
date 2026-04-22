'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';

const certifications = ['JavaScript (Basic)', 'React (Basic)', 'CSS (Basic)', 'Problem Solving (Basic)'];

export function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      id="certifications"
      className="py-24 px-6 border-t border-border scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-xl">
              <Award className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">HackerRank Certifications</h3>
              <p className="text-sm text-muted-foreground">Verified skill assessments</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-full">
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
