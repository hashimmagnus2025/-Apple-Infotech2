import { roi } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

/** Hairline routes from each word toward the centre — drawn once, in CSS. */
const ROUTES = [
  "M13 16H30V38",
  "M87 16H70V38",
  "M13 84H30V62",
  "M87 84H70V62",
];
const POS = [
  "left-0 top-0",
  "right-0 top-0 text-right items-end",
  "bottom-0 left-0",
  "bottom-0 right-0 text-right items-end",
];

/**
 * 04 — The promise. A minimal black field, one gigantic ROI, four small words
 * and a few hairlines. No particles, no canvas, no continuous motion.
 */
export default function ROIExperience() {
  return (
    <section id="roi" data-nav="dark" aria-labelledby="roi-title" className="on-dark relative overflow-hidden bg-ink text-paper">
      <div data-inview className="shell relative py-[clamp(4rem,8vw,8rem)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Eyebrow className="mb-4 text-ice">{roi.eyebrow}</Eyebrow>
            <h2 id="roi-title" className="headline max-w-xs text-[1.35rem] md:text-[1.7rem]">
              {roi.heading}
            </h2>
          </div>
          <p className="label hidden max-w-[16rem] text-right text-paper/50 md:block">{roi.footnote}</p>
        </div>

        <div className="relative mt-16 min-h-[clamp(22rem,56vw,46rem)] md:mt-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            fill="none"
          >
            {ROUTES.map((d, i) => (
              <path key={i} className="roi-line" d={d} pathLength={1} stroke="#B9C6D8" strokeOpacity="0.55" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ ["--d" as string]: `${0.2 + i * 0.15}s` }} />
            ))}
            <path className="roi-line" d="M0 50H100" pathLength={1} stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ ["--d" as string]: "0.1s" }} />
          </svg>

          {/* the word */}
          <div className="absolute inset-0 grid place-items-center">
            <p aria-hidden="true" className="display select-none text-[clamp(9rem,40vw,52rem)] leading-[0.74]" data-mask>
              <span>{roi.word}</span>
            </p>
          </div>

          {roi.satellites.map((s, i) => (
            <div key={s.word} className={`absolute hidden flex-col gap-1 md:flex ${POS[i]}`} data-reveal style={{ ["--d" as string]: `${0.3 + i * 0.1}s` }}>
              <span className="label tnum text-paper/45">0{i + 1}</span>
              <span className="text-[clamp(0.9rem,1.5vw,1.5rem)] font-semibold uppercase tracking-[0.12em]">{s.word}</span>
              <span className="label tnum text-ice">{s.metric}</span>
            </div>
          ))}
        </div>

        {/* small screens: words below the word */}
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 md:hidden" role="list">
          {roi.satellites.map((s, i) => (
            <li key={s.word} className="border-t rule pt-3">
              <span className="label tnum text-paper/45">0{i + 1}</span>
              <p className="mt-1 font-semibold uppercase tracking-[0.1em]">{s.word}</p>
              <p className="label tnum mt-1 text-ice">{s.metric}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
