'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: 'SprintZee',
    subtitle: 'Sportswear Marketplace',
    description:
      'A fullstack e-commerce platform built for scale, featuring secure authentication and performance-optimized browsing experience.',
    highlights: [
      'JWT authentication with secure architecture',
      'Infinite scrolling for seamless UX',
      'Production-ready scalability',
    ],
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind', 'JWT'],
    liveUrl: 'https://sportswear-sprintzee.vercel.app',
    githubUrl: 'https://github.com/H8-FSJS-P3S6/gc02-indra-sanjaya.git',
  },
  {
    title: 'TripPlanner',
    subtitle: 'AI Travel Organizer',
    description:
      'An intelligent itinerary generator that transforms travel planning through AI-powered recommendations and real-time data handling.',
    highlights: [
      'Google Generative AI integration',
      'Full CRUD with secure data handling',
      'Real-world usability focus',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redux Toolkit'],
    liveUrl: 'https://individual-project-indra-sanjaya-jl.vercel.app',
    githubUrl: 'https://github.com/indra-sanjaya/individual-project-indra-sanjaya.git',
  },
  {
    title: 'VOCA',
    subtitle: 'Real-Time Social Media Platform',
    description:
      'A scalable mobile social media application enabling real-time content sharing, secure authentication, and seamless user interaction through optimized performance and intuitive navigation.',
    highlights: [
      'Real-time data handling with GraphQL and Apollo Client',
      'Secure authentication using Expo Secure Store',
      'Smooth navigation with Native Stack and Bottom Tabs',
      'Optimized mobile performance via Expo and EAS Build',
    ],
    tech: ['React Native', 'Expo', 'Apollo Client', 'GraphQL', 'React Navigation', 'Expo Secure Store', 'EAS Build'],
    liveUrl:
      'https://expo.dev/preview/update?message=server+updated&updateRuntimeVersion=1.0.0&createdAt=2026-03-07T07%3A22%3A20.085Z&slug=exp&projectId=ab66a824-9324-457d-b11f-cd4de7545a7e&group=20503038-5ad8-4974-9528-7ad89dd79d28',
    githubUrl: 'https://github.com/H8-FSJS-P3S6/gc01-indra-sanjaya.git',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      transition={{ delay: index * 0.15 }}
      className="group">
      <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-muted-foreground/30 hover:bg-secondary/30">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-xs tracking-widest uppercase text-muted-foreground">{project.subtitle}</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-medium text-foreground tracking-tight">{project.title}</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl">{project.description}</p>

            <ul className="space-y-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs tracking-wide text-muted-foreground bg-secondary rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex lg:flex-col gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-foreground/90">
                Live Demo
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-full text-sm font-medium transition-all duration-300 hover:bg-secondary hover:border-transparent">
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id="projects"
      className="py-32 px-6 scroll-mt-28"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Selected Work</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-foreground">Projects</h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
