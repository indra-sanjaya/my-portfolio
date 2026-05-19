'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink, CalendarDays, BadgeCheck } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

const certifications = [
  {
    title: 'Full Stack JavaScript Immersive Program',
    issuer: 'Hacktiv8',
    logo: '/hacktiv8-logo.jpg',
    earnedOn: 'April 2026',
    featured: true,
    link: 'https://drive.google.com/file/d/1Bl10C-ROPCSAk6DMyp31EVEP_DJDshs4/view?usp=drive_link',
  },
  {
    title: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/eb1747524342',
  },
  {
    title: 'Software Engineer',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/9c865a0b35ff',
  },
  {
    title: 'Rest API (Intermediate)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/b67cbaf726cb',
  },
  {
    title: 'Software Engineer Intern',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/00e98616eead',
  },
  {
    title: 'JavaScript (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/818911bb4e26',
  },
  {
    title: 'React (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/ebbcb4f5b143',
  },
  {
    title: 'CSS (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/40d50e92e728',
  },
  {
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/50443addb6f4',
  },
];

export function CertificationsSection() {
  const ref = useRef(null);
  const { duration, durationFast } = useAnimationConfig();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.section
      id="certifications"
      ref={ref}
      className="py-28 px-6 border-t border-border scroll-mt-28"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
      }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: durationFast }}
          className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Award className="w-6 h-6 text-primary" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Certifications</p>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Verified Skills & Achievements</h2>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl leading-8 text-base">
            Certifications and assessments validating my technical skills, problem-solving ability, and full-stack
            development experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: durationFast,
                delay: 0.15 + index * 0.07,
              }}
              className={`
                group relative overflow-hidden rounded-3xl border
                transition-all duration-300
                hover:-translate-y-1
                hover:border-blue-700
                hover:shadow-[0_15px_45px_-15px_rgba(56,189,248,0.25)]
                ${
                  cert.featured ?
                    'bg-gradient-to-br from-primary/10 to-secondary border-primary/20 md:col-span-2'
                  : 'bg-secondary/30 border-border'
                }
              `}>
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

              <div className="relative p-7">
                <div className="flex items-start justify-between gap-6">
                  {/* Left */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={cert.logo}
                        alt={`${cert.issuer} logo`}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <span className="text-sm text-muted-foreground font-large">{cert.issuer}</span>
                    </div>

                    <div>
                      <h3
                        className={`
                          font-semibold leading-tight text-foreground
                          ${cert.featured ? 'text-2xl md:text-3xl' : 'text-xl'}
                        `}>
                        {cert.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      <span>Earned {cert.earnedOn}</span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-background/80 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
