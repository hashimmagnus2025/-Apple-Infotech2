"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { imageStory } from "@/lib/content";
import { RING_INNER, RING_OUTER } from "@/lib/geometry";
import EdgeSection from "@/components/ui/EdgeSection";
import Eyebrow from "@/components/ui/Eyebrow";
import StoryImage from "@/components/ui/StoryImage";

/**
 * Section 07 — image storytelling.
 * One oversized monochrome image cut at the brand angle, a giant word that
 * slides behind it, a smaller overlapping frame and the brand geometry
 * crossing both. Scroll scales the image, moves the type, turns the geometry.
 */
export default function ImageStory() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const h = q(".is-heading")[0];
      if (h) revealLines(h, { start: "top 85%" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });
      tl.fromTo(q(".is-word"), { xPercent: 14 }, { xPercent: -18, duration: 1 }, 0)
        .fromTo(q(".is-main-inner"), { scale: 1.45 }, { scale: 1, duration: 1 }, 0)
        .fromTo(q(".is-main"), { yPercent: 8 }, { yPercent: -5, duration: 1 }, 0)
        .fromTo(q(".is-second"), { y: 140 }, { y: -10, duration: 1 }, 0)
        .fromTo(q(".is-second-inner"), { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
        .fromTo(q(".is-geo"), { rotate: -10, x: 40 }, { rotate: 12, x: -50, duration: 1 }, 0)
        .fromTo(q(".is-cap"), { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.1);
    },
    { scope: root },
  );

  return (
    <EdgeSection id="craft" prev="#070B11" tone="tone-mist" nav="light" labelledBy="craft-title" depth={0.14}>
      <div ref={root} className="relative h-[210vh] md:h-[240vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* oversized word, partly hidden behind the image */}
          <div className="pointer-events-none absolute inset-x-0 top-[44%] flex -translate-y-1/2 justify-center">
            <p
              aria-hidden="true"
              className="is-word display select-none whitespace-nowrap text-[clamp(9rem,44vw,60rem)] leading-none text-ice/70"
            >
              {imageStory.word}
            </p>
          </div>

          {/* main image — cut at the brand angle */}
          <div className="is-main absolute inset-x-[var(--gutter)] bottom-[7svh] top-[34svh] md:inset-x-auto md:right-[5vw] md:top-[11svh] md:bottom-[9svh] md:w-[54vw]">
            <div className="h-full w-full [clip-path:polygon(0_0,100%_0,100%_100%,72px_100%,0_calc(100%-72px))] md:[clip-path:polygon(0_0,100%_0,100%_100%,min(11vw,150px)_100%,0_calc(100%-min(11vw,150px)))]">
              <div className="is-main-inner h-full w-full will-change-transform">
                <StoryImage art="facade" uid="story-main" alt="[CLIENT IMAGERY] Placeholder architectural photograph, to be replaced" sizes="(min-width:768px) 54vw, 100vw" />
              </div>
            </div>
            <p className="is-cap eyebrow absolute -bottom-6 right-0 text-steel-ink max-md:hidden">{imageStory.captions[0]}</p>
          </div>

          {/* overlapping secondary frame */}
          <div className="is-second absolute bottom-[8svh] left-[6vw] hidden h-[34svh] w-[20vw] md:block">
            <div className="absolute -inset-3 translate-x-3 translate-y-3 border border-steel" aria-hidden="true" />
            <div className="relative h-full w-full overflow-hidden">
              <div className="is-second-inner h-full w-full">
                <StoryImage art="aisle" uid="story-second" alt="[CLIENT IMAGERY] Placeholder data-infrastructure photograph, to be replaced" sizes="20vw" />
              </div>
            </div>
          </div>

          {/* brand geometry crossing the composition */}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            fill="none"
            className="is-geo pointer-events-none absolute right-[-14vw] top-1/2 z-20 h-[112vmin] w-[112vmin] -translate-y-1/2 mix-blend-difference md:right-[8vw]"
          >
            <path d={RING_OUTER} stroke="#fff" strokeWidth="0.35" strokeOpacity="0.9" />
            <path d={RING_INNER} stroke="#fff" strokeWidth="0.35" strokeOpacity="0.9" />
            <path d="M100 4V196M4 100H196" stroke="#fff" strokeWidth="0.2" strokeOpacity="0.45" />
          </svg>

          {/* copy */}
          <div className="shell pointer-events-none relative z-30 h-full pt-[calc(var(--nav-h)+0.5rem)] md:pt-[18svh]">
            <Eyebrow className="mb-5 text-steel-ink">{imageStory.eyebrow}</Eyebrow>
            <h2
              id="craft-title"
              className="is-heading display-sentence max-w-[22rem] text-[clamp(2rem,4.8vw,5.6rem)] md:max-w-[38vw]"
            >
              {imageStory.heading}
            </h2>
            <p className="mt-6 max-w-[20rem] text-base leading-relaxed text-steel-ink max-md:hidden md:max-w-[26rem] md:text-lg">{imageStory.body}</p>
          </div>
        </div>
      </div>
    </EdgeSection>
  );
}
