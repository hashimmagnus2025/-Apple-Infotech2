import { RING_CENTER, RING_OUTER, RING_INNER, RING_SEGMENTS, diamondLattice, segmentDash } from "@/lib/geometry";

/**
 * Stage visuals for the scroll transformation — white/ice line work on dark.
 * `.tp-draw` strokes and `.tp-fade` fills are driven by ScrollTrigger.
 */
const ICE = "#AEC4E2";
const STEEL = "#6B8DBB";

function P({ d, o = 1, w = 1, c = "#fff" }: { d: string; o?: number; w?: number; c?: string }) {
  return <path className="tp-draw" d={d} pathLength={1} strokeDasharray={1} stroke={c} strokeOpacity={o} strokeWidth={w} fill="none" />;
}

/** 01 — a single point of intent radiating outward. */
function Idea() {
  const rays: string[] = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const r1 = 46;
    const r2 = i % 3 === 0 ? 230 : i % 2 === 0 ? 150 : 100;
    rays.push(`M${(300 + Math.cos(a) * r1).toFixed(1)} ${(300 + Math.sin(a) * r1).toFixed(1)}L${(300 + Math.cos(a) * r2).toFixed(1)} ${(300 + Math.sin(a) * r2).toFixed(1)}`);
  }
  return (
    <>
      <P d={rays.join("")} o={0.5} w={0.8} />
      <circle className="tp-draw" cx="300" cy="300" r="260" pathLength={1} strokeDasharray={1} stroke={ICE} strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
      <circle className="tp-draw" cx="300" cy="300" r="30" pathLength={1} strokeDasharray={1} stroke="#fff" strokeWidth="1.2" fill="none" />
      <circle className="tp-fade" cx="300" cy="300" r="9" fill="#fff" />
    </>
  );
}

/** 02 — nested squares: structure, tooling, a grid taking shape. */
function Technology() {
  const sq: string[] = [];
  for (let k = 1; k <= 6; k++) {
    const s = k * 44;
    sq.push(`M300 ${300 - s}L${300 + s} 300L300 ${300 + s}L${300 - s} 300Z`);
  }
  const box: string[] = [];
  for (let k = 1; k <= 6; k++) {
    const s = k * 31;
    box.push(`M${300 - s} ${300 - s}H${300 + s}V${300 + s}H${300 - s}Z`);
  }
  return (
    <>
      {sq.map((d, i) => (
        <P key={i} d={d} o={0.8 - i * 0.1} w={0.9} />
      ))}
      {box.map((d, i) => (
        <P key={`b${i}`} d={d} o={0.5 - i * 0.06} w={0.7} c={ICE} />
      ))}
      <P d="M300 36V564M36 300H564" o={0.4} w={0.7} />
      <circle className="tp-fade" cx="300" cy="300" r="7" fill="#fff" />
      {[[300, 36], [564, 300], [300, 564], [36, 300]].map(([x, y]) => (
        <circle key={`${x}${y}`} className="tp-fade" cx={x} cy={y} r="4" fill={ICE} />
      ))}
    </>
  );
}

/** 03 — the ring assembling out of its eight parts. */
function Solution() {
  return (
    <>
      <g transform="translate(50 50) scale(2.5)">
        {RING_SEGMENTS.map((seg, i) => (
          <g key={i} className="tp-piece" data-from={`${(seg.dir[0] * 90).toFixed(0)},${(seg.dir[1] * 90).toFixed(0)}`}>
            <path d={RING_CENTER} pathLength={100} fill="none" strokeWidth="22" stroke={seg.kind === "block" ? "#fff" : ICE} strokeOpacity={seg.kind === "block" ? 0.95 : 0.9} {...segmentDash(seg)} />
          </g>
        ))}
        <path className="tp-draw" d={RING_OUTER} pathLength={1} strokeDasharray={1} stroke={STEEL} strokeWidth="0.35" fill="none" />
        <path className="tp-draw" d={RING_INNER} pathLength={1} strokeDasharray={1} stroke={STEEL} strokeWidth="0.35" fill="none" />
      </g>
      <P d={diamondLattice(600, 60)} o={0.12} w={0.5} c={ICE} />
    </>
  );
}

/** 04 — ripples: effect travelling outward through the business. */
function Impact() {
  const rings = [42, 82, 126, 172, 222, 276];
  return (
    <>
      {rings.map((r, i) => (
        <circle key={r} className="tp-draw" cx="300" cy="300" r={r} pathLength={1} strokeDasharray={1} stroke={i % 2 ? ICE : "#fff"} strokeOpacity={0.85 - i * 0.12} strokeWidth="0.9" fill="none" />
      ))}
      <P d="M300 300L300 24M300 300L560 150M300 300L560 450M300 300L40 450M300 300L40 150" o={0.28} w={0.7} />
      <circle className="tp-fade" cx="300" cy="300" r="13" fill="#fff" />
      <circle className="tp-fade" cx="300" cy="24" r="5" fill={ICE} />
      <circle className="tp-fade" cx="560" cy="150" r="5" fill={ICE} />
      <circle className="tp-fade" cx="560" cy="450" r="5" fill={ICE} />
      <circle className="tp-fade" cx="40" cy="450" r="5" fill={ICE} />
      <circle className="tp-fade" cx="40" cy="150" r="5" fill={ICE} />
    </>
  );
}

/** 05 — stepped ascent: the return, measured. */
function Roi() {
  const bars = [0, 1, 2, 3, 4, 5].map((i) => {
    const x = 70 + i * 82;
    const h = 60 + i * 66;
    return `M${x} 520V${520 - h}H${x + 56}V520`;
  });
  return (
    <>
      {bars.map((d, i) => (
        <P key={i} d={d} o={0.85} w={1} c={i === 5 ? "#fff" : ICE} />
      ))}
      <P d="M52 520H560" o={0.7} w={1} />
      <P d="M52 470L560 90" o={0.8} w={1.6} />
      <P d="M520 80L562 86L548 128" o={0.9} w={1.6} />
      <path className="tp-fade" d="M432 520V190H488V520Z" fill="#fff" fillOpacity="0.14" />
      <circle className="tp-fade" cx="560" cy="86" r="8" fill="#fff" />
    </>
  );
}

const STAGES = [Idea, Technology, Solution, Impact, Roi];

export default function StageVisual({ index, className = "" }: { index: number; className?: string }) {
  const V = STAGES[index] ?? Idea;
  return (
    <svg viewBox="0 0 600 600" className={className} fill="none" aria-hidden="true" focusable="false">
      <V />
    </svg>
  );
}
