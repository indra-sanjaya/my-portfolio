'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Instagram, Download } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

const links = [
  {
    label: 'Email',
    href: 'mailto:indrasanjaya.ind@gmail.com',
    icon: Mail,
    value: 'indrasanjaya.ind@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/indra-sanjaya-dev',
    icon: Linkedin,
    value: 'Connect',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/indra_isanjaya',
    icon: Instagram,
    value: 'Follow',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/indra-sanjaya',
    icon: Github,
    value: 'Follow',
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { duration } = useAnimationConfig();

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration,
        delay: 0.25 + i * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <motion.section
      id="contact"
      className="section-y section-padding bg-card scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="content-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
            <span className="text-xs tracking-widest uppercase text-muted-foreground">Contact</span>
            <div className="mt-6 mb-8 flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="/profile_picture.jpg"
                  alt="Indra Sanjaya"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top ring-2 ring-border"
                  style={{ objectPosition: '50% 25%' }}
                />
                <span className="absolute bottom-0.5 right-0.5 block w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Indra Sanjaya</p>
                <p className="text-xs text-muted-foreground">Enthusiast, Optimist, Problem Solver and Curious Mind</p>
              </div>
            </div>
            <h2 className="mt-4 text-[clamp(2rem,5.2vw,3.1rem)] font-medium tracking-tight text-foreground text-balance">
              Let&apos;s build something impactful
            </h2>
            <p className="mt-5 text-[clamp(1rem,2.3vw,1.125rem)] text-muted-foreground leading-relaxed">
              Open to discussing new opportunities, interesting projects, or just having a conversation about
              engineering and technology.
            </p>
          </motion.div>

          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="group flex items-center justify-between gap-4 p-4 sm:p-5 bg-background border border-border rounded-2xl transition-all duration-300 hover:border-muted-foreground/40 hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-2xl">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2.5 bg-secondary rounded-xl group-hover:bg-secondary/80 transition-colors duration-300">
                    <link.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</span>
                    <p className="text-foreground font-medium break-words">{link.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </motion.a>
            ))}
            {/* CV Download — pinned at top, visually distinct */}
            <motion.a
              href="/Indra_Sanjaya_CV.pdf"
              download
              variants={itemVariants}
              custom={-1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group flex items-center justify-between gap-4 p-4 sm:p-5 bg-foreground text-background rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-2xl">
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
