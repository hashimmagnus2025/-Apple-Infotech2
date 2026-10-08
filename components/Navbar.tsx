"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { onIntroReady } from "@/animations/intro";
import { getLenis } from "@/animations/lenis";
import { prefersReducedMotion } from "@/animations/motion";
import { navLinks } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  /* Entrance + theme + hide-on-scroll ------------------------------------- */
  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;
      const reduced = prefersReducedMotion();

      if (!reduced) {
        gsap.set(".nav-item", { opacity: 0, y: -14 });
        onIntroReady(() => {
          gsap.to(el.querySelectorAll(".nav-item"), { opacity: 1, y: 0, duration: 1, stagger: 0.07, delay: 0.55, ease: "expo.out" });
        });
      }

      // theme follows the section under the bar
      const triggers: ScrollTrigger[] = [];
      gsap.utils.toArray<HTMLElement>("[data-nav]").forEach((sec) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: sec,
            start: "top 48px",
            end: "bottom 48px",
            onToggle: (self) => {
              if (self.isActive) el.dataset.theme = sec.dataset.nav === "light" ? "light" : "dark";
            },
          }),
        );
      });

      // hide on scroll down, reveal on scroll up
      let hidden = false;
      const hide = (v: boolean) => {
        if (v === hidden) return;
        hidden = v;
        gsap.to(el, { yPercent: v ? -110 : 0, duration: 0.7, ease: "expo.out", overwrite: "auto" });
      };
      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (self.scroll() < 160) return hide(false);
            if (self.direction === 1) hide(true);
            else if (self.direction === -1) hide(false);
          },
        }),
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: header },
  );

  /* Mobile menu ------------------------------------------------------------- */
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const lenis = getLenis();
    if (open) {
      const h = header.current;
      const prevTheme = h?.dataset.theme ?? "dark";
      if (h) h.dataset.theme = "dark";
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.fromTo(
        el,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.9, ease: "power4.inOut" },
      );
      gsap.fromTo(
        el.querySelectorAll(".m-item"),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.06, delay: 0.3, ease: "expo.out" },
      );
      const first = el.querySelector<HTMLElement>("a");
      const t = window.setTimeout(() => first?.focus(), 400);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "Tab") {
          const f = Array.from(el.querySelectorAll<HTMLElement>("a,button")).concat(toggle.current ? [toggle.current] : []);
          const idx = f.indexOf(document.activeElement as HTMLElement);
          if (e.shiftKey && idx <= 0) {
            e.preventDefault();
            f[f.length - 1].focus();
          } else if (!e.shiftKey && idx === f.length - 1) {
            e.preventDefault();
            f[0].focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(t);
        document.removeEventListener("keydown", onKey);
        lenis?.start();
        document.documentElement.style.overflow = "";
        if (h) h.dataset.theme = prevTheme;
      };
    }
  }, [open]);

  const closeThen = () => setOpen(false);

  return (
    <>
    <header ref={header} data-theme="dark" className="fixed inset-x-0 top-0 z-[120] will-change-transform">
      <div className="shell flex h-[var(--nav-h)] items-center justify-between">
        <a
          href="#top"
          aria-label="Apple Infotech — back to top"
          className="nav-item relative z-[130]"
          data-cursor="arrow"
          onClick={closeThen}
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-item u-link text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
              {l.label}
            </a>
          ))}
          <span className="nav-item">
            <Button href="#contact" variant="outline" className="!px-5 !py-3">
              Let&apos;s Talk
            </Button>
          </span>
        </nav>

        <button
          ref={toggle}
          type="button"
          className="nav-item relative z-[130] -mr-2 flex h-12 items-center gap-3 px-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
    </header>

      <div
        ref={menu}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className="fixed inset-0 z-[110] flex flex-col justify-end bg-ink px-[var(--gutter)] pb-12 pt-32 text-paper lg:hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        <ul className="flex flex-col">
          {navLinks.map((l, i) => (
            <li key={l.href} className="overflow-hidden border-t border-white/15">
              <a href={l.href} onClick={closeThen} className="m-item flex items-baseline justify-between py-4 text-[clamp(2.4rem,11vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em]">
                {l.label}
                <span className="mono text-xs tracking-widest text-ice">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="m-item mt-10">
          <Button href="#contact" variant="solid" onClick={closeThen}>
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </>
  );
}
