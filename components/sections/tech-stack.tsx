'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';

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

import { Sparkles, BrainCircuit, Bot, DatabaseZap, Layers3 } from 'lucide-react';

type Tech = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

type Category = {
  title: string;
  description: string;
  technologies: Tech[];
};

const categories: Category[] = [
  {
    title: 'Languages',
    description: 'Core programming languages used across frontend and backend development.',
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
    description: 'Server-side technologies, APIs, and scalable application architecture.',
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
    ],
  },

  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile development and deployment tools.',
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
    description: 'Tools and workflows used to build AI-powered applications and intelligent systems.',
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

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
  });

  return (
    <section id="tech-stack" ref={ref} className="py-32 px-6 border-t border-border scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Technologies</span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Tech Stack & AI Integration
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            Technologies and tools I use to build modern full-stack and AI-powered applications, from responsive
            interfaces and scalable APIs to intelligent chat systems and retrieval-based AI workflows.
          </p>
        </motion.div>
        {/* CATEGORY GRID */}
        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category, categoryIndex) => {
            const isAI = category.title === 'AI & LLM Integration';

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: categoryIndex * 0.06,
                }}
                className={`
          relative overflow-hidden
          rounded-3xl border border-border
          bg-card/50 backdrop-blur-sm
          p-7
          ${isAI ? 'md:col-span-2' : ''}
        `}>
                {/* subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

                {/* CATEGORY HEADER */}
                <div className="relative mb-7">
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{category.description}</p>
                </div>

                {/* TECH ITEMS */}
                <div className="relative flex flex-wrap gap-3">
                  {category.technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.06 + index * 0.025,
                      }}
                      whileHover={{ y: -3 }}
                      className="group relative">
                      {/* HOVER GLOW */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background:
                            tech.color === '#ffffff' ?
                              'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)'
                            : `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)`,
                        }}
                      />

                      {/* CHIP */}
                      <div
                        className="
                  relative
                  flex items-center gap-3
                  px-4 py-3
                  rounded-2xl
                  border border-border
                  bg-background/70
                  transition-all duration-300
                  hover:border-white/10
                  hover:shadow-lg
                ">
                        {/* ICON */}
                        <div
                          className="
                    flex items-center justify-center
                    w-9 h-9 rounded-xl
                    border text-lg shrink-0
                    transition-all duration-300
                  "
                          style={{
                            color: tech.color === '#ffffff' ? 'hsl(var(--foreground))' : tech.color,
                            backgroundColor: tech.color === '#ffffff' ? 'rgba(255,255,255,0.06)' : `${tech.color}15`,
                            borderColor: tech.color === '#ffffff' ? 'rgba(255,255,255,0.08)' : `${tech.color}25`,
                          }}>
                          {tech.icon}
                        </div>

                        {/* NAME */}
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">{tech.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
