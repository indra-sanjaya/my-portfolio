import { DiagramFigure } from './diagram-figure';
import { ArrowMarker, DiagramArrow, DiagramBox, DiagramTag } from './diagram-primitives';

const STAGES = [
  { x: 20, name: 'Discover', detail: ['sitemap.xml', 'internal links', 'backlinks'] },
  { x: 220, name: 'Crawl', detail: ['robots.txt', 'allow / disallow', 'controls fetching'] },
  {
    x: 420,
    name: 'Index',
    detail: ['<title>', 'meta description', 'canonical URL', 'meta robots: noindex', 'structured data'],
  },
  {
    x: 620,
    name: 'Display',
    detail: ['Open Graph', 'Twitter Cards', '→ link previews', 'title + description', '→ search snippets'],
  },
] as const;

const DEFAULT_LABEL = 'FIG. 03 — Where each signal acts';
const DEFAULT_CAPTION =
  'Metadata is not one mechanism but several, each acting at a different stage. robots.txt controls fetching, not indexing — a page blocked from crawling can never be seen saying noindex, so the two must not be mixed up.';
const DEFAULT_ALT =
  'Four-stage pipeline: Discover, Crawl, Index, Display. Under each stage are the signals that act there: sitemap and links for discovery, robots.txt for crawling, title, description, canonical, noindex and structured data for indexing, and Open Graph, Twitter Cards, search snippets for display.';

type Props = { label?: string; caption?: string; alt?: string };

export function MetadataPipelineDiagram({ label, caption, alt }: Props) {
  return (
    <DiagramFigure
      label={label ?? DEFAULT_LABEL}
      caption={caption ?? DEFAULT_CAPTION}>
      <svg
        viewBox="0 0 800 300"
        role="img"
        aria-label={alt ?? DEFAULT_ALT}
        style={{ maxWidth: '100%', height: 'auto' }}
        className="min-w-[640px] text-foreground">
        <defs>
          <ArrowMarker id="pipe-arrow" />
          <ArrowMarker id="pipe-arrow-hz" hazard />
        </defs>

        {STAGES.map((stage, i) => {
          const emphasised = stage.name === 'Index';
          return (
            <g key={stage.name}>
              <DiagramTag x={stage.x} y={30} hazard={emphasised}>
                {`STAGE 0${i + 1}`}
              </DiagramTag>
              <DiagramBox x={stage.x} y={40} w={160} h={52} lines={[stage.name]} hazard={emphasised} />
              {i < STAGES.length - 1 && (
                <DiagramArrow x1={stage.x + 160} y1={66} x2={stage.x + 198} y2={66} markerId="pipe-arrow" />
              )}
              <DiagramArrow
                x1={stage.x + 80}
                y1={92}
                x2={stage.x + 80}
                y2={132}
                markerId={emphasised ? 'pipe-arrow-hz' : 'pipe-arrow'}
                hazard={emphasised}
                dashed
              />
              <DiagramBox
                x={stage.x}
                y={134}
                w={160}
                h={146}
                lines={[...stage.detail]}
                hazard={emphasised}
                align="start"
                uniform
              />
            </g>
          );
        })}
      </svg>
    </DiagramFigure>
  );
}
