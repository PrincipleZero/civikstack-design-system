import type { Payload } from "payload";
import { ENTRIES } from "./registry";
import { CURVES } from "./curves";
import { RECIPES, E } from "./recipes";

/**
 * First-boot seed, same contract as the Foundation site's: runs only when the
 * entries collection is empty, so it can never overwrite editor changes.
 * The TS files it reads are SEED DATA ONLY after this — editing them changes
 * nothing live. Edit at /admin.
 */
export async function seed(payload: Payload) {
  const existing = await payload.count({ collection: "entries" });
  if (existing.totalDocs > 0) return;

  payload.logger.info("Wayfinder: empty database — seeding catalogue from code");

  let i = 0;
  for (const e of ENTRIES) {
    await payload.create({ collection: "entries", data: { ...e, order: i++ } });
  }
  i = 0;
  for (const c of CURVES) {
    await payload.create({ collection: "curves", data: { ...c, order: i++ } });
  }
  i = 0;
  for (const [key, v] of Object.entries(E)) {
    await payload.create({ collection: "easing-tokens", data: {
      key, easing: String(v[0]), duration: Number(v[1]), provenance: String(v[2] ?? ""),
      frames: v[3] != null ? Number(v[3]) : undefined, order: i++,
    }});
  }
  i = 0;
  for (const r of RECIPES) {
    await payload.create({ collection: "recipes", data: { ...r, q: String(r.q), order: i++ } });
  }
  payload.logger.info(`Wayfinder: seeded ${ENTRIES.length} entries, ${CURVES.length} curves, ${Object.keys(E).length} tokens, ${RECIPES.length} recipes`);
}
