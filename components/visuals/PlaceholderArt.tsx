/**
 * Procedural monochrome "photography" used wherever client imagery is still
 * pending. Four architectural scenes, deterministic (seeded) so server and
 * client render identically. Swap for next/image once real photos arrive —
 * see components/ui/StoryImage.tsx.
 */
import type { ReactElement } from "react";

export type ArtKind = "facade" | "grid" | "aisle" | "horizon";

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 800;
const H = 1000;

function Facade({ id }: { id: string }) {
  const r = rng(11);
  const vp = { x: 400, y: -320 };
  const cols = 15;
  const rows = 16;
  const bx = (i: number) => -300 + (i / cols) * 1400;
  const yAt = (j: number) => H - H * Math.pow(j / rows, 0.64);
  const xAt = (i: number, y: number) => bx(i) + (vp.x - bx(i)) * ((H - y) / (H - vp.y));
  const panes: ReactElement[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const y0 = yAt(j);
      const y1 = yAt(j + 1);
      const d = `M${xAt(i, y0)} ${y0}L${xAt(i + 1, y0)} ${y0}L${xAt(i + 1, y1)} ${y1}L${xAt(i, y1)} ${y1}Z`;
      const v = r();
      const o = v > 0.93 ? 0.8 : 0.05 + v * 0.38;
      panes.push(<path key={`${i}-${j}`} d={d} fill="#fff" fillOpacity={o} />);
    }
  }
  const mull = Array.from({ length: cols + 1 }, (_, i) => `M${bx(i)} ${H}L${xAt(i, 0)} 0`).join("");
  const floors = Array.from({ length: rows + 1 }, (_, j) => `M-200 ${yAt(j)}H1000`).join("");
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#3a424c" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {panes}
      <path d={mull} stroke="#050505" strokeWidth="3" />
      <path d={floors} stroke="#050505" strokeWidth="2" />
    </>
  );
}

function Grid({ id }: { id: string }) {
  const r = rng(29);
  const blocks: ReactElement[] = [];
  const cols = 8;
  const rows = 10;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const w = 74 + r() * 18;
      const h = 74 + r() * 18;
      const x = 12 + i * 98 + r() * 6;
      const y = 6 + j * 98 + r() * 6;
      const v = r();
      blocks.push(
        <g key={`${i}-${j}`}>
          <rect x={x} y={y} width={w} height={h} fill="#fff" fillOpacity={0.05 + v * 0.45} />
          {v > 0.35 && <rect x={x + w * 0.18} y={y + h * 0.18} width={w * 0.64} height={h * 0.64} fill="#050505" fillOpacity={0.25 + r() * 0.35} />}
          {v > 0.8 && <path d={`M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}`} stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />}
        </g>,
      );
    }
  }
  return (
    <>
      <defs>
        <radialGradient id={`${id}-g`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#4a525c" />
          <stop offset="1" stopColor="#050505" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-g)`} />
      <g transform="rotate(-14 400 500) translate(-110 -90) scale(1.25)">{blocks}</g>
    </>
  );
}

function Aisle({ id }: { id: string }) {
  const r = rng(5);
  const racks: ReactElement[] = [];
  for (let k = 0; k < 11; k++) {
    const s = Math.pow(0.84, k);
    const cy = 450;
    for (const side of [-1, 1]) {
      const x0 = 400 + side * 420 * s;
      const x1 = 400 + side * 420 * s * 0.8;
      const top = cy - 560 * s;
      const bot = cy + 520 * s;
      const left = Math.min(x0, x1);
      const wdt = Math.abs(x1 - x0);
      racks.push(
        <g key={`${k}${side}`}>
          <rect x={left} y={top} width={wdt} height={bot - top} fill="#fff" fillOpacity={0.05 + (k % 2) * 0.05} stroke="#fff" strokeOpacity="0.16" strokeWidth={Math.max(0.5, 2 * s)} />
          {Array.from({ length: 22 }, (_, n) => {
            const y = top + ((bot - top) * (n + 0.5)) / 22;
            const lit = r() > 0.55;
            return <rect key={n} x={left + wdt * 0.2} y={y} width={wdt * 0.6} height={Math.max(0.8, 6 * s)} fill="#fff" fillOpacity={lit ? 0.55 : 0.1} />;
          })}
        </g>,
      );
    }
  }
  return (
    <>
      <defs>
        <radialGradient id={`${id}-c`} cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#d9e2ee" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#6B8DBB" stopOpacity="0.35" />
          <stop offset="1" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050505" />
          <stop offset="1" stopColor="#2b323b" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="#050505" />
      <path d={`M0 ${H}L400 450L${W} ${H}Z`} fill={`url(#${id}-f)`} />
      <path d={`M0 0L400 450L0 ${H}ZM${W} 0L400 450L${W} ${H}Z`} fill="#0b0e12" />
      {racks}
      <ellipse cx="400" cy="450" rx="420" ry="520" fill={`url(#${id}-c)`} />
    </>
  );
}

function Horizon({ id }: { id: string }) {
  const r = rng(77);
  const layers: ReactElement[] = [];
  for (let l = 0; l < 6; l++) {
    const base = 470 + l * 100;
    const pts: string[] = [`0 ${H}`];
    let x = -40;
    while (x < W + 60) {
      const peak = base - 80 - r() * (150 - l * 14);
      pts.push(`${x} ${base + 30}`, `${x + 40 + r() * 70} ${peak}`);
      x += 90 + r() * 100;
    }
    pts.push(`${W} ${H}`);
    const g = 70 - l * 11;
    layers.push(<polygon key={l} points={pts.join(" ")} fill={`rgb(${g + 20},${g + 24},${g + 30})`} stroke="#fff" strokeOpacity={0.05 + l * 0.02} strokeWidth="1" />);
    layers.push(<rect key={`f${l}`} x="0" y={base - 40} width={W} height="120" fill={`url(#${id}-fog)`} opacity={0.5} />);
  }
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050505" />
          <stop offset="0.6" stopColor="#59636f" />
          <stop offset="1" stopColor="#AEC4E2" />
        </linearGradient>
        <linearGradient id={`${id}-fog`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#AEC4E2" stopOpacity="0" />
          <stop offset="1" stopColor="#AEC4E2" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <circle cx="560" cy="330" r="70" fill="#fff" fillOpacity="0.85" />
      <circle cx="560" cy="330" r="150" fill="#fff" fillOpacity="0.08" />
      {layers.reverse()}
    </>
  );
}

export default function PlaceholderArt({ kind, className = "", uid }: { kind: ArtKind; className?: string; uid: string }) {
  const id = `pa-${uid}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      {kind === "facade" && <Facade id={id} />}
      {kind === "grid" && <Grid id={id} />}
      {kind === "aisle" && <Aisle id={id} />}
      {kind === "horizon" && <Horizon id={id} />}
    </svg>
  );
}
