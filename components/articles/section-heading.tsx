const FIGURE_LABEL_PATTERN = /^\[\s*(\d+)\s*\]\s*/;

function splitFigureLabel(children: React.ReactNode): { label: string | null; rest: React.ReactNode } {
  if (typeof children !== 'string') return { label: null, rest: children };
  const match = children.match(FIGURE_LABEL_PATTERN);
  if (!match) return { label: null, rest: children };
  return { label: match[1], rest: children.slice(match[0].length) };
}

function FigureLabel({ label }: { label: string }) {
  return <span className="mr-3 align-middle font-mono text-base font-normal text-hazard">FIG. {label}</span>;
}

export function SectionHeading2({ children, ...props }: React.ComponentProps<'h2'>) {
  const { label, rest } = splitFigureLabel(children);
  return (
    <h2
      {...props}
      className="mt-16 mb-6 scroll-mt-28 font-sans text-2xl font-bold tracking-tight text-foreground first:mt-0 sm:text-3xl">
      {label && <FigureLabel label={label} />}
      {rest}
    </h2>
  );
}

export function SectionHeading3({ children, ...props }: React.ComponentProps<'h3'>) {
  const { label, rest } = splitFigureLabel(children);
  return (
    <h3 {...props} className="mt-10 mb-4 scroll-mt-28 font-sans text-xl font-bold tracking-tight text-foreground">
      {label && <FigureLabel label={label} />}
      {rest}
    </h3>
  );
}
