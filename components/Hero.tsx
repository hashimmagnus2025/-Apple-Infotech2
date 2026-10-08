"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText, useGSAP } from "@/animations/gsap";
import { onIntroReady } from "@/animations/intro";
import { MQ, prefersReducedMotion } from "@/animations/motion";
import { hero } from "@/lib/content";
import { diamondLattice } from "@/lib/geometry";
import BrandObject from "@/components/brand/BrandObject";
import Button from "@/components/ui/Button";

const Particles = dynamic(() => import("@/components/brand/Particles"), { ssr: false });
const LATTICE = diamondLattice(2400, 52);

/** Per-line layout: indent (editorial asymmetry) + treatment. */
const LINE_STYLE = [
  "",
  "md:ml-[7vw]",
  "",
  "md:ml-[20vw]",
] as const;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(el);

      /* ------------------------------------------------ intro sequence */
      if (!reduced) {
        const splits = q(".hero-line").map((line) => SplitText.create(line, { type: "chars", charsClass: "hero-char" }));
        gsap.set(".hero-char", { yPercent: 118 });
        gsap.set(".hero-eyebrow, .hero-copy > *, .hero-scroll", { opacity: 0, y: 26 });
        gsap.set(".hero-cta > *", { opacity: 0, y: 26 });
        gsap.set(".bo-layer", { opacity: 0, scale: 0.9, svgOrigin: "300 300" });
        gsap.set(".bo-draw", { strokeDashoffset: 1 });
        gsap.set(".bo-fill", { opacity: 0 });
        gsap.set(".hero-bg", { opacity: 0 });

        onIntroReady(() => {
          const tl = gsap.timeline({ delay: 0.5, defaults: { ease: "expo.out" } });
          // 5 — headline reveals line by line
          q(".hero-line").forEach((line, i) => {
            tl.to(line.querySelectorAll(".hero-char"), { yPercent: 0, duration: 1.5, stagger: 0.022 }, 0.12 * i);
          });
          tl.to(q(".hero-eyebrow"), { opacity: 1, y: 0, duration: 1.1 }, 0.1)
            // 6 — supporting copy fades upward
            .to(q(".hero-copy > *"), { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.75)
            // 7 — CTA appears
            .to(q(".hero-cta > *"), { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 1.0)
            .to(q(".hero-scroll"), { opacity: 1, y: 0, duration: 1.2 }, 1.2)
            // 8 — geometric visual enters
            .to(q(".bo-layer"), { opacity: 1, scale: 1, duration: 2.2, stagger: 0.12, ease: "power3.out" }, 0.4)
            .to(q(".bo-draw"), { strokeDashoffset: 0, duration: 2.4, stagger: { each: 0.025, from: "start" }, ease: "power2.inOut" }, 0.6)
            .to(q(".bo-fill"), { opacity: 1, duration: 1.8, ease: "power2.out" }, 1.4)
            // 9 — background begins its slow movement
            .to(q(".hero-bg"), { opacity: 1, duration: 2.6, ease: "power1.inOut" }, 0.9);
        });

        // ambient background drift (continuous, transform-only)
        gsap.to(".hero-lattice", { x: -52, duration: 26, ease: "none", repeat: -1 });
        gsap.to(".hero-glow-a", { xPercent: 12, yPercent: -8, duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".hero-glow-b", { xPercent: -10, yPercent: 10, duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true });

        return () => splits.forEach((s) => s.revert());
      }
    },
    { scope: root },
  );

  /* scroll-out: the stage recedes as the white section rises */
  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.to(".hero-visual", {
          yPercent: 14,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });
      mm.add("(min-width: 0px)", () => {
        gsap.to(".hero-title", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-fade", {
          opacity: 0.0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "55% top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      data-nav="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-ink text-paper"
    >
      {/* background field */}
      <div className="hero-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-glow-a absolute -right-[15%] top-[-10%] h-[90vmax] w-[90vmax] rounded-full bg-[radial-gradient(closest-side,rgba(107,141,187,0.30),transparent)]" />
        <div className="hero-glow-b absolute -left-[30%] bottom-[-35%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(174,196,226,0.10),transparent)]" />
        <svg className="absolute inset-0 h-full w-full opacity-60 [mask-image:radial-gradient(70%_70%_at_70%_45%,#000,transparent)]">
          <g className="hero-lattice">
            <path d={LATTICE} transform="translate(-104 -40)" stroke="#6B8DBB" strokeOpacity="0.22" strokeWidth="0.6" fill="none" />
          </g>
        </svg>
        <Particles />
      </div>

      {/* geometric object */}
      <div
        className="hero-visual pointer-events-none absolute right-[-32vw] top-[44%] w-[118vw] -translate-y-1/2 sm:right-[-18vw] sm:w-[84vw] md:right-[-9vw] md:w-[66vw] lg:right-[1vw] lg:w-[min(56vw,118svh)]"
        aria-hidden="true"
      >
        <BrandObject className="w-full" />
      </div>

      <div className="hero-fade shell relative z-10 flex w-full flex-col justify-between pb-8 pt-[calc(var(--nav-h)+clamp(1rem,4vh,3rem))] md:pb-10">
        <div>
          <p className="hero-eyebrow eyebrow mb-6 flex items-center gap-4 text-ice md:mb-8">
            <span aria-hidden="true" className="h-px w-10 bg-ice/70" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="hero-title display text-[clamp(2.6rem,13.4vw,6.2rem)] md:text-[clamp(4rem,11.2vw,16rem)]"
          >
            <span className="sr-only">{hero.lines.join(" ")}</span>
            <span aria-hidden="true" className="block">
              {hero.lines.map((line, i) => (
                <span key={line} className={`line-mask block ${LINE_STYLE[i]}`}>
                  <span
                    className={`hero-line block whitespace-nowrap ${
                      i === 3 ? "text-transparent [-webkit-text-stroke:1.5px_#AEC4E2]" : ""
                    }`}
                  >
                    {i === 2 ? (
                      <>
                        that <span className="serif text-ice normal-case !tracking-[-0.03em] text-[1.12em] leading-[0.7]">moves</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
          <div className="hero-copy md:col-span-6 lg:col-span-5">
            <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/75 md:text-lg">{hero.copy}</p>
          </div>
          <div className="hero-cta flex flex-wrap items-center gap-4 md:col-span-6 lg:col-span-4 lg:col-start-7">
            <Button href={hero.cta.href} variant="solid" magnetic cursor="arrow" aria-label="Explore Apple Infotech technology solutions">
              {hero.cta.label}
            </Button>
          </div>
          <div className="hero-scroll hidden items-center justify-end gap-4 lg:col-span-2 lg:col-start-11 lg:flex">
            <span className="eyebrow text-white/60">Scroll</span>
            <span className="relative block h-14 w-px overflow-hidden bg-white/20" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 block h-full bg-ice [animation:scroll-cue_2.4s_cubic-bezier(.7,0,.2,1)_infinite]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
