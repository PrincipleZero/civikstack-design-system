import type { Recipe } from "@/lib/recipes";
import { E } from "@/lib/recipes";

const ROLE: Record<string, string> = {
  structure: "bg-black/[0.06] text-black/70",
  content: "bg-sky-50 text-sky-900",
  accent: "bg-amber-50 text-amber-900",
  marked: "bg-violet-50 text-violet-900",
  exit: "bg-stone-100 text-stone-700",
};

/** A recipe is a choreography: which element moves, on which curve, at what onset. */
export default function RecipeCard({ r }: { r: Recipe }) {
  const span = Math.max(...r.steps.map((s) => s.o), 1);
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-medium leading-snug">{r.name}</p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-black/40">
            {r.grp}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-black/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-black/60 ring-1 ring-black/10">
          quantum {typeof r.q === "number" ? `${r.q}ms` : r.q}
        </span>
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-black/60"
         dangerouslySetInnerHTML={{ __html: r.why }} />

      {/* onset timeline — the shape of the cascade at a glance */}
      <div className="mt-4 space-y-1.5">
        {r.steps.map((s, i) => {
          const tok = E[s.c];
          const left = (s.o / span) * 72;
          return (
            <div key={i} className="grid grid-cols-[104px_1fr] items-center gap-3">
              <span className="truncate text-[12.5px] font-medium">{s.l}</span>
              <div className="relative h-5">
                <div className="absolute inset-y-2 left-0 right-0 rounded bg-black/[0.05]" />
                <span
                  className="absolute top-0 h-5 rounded px-2 text-[10.5px] leading-5 font-mono text-black/70 ring-1 ring-black/10"
                  style={{ left: `${left}%`, background: "white" }}
                >
                  {s.c} · {s.o}ms
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-black/10">
        <table className="w-full text-[12.5px]">
          <thead className="bg-black/[0.04] text-left font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/50">
            <tr>
              <th className="px-3 py-2">Element</th>
              <th className="px-3 py-2">Curve</th>
              <th className="px-3 py-2 text-right">Onset</th>
              <th className="px-3 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {r.steps.map((s, i) => (
              <tr key={i} className="border-t border-black/[0.07] align-top">
                <td className="px-3 py-2 font-medium">{s.l}</td>
                <td className="px-3 py-2">
                  <span className="font-mono text-[11.5px]">{s.c}</span>
                  {E[s.c] && (
                    <span className="ml-1.5 font-mono text-[10.5px] text-black/40">
                      {E[s.c][1]}ms
                    </span>
                  )}
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-black/50">{s.n}</span>
                </td>
                <td className="px-3 py-2 text-right tabular-nums font-mono">{s.o}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${ROLE[s.r.split(" ")[0]] ?? "bg-black/[0.06] text-black/60"}`}>
                    {s.r}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
