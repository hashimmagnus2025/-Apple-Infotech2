"use client";

import { RefObject } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * "Peak" section transition — borrowed from the brand apex.
 * The incoming section rises as an angled wedge (apex at centre) that
 * flattens into a straight edge as it scrolls into place. The colour change
 * between sections *is* the transition.
 *
 * The section must sit inside a wrapper painted with the previous tone.
 */
export function usePeakEdge(ref: RefObject<HTMLElement | null>, depth = 0.14) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`(prefers-reduced-motion: no-preference)`, () => {
        const w = () => window.innerWidth * depth * (window.innerWidth < 768 ? 1.3 : 1);
        el.style.clipPath = `polygon(0 var(--peak, 0px), 50% 0, 100% var(--peak, 0px), 100% 100%, 0 100%)`;
        gsap.fromTo(
          el,
          { "--peak": () => `${w()}px` },
          {
            "--peak": "0px",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 35%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        return () => {
          el.style.clipPath = "";
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
}
