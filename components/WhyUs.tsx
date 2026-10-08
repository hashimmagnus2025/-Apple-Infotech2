import { why } from "@/lib/content";
import { diamondPath } from "@/lib/geometry";
import Eyebrow from "@/components/ui/Eyebrow";

const dm = (cx: number, cy: number, h: number, rc = 5) => diamondPath(cx, cy, h, rc);
/** Four small constructions on the logo's 45° grid — one per principle. */
const GLYPHS = [
  <g key="u"><path d={dm(50, 50, 42, 8)} /><path d={dm(50, 50, 18, 4)} strokeOpacity=".6" /><circle cx="50" cy="50" r="2.5" fill="currentColor" /></g>,
  <g key="b"><path d={dm(50, 34, 26)} /><path d={dm(50, 52, 26)} strokeOpacity=".6" /><path d={dm(50, 70, 26)} strokeOpacity=".3" /></g>,
  <g key="o"><path d={dm(50, 50, 44, 8)} /><path d={dm(50, 50, 30, 6)} strokeOpacity=".7" /><path d={dm(50, 50, 16, 4)} strokeOpacity=".5" /></g>,
  <g key="d"><path d={dm(38, 62, 28, 6)} /><path d="M50 50L88 12" /><path d="M68 12H88V32" /></g>,
];

/** 08 — Four principles as an editorial index. CSS-only; heading sticks on desktop. */
export default function WhyUs() {
  return (
    <section id="why" data-nav="light" aria-labelledby="why-title" className="relative border-t rule bg-paper">
      <div className="shell grid-12 gap-y-14 py-[clamp(5rem,11vw,11rem)]">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <Eyebrow className="mb-8 text-steel-ink">{why.eyebrow}</Eyebrow>
            <h2 id="why-title" className="display text-[clamp(3.4rem,14vw,8rem)] font-semibold lg:text-[clamp(3rem,6.6vw,9rem)]">
              {why.lines.map((l, i) => (
                <span key={l} data-mask style={{ ["--d" as string]: `${i * 0.1}s` }}>
                  <span className={i === 1 ? "text-steel" : ""}>{l}</span>
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-8 max-w-sm text-base leading-relaxed text-steel-ink md:text-lg">
              {why.intro}
            </p>
          </div>
        </div>

        <ol className="col-span-12 lg:col-span-6 lg:col-start-7" role="list">
          {why.items.map((it, i) => (
            <li key={it.index} className="group relative flex min-h-[18rem] flex-col justify-between gap-12 py-8 lg:min-h-[26rem]">
              <span data-rule className="absolute left-0 top-0 h-px w-full bg-ink" aria-hidden="true" />
              <div className="flex items-start justify-between">
                <span className="label tnum text-steel-ink">{it.index}</span>
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className="h-14 w-14 text-steel transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:-translate-y-1 md:h-20 md:w-20">
                  {GLYPHS[i]}
                </svg>
              </div>
              <div>
                <h3 data-mask className="display text-[clamp(2.4rem,5.4vw,6.6rem)] font-semibold">
                  <span>{it.title}</span>
                </h3>
                <p data-reveal className="mt-5 max-w-md text-base leading-relaxed text-steel-ink md:text-lg">
                  {it.copy}
                </p>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="h-px bg-ink" />
        </ol>
      </div>
    </section>
  );
}
