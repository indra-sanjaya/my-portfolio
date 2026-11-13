'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, ExternalLink, CalendarDays, BadgeCheck, ChevronDown, ChevronUp } from 'lucide-react';

import { useAnimationConfig } from '@/hooks/use-animation-config';
import { certifications } from '@/lib/profile-data';


const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const FEATURED_ACCENT = '#F97316';
const ACCENT_CYCLE = ['#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];

export function CertificationsSection() {
  const ref = useRef(null);

  const { duration, durationFast, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const [showAll, setShowAll] = useState(false);

  const visibleCertifications = showAll ? certifications : certifications.slice(0, 3);

  const remainingCount = certifications.length - 3;

  return (
    <motion.section
      id="certifications"
      ref={ref}
      className="section-y-tight section-padding border-t border-border scroll-mt-28"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}>
      <div className="content-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: 0.1,
            duration: durationFast,
          }}
          className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Award className="w-6 h-6 text-primary" />
            </div>

            <div>
              <p className="section-eyebrow">Certifications</p>

              <h2 className="section-title mt-1">
                Verified Skills & Achievements
              </h2>
            </div>
          </div>

          <motion.div
            className="mb-5 flex h-1 w-40 origin-left overflow-hidden rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: k * 1, delay: k * 0.4, ease: EASE }}
            aria-hidden="true"
          >
            {[FEATURED_ACCENT, ...ACCENT_CYCLE.slice(0, 3)].map((color) => (
              <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
            ))}
          </motion.div>

          <p className="text-muted-foreground max-w-2xl leading-8 text-base">
            Certifications and assessments validating my technical skills, problem-solving ability, and full-stack
            development experience.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <AnimatePresence>
            {visibleCertifications.map((cert, index) => {
              const accent = cert.featured ? FEATURED_ACCENT : ACCENT_CYCLE[certifications.indexOf(cert) % ACCENT_CYCLE.length];
              return (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: durationFast, delay: (index % 3) * 0.1, ease: EASE } },
                }}
                exit={{ opacity: 0, y: 20 }}
                style={{ ['--accent' as string]: accent }}
                className={`
                  group relative overflow-hidden rounded-3xl border
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[var(--accent)]/60
                  hover:shadow-[0_15px_45px_-15px_var(--accent)]
                  ${
                    cert.featured ?
                      'bg-gradient-to-br from-primary/10 to-secondary border-primary/20 sm:col-span-2'
                    : 'bg-secondary/30 border-border'
                  }
                `}>
                {/* accent line that fills left to right */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: `${accent}26` }}>
                  <motion.span
                    className="block h-full origin-left"
                    style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}99` }}
                    variants={{
                      hidden: { scaleX: 0 },
                      visible: { scaleX: 1, transition: { duration: k * 1.4, delay: k * 0.3, ease: EASE } },
                    }}
                  />
                </span>
                {/* featured: one soft shine after it appears */}
                {cert.featured && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent motion-reduce:hidden"
                    variants={{
                      hidden: { x: '0%', opacity: 0 },
                      visible: { x: '520%', opacity: [0, 1, 1, 0], transition: { duration: 1.6, delay: 0.8, ease: 'easeInOut' } },
                    }}
                  />
                )}
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                <div className="relative p-7">
                  <div className="flex items-start justify-between gap-6">
                    {/* Left */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          className="w-10 h-10 rounded-full object-cover border border-border"
                        />

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground font-medium">{cert.issuer}</span>

                          {cert.featured && (
                            <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[11px] text-primary">
                              <BadgeCheck className="w-3 h-3" />
                              Featured
                            </div>
                          )}
                        </div>
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
                        <CalendarDays className="w-4 h-4" style={{ color: accent }} />
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
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse */}
        {certifications.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.4,
              duration: durationFast,
            }}
            className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
                group inline-flex items-center gap-3
                rounded-2xl border border-border
                bg-secondary/40 backdrop-blur-sm
                px-6 py-3
                text-sm font-medium text-muted-foreground
                transition-all duration-300
                hover:border-primary/30
                hover:bg-primary/5
                hover:text-foreground
                hover:shadow-lg
              ">
              <BadgeCheck className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />

              <span>{showAll ? 'Show Less Certifications' : `See ${remainingCount} More Certifications`}</span>

              {showAll ?
                <ChevronUp className="w-4 h-4 transition-transform duration-300" />
              : <ChevronDown className="w-4 h-4 transition-transform duration-300" />}
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
