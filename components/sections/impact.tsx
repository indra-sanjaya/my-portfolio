'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, ShieldCheck, Award, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

const metrics = [
  {
    icon: Leaf,
    value: '700K+',
    unit: 'tons CO₂e',
    label: 'Emissions Reduction Impact',
    description:
      'Contributed to large-scale sustainability initiatives in industrial operations, focusing on measurable carbon footprint reduction.',
  },
  {
    icon: ShieldCheck,
    value: '0',
    unit: 'LTI',
    label: 'Safety Performance Record',
    description:
      'Maintained zero lost-time incidents across high-risk LNG construction environments with strict safety compliance execution.',
  },
  {
    icon: Award,
    value: 'GOLD',
    unit: 'PROPER',
    label: 'Environmental Compliance Excellence',
    description:
      'Achieved top-tier PROPER certification recognition for environmental management and regulatory compliance performance.',
  },
  {
    icon: Layers,
    value: '4',
    unit: 'Full-stack Apps',
    label: 'Production Systems',
    description: 'End-to-end applications with auth, databases, APIs, and deployment',
  },
  {
    icon: Sparkles,
    value: '3',
    unit: 'AI Integrations',
    label: 'Gemini-powered Features',
    description: 'AI storyboards, itinerary generation, and content automation pipelines',
  },
  {
    icon: CheckCircle2,
    value: '90%',
    unit: 'Test Coverage',
    label: 'Backend Reliability',
    description: 'Jest + Supertest coverage across controllers and API layers',
  },
];

const glowStyles = [
  'hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.35)]', // green
  'hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.30)]', // blue
  'hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.30)]', // amber
  'hover:shadow-[0_20px_60px_-15px_rgba(100,116,139,0.25)]', // slate
  'hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.30)]', // purple
  'hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.30)]', // emerald
];

const iconColors = [
  'text-green-400',
  'text-blue-400',
  'text-amber-400',
  'text-slate-300',
  'text-purple-400',
  'text-emerald-400',
];

export function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { duration, durationFast } = useAnimationConfig();

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: durationFast,
        delay: i * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <motion.section
      id="impact"
      ref={ref}
      className="py-32 px-6 scroll-mt-28"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div variants={itemVariants} custom={0} className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Engineering Impact</span>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Measurable Industrial Outcomes
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            A track record grounded in large-scale engineering systems, environmental compliance, and operational safety
            across industrial infrastructure projects.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                custom={index + 1}
                className={`
  group relative
  bg-card
  border border-border/50
  rounded-3xl
  p-8 md:p-10
  transition-all duration-300
  hover:bg-secondary/30
  hover:border-border
  hover:-translate-y-1
  ${glowStyles[index]}
`}>
                {/* ICON */}
                <div className="mb-6 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-secondary/60 border border-border/40">
                  <Icon className={`w-5 h-5 transition-colors group-hover:opacity-100 ${iconColors[index]}`} />
                </div>

                {/* VALUE */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>

                {/* LABEL */}
                <h3 className="mt-4 text-lg font-medium text-foreground">{metric.label}</h3>

                {/* DESCRIPTION */}
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{metric.description}</p>

                {/* subtle glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
