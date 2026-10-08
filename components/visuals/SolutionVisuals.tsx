import { RING_CENTER, RING_INNER, RING_OUTER, RING_SEGMENTS, diamondPath, nestedDiamonds, segmentDash } from "@/lib/geometry";
import { D, N } from "./ServiceVisuals";

/** Dark-room compositions for the Solutions exhibition (white / ice / steel line work). */
const ICE = "#AEC4E2";
const STEEL = "#6B8DBB";

/** 01 Technology — the ring as an architectural wireframe with a nested core. */
function Technology() {
  const frames = nestedDiamonds(300, 300, 150, 34, 4, 16);
  return (
    <>
      <g transform="translate(50 50) scale(2.5)">
        {RING_SEGMENTS.map((seg, i) => (
          <path key={i} className="fade-in" d={RING_CENTER} pathLength={100} fill="none" strokeWidth="22" stroke={seg.kind === "block" ? "#fff" : ICE} strokeOpacity={seg.kind === "block" ? 0.16 : 0.2} {...segmentDash(seg)} style={{ transitionDelay: `${0.4 + i * 0.07}s` }} />
        ))}
        <D d={RING_OUTER} c="#fff" w={0.5} />
        <D d={RING_INNER} c={ICE} w={0.5} delay={0.2} />
      </g>
      {frames.map((d, i) => (
        <D key={i} d={d} c={STEEL} o={0.55 - i * 0.1} w={0.8} delay={0.5 + i * 0.1} />
      ))}
    </>
  );
}

/** 02 Enterprise — an isometric district of connected volumes. */
function Enterprise() {
  const cube = (x: number, y: number, w: number, h: number) => {
    const t = w * 0.5;
    return {
      top: `M${x} ${y - h}L${x + w} ${y - h + t}L${x} ${y - h + 2 * t}L${x - w} ${y - h + t}Z`,
      left: `M${x - w} ${y - h + t}L${x} ${y - h + 2 * t}V${y + 2 * t}L${x - w} ${y + t}Z`,
      right: `M${x + w} ${y - h + t}L${x} ${y - h + 2 * t}V${y + 2 * t}L${x + w} ${y + t}Z`,
    };
  };
  const blocks: [number, number, number, number][] = [
    [300, 330, 66, 170],
    [180, 380, 54, 100],
    [420, 390, 54, 130],
    [300, 450, 50, 60],
    [118, 300, 44, 60],
    [490, 300, 40, 90],
  ];
  return (
    <>
      {blocks.map(([x, y, w, h], i) => {
        const c = cube(x, y, w, h);
        return (
          <g key={i}>
            <path className="fade-in" d={c.top} fill="#fff" fillOpacity={0.16} style={{ transitionDelay: `${0.5 + i * 0.1}s` }} />
            <path className="fade-in" d={c.left} fill={STEEL} fillOpacity={0.14} style={{ transitionDelay: `${0.55 + i * 0.1}s` }} />
            <D d={c.top + c.left + c.right} c={i === 0 ? "#fff" : ICE} w={i === 0 ? 1.3 : 0.9} delay={i * 0.12} />
          </g>
        );
      })}
      <D d="M118 340L300 440L490 340M300 270V160" c={ICE} o={0.5} w={0.8} delay={0.9} />
      <N x={300} y={150} r={6} ring fill="#fff" delay={1.2} />
    </>
  );
}

/** 03 Business — a dial with measured arcs and compact bars. */
function Business() {
  const arc = (r: number, a0: number, a1: number) => {
    const p = (a: number) => `${(300 + Math.cos(a) * r).toFixed(1)} ${(300 + Math.sin(a) * r).toFixed(1)}`;
    return `M${p(a0)}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)}`;
  };
  const bars = [0, 1, 2, 3, 4, 5, 6].map((i) => `M${196 + i * 30} 470V${470 - (30 + i * 14)}`);
  return (
    <>
      <D d={arc(210, Math.PI * 0.8, Math.PI * 2.2)} c="#fff" w={1.4} />
      <D d={arc(168, Math.PI * 0.8, Math.PI * 1.75)} c={ICE} w={1} delay={0.2} />
      <D d={arc(126, Math.PI * 0.8, Math.PI * 1.4)} c={STEEL} w={1} delay={0.4} />
      <D d="M300 300L430 210" c="#fff" w={2} delay={0.7} />
      <N x={300} y={300} r={9} ring fill="#fff" delay={0.8} />
      <D d={bars.join("")} c={ICE} w={7} o={0.75} delay={0.9} strokeLinecap="butt" />
    </>
  );
}

/** 04 Infrastructure — a resilient mesh around a protected core. */
function Infrastructure() {
  const pts: [number, number][] = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return [300 + Math.cos(a) * 200, 300 + Math.sin(a) * 200];
  });
  const mesh: string[] = [];
  pts.forEach(([x, y], i) => {
    const [nx, ny] = pts[(i + 1) % 8];
    const [fx, fy] = pts[(i + 3) % 8];
    mesh.push(`M${x.toFixed(1)} ${y.toFixed(1)}L${nx.toFixed(1)} ${ny.toFixed(1)}`, `M${x.toFixed(1)} ${y.toFixed(1)}L${fx.toFixed(1)} ${fy.toFixed(1)}`, `M${x.toFixed(1)} ${y.toFixed(1)}L300 300`);
  });
  return (
    <>
      <D d={mesh.join("")} c={ICE} o={0.5} w={0.8} />
      <circle className="draw" pathLength={1} cx="300" cy="300" r="64" stroke="#fff" strokeWidth="1.4" fill="none" style={{ transitionDelay: "0.3s" }} />
      <circle className="fade-in" cx="300" cy="300" r="64" fill="#fff" fillOpacity="0.07" />
      {pts.map(([x, y], i) => (
        <N key={i} x={x} y={y} r={i % 2 ? 6 : 9} fill={i % 2 ? ICE : "#fff"} ring={i % 2 === 0} delay={0.5 + i * 0.07} />
      ))}
      <N x={300} y={300} r={8} fill="#fff" delay={0.4} />
    </>
  );
}

/** 05 Digital transformation — the same form, growing in scale and purpose. */
function Transformation() {
  const steps: [number, number, number, number][] = [
    [110, 470, 44, 8],
    [210, 430, 78, 12],
    [345, 380, 120, 16],
    [490, 320, 168, 22],
  ];
  return (
    <>
      {steps.map(([cx, cy, h, rc], i) => {
        const d = diamondPath(cx, cy, h, rc);
        return (
          <g key={i}>
            <path className="fade-in" d={d} fill={i === 3 ? "#fff" : ICE} fillOpacity={0.05 + i * 0.05} style={{ transitionDelay: `${0.6 + i * 0.15}s` }} />
            <D d={d} c={i === 3 ? "#fff" : ICE} w={i === 3 ? 1.5 : 1} delay={i * 0.18} />
          </g>
        );
      })}
      <D d="M60 560H570" c={STEEL} o={0.7} w={0.9} delay={0.2} />
      <D d="M60 440C200 440 330 330 470 150" c="#fff" w={1.4} delay={0.9} />
      <D d="M440 150H478V188" c="#fff" w={1.4} delay={1.4} />
    </>
  );
}

const V = [Technology, Enterprise, Business, Infrastructure, Transformation];

export default function SolutionVisual({ index, className = "" }: { index: number; className?: string }) {
  const C = V[index] ?? Technology;
  return (
    <svg viewBox="0 0 600 600" className={className} fill="none" aria-hidden="true" focusable="false">
      <C />
    </svg>
  );
}
