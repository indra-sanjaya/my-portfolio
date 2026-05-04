'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';
import { title } from 'process';

const certifications = [
  {
    title: 'Software Engineer Intern',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/00e98616eead',
  },
  { title: 'JavaScript (Basic)', earnedOn: 'March 2026', link: 'https://www.hackerrank.com/certificates/818911bb4e26' },
  { title: 'React (Basic)', earnedOn: 'March 2026', link: 'https://www.hackerrank.com/certificates/ebbcb4f5b143' },
  { title: 'CSS (Basic)', earnedOn: 'March 2026', link: 'https://www.hackerrank.com/certificates/40d50e92e728' },
  {
    title: 'Problem Solving (Basic)',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/50443addb6f4',
  },
];

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
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                {cert.title} - <span className="text-xs">{cert.earnedOn}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
