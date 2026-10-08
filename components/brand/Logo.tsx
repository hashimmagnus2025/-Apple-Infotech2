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
      <Mark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.2rem] font-bold tracking-[-0.035em]">Apple</span>
        <span className="mt-[0.18rem] text-[0.78rem] font-medium tracking-[0.03em] opacity-80">Infotech</span>
        {tagline && <span className="mt-2 text-[0.75rem] opacity-60">We Ensure Better ROI</span>}
      </span>
    </span>
  );
}
