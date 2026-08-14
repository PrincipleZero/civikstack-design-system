import Link from "next/link";
import { CATEGORIES, ENTRIES, inCategory } from "@/lib/registry";
import { CURVES } from "@/lib/curves";
import { RECIPES } from "@/lib/recipes";

const pill =
  "rounded-full px-5 py-3 text-[14px] font-medium transition-transform hover:scale-[1.04]";

/**
 * The catalogue's own front door, built in the vocabulary it documents:
 * black hero, then light 1fr/2fr label-and-statement sections. If this page
 * stops looking like civikstack.org, the system has drifted.
 */
export default function Home() {
  const patterns = ENTRIES.filter((e) => e.usage).sort((a, b) => b.usage! - a.usage!).slice(0, 5);
  const measured = CURVES.filter((c) => c.cf === "measured").length;

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative flex min-h-[86vh] w-full flex-col justify-center overflow-hidden bg-black">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(110% 95% at 50% 55%, black 25%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(110% 95% at 50% 55%, black 25%, transparent 78%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center md:px-10">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white/45">
            Wayfinder · built from civikstack.org
          </p>
          <h1 className="mt-4 max-w-4xl text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white md:text-[52px]">
            The site already made these decisions. This is where they are written down.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] font-medium leading-relaxed text-white/90">
            Component source is read from the live project at request time, so what you copy cannot
            drift from what runs. Build new assets from this, not from a screenshot.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/sections" className={`${pill} bg-white text-black`}>
              Start with sections
            </Link>
            <Link href="/curves" className={`${pill} bg-white/10 text-white ring-1 ring-white/25`}>
              {CURVES.length} easing curves
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- what it is ---------- */}
      <section className="light-page bg-white px-6 pt-24 text-black md:px-10 md:pt-40">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <p className="font-mono text-[15px] text-black/60">The catalogue</p>
          <div>
            <p className="max-w-3xl text-[24px] font-medium leading-[1.35] tracking-[-0.01em] md:text-[30px]">
              Every entry describes something that actually ships. Patterns are ranked by how often
              they appear in the real source, so frequency — not taste — decides what counts as the
              house style.
            </p>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-black/70">
              Anything designed here rather than measured is badged as such. Keeping those apart is
              what stops a catalogue from quietly inventing history.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- load-bearing ---------- */}
      <section className="light-page bg-white px-6 py-24 text-black md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <p className="font-mono text-[15px] text-black/60">Load-bearing patterns</p>
          <div>
            <p className="max-w-3xl text-[24px] font-medium leading-[1.35] tracking-[-0.01em] md:text-[30px]">
              The two-column block is the site&rsquo;s structural signature, not a preference.
            </p>
            <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {patterns.map((e) => (
                <Link key={e.slug} href={`/${e.category}/${e.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-4">
                  <span>
                    <span className="text-[17px] font-medium group-hover:underline">{e.name}</span>
                    <span className="mt-0.5 block max-w-xl text-[14px] leading-snug text-black/55">
                      {e.blurb}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[14px] text-black/40">{e.usage}×</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the catalogue ---------- */}
      <section className="light-page bg-white px-6 pb-24 text-black md:px-10 md:pb-40">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <p className="font-mono text-[15px] text-black/60">What is in it</p>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { href: "/curves", name: "Curves", n: `${CURVES.length} · ${measured} measured`, b: "Each assigned the one component it best drives." },
                { href: "/recipes", name: "Recipes", n: `${RECIPES.length} cascades`, b: "Multi-element choreography with ranked onsets." },
                ...CATEGORIES.map((c) => ({
                  href: `/${c.id}`, name: c.name, n: `${inCategory(c.id).length} entries`, b: c.blurb,
                })),
              ].map((c) => (
                <Link key={c.href} href={c.href}
                  className="group rounded-2xl bg-black/[0.03] p-6 ring-1 ring-black/10 transition hover:bg-black/[0.06]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/45">{c.n}</p>
                  <p className="mt-2 text-[19px] font-medium">{c.name}</p>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-black/55">{c.b}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- how to use it ---------- */}
      <section className="light-page bg-white px-6 pb-24 text-black md:px-10 md:pb-40">
        <div className="rounded-2xl bg-black p-10 text-white md:p-16">
          <p className="font-mono text-[14px] text-white/50">How to use this</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Pick the structure", "Start in Sections. Choose the block before writing a word of copy."],
              ["02", "Copy the class string", "It is the exact one in production, not an approximation."],
              ["03", "Drop in a primitive", "Elements and Primitives carry the small parts."],
              ["04", "Check the register", "Templates say which voice that audience gets."],
            ].map(([n, t, c]) => (
              <li key={n}>
                <p className="font-mono text-[13px] text-white/40">{n}</p>
                <p className="mt-2 text-[17px] font-medium">{t}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{c}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
