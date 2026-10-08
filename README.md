# Apple Infotech — Demo 02

Editorial · futuristic · interactive enterprise experience for **Apple Infotech — "We Ensure Better ROI"**.
Black / white / brand-blue (`#AEC4E2`, sampled from the supplied logo).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck && npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain before launch (canonical, sitemap, Open Graph, JSON-LD all read it).

## Stack
Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Lenis · SVG-first visuals (no WebGL — nothing here needed it).

## Brand geometry = visual DNA
The logo is a rounded 45° diamond **ring** of 8 segments (4 corner blocks, 4 edge segments) around an open void.
`lib/geometry.ts` defines it once; everything derives from it: hero object, loader, 45° lattice, concentric diamond frames,
section-edge "peak" transitions, stage / service / solution visuals, CTA structure.
`components/brand/Ring.tsx` renders the ring segment-by-segment so each part can be animated or exploded.

## Where to edit
| What | File |
|---|---|
| All copy, services, stages, projects, stats | `lib/content.ts` |
| Company facts, contact, social, SEO strings | `lib/site.ts` |
| JSON-LD (Organization, WebSite, WebPage, Service) | `lib/seo.tsx` |
| Real logo asset | `public/logo/` (reference JPG included) + `components/brand/Logo.tsx` |
| Real photography | pass `src` to `StoryImage` (`components/ui/StoryImage.tsx`) — next/image, AVIF/WebP, grayscale treatment applied automatically |

## Placeholders (never invented)
`[XX]` stats · `[PROJECT NAME]` / `[SECTOR]` · `[CLIENT IMAGERY]` · `[EMAIL ADDRESS]` / `[PHONE NUMBER]` / `[OFFICE ADDRESS]`.
Procedural monochrome art stands in for photography until real images are supplied.
The "Why Apple Infotech" principles are generic placeholders to be replaced with the company's real strengths.

## Motion system (`animations/`)
`gsap.ts` plugin registry · `text.ts` masked line reveals (SplitText) · `useEdge.ts` apex section transitions ·
`intro.ts` loader→hero hand-off · `lenis.ts` smooth scroll + anchors. Respects `prefers-reduced-motion`
(no loader, no Lenis, no pins; content shown statically). Custom cursor and magnetic buttons are fine-pointer desktop only.
Pinned/horizontal sections (Transformation, ROI) pin on desktop and restack on mobile.

## Future backend
UI is content-driven; add Node/Express/MongoDB (leads, CMS, case studies) behind `lib/content.ts` / a form route without touching components.
