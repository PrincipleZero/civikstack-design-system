export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/45">{children}</p>
  );
}

/**
 * Every catalogue page opens with a hero: a full-bleed black title band in the
 * home hero's language — mono kicker, display-size title, muted lede. Content
 * below sits in <Gutter>.
 */
export function PageTitle({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <div className="bg-black px-6 pb-14 pt-12 text-white md:px-10 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-[1500px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/45">{kicker}</p>
        <h1 className="mt-3 max-w-4xl text-[44px] font-medium leading-[1.02] tracking-[-0.02em] md:text-[64px]">
          {title}
        </h1>
        {lede && <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/65 md:text-[16px]">{lede}</p>}
      </div>
    </div>
  );
}

/** The standard content gutter for everything under a hero. */
export function Gutter({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1500px] px-6 pb-28 pt-10 md:px-10">{children}</div>;
}

/** How many times a pattern appears on the real site — the evidence it is load-bearing. */
export function UsageBadge({ n }: { n: number }) {
  return (
    <span className="rounded-full bg-black/[0.06] px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-black/60 ring-1 ring-black/10">
      {n}× on the site
    </span>
  );
}

export function RuleNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-[13.5px] leading-snug text-amber-950 ring-1 ring-amber-200">
      <span className="font-medium">Rule · </span>
      {children}
    </div>
  );
}

/** extracted = already on the site · new = designed here, not shipping yet. */
export function ProvenanceBadge({ p }: { p: "extracted" | "new" | "external" }) {
  if (p === "external")
    return (
      <span className="rounded-full bg-sky-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-sky-900 ring-1 ring-sky-200">
        measured elsewhere
      </span>
    );
  const isNew = p === "new";
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ring-1 ${
        isNew
          ? "border border-dashed border-amber-400 bg-amber-50 text-amber-900 ring-amber-200"
          : "bg-emerald-50 text-emerald-900 ring-emerald-200"
      }`}
    >
      {isNew ? "new — not on the site" : "on the site"}
    </span>
  );
}
