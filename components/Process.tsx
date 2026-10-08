import { transformation } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

/** Typography grows — and steps right — as the idea becomes impact. */
const SCALE = [
  { d: "7.2vw", m: "15vw", ml: "0%" },
  { d: "9.4vw", m: "13vw", ml: "4%" },
  { d: "11.8vw", m: "16vw", ml: "8%" },
  { d: "14.4vw", m: "19vw", ml: "12%" },
  { d: "18vw", m: "26vw", ml: "16%" },
];

/**
 * 03 — The transformation. IDEA → TECHNOLOGY → SOLUTION → IMPACT → ROI as a
 * staircase of ever-larger type. Static layout, entrances run once.
 */
export default function Process() {
  return (
    <section id="process" data-nav="light" aria-labelledby="process-title" className="relative border-t rule bg-paper">
      <div className="shell py-[clamp(5rem,11vw,11rem)]">
        <header className="grid-12 mb-[clamp(2rem,5vw,5rem)] gap-y-5">
          <Eyebrow className="col-span-12 pt-1 text-steel-ink lg:col-span-3">{transformation.eyebrow}</Eyebrow>
          <h2 id="process-title" className="headline col-span-12 max-w-[34rem] text-[clamp(1.6rem,2.6vw,2.8rem)] lg:col-span-9">
            {transformation.heading}
          </h2>
        </header>

        <ol role="list">
          {transformation.stages.map((s, i) => (
            <li key={s.key} className="relative border-t rule py-5 md:py-8">
              <span data-rule className="absolute -top-px left-0 h-px w-full bg-ink" style={{ ["--d" as string]: `${i * 0.05}s` }} aria-hidden="true" />
              <div className="grid-12 items-end gap-y-3">
                <div className="col-span-12 lg:col-span-2">
                  <p className="label tnum text-steel-ink">{s.label}</p>
                  <p data-reveal className="mt-3 hidden max-w-[14rem] text-sm leading-relaxed text-ink/70 lg:block">
                    {s.copy}
                  </p>
                </div>
                <h3
                  className="display col-span-12 text-[length:var(--fs-m)] lg:col-span-10 lg:ml-[var(--ml)] lg:text-[length:var(--fs-d)]"
                  style={{ ["--fs-m" as string]: SCALE[i].m, ["--fs-d" as string]: SCALE[i].d, ["--ml" as string]: SCALE[i].ml }}
                >
                  <span data-mask>
                    <span className={i === SCALE.length - 1 ? "text-steel" : ""}>{s.key}</span>
                  </span>
                </h3>
                <p className="col-span-12 max-w-sm text-sm leading-relaxed text-ink/70 lg:hidden">{s.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
