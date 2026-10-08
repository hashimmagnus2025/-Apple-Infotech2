/**
 * All editable marketing copy lives here — swap text, never touch the UI.
 * Items marked [PLACEHOLDER] / [XX] are awaiting real client information.
 */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#solutions" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "We Ensure Better ROI",
  lines: ["We build", "technology", "that moves", "business."],
  copy: "Apple Infotech designs, engineers and runs the technology businesses depend on — and measures every decision by the return it delivers.",
  cta: { label: "Explore Technology Solutions", href: "#capabilities" },
};

export const statement = {
  eyebrow: "01 — Perspective",
  /** Rendered line by line; words in `accent` get the blue editorial treatment. */
  lines: ["Technology is not", "the destination.", "Impact is."],
  accentLine: 2,
  body: "Software, infrastructure and automation only matter when they change a number the business cares about. We start there — and work backwards to the technology.",
};

export type Service = {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  points: string[];
};

export const services = {
  eyebrow: "02 — Capabilities",
  heading: "What we do",
  items: [
    {
      id: "digital-solutions",
      index: "01",
      title: "Digital Solutions",
      short: "Connected digital architecture",
      description:
        "Web platforms, applications and digital products designed as one connected system — not a pile of disconnected tools.",
      points: ["Web & mobile platforms", "Product engineering", "Integrations & APIs"],
    },
    {
      id: "technology-services",
      index: "02",
      title: "Technology Services",
      short: "A precise technical foundation",
      description:
        "Dependable engineering and managed technology services that keep every layer of your stack measured, maintained and secure.",
      points: ["Managed IT services", "Cloud & infrastructure", "Support & maintenance"],
    },
    {
      id: "business-automation",
      index: "03",
      title: "Business Automation",
      short: "Work that flows on its own",
      description:
        "We map how work really moves through your business, then remove the manual steps that slow it down and hide cost.",
      points: ["Workflow automation", "Process digitisation", "Reporting & dashboards"],
    },
    {
      id: "enterprise-solutions",
      index: "04",
      title: "Enterprise Solutions",
      short: "Infrastructure that scales with you",
      description:
        "Large-scale systems built to connect departments, data and partners — with governance and reliability designed in.",
      points: ["Enterprise applications", "Systems integration", "Security & governance"],
    },
    {
      id: "it-consulting",
      index: "05",
      title: "IT Consulting",
      short: "Strategy with a clear direction",
      description:
        "Independent, outcome-led guidance on what to build, what to buy and what to retire — before the budget is committed.",
      points: ["Technology roadmaps", "Architecture review", "Vendor & cost strategy"],
    },
  ] satisfies Service[],
};

export const transformation = {
  eyebrow: "03 — The Transformation",
  heading: "From first idea to measurable return.",
  stages: [
    { key: "Idea", label: "Stage 01", copy: "Every engagement begins with a business question, not a feature list." },
    { key: "Technology", label: "Stage 02", copy: "The right tools are chosen for fit and longevity — never for fashion." },
    { key: "Solution", label: "Stage 03", copy: "Technology becomes a working system, shaped around the way you operate." },
    { key: "Impact", label: "Stage 04", copy: "Adoption, efficiency and clarity begin to show up in daily operations." },
    { key: "ROI", label: "Stage 05", copy: "The return is tracked, reported and owned — it is the point of the work." },
  ],
};

export const roi = {
  eyebrow: "04 — Our Promise",
  heading: "We Ensure Better ROI",
  stages: [
    { word: "Technology", metric: "[XX]", note: "The right foundation, chosen for the business." },
    { word: "Efficiency", metric: "[XX]%", note: "Manual effort replaced by reliable systems." },
    { word: "Productivity", metric: "[XX]%", note: "Teams spend their time on work that moves things." },
    { word: "Growth", metric: "[XX]×", note: "Capacity to scale without scaling cost." },
    { word: "ROI", metric: "[XX]%", note: "Measured. Reported. Owned." },
  ],
  footnote: "Figures shown as [XX] are placeholders until verified client data is supplied.",
};

export type Stat = {
  /** `null` = awaiting real data; the counter animates a placeholder instead. */
  value: number | null;
  suffix: string;
  label: string;
};

