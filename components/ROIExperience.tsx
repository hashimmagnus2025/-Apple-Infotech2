"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { MQ, prefersReducedMotion } from "@/animations/motion";
import { roi } from "@/lib/content";
import { nestedDiamonds } from "@/lib/geometry";
import Eyebrow from "@/components/ui/Eyebrow";

/** Climb nodes — one per stage, rising left to right (viewBox 600×600). */
const NODES: [number, number][] = [
  [70, 520],
  [200, 430],
  [330, 330],
  [450, 210],
  [540, 80],
];
const PATH = NODES.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
const SEGMENTS = NODES.slice(1).map(([x, y], i) => `M${NODES[i][0]} ${NODES[i][1]}L${x} ${y}`);
const TRIS = nestedDiamonds(300, 300, 130, 56, 5, 18);

/**
 * Section 04 — ROI as a journey, not a heading.
 * Pinned. Technology → Efficiency → Productivity → Growth → ROI.
 * The last word swells to fill the screen while a white triangle rises
 * from the centre; blend-mode inverts the type as it crosses the colour line.
 */
export default function ROIExperience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const pin = q(".roi-pin")[0];
      const words = q(".roi-word") as HTMLElement[];
      const inners = q(".roi-word-inner") as HTMLElement[];
      const metas = q(".roi-meta") as HTMLElement[];
      const segs = q(".roi-seg") as unknown as SVGPathElement[];
      const nodes = q(".roi-node") as unknown as SVGGElement[];
      const ticks = q(".roi-tick") as HTMLElement[];

      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const mobile = !window.matchMedia(MQ.desktop).matches;
        const finalScale = mobile ? 3.1 : 3.4;

        gsap.set(inners, { yPercent: 110 });
        gsap.set(metas, { opacity: 0, y: 16 });
        gsap.set(segs, { strokeDashoffset: 1 });
        nodes.forEach((n, i) => gsap.set(n, { opacity: 0, scale: 0.4, svgOrigin: `${NODES[i][0]} ${NODES[i][1]}` }));
        gsap.set(q(".roi-white"), { clipPath: "polygon(50% 62%, 50% 62%, 50% 62%)" });
        gsap.set(q(".roi-area"), { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: mobile ? "+=330%" : "+=440%",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });

        const last = words.length - 1;
        words.forEach((_, i) => {
          const t = i * 1;
          tl.to(inners[i], { yPercent: 0, duration: 0.55, ease: "expo.out" }, t)
            .to(metas[i], { opacity: 1, y: 0, duration: 0.45 }, t + 0.15)
            .to(ticks[i], { opacity: 1, duration: 0.3 }, t);
          if (i > 0) {
            tl.to(segs[i - 1], { strokeDashoffset: 0, duration: 0.8, ease: "none" }, t - 0.1);
          }
          tl.to(nodes[i], { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, t + 0.1);
          if (i < last) {
            tl.to(inners[i], { yPercent: -110, duration: 0.45, ease: "power3.in" }, t + 0.82).to(metas[i], { opacity: 0, y: -16, duration: 0.3 }, t + 0.8);
          }
        });
        tl.to(q(".roi-area"), { opacity: 1, duration: 1 }, 3);

        // the finale: ROI swells, the graph recedes, white rises
        const F = last + 1.1;
        tl.to(metas[last], { opacity: 0, y: -16, duration: 0.4 }, F)
          .to(q(".roi-graph"), { opacity: 0, scale: 1.1, transformOrigin: "50% 50%", duration: 0.9 }, F)
          .to([words[last], q(".roi-word-copy")[0]], { scale: finalScale, transformOrigin: "50% 50%", duration: 1.8, ease: "power3.inOut" }, F)
          .to(ticks, { opacity: 0, duration: 0.4 }, F + 0.6)
          .to(q(".roi-white"), { clipPath: "polygon(50% -130%, -120% 130%, 220% 130%)", duration: 1.5, ease: "power2.in" }, F + 0.7)
          .to(q(".roi-head"), { opacity: 0, duration: 0.5 }, F)
          .to({}, { duration: 0.5 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="roi" data-nav="dark" aria-labelledby="roi-title" className="tone-dark relative">
      <div className="roi-pin relative isolate h-[100svh] overflow-hidden bg-[#070B11]">
        {/* ambient light */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_72%_62%,rgba(107,141,187,0.22),transparent)]" />
        <svg aria-hidden="true" viewBox="0 0 600 600" className="pointer-events-none absolute -left-[12vw] top-1/2 h-[120vmin] w-[120vmin] -translate-y-1/2 opacity-40" fill="none">
          {TRIS.map((d, i) => (
            <path key={i} d={d} stroke="#AEC4E2" strokeOpacity={0.4 - i * 0.06} strokeWidth="0.7" />
          ))}
        </svg>

        <div className="roi-head relative z-30 px-[var(--gutter)] pt-[calc(var(--nav-h)+1.25rem)]">
          <Eyebrow className="mb-3 text-ice">{roi.eyebrow}</Eyebrow>
          <h2 id="roi-title" className="max-w-xs text-lg font-semibold leading-snug tracking-tight text-white/90 md:text-xl">
            {roi.heading}
          </h2>
        </div>

        {/* climb graph */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 600"
          className="roi-graph pointer-events-none absolute bottom-[7svh] right-[-8vw] z-0 w-[92vw] md:right-[3vw] md:w-[min(52vw,66svh)]"
          fill="none"
        >
          <path d="M52 540H570M52 540V40" stroke="#AEC4E2" strokeOpacity="0.3" strokeWidth="0.8" />
          {[1, 2, 3, 4].map((k) => (
            <path key={k} d={`M52 ${540 - k * 100}H570`} stroke="#6B8DBB" strokeOpacity="0.18" strokeWidth="0.6" strokeDasharray="2 8" />
          ))}
          <path className="roi-area" d={`${PATH}L540 540L70 540Z`} fill="url(#roi-fill)" />
          <defs>
            <linearGradient id="roi-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#AEC4E2" stopOpacity="0.28" />
              <stop offset="1" stopColor="#AEC4E2" stopOpacity="0" />
            </linearGradient>
          </defs>
          {SEGMENTS.map((d, i) => (
            <path key={i} className="roi-seg" d={d} pathLength={1} strokeDasharray={1} stroke="#fff" strokeWidth="1.8" />
          ))}
          {NODES.map(([x, y], i) => (
            <g key={i} className="roi-node">
              <circle cx={x} cy={y} r={i === NODES.length - 1 ? 13 : 8} fill={i === NODES.length - 1 ? "#fff" : "#050505"} stroke="#fff" strokeWidth="1.6" />
              <circle cx={x} cy={y} r={i === NODES.length - 1 ? 26 : 18} stroke="#AEC4E2" strokeOpacity="0.4" strokeWidth="0.8" />
            </g>
          ))}
        </svg>

        {/* white triangle rising from the centre */}
        <div aria-hidden="true" className="roi-white pointer-events-none absolute inset-0 z-20 bg-white">
          {/* ink twin of the final word — revealed only inside the white triangle */}
          <div className="roi-word-copy absolute inset-0 flex flex-col items-center justify-center px-[var(--gutter)] text-center">
            <span className="display block pb-[0.06em] pt-[0.04em] text-[clamp(5rem,20vw,16rem)] text-ink md:text-[clamp(6rem,15vw,18rem)]">{roi.stages[roi.stages.length - 1].word}</span>
            <span className="roi-ghost invisible mt-5 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 md:mt-8">
              <span className="mono text-2xl font-medium md:text-4xl">{roi.stages[roi.stages.length - 1].metric}</span>
              <span className="max-w-[16rem] text-sm leading-snug md:text-base">{roi.stages[roi.stages.length - 1].note}</span>
            </span>
          </div>
        </div>

        {/* stage words — blend-inverted once the white arrives */}
        <div className="roi-words absolute inset-0 z-10">
          {roi.stages.map((s, i) => {
            const isLast = i === roi.stages.length - 1;
            return (
              <div
                key={s.word}
                className={`roi-word absolute inset-0 flex flex-col justify-center px-[var(--gutter)] ${isLast ? "items-center text-center" : "items-start"}`}
              >
                <h3 className="overflow-hidden pb-[0.06em] pt-[0.04em]">
                  <span
                    className={`roi-word-inner display block text-white ${
                      isLast ? "text-[clamp(5rem,20vw,16rem)] md:text-[clamp(6rem,15vw,18rem)]" : "text-[clamp(2.7rem,12.4vw,6rem)] md:text-[clamp(4.5rem,11vw,13rem)]"
                    }`}
                  >
                    {s.word}
                  </span>
                </h3>
                <div className={`roi-meta mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mt-8 ${isLast ? "justify-center" : ""}`}>
                  <span className="mono text-2xl font-medium text-ice md:text-4xl">{s.metric}</span>
                  <p className="max-w-[16rem] text-sm leading-snug text-white/70 md:text-base">{s.note}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* progress ticks */}
        <ol className="eyebrow absolute inset-x-0 bottom-0 z-30 flex justify-between gap-2 px-[var(--gutter)] pb-6 text-white/80" aria-hidden="true">
          {roi.stages.map((s, i) => (
            <li key={s.word} className="roi-tick opacity-30">
              <span className="block h-px w-full bg-current" />
              <span className="mt-2 block text-[0.62rem] md:text-[0.72rem]">0{i + 1}</span>
            </li>
          ))}
        </ol>
        <p className="sr-only">{roi.footnote}</p>
      </div>
    </section>
  );
}
