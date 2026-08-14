/** Structural constants — the 6 shelves. Content lives in Payload; shelves stay code. */
export type Category = "foundations" | "elements" | "motion" | "primitives" | "sections" | "templates";

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "foundations", name: "Foundations", blurb: "Type, colour, rhythm, motion — the decisions everything inherits." },
  { id: "elements", name: "Elements", blurb: "Buttons, chips, alerts, avatars, tables and dropdowns — the small parts." },
  { id: "motion", name: "Motion", blurb: "The animation vocabulary — durations, easings and gestures, measured from the real source." },
  { id: "primitives", name: "Primitives", blurb: "The reusable components that ship on the site today." },
  { id: "sections", name: "Sections", blurb: "Layout blocks that repeat across pages. The structural vocabulary." },
  { id: "templates", name: "Page templates", blurb: "How whole pages are assembled from sections." },
];
