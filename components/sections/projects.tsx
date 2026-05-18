'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

import { ProjectDetailModal } from '@/components/projects/project-detail-modal';
import { projectsData, type ProjectData } from '@/lib/projects-data';

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

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const highlights = project.features.slice(0, 3);

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
              {project.subtitle ?
                <span className="text-xs tracking-widest uppercase text-muted-foreground">{project.subtitle}</span>
              : null}
              <h3 className="mt-2 text-3xl md:text-4xl font-medium text-foreground tracking-tight">{project.title}</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl">{project.shortDescription}</p>

            <ul className="space-y-2">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs tracking-wide text-muted-foreground bg-secondary rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex lg:flex-col gap-3">
            <ProjectDetailModal project={project} />
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
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
