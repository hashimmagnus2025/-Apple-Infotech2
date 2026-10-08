import { solutions } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * 06 — Solutions as five architectural bays divided by hairlines.
 * Hover/focus: the bay lifts to white and its rule extends (CSS only).
 */
export default function Solutions() {
  return (
    <section id="solutions" data-nav="light" aria-labelledby="solutions-title" className="relative border-t rule bg-mist">
      <div className="shell pt-[clamp(5rem,11vw,11rem)]">
        <header className="grid-12 mb-[clamp(2.5rem,6vw,6rem)] gap-y-5">
          <Eyebrow className="col-span-12 pt-3 text-steel-ink lg:col-span-3">{solutions.eyebrow}</Eyebrow>
          <h2 id="solutions-title" className="headline col-span-12 text-[clamp(2.6rem,6.4vw,7.6rem)] lg:col-span-9">
            <span data-mask>
              <span>{solutions.heading}</span>
            </span>
          </h2>
        </header>
      </div>

      <ul className="shell grid border-t rule lg:grid-cols-5" role="list">
        {solutions.items.map((s, i) => (
          <li
            key={s.id}
            data-reveal
            style={{ ["--d" as string]: `${i * 0.07}s` }}
            className="group relative flex min-h-[19rem] flex-col justify-between gap-12 border-b rule px-0 py-7 transition-colors duration-500 focus-within:bg-paper hover:bg-paper max-lg:border-b lg:min-h-[32rem] lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <div className="flex items-start justify-between">
              <span className="label tnum text-steel-ink">{s.index}</span>
              <span aria-hidden="true" className="text-xl leading-none text-steel transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </div>
            <div>
              <h3 className="headline text-[clamp(1.7rem,2.6vw,3rem)]">{s.title}</h3>
              <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink/70">{s.lead}</p>
              <ul className="label mt-6 space-y-1 text-steel-ink" role="list">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-[2px] w-full origin-left scale-x-0 bg-ice transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100 group-focus-within:scale-x-100 lg:left-0"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
