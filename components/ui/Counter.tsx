"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";

/**
 * Viewport-triggered counter.
 * - With a real `value` it counts up to it.
 * - With `null` (data not yet supplied) it runs a digit-scramble that settles
 *   on the honest placeholder `[XX]` — the animation is real, the number is not invented.
 */
export default function Counter({ value, suffix = "" }: { value: number | null; suffix?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const placeholder = value === null;

  useGSAP(
    () => {
      const el = num.current;
      const wrap = root.current;
      if (!el || !wrap || prefersReducedMotion()) return;
      const o = { p: 0 };
      let lastTick = 0;
      el.textContent = placeholder ? "00" : "0";
      gsap.to(o, {
        p: 1,
        duration: placeholder ? 2.4 : 2.6,
        ease: "power3.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        onUpdate: () => {
          if (!placeholder) {
            el.textContent = String(Math.round(o.p * (value as number)));
            return;
          }
          const now = performance.now();
          if (now - lastTick < 45) return;
          lastTick = now;
          const rnd = () => String(Math.floor(Math.random() * 10));
          el.textContent = [0, 1].map((i) => (o.p > 0.5 + i * 0.28 ? "X" : rnd())).join("");
        },
        onComplete: () => {
          el.textContent = placeholder ? "XX" : String(value);
        },
      });
    },
    { scope: root },
  );

  return (
    <span ref={root} className="inline-flex items-baseline">
      {placeholder && <span className="sr-only">Placeholder — figure to be supplied</span>}
      {placeholder && <span className="text-steel" aria-hidden="true">[</span>}
      <span ref={num} className="tabular-nums" aria-hidden={placeholder}>
        {placeholder ? "XX" : value}
      </span>
      {placeholder && <span className="text-steel" aria-hidden="true">]</span>}
      <span className="ml-[0.04em] text-steel" aria-hidden="true">
        {suffix}
      </span>
    </span>
  );
}
