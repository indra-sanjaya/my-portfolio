'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Layers3, ShieldCheck, LineChart, Rocket } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

type Proof = { label: string; href: string };

const principles = [
  {
    number: '01',
    accent: '#0EA5E9',
    title: 'Think in systems, not screens.',
    icon: <Layers3 className="w-5 h-5" />,
    description:
      'Years in industrial operations taught me to ask how a system behaves under real conditions (load, failure, people) before I polish a single feature.',
    evidence: 'Deployment tooling and a project-tracking dashboard for telecom systems, my day-to-day work.',
    proofs: [{ label: 'My journey', href: '#about' }],
  },
  {
    number: '02',
    accent: '#10B981',
    title: 'Fail gracefully, never silently.',
    icon: <ShieldCheck className="w-5 h-5" />,
    description:
      'Maintainable code matters more to me than quick hacks. Software should survive bad input, flaky APIs and slow third parties, and tell the user what happened.',
    evidence:
      'TripPlanner plans each day of an AI itinerary on its own with retries, so one failed day no longer wipes the trip. FireWork Studio retries scheduled posts per platform.',
    proofs: [
      { label: 'TripPlanner', href: '#project-tripplanner' },
      { label: 'FireWork Studio', href: '#project-firework-studio' },
    ],
  },
  {
    number: '03',
    accent: '#F59E0B',
    title: 'Measure before you decide.',
    icon: <LineChart className="w-5 h-5" />,
    description:
      'Compliance and emissions reporting taught me that a claim without a number is only an opinion. I carry that habit into how I debug, estimate and review.',
    evidence: 'GHG inventory and CDP disclosure at Pupuk Kaltim, and a 700K+ tons CO2e reduction impact.',
    proofs: [{ label: 'Impact', href: '#impact' }],
  },
  {
    number: '04',
    accent: '#8B5CF6',
    title: 'Build for a real problem.',
    icon: <Rocket className="w-5 h-5" />,
    description:
      'I moved from environmental engineering into software on purpose, and I still pick work that removes an operational headache: automation, AI-assisted workflows, better UX.',
    evidence: 'An AI storyboard generator and post scheduler that replace manual content planning.',
    proofs: [{ label: 'FireWork Studio', href: '#project-firework-studio' }],
  },
] satisfies {
  number: string;
  accent: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  evidence: string;
  proofs: Proof[];
}[];

export function PhilosophySection() {
  const ref = useRef(null);
  const { duration, durationFast, prefersReduced } = useAnimationConfig();
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: durationFast, delay: i * 0.1, ease },
    }),
  };
  const drift = (distance: number, seconds: number) =>
    prefersReduced ? {} : { animate: { y: [0, distance, 0] }, transition: { duration: seconds, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <motion.section
      id="philosophy"
      ref={ref}
      className="relative overflow-clip section-y section-padding bg-card border-t border-border scroll-mt-28"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration, ease } },
      }}
    >
      {/* soft colour glows, one per principle, drifting slowly */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          {...drift(24, 14)}
          className="absolute -top-24 -right-24 h-[min(55vw,460px)] w-[min(55vw,460px)] rounded-full blur-3xl"
          style={{ backgroundColor: '#0EA5E914' }}
        />
        <motion.div
          {...drift(-28, 17)}
          className="absolute top-1/3 -left-32 h-[min(50vw,420px)] w-[min(50vw,420px)] rounded-full blur-3xl"
          style={{ backgroundColor: '#8B5CF610' }}
        />
        <motion.div
          {...drift(20, 19)}
          className="absolute -bottom-24 right-1/4 h-[min(45vw,380px)] w-[min(45vw,380px)] rounded-full blur-3xl"
          style={{ backgroundColor: '#10B98110' }}
        />
      </div>

      <div className="relative content-container grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
        {/* HEADER (sticky on desktop) */}
        <motion.div
          variants={itemVariants}
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="section-eyebrow inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {!prefersReduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </span>
            Philosophy
          </span>
          <h2 className="section-title mt-4">My Engineering Mindset</h2>

          {/* four-colour rule that draws itself */}
          <motion.div
            className="mt-5 flex h-1 w-40 origin-left overflow-hidden rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.9, delay: 0.3, ease }}
            aria-hidden="true"
          >
            {principles.map((principle) => (
              <span key={principle.number} className="h-full flex-1" style={{ backgroundColor: principle.accent }} />
            ))}
          </motion.div>

          <p className="mt-5 text-[clamp(1rem,2.3vw,1.125rem)] leading-7 text-muted-foreground max-w-md">
            Four principles that shape how I build software. Each one comes with the work where you can see it.
          </p>
        </motion.div>

        {/* PRINCIPLES */}
        <ol className="space-y-5">
          {principles.map((principle, index) => (
            <motion.li
              key={principle.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: { opacity: 1, y: 0, transition: { duration: durationFast, delay: index === 0 ? 0.15 : 0, ease } },
              }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background/60 p-6 pl-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 sm:pl-10"
              style={{ ['--accent' as string]: principle.accent }}
            >
              {/* accent bar that grows in */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1.5 origin-top"
                style={{ backgroundImage: `linear-gradient(to bottom, ${principle.accent}, ${principle.accent}55)` }}
                variants={{
                  hidden: { scaleY: 0 },
                  visible: { scaleY: 1, transition: { duration: prefersReduced ? 0 : 0.8, delay: 0.25, ease } },
                }}
              />
              {/* tint on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundImage: `radial-gradient(120% 90% at 0% 0%, ${principle.accent}14, transparent 60%)` }}
              />

              <div className="relative grid gap-x-6 gap-y-4 sm:grid-cols-[auto_1fr]">
                <span
                  aria-hidden="true"
                  className="bg-clip-text font-mono text-4xl font-semibold leading-none text-transparent sm:text-5xl"
                  style={{ backgroundImage: `linear-gradient(135deg, ${principle.accent}, ${principle.accent}66)` }}
                >
                  {principle.number}
                </span>

                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                      style={{
                        color: principle.accent,
                        backgroundColor: `${principle.accent}1A`,
                        borderColor: `${principle.accent}33`,
                      }}
                    >
                      {principle.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{principle.title}</h3>
                  </div>

                  <p className="mt-4 leading-8 text-muted-foreground">{principle.description}</p>

                  <div
                    className="mt-5 rounded-2xl border p-4"
                    style={{ backgroundColor: `${principle.accent}0D`, borderColor: `${principle.accent}30` }}
                  >
                    <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: principle.accent }} />
                      Seen in
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">{principle.evidence}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {principle.proofs.map((proof) => (
                        <a
                          key={proof.href + proof.label}
                          href={proof.href}
                          className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white hover:shadow-md"
                          style={{ borderColor: `${principle.accent}55` }}
                        >
                          {proof.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
