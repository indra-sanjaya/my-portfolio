'use client';

import { ArrowUpRight, Github, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { ProjectData } from '@/lib/projects-data';
import { useMemo } from 'react';

type ProjectDetailModalProps = {
  project: ProjectData;
};

/* -----------------------------
   Premium Section Styling
------------------------------ */

const sectionLabelClass = 'text-base md:text-lg font-semibold tracking-wide text-foreground/80';

const sectionBaseClass = 'relative rounded-3xl border border-transparent p-6 md:p-10 space-y-6';

function Section({
  title,
  id,
  variant,
  children,
}: {
  title: string;
  id: string;
  variant: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${sectionBaseClass} ${variant} scroll-mt-24`}>
      {/* subtle gradient border effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />

      <p className={sectionLabelClass}>{title}</p>
      {children}
    </section>
  );
}

/* -----------------------------
   Optional: Section Nav
------------------------------ */

function SectionNav() {
  const items = [
    { id: 'tech', label: 'Tech' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'architecture', label: 'Architecture' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-16 z-40 mb-10 hidden md:flex gap-2 overflow-x-auto rounded-full border border-border/40 bg-background/60 p-2 backdrop-blur-xl">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => scrollTo(item.id)}
          className="rounded-full px-4 py-1 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition">
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* -----------------------------
   Main Component
------------------------------ */

export function ProjectDetailModal({ project }: ProjectDetailModalProps) {
  const heroImage = project.screenshots[0];
  const galleryImages = project.screenshots.slice(1);

  const sectionVariants = useMemo(
    () => ({
      tech: 'bg-blue-500/5',
      features: 'bg-emerald-500/5',
      gallery: 'bg-purple-500/5',
      challenges: 'bg-amber-500/5',
      architecture: 'bg-pink-500/5',
    }),
    [],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-full px-6.5 py-2.5 hover:scale-110 hover:shadow-md transition-all duration-200">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="
          h-[100dvh]
          w-screen
          max-w-none
          overflow-hidden
          rounded-none
          border-0
          bg-background/98
          p-0
        ">
        <div className="h-full w-full overflow-y-auto">
          {/* HEADER */}
          <div className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
              <div className="flex items-center gap-4">
                <DialogTitle className="text-xl font-semibold md:text-2xl">{project.title}</DialogTitle>

                <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                  {project.status}
                </Badge>
              </div>

              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 py-10 md:px-10 md:py-14">
            {/* HERO */}
            <section className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">{project.title}</h2>

                <DialogDescription className="text-base md:text-lg text-muted-foreground leading-8">
                  {project.fullDescription}
                </DialogDescription>
              </div>

              <div className="overflow-hidden rounded-[32px] border border-border/50 bg-secondary/20">
                <img src={heroImage.src} alt={heroImage.alt} className="h-[320px] md:h-[620px] w-full object-cover" />
              </div>
            </section>

            {/* SECTION NAV */}
            <SectionNav />

            {/* TECH STACK */}
            <Section id="tech" title="Tech Stack" variant={sectionVariants.tech}>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/40 bg-background/40 px-4 py-2 text-sm text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </Section>

            {/* FEATURES */}
            <Section id="features" title="Key Features" variant={sectionVariants.features}>
              <div className="grid gap-5 md:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-border/40 bg-background/40 p-5">
                    <p className="text-muted-foreground leading-7">{feature}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* GALLERY */}
            {galleryImages.length > 0 && (
              <Section id="gallery" title="Project Gallery" variant={sectionVariants.gallery}>
                <div className="grid gap-8">
                  {galleryImages.map((image) => (
                    <div
                      key={image.alt}
                      className="overflow-hidden rounded-3xl border border-border/40 bg-background/40">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* CHALLENGES */}
            <Section id="challenges" title="Challenges & Solutions" variant={sectionVariants.challenges}>
              <div className="space-y-5">
                {project.challenges.map((challenge) => (
                  <div key={challenge} className="rounded-2xl border border-border/40 bg-background/40 p-5">
                    <p className="text-muted-foreground leading-7">{challenge}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ARCHITECTURE */}
            <Section id="architecture" title="Architecture Highlights" variant={sectionVariants.architecture}>
              <div className="grid gap-5 md:grid-cols-2">
                {project.architectureHighlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-border/40 bg-background/40 p-5">
                    <p className="text-muted-foreground leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* CTA */}
            <section className="flex flex-wrap gap-4 border-t border-border/40 pt-16">
              {project.liveUrl && (
                <Button asChild className="rounded-full px-6">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}

              {project.githubUrl && (
                <Button variant="outline" asChild className="rounded-full px-6">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
