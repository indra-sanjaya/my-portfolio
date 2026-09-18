import { DiagramFigure } from './diagram-figure';

function Box({
  x,
  y,
  w,
  h,
  label,
  hazard = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string | string[];
  hazard?: boolean;
}) {
  const lines = Array.isArray(label) ? label : [label];
  const cx = x + w / 2;
  const cy = y + h / 2;
  const lineHeight = 15;
  const startY = cy - ((lines.length - 1) * lineHeight) / 2 + 4;

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
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={startY + i * lineHeight}
          textAnchor="middle"
          fontSize="13"
          fill="currentColor">
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
  labelX,
  labelY,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1.5} markerEnd="url(#rag-arrowhead)" />
      {label && (
        <text x={labelX ?? (x1 + x2) / 2} y={labelY ?? y1 - 8} textAnchor="middle" fontSize="11" fill="currentColor">
          {label}
        </text>
      )}
    </g>
  );
}

export function RagArchitectureDiagram() {
  return (
    <DiagramFigure
      label="FIG. 01 — Architecture"
      caption="Ingestion writes chunks and vectors into the same Atlas collection that $vectorSearch reads at query time — one store, one query, both similarity and metadata filtering.">
      <svg
        viewBox="0 0 990 250"
        role="img"
        aria-label="Diagram showing a PDF chunked and embedded into a MongoDB Atlas vector index, with an incoming question embedded and joined into a $vectorSearch query against that same index before being passed to Gemini for the final answer."
        style={{ maxWidth: '100%', height: 'auto' }}
        className="text-foreground">
        <defs>
          <marker id="rag-arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="currentColor" />
          </marker>
        </defs>

        <Box x={20} y={40} w={90} h={64} label="PDF" />
        <Arrow x1={110} y1={72} x2={150} y2={72} />

        <Box x={150} y={40} w={120} h={64} label="Chunks" />
        <Arrow x1={270} y1={72} x2={310} y2={72} />

        <Box x={310} y={40} w={120} h={64} label="Embed" />
        <Arrow x1={430} y1={72} x2={470} y2={72} label="writes" />

        <Box x={470} y={40} w={200} h={64} label={['Atlas', 'vectors + metadata']} hazard />
        <Arrow x1={670} y1={72} x2={710} y2={72} label="$vectorSearch" />

        <Box x={710} y={40} w={140} h={64} label="Gemini" />
        <Arrow x1={850} y1={72} x2={890} y2={72} />

        <Box x={890} y={40} w={80} h={64} label="Answer" />

        <Box x={560} y={170} w={120} h={50} label="Question" />
        <Arrow x1={620} y1={170} x2={688} y2={106} label="embed" labelX={600} labelY={148} />
      </svg>
    </DiagramFigure>
  );
}
