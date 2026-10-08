"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/animations/motion";
import { projects } from "@/lib/content";
import { Arrow, ArrowUpRight } from "@/components/ui/Arrow";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";

const CHAMFER = "[clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,40px_100%,0_calc(100%-40px))]";

/**
 * 09 — Selected work: a native scroll-snap rail. No parallax, no React state:
 * progress is written straight to the DOM from one passive, rAF-coalesced
 * scroll listener. All entries are replaceable placeholders.
 */
export default function Projects() {
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    let raf = 0;
    let lastIdx = -1;
    const sync = () => {
      raf = 0;
      const max = r.scrollWidth - r.clientWidth;
      const p = max > 0 ? r.scrollLeft / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${0.12 + p * 0.88})`;
      const idx = Math.min(projects.items.length - 1, Math.round(p * (projects.items.length - 1)));
      if (idx !== lastIdx && count.current) {
        lastIdx = idx;
        count.current.textContent = `0${idx + 1} / 0${projects.items.length}`;
      }
      if (prev.current) prev.current.disabled = p <= 0.01;
      if (next.current) next.current.disabled = p >= 0.99;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    sync();
    r.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);

    // mouse drag-to-scroll (desktop mice only)
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
      if (raf) cancelAnimationFrame(raf);
      r.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      r.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      r.removeEventListener("click", click, true);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const r = rail.current;
    if (!r) return;
    const card = r.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * step, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const items = projects.items;
  const btn =
    "grid h-12 w-12 place-items-center border border-ink transition-colors duration-300 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <section id="work" data-nav="light" aria-labelledby="work-title" className="relative overflow-hidden border-t rule bg-mist">
      <div className="shell pt-[clamp(5rem,11vw,11rem)]">
        <header className="grid-12 mb-[clamp(2rem,5vw,4.5rem)] gap-y-5">
          <Eyebrow className="col-span-12 pt-3 text-steel-ink lg:col-span-3">{projects.eyebrow}</Eyebrow>
          <h2 id="work-title" className="headline col-span-12 text-[clamp(2.6rem,6.4vw,7.6rem)] lg:col-span-7">
            <span data-mask>
              <span>{projects.heading}</span>
            </span>
          </h2>
          <div className="col-span-12 flex gap-3 lg:col-span-2 lg:items-end lg:justify-end">
            <button ref={prev} type="button" onClick={() => go(-1)} aria-label="Previous project" className={btn}>
              <Arrow className="h-5 w-5 rotate-180" />
            </button>
            <button ref={next} type="button" onClick={() => go(1)} aria-label="Next project" className={btn}>
              <Arrow className="h-5 w-5" />
            </button>
          </div>
        </header>
        <p className="label mb-6 text-steel-ink">{projects.note}</p>
      </div>

      <div
        ref={rail}
        role="region"
        aria-label="Selected projects — scrollable"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4 md:select-none"
      >
        {items.map((p) => (
          <article key={p.id} data-card className="group relative w-[78vw] shrink-0 snap-start md:w-[42vw] lg:w-[31vw]">
            <a href="#contact" data-cursor="View" draggable={false} aria-label={`Discuss a project like ${p.name} — ${p.sector}`} className="block">
              <div className={`relative overflow-hidden ${CHAMFER}`}>
                <Photo
                  src={p.image}
                  alt={`[CLIENT IMAGERY] Placeholder visual for ${p.name}`}
                  width={1200}
                  height={1500}
                  sizes="(min-width:1024px) 31vw, (min-width:768px) 42vw, 78vw"
                  className="aspect-[4/5] w-full"
                  imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                />
                <span className="label tnum absolute left-5 top-5 text-paper">{p.index}</span>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center bg-paper text-ink transition-colors duration-300 group-hover:bg-ice"
                >
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <dl className="absolute inset-x-0 bottom-0 grid translate-y-full grid-cols-3 gap-4 bg-paper p-5 text-sm transition-transform duration-500 ease-[var(--ease-out)] group-focus-within:translate-y-0 group-hover:translate-y-0 max-md:translate-y-0">
                  {([["Technology", p.technology], ["Solution", p.solution], ["Impact", p.impact]] as const).map(([k, v]) => (
                    <div key={k}>
                      <dt className="label mb-1 text-steel-ink">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t rule pt-4">
                <h3 className="headline text-[clamp(1.3rem,2vw,2rem)]">{p.name}</h3>
                <p className="label text-steel-ink">{p.sector}</p>
              </div>
            </a>
          </article>
        ))}
        <div aria-hidden="true" className="w-[1px] shrink-0" />
      </div>

      <div className="shell flex items-center gap-6 pb-[clamp(5rem,10vw,9rem)] pt-8">
        <span ref={count} className="label tnum text-steel-ink">
          01 / 0{items.length}
        </span>
        <div className="relative h-px flex-1 bg-ink/15" aria-hidden="true">
          <span ref={bar} className="absolute inset-0 origin-left bg-ink" style={{ transform: "scaleX(0.12)" }} />
        </div>
      </div>
    </section>
  );
}
