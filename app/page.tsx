import Link from "next/link";
import { CATEGORIES, ENTRIES, inCategory } from "@/lib/registry";
import { PageTitle, Eyebrow } from "@/components/ui";

export default function Home() {
  const topPatterns = ENTRIES.filter((e) => e.usage).sort((a, b) => (b.usage! - a.usage!)).slice(0, 4);
  return (
    <>
      <PageTitle
        kicker="Built from civikstack.org"
        title="The design system"
        lede="Every entry here describes something that actually ships on the site. Component source is read from the live project at request time, so what you copy cannot drift from what runs. Build new assets from this rather than from a screenshot."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/${c.id}`}
            className="group rounded-2xl bg-black/[0.03] p-6 ring-1 ring-black/10 transition hover:bg-black/[0.06]">
            <Eyebrow>{inCategory(c.id).length} entries</Eyebrow>
            <p className="mt-2 text-[19px] font-medium">{c.name}</p>
            <p className="mt-1.5 text-[13.5px] leading-snug text-black/55">{c.blurb}</p>
          </Link>
        ))}
      </div>

      <section className="mt-14">
        <Eyebrow>Load-bearing patterns</Eyebrow>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-black/60">
          Ranked by how often they appear in the real source. Frequency is the evidence — the
          two-column block is the site&rsquo;s structural signature, not a stylistic preference.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {topPatterns.map((e) => (
            <Link key={e.slug} href={`/${e.category}/${e.slug}`}
              className="flex items-baseline justify-between gap-4 rounded-xl bg-white px-5 py-4 ring-1 ring-black/10 transition hover:ring-black/30">
              <span>
                <span className="text-[15px] font-medium">{e.name}</span>
                <span className="mt-0.5 block text-[13px] text-black/50">{e.blurb}</span>
              </span>
              <span className="shrink-0 font-mono text-[12px] text-black/45">{e.usage}×</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-2xl">
        <Eyebrow>How to use this</Eyebrow>
        <ol className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-black/65">
          <li><strong className="text-black">1.</strong> Start from <Link className="underline" href="/sections">Sections</Link> — pick the structural block before writing any copy.</li>
          <li><strong className="text-black">2.</strong> Copy the class string. It is the exact one in production.</li>
          <li><strong className="text-black">3.</strong> Drop in a <Link className="underline" href="/primitives">primitive</Link> for the content.</li>
          <li><strong className="text-black">4.</strong> Check the register against the <Link className="underline" href="/templates">page template</Link> for that audience.</li>
        </ol>
      </section>
    </>
  );
}
