'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

import { ProjectDetailModal } from '@/components/projects/project-detail-modal';
import { projectsData, type ProjectData } from '@/lib/projects-data';
import { useAnimationConfig } from '@/hooks/use-animation-config';

/* -------------------------
   Unified Button Style
-------------------------- */
const baseButton =
  'group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95';

const primaryButton = `${baseButton} bg-foreground text-background hover:scale-110 hover:shadow-md transition-all duration-200`;

const outlineButton = `${baseButton} border border-border text-foreground hover:scale-110 hover:shadow-md transition-all duration-200 px-9 py-2`;

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { duration } = useAnimationConfig();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const highlights = project.features.slice(0, 3);

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      transition={{ delay: index * 0.12 }}
      className="group">
      <div
        className="
          relative
          rounded-3xl
          border border-border
          bg-card
          p-6 sm:p-8 md:p-10
          transition-all duration-500
          hover:border-border/60
          hover:bg-secondary/20
        ">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-6">
            <div>
              {project.subtitle && (
                <span className="text-xs tracking-widest uppercase text-muted-foreground">{project.subtitle}</span>
              )}

              <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl">{project.shortDescription}</p>
            {/* FEATURES */}
            <ul className="space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {/* TECH */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.slice(0, 6).map((tech, index) => {
                const colors = [
                  'bg-blue-500/10 text-blue-300 border-blue-500/20',
                  'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
                  'bg-purple-500/10 text-purple-300 border-purple-500/20',
                  'bg-amber-500/10 text-amber-300 border-amber-500/20',
                  'bg-pink-500/10 text-pink-300 border-pink-500/20',
                  'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
                ];

                const colorClass = colors[index % colors.length];

                return (
                  <span
                    key={tech}
                    className={`
          px-3 py-1 text-xs
          rounded-full
          border
          transition
          hover:scale-[1.03]
          hover:shadow-sm
          ${colorClass}
        `}>
                    {tech}
                  </span>
                );
              })}
            </div>{' '}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-wrap lg:flex-col gap-3 lg:items-end">
            {/* DETAILS (FIXED MODAL TRIGGER) */}
            <ProjectDetailModal project={project} />

            {/* LIVE DEMO */}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                Live Demo
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

            {/* GITHUB */}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={outlineButton}>
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

/* -------------------------
   SECTION WRAPPER
-------------------------- */
export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { duration, durationFast } = useAnimationConfig();

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="section-y section-padding scroll-mt-28"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration }}>
      <div className="content-container">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: durationFast }}
          className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Selected Work</span>
          <h2 className="mt-4 text-[clamp(2.4rem,6vw,3.6rem)] font-bold tracking-tight leading-tight text-foreground">
            Projects
          </h2>
        </motion.div>

        {/* LIST */}
        <div className="space-y-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
