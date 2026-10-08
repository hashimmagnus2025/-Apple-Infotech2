import { navLinks } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

/** Minimal footer: lockup, navigation, contact, copyright. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact-details" data-nav="dark" className="on-dark relative border-t rule bg-ink text-paper">
      <div className="shell grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <a href="#top" aria-label="Apple Infotech — back to top" data-cursor="arrow">
            <Logo tagline />
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="label mb-5 text-ice">Navigate</p>
          <ul className="space-y-3" role="list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="u-link text-[0.95rem] text-white/80 hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3 md:col-start-10">
          <p className="label mb-5 text-ice">Contact</p>
          <ul className="space-y-3 text-[0.95rem] text-white/80" role="list">
            <li>{site.contact.email}</li>
            <li>{site.contact.phone}</li>
            <li>{site.contact.address}</li>
          </ul>
          {site.social.length > 0 && (
            <ul className="mt-6 flex gap-5" role="list">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="u-link label text-white/80" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </address>
      </div>

      <div className="shell flex flex-col gap-3 border-t rule py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="label">{site.tagline}</p>
      </div>
    </footer>
  );
}
