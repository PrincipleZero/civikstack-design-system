"use client";

import { useState } from "react";

/** Click to copy. The point of the catalogue is that you can lift the exact string. */
export default function Copyable({ code, label = "Copy" }: { code: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-xl bg-[#0b0b0b] px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setDone(true);
            setTimeout(() => setDone(false), 1400);
          } catch { /* clipboard blocked — the text is selectable anyway */ }
        }}
        className="absolute right-2 top-2 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white/80 transition hover:bg-white/20"
      >
        {done ? "Copied" : label}
      </button>
    </div>
  );
}
