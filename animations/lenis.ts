import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}
export function getLenis() {
  return instance;
}

/** Smooth-scroll to a hash target (or native fallback when Lenis is off). */
export function scrollToTarget(hash: string, offset = 0) {
  if (typeof window === "undefined") return;
  const id = hash.replace(/^#/, "");
  const el = id ? document.getElementById(id) : document.body;
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: "auto" });
  }
  if (id) history.replaceState(null, "", `#${id}`);
}
