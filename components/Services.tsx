import { services } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/Arrow";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";

/**
 * 02 — Capabilities as a full-width editorial index.
 * Pure CSS hover/focus: only the active row moves (number, title, rule, thumbnail).
 */
export default function Services() {
  return (
    <section id="capabilities" data-nav="light" aria-labelledby="services-title" className="relative border-t rule bg-paper">
      <div className="shell py-[clamp(5rem,11vw,11rem)]">
        <header className="grid-12 mb-[clamp(2.5rem,6vw,6rem)] gap-y-6">
          <Eyebrow className="col-span-12 pt-3 text-steel-ink lg:col-span-3">{services.eyebrow}</Eyebrow>
          <h2 id="services-title" className="headline col-span-12 text-[clamp(3rem,8.4vw,10rem)] lg:col-span-9">
            <span data-mask>
              <span>{services.heading}</span>
            </span>
          </h2>
        </header>

        <ul className="border-t rule" role="list">
          {services.items.map((s, i) => (
            <li key={s.id} className="group relative border-b rule" data-reveal style={{ ["--d" as string]: `${i * 0.05}s` }}>
              <div className="grid-12 items-start gap-y-4 py-6 md:py-9">
                <span className="label tnum col-span-2 pt-[0.7em] text-steel-ink transition-transform duration-500 ease-[var(--ease-out)] group-focus-within:translate-x-2 group-hover:translate-x-2 md:col-span-1">
                  {s.index}
                </span>

                <div className="col-span-10 md:col-span-6">
                  <h3 className="display text-[clamp(1.9rem,4.7vw,5.6rem)] font-semibold transition-transform duration-500 ease-[var(--ease-out)] group-focus-within:translate-x-[1vw] group-hover:translate-x-[1vw]">
                    {s.title}
                  </h3>
                  <p className="label mt-4 text-steel-ink">{s.points.join("  ·  ")}</p>
                </div>

                <div className="col-span-10 col-start-3 md:col-span-3 md:col-start-8 md:pt-[0.6em]">
                  <p className="text-[0.95rem] leading-relaxed text-ink/75">{s.description}</p>
                  <a
                    href="#contact"
                    className="label u-link mt-4 inline-flex items-center gap-2 text-ink"
                    aria-label={`Discuss ${s.title}`}
                  >
                    Discuss <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* small image — appears for the active row only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none col-span-2 col-start-11 hidden translate-y-2 scale-[0.98] opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out)] group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 lg:block"
                >
                  <Photo src={s.image} alt="" width={1200} height={1500} sizes="16vw" className="aspect-[4/5] w-full" />
                </div>
              </div>

              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[var(--ease-out)] group-focus-within:scale-x-100 group-hover:scale-x-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
