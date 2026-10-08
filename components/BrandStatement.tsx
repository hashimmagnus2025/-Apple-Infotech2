"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { statement } from "@/lib/content";
import { RING_INNER, RING_OUTER, diamondLattice, nestedDiamonds } from "@/lib/geometry";
import { RingSegments } from "@/components/brand/Ring";
import EdgeSection from "@/components/ui/EdgeSection";
import Eyebrow from "@/components/ui/Eyebrow";

const LATTICE = diamondLattice(520, 52);
const FRAMES = nestedDiamonds(100, 100, 108, 16, 3, 14);

/**
 * Section 01 — the editorial manifesto. A tall runway holds a sticky stage;
 * scroll progress reads the sentence word by word while the lines drift
 * apart and the geometry turns.
 */
export default function BrandStatement() {
  const runway = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = runway.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const words = q(".st-word");
      gsap.set(words, { color: "#D3DEEC" });
      gsap.set(q(".st-body"), { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      words.forEach((w, i) => {
        const accent = w.classList.contains("st-accent");
        tl.to(w, { color: accent ? "#6B8DBB" : "#050505", duration: 0.5 }, (i / words.length) * 0.62);
      });
      q(".st-line").forEach((l, i) => {
        tl.fromTo(l, { x: 0 }, { x: [0, 5, 2][i] + "vw", duration: 1 }, 0);
      });
      tl.fromTo(q(".st-geo"), { rotate: -45, yPercent: 8 }, { rotate: 45, yPercent: -10, duration: 1 }, 0)
        .fromTo(q(".st-lattice"), { x: 0 }, { x: -104, duration: 1 }, 0)
        .to(q(".st-body"), { opacity: 1, y: 0, ease: "power2.out", duration: 0.22 }, 0.72);
    },
    { scope: runway },
  );

  return (
    <EdgeSection id="about" prev="#050505" tone="tone-white" nav="light" labelledBy="statement-title" depth={0.16}>
      <div ref={runway} className="relative h-[230vh] md:h-[260vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          {/* geometry */}
          <div className="pointer-events-none absolute -right-[22vw] top-1/2 h-[104vmin] w-[104vmin] -translate-y-1/2 md:-right-[10vw]">
          <svg
            className="st-geo h-full w-full overflow-visible text-ink"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            {FRAMES.map((d, i) => (
              <path key={i} d={d} stroke="currentColor" strokeOpacity={0.12 - i * 0.03} strokeWidth="0.3" />
            ))}
            <RingSegments block="#050505" blockOpacity={0.07} edge="#AEC4E2" edgeOpacity={0.4} />
            <path d={RING_OUTER} stroke="#050505" strokeOpacity="0.5" strokeWidth="0.3" />
            <path d={RING_INNER} stroke="#050505" strokeOpacity="0.5" strokeWidth="0.3" />
          </svg>
          </div>
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(60%_60%_at_85%_50%,#000,transparent)]" aria-hidden="true">
            <g className="st-lattice">
              <path d={LATTICE} stroke="#6B8DBB" strokeOpacity="0.2" strokeWidth="0.6" fill="none" />
            </g>
          </svg>

          <div className="shell relative z-10 w-full">
            <Eyebrow className="mb-8 text-steel-ink md:mb-12">{statement.eyebrow}</Eyebrow>
            <h2 id="statement-title" className="display-sentence text-[clamp(2.5rem,10.4vw,12.5rem)] md:leading-[0.88]">
              <span className="sr-only">{statement.lines.join(" ")}</span>
              {statement.lines.map((line, li) => (
                <span key={line} aria-hidden="true" className="st-line block will-change-transform">
                  {line.split(" ").map((w, wi) => {
                    const accent = li === statement.accentLine;
                    return (
                      <span key={wi} className={`st-word inline-block pr-[0.22em] ${accent ? "st-accent serif !tracking-[-0.03em]" : ""}`}>
                        {w}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h2>
            <p className="st-body mt-10 max-w-md text-[1.0625rem] leading-relaxed text-steel-ink md:ml-auto md:mt-0 md:max-w-sm md:text-lg">
              {statement.body}
            </p>
          </div>
        </div>
      </div>
    </EdgeSection>
  );
}
