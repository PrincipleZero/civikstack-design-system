/**
 * The catalog.
 *
 * Every entry describes something that actually exists on civikstack.org — the
 * counts come from measuring the live source, not from taste. `usage` is how many
 * times the pattern appears across app/(frontend); it is the evidence that a
 * pattern is load-bearing rather than a one-off.
 */

export type Category = "foundations" | "primitives" | "sections" | "templates";

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
};

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "foundations", name: "Foundations", blurb: "Type, colour, rhythm, motion — the decisions everything inherits." },
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
];

export const bySlug = (s: string) => ENTRIES.find((e) => e.slug === s);
export const inCategory = (c: Category) => ENTRIES.filter((e) => e.category === c);
export const groupsIn = (c: Category) => [...new Set(inCategory(c).map((e) => e.group))];
