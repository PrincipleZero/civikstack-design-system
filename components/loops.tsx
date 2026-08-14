"use client";

/**
 * The three measured loops from motion.dev's hero diagram, as standalone
 * specimens. Values are verbatim from that page's @keyframes (see /replication
 * for the measured record). External vocabulary: catalogued for reuse, not yet
 * used on civikstack.org.
 */

export function TileLoop() {
  return (
    <div className="relative h-[120px] overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
      <span
        className="absolute left-4 top-1/2 block size-8 -translate-y-1/2 rounded-md bg-black"
        style={{ animation: "ds-diag-tile 3.6s cubic-bezier(0.6,0,0.2,1) infinite" }}
      />
      <p className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
        hold 0–12% · travel + rotate 15° · pop 1.75 @54% · return
      </p>
    </div>
  );
}

export function RowLoop() {
  return (
    <div className="flex h-[120px] flex-col justify-center gap-2 rounded-lg bg-white p-4 ring-1 ring-black/10">
      {[0, 450, 900].map((d) => (
        <span key={d} className="block h-3 rounded bg-black/15"
          style={{ animation: `ds-diag-row 3s cubic-bezier(0.4,0,0.2,1) ${d}ms infinite` }} />
      ))}
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
        slide −12% + fade · gone 55–70% · stagger 450ms
      </p>
    </div>
  );
}

export function BarLoop() {
  return (
    <div className="flex h-[120px] flex-col justify-center gap-2 rounded-lg bg-white p-4 ring-1 ring-black/10">
      {[0, 120, 240, 360].map((d) => (
        <span key={d} className="block h-2.5 origin-left rounded bg-black"
          style={{ animation: `ds-diag-bar 2.4s cubic-bezier(0.4,0,0.4,1) ${d}ms infinite` }} />
      ))}
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
        fill by 45% · drain by 90% · stagger 120ms
      </p>
    </div>
  );
}
