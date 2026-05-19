'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, BrainCircuit, Building2, Code2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay },
  }),
};

const highlights = [
  {
    icon: <Building2 className="w-5 h-5" />,
    title: 'Engineering Mindset',
    description: 'Experience solving operational and sustainability challenges in industrial environments.',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Full-Stack Development',
    description: 'Building modern applications with scalable architecture, APIs, and responsive interfaces.',
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    title: 'AI Integration',
    description: 'Developing intelligent applications with AI-powered workflows and modern LLM integrations.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    // ✅ FIX 1: Use variants consistently — no mixed initial/animate + variants
    <motion.section
      id="about"
      ref={ref}
      className="relative py-32 px-6 scroll-mt-28 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}>
      <div className="absolute inset-0 pointer-events-none">
        {/* ✅ FIX 2: will-change for GPU compositing on the glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 blur-3xl rounded-full will-change-transform" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-start">
          {/* LEFT — ✅ FIX 3: self-start required for sticky to work in Grid */}
          <motion.div
            variants={itemVariants}
            custom={0.1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="sticky top-32 self-start">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Background</span>
            <h2 className="mt-5 text-5xl md:text-6xl font-bold tracking-tight leading-tight text-foreground">About</h2>
            <p className="mt-8 text-lg leading-8 text-muted-foreground max-w-md">
              Combining analytical thinking from industrial engineering with modern software development to build
              scalable, reliable, and intelligent digital products.
            </p>
            {/* ✅ FIX 4: gradient direction from-primary to-transparent reads correctly L→R */}
            <div className="mt-10 w-16 h-px bg-gradient-to-r from-primary to-transparent" />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={itemVariants}
            custom={0.2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-10">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-8 md:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                {/* ✅ FIX 5: balanced type scale — 2xl/3xl consistent with body rhythm */}
                <p className="text-2xl md:text-3xl leading-relaxed font-light text-foreground">
                  I started in engineering, solving large-scale environmental and industrial challenges.
                </p>
                <p className="mt-8 text-base leading-8 text-muted-foreground">
                  Today, I apply that same systems thinking to build scalable software platforms, modern full-stack
                  applications, and AI-powered experiences. My background in oil & gas and sustainability shaped how I
                  approach problem-solving — focusing on reliability, scalability, and real-world impact.
                </p>
                <div className="mt-10 flex items-center gap-2 text-sm text-primary font-medium">
                  <span>Building thoughtful digital systems</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {highlights.map((item, index) => (
                // ✅ FIX 6: pure framer-motion hover — removed conflicting transition-all CSS
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  custom={0.3 + index * 0.08}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-secondary/30 p-6 hover:border-primary/20 hover:bg-secondary/50">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/[0.05] to-transparent" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
