import type { SVGProps } from "react";
import { diamondPath } from "@/lib/geometry";

/**
 * Five bespoke line compositions — one per service. Pure SVG, drawn in with
 * CSS (`.draw` / `.fade-in` react to an ancestor `.is-active`).
 * Colours come from `currentColor` (ink) and the steel / ice accents.
 */
const INK = "currentColor";
const STEEL = "#6B8DBB";
const ICE = "#AEC4E2";

export function D({ d, delay = 0, w = 1, o = 1, c = INK, ...rest }: { d: string; delay?: number; w?: number; o?: number; c?: string } & SVGProps<SVGPathElement>) {
  return (
    <path
      d={d}
      className="draw"
      pathLength={1}
      stroke={c}
      strokeOpacity={o}
      strokeWidth={w}
      fill="none"
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    />
  );
}
export function N({ x, y, r = 5, delay = 0, fill = INK, ring = false }: { x: number; y: number; r?: number; delay?: number; fill?: string; ring?: boolean }) {
  return (
    <g className="fade-in" style={{ transitionDelay: `${delay}s` }}>
      {ring && <circle cx={x} cy={y} r={r + 7} fill="none" stroke={STEEL} strokeOpacity="0.5" />}
      <circle cx={x} cy={y} r={r} fill={fill} />
    </g>
  );
}

/** 01 — Connected digital architecture: stacked planes joined by a spine. */
function Digital() {
  const plane = (cy: number) => `M300 ${cy - 82}L480 ${cy}L300 ${cy + 82}L120 ${cy}Z`;
  return (
    <>
      {[430, 300, 170].map((cy, i) => (
        <g key={cy}>
          <path className="fade-in" d={plane(cy)} fill={i === 2 ? ICE : STEEL} fillOpacity={i === 2 ? 0.35 : 0.08} style={{ transitionDelay: `${0.5 + i * 0.15}s` }} />
          <D d={plane(cy)} delay={i * 0.18} w={1.2} />
        </g>
      ))}
      <D d="M120 170V430M480 170V430" delay={0.5} o={0.45} w={0.8} />
      <D d="M300 170V430" delay={0.7} w={1.2} c={STEEL} />
      {[170, 300, 430].map((y, i) => (
        <N key={y} x={300} y={y} r={7} ring delay={0.8 + i * 0.12} />
      ))}
      <D d="M120 170L58 118M480 430L548 490M480 170L548 112" delay={0.9} o={0.55} w={0.8} />
      <N x={58} y={118} r={4} delay={1.1} fill={STEEL} />
      <N x={548} y={490} r={4} delay={1.2} fill={STEEL} />
      <N x={548} y={112} r={4} delay={1.3} fill={STEEL} />
    </>
  );
}

/** 02 — Technical grid: measured cells, rulers, a stepped signal. */
function Technical() {
  const lines: string[] = [];
  for (let i = 0; i <= 12; i++) {
    lines.push(`M${60 + i * 40} 60V540`, `M60 ${60 + i * 40}H540`);
  }
  const ticks: string[] = [];
  for (let i = 0; i <= 12; i++) ticks.push(`M${60 + i * 40} 40v${i % 3 === 0 ? 14 : 7}`, `M40 ${60 + i * 40}h${i % 3 === 0 ? 14 : 7}`);
  const cells: [number, number, number][] = [[3, 2, 0.28], [4, 2, 0.14], [7, 4, 0.34], [5, 6, 0.2], [8, 7, 0.14], [2, 8, 0.2], [9, 2, 0.1]];
  return (
    <>
      {cells.map(([cx, cy, o], i) => (
        <rect key={i} className="fade-in" x={60 + cx * 40} y={60 + cy * 40} width="40" height="40" fill={i % 2 ? STEEL : ICE} fillOpacity={o + 0.1} style={{ transitionDelay: `${0.6 + i * 0.08}s` }} />
      ))}
      <D d={lines.join("")} o={0.28} w={0.7} />
      <D d={ticks.join("")} o={0.7} w={1} delay={0.2} />
      <D d="M60 460H140V380H220V420H300V300H380V340H460V200H540" w={2.2} c={INK} delay={0.5} />
      <N x={460} y={200} r={6} ring delay={1.4} />
      <D d="M60 60h30M60 60v30M540 540h-30M540 540v-30" w={2} delay={0.1} />
      <g className="fade-in" fontFamily="var(--font-jb-mono), monospace" fontSize="11" letterSpacing="1.2" fill={INK} style={{ transitionDelay: "1.5s" }}>
        <text x="472" y="190">X 460 · Y 200</text>
      </g>
    </>
  );
}

