'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Layers3, ShieldCheck, LineChart, Rocket } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

type Proof = { label: string; href: string };

const principles = [
  {
    number: '01',
    title: 'Think in systems, not screens.',
    icon: <Layers3 className="w-5 h-5" />,
    description:
      'Years in industrial operations taught me to ask how a system behaves under real conditions (load, failure, people) before I polish a single feature.',
    evidence: 'Deployment tooling and a project-tracking dashboard for telecom systems, my day-to-day work.',
    proofs: [{ label: 'My journey', href: '#about' }],
  },
  {
    number: '02',
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
    title: 'Measure before you decide.',
    icon: <LineChart className="w-5 h-5" />,
    description:
      'Compliance and emissions reporting taught me that a claim without a number is only an opinion. I carry that habit into how I debug, estimate and review.',
    evidence: 'GHG inventory and CDP disclosure at Pupuk Kaltim, and a 700K+ tons CO2e reduction impact.',
    proofs: [{ label: 'Impact', href: '#impact' }],
  },
  {
    number: '04',
    title: 'Build for a real problem.',
    icon: <Rocket className="w-5 h-5" />,
    description:
      'I moved from environmental engineering into software on purpose, and I still pick work that removes an operational headache: automation, AI-assisted workflows, better UX.',
    evidence: 'An AI storyboard generator and post scheduler that replace manual content planning.',
    proofs: [{ label: 'FireWork Studio', href: '#project-firework-studio' }],
  },
] satisfies {
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  evidence: string;
  proofs: Proof[];
}[];

export function PhilosophySection() {
  const ref = useRef(null);
  const { duration, durationFast } = useAnimationConfig();
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(55vw,520px)] h-[min(55vw,520px)] bg-primary/[0.04] blur-3xl rounded-full" />
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
          <span className="section-eyebrow">Philosophy</span>
          <h2 className="section-title mt-4">My Engineering Mindset</h2>
          <p className="mt-5 text-[clamp(1rem,2.3vw,1.125rem)] leading-7 text-muted-foreground max-w-md">
            Four principles that shape how I build software. Each one comes with the work where you can see it.
          </p>
        </motion.div>

        {/* PRINCIPLES */}
        <ol className="divide-y divide-border border-y border-border">
          {principles.map((principle, index) => (
            <motion.li
              key={principle.number}
              variants={itemVariants}
              custom={index + 1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group grid gap-x-6 gap-y-4 py-8 sm:grid-cols-[auto_1fr] sm:py-10"
            >
              <span
                aria-hidden="true"
                className="font-mono text-4xl font-semibold leading-none text-primary/30 transition-colors duration-300 group-hover:text-primary sm:text-5xl"
              >
                {principle.number}
              </span>

              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {principle.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{principle.title}</h3>
                </div>

                <p className="mt-4 leading-8 text-muted-foreground">{principle.description}</p>

                <div className="mt-5 rounded-2xl border border-border bg-background/60 p-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">Seen in</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">{principle.evidence}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {principle.proofs.map((proof) => (
                      <a
                        key={proof.href + proof.label}
                        href={proof.href}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                      >
                        {proof.label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
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
