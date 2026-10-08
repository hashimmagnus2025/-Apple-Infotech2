"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { isIntroReady, onIntroReady } from "@/animations/intro";
import { scrollToTarget, setLenis } from "@/animations/lenis";

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger and Lenis
 * share one clock. Also owns in-page anchor navigation.
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

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    let off: (() => void) | undefined;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (!isIntroReady()) lenis.stop();
      off = onIntroReady(() => lenis?.start());
    }

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      off?.();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
