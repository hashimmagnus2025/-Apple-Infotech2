"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { usePeakEdge } from "@/animations/useEdge";

type Props = {
  id?: string;
  /** Colour of the section that precedes this one — revealed in the wedge. */
  prev: string;
  tone: "tone-dark" | "tone-white" | "tone-ice" | "tone-mist";
  nav: "light" | "dark";
  labelledBy?: string;
  className?: string;
  style?: CSSProperties;
  depth?: number;
  children: ReactNode;
};

/**
 * Section whose top edge arrives as the brand apex: an angled wedge that
 * flattens while scrolling. The wrapper carries the previous tone so the
 * colour change itself becomes the transition.
 */
export default function EdgeSection({ id, prev, tone, nav, labelledBy, className = "", style, depth, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  usePeakEdge(ref, depth);
  return (
    <div style={{ background: prev }}>
      <section
        ref={ref}
        id={id}
        data-nav={nav}
        aria-labelledby={labelledBy}
        className={`${tone} ${nav === "light" ? "on-light" : ""} relative ${className}`}
        style={style}
      >
        {children}
      </section>
    </div>
  );
}
