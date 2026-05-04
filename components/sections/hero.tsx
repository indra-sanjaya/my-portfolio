'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span className="inline-block px-4 py-1.5 mb-8 text-xs tracking-widest uppercase text-muted-foreground border border-border rounded-full">
            Software Developer
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground text-balance leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          I build scalable systems that solve <span className="text-muted-foreground">real-world problems</span>
        </motion.h1>

        <motion.p
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          8+ years of engineering experience in high-impact industries, now crafting software with the same analytical
          precision.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <a
            href="#projects"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:bg-foreground/90 hover:scale-[1.02]">
            View Projects
          </a>
          <a
            href="#contact"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-medium transition-all duration-300 hover:bg-secondary hover:border-transparent">
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
