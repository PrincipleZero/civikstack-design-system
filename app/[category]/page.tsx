import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, inCategory, groupsIn, type Category } from "@/lib/registry";
import { readSource } from "@/lib/source";
import { PageTitle, Eyebrow, UsageBadge, ProvenanceBadge } from "@/components/ui";
import { Frame, previewFor } from "@/components/previews";
import ViewToggle from "@/components/ViewToggle";
import Copyable from "@/components/Copyable";

export const dynamic = "force-dynamic"; // source is read from the site per request

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const entries = inCategory(cat.id as Category);

  // Read every source file for this category up front so each card can offer
  // a code view without a round trip.
  const sources = Object.fromEntries(
    await Promise.all(
      entries.map(async (e) => [
        e.slug,
        e.sourceFile ? (await readSource(e.sourceFile)).code : e.classes ?? "",
      ]),
    ),
  ) as Record<string, string>;

  return (
    <>
      <PageTitle kicker={`${entries.length} entries`} title={cat.name} lede={cat.blurb} />

      {groupsIn(cat.id as Category).map((g) => (
        <section key={g} className="mb-12">
          <Eyebrow>{g}</Eyebrow>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {entries
              .filter((e) => e.group === g)
              .map((e) => (
                <div key={e.slug} className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/${e.category}/${e.slug}`} className="group">
                      <p className="text-[16px] font-medium group-hover:underline">{e.name}</p>
                    </Link>
                    <span className="flex shrink-0 flex-wrap justify-end gap-1.5">
                      {e.provenance ? <ProvenanceBadge p={e.provenance} /> : null}
                      {e.usage ? <UsageBadge n={e.usage} /> : null}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-black/55">{e.blurb}</p>

                  <div className="mt-4">
                    <ViewToggle
                      compact
                      preview={
                        <Frame label={e.name} dark={e.slug === "footer" || e.slug === "newsletter-field"} pad={e.slug !== "nav"}>
                          {previewFor(e.slug, e.classes)}
                        </Frame>
                      }
                      code={
                        sources[e.slug] ? (
                          <div className="max-h-[320px] overflow-auto rounded-xl">
                            <Copyable code={sources[e.slug]} />
                          </div>
                        ) : (
                          <p className="rounded-xl bg-black/[0.03] px-4 py-6 text-center text-[13px] text-black/45 ring-1 ring-black/10">
                            No code for this entry — see the detail page.
                          </p>
                        )
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
