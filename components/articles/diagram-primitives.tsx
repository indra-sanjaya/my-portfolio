/**
 * Shared SVG building blocks for article diagrams. Visual language matches the
 * existing diagrams: outline-only shapes in currentColor, with the --hazard
 * accent reserved for the one thing the reader should look at first.
 */

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** First line renders at full weight; the rest render smaller and muted. */
  lines: string[];
  hazard?: boolean;
  dashed?: boolean;
  /** Align text to the left edge (with padding) instead of centering it. */
  align?: 'center' | 'start';
  /** Render every line at the same weight, for plain lists with no heading line. */
  uniform?: boolean;
};

const PRIMARY_SIZE = 14;
const SECONDARY_SIZE = 12;
const LINE_HEIGHT = 17;

export function DiagramBox({
  x,
  y,
  w,
  h,
  lines,
  hazard = false,
  dashed = false,
  align = 'center',
  uniform = false,
}: BoxProps) {
  const blockHeight = (lines.length - 1) * LINE_HEIGHT;
  const startY = y + h / 2 - blockHeight / 2 + 4;
  const textX = align === 'center' ? x + w / 2 : x + 14;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="none"
        stroke={hazard ? 'var(--hazard)' : 'currentColor'}
        strokeWidth={hazard ? 2 : 1.5}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      {lines.map((line, i) => {
        const isHeading = i === 0 && !uniform;
        return (
          <text
            key={i}
            x={textX}
            y={startY + i * LINE_HEIGHT}
            textAnchor={align === 'center' ? 'middle' : 'start'}
            fontSize={isHeading ? PRIMARY_SIZE : SECONDARY_SIZE}
            fontWeight={isHeading ? 600 : 400}
            fill="currentColor"
            opacity={isHeading || uniform ? 1 : 0.72}>
            {line}
          </text>
        );
      })}
    </g>
  );
}

type ArrowProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Must match a <marker id> defined in the parent <svg>. */
  markerId: string;
  hazard?: boolean;
  dashed?: boolean;
};

export function DiagramArrow({ x1, y1, x2, y2, markerId, hazard = false, dashed = false }: ArrowProps) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={hazard ? 'var(--hazard)' : 'currentColor'}
      strokeWidth={1.5}
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd={`url(#${markerId})`}
    />
  );
}

export function ArrowMarker({ id, hazard = false }: { id: string; hazard?: boolean }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <polygon points="0 0, 8 4, 0 8" fill={hazard ? 'var(--hazard)' : 'currentColor'} />
    </marker>
  );
}

/** Small mono caption used above groups of shapes. */
export function DiagramTag({
  x,
  y,
  children,
  hazard = false,
  anchor = 'start',
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  hazard?: boolean;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={11}
      letterSpacing="0.08em"
      fontFamily="var(--font-mono)"
      fill={hazard ? 'var(--hazard)' : 'currentColor'}
      opacity={hazard ? 1 : 0.7}>
      {children}
    </text>
  );
}
