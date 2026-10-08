/**
 * Apple Infotech brand geometry — the visual DNA of the site.
 *
 * Traced from the supplied logo: a rounded square turned 45° into a diamond,
 * built as a RING of eight segments — four black corner blocks alternating
 * with four light-blue edge segments — around an open, rounded void.
 *
 * Every decorative system on the page derives from this:
 *   • the 45° diamond lattice          (backgrounds, patterns)
 *   • concentric rounded diamonds      (frames, ripples, loader, dividers)
 *   • the 8-segment ring               (hero object, masks, CTA structure)
 *   • the open void                    (windows, focus, "the destination")
 *
 * The ring is drawn as ONE rounded-diamond centre-line, stroked thick, and cut
 * into segments with stroke-dasharray (pathLength = 100) — so every segment can
 * be addressed, animated or exploded independently while staying resolution
 * independent and tiny.
 */

export const BRAND = {
  ink: "#050505",
  white: "#FFFFFF",
  /** Light blue sampled from the logo. */
  ice: "#AEC4E2",
  /** Deeper blues derived from the same hue (215°) for contrast. */
  steel: "#6B8DBB",
  steelInk: "#3A5883",
} as const;

/** Ring definition in a 200×200 box. */
export const RING = {
  viewBox: "0 0 200 200",
  cx: 100,
  cy: 100,
  /** half-diagonal of the stroked centre-line */
  half: 80,
  /** corner radius of the centre-line */
  rc: 20,
  /** band thickness */
  t: 22,
} as const;

const SQ2 = Math.SQRT2;

/**
 * Rounded diamond (square rotated 45°). Starts at the top corner's apex and
 * runs clockwise. `half` is the half-diagonal of the *unrounded* diamond.
 */
export function diamondPath(cx: number, cy: number, half: number, rc: number): string {
  const k = rc / SQ2;
  const f = (n: number) => +n.toFixed(2);
  const apexY = cy - half + rc * (SQ2 - 1);
  return [
    `M${f(cx)} ${f(apexY)}`,
    `A${rc} ${rc} 0 0 1 ${f(cx + k)} ${f(cy - half + k)}`,
    `L${f(cx + half - k)} ${f(cy - k)}`,
    `A${rc} ${rc} 0 0 1 ${f(cx + half - k)} ${f(cy + k)}`,
    `L${f(cx + k)} ${f(cy + half - k)}`,
    `A${rc} ${rc} 0 0 1 ${f(cx - k)} ${f(cy + half - k)}`,
    `L${f(cx - half + k)} ${f(cy + k)}`,
    `A${rc} ${rc} 0 0 1 ${f(cx - half + k)} ${f(cy - k)}`,
    `L${f(cx - k)} ${f(cy - half + k)}`,
    `A${rc} ${rc} 0 0 1 ${f(cx)} ${f(apexY)}Z`,
  ].join("");
}

/** Centre-line of the ring (the stroked path). */
export const RING_CENTER = diamondPath(RING.cx, RING.cy, RING.half, RING.rc);
/** Outer / inner boundaries of the band (for hairline outlines). */
export const RING_OUTER = diamondPath(RING.cx, RING.cy, RING.half + (RING.t / 2) * SQ2, RING.rc + RING.t / 2);
export const RING_INNER = diamondPath(RING.cx, RING.cy, RING.half - (RING.t / 2) * SQ2, Math.max(2, RING.rc - RING.t / 2));
/** The open void at the heart of the mark. */
export const RING_VOID = RING_INNER;

export type RingSegment = {
  kind: "block" | "edge";
  /** start / length along the path, in pathLength=100 units */
  start: number;
  len: number;
  /** outward direction (unit vector) — used for exploded views */
  dir: readonly [number, number];
};

const D = 0.7071;
export const RING_SEGMENTS: readonly RingSegment[] = [
  { kind: "block", start: -6, len: 12, dir: [0, -1] },
  { kind: "edge", start: 6, len: 13, dir: [D, -D] },
  { kind: "block", start: 19, len: 12, dir: [1, 0] },
  { kind: "edge", start: 31, len: 13, dir: [D, D] },
  { kind: "block", start: 44, len: 12, dir: [0, 1] },
  { kind: "edge", start: 56, len: 13, dir: [-D, D] },
  { kind: "block", start: 69, len: 12, dir: [-1, 0] },
  { kind: "edge", start: 81, len: 13, dir: [-D, -D] },
];

/** stroke-dash props that isolate a single segment of a pathLength=100 path */
export function segmentDash(seg: RingSegment) {
  const offset = (100 - (((seg.start % 100) + 100) % 100)) % 100;
  return { strokeDasharray: `${seg.len} ${100 - seg.len}`, strokeDashoffset: offset };
}

/** 45° lattice — two families of diagonals, translation period = step on x. */
export function diamondLattice(size: number, step: number): string {
  const segs: string[] = [];
  for (let c = -size; c <= size * 2; c += step) {
    segs.push(`M${c} 0L${c + size} ${size}`, `M${c + size} 0L${c} ${size}`);
  }
  return segs.join("");
}

/** Concentric rounded diamonds centred on (cx, cy). */
export function nestedDiamonds(cx: number, cy: number, h0: number, gap: number, count: number, rc = 14): string[] {
  return Array.from({ length: count }, (_, i) => diamondPath(cx, cy, h0 + i * gap, rc + i * 2));
}
