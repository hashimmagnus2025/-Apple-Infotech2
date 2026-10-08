import { stats } from "@/lib/content";
import Counter from "@/components/ui/Counter";
import Eyebrow from "@/components/ui/Eyebrow";

/** 05 — Impact in large type on hairlines. No cards. Counters run once. */
export default function ImpactStats() {
  return (
    <section id="impact" data-nav="light" aria-labelledby="impact-title" className="relative bg-paper">
      <div className="shell py-[clamp(5rem,11vw,11rem)]">
        <header className="grid-12 mb-[clamp(2.5rem,6vw,6rem)] gap-y-5">
          <Eyebrow className="col-span-12 pt-3 text-steel-ink lg:col-span-3">{stats.eyebrow}</Eyebrow>
          <h2 id="impact-title" className="headline col-span-12 text-[clamp(2.6rem,6.4vw,7.6rem)] lg:col-span-6">
            <span data-mask>
              <span>{stats.heading}</span>
            </span>
          </h2>
          <p className="label col-span-12 text-steel-ink lg:col-span-3 lg:pt-3 lg:text-right">{stats.note}</p>
        </header>

        <ul className="grid-12 gap-y-10" role="list">
          {stats.items.map((s, i) => (
            <li key={s.label} className="relative col-span-6 pb-6 pt-4 lg:col-span-3" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
              <span className="absolute left-0 right-0 top-0 h-px bg-ink" aria-hidden="true" />
              <p className="label tnum text-steel-ink">0{i + 1}</p>
              <p className="mt-6 text-[clamp(2.6rem,6.7vw,8.4rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-ink">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="label mt-5 text-ink">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
