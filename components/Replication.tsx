"use client";

import { useState } from "react";

/**
 * Replication of the motion.dev homepage animations, from runtime measurement
 * (2026-08-14). Nothing here is copied source — every value was captured by
 * instrumenting the live page (a hook on Element.prototype.animate plus
 * animationstart/transitionstart listeners, and the @keyframes rules read from
 * CSSOM), then re-implemented.
 */

/** The spring the site ships as a 150-stop linear(). These are 24 sampled
 *  stops — monotonic, max 0.9943: a critically damped spring, no overshoot. */
const SPRING_LINEAR =
  "linear(0,0.0406,0.1327,0.2454,0.3608,0.469,0.5656,0.6488,0.7188,0.7767,0.8239,0.8619,0.8922,0.9163,0.9352,0.95,0.9616,0.9705,0.9774,0.9828,0.9869,0.99,0.9924,0.9943,1)";

const WIPE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function Replay({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      className="rounded-full bg-black/[0.06] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/55 ring-1 ring-black/10 hover:bg-black/10"
    >
      Replay
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · The hero entrance cascade                                       */
/* Measured: clipPath inset(0 100% 0 0) → inset(0 0% 0 0) on           */
/* cubic-bezier(0.16,1,0.3,1); panel 1000ms; meta/title/actions 500ms  */
/* at delays 0 / 166.7 / 333.3ms; panel slides -50px→0 on a 1500ms     */
/* damped spring.                                                      */
/* ------------------------------------------------------------------ */
export function HeroCascadeReplica() {
  const [k, setK] = useState(0);
  const wipe = (dur: number, delay: number): React.CSSProperties => ({
    clipPath: "inset(0 100% 0 0)",
    animation: `ds-wipe ${dur}ms ${WIPE_EASE} ${delay}ms forwards`,
  });

  return (
    <div>
      <div key={k} className="overflow-hidden rounded-xl bg-black p-8">
        <div
          style={{
            transform: "translateX(-50px)",
            animation: `ds-slide 1500ms ${SPRING_LINEAR} 0ms forwards`,
          }}
        >
          <div style={wipe(1000, 0)} className="inline-block rounded-lg bg-white/[0.07] p-6 ring-1 ring-white/10">
            <p style={wipe(500, 0)} className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              Open source · measured replica
            </p>
            <h3 style={wipe(500, 166.7)} className="mt-2 text-[26px] font-medium leading-tight text-white">
              The cascade is three wipes
              <br />
              and one spring.
            </h3>
            <div style={wipe(500, 333.3)} className="mt-4 flex gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black">Get started</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium text-white ring-1 ring-white/20">Docs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <p className="text-[12px] leading-snug text-black/45">
          Left-to-right clip wipes, 166.7ms stagger · panel slide is the 150-stop spring
        </p>
        <Replay onClick={() => setK((n) => n + 1)} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · The hero diagram loops                                          */
/* Three CSS loops, verbatim keyframes:                                */
/*  tiles  3.6s cubic-bezier(0.6,0,0.2,1)  travel+rotate, pop @54%     */
/*  rows   3.0s cubic-bezier(0.4,0,0.2,1)  stagger 450ms               */
/*  bars   2.4s cubic-bezier(0.4,0,0.4,1)  stagger 120ms               */
/* ------------------------------------------------------------------ */
export function DiagramLoopsReplica() {
  return (
    <div>
      <div className="grid gap-4 rounded-xl bg-black/[0.03] p-6 ring-1 ring-black/[0.06] sm:grid-cols-3">
        {/* tile: hold → travel 120px + rotate 15° → scale pop 1.75 → return */}
        <div className="relative h-[120px] overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
          <span
            className="absolute left-4 top-1/2 block size-8 -translate-y-1/2 rounded-md bg-black"
            style={{ animation: "ds-diag-tile 3.6s cubic-bezier(0.6,0,0.2,1) infinite" }}
          />
          <p className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
            tile · 3.6s · pop @54%
          </p>
        </div>

        {/* rows: slide -12% + fade, 450ms stagger */}
        <div className="flex h-[120px] flex-col justify-center gap-2 rounded-lg bg-white p-4 ring-1 ring-black/10">
          {[0, 450, 900].map((d) => (
            <span
              key={d}
              className="block h-3 rounded bg-black/15"
              style={{ animation: `ds-diag-row 3s cubic-bezier(0.4,0,0.2,1) ${d}ms infinite` }}
            />
          ))}
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
            rows · 3s · stagger 450ms
          </p>
        </div>

        {/* bars: scaleX fill 0→1 by 45%, drain by 90%, 120ms stagger */}
        <div className="flex h-[120px] flex-col justify-center gap-2 rounded-lg bg-white p-4 ring-1 ring-black/10">
          {[0, 120, 240, 360].map((d) => (
            <span
              key={d}
              className="block h-2.5 origin-left rounded bg-black"
              style={{ animation: `ds-diag-bar 2.4s cubic-bezier(0.4,0,0.4,1) ${d}ms infinite` }}
            />
          ))}
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
            bars · 2.4s · stagger 120ms
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-[12px] leading-snug text-black/45">
        Keyframes lifted verbatim from CSSOM — including the holds (0–12%, 34–44%) that give the
        tile its beat, and the 55–70% hold that lets a row stay gone before returning.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · The micro layer                                                 */
/* svg colour transition 160ms ease · terminal line fade 200ms         */
/* ------------------------------------------------------------------ */
export function MicroReplica() {
  const [k, setK] = useState(0);
  return (
    <div>
      <div className="flex items-center gap-6 rounded-xl bg-black/[0.03] p-6 ring-1 ring-black/[0.06]">
        <span className="cursor-default text-[15px] font-medium text-black/45 transition-colors duration-[160ms] ease-[ease] hover:text-black">
          Hover — 160ms colour
        </span>
        <div key={k} className="rounded-lg bg-[#0b0b0b] px-4 py-2.5 font-mono text-[12.5px] text-white/85">
          {["› npm install motion", "› done in 0.8s"].map((line, i) => (
            <div key={line} style={{ opacity: 0, animation: `ds-fade-in 200ms ease-out ${i * 250}ms forwards` }}>
              {line}
            </div>
          ))}
        </div>
        <Replay onClick={() => setK((n) => n + 1)} />
      </div>
      <p className="mt-2.5 text-[12px] leading-snug text-black/45">
        Terminal lines land with a 200ms ease-out fade; icon colour shifts run 160ms.
      </p>
    </div>
  );
}
