import { DiagramFigure } from './diagram-figure';

export function PathSeparatorDiagram() {
  return (
    <DiagramFigure
      label="FIG. 01 — Anatomy of the crash"
      caption="Two code paths disagree about which separator to use, and the collision only exists as a filesystem path on Windows: the first segment comes from naive string-joining that assumes POSIX '/', the second from a pathlib.Path that Windows normalizes to '\\'.">
      <svg
        viewBox="0 0 900 230"
        role="img"
        aria-label="Diagram of the broken file path, showing the forward-slash segment built by naive POSIX-style string joining meeting the backslash segment built by Windows-normalized pathlib.Path, with the mismatch marked at the seam and an arrow down to the resulting FileNotFoundError."
        style={{ maxWidth: '100%', height: 'auto' }}
        className="text-foreground">
        <defs>
          <marker id="path-arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="var(--hazard)" />
          </marker>
        </defs>

        {/* annotation: POSIX-joined segment */}
        <text x={220} y={34} textAnchor="middle" fontSize="12" fill="currentColor">
          '/'.join(...) — assumes POSIX
        </text>
        <line x1={220} y1={42} x2={220} y2={104} stroke="currentColor" strokeWidth={1} strokeDasharray="3 3" />

        {/* annotation: pathlib segment */}
        <text x={476} y={34} textAnchor="middle" fontSize="12" fill="var(--hazard)">
          pathlib.Path(...) — Windows-normalized
        </text>
        <line x1={476} y1={42} x2={476} y2={104} stroke="var(--hazard)" strokeWidth={1} strokeDasharray="3 3" />

        {/* the literal broken path — segment widths measured from the rendered
            glyphs so the seam marker below lines up with the real character boundary */}
        <text x={30} y={120} fontSize="16" fontFamily="var(--font-mono)">
          <tspan fill="currentColor">/deps/langgraph-example-pyproject/my_agent</tspan>
          <tspan fill="var(--hazard)" fontWeight={700}>
            \graph.py
          </tspan>
        </text>

        {/* seam marker, at the measured x=433 boundary between the two segments */}
        <circle cx={433} cy={110} r={4} fill="var(--hazard)" />
        <line
          x1={433}
          y1={116}
          x2={433}
          y2={180}
          stroke="var(--hazard)"
          strokeWidth={1.5}
          markerEnd="url(#path-arrowhead)"
        />
        <text x={445} y={153} fontSize="12" fill="var(--hazard)">
          separator mismatch
        </text>

        {/* outcome, centered under the seam */}
        <rect x={313} y={186} width={240} height={40} rx={6} fill="none" stroke="var(--hazard)" strokeWidth={2} />
        <text
          x={433}
          y={211}
          textAnchor="middle"
          fontSize="13"
          fontFamily="var(--font-mono)"
          fontWeight={700}
          fill="var(--hazard)">
          FileNotFoundError
        </text>
      </svg>
    </DiagramFigure>
  );
}
