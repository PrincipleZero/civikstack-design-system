import fs from "node:fs/promises";
import path from "node:path";

/**
 * Where the real site lives. In Docker it is bind-mounted read-only at /site;
 * on the host it sits next to this project.
 */
export const SITE_ROOT =
  process.env.SITE_ROOT || path.resolve(process.cwd(), "../Civkstack Foundation Website");

/**
 * Read a component's source straight from the site at request time.
 * The catalog therefore shows what actually ships — it cannot drift into a stale copy.
 */
export async function readSource(rel: string): Promise<{ code: string; error?: string }> {
  try {
    const full = path.join(SITE_ROOT, rel);
    if (!path.resolve(full).startsWith(path.resolve(SITE_ROOT))) {
      return { code: "", error: "Refused: path escapes the site root." };
    }
    return { code: await fs.readFile(full, "utf8") };
  } catch {
    return {
      code: "",
      error: `Could not read ${rel}. The site must be mounted at SITE_ROOT (${SITE_ROOT}).`,
    };
  }
}
