"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { markIntroReady } from "@/animations/intro";
import { prefersReducedMotion } from "@/animations/motion";
import { RingSegments } from "@/components/brand/Ring";
import { RING_INNER, RING_OUTER, diamondLattice, nestedDiamonds } from "@/lib/geometry";

const FRAMES = nestedDiamonds(100, 100, 112, 26, 6, 16);
const LATTICE = diamondLattice(400, 32);

/**
 * Page-load sequence, steps 1–3:
 *   black → the ring's outline draws → its segments resolve → concentric
 *   diamonds expand outward → the curtain lifts.
 * Hands off to the Hero (steps 4–9) through markIntroReady().
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      const done = () => {
        el.style.display = "none";
      };

      if (prefersReducedMotion()) {
        done();
        markIntroReady();
        return;
      }

      el.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      gsap.set(q(".ring-seg"), { opacity: 0, svgOrigin: "100 100" });
      gsap.set(q(".ld-ring"), { opacity: 0, scale: 0.4, svgOrigin: "100 100" });
      gsap.set(q(".ld-lattice"), { opacity: 0 });
      gsap.set(q(".ld-meta"), { opacity: 0, y: 8 });
      gsap.set(q(".ld-mark"), { svgOrigin: "100 100" });

      const segs = q(".ring-seg");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: done });
      tl.fromTo(q(".ld-draw"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.15, stagger: 0.12, ease: "power2.inOut" }, 0.15)
        .to(q(".ld-meta"), { opacity: 1, y: 0, duration: 0.8 }, 0.35)
        // segments resolve one by one, clockwise from the top
        .fromTo(segs, { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.07, ease: "power3.out" }, 0.8)
        .to(q(".ld-draw"), { opacity: 0, duration: 0.5, ease: "power1.out" }, 1.4)
        // geometry expands outward from the mark
        .to(q(".ld-lattice"), { opacity: 1, duration: 0.8 }, 1.2)
        .to(q(".ld-ring"), { opacity: 1, scale: 1, duration: 1.1, stagger: 0.05 }, 1.2)
        .to(q(".ld-ring"), { opacity: 0, scale: 1.7, duration: 0.9, stagger: 0.04, ease: "power2.in" }, 1.9)
        .to(q(".ld-mark"), { scale: 1.08, duration: 1.3, ease: "power2.inOut" }, 1.2)
        // hand-off: curtain lifts, hero begins
        .add(() => markIntroReady(), 2.05)
        .to(q(".ld-meta"), { opacity: 0, duration: 0.3 }, 2.05)
        .to(el, { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", duration: 1.0, ease: "power4.inOut" }, 2.05);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="loader" role="presentation" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto w-[min(46vw,340px)] overflow-visible text-white" fill="none">
        <defs>
          <radialGradient id="ld-fade" cx="100" cy="100" r="190" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ld-mask" maskUnits="userSpaceOnUse" x="-100" y="-100" width="400" height="400">
            <rect x="-100" y="-100" width="400" height="400" fill="url(#ld-fade)" />
          </mask>
        </defs>
        <g mask="url(#ld-mask)">
          <path className="ld-lattice" d={LATTICE} transform="translate(-100 -100)" stroke="#6B8DBB" strokeOpacity="0.45" strokeWidth="0.35" />
        </g>
        {FRAMES.map((d, i) => (
          <path key={i} className="ld-ring" d={d} stroke="#AEC4E2" strokeOpacity={0.7 - i * 0.09} strokeWidth="0.4" />
        ))}
        <g className="ld-mark">
          <path className="ld-draw" d={RING_OUTER} pathLength={1} strokeDasharray={1} stroke="#fff" strokeWidth="0.8" />
          <path className="ld-draw" d={RING_INNER} pathLength={1} strokeDasharray={1} stroke="#fff" strokeWidth="0.8" />
          <RingSegments block="#FFFFFF" edge="#AEC4E2" />
        </g>
      </svg>
      <div className="ld-meta eyebrow absolute bottom-8 left-[var(--gutter)] right-[var(--gutter)] flex justify-between text-ice">
        <span>Apple Infotech</span>
        <span>We Ensure Better ROI</span>
      </div>
    </div>
  );
}
