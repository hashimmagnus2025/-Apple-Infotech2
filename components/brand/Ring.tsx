import { RING, RING_CENTER, RING_SEGMENTS, segmentDash } from "@/lib/geometry";

type Props = {
  /** colour of the four corner blocks */
  block?: string;
  /** colour of the four edge segments */
  edge?: string;
  blockOpacity?: number;
  edgeOpacity?: number;
  /** band thickness in ring units (default = logo proportion) */
  thickness?: number;
  /** push segments outward by this many units (static exploded view) */
  explode?: number;
  className?: string;
};

/**
 * The Apple Infotech ring as eight independent segments.
 * Render inside any `<svg viewBox="0 0 200 200">` (or a transformed <g>).
 * Each segment is `<g class="ring-seg" data-kind data-dx data-dy>` so it can be
 * targeted by GSAP or CSS.
 */
export function RingSegments({
  block = "currentColor",
  edge = "var(--mark-accent, #AEC4E2)",
  blockOpacity = 1,
  edgeOpacity = 1,
  thickness = RING.t,
  explode = 0,
  className = "",
}: Props) {
  return (
    <>
      {RING_SEGMENTS.map((seg, i) => {
        const dash = segmentDash(seg);
        const isBlock = seg.kind === "block";
        return (
          <g
            key={i}
            className={`ring-seg ${className}`}
            data-kind={seg.kind}
            data-dx={seg.dir[0]}
            data-dy={seg.dir[1]}
            transform={explode ? `translate(${(seg.dir[0] * explode).toFixed(2)} ${(seg.dir[1] * explode).toFixed(2)})` : undefined}
          >
            <path
              d={RING_CENTER}
              pathLength={100}
              fill="none"
              stroke={isBlock ? block : edge}
              strokeOpacity={isBlock ? blockOpacity : edgeOpacity}
              strokeWidth={thickness}
              {...dash}
            />
          </g>
        );
      })}
    </>
  );
}

/** Self-contained SVG of the ring. */
export default function Ring({ className, ...rest }: Props & { className?: string }) {
  return (
    <svg viewBox={RING.viewBox} className={className} fill="none" aria-hidden="true" focusable="false">
      <RingSegments {...rest} />
    </svg>
  );
}
