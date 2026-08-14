/**
 * The catalog.
 *
 * Every entry describes something that actually exists on civikstack.org — the
 * counts come from measuring the live source, not from taste. `usage` is how many
 * times the pattern appears across app/(frontend); it is the evidence that a
 * pattern is load-bearing rather than a one-off.
 */

export type Category = "foundations" | "elements" | "motion" | "primitives" | "sections" | "templates";

export type Entry = {
  slug: string;
  name: string;
  category: Category;
  group: string;
  blurb: string;
  /** Occurrences in the real site. 0 = a token/foundation rather than a pattern. */
  usage?: number;
  /** The exact class string to copy. */
  classes?: string;
  /** Real component file, read from the site at request time so it cannot drift. */
  sourceFile?: string;
  /** Rule or gotcha a builder must respect. */
  rule?: string;
  /**
   * "extracted" = measured from civikstack.org and already shipping.
   * "new"       = designed here in the house style; the site does not use it yet.
   * Keeping these apart is what stops the catalogue from quietly inventing history.
   */
  provenance?: "extracted" | "new" | "external";
};

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "foundations", name: "Foundations", blurb: "Type, colour, rhythm, motion — the decisions everything inherits." },
  { id: "elements", name: "Elements", blurb: "Buttons, chips, alerts, avatars, tables and dropdowns — the small parts." },
  { id: "motion", name: "Motion", blurb: "The animation vocabulary — durations, easings and gestures, measured from the real source." },
  { id: "primitives", name: "Primitives", blurb: "The reusable components that ship on the site today." },
  { id: "sections", name: "Sections", blurb: "Layout blocks that repeat across pages. The structural vocabulary." },
  { id: "templates", name: "Page templates", blurb: "How whole pages are assembled from sections." },
];

