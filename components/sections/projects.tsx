'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';

import { ProjectDetailModal } from '@/components/projects/project-detail-modal';
import { projectsData, type ProjectCover, type ProjectData } from '@/lib/projects-data';
import { useAnimationConfig } from '@/hooks/use-animation-config';

/* -------------------------
   Unified Button Style
-------------------------- */
const baseButton =
  'group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95';

const primaryButton = `${baseButton} bg-foreground text-background hover:scale-110 hover:shadow-md transition-all duration-200`;

const outlineButton = `${baseButton} border border-border text-foreground hover:scale-110 hover:shadow-md transition-all duration-200 px-9 py-2`;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** One accent per project, dark enough to read as small text on both themes. */
const PROJECT_ACCENT: Record<string, string> = {
  'firework-studio': '#EA580C',
  sprintzee: '#059669',
  tripplanner: '#0284C7',
  voca: '#7C3AED',
};
const DEFAULT_ACCENT = '#0284C7';

function hostOf(url?: string) {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, '') : '';
  } catch {
    return '';
  }
}

/** One preview per project: a browser window for web apps, a pair of phones for mobile apps. */
function ProjectPreview({ cover, title, liveUrl }: { cover: ProjectCover; title: string; liveUrl?: string }) {
  const frame =
    cover.variant === 'phone' ? (
      <div className="relative flex h-[340px] sm:h-[400px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-secondary/40 to-primary/5">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative flex items-center">
          <div className="-rotate-3 overflow-hidden rounded-[1.6rem] border-[5px] border-foreground/80 shadow-xl transition-transform duration-500 group-hover/preview:-rotate-6 group-hover/preview:-translate-x-1">
            <Image
              src={cover.src}
              alt={cover.alt}
              width={411}
              height={838}
              sizes="(max-width: 1024px) 40vw, 200px"
              className="h-[290px] sm:h-[350px] w-auto"
            />
          </div>
          {cover.secondarySrc && (
            <div className="-ml-8 mt-8 rotate-3 overflow-hidden rounded-[1.6rem] border-[5px] border-foreground/80 shadow-xl transition-transform duration-500 group-hover/preview:rotate-6 group-hover/preview:translate-x-1">
              <Image
                src={cover.secondarySrc}
                alt={cover.secondaryAlt ?? ''}
                width={411}
                height={839}
                sizes="(max-width: 1024px) 40vw, 200px"
                className="h-[290px] sm:h-[350px] w-auto"
              />
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5 transition-shadow duration-500 group-hover/preview:shadow-xl">
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 min-w-0 truncate rounded-md bg-background/80 px-3 py-0.5 text-[11px] text-muted-foreground">
            {hostOf(liveUrl) || title}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover object-top transition-transform duration-700 group-hover/preview:scale-[1.04]"
          />
        </div>
      </div>
    );

  const label = `Open ${title} live demo`;
  return liveUrl ? (
    <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={label} className="group/preview block">
      {frame}
    </a>
  ) : (
    <div className="group/preview">{frame}</div>
  );
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { duration, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;
  const accent = PROJECT_ACCENT[project.id] ?? DEFAULT_ACCENT;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const highlights = project.features.slice(0, 3);
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: k * 0.6, ease: EASE } },
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      id={`project-${project.id}`}
      className="group scroll-mt-28"
      style={{ ['--accent' as string]: accent }}
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-border
          bg-card
          p-6 sm:p-8 md:p-10
          transition-all duration-500
          hover:border-border/60
          hover:bg-secondary/20
        "
      >
        {/* accent line that fills left to right */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: `${accent}22` }}>
          <motion.span
            className="block h-full origin-left rounded-r-full"
            style={{
              backgroundImage: `linear-gradient(to right, ${accent}99, ${accent})`,
              boxShadow: `0 0 14px ${accent}88`,
            }}
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: k * 1.8, delay: k * 0.2, ease: EASE } },
            }}
          />
        </span>
        {/* soft tint on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundImage: `radial-gradient(90% 70% at 0% 0%, ${accent}12, transparent 60%)` }}
        />

        <div
          className={`relative grid grid-cols-[minmax(0,1fr)] gap-8 lg:gap-12 lg:items-center ${
            project.cover ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]' : ''
          }`}
        >
          {project.cover && (
            <motion.div
              className={`relative ${index % 2 === 0 ? 'lg:order-2' : ''}`}
              variants={{
                hidden: { y: 28, scale: 1.03 },
                visible: { y: 0, scale: 1, transition: { duration: k * 1.1, delay: k * 0.15, ease: EASE } },
              }}
            >
              <ProjectPreview cover={project.cover} title={project.title} liveUrl={project.liveUrl} />
              {/* curtain that wipes away left to right, with an accent leading edge */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-right rounded-2xl bg-card"
                style={{ borderLeft: `3px solid ${accent}` }}
                variants={{
                  hidden: { scaleX: 1 },
                  visible: { scaleX: 0, transition: { duration: k * 1.1, delay: k * 0.15, ease: EASE } },
                }}
              />
            </motion.div>
          )}

          {/* CONTENT */}
          <motion.div
            className="space-y-6"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: k * 0.09, delayChildren: k * 0.3 } } }}
          >
            <motion.div variants={itemVariants}>
              <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-muted-foreground">
                <span className="font-mono font-semibold" style={{ color: accent }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {project.subtitle && <span>{project.subtitle}</span>}
              </span>

              <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
            </motion.div>
            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed max-w-xl">
              {project.shortDescription}
            </motion.p>
            {/* FEATURES */}
            <motion.ul variants={itemVariants} className="space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                  {item}
                </li>
              ))}
            </motion.ul>
            {/* TECH */}
            <motion.div
              className="flex flex-wrap gap-2 pt-2"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: k * 0.05 } } }}
            >
              {project.techStack.slice(0, 6).map((tech, index) => {
                const colors = [
                  'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
                  'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
                  'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
                  'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
                  'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20',
                  'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
                ];

                const colorClass = colors[index % colors.length];

                return (
                  <motion.span
                    key={tech}
                    variants={{
                      hidden: { opacity: 0, scale: 0.85 },
                      visible: { opacity: 1, scale: 1, transition: { duration: k * 0.4, ease: EASE } },
                    }}
                    className={`
          px-3 py-1 text-xs
          rounded-full
          border
          transition
          hover:scale-[1.03]
          hover:shadow-sm
          ${colorClass}
        `}
                  >
                    {tech}
                  </motion.span>
                );
              })}
            </motion.div>{' '}
            {/* ACTIONS */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
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
            </motion.div>
          </motion.div>
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
      transition={{ duration }}
    >
      <div className="content-container">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: durationFast }}
          className="mb-16"
        >
          <span className="section-eyebrow">Selected Work</span>
          <h2 className="section-title mt-4">Projects</h2>
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
