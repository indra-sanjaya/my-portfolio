import Image from 'next/image';

type ArticleFigureProps = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  /** Intrinsic pixel size of the source file, used for layout and aspect ratio. */
  width: number;
  height: number;
  /** Cap the rendered width in px so portrait images don't dominate the column. */
  maxWidth?: number;
};

/**
 * Captioned image figure matching DiagramFigure's frame. Use this instead of
 * markdown ![]() when the image needs a label, a caption, or a width cap.
 */
export function ArticleFigure({ src, alt, label, caption, width, height, maxWidth = 520 }: ArticleFigureProps) {
  return (
    <figure className="my-10 overflow-hidden rounded-lg border border-border bg-card/40">
      <div className="border-b border-border/60 bg-muted/40 px-4 py-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {label}
      </div>
      <div className="flex justify-center p-4 sm:p-6">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={`(min-width: 768px) ${maxWidth}px, 100vw`}
          style={{ width: '100%', maxWidth, height: 'auto' }}
          className="rounded-md border border-border/60"
        />
      </div>
      <figcaption className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
