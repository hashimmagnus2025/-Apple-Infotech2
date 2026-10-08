"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { MQ, prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { transformation } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import StageVisual from "@/components/visuals/StageVisuals";

/** Word size per stage — typography grows as the idea becomes impact. */
const SIZES = [
  { d: "9vw", m: "21vw" },
  { d: "12.4vw", m: "13vw" },
  { d: "15vw", m: "17vw" },
  { d: "18.5vw", m: "24vw" },
  { d: "27vw", m: "40vw" },
];
/** The room darkens toward steel as the idea matures. */
const ROOMS = ["#050505", "#070B11", "#0A111A", "#0E1824", "#14212F"];

/**
 * Section 03 — vertical scroll drives a pinned, horizontal story:
 * IDEA → TECHNOLOGY → SOLUTION → IMPACT → ROI.
 * Desktop pins and translates; mobile/tablet stacks stages with reveals.
 */
export default function Transformation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const wrap = q(".tf-wrap")[0] as HTMLElement;
      const track = q(".tf-track")[0] as HTMLElement;
      const panels = q(".tf-panel") as HTMLElement[];
      const reduced = prefersReducedMotion();
      const mm = gsap.matchMedia();

      if (reduced) {
        wrap.classList.add("tf-vertical");
        gsap.set(q(".tp-draw"), { strokeDashoffset: 0 });
        return;
      }

      const prime = (panel: HTMLElement) => {
        gsap.set(panel.querySelectorAll(".tp-draw"), { strokeDashoffset: 1 });
        const fades = panel.querySelectorAll(".tp-fade");
        if (fades.length) gsap.set(fades, { opacity: 0 });
        panel.querySelectorAll<SVGGElement>(".tp-piece").forEach((g) => {
          const [x, y] = (g.dataset.from ?? "0,0").split(",").map(Number);
          gsap.set(g, { x, y, opacity: 0 });
        });
      };
      panels.forEach(prime);

      /* ---------------- desktop: pinned horizontal story ---------------- */
      mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
        const dist = () => track.scrollWidth - window.innerWidth;
        const st = { trigger: wrap, start: "top top", end: () => `+=${dist()}`, invalidateOnRefresh: true } as const;

        const move = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { ...st, pin: true, scrub: 0.8, anticipatePin: 1 },
        });

        const bg = gsap.timeline({ scrollTrigger: { ...st, scrub: true } });
        ROOMS.slice(1).forEach((c) => bg.to(wrap, { backgroundColor: c, ease: "none", duration: 1 }));
        gsap.set(wrap, { backgroundColor: ROOMS[0] });

        gsap.to(q(".tf-progress-fill"), { scaleX: 1, ease: "none", scrollTrigger: { ...st, scrub: true } });

        const marks = q(".tf-mark") as HTMLElement[];
        panels.forEach((panel, i) => {
          const word = panel.querySelector(".tf-word");
          const copy = panel.querySelector(".tf-copy");
          const cx = { trigger: panel, containerAnimation: move } as const;
          // typography slides through the frame at a different speed than the track
          gsap.fromTo(word, { xPercent: i === 0 ? 0 : 22 }, { xPercent: i === panels.length - 1 ? -2 : -14, ease: "none", scrollTrigger: { ...cx, start: "left right", end: "right left", scrub: true } });
          gsap.fromTo(panel.querySelector(".tf-visual"), { yPercent: 6, scale: 0.94 }, { yPercent: -6, scale: 1.04, ease: "none", scrollTrigger: { ...cx, start: "left right", end: "right left", scrub: true } });
          if (i > 0) {
            const fades = panel.querySelectorAll(".tp-fade");
            const pieces = panel.querySelectorAll(".tp-piece");
            gsap.to(panel.querySelectorAll(".tp-draw"), { strokeDashoffset: 0, stagger: 0.04, ease: "none", scrollTrigger: { ...cx, start: "left 90%", end: "left 30%", scrub: true } });
            if (fades.length) gsap.to(fades, { opacity: 1, ease: "none", scrollTrigger: { ...cx, start: "left 55%", end: "left 25%", scrub: true } });
            if (pieces.length) gsap.to(pieces, { x: 0, y: 0, opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { ...cx, start: "left 90%", end: "left 30%", scrub: true } });
            gsap.fromTo(copy, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { ...cx, start: "left 80%", end: "left 45%", scrub: true } });
          }
          // active stage marker
          gsap.to(marks[i], {
            opacity: 1,
            ease: "none",
            scrollTrigger: { ...cx, start: "left 60%", end: "right 40%", toggleClass: { targets: marks[i], className: "is-on" } },
          });
        });

        // first stage draws in as the section arrives
        const first = panels[0];
        gsap.to(first.querySelectorAll(".tp-draw"), {
          strokeDashoffset: 0,
          duration: 2.2,
          stagger: 0.03,
          ease: "power2.inOut",
          scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
        });
        const firstFades = first.querySelectorAll(".tp-fade");
        if (firstFades.length) gsap.to(firstFades, { opacity: 1, duration: 1.4, delay: 0.8, scrollTrigger: { trigger: wrap, start: "top 70%", once: true } });
        const w0 = first.querySelector(".tf-word");
        if (w0) revealLines(w0, { start: "top 98%", duration: 1.4 });
      });

      /* ------------------- mobile / tablet: stacked story ------------------- */
      mm.add(`${MQ.mobile} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.set(wrap, { backgroundColor: ROOMS[0] });
        panels.forEach((panel, i) => {
          const trig = { trigger: panel, start: "top 72%", once: true } as const;
          gsap.to(panel.querySelectorAll(".tp-draw"), { strokeDashoffset: 0, duration: 2, stagger: 0.03, ease: "power2.inOut", scrollTrigger: trig });
          const fades = panel.querySelectorAll(".tp-fade");
          const pieces = panel.querySelectorAll(".tp-piece");
          if (fades.length) gsap.to(fades, { opacity: 1, duration: 1.2, delay: 0.6, scrollTrigger: trig });
          if (pieces.length) gsap.to(pieces, { x: 0, y: 0, opacity: 1, duration: 1.6, stagger: 0.12, ease: "expo.out", scrollTrigger: trig });
          const word = panel.querySelector(".tf-word");
          if (word) revealLines(word, { start: "top 85%" });
          gsap.from(panel.querySelector(".tf-copy"), { opacity: 0, y: 30, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 55%", once: true } });
          // the room deepens toward steel as the story advances
          gsap.to(panel, { backgroundColor: ROOMS[i], ease: "none", duration: 0.01, scrollTrigger: { trigger: panel, start: "top 60%", toggleActions: "play none none reverse" } });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const { stages } = transformation;

  return (
    <section ref={root} id="process" data-nav="dark" aria-labelledby="process-title" className="tone-dark relative">
      <div className="tf-wrap relative bg-ink lg:h-[100svh] lg:overflow-hidden">
        {/* fixed header inside the pinned frame */}
        <div className="pointer-events-none relative z-20 px-[var(--gutter)] pt-24 lg:absolute lg:left-0 lg:top-[calc(var(--nav-h)+1.25rem)] lg:pt-0">
          <Eyebrow className="mb-3 text-ice">{transformation.eyebrow}</Eyebrow>
          <h2 id="process-title" className="max-w-[18rem] text-lg font-semibold leading-snug tracking-tight text-white/90 md:max-w-sm md:text-xl">
            {transformation.heading}
          </h2>
        </div>

        <div className="tf-track lg:flex lg:h-full lg:w-max">
          {stages.map((s, i) => (
            <article
              key={s.key}
              className="tf-panel relative flex flex-col justify-end gap-8 overflow-hidden px-[var(--gutter)] pb-16 pt-12 lg:block lg:h-[100svh] lg:w-screen lg:flex-none lg:p-0"
              aria-label={`${s.label}: ${s.key}`}
            >
              <div className="relative mx-auto aspect-square w-[min(78vw,26rem)] lg:absolute lg:right-[5vw] lg:top-[53%] lg:mx-0 lg:h-[64svh] lg:w-auto lg:-translate-y-1/2">
                <div className="tf-visual h-full w-full">
                  <StageVisual index={i} className="h-full w-full" />
                </div>
              </div>

              <div className="relative z-10 lg:absolute lg:bottom-[7svh] lg:left-[3.5vw] lg:right-0">
                <p className="eyebrow mb-3 text-ice lg:mb-5">{s.label}</p>
                <h3
                  className="tf-word display whitespace-nowrap text-[length:var(--fs-m)] lg:text-[length:var(--fs-d)]"
                  style={{ ["--fs-m" as string]: SIZES[i].m, ["--fs-d" as string]: SIZES[i].d }}
                >
                  {s.key}
                </h3>
              </div>

              <p className="tf-copy relative z-10 max-w-xs text-base leading-relaxed text-white/70 lg:absolute lg:bottom-[8svh] lg:right-[5vw] lg:max-w-[16rem]">
                {s.copy}
              </p>
            </article>
          ))}
        </div>

        {/* progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden px-[var(--gutter)] pb-6 lg:block">
          <ol className="eyebrow mb-3 flex justify-between text-white/40" aria-hidden="true">
            {stages.map((s, i) => (
              <li key={s.key} className="tf-mark transition-colors duration-500 [&.is-on]:text-ice">
                0{i + 1} {s.key}
              </li>
            ))}
          </ol>
          <div className="relative h-px bg-white/15">
            <span className="tf-progress-fill absolute inset-0 origin-left scale-x-0 bg-ice" />
          </div>
        </div>
      </div>
    </section>
  );
}
