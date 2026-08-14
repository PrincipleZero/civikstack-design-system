"use client";

import { useState } from "react";
import type { Curve } from "@/lib/curves";

/** Provenance tiers, straight from the cookbook. */
const TIER: Record<string, { label: string; cls: string }> = {
  measured: { label: "measured", cls: "bg-emerald-50 text-emerald-900 ring-emerald-200" },
  tolerance: { label: "tolerance", cls: "bg-sky-50 text-sky-900 ring-sky-200" },
  composite: { label: "composite", cls: "bg-violet-50 text-violet-900 ring-violet-200" },
  refused: { label: "refused", cls: "bg-stone-100 text-stone-700 ring-stone-300" },
  designed: { label: "designed", cls: "bg-amber-50 text-amber-900 ring-amber-300 border-dashed" },
};

/** Plot the curve so its shape is visible, not just its numbers. */
function Plot({ easing }: { easing: string }) {
  const m = easing.match(/cubic-bezier\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
  if (!m) {
    return (
      <div className="flex h-[72px] items-center justify-center rounded-lg bg-black/[0.03] font-mono text-[11px] uppercase tracking-[0.1em] text-black/40">
        {easing}
      </div>
    );
  }
  const [x1, y1, x2, y2] = m.slice(1).map(Number);
  const S = 72;
  const px = (x: number) => x * S;
  const py = (y: number) => S - y * S;
  return (
    <svg viewBox={`-6 -18 ${S + 12} ${S + 36}`} className="h-[72px] w-full">
      <line x1={0} y1={S} x2={S} y2={0} stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeDasharray="2 3" />
      <path
        d={`M0 ${S} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${S} 0`}
        fill="none" stroke="#000" strokeWidth="1.6" strokeLinecap="round"
      />
      <circle cx={px(x1)} cy={py(y1)} r="2.2" fill="rgba(0,0,0,0.35)" />
      <circle cx={px(x2)} cy={py(y2)} r="2.2" fill="rgba(0,0,0,0.35)" />
    </svg>
  );
}

export function CurveCard({ c }: { c: Curve }) {
  const [k, setK] = useState(0);
  const tier = TIER[c.cf] ?? TIER.measured;
  const dur = c.d || 300;

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-medium leading-snug">{c.n}</p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-black/40">
            {c.g}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ring-1 ${tier.cls}`}>
          {tier.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[92px_1fr] items-center gap-4">
        <div className="rounded-lg bg-black/[0.02] p-1 ring-1 ring-black/[0.06]">
          <Plot easing={c.e} />
        </div>

        {/* the curve driving a real move */}
        <div>
          <div className="relative h-1.5 rounded-full bg-black/10">
            <span
              key={k}
              className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-black"
              style={{
                animation: `ds-run ${dur}ms ${c.e === "step" ? "steps(1,end)" : c.e} forwards`,
              }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] text-black/45">{dur}ms</span>
            <button
              type="button"
              onClick={() => setK((n) => n + 1)}
              className="rounded-full bg-black/[0.06] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-black/55 ring-1 ring-black/10 hover:bg-black/10"
            >
              Replay
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px] font-medium text-black/80">Best for: {c.ideal}</p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-black/55"
         dangerouslySetInnerHTML={{ __html: c.why }} />
      {c.des && (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] leading-snug text-amber-950 ring-1 ring-amber-200"
           dangerouslySetInnerHTML={{ __html: c.des }} />
      )}

      <div className="mt-4 rounded-lg bg-[#0b0b0b] px-3 py-2 font-mono text-[11.5px] text-white/85">
        <div className="break-all">{c.e}</div>
        <div className="mt-1 text-white/45">{dur}ms · {c.pv}</div>
      </div>
    </div>
  );
}
