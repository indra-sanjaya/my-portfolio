import { DiagramFigure } from './diagram-figure';
import { ArrowMarker, DiagramArrow, DiagramBox, DiagramTag } from './diagram-primitives';

const DEFAULT_LABEL = 'FIG. 01 — One page, three readers';
const DEFAULT_CAPTION =
  'The rendered UI is only one half of a page. The <head> carries a second layer of information that humans never see, but that search engines and link-preview crawlers depend on.';
const DEFAULT_ALT =
  'Diagram of a single web page split into two layers. The rendered UI layer is read by humans. The head metadata layer, containing title, description, Open Graph and structured data, is read by search engines and by crawlers and social platforms.';

type Props = { label?: string; caption?: string; alt?: string };

export function MetadataAudiencesDiagram({ label, caption, alt }: Props) {
  return (
    <DiagramFigure
      label={label ?? DEFAULT_LABEL}
      caption={caption ?? DEFAULT_CAPTION}>
      <svg
        viewBox="0 0 780 372"
        role="img"
        aria-label={alt ?? DEFAULT_ALT}
        style={{ maxWidth: '100%', height: 'auto' }}
        className="min-w-[620px] text-foreground">
        <defs>
          <ArrowMarker id="aud-arrow" />
          <ArrowMarker id="aud-arrow-hz" hazard />
        </defs>

        <DiagramTag x={20} y={30}>
          YOUR PAGE
        </DiagramTag>
        <rect x={20} y={42} width={270} height={290} rx={10} fill="none" stroke="currentColor" strokeWidth={1.5} />

        <DiagramBox x={40} y={64} w={230} h={104} lines={['Rendered UI', 'layout · copy · visuals']} />
        <DiagramBox
          x={40}
          y={190}
          w={230}
          h={122}
          hazard
          lines={[
            '<head> metadata',
            '<title> · meta description',
            'canonical · Open Graph',
            'JSON-LD structured data',
          ]}
        />

        <DiagramTag x={490} y={30} hazard>
          WHO READS WHAT
        </DiagramTag>

        <DiagramBox x={490} y={42} w={270} h={84} lines={['Humans', 'see the rendered UI', 'judge it in seconds']} />
        <DiagramBox
          x={490}
          y={146}
          w={270}
          h={96}
          lines={['Search engines', 'read the title and description,', 'follow the canonical,', 'parse structured data']}
        />
        <DiagramBox
          x={490}
          y={262}
          w={270}
          h={84}
          lines={['Crawlers & platforms', 'build link previews from', 'Open Graph and Twitter Cards']}
        />

        <DiagramArrow x1={270} y1={116} x2={488} y2={84} markerId="aud-arrow" />
        <DiagramArrow x1={270} y1={251} x2={488} y2={194} markerId="aud-arrow-hz" hazard />
        <DiagramArrow x1={270} y1={251} x2={488} y2={304} markerId="aud-arrow-hz" hazard />
      </svg>
    </DiagramFigure>
  );
}
