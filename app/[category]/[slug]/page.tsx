import Link from "next/link";
import { notFound } from "next/navigation";
import { ENTRIES, bySlug } from "@/lib/registry";
import { readSource, SITE_ROOT } from "@/lib/source";
import { PageTitle, Eyebrow, UsageBadge, RuleNote } from "@/components/ui";
import Copyable from "@/components/Copyable";
import ViewToggle from "@/components/ViewToggle";
import { Frame, previewFor } from "@/components/previews";

export const dynamic = "force-dynamic"; // source is read from disk on each request

export function generateStaticParams() {
  return ENTRIES.map((e) => ({ category: e.category, slug: e.slug }));
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const e = bySlug(slug);
  if (!e) notFound();

  const src = e.sourceFile ? await readSource(e.sourceFile) : null;

  return (
    <>
      <Link href={`/${e.category}`} className="font-mono text-[12px] text-black/45 hover:text-black">
        ← {e.category}
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-[34px] font-medium leading-tight tracking-[-0.02em]">{e.name}</h1>
        {e.usage ? <UsageBadge n={e.usage} /> : null}
      </div>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-black/60">{e.blurb}</p>
      {e.rule && <RuleNote>{e.rule}</RuleNote>}

      <section className="mt-10">
        <Eyebrow>Specimen</Eyebrow>
        <div className="mt-3">
          <ViewToggle
            preview={
              <Frame
                label={e.name}
                dark={e.slug === "footer" || e.slug === "newsletter-field"}
                pad={e.slug !== "nav"}
              >
                {previewFor(e.slug, e.classes)}
              </Frame>
            }
            code={
              <div className="space-y-4">
                {e.classes && (
                  <div>
                    <Eyebrow>Class string</Eyebrow>
                    <div className="mt-2"><Copyable code={e.classes} /></div>
                  </div>
                )}
                {e.classes && (
                  <div>
                    <Eyebrow>Markup</Eyebrow>
                    <div className="mt-2">
                      <Copyable
                        code={
                          e.classes.includes("md:grid-cols-[1fr_2fr]")
                            ? `<section className="${e.classes}">\n  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-black/45">\n    Label\n  </p>\n  <div>\n    {/* content */}\n  </div>\n</section>`
                            : `<section className="${e.classes}">\n  {/* content */}\n</section>`
                        }
                      />
                    </div>
                  </div>
                )}
                {src && !src.error && (
                  <div>
                    <Eyebrow>Source — read live from the site</Eyebrow>
                    <p className="mt-1 text-[12.5px] text-black/45">
                      <code className="font-mono">{e.sourceFile}</code> — the file that ships, not a copy.
                    </p>
                    <div className="mt-2"><Copyable code={src.code} /></div>
                  </div>
                )}
                {src?.error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-[13.5px] text-red-800 ring-1 ring-red-200">
                    {src.error}
                    <div className="mt-1 font-mono text-[12px] opacity-70">SITE_ROOT = {SITE_ROOT}</div>
                  </div>
                )}
                {!e.classes && !src && (
                  <p className="rounded-xl bg-black/[0.03] px-4 py-6 text-center text-[13px] text-black/45 ring-1 ring-black/10">
                    This entry is documentation only — see the rule above.
                  </p>
                )}
              </div>
            }
          />
        </div>
      </section>

      {e.category === "foundations" && slug === "typography" && <TypeScale />}
      {e.category === "foundations" && slug === "colour" && <Palette />}
      {e.category === "foundations" && slug === "rhythm" && <Rhythm />}
    </>
  );
}

/* ---- foundation specimens, measured from the real source ---- */

function TypeScale() {
  const scale = [
    { px: 52, use: "Hero headline", n: 9 },
    { px: 48, use: "Page H1 (desktop)", n: 9 },
    { px: 36, use: "Section H2", n: 10 },
    { px: 34, use: "Page H1 (mobile)", n: 9 },
    { px: 24, use: "Sub-head", n: 8 },
    { px: 19, use: "Card title", n: 7 },
    { px: 16, use: "Body — long form", n: 49 },
    { px: 15, use: "Body — default", n: 74 },
    { px: 14, use: "Secondary / UI", n: 72 },
    { px: 13, use: "Caption", n: 39 },
    { px: 12, use: "Mono eyebrow", n: 10 },
  ];
  return (
    <section className="mt-12">
      <Eyebrow>Specimen — frequency measured in the real source</Eyebrow>
      <div className="mt-4 divide-y divide-black/10 rounded-xl ring-1 ring-black/10">
        {scale.map((s) => (
          <div key={s.px} className="flex items-baseline gap-5 px-5 py-4">
            <span className="w-16 shrink-0 font-mono text-[12px] text-black/40">{s.px}px</span>
            <span className="grow truncate" style={{ fontSize: s.px, lineHeight: 1.1, letterSpacing: s.px > 30 ? "-0.02em" : "0" }}>
              Access should be dependable
            </span>
            <span className="shrink-0 text-[12.5px] text-black/45">{s.use}</span>
            <span className="w-16 shrink-0 text-right font-mono text-[11.5px] text-black/35">{s.n}×</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Palette() {
  const c = [
    { hex: "#000000", name: "Ground", note: "body default" },
    { hex: "#ffffff", name: "Light page", note: ".light-page" },
    { hex: "rgba(0,0,0,0.60)", name: "Body muted", note: "text-black/60" },
    { hex: "rgba(0,0,0,0.45)", name: "Label", note: "text-black/45" },
    { hex: "rgba(0,0,0,0.10)", name: "Hairline", note: "ring-black/10" },
    { hex: "#2563eb", name: "Accent — link", note: "used sparingly" },
  ];
  return (
    <section className="mt-12">
      <Eyebrow>Palette</Eyebrow>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {c.map((x) => (
          <div key={x.name} className="rounded-xl ring-1 ring-black/10">
            <div className="h-16 rounded-t-xl" style={{ background: x.hex }} />
            <div className="px-4 py-3">
              <p className="text-[14px] font-medium">{x.name}</p>
              <p className="font-mono text-[11.5px] text-black/45">{x.hex}</p>
              <p className="mt-0.5 text-[12px] text-black/50">{x.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Rhythm() {
  const tiers = [
    { name: "Tier 1", cls: "py-24 md:py-40", use: "Major section break" },
    { name: "Tier 1b", cls: "py-12 md:py-20", use: "Standard band" },
    { name: "Tier 2", cls: "py-12 md:py-16", use: "Two-column block" },
    { name: "Pre-footer", cls: "pb-24 md:pb-32", use: "Last section on a page" },
    { name: "Nav clearance", cls: "pt-36", use: "Title block only — not rhythm" },
  ];
  return (
    <section className="mt-12">
      <Eyebrow>The four tiers</Eyebrow>
      <div className="mt-4 divide-y divide-black/10 rounded-xl ring-1 ring-black/10">
        {tiers.map((t) => (
          <div key={t.name} className="flex flex-wrap items-baseline gap-4 px-5 py-4">
            <span className="w-32 shrink-0 text-[14px] font-medium">{t.name}</span>
            <code className="grow font-mono text-[12.5px] text-black/70">{t.cls}</code>
            <span className="text-[12.5px] text-black/45">{t.use}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
