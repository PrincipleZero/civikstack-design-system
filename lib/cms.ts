import { getPayload } from "payload";
import config from "@payload-config";
import type { Entry } from "./registry";
import type { Curve } from "./curves";
import type { Recipe } from "./recipes";
import type { Category } from "./categories";

/**
 * The only data path the frontend uses. Payload local API (no HTTP), documents
 * mapped back onto the exact types the components already consume — so the
 * component layer did not have to change when the backend did.
 */
async function db() {
  return getPayload({ config });
}

const strip = <T extends object>(d: Record<string, unknown>): T => d as unknown as T;

export async function getEntries(category?: Category): Promise<Entry[]> {
  const p = await db();
  const res = await p.find({ collection: "entries", limit: 300, sort: "order", depth: 0,
    ...(category ? { where: { category: { equals: category } } } : {}) });
  return res.docs.map((d) => strip<Entry>(d));
}

export async function getEntry(slug: string): Promise<Entry | null> {
  const p = await db();
  const res = await p.find({ collection: "entries", limit: 1, depth: 0,
    where: { slug: { equals: slug } } });
  return res.docs[0] ? strip<Entry>(res.docs[0]) : null;
}

export async function getCurves(): Promise<Curve[]> {
  const p = await db();
  const res = await p.find({ collection: "curves", limit: 300, sort: "order", depth: 0 });
  return res.docs.map((d) => strip<Curve>(d));
}

export async function getTokens(): Promise<Record<string, [string, number, string, number?]>> {
  const p = await db();
  const res = await p.find({ collection: "easing-tokens", limit: 300, sort: "order", depth: 0 });
  const out: Record<string, [string, number, string, number?]> = {};
  for (const d of res.docs as Array<{ key: string; easing: string; duration: number; provenance?: string; frames?: number }>) {
    out[d.key] = [d.easing, d.duration, d.provenance ?? "", d.frames ?? undefined];
  }
  return out;
}

export async function getRecipes(): Promise<Recipe[]> {
  const p = await db();
  const res = await p.find({ collection: "recipes", limit: 300, sort: "order", depth: 0 });
  return res.docs.map((d) => {
    const r = d as unknown as Recipe & { q: string };
    const qNum = Number(r.q);
    return { ...r, q: Number.isFinite(qNum) && r.q !== "" ? qNum : r.q,
      steps: (r.steps ?? []).map((s) => ({ l: s.l, c: s.c, o: s.o, r: s.r, n: s.n })) };
  });
}
