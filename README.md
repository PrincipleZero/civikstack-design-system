# Wayfinder

## Backend — Payload CMS

The catalogue's SPECS (entries, curves, easing tokens, recipes) live in Payload
(SQLite) and are editable at **/admin**. Preview DEMOS stay code: an entry's
`slug` keys into the component map in `components/previews.tsx` — renaming a
slug in the CMS detaches its demo.

- First visit to /admin asks you to create the first user.
- Database: `/data/wayfinder.db` on the `ds_db` volume — content survives
  container rebuilds. `DATABASE_URI` + `PAYLOAD_SECRET` are set in compose.
- **Seed trap (same as the Foundation site):** `lib/registry.ts`,
  `lib/curves.ts`, `lib/recipes.ts` are SEED DATA ONLY — they populate an empty
  database on first boot and are never read again. Editing them changes nothing
  live; edit at /admin. To re-seed from code: stop the container, remove the
  `ds_db` volume, start.
- **Migration gotcha (ecosystem-wide):** Payload auto-creates SQLite tables in
  dev only, and `payload migrate:create` crashes under Next 16. Schema changes
  in any deployed copy need the dev-created db re-streamed, or manual DDL.
- **Dependency trap:** `node_modules` is a named volume. After adding a
  package: `docker compose down`, remove the `*_ds_node_modules` volume,
  rebuild, up.
