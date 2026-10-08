"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { MQ, prefersReducedMotion } from "@/animations/motion";
import { RING_CENTER, RING_INNER, RING_OUTER, RING_SEGMENTS, diamondLattice, diamondPath, nestedDiamonds, segmentDash } from "@/lib/geometry";

const LATTICE = diamondLattice(760, 48);
const FRAMES = nestedDiamonds(300, 300, 150, 44, 5, 22);
const EXTRUDE = Array.from({ length: 8 }, (_, i) => i + 1);
const CORE = diamondPath(100, 100, 30, 6);
const CORE2 = diamondPath(100, 100, 17, 4);
const SPECKS: [number, number, number][] = [
  [92, 150, 1.6], [150, 470, 1.2], [520, 90, 1.4], [548, 420, 1.8], [60, 330, 1.2], [470, 540, 1.4],
  [330, 40, 1.2], [240, 560, 1.6], [570, 250, 1.2], [120, 60, 1.2],
];
const S = 2.5; // ring scale inside the 600×600 composition
const MARK_T = `translate(${300 - 100 * S} ${300 - 100 * S}) scale(${S})`;

/** Three nested groups: entry (opacity/scale) → pointer parallax → idle float. */
function Layer({ depth, children, className = "" }: { depth: number; children: ReactNode; className?: string }) {
  return (
    <g className={`bo-layer ${className}`}>
      <g className="bo-par" data-depth={depth}>
        <g className="bo-float" data-depth={depth}>
          {children}
        </g>
      </g>
    </g>
  );
}

/**
 * The hero object: the Apple Infotech ring re-imagined as an architectural
 * volume — an exploded, glass-and-metal ring over a 45° lattice, extruded
 * frames behind it, concentric diamonds around it, an open void at its core.
 * Pure SVG (a WebGL scene would add weight without adding meaning here);
 * animated with transforms only.
 */
