import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import type { ProjectScreenshot } from '@/lib/projects-data';
import { cn } from '@/lib/utils';

type ProjectGalleryProps = {
  screenshots: ProjectScreenshot[];
  title: string;
  className?: string;
  variant?: 'hero' | 'grid';
  heading?: string;
  showCount?: boolean;
};

export function ProjectGallery({
  screenshots,
  title,
  className,
  variant = 'hero',
  heading,
  showCount = true,
}: ProjectGalleryProps) {
  if (screenshots.length === 0) {
    return null;
  }

  const [hero] = screenshots;

  const titleText = heading ?? (variant === 'hero' ? 'Hero Screenshot' : 'Additional Screenshots');

  if (variant === 'hero') {
    return (
      <section className={cn('space-y-5', className)} aria-label={`${title} hero screenshot`}>
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{titleText}</h4>
        </div>
        <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 shadow-2xl shadow-black/10 transition-shadow duration-500 hover:shadow-black/20">
          <div className="relative aspect-[16/9] w-full min-h-[clamp(220px,40vw,520px)]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(min-width: 1280px) 1080px, (min-width: 768px) 92vw, 100vw"
              priority
            />
          </div>
          {hero.label ?
            <div className="absolute left-6 top-6">
              <Badge variant="secondary" className="bg-background/80">
                {hero.label}
              </Badge>
            </div>
          : null}
        </div>
      </section>
    );
  }

  return (
    <section className={cn('space-y-5', className)} aria-label={`${title} screenshots`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{titleText}</h4>
        {showCount ?
          <span className="text-xs text-muted-foreground">{screenshots.length} more</span>
        : null}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {screenshots.map((shot) => (
          <div
            key={shot.alt}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-lg shadow-black/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-black/15">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 520px, 90vw"
              />
            </div>
            {shot.label ?
              <div className="absolute left-4 top-4">
                <Badge variant="secondary" className="bg-background/80">
                  {shot.label}
                </Badge>
              </div>
            : null}
          </div>
        ))}
      </div>
    </section>
  );
}
