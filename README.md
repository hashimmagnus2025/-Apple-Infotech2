# Apple Infotech — Demo 02

Editorial · Swiss · architectural enterprise experience for **Apple Infotech — "We Ensure Better ROI"**.
Mostly white, black for ROI + CTA, ice blue (`#B9C6D8`) and blue-gray (`#71839A`) as accents. One font family (Inter, variable).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck && npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain before launch (canonical, sitemap, Open Graph, JSON-LD all read it).

## Stack
Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Lenis + GSAP (desktop mouse devices only, dynamically imported) · CSS transitions for everything else. No WebGL, canvas, particles or Three.js.

## Motion & performance model
- **Entrances** are CSS transitions (transform/opacity) toggled once by a single `IntersectionObserver` (`components/RevealObserver.tsx`). No per-frame JavaScript, nothing re-runs.
- **Smooth scroll**: exactly one Lenis instance, driven by GSAP's ticker (one rAF loop), created only on mouse/trackpad desktops without `prefers-reduced-motion`. Touch devices use native scrolling and never download GSAP/Lenis.
- **GSAP/ScrollTrigger** is used for just three tiny `translate3d` parallax layers (±16–22 px) and nothing else; each is killed on unmount.
- Counters tween once into the DOM (no React state). Projects rail writes progress straight to the DOM.
- Images are baked monochrome JPGs served through `next/image` (AVIF/WebP, lazy, explicit width/height). No runtime CSS filters, blend modes or backdrop blur.
- Measured wheel-scroll through the whole page (headless Chromium): >33 ms frames 11.7% → 0.7%, long tasks 9 → 0, forced layouts 3,294 → ~100, script time −85%.

## Brand geometry = visual DNA
The logo is a rounded 45° diamond **ring** of 8 segments (4 corner blocks, 4 edge segments) around an open void.
`lib/geometry.ts` defines it once; everything derives from it: hero object, loader, 45° lattice, concentric diamond frames,
section-edge "peak" transitions, stage / service / solution visuals, CTA structure.
`components/brand/Ring.tsx` renders the ring segment-by-segment. In this layout the geometry is used sparingly: the 45° chamfered image masks, one outline frame in the hero, the hero image corner mark, and one static outline in the CTA.

## Where to edit
| What | File |
|---|---|
| All copy, services, stages, projects, stats | `lib/content.ts` |
| Company facts, contact, social, SEO strings | `lib/site.ts` |
| JSON-LD (Organization, WebSite, WebPage, Service) | `lib/seo.tsx` |
| Real logo asset | `public/logo/` (reference JPG included) + `components/brand/Logo.tsx` |
| Real photography | replace files in `public/images/` (same ratios: 4:5 portraits, one 2000×1250 wide) or point `src` at new files; keep the grayscale/high-contrast treatment baked in |

## Placeholders (never invented)
`[XX]` stats · `[PROJECT NAME]` / `[SECTOR]` · `[CLIENT IMAGERY]` · `[EMAIL ADDRESS]` / `[PHONE NUMBER]` / `[OFFICE ADDRESS]`.
Procedural monochrome art stands in for photography until real images are supplied.
The "Why Apple Infotech" principles are generic placeholders to be replaced with the company's real strengths.

## Future backend
UI is content-driven; add Node/Express/MongoDB (leads, CMS, case studies) behind `lib/content.ts` / a form route without touching components.
