import { imageStory } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

const CHAMFER = "[clip-path:polygon(0_0,100%_0,100%_100%,min(9vw,120px)_100%,0_calc(100%-min(9vw,120px)))]";

/** 07 — Craft. One oversized image, one overlapping frame, one huge word behind. */
export default function ImageStory() {
  return (
    <section id="craft" data-nav="light" aria-labelledby="craft-title" className="relative overflow-hidden border-t rule bg-mist">
      <div className="shell relative py-[clamp(5rem,11vw,11rem)]">
        <p
          aria-hidden="true"
          className="display pointer-events-none absolute left-[var(--gutter)] top-[clamp(2rem,5vw,5rem)] select-none text-[clamp(7rem,30vw,34rem)] leading-[0.8] text-ice/55"
        >
          {imageStory.word}
        </p>

        <div className="grid-12 relative gap-y-10">
          <div className="col-span-12 lg:col-span-4 lg:self-start lg:pt-[2vw]">
            <Eyebrow className="mb-6 text-steel-ink">{imageStory.eyebrow}</Eyebrow>
            <h2 id="craft-title" className="headline text-[clamp(2rem,3.9vw,4.6rem)]">
              <span data-mask>
                <span>{imageStory.heading}</span>
              </span>
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-base leading-relaxed text-steel-ink md:text-lg">
              {imageStory.body}
            </p>
          </div>

          <div className="relative col-span-12 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-[10vw]">
            <ParallaxLayer amount={22}>
              <div className={`relative ${CHAMFER}`}>
                <Photo
                  src="/images/facade2.jpg"
                  alt="[CLIENT IMAGERY] Monochrome architectural detail — placeholder for Apple Infotech photography"
                  width={1200}
                  height={1500}
                  sizes="(min-width:1024px) 62vw, 100vw"
                  className="aspect-[16/10] w-full"
                />
              </div>
            </ParallaxLayer>
            <p className="label mt-3 text-right text-steel-ink">{imageStory.captions[0]}</p>

            <div className="absolute -bottom-10 left-4 hidden w-[26%] lg:block lg:-left-[18%] lg:-bottom-[14%]">
              <div className="absolute -inset-3 translate-x-3 translate-y-3 border border-ice" aria-hidden="true" />
              <Photo
                src="/images/aisle.jpg"
                alt="[CLIENT IMAGERY] Monochrome infrastructure corridor — placeholder"
                width={1200}
                height={1500}
                sizes="16vw"
                className="relative aspect-[4/5] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
