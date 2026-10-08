"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { stats } from "@/lib/content";
import Counter from "@/components/ui/Counter";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Section 05 — impact in editorial type. No cards: oversized numerals on
 * hairlines. Values are placeholders until verified data is supplied.
 */
export default function ImpactStats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const h = q(".im-heading")[0];
      if (h) revealLines(h);
      q(".im-row").forEach((row) => {
        const line = row.querySelector(".im-line");
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 88%", once: true } });
        gsap.from(row.querySelectorAll(".im-reveal"), {
          yPercent: 100,
          duration: 1.3,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="impact" data-nav="light" aria-labelledby="impact-title" className="tone-white on-light relative">
      <div className="shell py-[clamp(5rem,12vw,11rem)]">
        <header className="mb-[clamp(2.5rem,6vw,6rem)] grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="mb-6 text-steel-ink">{stats.eyebrow}</Eyebrow>
            <h2 id="impact-title" className="im-heading display-sentence text-[clamp(2.6rem,7.4vw,8.5rem)]">
              {stats.heading}
            </h2>
          </div>
          <p className="eyebrow text-steel-ink md:col-span-3 md:col-start-10 md:text-right">{stats.note}</p>
        </header>

        <ul role="list">
          {stats.items.map((s, i) => (
            <li key={s.label} className="im-row group relative grid grid-cols-12 items-end gap-x-4 py-5 md:py-8" data-cursor="">
              <span className="im-line absolute left-0 right-0 top-0 h-px origin-left bg-ink/25" aria-hidden="true" />
              <span className="mono col-span-2 self-start pt-2 text-xs tracking-widest text-steel-ink md:col-span-1">0{i + 1}</span>
              <div className="col-span-10 overflow-hidden md:col-span-8">
                <div className="im-reveal display block pb-[0.04em] text-[clamp(4.6rem,19vw,20rem)] leading-[0.82]">
                  <span className="inline-block transition-[transform,color] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-[1.5vw] group-hover:text-steel">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </div>
              </div>
              <div className="col-span-10 col-start-3 mt-3 overflow-hidden md:col-span-3 md:col-start-10 md:mt-0 md:self-end md:text-right">
                <p className="im-reveal eyebrow pb-1 text-ink md:text-sm">{s.label}</p>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="h-px bg-ink/25" />
        </ul>
      </div>
    </section>
  );
}
