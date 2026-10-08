"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MQ, prefersReducedMotion } from "@/animations/motion";

/**
 * Tiny parallax: translate3d only, ±`amount` px, scrubbed 1:1 with scroll
 * (no extra smoothing — Lenis already provides it). Mouse desktops only; GSAP
 * is dynamically imported so other devices never load it. One trigger per
 * layer, killed on unmount.
 */
export default function ParallaxLayer({ amount = 24, className = "", children }: { amount?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MQ.fine).matches || prefersReducedMotion()) return;
    let disposed = false;
    let kill: (() => void) | undefined;
    import("@/animations/gsap").then(({ gsap }) => {
      if (disposed) return;
      const tween = gsap.fromTo(
        el,
        { y: -amount },
        {
          y: amount,
          ease: "none",
          force3D: true,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => {
      disposed = true;
      kill?.();
    };
  }, [amount]);

  return (
    <div ref={ref} className="will-change-transform">
      <div className={className}>{children}</div>
    </div>
  );
}
