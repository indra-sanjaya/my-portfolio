'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

import { useAnimationConfig } from '@/hooks/use-animation-config';
import { TECH_STACK } from '@/lib/profile-data';

import {
  SiJavascript,
  SiTypescript,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiApollographql,
  SiExpo,
  SiTailwindcss,
  SiSequelize,
  SiOpenai,
  SiVercel,
  SiLangchain,
  SiGooglegemini,
  SiSap,
} from 'react-icons/si';

import { FaUserLock, FaMobileAlt, FaBoxes } from 'react-icons/fa';

import { MdOutlineAccountBox } from 'react-icons/md';

import { LiaReact } from 'react-icons/lia';

import { IoIosLock } from 'react-icons/io';

import {
  Sparkles,
  BrainCircuit,
  Bot,
  DatabaseZap,
  Layers3,
  ChevronDown,
  BadgeCheck,
  Code2,
  Database,
  ShieldCheck,
  Smartphone,
  Brain,
  Leaf,
  Award,
  Activity,
  AlertTriangle,
  ClipboardCheck,
  Handshake,
  Warehouse,
  FileSignature,
  Calculator,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Tech = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

type Category = {
  title: string;
  description: string;
  featured?: boolean;
  categoryIcon: React.ReactNode;
  categoryIconColor: string;
  technologies: Tech[];
};

const techVisuals: Record<string, { icon: React.ReactNode; color: string }> = {
  'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
  'TypeScript': { icon: <SiTypescript />, color: '#3178C6' },
  'Go (Golang)': { icon: <SiGo />, color: '#00ADD8' },
  'React': { icon: <SiReact />, color: '#61DAFB' },
  'Next.js': { icon: <SiNextdotjs />, color: '#ffffff' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: '#38BDF8' },
  'Node.js': { icon: <SiNodedotjs />, color: '#68A063' },
  'Express': { icon: <SiExpress />, color: '#ffffff' },
  'GraphQL': { icon: <SiGraphql />, color: '#E10098' },
  'Apollo Client': { icon: <SiApollographql />, color: '#311C87' },
  'PostgreSQL': { icon: <SiPostgresql />, color: '#336791' },
  'MongoDB': { icon: <SiMongodb />, color: '#47A248' },
  'Redis': { icon: <SiRedis />, color: '#DC382D' },
  'Sequelize': { icon: <SiSequelize />, color: '#52B0E7' },
  'bcryptjs': { icon: <FaUserLock />, color: '#F59E0B' },
  'Express Session': { icon: <MdOutlineAccountBox />, color: '#10B981' },
  'JsonWebToken': { icon: <IoIosLock />, color: '#F59E0B' },
  'React Native': { icon: <FaMobileAlt />, color: '#61DAFB' },
  'Expo': { icon: <SiExpo />, color: '#ffffff' },
  'React Navigation': { icon: <LiaReact />, color: '#61DAFB' },
  'Expo Secure Store': { icon: <IoIosLock />, color: '#A855F7' },
  'EAS Build': { icon: <FaBoxes />, color: '#F97316' },
  'ISO 14001 EMS': { icon: <Award className="w-4 h-4" />, color: '#10B981' },
  'CEMS Monitoring': { icon: <Activity className="w-4 h-4" />, color: '#22C55E' },
  'Environmental Risk Assessment': { icon: <AlertTriangle className="w-4 h-4" />, color: '#F59E0B' },
  'ESG Compliance & Reporting': { icon: <ClipboardCheck className="w-4 h-4" />, color: '#16A34A' },
  'HSE Inspection & Auditing': { icon: <ShieldCheck className="w-4 h-4" />, color: '#EF4444' },
  'Procurement & Vendor Management': { icon: <Handshake className="w-4 h-4" />, color: '#F97316' },
  'MRP & Inventory Optimization': { icon: <Warehouse className="w-4 h-4" />, color: '#8B5CF6' },
  'Supplier Negotiation & Contracts': { icon: <FileSignature className="w-4 h-4" />, color: '#0EA5E9' },
  'Purchasing & Cost Analysis': { icon: <Calculator className="w-4 h-4" />, color: '#F59E0B' },
  'SAP': { icon: <SiSap />, color: '#0FAAFF' },
  'Gemini API': { icon: <SiGooglegemini />, color: '#8E75FF' },
  'OpenAI API': { icon: <SiOpenai />, color: '#10A37F' },
  'Vercel AI SDK': { icon: <SiVercel />, color: '#ffffff' },
  'LangChain': { icon: <SiLangchain />, color: '#1C64F2' },
  'Prompt Engineering': { icon: <Sparkles className="w-4 h-4" />, color: '#F59E0B' },
  'RAG Systems': { icon: <BrainCircuit className="w-4 h-4" />, color: '#8B5CF6' },
  'AI Chat Interfaces': { icon: <Bot className="w-4 h-4" />, color: '#06B6D4' },
  'Semantic Search': { icon: <DatabaseZap className="w-4 h-4" />, color: '#EC4899' },
  'Context Management': { icon: <Layers3 className="w-4 h-4" />, color: '#22C55E' },
};

const categoryVisuals: Record<string, { categoryIcon: React.ReactNode; categoryIconColor: string }> = {
  'Languages': { categoryIcon: <Code2 className="w-6 h-6" />, categoryIconColor: '#F59E0B' },
  'Frontend': { categoryIcon: <SiReact className="w-6 h-6" />, categoryIconColor: '#38BDF8' },
  'Backend & APIs': { categoryIcon: <SiNodedotjs className="w-6 h-6" />, categoryIconColor: '#22C55E' },
  'Databases & ORM': { categoryIcon: <Database className="w-6 h-6" />, categoryIconColor: '#8B5CF6' },
  'Authentication & Security': { categoryIcon: <ShieldCheck className="w-6 h-6" />, categoryIconColor: '#EF4444' },
  'Mobile Development': { categoryIcon: <Smartphone className="w-6 h-6" />, categoryIconColor: '#06B6D4' },
  'Engineering & Sustainability': { categoryIcon: <Leaf className="w-6 h-6" />, categoryIconColor: '#10B981' },
  'AI & LLM Integration': { categoryIcon: <Brain className="w-6 h-6" />, categoryIconColor: '#A855F7' },
};

const fallbackVisual = { icon: <Code2 />, color: '#94A3B8' };
const fallbackCategory = { categoryIcon: <Code2 className="w-6 h-6" />, categoryIconColor: '#94A3B8' };

// Names, grouping and descriptions come from lib/profile-data.ts (shared with the AI chat assistant).
// Only the icons and colours live here; a technology without an entry above still shows up with a neutral icon.
const categories: Category[] = TECH_STACK.map((group) => ({
  title: group.category,
  description: group.description,
  featured: group.featured,
  ...(categoryVisuals[group.category] ?? fallbackCategory),
  technologies: group.items.map((name) => ({ name, ...(techVisuals[name] ?? fallbackVisual) })),
}));

export function TechStackSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { duration, durationFast, prefersReduced } = useAnimationConfig();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
  });

  const [expandedCategories, setExpandedCategories] = useState<string[]>(['AI & LLM Integration']);

  const handleExpand = (title: string) => {
    setExpandedCategories((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };

  return (
    <section id="tech-stack" ref={ref} className="section-y section-padding border-t border-border scroll-mt-28">
      <div className="content-container">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="mb-16">
          <span className="section-eyebrow">Technologies</span>

          <h2 className="section-title mt-4">
            Skills, Tech Stack & AI Integration
          </h2>
          <motion.div
            className="mt-5 flex h-1 w-40 origin-left overflow-hidden rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: prefersReduced ? 0 : 1, delay: prefersReduced ? 0 : 0.3, ease: EASE }}
            aria-hidden="true">
            {['#F59E0B', '#38BDF8', '#22C55E', '#8B5CF6'].map((color) => (
              <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
            ))}
          </motion.div>

          <p className="mt-5 text-[clamp(1rem,2.2vw,1.125rem)] leading-7 text-muted-foreground max-w-3xl">
            Technologies and tools I use to build modern full-stack and AI-powered applications.
          </p>
        </motion.div>

        {/* VERTICAL STACK */}
        <div className="space-y-6">
          <AnimatePresence>
            {categories.map((category, categoryIndex) => {
              const isExpanded = expandedCategories.includes(category.title);

              const isAI = category.title === 'AI & LLM Integration';

              return (
                <motion.div
                  key={category.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: { opacity: 1, y: 0, transition: { duration: durationFast, ease: EASE } },
                  }}
                  className={`
                    relative overflow-hidden
                    rounded-[2rem]
                    border
                    transition-all duration-500
                    border-border bg-card/60
                  `}>
                  {/* accent line that fills left to right, in the category colour */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-1"
                    style={{ backgroundColor: `${category.categoryIconColor}26` }}>
                    <motion.span
                      className="block h-full origin-left"
                      style={{
                        backgroundColor: category.categoryIconColor,
                        boxShadow: `0 0 12px ${category.categoryIconColor}99`,
                      }}
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: { scaleX: 1, transition: { duration: prefersReduced ? 0 : 1.4, delay: prefersReduced ? 0 : 0.25, ease: EASE } },
                      }}
                    />
                  </span>
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

                  {/* HEADER */}
                  <button
                    onClick={() => handleExpand(category.title)}
                    className="
                      group relative w-full text-left
                      p-5 sm:p-7 md:p-8
                    ">
                    <div className="flex items-start justify-between gap-3 sm:gap-6">
                      {/* LEFT */}
                      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-4 sm:gap-x-5 flex-1 min-w-0">
                        {/* CATEGORY ICON */}
                        <motion.div
                          variants={{ hidden: { scale: 0.5, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.35, ease: [0.34, 1.56, 0.64, 1] } } }}
                          className="
                            shrink-0
                            flex items-center justify-center
                            w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border
                            border-border bg-background/50 text-muted-foreground"
                          style={{
                            borderColor: category.categoryIconColor + '25',
                            backgroundColor: category.categoryIconColor + '15',
                            color: category.categoryIconColor,
                          }}>
                          {category.categoryIcon}
                        </motion.div>

                        {/* TITLE */}
                        <div className="min-w-0 self-center sm:self-start">
                          <div className="flex flex-wrap items-center gap-3 sm:mb-3">
                            <h3 className="text-2xl font-semibold text-foreground">{category.title}</h3>

                            {category.featured && (
                              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
                                <BadgeCheck className="w-3 h-3" />
                                Featured
                              </div>
                            )}
                          </div>
                        </div>

                        {/* DESCRIPTION: full width on mobile, aligned under the title from sm up */}
                        <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:-mt-4">
                          <p className="text-muted-foreground leading-7 max-w-3xl">{category.description}</p>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-5 text-sm text-muted-foreground">
                            <span className="whitespace-nowrap">{category.technologies.length} Technologies</span>

                            {!isExpanded && (
                              <>
                                <span className="opacity-30">•</span>

                                <span className="whitespace-nowrap">Click to expand</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div
                        className={`
                          shrink-0
                          flex items-center justify-center
                          w-10 h-10 sm:w-12 sm:h-12 rounded-2xl
                          border border-border
                          bg-background/60
                          transition-all duration-300
                          ${
                            isExpanded ?
                              'rotate-180 border-primary/20 bg-primary/10 text-primary'
                            : 'group-hover:border-primary/20 group-hover:bg-primary/5'
                          }
                        `}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  {/* EXPANDED */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: durationFast }}
                        className="px-6 sm:px-7 md:px-8 pb-7 sm:pb-8">
                        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                          {category.technologies.map((tech, index) => (
                            <motion.div
                              key={tech.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: durationFast,
                                delay: index * 0.03,
                              }}
                              whileHover={{ y: -3 }}
                              className="group relative">
                              {/* Glow */}
                              <div
                                className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                                style={{
                                  background:
                                    tech.color === '#ffffff' ?
                                      'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)'
                                    : `radial-gradient(circle at center, ${tech.color}35 0%, transparent 70%)`,
                                }}
                              />

                              {/* TECH CARD */}
                              <div
                                className="
                                  relative
                                  flex items-center gap-4
                                  rounded-3xl
                                  border border-border
                                  bg-background/60
                                  px-5 py-5
                                  transition-all duration-300
                                  hover:border-white/10
                                  hover:bg-background/80
                                  hover:shadow-xl
                                ">
                                {/* ICON */}
                                <div
                                  className="
                                    flex items-center justify-center
                                    w-14 h-14 rounded-2xl
                                    border text-2xl shrink-0
                                  "
                                  style={{
                                    color: tech.color === '#ffffff' ? 'hsl(var(--foreground))' : tech.color,
                                    backgroundColor:
                                      tech.color === '#ffffff' ? 'rgba(128,128,128,0.12)' : `${tech.color}15`,
                                    borderColor: tech.color === '#ffffff' ? 'rgba(128,128,128,0.2)' : `${tech.color}25`,
                                  }}>
                                  {tech.icon}
                                </div>

                                {/* INFO */}
                                <div className="min-w-0">
                                  <p className="text-base font-semibold text-foreground">{tech.name}</p>

                                  <p className="text-sm text-muted-foreground mt-1">Technology Stack</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
