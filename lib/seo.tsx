import { site } from "./site";
import { services } from "./content";

/**
 * JSON-LD graph. Only facts that are real today are emitted — no address,
 * phone, ratings, founding date or employee counts until the client supplies them.
 */
export function buildJsonLd() {
  const orgId = `${site.url}/#organization`;
  const siteId = `${site.url}/#website`;
  const sameAs = site.social.map((s) => s.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        slogan: site.tagline,
        description: site.description,
        logo: { "@type": "ImageObject", url: `${site.url}/logo/apple-infotech-mark.svg` },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: site.title,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        description: site.description,
        inLanguage: "en",
      },
      ...services.items.map((s) => ({
        "@type": "Service",
        "@id": `${site.url}/#service-${s.id}`,
        name: s.title,
        serviceType: s.title,
        description: s.description,
        provider: { "@id": orgId },
      })),
    ],
  };
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c") }}
    />
  );
}
