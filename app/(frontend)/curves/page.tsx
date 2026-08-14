import { getCurves } from "@/lib/cms";

export const dynamic = "force-dynamic";
import { CurveCard } from "@/components/curves";
import { PageTitle, Gutter, Eyebrow } from "@/components/ui";

const TIERS = ["measured", "tolerance", "composite", "refused", "designed"] as const;

export default async function CurvesPage() {
  const CURVES = await getCurves();
  const groups = [...new Set(CURVES.map((c) => c.g))];
  const counts = TIERS.map((t) => [t, CURVES.filter((c) => c.cf === t).length] as const)
    .filter(([, n]) => n > 0);

  return (
    <>
      <PageTitle
        kicker={`${CURVES.length} curves · from the Motion Cookbook`}
        title="Easing curves"
        lede="Each curve is assigned the one component it is best suited to drive. Measured curves carry their fit error; designed curves are marked and state what was derived versus invented. That distinction is the point — it survives copy-paste."
      />

      <Gutter>
      <div className="mb-10 flex flex-wrap gap-2">
        {counts.map(([t, n]) => (
          <span key={t} className="rounded-full bg-black/[0.05] px-3 py-1.5 font-mono text-[11.5px] text-black/60 ring-1 ring-black/10">
            {n} {t}
          </span>
        ))}
      </div>

      {groups.map((g) => (
        <section key={g} className="mb-12">
          <Eyebrow>{g}</Eyebrow>
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {CURVES.filter((c) => c.g === g).map((c) => (
              <CurveCard key={c.n} c={c} />
            ))}
          </div>
        </section>
      ))}
      </Gutter>
    </>
  );
}
