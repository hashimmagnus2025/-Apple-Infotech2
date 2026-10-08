"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { services } from "@/lib/content";
import EdgeSection from "@/components/ui/EdgeSection";
import Eyebrow from "@/components/ui/Eyebrow";
import ServiceVisual from "@/components/visuals/ServiceVisuals";

/** Background tint per active service — a quiet shift inside the ice family. */
const TINTS = ["#DCE6F3", "#D0DEF0", "#E6EEF8", "#C6D8EE", "#D9E5F4"];

/**
 * Section 02 — capabilities as a typographic index. Each service owns
 * real estate; the active one expands, draws its own visual and tints the room.
 */
export default function Services() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const h = q(".sv-heading")[0];
      if (h) revealLines(h, { start: "top 85%" });
      gsap.from(q(".sv-row"), {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".sv-list")[0], start: "top 80%", once: true },
      });
      gsap.from(q(".sv-stage"), {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".sv-stage")[0], start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  const items = services.items;

  return (
    <EdgeSection
      id="capabilities"
      prev="#ffffff"
      tone="tone-ice"
      nav="light"
      labelledBy="services-title"
      className="transition-colors duration-[1100ms] ease-[var(--ease-expo)]"
      style={{ backgroundColor: TINTS[active] }}
    >
      <div ref={root} className="shell py-[clamp(5rem,12vw,11rem)]">
        <header className="mb-[clamp(2.5rem,6vw,6rem)] grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="mb-6 text-steel-ink">{services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="sv-heading display text-[clamp(3rem,8.4vw,9.5rem)]">
              {services.heading}
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-steel-ink md:col-span-3 md:col-start-10 md:text-lg">
            Five disciplines, one standard: every engagement is shaped around the return it must deliver.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <ul className="sv-list lg:col-span-7" role="list">
            {items.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.id} className={`sv-row border-t border-ink/15 ${on ? "is-active" : ""}`} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
                  <h3>
                    <button
                      type="button"
                      className="group relative flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-7"
                      aria-expanded={on}
                      aria-controls={`sv-panel-${s.id}`}
                      data-cursor="Explore"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                    >
                      <span className={`mono w-9 shrink-0 text-xs tracking-widest transition-all duration-700 ease-[var(--ease-expo)] md:w-12 md:text-sm ${on ? "translate-x-3 text-ink" : "text-steel-ink"}`}>
                        {s.index}
                      </span>
                      <span
                        className={`display block origin-left text-[clamp(1.9rem,5.4vw,6.4rem)] transition-all duration-700 ease-[var(--ease-expo)] ${
                          on ? "translate-x-[1.2vw] text-ink" : "text-ink/30 group-hover:text-ink/60"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 left-0 h-[2px] bg-steel transition-[width] duration-[1100ms] ease-[var(--ease-expo)] ${on ? "w-full" : "w-0"}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`sv-panel-${s.id}`}
                    role="region"
                    aria-label={s.title}
                    className={`grid transition-[grid-template-rows,opacity] duration-[900ms] ease-[var(--ease-expo)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden" inert={!on}>
                      <div className="grid gap-6 pb-8 md:grid-cols-[3rem_1fr] md:gap-8 md:pb-10 lg:grid-cols-[3rem_1fr]">
                        <span aria-hidden="true" className="hidden md:block" />
                        <div>
                          <p className="max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">{s.description}</p>
                          <ul className="mt-5 flex flex-wrap gap-2" role="list">
                            {s.points.map((p) => (
                              <li key={p} className="eyebrow border border-ink/25 px-3 py-2 text-ink/80">
                                {p}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 aspect-[4/3] w-full max-w-sm border border-ink/15 bg-white/30 p-3 lg:hidden">
                            <ServiceVisual index={i} className="h-full w-full text-ink" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            <li aria-hidden="true" className="border-t border-ink/15" />
          </ul>

          {/* visual stage */}
          <div className="sv-stage relative hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="sticky top-[calc(var(--nav-h)+1.5rem)]">
              <div className="relative aspect-square w-full border border-ink/15 bg-white/35">
                {/* corner ticks — the brand's registration marks */}
                {["left-0 top-0", "right-0 top-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((c) => (
                  <svg key={c} viewBox="0 0 20 20" className={`absolute h-5 w-5 ${c} text-ink`} fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M0 14V0h14" />
                  </svg>
                ))}
                {items.map((s, i) => (
                  <div
                    key={s.id}
                    className={`absolute inset-0 p-4 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)] ${
                      active === i ? "is-active scale-100 opacity-100" : "pointer-events-none scale-[0.96] opacity-0"
                    }`}
                  >
                    <ServiceVisual index={i} className="h-full w-full text-ink" />
                  </div>
                ))}
              </div>
              <p className="eyebrow mt-4 flex justify-between text-steel-ink">
                <span>FIG. {items[active].index}</span>
                <span>{items[active].short}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </EdgeSection>
  );
}
