/** Shared motion constants and environment queries. */
export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power4.inOut",
  sine: "sine.inOut",
} as const;

export const MQ = {
  reduced: "(prefers-reduced-motion: reduce)",
  /** Pinned / horizontal scroll experiences */
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MQ.reduced).matches;
}

export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia(`${MQ.finePointer} and ${MQ.desktop}`).matches;
}
