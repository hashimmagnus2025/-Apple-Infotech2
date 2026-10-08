"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { projects } from "@/lib/content";
import { Arrow, ArrowUpRight } from "@/components/ui/Arrow";
import Eyebrow from "@/components/ui/Eyebrow";
import StoryImage from "@/components/ui/StoryImage";

const CHAMFER = "[clip-path:polygon(0_0,calc(100%-44px)_0,100%_44px,100%_100%,44px_100%,0_calc(100%-44px))]";

/**
 * Section 09 — selected work. A horizontal rail (native scroll + mouse drag +
 * buttons) with parallax inside every frame. All entries are replaceable
 * placeholders; nothing here claims real work.
 */
export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const h = q(".pj-heading")[0];
      if (h) revealLines(h);
      gsap.from(q(".pj-card"), {
        opacity: 0,
        x: 120,
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: rail.current, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  /* parallax + progress from the rail's own scroll position */
  const update = useCallback(() => {
    const r = rail.current;
    if (!r) return;
    const max = r.scrollWidth - r.clientWidth;
    setProgress(max > 0 ? r.scrollLeft / max : 0);
    const cards = Array.from(r.querySelectorAll<HTMLElement>(".pj-card"));
    const rect = r.getBoundingClientRect();
    let best = 0;
    let bestD = Infinity;
    cards.forEach((c, i) => {
      const cr = c.getBoundingClientRect();
      const offset = (cr.left + cr.width / 2 - (rect.left + rect.width / 2)) / rect.width; // −1…1
      c.style.setProperty("--px", `${(-offset * 14).toFixed(2)}%`);
      if (Math.abs(offset) < bestD) {
        bestD = Math.abs(offset);
        best = i;
      }
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    update();
    const r = rail.current;
    if (!r) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    r.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      r.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  /* mouse drag-to-scroll */
  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    let down = false;
    let startX = 0;
    let startL = 0;
    let moved = false;
    const pd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startL = r.scrollLeft;
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      r.style.scrollSnapType = "none";
      r.scrollLeft = startL - dx;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      r.style.scrollSnapType = "";
    };
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    r.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    r.addEventListener("click", click, true);
    return () => {
      r.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      r.removeEventListener("click", click, true);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const r = rail.current;
    if (!r) return;
    const card = r.querySelector<HTMLElement>(".pj-card");
    const step = card ? card.getBoundingClientRect().width + 24 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * step, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const items = projects.items;

  return (
    <section ref={root} id="work" data-nav="dark" aria-labelledby="work-title" className="tone-dark relative overflow-hidden">
      <div className="shell pb-10 pt-[clamp(5rem,12vw,11rem)] md:pb-14">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="mb-6 text-ice">{projects.eyebrow}</Eyebrow>
            <h2 id="work-title" className="pj-heading display-sentence text-[clamp(2.6rem,7.4vw,8.5rem)]">
              {projects.heading}
            </h2>
          </div>
          <div className="flex items-center justify-between gap-6 md:col-span-4 md:justify-end">
            <p className="eyebrow max-w-[14rem] text-white/50 md:hidden">{projects.note}</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="grid h-14 w-14 place-items-center border border-white/30 transition-colors duration-500 hover:border-ice hover:bg-ice hover:text-ink disabled:opacity-30" disabled={progress <= 0.01}>
                <Arrow className="h-5 w-5 rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next project" className="grid h-14 w-14 place-items-center border border-white/30 transition-colors duration-500 hover:border-ice hover:bg-ice hover:text-ink disabled:opacity-30" disabled={progress >= 0.99}>
                <Arrow className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <p className="eyebrow mt-8 hidden text-white/50 md:block">{projects.note}</p>
      </div>

      <div
        ref={rail}
        role="region"
        aria-label="Selected projects — scrollable"
        tabIndex={0}
        data-cursor="Drag"
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4 md:select-none"
      >
        {items.map((p) => (
          <article key={p.id} className="pj-card group relative w-[80vw] shrink-0 snap-center md:w-[44vw] lg:w-[34vw]" style={{ ["--px" as string]: "0%" }}>
            <a
              href="#contact"
              data-cursor="View"
              draggable={false}
              aria-label={`Discuss a project like ${p.name} — ${p.sector}`}
              className="block"
            >
              <div className={`relative aspect-[4/5] overflow-hidden bg-deep ${CHAMFER}`}>
                <div className="absolute inset-[-8%] transition-transform duration-[1400ms] ease-[var(--ease-expo)] [transform:translate3d(var(--px),0,0)_scale(1)] group-hover:[transform:translate3d(var(--px),0,0)_scale(1.07)]">
                  <StoryImage art={p.art} uid={`pj-${p.id}`} alt={`[CLIENT IMAGERY] Placeholder visual for ${p.name}`} sizes="(min-width:1024px) 34vw, 80vw" />
                </div>
                <span className="mono absolute left-5 top-5 text-xs tracking-[0.2em] text-white">{p.index}</span>
                {/* metadata appears on hover / focus */}
                <div className="absolute inset-x-0 bottom-0 translate-y-[102%] bg-ink/85 p-5 backdrop-blur-sm transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-within:translate-y-0 max-md:translate-y-0">
                  <dl className="grid grid-cols-3 gap-4 text-sm">
                    {([["Technology", p.technology], ["Solution", p.solution], ["Impact", p.impact]] as const).map(([k, v]) => (
                      <div key={k}>
                        <dt className="eyebrow mb-1 text-ice">{k}</dt>
                        <dd className="text-white/85">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center border border-white/50 bg-ink/40 text-white transition-all duration-700 ease-[var(--ease-expo)] group-hover:border-ice group-hover:bg-ice group-hover:text-ink" aria-hidden="true">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="display text-[clamp(1.4rem,2.4vw,2.4rem)]">{p.name}</h3>
                <p className="eyebrow text-ice">{p.sector}</p>
              </div>
            </a>
          </article>
        ))}
        <div aria-hidden="true" className="w-[calc(var(--gutter)-1.5rem)] shrink-0" />
      </div>

      <div className="shell flex items-center gap-6 pb-[clamp(5rem,10vw,9rem)] pt-8">
        <span className="mono text-xs tracking-widest text-white/60">
          0{index + 1} / 0{items.length}
        </span>
        <div className="relative h-px flex-1 bg-white/20" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 w-full origin-left bg-ice" style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
      </div>
    </section>
  );
}
