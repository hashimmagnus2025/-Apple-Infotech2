import { finalStatement } from "@/lib/content";

const LINES = [
  { text: "Better technology.", ml: "0vw" },
  { text: "Better outcomes.", ml: "7vw" },
  { text: "Better ROI.", ml: "14vw", accent: true },
];

/** 10 — The closing argument, set as a three-step staircase. */
export default function FinalStatement() {
  return (
    <section id="outcomes" data-nav="light" aria-labelledby="final-title" className="relative border-t rule bg-paper">
      <div className="shell py-[clamp(5rem,12vw,12rem)]">
        <h2 id="final-title" className="sr-only">
          {finalStatement.srHeading}
        </h2>
        <div aria-hidden="true" className="display text-[clamp(2.6rem,12vw,5rem)] md:text-[clamp(3rem,7.9vw,11rem)]">
          {LINES.map((l, i) => (
            <span key={l.text} data-mask style={{ ["--d" as string]: `${i * 0.12}s`, ["--ml" as string]: l.ml }} className="lg:ml-[var(--ml)]">
              <span className={l.accent ? "text-steel" : ""}>{l.text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
