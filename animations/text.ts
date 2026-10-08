"use client";

import { gsap, ScrollTrigger, SplitText } from "./gsap";
import { EASE } from "./motion";

type LineOpts = {
  /** Reveal when the element enters the viewport; omit to return a paused-free tween you control. */
  scroll?: boolean;
  start?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
};

/**
 * Split an element into masked lines and slide them up.
 * Descender-safe: masks get a little vertical padding so lowercase letters never clip.
 */
export function revealLines(el: Element, opts: LineOpts = {}) {
  const { scroll = true, start = "top 88%", delay = 0, duration = 1.25, stagger = 0.09 } = opts;
  let out: gsap.core.Tween | undefined;
  SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit(self) {
      (self.masks as HTMLElement[] | undefined)?.forEach((m) => {
        m.style.paddingBottom = "0.14em";
        m.style.marginBottom = "-0.14em";
        m.style.paddingTop = "0.06em";
        m.style.marginTop = "-0.06em";
      });
      out = gsap.from(self.lines, {
        yPercent: 125,
        duration,
        delay,
        stagger,
        ease: EASE.out,
        ...(scroll ? { scrollTrigger: { trigger: el, start, once: true } } : {}),
      });
      return out;
    },
  });
  return out;
}

/**
 * Split into words and return them (for scroll-scrubbed word-by-word reads).
 * Caller owns the animation.
 */
export function splitWords(el: Element) {
  return SplitText.create(el, { type: "words", wordsClass: "split-word" });
}

export { ScrollTrigger };
