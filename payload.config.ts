import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seed } from "@/lib/seed";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Wayfinder's backend. Same shape as the Foundation site's config on purpose —
 * that is the proven Payload-in-Next-16 wiring in this ecosystem.
 *
 * Catalogue SPECS live here (entries, curves, easing tokens, recipes) and are
 * editable at /admin. Preview DEMOS stay code: an entry's `slug` keys into the
 * component map in components/previews.tsx.
 */
export default buildConfig({
  admin: { user: "users" },
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [{ name: "name", type: "text" }],
    },
    {
      slug: "entries",
      access: { read: () => true },
      admin: { useAsTitle: "name", defaultColumns: ["name", "category", "group", "provenance"] },
      fields: [
        { name: "slug", type: "text", required: true, unique: true,
          admin: { description: "Also keys the code-side preview demo — renaming detaches it" } },
        { name: "name", type: "text", required: true },
        { name: "category", type: "select", required: true,
          options: ["foundations", "elements", "motion", "primitives", "sections", "templates"] },
        { name: "group", type: "text", required: true },
        { name: "blurb", type: "textarea", required: true },
        { name: "usage", type: "number",
          admin: { description: "Occurrences measured on civikstack.org — evidence, not taste" } },
        { name: "classes", type: "textarea",
          admin: { description: "The exact class string to copy" } },
        { name: "sourceFile", type: "text",
          admin: { description: "Component path read live from the mounted site" } },
        { name: "rule", type: "textarea" },
        { name: "provenance", type: "select", options: ["extracted", "new", "external"] },
        { name: "order", type: "number" },
      ],
    },
    {
      slug: "curves",
      access: { read: () => true },
      admin: { useAsTitle: "n", defaultColumns: ["n", "g", "cf", "d"] },
      fields: [
        { name: "g", type: "text", required: true, admin: { description: "Provenance group / gallery section" } },
        { name: "n", type: "text", required: true, admin: { description: "Curve name" } },
        { name: "e", type: "text", required: true, admin: { description: "CSS easing" } },
        { name: "d", type: "number", required: true, admin: { description: "Duration ms" } },
        { name: "pv", type: "text", admin: { description: "Fit error / rationale" } },
        { name: "cf", type: "select", required: true,
          options: ["measured", "tolerance", "refused", "composite", "designed"] },
        { name: "cl", type: "select", options: ["ali", "gk", "des"] },
        { name: "demo", type: "text" },
        { name: "ideal", type: "text", admin: { description: "The one component it best drives" } },
        { name: "why", type: "textarea", admin: { description: "May contain inline HTML" } },
        { name: "des", type: "textarea", admin: { description: "Designed tier: derived vs invented" } },
        { name: "dir", type: "text" },
        { name: "order", type: "number" },
      ],
    },
    {
      slug: "easing-tokens",
      access: { read: () => true },
      admin: { useAsTitle: "key", defaultColumns: ["key", "easing", "duration"] },
      fields: [
        { name: "key", type: "text", required: true, unique: true },
        { name: "easing", type: "text", required: true },
        { name: "duration", type: "number", required: true },
        { name: "provenance", type: "text" },
        { name: "frames", type: "number" },
        { name: "order", type: "number" },
      ],
    },
    {
      slug: "recipes",
      access: { read: () => true },
      admin: { useAsTitle: "name", defaultColumns: ["name", "grp", "q"] },
      fields: [
        { name: "grp", type: "text", required: true },
        { name: "name", type: "text", required: true },
        { name: "q", type: "text", required: true,
          admin: { description: "Stagger quantum: a number in ms, or a descriptive phrase" } },
        { name: "why", type: "textarea" },
        { name: "steps", type: "array", fields: [
          { name: "l", type: "text", required: true },
          { name: "c", type: "text", required: true, admin: { description: "Easing token key" } },
          { name: "o", type: "number", required: true, admin: { description: "Onset ms" } },
          { name: "r", type: "text", required: true, admin: { description: "structure | content | accent | marked | exit" } },
          { name: "n", type: "textarea" },
        ]},
        { name: "order", type: "number" },
      ],
    },
  ],
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./wayfinder.db" } }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  onInit: seed,
});
