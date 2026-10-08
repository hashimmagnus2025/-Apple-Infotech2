"use client";

import { useEffect, useRef } from "react";
import { MQ, prefersReducedMotion } from "@/animations/motion";

/**
 * Lightweight cursor label — shown ONLY over elements tagged data-cursor
 * (e.g. "View"). No idle loop: one passive pointermove listener, one transform
 * write per animation frame while the pointer is moving. Fine-pointer desktops only.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia(MQ.fine).matches || prefersReducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    let x = 0;
    let y = 0;
    let raf = 0;
    let tag = "";
    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const v = t?.dataset.cursor ?? "";
      if (v === tag) return;
      tag = v;
      if (v && label.current) label.current.textContent = v === "arrow" ? "→" : v;
      el.classList.toggle("is-on", !!v);
      el.style.opacity = v ? "1" : "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div className="cursor-inner">
        <span ref={label} />
      </div>
    </div>
  );
}
