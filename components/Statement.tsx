import { statement } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

/** 01 — Perspective. One sentence, set large, revealed line by line (once). */
export default function Statement() {
  return (
    <section id="about" data-nav="light" aria-labelledby="statement-title" className="relative border-t rule bg-mist">
      <div className="shell grid-12 gap-y-12 py-[clamp(5rem,12vw,12rem)]">
        <Eyebrow className="col-span-12 pt-3 text-steel-ink lg:col-span-3">{statement.eyebrow}</Eyebrow>

        <h2 id="statement-title" className="headline col-span-12 text-[clamp(2.5rem,7.1vw,8.6rem)] lg:col-span-9">
          <span className="sr-only">{statement.lines.join(" ")}</span>
          {statement.lines.map((line, i) => (
            <span key={line} data-mask style={{ ["--d" as string]: `${i * 0.12}s` }} aria-hidden="true">
              <span className={i === statement.accentLine ? "text-steel" : ""}>{line}</span>
            </span>
          ))}
        </h2>

        <div className="col-span-12 border-t rule pt-6 lg:col-span-4 lg:col-start-9">
          <p data-reveal className="text-lg leading-relaxed text-steel-ink">
            {statement.body}
          </p>
        </div>
      </div>
    </section>
  );
}
