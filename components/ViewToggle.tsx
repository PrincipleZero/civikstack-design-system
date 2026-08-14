"use client";

import { useState } from "react";

/**
 * Preview ⇄ Code. Every catalogue entry gets one, so you can see the thing and
 * then lift the thing without leaving the card.
 */
export default function ViewToggle({
  preview,
  code,
  defaultView = "preview",
  compact = false,
}: {
  preview: React.ReactNode;
  code: React.ReactNode;
  defaultView?: "preview" | "code";
  compact?: boolean;
}) {
  const [view, setView] = useState<"preview" | "code">(defaultView);

  return (
    <div>
      <div className="mb-2.5 inline-flex rounded-full bg-black/[0.06] p-0.5 ring-1 ring-black/10">
        {(["preview", "code"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={(e) => {
              // Cards sit inside links — don't navigate when switching views.
              e.preventDefault();
              e.stopPropagation();
              setView(v);
            }}
            className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition ${
              view === v ? "bg-white text-black shadow-sm ring-1 ring-black/10" : "text-black/50 hover:text-black/80"
            } ${compact ? "px-2.5 py-0.5 text-[10.5px]" : ""}`}
          >
            {v}
          </button>
        ))}
      </div>
      <div>{view === "preview" ? preview : code}</div>
    </div>
  );
}
