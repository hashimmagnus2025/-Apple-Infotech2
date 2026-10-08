import { hero } from "@/lib/content";
import { RING_INNER, RING_OUTER } from "@/lib/geometry";
import { RingSegments } from "@/components/brand/Ring";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

/** 45° chamfered corners — the diamond ring's angle, used as an image mask. */
const MASK = "[clip-path:polygon(44px_0,100%_0,100%_100%,0_100%,0_44px)]";

/**
 * Editorial hero. White field, enormous two-line headline, one oversized
 * monochrome image band in a geometric mask, hairlines and small metadata.
 * Server component — the intro is pure CSS (.hi / .hi-line in globals.css).
 */
export default function Hero() {
  return (
    <section id="top" data-nav="light" aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pt-[var(--nav-h)]">
      <div className="shell flex min-h-[calc(100svh-var(--nav-h))] flex-col">
        <div className="hi label flex items-center justify-between border-b rule py-4 text-steel-ink" style={{ ["--d" as string]: "0.05s" }}>
          <span>(01) {hero.label}</span>
          <span className="hidden sm:inline">Index — Home</span>
          <span>We Ensure Better ROI</span>
        </div>

        <h1 id="hero-title" className="display pt-6 text-[clamp(3.3rem,15.6vw,8rem)] md:pt-8 md:text-[clamp(4.6rem,12.4vw,17rem)]">
          {hero.lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.05em]">
              <span className={`hi-line block ${i === 1 ? "text-steel" : ""}`} style={{ ["--d" as string]: `${0.12 + i * 0.12}s` }}>
                {l}
              </span>
            </span>
          ))}
        </h1>

        <div className="grid-12 flex-1 items-end gap-y-8 pb-8 pt-8 md:pt-10">
          {/* copy + CTA */}
          <div className="col-span-12 flex flex-col gap-7 lg:col-span-4 lg:self-start lg:pt-2">
            <p className="hi max-w-[26rem] text-[1.0625rem] leading-relaxed text-ink/80 md:text-lg" style={{ ["--d" as string]: "0.5s" }}>
              {hero.copy}
            </p>
            <div className="hi" style={{ ["--d" as string]: "0.62s" }}>
              <Button href={hero.cta.href} variant="solid" cursor="arrow" aria-label="Explore Apple Infotech technology solutions">
                {hero.cta.label}
              </Button>
            </div>
          </div>

          {/* oversized image band, bleeding to the right edge */}
          <div className="relative col-span-12 lg:col-span-8 lg:-mr-[var(--gutter)]">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
              className="hi-frame pointer-events-none absolute -left-10 -top-10 z-10 hidden h-[110%] w-auto text-ice lg:block"
            >
              <path d={RING_OUTER} stroke="currentColor" strokeWidth="0.5" />
              <path d={RING_INNER} stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <ParallaxLayer amount={16}>
              <div className="hi-img relative">
                <div className={`${MASK}`}>
                  <Photo
                    src="/images/wide.jpg"
                    alt="[CLIENT IMAGERY] Monochrome architectural façade — placeholder for Apple Infotech photography"
                    width={2000}
                    height={1250}
                    sizes="(min-width:1024px) 66vw, 100vw"
                    preload
                    className="aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[21/8]"
                  />
                </div>
                <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute bottom-4 right-5 h-11 w-11 text-paper md:right-[calc(var(--gutter)+0.5rem)]" fill="none">
                  <RingSegments block="#FFFFFF" edge="#B9C6D8" />
                </svg>
              </div>
            </ParallaxLayer>
            <p className="label mt-3 flex justify-between text-steel-ink">
              <span>{hero.caption}</span>
              <span aria-hidden="true" className="lg:pr-[var(--gutter)]">↘</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
