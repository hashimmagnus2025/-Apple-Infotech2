import { cta } from "@/lib/content";
import { hasRealEmail, site } from "@/lib/site";
import { RING_INNER, RING_OUTER } from "@/lib/geometry";
import Button from "@/components/ui/Button";

/** Final CTA — minimal black. One static brand outline, nothing else. */
export default function CTA() {
  const href = hasRealEmail ? `mailto:${site.contact.email}` : "#contact-details";
  return (
    <section id="contact" data-nav="dark" aria-labelledby="cta-title" className="on-dark relative isolate overflow-hidden bg-ink text-paper">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        fill="none"
        className="pointer-events-none absolute -right-[16vw] top-1/2 -z-10 h-[110vmin] w-[110vmin] -translate-y-1/2 text-ice md:-right-[4vw]"
      >
        <path d={RING_OUTER} stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.35" />
        <path d={RING_INNER} stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.35" />
      </svg>

      <div className="shell flex min-h-[88svh] flex-col justify-center py-[clamp(6rem,12vw,11rem)]">
        <h2 id="cta-title" className="display text-[clamp(3rem,11vw,14rem)]">
          <span className="sr-only">{cta.lines.join(" ")}</span>
          {cta.lines.map((l, i) => (
            <span key={l} data-mask aria-hidden="true" style={{ ["--d" as string]: `${i * 0.12}s` }}>
              <span>{l}</span>
            </span>
          ))}
        </h2>

        <div className="mt-12 grid-12 items-end gap-y-8 md:mt-16">
          <p data-reveal className="col-span-12 max-w-md text-lg leading-relaxed text-paper/75 md:col-span-5 md:text-xl">
            {cta.copy}
          </p>
          <div data-reveal className="col-span-12 md:col-span-6 md:col-start-7" style={{ ["--d" as string]: "0.1s" }}>
            <Button href={href} variant="solid" cursor="arrow" className="!px-8 !py-6 !text-[0.8rem]" aria-label="Start a conversation with Apple Infotech">
              {cta.button.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
