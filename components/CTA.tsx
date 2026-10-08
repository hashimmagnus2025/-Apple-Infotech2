"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/motion";
import { revealLines } from "@/animations/text";
import { cta } from "@/lib/content";
import { hasRealEmail, site } from "@/lib/site";
import { RING_INNER, RING_OUTER, diamondPath } from "@/lib/geometry";
import { RingSegments } from "@/components/brand/Ring";
import EdgeSection from "@/components/ui/EdgeSection";
import Button from "@/components/ui/Button";

const FRAMES = [150, 128, 106].map((h, i) => diamondPath(100, 100, h, 18 + i * 2));

/** Final CTA — back to black, with the brand ring turning slowly behind. */
export default function CTA() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      q(".cta-line").forEach((l, i) => revealLines(l, { delay: i * 0.1, start: "top 85%", duration: 1.5 }));
      gsap.from(q(".cta-fade"), { opacity: 0, y: 30, duration: 1.3, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 55%", once: true } });
      // slow structural drift tied to scroll
      gsap.fromTo(q(".cta-geo"), { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );

  const href = hasRealEmail ? `mailto:${site.contact.email}` : "#contact-details";

  return (
    <EdgeSection id="contact" prev="#ffffff" tone="tone-dark" nav="dark" labelledBy="cta-title" depth={0.16}>
      <div ref={root} className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-[clamp(6rem,14vw,12rem)]">
        <div aria-hidden="true" className="cta-geo pointer-events-none absolute -right-[18vw] top-1/2 -z-10 h-[120vmin] w-[120vmin] -translate-y-1/2 md:-right-[6vw]">
          <svg viewBox="0 0 200 200" fill="none" className="h-full w-full overflow-visible text-white">
            <g className="spin-slower">
              {FRAMES.map((d, i) => (
                <path key={i} d={d} stroke="#AEC4E2" strokeOpacity={0.22 - i * 0.05} strokeWidth="0.25" strokeDasharray={i === 0 ? "1 3" : undefined} />
              ))}
            </g>
            <g className="spin-slow">
              <RingSegments block="#FFFFFF" blockOpacity={0.1} edge="#AEC4E2" edgeOpacity={0.16} />
              <path d={RING_OUTER} stroke="#AEC4E2" strokeOpacity="0.45" strokeWidth="0.25" />
              <path d={RING_INNER} stroke="#AEC4E2" strokeOpacity="0.45" strokeWidth="0.25" />
            </g>
          </svg>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_75%_50%,rgba(107,141,187,0.2),transparent)]" />

        <div className="shell w-full">
          <h2 id="cta-title" className="display text-[clamp(3rem,11.4vw,14rem)]">
            <span className="sr-only">{cta.lines.join(" ")}</span>
            {cta.lines.map((l, i) => (
              <span key={l} aria-hidden="true" className="cta-line block">
                {i === 1 ? (
                  <>
                    what&apos;s <span className="serif text-ice normal-case !tracking-[-0.03em] text-[1.1em]">next?</span>
                  </>
                ) : (
                  l
                )}
              </span>
            ))}
          </h2>

          <div className="mt-12 grid items-end gap-10 md:mt-16 md:grid-cols-12">
            <p className="cta-fade max-w-md text-lg leading-relaxed text-white/75 md:col-span-5 md:text-xl">{cta.copy}</p>
            <div className="cta-fade md:col-span-6 md:col-start-7">
              <Button
                href={href}
                variant="solid"
                magnetic
                cursor="arrow"
                className="!px-8 !py-6 !text-[0.95rem]"
                aria-label="Start a conversation with Apple Infotech"
              >
                {cta.button.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </EdgeSection>
  );
}
