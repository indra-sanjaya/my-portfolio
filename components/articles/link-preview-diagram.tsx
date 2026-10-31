import { DiagramFigure } from './diagram-figure';
import { ArrowMarker, DiagramArrow, DiagramTag } from './diagram-primitives';

const DEFAULT_LABEL = 'FIG. 04 — Anatomy of a link preview';
const DEFAULT_CAPTION =
  'Left: with no usable tags, a platform can only guess from the URL. Right: the same link once og:image, og:title and og:description exist. Platforms may fall back to <title> and the meta description, but results vary — an explicit og:image is the only reliable way to control the preview image.';
const DEFAULT_ALT =
  'Two link-preview cards side by side. The left card, without metadata, shows only a placeholder image box and a bare URL. The right card, with metadata, shows an og:image, an og:title, an og:description and the site domain.';

type Props = { label?: string; caption?: string; alt?: string };

export function LinkPreviewDiagram({ label, caption, alt }: Props) {
  return (
    <DiagramFigure
      label={label ?? DEFAULT_LABEL}
      caption={caption ?? DEFAULT_CAPTION}>
      <svg
        viewBox="0 0 800 300"
        role="img"
        aria-label={alt ?? DEFAULT_ALT}
        style={{ maxWidth: '100%', height: 'auto' }}
        className="min-w-[620px] text-foreground">
        <defs>
          <ArrowMarker id="prev-arrow-hz" hazard />
        </defs>

        {/* WITHOUT METADATA */}
        <DiagramTag x={20} y={30}>
          WITHOUT METADATA
        </DiagramTag>
        <rect x={20} y={42} width={330} height={226} rx={8} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <rect
          x={20}
          y={42}
          width={330}
          height={112}
          rx={8}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="5 4"
          opacity={0.45}
        />
        <text x={185} y={103} textAnchor="middle" fontSize={12} fill="currentColor" opacity={0.55}>
          no image
        </text>
        <text x={38} y={188} fontSize={15} fontWeight={600} fill="currentColor">
          yoursite.com/post
        </text>
        <text x={38} y={212} fontSize={12} fill="currentColor" opacity={0.6}>
          (no title)
        </text>
        <text x={38} y={232} fontSize={12} fill="currentColor" opacity={0.6}>
          (no description)
        </text>
        <text x={38} y={254} fontSize={11} fontFamily="var(--font-mono)" fill="currentColor" opacity={0.6}>
          the platform has to guess
        </text>

        <DiagramArrow x1={366} y1={155} x2={432} y2={155} markerId="prev-arrow-hz" hazard />
        <DiagramTag x={399} y={141} hazard anchor="middle">
          + meta
        </DiagramTag>

        {/* WITH METADATA */}
        <DiagramTag x={450} y={30} hazard>
          WITH METADATA
        </DiagramTag>
        <rect x={450} y={42} width={330} height={226} rx={8} fill="none" stroke="var(--hazard)" strokeWidth={2} />
        <rect x={450} y={42} width={330} height={112} rx={8} fill="none" stroke="var(--hazard)" strokeWidth={1.5} />
        <path d="M462 140 L520 92 L560 124 L598 86 L660 140 Z" fill="var(--hazard)" opacity={0.18} />
        <text x={614} y={63} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--hazard)">
          og:image · 1200×630
        </text>

        <text x={468} y={182} fontSize={14} fontWeight={600} fill="currentColor">
          Metadata 101: Tell the Web
        </text>
        <text x={468} y={200} fontSize={14} fontWeight={600} fill="currentColor">
          What Your Site Is
        </text>
        <text x={762} y={182} textAnchor="end" fontSize={11} fontFamily="var(--font-mono)" fill="var(--hazard)">
          og:title
        </text>

        <text x={468} y={224} fontSize={12} fill="currentColor" opacity={0.72}>
          Title, description, Open Graph and more.
        </text>
        <text x={762} y={224} textAnchor="end" fontSize={11} fontFamily="var(--font-mono)" fill="var(--hazard)">
          og:description
        </text>

        <text x={468} y={252} fontSize={11} fontFamily="var(--font-mono)" fill="currentColor" opacity={0.6}>
          yoursite.com
        </text>
        <text x={762} y={252} textAnchor="end" fontSize={11} fontFamily="var(--font-mono)" fill="var(--hazard)">
          og:url
        </text>
      </svg>
    </DiagramFigure>
  );
}
