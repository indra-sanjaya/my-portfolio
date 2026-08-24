'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, ShieldCheck, Award, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { AnimatedMetricCard } from './animated-metric-card';

const glowStyles = [
  'hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.35)]', // green
  'hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.30)]', // blue
  'hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.30)]', // amber
  'hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]', // brighter indigo/violet — was muted slate
  'hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.30)]', // purple
  'hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.30)]', // emerald
];

const borderColors = [
  'hover:border-green-400/30',
  'hover:border-blue-400/30',
  'hover:border-amber-400/30',
  'hover:border-indigo-400/40', // brighter to match new glow
  'hover:border-purple-400/30',
  'hover:border-emerald-400/30',
];

const iconColors = ['#4ade80', '#60a5fa', '#fbbf24', '#818cf8', '#c084fc', '#34d399'];

// PROPER ranking ladder, worst → best, matches Indonesia's real PROPER scale
const properColorStops = [
  { color: '#18181b', word: 'Black', label: 'Non-compliant' },
  { color: '#ef4444', word: 'Red', label: 'Below standard' },
  { color: '#3b82f6', word: 'Blue', label: 'Compliant' },
  { color: '#22c55e', word: 'Green', label: 'Beyond compliance' },
  { color: '#facc15', word: 'Gold', label: 'Excellence' },
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
      className="section-y section-padding scroll-mt-28"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}>
      <div className="content-container">
        {/* HEADER */}
        <motion.div variants={itemVariants} custom={0} className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Engineering Impact</span>

          <h2 className="mt-4 text-[clamp(2rem,4.6vw,3rem)] font-semibold tracking-tight text-foreground">
            Measurable Industrial Outcomes
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            A track record grounded in large-scale engineering systems, environmental compliance, and operational safety
            across industrial infrastructure projects.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={itemVariants} custom={1}>
            <AnimatedMetricCard
              icon={Leaf}
              label="Emissions Reduction Impact"
              description="Contributed to large-scale sustainability initiatives in industrial operations, focusing on measurable carbon footprint reduction."
              targetValue={700000}
              suffix="+"
              unit="tons CO2e"
              fillPercent={88}
              iconColor={iconColors[0]}
              ringColor={iconColors[0]}
              glowShadow={glowStyles[0]}
              borderHoverColor={borderColors[0]}
            />
          </motion.div>

          <motion.div variants={itemVariants} custom={2}>
            <AnimatedMetricCard
              icon={ShieldCheck}
              label="Safety Performance Record"
              description="Maintained zero lost-time incidents across high-risk LNG construction environments with strict safety compliance execution."
              targetValue={0}
              unit="LTI"
              fillPercent={100}
              iconColor={iconColors[1]}
              ringColor={iconColors[1]}
              glowShadow={glowStyles[1]}
              borderHoverColor={borderColors[1]}
            />
          </motion.div>

          <motion.div variants={itemVariants} custom={3}>
            <AnimatedMetricCard
              icon={Award}
              label="PROPER"
              description="Achieved top-tier PROPER certification recognition for environmental management and regulatory compliance performance."
              targetValue={0}
              fillPercent={100}
              showNumericValue={false}
              iconColor={iconColors[2]}
              ringColor={properColorStops}
              glowShadow={glowStyles[2]}
              borderHoverColor={borderColors[2]}
            />
          </motion.div>

          <motion.div variants={itemVariants} custom={4}>
            <AnimatedMetricCard
              icon={Layers}
              label="Production Systems"
              description="End-to-end applications with auth, databases, APIs, and deployment"
              targetValue={4}
              unit="Full-stack Apps"
              fillPercent={80}
              iconColor={iconColors[3]}
              ringColor={iconColors[3]}
              glowShadow={glowStyles[3]}
              borderHoverColor={borderColors[3]}
            />
          </motion.div>

          <motion.div variants={itemVariants} custom={5}>
            <AnimatedMetricCard
              icon={Sparkles}
              label="Gemini-powered Features"
              description="AI storyboards, itinerary generation, and content automation pipelines"
              targetValue={3}
              unit="AI Integrations"
              fillPercent={75}
              iconColor={iconColors[4]}
              ringColor={iconColors[4]}
              glowShadow={glowStyles[4]}
              borderHoverColor={borderColors[4]}
            />
          </motion.div>

          <motion.div variants={itemVariants} custom={6}>
            <AnimatedMetricCard
              icon={CheckCircle2}
              label="Backend Reliability"
              description="Jest + Supertest coverage across controllers and API layers"
              targetValue={90}
              suffix="%"
              unit="Test Coverage"
              fillPercent={90}
              iconColor={iconColors[5]}
              ringColor={iconColors[5]}
              glowShadow={glowStyles[5]}
              borderHoverColor={borderColors[5]}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