export const ENTRIES: Entry[] = [
  // ---------- FOUNDATIONS ----------
  {
    slug: "typography", name: "Type scale", category: "foundations", group: "Type",
    blurb: "Switzer for text, Azeret Mono for labels. Sizes are set in px, not Tailwind steps.",
    rule: "15px and 14px carry most body copy (74 and 72 uses). Mono is for eyebrows and metadata only — never body.",
  },
  {
    slug: "colour", name: "Colour", category: "foundations", group: "Colour",
    blurb: "Near-monochrome. Black ground by default; .light-page inverts to white.",
    rule: "body is #000. A light page must set `light-page bg-white text-black` on <main> — the nav reads the route to theme itself.",
  },
  {
    slug: "rhythm", name: "Vertical rhythm", category: "foundations", group: "Spacing",
    blurb: "Sections carry their gap on one side only, in four tiers.",
    rule: "Tier 1 py-24 md:py-40 · Tier 1b py-12 md:py-20 · Tier 2 py-12 md:py-16 · pre-footer pb-24 md:pb-32. Title-block padding is nav clearance and is NOT part of the scale. Mobile values are deliberately unchanged.",
  },
  {
    slug: "motion", name: "Motion", category: "foundations", group: "Motion",
    blurb: "One scroll-reveal primitive, one carousel. Do not fork either.",
    sourceFile: "components/Reveal.tsx",
    rule: "Reveal.tsx is the only scroll-reveal. CardCarousel is the only scroller — pass different `cards` rather than making a second one.",
  },

  // ---------- PRIMITIVES ----------
  {
    slug: "news-card", name: "NewsCard", category: "primitives", group: "Cards",
    blurb: "Research / white-paper card. Title over the image with a blur rising from the bottom.",
    sourceFile: "components/NewsCard.tsx",
    rule: "The bottom blur is masked so it fades out toward the top. Keep the scrim under the text or titles fail over pale photos.",
  },
  {
    slug: "project-card", name: "ProjectCard", category: "primitives", group: "Cards",
    blurb: "Development / case-study card.", sourceFile: "components/ProjectCard.tsx",
  },
  {
    slug: "image-card", name: "ImageCard", category: "primitives", group: "Cards",
    blurb: "Generic image + caption block.", sourceFile: "components/ImageCard.tsx",
  },
  {
    slug: "card-carousel", name: "CardCarousel", category: "primitives", group: "Composite",
    blurb: "The horizontal glass-card scroller.", sourceFile: "components/CardCarousel.tsx",
    rule: "The ambient warm/cool wash behind it is load-bearing — remove it and backdrop-blur has nothing to blur, collapsing the glass cards to a flat tint.",
  },
  {
    slug: "layer-diagram", name: "LayerDiagram", category: "primitives", group: "Composite",
    blurb: "The stacked-layer explanatory diagram.", sourceFile: "components/LayerDiagram.tsx",
  },
  {
    slug: "nav", name: "Nav", category: "primitives", group: "Chrome",
    blurb: "Sticky header. Themes itself light or dark from the route.",
    sourceFile: "components/Nav.tsx",
    rule: "Adding a page means updating Nav — light/dark is route-derived, not automatic.",
  },
  {
    slug: "footer", name: "Footer", category: "primitives", group: "Chrome",
    blurb: "Global footer, including the newsletter field.", sourceFile: "components/Footer.tsx",
  },
  {
    slug: "contact-form", name: "ContactForm", category: "primitives", group: "Forms",
    blurb: "The contact form. Posts to Payload and only reports success when stored.",
    sourceFile: "components/ContactForm.tsx",
    rule: "Never show success unconditionally. This form previously faked it and silently discarded every message.",
  },
  {
    slug: "newsletter-field", name: "NewsletterField", category: "primitives", group: "Forms",
    blurb: "Inline email capture used in the footer.", sourceFile: "components/NewsletterField.tsx",
  },
  {
    slug: "waitlist-gate", name: "WaitlistGate", category: "primitives", group: "Utility",
    blurb: "Blurs gated case-study content.", sourceFile: "components/WaitlistGate.tsx",
    rule: "Cosmetic only. The gated text stays in the DOM and is readable from page source — never use it for anything confidential.",
  },

  // ---------- SECTIONS ----------
  {
    slug: "two-col", name: "Label / content", category: "sections", group: "Structure",
    blurb: "The workhorse. A mono label on the left, content on the right. This is the site's core structural unit.",
    usage: 18,
    classes: "grid gap-10 px-6 py-12 md:grid-cols-[1fr_2fr] md:px-10 md:py-16",
    rule: "Collapses to a single column below md. The 1fr/2fr ratio is fixed — do not retune it per page.",
  },
  {
    slug: "page-title", name: "Page title block", category: "sections", group: "Structure",
    blurb: "Opening block of a page: eyebrow, H1, optional lede.",
    usage: 10, classes: "px-6 pb-12 pt-36 md:px-10",
    rule: "pt-36 is nav clearance, not rhythm. Do not fold it into the spacing scale.",
  },
  {
    slug: "full-width", name: "Full-width band", category: "sections", group: "Structure",
    blurb: "Tier 1b section spanning the full measure.", usage: 9,
    classes: "px-6 py-12 md:px-10 md:py-20",
  },
  {
    slug: "two-col-pre-footer", name: "Label / content — pre-footer", category: "sections", group: "Structure",
    blurb: "The two-column block in its last-section-on-the-page form.", usage: 5,
    classes: "grid gap-10 px-6 pb-20 md:grid-cols-[1fr_2fr] md:px-10 md:pb-24",
    rule: "Bottom padding only. The section above already carried the top gap.",
  },
  {
    slug: "secondary-title", name: "Secondary title block", category: "sections", group: "Structure",
    blurb: "Title block for a page that opens under an image or hero.", usage: 5,
    classes: "px-6 pb-12 pt-14 md:px-10",
  },
  {
    slug: "light-page", name: "Light page wrapper", category: "sections", group: "Theme",
    blurb: "Flips a page from the black default to white.", usage: 5,
    classes: "light-page bg-white px-6 pb-24 text-black md:px-10 md:pb-40",
    rule: "Goes on <main>. The nav reads the route to match — both must agree or the header goes invisible.",
  },
  {
    slug: "hero-full", name: "Full-bleed hero", category: "sections", group: "Hero",
    blurb: "Screen-height opening hero.", usage: 1,
    classes: "relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-black",
  },

  // ---------- TEMPLATES ----------
  {
    slug: "t-diligence", name: "Diligence page", category: "templates", group: "By audience",
    blurb: "Home, About, Governance, Status, Research. A funder verifying you in 90 seconds.",
    rule: "Plain and skimmable; proof and dates. Measured mean grade 6.2–13.1 — governance is legitimately the hardest because the legal language is a precision exception.",
  },
  {
    slug: "t-participant", name: "Participant page", category: "templates", group: "By audience",
    blurb: "Lab, Session One, Contact, the community path on Get Involved.",
    rule: "Second person and warm. 'You are paid for your time', never 'participants are paid'.",
  },
  {
    slug: "t-peer", name: "Peer page", category: "templates", group: "By audience",
    blurb: "Standards, Tools, Developments.",
    rule: "Precision first — defined terms stay intact. Pair each coined term with a plain gloss so an outsider can still follow.",
  },
  // ---------- MOTION ----------
  {
    slug: "m-easing", name: "The signature curve", category: "motion", group: "Tokens",
    blurb: "cubic-bezier(0.22, 1, 0.36, 1) — fast out, long settle. This is what makes the site feel calm rather than springy.",
    classes: "ease: [0.22, 1, 0.36, 1]",
    rule: "Use this for anything entering the page. Reserve ease-out (Tailwind's default curve) for hover states only.",
  },
  {
    slug: "m-reveal", name: "Reveal — fade up", category: "motion", group: "Entrance",
    blurb: "The one scroll primitive. Opacity 0→1 and y 24→0 over 0.7s, once, 80px before the element enters view.",
    usage: 1, sourceFile: "components/Reveal.tsx",
    rule: "Reveal.tsx is the only scroll-reveal on the site — do not fork it. It honours prefers-reduced-motion by skipping the initial offset entirely.",
  },
  {
    slug: "m-hover-lift", name: "Hover lift", category: "motion", group: "Interaction",
    blurb: "scale(1.04) on hover. The site's single interactive gesture.",
    usage: 24, classes: "transition-transform hover:scale-[1.04]",
    rule: "1.04 everywhere. One card uses 1.03 — that is drift, not a variant.",
  },
  {
    slug: "m-image-zoom", name: "Image zoom", category: "motion", group: "Interaction",
    blurb: "The image scales inside a fixed frame on card hover. Slow — 700ms — so it reads as depth, not as a jump.",
    usage: 6, classes: "overflow-hidden · group-hover:scale-[1.04] transition-transform duration-700 ease-out",
    rule: "The frame must carry overflow-hidden or the image escapes its corners.",
  },
  {
    slug: "m-color-shift", name: "Colour shift", category: "motion", group: "Interaction",
    blurb: "Pills and links invert on hover rather than dimming.",
    usage: 34, classes: "transition-colors hover:bg-black hover:text-white",
  },
  {
    slug: "m-chevron", name: "Chevron rotate", category: "motion", group: "Interaction",
    blurb: "Dropdown indicator turns 180° in 200ms.",
    usage: 1, classes: "transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180",
    rule: "Pair every hover trigger with focus-within, or the menu is unreachable by keyboard.",
  },
  {
    slug: "m-menu-overlay", name: "Menu overlay", category: "motion", group: "Entrance",
    blurb: "Mobile menu: backdrop fades over 0.35s, then items rise from y 30.",
    sourceFile: "components/Nav.tsx",
    rule: "Wrapped in AnimatePresence so the exit animation actually runs — without it the menu vanishes instantly on close.",
  },
  {
    slug: "m-stagger", name: "Stagger", category: "motion", group: "Entrance",
    blurb: "0.06s between siblings — enough to read as a sequence, short enough not to feel like lag.",
    rule: "Cap it. Past about six items the last one arrives late enough to feel broken.",
  },

  // ---------- ELEMENTS ----------
  {
    slug: "e-buttons", name: "Buttons", category: "elements", group: "Actions",
    blurb: "One pill shape, four fills. Primary black, secondary tinted, and two on-dark variants.",
    usage: 34, provenance: "extracted",
    classes: "rounded-full bg-black px-5 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.04]",
    rule: "Always the full pill — no square buttons anywhere on the site. Secondary is bg-black/5, never a border.",
  },
  {
    slug: "e-status", name: "Status chips", category: "elements", group: "Feedback",
    blurb: "In development · Private beta · In production. Set in lib/cms.ts, not editable in the CMS.",
    usage: 6, provenance: "extracted",
    rule: "toolStatus() is hardcoded. IN_PRODUCTION is currently empty — everything reads as in-development until that changes in code.",
  },
  {
    slug: "e-dropdown", name: "Dropdown", category: "elements", group: "Navigation",
    blurb: "The nav submenu: invisible + opacity-0 until hover or focus, 200ms.",
    provenance: "extracted", sourceFile: "components/Nav.tsx",
    classes: "invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
    rule: "group-focus-within is not optional — without it the menu cannot be opened by keyboard. The pt-3 keeps a hover bridge so the panel does not close as the pointer travels to it.",
  },
  {
    slug: "e-fields", name: "Form fields", category: "elements", group: "Forms",
    blurb: "Inputs, selects and textareas. Tinted fill, hairline ring, ring darkens on focus.",
    provenance: "extracted", sourceFile: "components/ContactForm.tsx",
    classes: "rounded-lg bg-black/[0.04] px-4 py-3.5 text-[14px] text-black placeholder-black/40 ring-1 ring-black/10 outline-none transition focus:ring-black/40",
    rule: "Use 16px on phone-facing forms — anything smaller makes iOS zoom on focus.",
  },
  {
    slug: "e-alerts", name: "Alerts", category: "elements", group: "Feedback",
    blurb: "Notice, warning, error and success. Tinted fill with a matching ring — no icons, no borders.",
    provenance: "new",
    rule: "Not on the site yet. Error styling matches the pattern already used for the contact-form failure state, so adopting it introduces nothing new visually.",
  },
  {
    slug: "e-avatars", name: "Avatars", category: "elements", group: "People",
    blurb: "Circular, with initials as the fallback. Three sizes and a stacked group.",
    provenance: "new",
    rule: "Not on the site yet — there are no people photographs anywhere in it today. Initials must be the default, since the Lab and governance pages will name people long before there are portraits.",
  },
  {
    slug: "e-table", name: "Table", category: "elements", group: "Data",
    blurb: "Mono uppercase column labels, hairline row rules, numerals right-aligned and tabular.",
    provenance: "new",
    rule: "Not on the site yet, but the Labs tool already needs it. Numbers use tabular-nums so columns do not jitter as counts change.",
  },
  {
    slug: "e-labels", name: "Labels & badges", category: "elements", group: "Data",
    blurb: "The mono eyebrow, the count badge, and the inline tag.",
    usage: 10, provenance: "extracted",
    classes: "font-mono text-[11px] uppercase tracking-[0.14em] text-black/45",
    rule: "Mono is for labels and metadata only. The moment it carries a sentence, it stops being a label.",
  },

  {
    slug: "m-loop-tile", name: "Tile travel & pop", category: "motion", group: "Loops — measured from motion.dev",
    blurb: "Hold, travel with a 15° rotate, then a scale pop to 1.75 at 54% before returning. The holds are what make it read as a beat, not a drift.",
    provenance: "external",
    classes: "animation: ds-diag-tile 3.6s cubic-bezier(0.6,0,0.2,1) infinite",
    rule: "Measured from motion.dev's hero diagram, not from civikstack.org — external vocabulary until the site adopts it. Keep the 0–12% and 34–44% holds; without them the loop feels like wandering.",
  },
  {
    slug: "m-loop-row", name: "Row cycle", category: "motion", group: "Loops — measured from motion.dev",
    blurb: "Rows slide −12% and fade out, stay gone through 55–70%, then return. Staggered 450ms apart.",
    provenance: "external",
    classes: "animation: ds-diag-row 3s cubic-bezier(0.4,0,0.2,1) var(--d) infinite  /* --d: 0 / 450ms / 900ms */",
    rule: "The 55–70% hold is the craft: a row that returns the instant it leaves reads as flicker. External vocabulary — measured, not yet used on the site.",
  },
  {
    slug: "m-loop-bar", name: "Bar fill", category: "motion", group: "Loops — measured from motion.dev",
    blurb: "scaleX fills 0→1 by 45%, holds, drains by 90%. Staggered 120ms — tight enough to read as one system working.",
    provenance: "external",
    classes: "animation: ds-diag-bar 2.4s cubic-bezier(0.4,0,0.4,1) var(--d) infinite  /* --d: 0/120/240/360ms */",
    rule: "origin-left is required — without transform-origin the bar grows from its centre and the fill metaphor dies. External vocabulary — measured, not yet used on the site.",
  },
];

export const bySlug = (s: string) => ENTRIES.find((e) => e.slug === s);
export const inCategory = (c: Category) => ENTRIES.filter((e) => e.category === c);
export const groupsIn = (c: Category) => [...new Set(inCategory(c).map((e) => e.group))];
