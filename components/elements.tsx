"use client";

import { useState } from "react";

/**
 * Element specimens.
 *
 * Buttons, chips, dropdown, fields and labels are lifted from the real site.
 * Alerts, avatars and the table are new — designed here in the same vocabulary
 * (pill radius, hairline rings, mono labels) but not yet used anywhere.
 */

const pill = "rounded-full px-5 py-3 text-[14px] font-medium transition-transform hover:scale-[1.04]";

export function ButtonsDemo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`${pill} bg-black text-white`}>Partner with us</span>
        <span className={`${pill} bg-black/5 text-black`}>Read the standards</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-black p-4">
        <span className={`${pill} bg-white text-black`}>On dark — primary</span>
        <span className={`${pill} bg-white/10 text-white ring-1 ring-white/20`}>Secondary</span>
      </div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-black/35">
        13 · 10 · 6 · 5 uses respectively
      </p>
    </div>
  );
}

export function StatusDemo() {
  const chips: [string, string][] = [
    ["In development", "bg-black/5 text-black/70"],
    ["Private beta", "bg-amber-100 text-amber-900"],
    ["In production", "bg-emerald-100 text-emerald-900"],
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map(([label, tone]) => (
        <span key={label}
          className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${tone}`}>
          {label}
        </span>
      ))}
    </div>
  );
}

export function DropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-[240px]">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
        className="inline-flex items-center gap-2 text-[14px] font-medium"
      >
        Research
        <svg viewBox="0 0 12 12" className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`mt-2 rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/10 transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {["White papers", "Durham Access Briefs", "Annual report"].map((l) => (
          <p key={l} className="rounded-lg px-3 py-2 text-[13.5px] text-black/70 hover:bg-black/[0.04]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

export function FieldsDemo() {
  const field =
    "w-full rounded-lg bg-black/[0.04] px-4 py-3.5 text-[14px] text-black placeholder-black/40 ring-1 ring-black/10 outline-none transition focus:ring-black/40";
  return (
    <div className="w-full max-w-sm space-y-3">
      <input className={field} placeholder="Name" />
      <select className={`${field} appearance-none text-black/70`} defaultValue="">
        <option value="" disabled>I am a…</option>
        <option>Funder</option>
      </select>
      <textarea className={`${field} resize-none`} rows={2} placeholder="Message" />
    </div>
  );
}

export function AlertsDemo() {
  const alerts: [string, string, string][] = [
    ["Notice", "bg-black/[0.04] text-black/75 ring-black/10", "Session Two has not been scheduled."],
    ["Warning", "bg-amber-50 text-amber-950 ring-amber-200", "This claim has not been confirmed by an administrator."],
    ["Error", "bg-red-50 text-red-800 ring-red-200", "That didn’t send, so your message has not reached us."],
    ["Success", "bg-emerald-50 text-emerald-900 ring-emerald-200", "Saved. The room can see it now."],
  ];
  return (
    <div className="w-full space-y-2">
      {alerts.map(([name, tone, copy]) => (
        <div key={name} className={`rounded-xl px-4 py-3 text-[13.5px] leading-snug ring-1 ${tone}`}>
          <span className="font-medium">{name} · </span>{copy}
        </div>
      ))}
    </div>
  );
}

export function AvatarsDemo() {
  const people = ["RS", "AD", "JH", "MT"];
  return (
    <div className="space-y-5">
      <div className="flex items-end gap-3">
        {[
          ["size-8 text-[12px]", "sm"],
          ["size-11 text-[14px]", "md"],
          ["size-14 text-[17px]", "lg"],
        ].map(([cls, label]) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className={`${cls} flex items-center justify-center rounded-full bg-black/[0.07] font-medium text-black/70 ring-1 ring-black/10`}>
              RS
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        {people.map((p, i) => (
          <span key={p}
            className="flex size-9 items-center justify-center rounded-full bg-black/[0.07] text-[12px] font-medium text-black/70 ring-2 ring-white"
            style={{ marginLeft: i === 0 ? 0 : -10 }}>
            {p}
          </span>
        ))}
        <span className="ml-2 text-[13px] text-black/50">+26 in the room</span>
      </div>
    </div>
  );
}

export function TableDemo() {
  const rows = [
    ["27701", "Central / Downtown", 12, 4],
    ["27703", "East / Southeast", 9, 3],
    ["27705", "West / Northwest", 14, 6],
  ];
  return (
    <div className="w-full overflow-hidden rounded-xl ring-1 ring-black/10">
      <table className="w-full text-[13px]">
        <thead className="bg-black/[0.04] text-left font-mono text-[11px] uppercase tracking-[0.08em] text-black/50">
          <tr>
            <th className="px-3 py-2">ZIP</th>
            <th className="px-3 py-2">Section</th>
            <th className="px-3 py-2 text-right">Programs</th>
            <th className="px-3 py-2 text-right">Intake</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0] as string} className="border-t border-black/[0.07]">
              <td className="px-3 py-2 font-mono text-black/60">{r[0]}</td>
              <td className="px-3 py-2">{r[1]}</td>
              <td className="px-3 py-2 text-right tabular-nums font-medium">{r[2]}</td>
              <td className="px-3 py-2 text-right tabular-nums">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LabelsDemo() {
  return (
    <div className="space-y-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/45">
        Durham After-School Access Lab
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-black/[0.06] px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-black/60 ring-1 ring-black/10">
          18× on the site
        </span>
        <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[12px] text-black/60">
          Academic
        </span>
        <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[12px] text-black/60">
          Athletics
        </span>
      </div>
    </div>
  );
}
