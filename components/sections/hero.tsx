'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

const SKILLS = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'System Design'];

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Glow orb — top center */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Glow orb — bottom right accent */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(6,182,212,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Fade out to background at top & bottom */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export function HeroSection() {
  const { duration, durationFast, durationSlow } = useAnimationConfig();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      <GridBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}>
          <span
            className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 text-xs tracking-widest uppercase rounded-full border font-medium"
            style={{
              color: 'rgb(34,211,238)',
              borderColor: 'rgba(34,211,238,0.25)',
              background: 'rgba(34,211,238,0.06)',
            }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                background: 'rgb(34,211,238)',
                boxShadow: '0 0 6px rgb(34,211,238)',
              }}
            />
            Software Developer
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground text-balance leading-[1.1]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durationSlow, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          I build scalable systems that solve{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            real-world problems
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durationSlow, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          8+ years of engineering experience in high-impact industries, now crafting software with the same analytical
          precision.
        </motion.p>

        {/* Skill pills */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durationFast, delay: 0.35 }}>
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              className="px-3 py-1 text-xs font-mono tracking-wide rounded-md border text-muted-foreground"
              style={{
                borderColor: 'rgba(148,163,184,0.12)',
                background: 'rgba(148,163,184,0.04)',
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: durationFast, delay: 0.38 + i * 0.06, ease: 'easeOut' }}>
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durationSlow, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              color: '#fff',
              boxShadow: '0 0 28px rgba(99,102,241,0.28)',
            }}>
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-medium transition-all duration-300 hover:bg-secondary hover:border-transparent hover:scale-[1.02]">
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: durationSlow }}>
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: durationSlow * 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="w-4 h-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
