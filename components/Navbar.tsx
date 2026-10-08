"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/animations/lenis";
import { navLinks } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";
import Button from "@/components/ui/Button";

/**
 * Minimal editorial bar. No scroll handlers: an IntersectionObserver watches a
 * thin band under the bar and flips `data-theme` when a dark section passes.
 */
export default function Navbar() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const active = new Set<HTMLElement>();
    const apply = () => {
      const current = sections.filter((s) => active.has(s)).pop();
      el.dataset.theme = current?.dataset.nav === "dark" ? "dark" : "light";
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target as HTMLElement);
          else active.delete(e.target as HTMLElement);
        }
        apply();
      },
      { rootMargin: "0px 0px -92% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    const sentinel = document.getElementById("nav-sentinel");
    const so = sentinel
      ? new IntersectionObserver(([e]) => el.classList.toggle("is-scrolled", !e.isIntersecting), { threshold: 0 })
      : null;
    if (sentinel) so?.observe(sentinel);
    return () => {
      io.disconnect();
      so?.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = menu.current;
    if (!el || !open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const first = el.querySelector<HTMLElement>("a");
    const t = window.setTimeout(() => first?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const f = Array.from(el.querySelectorAll<HTMLElement>("a,button")).concat(toggle.current ? [toggle.current] : []);
      const idx = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && idx === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div id="nav-sentinel" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-24 w-px" />
      <header
        ref={header}
        data-theme="light"
        className="group/nav fixed inset-x-0 top-0 z-[120] text-ink transition-colors duration-300 data-[theme=dark]:text-paper [&.is-scrolled[data-theme=light]]:bg-paper/95 [&.is-scrolled[data-theme=dark]]:bg-ink/95"
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between border-b border-transparent transition-colors duration-300 group-[.is-scrolled]/nav:border-current/10">
          <a href="#top" aria-label="Apple Infotech — back to top" className="relative z-[130]" onClick={close}>
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="u-link label !text-[0.72rem]">
                {l.label}
              </a>
            ))}
            <span className="[--fill:currentColor]">
              <Button href="#contact" className="!px-5 !py-3">
                Let&apos;s Talk
              </Button>
            </span>
          </nav>

          <button
            ref={toggle}
            type="button"
            className="label relative z-[130] -mr-2 flex h-12 items-center gap-3 px-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-6">
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
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
        className="fixed inset-0 z-[110] flex flex-col justify-end bg-paper px-[var(--gutter)] pb-10 pt-28 text-ink lg:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((l, i) => (
            <li key={l.href} className="border-t rule">
              <a href={l.href} onClick={close} className="flex items-baseline justify-between py-4 text-[clamp(2.2rem,10.5vw,3.6rem)] font-semibold leading-none tracking-[-0.05em]">
                {l.label}
                <span className="label text-steel-ink">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="#contact" variant="solid" onClick={close}>
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </>
  );
}
