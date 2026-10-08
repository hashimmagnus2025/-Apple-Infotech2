/**
 * Single source of truth for company-level facts.
 * Only real information may live here — anything unknown stays a [PLACEHOLDER]
 * until the client supplies it.
 */
export const PLACEHOLDER = {
  email: "[EMAIL ADDRESS]",
  phone: "[PHONE NUMBER]",
  address: "[OFFICE ADDRESS]",
} as const;

export const site = {
  name: "Apple Infotech",
  tagline: "We Ensure Better ROI",
  title: "Apple Infotech — Technology Solutions That Ensure Better ROI",
  description:
    "Apple Infotech delivers digital solutions, technology services, business automation, enterprise solutions and IT consulting — engineered to ensure better ROI.",
  // Replace with the production domain via NEXT_PUBLIC_SITE_URL once it is confirmed.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://apple-infotech-demo.example").replace(/\/$/, ""),
  locale: "en_US",
  keywords: [
    "Apple Infotech",
    "technology solutions",
    "IT solutions",
    "IT services",
    "business technology",
    "digital solutions",
    "enterprise technology",
    "business automation",
    "IT consulting",
  ],
  themeColor: "#050505",
  contact: {
    email: PLACEHOLDER.email,
    phone: PLACEHOLDER.phone,
    address: PLACEHOLDER.address,
  },
  /** Add real profile URLs here; with none supplied nothing is rendered or emitted in JSON-LD. */
  social: [] as { label: string; href: string }[],
};

export const hasRealEmail = !site.contact.email.startsWith("[");
