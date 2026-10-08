"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/animations/motion";

/**
 * Sparse icy-blue dust. Deliberately tiny: ≤44 dots, no connecting lines,
 * paused when off-screen or when the tab is hidden, DPR-capped.
 */
export default function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const small = window.innerWidth < 768;
    const count = small ? 14 : 44;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    type P = { x: number; y: number; r: number; v: number; a: number; ph: number };
    let dots: P[] = [];

    const seed = () => {
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.4,
        v: 0.04 + Math.random() * 0.14,
        a: 0.25 + Math.random() * 0.55,
        ph: Math.random() * Math.PI * 2,
      }));
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let visible = true;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of dots) {
        p.y -= p.v * dt * 0.06;
        p.x += Math.sin(now * 0.0003 + p.ph) * 0.08;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        const tw = 0.6 + 0.4 * Math.sin(now * 0.0012 + p.ph);
        ctx.globalAlpha = p.a * tw;
        ctx.fillStyle = "#AEC4E2";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
