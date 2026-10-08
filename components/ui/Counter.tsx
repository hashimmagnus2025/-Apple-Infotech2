"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/animations/motion";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts once when scrolled into view. Writes straight to the DOM node with a
 * short rAF tween that ends itself — no React state, no library, no idle loop.
 * `value === null` (data not supplied yet) runs a digit scramble that settles
 * on the honest placeholder "XX".
 */
export default function Counter({ value, suffix = "" }: { value: number | null; suffix?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const placeholder = value === null;

  useEffect(() => {
    const el = num.current;
    const wrap = root.current;
    if (!el || !wrap || prefersReducedMotion()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const dur = 2000;
        const t0 = performance.now();
        let lastScramble = 0;
        const frame = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const e = easeOut(p);
          if (!placeholder) {
            el.textContent = String(Math.round(e * (value as number)));
          } else if (now - lastScramble > 50) {
            lastScramble = now;
            const r = () => String(Math.floor(Math.random() * 10));
            el.textContent = [0, 1].map((i) => (e > 0.55 + i * 0.25 ? "X" : r())).join("");
          }
          if (p < 1) raf = requestAnimationFrame(frame);
          else el.textContent = placeholder ? "XX" : String(value);
        };
        raf = requestAnimationFrame(frame);
      },
      { threshold: 0.6 },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [placeholder, value]);

  return (
    <span ref={root} className="inline-flex items-baseline tnum">
      {placeholder && <span className="sr-only">Placeholder — figure to be supplied</span>}
      {placeholder && (
        <span className="text-ice" aria-hidden="true">
          [
        </span>
      )}
      <span ref={num} aria-hidden={placeholder}>
        {placeholder ? "XX" : value}
      </span>
      {placeholder && (
        <span className="text-ice" aria-hidden="true">
          ]
        </span>
      )}
      <span className="ml-[0.04em] text-steel" aria-hidden="true">
        {suffix}
      </span>
    </span>
  );
}
