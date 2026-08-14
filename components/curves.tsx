"use client";

import type { Curve } from "@/lib/curves";
import { CurveUIDemo, EXAMPLES } from "./curve-demos";

/**
 * Deliberately spare: title, group, the animation doing its real job, and
 * where to use it. The rationale, fit error and raw easing live in the CMS
 * and the code view — the gallery is for looking.
 */

/** Plot the curve so its shape is visible at a glance. */
function Plot({ easing }: { easing: string }) {
  const m = easing.match(/cubic-bezier\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
  if (!m) return null;
  const [x1, y1, x2, y2] = m.slice(1).map(Number);
  const S = 72;
  const px = (x: number) => x * S;
  const py = (y: number) => S - y * S;
  return (
    <div className="rounded-lg bg-black/[0.02] p-1 ring-1 ring-black/[0.06]">
      <svg viewBox={`-6 -18 ${S + 12} ${S + 36}`} className="h-[72px] w-full">
        <line x1={0} y1={S} x2={S} y2={0} stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeDasharray="2 3" />
        <path d={`M0 ${S} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${S} 0`}
          fill="none" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx={px(x1)} cy={py(y1)} r="2.2" fill="rgba(0,0,0,0.35)" />
        <circle cx={px(x2)} cy={py(y2)} r="2.2" fill="rgba(0,0,0,0.35)" />
      </svg>
    </div>
  );
}

export function CurveCard({ c }: { c: Curve }) {
  const plot = Plot({ easing: c.e });
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
      <p className="text-[15px] font-medium leading-snug">{c.n}</p>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-black/40">{c.g}</p>

      <div className={`mt-4 ${plot ? "grid grid-cols-[92px_1fr] items-center gap-4" : ""}`}>
        {plot}
        <CurveUIDemo demo={c.demo} easing={c.e} duration={c.d || 300} />
      </div>

      <p className="mt-4 text-[13px] font-medium text-black/80">Best for: {c.ideal}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(EXAMPLES[c.demo] ?? []).map((x) => (
          <span key={x} className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[11px] text-black/55 ring-1 ring-black/10">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}