export default function BrandObject({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        svg.querySelectorAll<SVGGElement>(".bo-float").forEach((g, i) => {
          const d = Number(g.dataset.depth ?? 1);
          gsap.to(g, { y: (i % 2 ? -1 : 1) * (6 + d * 7), duration: 5 + i * 0.7, ease: "sine.inOut", repeat: -1, yoyo: true });
        });
        // the ring "breathes": segments drift apart and close again
        svg.querySelectorAll<SVGGElement>(".bo-seg").forEach((g, i) => {
          const dx = Number(g.dataset.dx);
          const dy = Number(g.dataset.dy);
          const amt = g.dataset.kind === "block" ? 7 : 3.5;
          gsap.to(g, { x: dx * amt, y: dy * amt, duration: 3.8 + (i % 4) * 0.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.15 });
        });
        gsap.to(svg.querySelector(".bo-orbit"), { rotation: 360, svgOrigin: "300 300", duration: 80, ease: "none", repeat: -1 });
        gsap.to(svg.querySelector(".bo-core"), { scale: 1.18, svgOrigin: "100 100", duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(svg.querySelectorAll(".bo-specks circle"), { opacity: 0.15, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: 0.35, from: "random" } });
      });

      mm.add(`${MQ.finePointer} and ${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
        const setters = Array.from(svg.querySelectorAll<SVGGElement>(".bo-par")).map((g) => ({
          d: Number(g.dataset.depth ?? 1),
          x: gsap.quickTo(g, "x", { duration: 1.4, ease: "power3.out" }),
          y: gsap.quickTo(g, "y", { duration: 1.4, ease: "power3.out" }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach(({ d, x, y }) => {
            x(-nx * 34 * d);
            y(-ny * 24 * d);
          });
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 600 600" className={`overflow-visible ${className}`} fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="bo-glow" cx="300" cy="300" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#AEC4E2" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#6B8DBB" stopOpacity="0.12" />
          <stop offset="1" stopColor="#6B8DBB" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bo-fade" cx="300" cy="300" r="330" gradientUnits="userSpaceOnUse">
          <stop offset="0.25" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="bo-lattice-mask" maskUnits="userSpaceOnUse" x="-80" y="-80" width="760" height="760">
          <rect x="-80" y="-80" width="760" height="760" fill="url(#bo-fade)" />
        </mask>
        {/* glass for the blue edges */}
        <linearGradient id="bo-edge" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E9F0FA" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#AEC4E2" stopOpacity="0.62" />
          <stop offset="1" stopColor="#6B8DBB" stopOpacity="0.38" />
        </linearGradient>
        {/* brushed metal for the corner blocks (white on black — the logo read in reverse) */}
        <linearGradient id="bo-block" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#C9D4E3" />
          <stop offset="1" stopColor="#6B8DBB" />
        </linearGradient>
      </defs>

      {/* atmosphere */}
      <Layer depth={0.15}>
        <circle cx="300" cy="300" r="300" fill="url(#bo-glow)" />
      </Layer>

      {/* 45° brand lattice */}
      <Layer depth={0.25}>
        <g mask="url(#bo-lattice-mask)" className="max-md:hidden">
          <path d={LATTICE} transform="translate(-80 -80)" stroke="#6B8DBB" strokeOpacity="0.3" strokeWidth="0.6" />
        </g>
      </Layer>

      {/* concentric diamonds + a slowly turning dashed frame */}
      <Layer depth={0.4}>
        <g className="bo-orbit">
          <path d={diamondPath(300, 300, 286, 40)} stroke="#AEC4E2" strokeOpacity="0.3" strokeWidth="0.9" strokeDasharray="2 10" />
          <path d={diamondPath(300, 300, 250, 34)} stroke="#AEC4E2" strokeOpacity="0.14" strokeWidth="0.6" />
          <rect x="296" y="10" width="8" height="8" transform="rotate(45 300 14)" fill="#AEC4E2" />
        </g>
        {FRAMES.map((d, i) => (
          <path key={i} d={d} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#AEC4E2" strokeOpacity={0.5 - i * 0.07} strokeWidth="0.8" />
        ))}
      </Layer>

      {/* extruded depth — the ring as an architectural volume */}
      <Layer depth={0.65}>
        <g transform={MARK_T}>
          {EXTRUDE.map((i) => (
            <g key={i} transform={`translate(${-i * 3.4} ${i * 3})`} opacity={0.6 - i * 0.065}>
              <path d={RING_OUTER} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#AEC4E2" strokeWidth="0.32" />
              <path d={RING_INNER} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#6B8DBB" strokeWidth="0.32" />
            </g>
          ))}
        </g>
      </Layer>

      {/* the ring itself — eight segments, glass + metal */}
      <Layer depth={1}>
        <g transform={MARK_T}>
          {RING_SEGMENTS.map((seg, i) => {
            const isBlock = seg.kind === "block";
            return (
              <g key={i} className="bo-seg bo-fill" data-kind={seg.kind} data-dx={seg.dir[0]} data-dy={seg.dir[1]}>
                <path d={RING_CENTER} pathLength={100} fill="none" strokeWidth="22" stroke={isBlock ? "url(#bo-block)" : "url(#bo-edge)"} {...segmentDash(seg)} />
              </g>
            );
          })}
          <path d={RING_OUTER} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#fff" strokeOpacity="0.85" strokeWidth="0.55" />
          <path d={RING_INNER} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#fff" strokeOpacity="0.85" strokeWidth="0.55" />
          <path d={RING_CENTER} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#fff" strokeOpacity="0.28" strokeWidth="0.3" />
        </g>
      </Layer>

      {/* the void — focus point at the heart of the mark */}
      <Layer depth={1.35}>
        <g transform={MARK_T}>
          <path d={CORE} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#fff" strokeOpacity="0.7" strokeWidth="0.5" />
          <path d={CORE2} className="bo-draw" pathLength={1} strokeDasharray={1} stroke="#AEC4E2" strokeWidth="0.5" />
          <path className="bo-core bo-fill" d={CORE2} fill="#AEC4E2" fillOpacity="0.28" />
          <circle className="bo-fill" cx="100" cy="100" r="3" fill="#fff" />
        </g>
      </Layer>

      {/* blueprint annotations */}
      <Layer depth={1.7} className="max-md:hidden">
        <g fill="#AEC4E2" fontFamily="var(--font-jb-mono), monospace" fontSize="10.5" letterSpacing="1.6">
          <path d="M486 206 H536 V164 H592" fill="none" stroke="#AEC4E2" strokeOpacity="0.55" strokeWidth="0.7" />
          <text x="500" y="154" fillOpacity="0.85">NODE — ROI</text>
          <path d="M430 548 V574" fill="none" stroke="#AEC4E2" strokeOpacity="0.55" strokeWidth="0.7" />
          <text x="438" y="590" fillOpacity="0.7">FIG.01 — STRUCTURE</text>
          <g stroke="#AEC4E2" strokeOpacity="0.5" strokeWidth="0.8">
            <path d="M540 520 h14 M547 513 v14" />
            <path d="M32 120 h14 M39 113 v14" />
          </g>
        </g>
      </Layer>

      <g className="bo-specks" fill="#AEC4E2">
        {SPECKS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.75} />
        ))}
      </g>
    </svg>
  );
}
