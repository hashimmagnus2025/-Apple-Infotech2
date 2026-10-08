"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { solutions } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import SolutionVisual from "@/components/visuals/SolutionVisuals";

/**
 * Section 06 — a digital exhibition. Five rooms; the active one opens
 * (flex growth), tints the wall, draws its own composition and reveals copy.
 * Hover or tap on pointer devices, arrow keys / Enter on keyboards.
 */
export default function Solutions() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const items = solutions.items;

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const h = q(".so-heading")[0];
      if (h) revealLines(h);
      gsap.from(q(".so-room"), {
        opacity: 0,
        yPercent: 8,
        duration: 1.3,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".so-stage")[0], start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + items.length) % items.length;
    setActive(n);
    window.setTimeout(() => {
      root.current?.querySelectorAll<HTMLElement>(".so-room")[n]?.querySelector<HTMLElement>("[data-room-btn]")?.focus();
    }, 60);
  };

  return (
    <section ref={root} id="solutions" data-nav="dark" aria-labelledby="solutions-title" className="tone-dark relative">
      <div className="shell pb-[clamp(2.5rem,5vw,5rem)] pt-[clamp(5rem,12vw,11rem)]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="mb-6 text-ice">{solutions.eyebrow}</Eyebrow>
            <h2 id="solutions-title" className="so-heading display-sentence text-[clamp(2.6rem,7.4vw,8.5rem)]">
              {solutions.heading}
            </h2>
          </div>
          <p className="eyebrow text-white/50 md:col-span-3 md:col-start-10 md:text-right">
            Hover or select a discipline
          </p>
        </div>
      </div>

      <div className="so-stage flex h-[44rem] flex-col lg:h-[min(86svh,54rem)] lg:flex-row" role="group" aria-label="Solutions by sector">
        {items.map((s, i) => {
          const on = active === i;
          return (
            <article
              key={s.id}
              className={`so-room group relative min-h-0 min-w-0 basis-0 overflow-hidden border-white/10 transition-[flex-grow,background-color] duration-[1000ms] ease-[var(--ease-inout)] max-lg:border-t lg:border-l ${on ? "is-active" : ""}`}
              style={{ flexGrow: on ? 7 : 1, backgroundColor: s.tone }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              data-cursor={on ? undefined : "Explore"}
            >
              {/* collapsed label */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-between gap-4 px-[var(--gutter)] transition-opacity duration-500 max-lg:flex-row lg:flex-col lg:items-start lg:justify-between lg:px-6 lg:py-7 ${on ? "pointer-events-none opacity-0" : "opacity-100 delay-500"}`}
              >
                <span className="mono text-xs tracking-widest text-ice">{s.index}</span>
                <span className="display text-xl text-white/80 lg:text-[clamp(1.1rem,1.8vw,1.9rem)] lg:[writing-mode:vertical-rl] lg:rotate-180">
                  {s.title}
                </span>
              </div>

              {/* open room */}
              <div className="absolute inset-y-0 left-0 w-[min(100%,clamp(20rem,56vw,52rem))] max-lg:w-full">
                <div
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-[2px] bg-ice transition-[width] duration-[1200ms] ease-[var(--ease-expo)] ${on ? "w-full delay-500" : "w-0"}`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-[-12%] top-[2%] w-[78%] opacity-0 transition-opacity duration-[900ms] max-lg:right-[-18%] max-lg:top-[4%] max-lg:w-[60%] lg:top-[40%] lg:w-[clamp(16rem,30vw,28rem)] lg:-translate-y-1/2 ${on ? "opacity-100 delay-500" : ""}`}
                >
                  <SolutionVisual index={i} className="h-full w-full text-white" />
                </div>

                <div className={`absolute inset-0 flex flex-col justify-end gap-5 px-[var(--gutter)] pb-8 pt-16 transition-opacity duration-700 lg:px-10 lg:pb-12 ${on ? "opacity-100 delay-[600ms]" : "opacity-0"}`} inert={!on}>
                  <p className="mono text-xs tracking-[0.2em] text-ice">{s.index} / 0{items.length}</p>
                  <h3>
                    <button
                      type="button"
                      data-room-btn className="display block text-left text-[clamp(2.2rem,5.6vw,6.2rem)] leading-[0.9]"
                      aria-expanded={on}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKey(e, i)}
                    >
                      {s.title}
                    </button>
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">{s.lead}</p>
                  <ul className="flex flex-wrap gap-2" role="list">
                    {s.points.map((p) => (
                      <li key={p} className="eyebrow border border-white/25 px-3 py-2 text-white/80">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* invisible hit area for touch / keyboard when collapsed */}
              {!on && (
                <button
                  type="button"
                  data-room-btn
                  className="absolute inset-0 z-10"
                  aria-label={`Open ${s.title}`}
                  aria-expanded={false}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
