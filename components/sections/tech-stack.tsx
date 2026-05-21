'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

import { useAnimationConfig } from '@/hooks/use-animation-config';

import {
  SiJavascript,
  SiTypescript,
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
} from 'lucide-react';

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

const categories: Category[] = [
  {
    title: 'Languages',
    description: 'Core programming languages used across frontend and backend development.',
    categoryIcon: <Code2 className="w-6 h-6" />,
    categoryIconColor: '#F59E0B',
    technologies: [
      {
        name: 'JavaScript',
        icon: <SiJavascript />,
        color: '#F7DF1E',
      },
      {
        name: 'TypeScript',
        icon: <SiTypescript />,
        color: '#3178C6',
      },
    ],
  },

  {
    title: 'Frontend',
    description: 'Modern UI frameworks and styling technologies for responsive applications.',
    categoryIcon: <SiReact className="w-6 h-6" />,
    categoryIconColor: '#38BDF8',
    technologies: [
      {
        name: 'React',
        icon: <SiReact />,
        color: '#61DAFB',
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs />,
        color: '#ffffff',
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss />,
        color: '#38BDF8',
      },
    ],
  },

  {
    title: 'Backend & APIs',
    description: 'Server-side technologies, APIs, and scalable architecture.',
    categoryIcon: <SiNodedotjs className="w-6 h-6" />,
    categoryIconColor: '#22C55E',
    technologies: [
      {
        name: 'Node.js',
        icon: <SiNodedotjs />,
        color: '#68A063',
      },
      {
        name: 'Express',
        icon: <SiExpress />,
        color: '#ffffff',
      },
      {
        name: 'GraphQL',
        icon: <SiGraphql />,
        color: '#E10098',
      },
      {
        name: 'Apollo Client',
        icon: <SiApollographql />,
        color: '#311C87',
      },
    ],
  },

  {
    title: 'Databases & ORM',
    description: 'Database technologies and data management tools.',
    categoryIcon: <Database className="w-6 h-6" />,
    categoryIconColor: '#8B5CF6',
    technologies: [
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql />,
        color: '#336791',
      },
      {
        name: 'MongoDB',
        icon: <SiMongodb />,
        color: '#47A248',
      },
      {
        name: 'Redis',
        icon: <SiRedis />,
        color: '#DC382D',
      },
      {
        name: 'Sequelize',
        icon: <SiSequelize />,
        color: '#52B0E7',
      },
    ],
  },

  {
    title: 'Authentication & Security',
    description: 'Authentication systems and application security practices.',
    categoryIcon: <ShieldCheck className="w-6 h-6" />,
    categoryIconColor: '#EF4444',
    technologies: [
      {
        name: 'bcryptjs',
        icon: <FaUserLock />,
        color: '#F59E0B',
      },
      {
        name: 'Express Session',
        icon: <MdOutlineAccountBox />,
        color: '#10B981',
      },
      {
        name: 'JsonWebToken',
        icon: <IoIosLock />,
        color: '#F59E0B',
      },
    ],
  },

  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile development and deployment tools.',
    categoryIcon: <Smartphone className="w-6 h-6" />,
    categoryIconColor: '#06B6D4',
    technologies: [
      {
        name: 'React Native',
        icon: <FaMobileAlt />,
        color: '#61DAFB',
      },
      {
        name: 'Expo',
        icon: <SiExpo />,
        color: '#ffffff',
      },
      {
        name: 'React Navigation',
        icon: <LiaReact />,
        color: '#61DAFB',
      },
      {
        name: 'Expo Secure Store',
        icon: <IoIosLock />,
        color: '#A855F7',
      },
      {
        name: 'EAS Build',
        icon: <FaBoxes />,
        color: '#F97316',
      },
    ],
  },

  {
    title: 'AI & LLM Integration',
    featured: true,
    description: 'Tools and workflows used to build AI-powered applications and intelligent systems.',
    categoryIcon: <Brain className="w-6 h-6" />,
    categoryIconColor: '#A855F7',
    technologies: [
      {
        name: 'Gemini API',
        icon: <SiGooglegemini />,
        color: '#8E75FF',
      },
      {
        name: 'OpenAI API',
        icon: <SiOpenai />,
        color: '#10A37F',
      },
      {
        name: 'Vercel AI SDK',
        icon: <SiVercel />,
        color: '#ffffff',
      },
      {
        name: 'LangChain',
        icon: <SiLangchain />,
        color: '#1C64F2',
      },
      {
        name: 'Prompt Engineering',
        icon: <Sparkles className="w-4 h-4" />,
        color: '#F59E0B',
      },
      {
        name: 'RAG Systems',
        icon: <BrainCircuit className="w-4 h-4" />,
        color: '#8B5CF6',
      },
      {
        name: 'AI Chat Interfaces',
        icon: <Bot className="w-4 h-4" />,
        color: '#06B6D4',
      },
      {
        name: 'Semantic Search',
        icon: <DatabaseZap className="w-4 h-4" />,
        color: '#EC4899',
      },
      {
        name: 'Context Management',
        icon: <Layers3 className="w-4 h-4" />,
        color: '#22C55E',
      },
    ],
  },
];

export function TechStackSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { duration, durationFast } = useAnimationConfig();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
  });

  const [expandedCategories, setExpandedCategories] = useState<string[]>(['AI & LLM Integration']);

  const handleExpand = (title: string) => {
    setExpandedCategories((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };

  return (
    <section id="tech-stack" ref={ref} className="py-32 px-6 border-t border-border scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Technologies</span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Tech Stack & AI Integration
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
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
                  layout
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: durationFast,
                    delay: categoryIndex * 0.05,
                  }}
                  className={`
                    relative overflow-hidden
                    rounded-[2rem]
                    border
                    transition-all duration-500
                    'border-border bg-card/60'
                  `}>
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

                  {/* HEADER */}
                  <button
                    onClick={() => handleExpand(category.title)}
                    className="
                      group relative w-full text-left
                      p-7 md:p-8
                    ">
                    <div className="flex items-start justify-between gap-6">
                      {/* LEFT */}
                      <div className="flex items-start gap-5 flex-1 min-w-0">
                        {/* CATEGORY ICON */}
                        <div
                          className="
                            shrink-0
                            flex items-center justify-center
                            w-14 h-14 rounded-2xl border
                            border-border bg-background/50 text-muted-foreground"
                          style={{
                            borderColor: category.categoryIconColor + '25',
                            backgroundColor: category.categoryIconColor + '15',
                            color: category.categoryIconColor,
                          }}>
                          {category.categoryIcon}
                        </div>

                        {/* TEXT */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className="text-2xl font-semibold text-foreground">{category.title}</h3>

                            {category.featured && (
                              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
                                <BadgeCheck className="w-3 h-3" />
                                Featured
                              </div>
                            )}
                          </div>

                          <p className="text-muted-foreground leading-7 max-w-3xl">{category.description}</p>

                          <div className="flex items-center gap-3 mt-5 text-sm text-muted-foreground">
                            <span>{category.technologies.length} Technologies</span>

                            {!isExpanded && (
                              <>
                                <span className="opacity-30">•</span>

                                <span>Click to expand</span>
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
                          w-12 h-12 rounded-2xl
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
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: durationFast }}
                        className="px-7 md:px-8 pb-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
