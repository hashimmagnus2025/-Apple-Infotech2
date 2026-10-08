"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver drives every entrance on the page.
 * It only toggles an `is-in` class — the motion itself is a CSS transition on
 * transform/opacity, so there is no per-frame JavaScript. Elements animate once.
 * It also starts the hero intro (`html.ready`) after first paint.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal],[data-mask],[data-img],[data-rule],[data-inview]");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => io.observe(t));

    // start hero intro right after the first frame has painted
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("ready")));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return null;
}
