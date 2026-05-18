import { Badge } from '@/components/ui/badge';

type ProjectTechStackProps = {
  techStack: string[];
};

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  if (techStack.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Tech Stack</h4>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Badge key={tech} variant="secondary" className="px-3 py-1">
            {tech}
          </Badge>
        ))}
      </div>
    </section>
  );
}
