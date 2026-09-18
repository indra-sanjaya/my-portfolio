export function DiagramFigure({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-lg border border-border bg-card/40">
      <div className="border-b border-border/60 bg-muted/40 px-4 py-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {label}
      </div>
      <div className="overflow-x-auto p-4 sm:p-6">{children}</div>
      <figcaption className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