/** 03 — Flow system: work routed automatically through decision and merge. */
function Automation() {
  return (
    <>
      <D d="M110 300H214" w={1.4} delay={0.1} />
      <D d="M262 300C310 300 310 175 360 175H398" w={1.4} delay={0.3} />
      <D d="M262 300C310 300 310 425 360 425H398" w={1.4} delay={0.4} />
      <D d="M470 175C512 175 512 300 540 300" w={1.4} delay={0.6} />
      <D d="M470 425C512 425 512 300 540 300" w={1.4} delay={0.7} />
      {/* live flow */}
      <g className="fade-in" style={{ transitionDelay: "1s" }}>
        <path className="flow" d="M110 300H214M262 300C310 300 310 175 360 175H398M262 300C310 300 310 425 360 425H398" stroke={STEEL} strokeWidth="2" fill="none" />
        <path className="flow" d="M470 175C512 175 512 300 540 300M470 425C512 425 512 300 540 300" stroke={STEEL} strokeWidth="2" fill="none" />
      </g>
      <D d="M238 252L286 300L238 348L190 300Z" w={1.4} delay={0.2} />
      <D d="M398 140H470V210H398Z" w={1.4} delay={0.5} />
      <D d="M398 390H470V460H398Z" w={1.4} delay={0.6} />
      <path className="fade-in" d="M398 140H470V210H398Z" fill={ICE} fillOpacity="0.5" style={{ transitionDelay: "0.9s" }} />
      <path className="fade-in" d="M238 252L286 300L238 348L190 300Z" fill={INK} fillOpacity="0.08" style={{ transitionDelay: "0.8s" }} />
      <N x={96} y={300} r={9} ring delay={0.1} />
      <N x={548} y={300} r={9} ring delay={0.9} fill={STEEL} />
      <g className="fade-in" fontFamily="var(--font-jb-mono), monospace" fontSize="11" letterSpacing="1.4" fill={INK} style={{ transitionDelay: "1.2s" }}>
        <text x="60" y="340">INPUT</text>
        <text x="206" y="230">IF</text>
        <text x="398" y="230">AUTO</text>
        <text x="398" y="480">REVIEW</text>
        <text x="514" y="340">DONE</text>
      </g>
    </>
  );
}

/** 04 — Enterprise infrastructure: a hub, rings and blocks on every spoke. */
function Enterprise() {
  const spokes: string[] = [];
  const blocks: [number, number, number][] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x1 = 300 + Math.cos(a) * 62;
    const y1 = 300 + Math.sin(a) * 62;
    const x2 = 300 + Math.cos(a) * 196;
    const y2 = 300 + Math.sin(a) * 196;
    spokes.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
    blocks.push([300 + Math.cos(a) * 226, 300 + Math.sin(a) * 226, (a * 180) / Math.PI + 90]);
  }
  return (
    <>
      <circle className="draw" pathLength={1} cx="300" cy="300" r="62" stroke={INK} strokeWidth="1.4" fill="none" />
      <circle className="draw" pathLength={1} cx="300" cy="300" r="128" stroke={STEEL} strokeWidth="1" strokeDasharray="1" fill="none" style={{ transitionDelay: "0.2s" }} />
      <circle cx="300" cy="300" r="196" stroke={INK} strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="3 8" fill="none" className="fade-in" />
      <D d={spokes.join("")} o={0.55} w={0.9} delay={0.3} />
      {blocks.map(([x, y, rot], i) => (
        <g key={i} className="fade-in" style={{ transitionDelay: `${0.7 + i * 0.05}s` }} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})`}>
          <rect x="-13" y="-20" width="26" height="40" fill={i % 3 === 0 ? INK : "none"} fillOpacity={i % 3 === 0 ? 0.9 : 0} stroke={INK} strokeWidth="1.1" />
          <path d="M-13 -8H13M-13 4H13" stroke={i % 3 === 0 ? "#fff" : INK} strokeOpacity="0.6" strokeWidth="0.8" />
        </g>
      ))}
      <N x={300} y={300} r={20} fill={INK} ring delay={0.4} />
      <N x={300} y={300} r={6} fill="#fff" delay={0.5} />
    </>
  );
}

/** 05 — Strategic system: a partitioned frame, a vector and a target. */
function Consulting() {
  const frame = (h: number, rc: number) => diamondPath(300, 300, h, rc);
  return (
    <>
      <D d={frame(236, 26)} w={1.6} />
      <D d={frame(170, 20)} o={0.5} w={1} delay={0.3} />
      <D d={frame(104, 14)} o={0.5} w={1} delay={0.5} />
      <D d="M300 64V536M64 300H536" o={0.4} w={0.8} delay={0.6} />
      <path className="fade-in" d={frame(104, 14)} fill={ICE} fillOpacity="0.55" style={{ transitionDelay: "0.9s" }} />
      <path className="fade-in" d="M300 64L536 300L300 300Z" fill={STEEL} fillOpacity="0.14" style={{ transitionDelay: "1s" }} />
      <D d="M70 530C150 530 260 460 296 318" w={2.2} c={INK} delay={0.6} />
      <D d="M274 336L297 304L318 336" w={2.2} c={INK} delay={1.5} />
      <circle className="draw" pathLength={1} cx="300" cy="300" r="26" stroke={STEEL} strokeWidth="1.2" fill="none" style={{ transitionDelay: "1.4s" }} />
      <N x={300} y={300} r={6} delay={1.6} />
      <N x={70} y={530} r={5} delay={0.6} fill={STEEL} />
    </>
  );
}

const VISUALS = [Digital, Technical, Automation, Enterprise, Consulting];

export default function ServiceVisual({ index, className = "" }: { index: number; className?: string }) {
  const V = VISUALS[index] ?? Digital;
  return (
    <svg viewBox="0 0 600 600" className={className} fill="none" aria-hidden="true" focusable="false">
      <V />
    </svg>
  );
}

export const SERVICE_COUNT = VISUALS.length;
