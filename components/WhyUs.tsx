"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { why } from "@/lib/content";
import { diamondPath } from "@/lib/geometry";
import Eyebrow from "@/components/ui/Eyebrow";

/** Four small constructions on the 45° grid — one per principle. */
const dm = (h: number, rc = 6) => diamondPath(50, 50, h, rc);
const GLYPHS: ReactNode[] = [
  // understand — a point held inside the frame
  <g key="u"><path d={dm(42, 8)} /><path d={dm(18, 4)} strokeOpacity=".6" /><circle cx="50" cy="50" r="3" /></g>,
  // build — stacked planes
  <g key="b"><path d={diamondPath(50, 34, 28, 5)} /><path d={diamondPath(50, 54, 28, 5)} strokeOpacity=".6" /><path d={diamondPath(50, 74, 28, 5)} strokeOpacity=".3" /></g>,
  // optimise — converging frames
  <g key="o"><path d={dm(44, 8)} /><path d={dm(30, 6)} strokeOpacity=".7" /><path d={dm(16, 4)} strokeOpacity=".5" /><path d="M50 4V96M4 50H96" strokeOpacity=".25" /></g>,
  // deliver — a vector leaving the frame
  <g key="d"><path d={diamondPath(40, 60, 30, 6)} /><path d="M52 48L90 10" /><path d="M70 10H90V30" /></g>,
];

/**
 * Section 08 — four principles, no cards. A sticky headline on the left,
 * a tall editorial index on the right; each row ignites as it crosses centre.
 */
export default function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const reduced = prefersReducedMotion();
      const rows = q(".wy-row") as HTMLElement[];

      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 42%",
          toggleClass: { targets: row, className: "is-on" },
        });
      });
      if (reduced) {
        rows.forEach((r) => r.classList.add("is-on"));
        return;
      }
      const h = q(".wy-heading .wy-line-reveal");
      h.forEach((l, i) => revealLines(l, { delay: i * 0.08, start: "top 88%" }));
      rows.forEach((row) => {
        gsap.fromTo(row.querySelector(".wy-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 85%", once: true } });
        gsap.from(row.querySelectorAll(".wy-fade"), { opacity: 0, y: 30, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 78%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="why" data-nav="light" aria-labelledby="why-title" className="tone-white on-light relative">
      <div className="shell grid gap-x-10 py-[clamp(5rem,12vw,11rem)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <Eyebrow className="mb-8 text-steel-ink">{why.eyebrow}</Eyebrow>
            <h2 id="why-title" className="wy-heading display text-[clamp(3.4rem,15vw,9rem)] lg:text-[clamp(3rem,6.1vw,9rem)]">
              {why.lines.map((l, i) => (
                <span key={l} className={`wy-line-reveal block ${i === 1 ? "serif !tracking-[-0.03em] text-steel normal-case" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-steel-ink md:text-lg">{why.intro}</p>
          </div>
        </div>

        <ol className="mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0" role="list">
          {why.items.map((it, i) => (
            <li
              key={it.index}
              className="wy-row group relative flex min-h-[44svh] flex-col justify-between gap-10 py-8 [&.is-on_.wy-title]:text-ink [&.is-on_.wy-num]:text-ink [&.is-on_.wy-glyph]:opacity-100 [&.is-on_.wy-glyph]:translate-y-0 [&.is-on_.wy-rule]:bg-steel lg:min-h-[58svh]"
            >
              <span className="wy-rule absolute left-0 right-0 top-0 h-[1.5px] origin-left bg-ink/20 transition-colors duration-700" aria-hidden="true" />
              <div className="wy-fade flex items-start justify-between">
                <span className="wy-num mono text-sm tracking-widest text-steel-ink/70 transition-colors duration-700">{it.index}</span>
                <svg
                  viewBox="0 0 100 100"
                  className="wy-glyph h-16 w-16 translate-y-3 stroke-ink opacity-30 transition-all duration-700 ease-[var(--ease-expo)] md:h-24 md:w-24"
                  fill="none"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  {GLYPHS[i]}
                </svg>
              </div>
              <div>
                <h3 className="wy-title display text-[clamp(2.4rem,5.2vw,6.5rem)] text-ink/15 transition-colors duration-700 ease-[var(--ease-expo)]">{it.title}</h3>
                <p className="wy-fade mt-5 max-w-md text-base leading-relaxed text-steel-ink md:text-lg">{it.copy}</p>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="h-px bg-ink/20" />
        </ol>
      </div>
    </section>
  );
}
