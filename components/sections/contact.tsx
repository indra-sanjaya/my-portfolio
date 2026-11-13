'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Instagram, Download } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { CONTACT_LINKS } from '@/lib/profile-data';

const linkIcons = { Email: Mail, LinkedIn: Linkedin, Instagram, GitHub: Github } as const;
const links = CONTACT_LINKS.map((link) => ({
  ...link,
  icon: linkIcons[link.label as keyof typeof linkIcons],
}));

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const ACCENTS: Record<string, string> = {
  Email: '#0EA5E9',
  LinkedIn: '#6366F1',
  Instagram: '#EC4899',
  GitHub: '#10B981',
};
const HEADLINE = ["Let's", 'build', 'something', 'impactful'];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { duration, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;
  const drift = (distance: number, seconds: number) =>
    prefersReduced
      ? {}
      : { animate: { y: [0, distance, 0] }, transition: { duration: seconds, repeat: Infinity, ease: 'easeInOut' as const } };

  const itemVariants = {
    hidden: { opacity: 0, x: 32 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: duration * 0.9,
        delay: 0.3 + (i + 1) * 0.12,
        ease: EASE,
      },
    }),
  };

  return (
    <motion.section
      id="contact"
      className="relative overflow-clip section-y section-padding bg-card scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          {...drift(22, 15)}
          className="absolute -top-20 -left-24 h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full blur-3xl"
          style={{ backgroundColor: '#0EA5E912' }}
        />
        <motion.div
          {...drift(-26, 18)}
          className="absolute -bottom-24 -right-24 h-[min(55vw,460px)] w-[min(55vw,460px)] rounded-full blur-3xl"
          style={{ backgroundColor: '#EC489910' }}
        />
      </div>
      <div className="relative content-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}>
            <span className="section-eyebrow">Contact</span>
            <div className="mt-6 mb-8 flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="/profile_picture.jpg"
                  alt="Indra Sanjaya"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top ring-2 ring-border"
                  style={{ objectPosition: '50% 25%' }}
                />
                <span className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center" title="Open to opportunities">
                  {!prefersReduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  )}
                  <span className="relative block h-5 w-5 rounded-full bg-emerald-500 ring-2 ring-card" />
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Indra Sanjaya</p>
                <p className="text-xs text-muted-foreground">Enthusiast, Optimist, Problem Solver and Curious Mind</p>
              </div>
            </div>
            <h2 className="section-title mt-4 text-balance" aria-label="Let's build something impactful">
              {HEADLINE.map((word, i) => {
                const last = i === HEADLINE.length - 1;
                return (
                  <span key={word} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    <motion.span
                      className={`inline-block ${last ? 'bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent' : ''}`}
                      initial={{ y: '110%' }}
                      animate={{ y: isInView ? '0%' : '110%' }}
                      transition={{ duration: k * 0.9, delay: k * (0.25 + i * 0.12), ease: EASE }}
                    >
                      {word}
                    </motion.span>
                    {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                  </span>
                );
              })}
            </h2>
            {/* four-colour rule that draws itself */}
            <motion.div
              className="mt-5 flex h-1 w-40 origin-left overflow-hidden rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: k * 1, delay: k * 0.9, ease: EASE }}
              aria-hidden="true"
            >
              {Object.values(ACCENTS).map((color) => (
                <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
              ))}
            </motion.div>
            <p className="mt-5 text-[clamp(1rem,2.3vw,1.125rem)] text-muted-foreground leading-relaxed">
              Open to discussing new opportunities, interesting projects, or just having a conversation about
              engineering and technology.
            </p>
          </motion.div>

          <div className="space-y-4">
            {links.map((link, index) => {
              const accent = ACCENTS[link.label] ?? '#0EA5E9';
              return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                style={{ ['--accent' as string]: accent }}
                className="group relative flex items-center justify-between gap-4 overflow-hidden p-4 sm:p-5 bg-background border border-border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-2xl">
                {/* accent line that fills left to right */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5" style={{ backgroundColor: `${accent}26` }}>
                  <motion.span
                    className="block h-full origin-left"
                    style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}88` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isInView ? 1 : 0 }}
                    transition={{ duration: k * 1.2, delay: k * (0.55 + index * 0.12), ease: EASE }}
                  />
                </span>
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ backgroundColor: `${accent}1A`, color: accent }}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</span>
                    <p className="text-foreground font-medium break-words">{link.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
              </motion.a>
              );
            })}
            {/* CV Download — pinned at top, visually distinct */}
            <motion.a
              href="/Indra_Sanjaya_CV.pdf"
              download
              variants={itemVariants}
              custom={-1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group relative flex items-center justify-between gap-4 overflow-hidden p-4 sm:p-5 bg-foreground text-background rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-2xl">
              {/* one soft shine after it appears */}
              {!prefersReduced && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-background/25 to-transparent"
                  initial={{ x: '0%', opacity: 0 }}
                  animate={isInView ? { x: '480%', opacity: [0, 1, 1, 0] } : {}}
                  transition={{ duration: 1.4, delay: 0.5, ease: 'easeInOut' }}
                />
              )}
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2.5 bg-background/15 rounded-xl transition-colors duration-300">
                  <Download className="w-5 h-5 text-background" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider opacity-60">Resume</span>
                  <p className="font-medium">Download CV</p>
                </div>
              </div>
              <Download className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
