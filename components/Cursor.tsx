"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { MQ } from "@/animations/motion";

/**
 * Desktop-only custom cursor.
 *   default      → 10px white/blue dot (difference-blended so it reads on any tone)
 *   links        → soft ring
 *   [data-cursor="Explore" | "View" | "Drag"] → labelled disc
 *   [data-cursor="arrow"] → arrow disc (CTAs)
 * Mounted client-side only; never rendered on touch / tablet.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const arrow = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.finePointer} and ${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
        document.documentElement.classList.add("has-cursor");
        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

        let mode = "";
        const set = (next: string, text = "") => {
          if (next === mode && (label.current?.textContent ?? "") === text) return;
          mode = next;
          const disc = next === "label" || next === "arrow";
          el.dataset.mode = next;
          if (label.current) label.current.textContent = text;
          gsap.to(el, {
            width: disc ? 92 : next === "link" ? 44 : 10,
            height: disc ? 92 : next === "link" ? 44 : 10,
            backgroundColor: disc ? "#AEC4E2" : next === "link" ? "rgba(255,255,255,0)" : "#ffffff",
            borderColor: next === "link" ? "#ffffff" : "rgba(255,255,255,0)",
            duration: 0.55,
            ease: "expo.out",
            overwrite: "auto",
          });
          gsap.to(label.current, { opacity: next === "label" ? 1 : 0, duration: 0.3, overwrite: "auto" });
          gsap.to(arrow.current, { opacity: next === "arrow" ? 1 : 0, scale: next === "arrow" ? 1 : 0.6, duration: 0.4, overwrite: "auto" });
        };

        let shown = false;
        const move = (e: PointerEvent) => {
          if (!shown) {
            shown = true;
            gsap.set(el, { x: e.clientX, y: e.clientY });
            gsap.to(el, { opacity: 1, duration: 0.4 });
          }
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const over = (e: PointerEvent) => {
          const t = e.target as Element | null;
          const tagged = t?.closest?.("[data-cursor]") as HTMLElement | null;
          if (tagged?.dataset.cursor) {
            const v = tagged.dataset.cursor;
            if (v === "arrow") set("arrow");
            else set("label", v);
          } else if (t?.closest?.("a,button,[role='button'],summary,input,textarea")) {
            set("link");
          } else {
            set("default");
          }
        };
        const leave = () => {
          shown = false;
          gsap.to(el, { opacity: 0, duration: 0.3 });
        };
        const down = () => gsap.to(el, { scale: 0.85, duration: 0.25 });
        const up = () => gsap.to(el, { scale: 1, duration: 0.4, ease: "expo.out" });

        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerover", over, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        return () => {
          document.documentElement.classList.remove("has-cursor");
          window.removeEventListener("pointermove", move);
          document.removeEventListener("pointerover", over);
          document.documentElement.removeEventListener("pointerleave", leave);
          window.removeEventListener("pointerdown", down);
          window.removeEventListener("pointerup", up);
        };
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-mode="default"
      className="pointer-events-none fixed left-0 top-0 z-[400] grid h-[10px] w-[10px] place-items-center rounded-full border border-transparent bg-white opacity-0 data-[mode=default]:mix-blend-difference data-[mode=link]:mix-blend-difference [@media(hover:none),(max-width:1023px)]:hidden"
    >
      <span ref={label} className="mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink opacity-0" />
      <svg
        ref={arrow}
        viewBox="0 0 20 20"
        className="absolute h-6 w-6 text-ink opacity-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M3 10h13M11 4.5 16.5 10 11 15.5" strokeLinecap="square" />
      </svg>
    </div>
  );
}
