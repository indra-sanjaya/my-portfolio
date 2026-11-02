'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, BrainCircuit, Building2, Code2, MapPin } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

const journey = [
  {
    year: '2015',
    title: 'HSE in the field',
    description: 'Environmental engineer on the BP LNG Tangguh project in Papua, delivering Zero LTI.',
  },
  {
    year: '2019',
    title: 'Carbon & compliance',
    description: 'Pupuk Kaltim: CDP climate disclosure, CEMS monitoring and National GOLD PROPER.',
  },
  {
    year: '2022',
    title: 'Sustainability lead',
    description: 'Pertamina Hulu Mahakam: ESG and ISO 14001 EMS, earning Green and GOLD PROPER.',
  },
  {
    year: '2025',
    title: 'Engineering software',
    description: 'Hacktiv8 full-stack program, now Fullstack Engineer building telecom systems.',
  },
];

const highlights = [
  {
    icon: <Building2 className="w-5 h-5" />,
    title: 'Engineering Mindset',
    description: 'Experience solving operational and sustainability challenges in industrial environments.',
    tags: ['ISO 14001', 'CDP', 'PROPER', 'HSE'],
    color: '#4ade80',
    hover: 'hover:border-green-400/30 hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.35)]',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Full-Stack Development',
    description: 'Building modern applications with scalable architecture, APIs, and responsive interfaces.',
    tags: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL'],
    color: '#60a5fa',
    hover: 'hover:border-blue-400/30 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.30)]',
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    title: 'AI Integration',
    description: 'Developing intelligent applications with AI-powered workflows and modern LLM integrations.',
    tags: ['RAG', 'Gemini', 'LangChain', 'LangGraph'],
    color: '#c084fc',
    hover: 'hover:border-purple-400/30 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.30)]',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { duration, durationFast } = useAnimationConfig();

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: durationFast, delay: i * 0.12, ease: 'easeOut' as const },
    }),
  };

  const animate = isInView ? 'visible' : 'hidden';

  return (
    <motion.section
      id="about"
      ref={ref}
      className="relative section-y section-padding scroll-mt-28 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={animate}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 blur-3xl rounded-full will-change-transform" />
      </div>

      <div className="relative content-container">
        {/* Header — same rhythm as Impact: eyebrow, headline with a point of view, one supporting line */}
        <motion.div variants={itemVariants} custom={0} initial="hidden" animate={animate} className="mb-12 sm:mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Background</span>
          <h2 className="mt-4 text-[clamp(2rem,4.6vw,3rem)] font-semibold tracking-tight text-foreground">
            From Industrial Sites to Production Code
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            Combining analytical thinking from environmental and HSE engineering with modern software development to
            build scalable, reliable, and intelligent digital products.
          </p>
        </motion.div>

        {/* Row 1 — portrait and story share one height so the two columns read as a pair */}
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[340px_1fr] lg:items-stretch">
          <motion.div
            variants={itemVariants}
            custom={1}
            initial="hidden"
            animate={animate}
            className="group relative mx-auto w-full max-w-sm lg:max-w-none overflow-hidden rounded-2xl border border-border bg-muted aspect-[4/5] lg:aspect-auto lg:min-h-[480px]">
            <Image
              src="/profile_picture2.jpg"
              alt="Indra Sanjaya"
              fill
              sizes="(max-width: 1024px) 90vw, 340px"
              className="object-cover grayscale contrast-125 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
              style={{ objectPosition: '50% 80%' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/65 via-18% to-transparent to-42% pointer-events-none" />

            {/* Viewfinder corners, the same hazard accent used on the articles */}
            <span className="pointer-events-none absolute top-3 left-3 size-4 border-t-2 border-l-2 border-hazard" />
            <span className="pointer-events-none absolute top-3 right-3 size-4 border-t-2 border-r-2 border-hazard" />
            <span className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-hazard" />
            <span className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-hazard" />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-lg font-semibold text-foreground">Indra Sanjaya</p>
              <p className="mt-1 text-sm text-foreground/80">
                Fullstack Engineer · Environmental &amp; Sustainability Engineer
              </p>
              <p className="mt-3 flex items-center gap-1.5 font-mono text-xs text-hazard">
                <MapPin className="w-3.5 h-3.5" />
                Jakarta, Indonesia
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={2}
            initial="hidden"
            animate={animate}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
            <div className="relative flex flex-1 flex-col">
              <p className="text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug font-light text-foreground">
                I started in engineering, solving large-scale environmental and industrial challenges.
              </p>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Today, I apply that same systems thinking to build scalable software platforms, modern full-stack
                applications, and AI-powered experiences. My background in oil &amp; gas and sustainability shaped how I
                approach problem-solving — focusing on reliability, scalability, and real-world impact.
              </p>

              <div className="mt-auto pt-10">
                <p className="mb-5 font-mono text-xs tracking-[0.2em] text-hazard uppercase">The Journey</p>
                <ol className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4">
                  {journey.map((step, index) => {
                    const isNow = index === journey.length - 1;
                    return (
                      <motion.li
                        key={step.year}
                        variants={itemVariants}
                        custom={3 + index * 0.6}
                        initial="hidden"
                        animate={animate}
                        className="relative border-t border-border pt-5">
                        <span
                          className={`absolute -top-[5px] left-0 size-2.5 rounded-full ${
                            isNow ? 'bg-hazard shadow-[0_0_0_4px_color-mix(in_oklab,var(--hazard)_25%,transparent)]' : 'bg-muted-foreground/60'
                          }`}
                        />
                        <span className={`font-mono text-xs ${isNow ? 'text-hazard' : 'text-muted-foreground'}`}>
                          {step.year}
                        </span>
                        <h3 className="mt-1.5 text-sm font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-1.5 text-[0.8rem] leading-5 text-foreground/70">{step.description}</p>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-primary font-medium">
                <span>Building thoughtful digital systems</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2 — three full-width cards, each with its own accent like the Impact cards */}
        <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              custom={4 + index}
              initial="hidden"
              animate={animate}
              whileHover={{ y: -4, transition: { duration: durationFast * 0.5 } }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 sm:p-7 transition-[border-color,box-shadow] duration-500 ${item.hover}`}>
              <div
                className="mb-5 flex size-11 items-center justify-center rounded-xl"
                style={{ color: item.color, backgroundColor: `${item.color}1a` }}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-0.5 text-xs"
                    style={{ color: item.color, borderColor: `${item.color}40`, backgroundColor: `${item.color}0d` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
