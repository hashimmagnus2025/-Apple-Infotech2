/** Environment queries shared by the few places that need them. */
export const MQ = {
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  /** mouse / trackpad desktops — the only place smooth scrolling + cursor run */
  fine: "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MQ.reduced).matches;
}
