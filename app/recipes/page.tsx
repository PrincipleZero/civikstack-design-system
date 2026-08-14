import { RECIPES, E } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import { PageTitle, Eyebrow } from "@/components/ui";

export default function RecipesPage() {
  const groups = [...new Set(RECIPES.map((r) => r.grp))];
  const steps = RECIPES.reduce((n, r) => n + r.steps.length, 0);

  return (
    <>
      <PageTitle
        kicker={`${RECIPES.length} recipes · ${steps} choreographed elements`}
        title="Cascade recipes"
        lede="Compound widgets: several elements moving on different curves at ranked onsets. The grammar is strict — structure first, then content, and the accent arrives last, with at most one marked device per view."
      />

      <div className="mb-10 rounded-xl bg-amber-50 px-4 py-3 text-[13px] leading-snug text-amber-950 ring-1 ring-amber-200">
        <span className="font-medium">What travels, and what does not. </span>
        The specification below — elements, curves, onsets, roles and rationale — is copied verbatim
        from the Motion Cookbook. The interactive builders stay there: rewriting 18 multi-element
        choreographies into JSX would risk exactly the silent drift this catalogue exists to prevent.
        Build from the spec; open the cookbook to watch one run.
      </div>

      <section className="mb-12">
        <Eyebrow>Easing tokens ({Object.keys(E).length})</Eyebrow>
        <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-black/10">
          <table className="w-full text-[12.5px]">
            <thead className="bg-black/[0.04] text-left font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/50">
              <tr>
                <th className="px-3 py-2">Token</th>
                <th className="px-3 py-2">Easing</th>
                <th className="px-3 py-2 text-right">Duration</th>
                <th className="px-3 py-2">Provenance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(E).map(([k, v]) => (
                <tr key={k} className="border-t border-black/[0.07]">
                  <td className="px-3 py-2 font-mono font-medium">{k}</td>
                  <td className="px-3 py-2 font-mono text-[11.5px] text-black/70">{v[0]}</td>
                  <td className="px-3 py-2 text-right tabular-nums font-mono">{v[1]}ms</td>
                  <td className="px-3 py-2 text-black/55">{v[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g} className="mb-12">
          <Eyebrow>{g}</Eyebrow>
          <div className="mt-4 grid gap-5 xl:grid-cols-2">
            {RECIPES.filter((r) => r.grp === g).map((r) => (
              <RecipeCard key={r.name} r={r} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
