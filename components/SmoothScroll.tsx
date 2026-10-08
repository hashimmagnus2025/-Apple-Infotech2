"use client";

import { useEffect } from "react";
import { MQ, prefersReducedMotion } from "@/animations/motion";
import { scrollToTarget, setLenis } from "@/animations/lenis";

/**
 * The ONE Lenis instance for the whole site.
 * - Lenis + GSAP are dynamically imported and only on mouse/trackpad desktops
 *   without reduced-motion. Phones/tablets keep native momentum scrolling and
 *   never download either library.
 * - Lenis is driven by GSAP's ticker → a single requestAnimationFrame loop.
 * - ScrollTrigger (used only by a few transform-only parallax layers) is
 *   updated from Lenis' scroll event and refreshed once after fonts load.
 * Also owns in-page anchor navigation.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const hash = a.getAttribute("href") ?? "";
      if (hash.length < 2 && hash !== "#top") return;
      e.preventDefault();
      scrollToTarget(hash === "#top" ? "" : hash);
    };
    document.addEventListener("click", onClick);

    let disposed = false;
    let cleanup: (() => void) | undefined;

    if (window.matchMedia(MQ.fine).matches && !prefersReducedMotion()) {
      Promise.all([import("lenis"), import("@/animations/gsap")]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
        if (disposed) return;
        const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, autoRaf: false });
        setLenis(lenis);
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          setLenis(null);
        };
      });
    }

    return () => {
      disposed = true;
      document.removeEventListener("click", onClick);
      cleanup?.();
    };
  }, []);

  return null;
}
