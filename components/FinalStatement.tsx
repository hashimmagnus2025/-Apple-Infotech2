"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { finalStatement } from "@/lib/content";
import { diamondPath } from "@/lib/geometry";
import EdgeSection from "@/components/ui/EdgeSection";

const FRAMES = [140, 112, 84].map((h, i) => diamondPath(100, 100, h, 16 + i * 2));

/**
 * Section 10 — the closing argument.
 *   BETTER TECHNOLOGY. / BETTER OUTCOMES.
 * As you scroll the words separate, then resolve into BETTER ROI in brand blue.
 */
export default function FinalStatement() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      if (prefersReducedMotion()) {
        gsap.set(q(".fs-stack"), { opacity: 0 });
        return;
      }
      gsap.set(q(".fs-roi"), { opacity: 0, scale: 0.9 });
      gsap.set(q(".fs-r1, .fs-r2"), { yPercent: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });
      tl.from(q(".fs-line"), { yPercent: 115, duration: 1.6, stagger: 0.3, ease: "power3.out" }, 0)
        // words separate
        .to(q(".fs-b1"), { xPercent: -14, yPercent: -40, duration: 2.4, ease: "power2.inOut" }, 2.6)
        .to(q(".fs-b2"), { xPercent: -14, yPercent: 40, duration: 2.4, ease: "power2.inOut" }, 2.6)
        .to(q(".fs-t"), { xPercent: 26, color: "#AEC4E2", duration: 2.4, ease: "power2.inOut" }, 2.6)
        .to(q(".fs-o"), { xPercent: 20, color: "#AEC4E2", duration: 2.4, ease: "power2.inOut" }, 2.6)
        .to(q(".fs-frame"), { rotate: 90, scale: 1.1, duration: 6, transformOrigin: "50% 50%" }, 0)
        // resolve into BETTER ROI
        .to(q(".fs-stack"), { opacity: 0, scale: 1.05, duration: 1.4, ease: "power2.in" }, 5.4)
        .to(q(".fs-roi"), { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" }, 6.2)
        .to(q(".fs-roi-word"), { letterSpacing: "-0.02em", duration: 2, ease: "power2.out" }, 6.2)
        .to({}, { duration: 1.2 });
    },
    { scope: root },
  );

  return (
    <EdgeSection id="outcomes" prev="#050505" tone="tone-white" nav="light" labelledBy="final-title" depth={0.16}>
      <div ref={root} className="relative h-[300vh]">
        <div className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden">
          <h2 id="final-title" className="sr-only">
            {finalStatement.srHeading}
          </h2>

          <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className="fs-frame pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 overflow-visible text-ink">
            {FRAMES.map((d, i) => (
              <path key={i} d={d} stroke="currentColor" strokeOpacity={0.1 - i * 0.025} strokeWidth="0.3" />
            ))}
          </svg>

          <div aria-hidden="true" className="fs-stack shell relative w-full">
            {[
              { cls: "fs-r1", a: "BETTER", b: "TECHNOLOGY.", ca: "fs-b1", cb: "fs-t" },
              { cls: "fs-r2", a: "BETTER", b: "OUTCOMES.", ca: "fs-b2", cb: "fs-o" },
            ].map((r) => (
              <div key={r.cls} className={`fs-line ${r.cls} overflow-hidden`}>
                <div className="display flex flex-wrap items-baseline gap-x-[2.2vw] text-[clamp(2.6rem,12.4vw,6rem)] md:text-[clamp(3rem,8.1vw,11rem)]">
                  <span className={`${r.ca} inline-block`}>{r.a}</span>
                  <span className={`${r.cb} inline-block`}>{r.b}</span>
                </div>
              </div>
            ))}
          </div>

          <div aria-hidden="true" className="fs-roi pointer-events-none absolute inset-0 grid place-items-center">
            <div className="display fs-roi-word flex flex-col items-center text-[clamp(3.4rem,17vw,9rem)] md:flex-row md:items-baseline md:gap-[2.4vw] md:text-[clamp(4rem,11.5vw,16rem)]">
              <span>BETTER</span>
              <span className="text-steel">ROI</span>
            </div>
          </div>
        </div>
      </div>
    </EdgeSection>
  );
}
