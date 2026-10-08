import { RING } from "@/lib/geometry";
import { RingSegments } from "./Ring";

/**
 * The Apple Infotech mark — rounded diamond ring (black corners, light-blue
 * edges). Corners follow `currentColor`, edges follow `--mark-accent`, so it
 * reads correctly on both white and black sections. Pure SVG, server-renderable.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={RING.viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      fill="none"
    >
      <RingSegments />
    </svg>
  );
}

/** Mark + wordmark lockup (stacked "Apple / Infotech", as in the brand logo). */
export function Logo({ className = "", tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.3rem] font-extrabold tracking-[-0.03em]">Apple</span>
        <span className="mt-[0.2rem] text-[0.82rem] font-medium tracking-[0.04em] opacity-90">Infotech</span>
        {tagline && <span className="serif mt-2 text-[0.8rem] not-italic opacity-70">We Ensure Better ROI</span>}
      </span>
    </span>
  );
}