export const stats = {
  eyebrow: "05 — Impact",
  heading: "The numbers that matter.",
  note: "Placeholder values — to be replaced with verified Apple Infotech data.",
  items: [
    { value: null, suffix: "+", label: "Projects" },
    { value: null, suffix: "+", label: "Clients" },
    { value: null, suffix: "+", label: "Years" },
    { value: null, suffix: "%", label: "Satisfaction" },
  ] satisfies Stat[],
};

export type Solution = {
  id: string;
  index: string;
  title: string;
  lead: string;
  points: string[];
  tone: string;
};

export const solutions = {
  eyebrow: "06 — Solutions",
  heading: "Built for the way you operate.",
  items: [
    {
      id: "technology",
      index: "01",
      title: "Technology",
      lead: "Product, platform and engineering capability for companies whose business is technology.",
      points: ["Platforms", "Engineering teams", "Cloud-native delivery"],
      tone: "#06090D",
    },
    {
      id: "enterprise",
      index: "02",
      title: "Enterprise",
      lead: "Joined-up systems for large organisations — where scale, security and governance are not optional.",
      points: ["Core systems", "Integration", "Governance"],
      tone: "#0A111A",
    },
    {
      id: "business",
      index: "03",
      title: "Business",
      lead: "Practical, right-sized technology for growing businesses that need results faster than a big programme allows.",
      points: ["Operations", "Automation", "Analytics"],
      tone: "#0E1824",
    },
    {
      id: "infrastructure",
      index: "04",
      title: "Infrastructure",
      lead: "Resilient networks, cloud and security — the layer everything else quietly depends on.",
      points: ["Cloud", "Networks", "Security"],
      tone: "#14212F",
    },
    {
      id: "transformation",
      index: "05",
      title: "Digital Transformation",
      lead: "A clear path from legacy processes to modern, connected, measurable ways of working.",
      points: ["Roadmaps", "Change", "Adoption"],
      tone: "#1B2C41",
    },
  ] satisfies Solution[],
};

export const imageStory = {
  eyebrow: "07 — Craft",
  word: "BUILD",
  heading: "Technology that is engineered, not assembled.",
  body: "Precision lives in the details nobody sees — architecture, structure, the quiet decisions that decide whether a system lasts. We build for the long term.",
  captions: [
    "[CLIENT IMAGERY] — replace with Apple Infotech photography",
    "[CLIENT IMAGERY]",
  ],
};

export const why = {
  eyebrow: "08 — Why us",
  lines: ["Why", "Apple", "Infotech?"],
  intro: "Four principles shape every engagement. [PLACEHOLDER — replace with Apple Infotech's real strengths.]",
  items: [
    { index: "01", title: "Understand", copy: "We learn the business first — its goals, its constraints and the numbers it is judged on." },
    { index: "02", title: "Build", copy: "Careful engineering, delivered in clear steps you can see, test and steer." },
    { index: "03", title: "Optimize", copy: "Systems are tuned continuously, so value keeps growing after launch." },
    { index: "04", title: "Deliver", copy: "Reliable outcomes, honest reporting and a return you can point to." },
  ],
};

export type Project = {
  id: string;
  index: string;
  name: string;
  sector: string;
  technology: string;
  solution: string;
  impact: string;
  art: "facade" | "grid" | "aisle" | "horizon";
};

export const projects = {
  eyebrow: "09 — Selected work",
  heading: "Work that speaks in outcomes.",
  note: "Replaceable placeholders — real case studies to be supplied by Apple Infotech.",
  items: [
    { id: "p1", index: "01", name: "[PROJECT NAME]", sector: "[SECTOR]", technology: "[Technology]", solution: "[Solution]", impact: "[Impact]", art: "facade" },
    { id: "p2", index: "02", name: "[PROJECT NAME]", sector: "[SECTOR]", technology: "[Technology]", solution: "[Solution]", impact: "[Impact]", art: "grid" },
    { id: "p3", index: "03", name: "[PROJECT NAME]", sector: "[SECTOR]", technology: "[Technology]", solution: "[Solution]", impact: "[Impact]", art: "aisle" },
    { id: "p4", index: "04", name: "[PROJECT NAME]", sector: "[SECTOR]", technology: "[Technology]", solution: "[Solution]", impact: "[Impact]", art: "horizon" },
  ] satisfies Project[],
};

export const finalStatement = {
  srHeading: "Better technology. Better outcomes. Better ROI.",
};

export const cta = {
  lines: ["Ready to build", "what's next?"],
  copy: "Let's create technology that delivers measurable impact.",
  button: { label: "Start a conversation", href: "#contact" },
};
