"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

/**
 * Live motion specimens. Every value here is lifted from the real site —
 * durations, easings and scales were measured, not chosen.
 *
 * The signature curve is cubic-bezier(0.22, 1, 0.36, 1): a fast start that
 * settles slowly. It is what makes the site feel calm rather than springy.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

function Replay({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      className="rounded-full bg-black/[0.06] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/55 ring-1 ring-black/10 transition hover:bg-black/10"
    >
      Replay
    </button>
  );
}

function Stage({ children, note, onReplay }: { children: React.ReactNode; note: string; onReplay?: () => void }) {
  return (
    <div>
      <div className="flex min-h-[132px] items-center justify-center rounded-lg bg-black/[0.02] p-5 ring-1 ring-black/[0.06]">
        {children}
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <p className="text-[12px] leading-snug text-black/45">{note}</p>
        {onReplay && <Replay onClick={onReplay} />}
      </div>
    </div>
  );
}

const block = "rounded-lg bg-white px-5 py-4 ring-1 ring-black/10 text-[14px] font-medium";

/* ---------------- reveal: the one scroll primitive ---------------- */

export function RevealDemo() {
  const [k, setK] = useState(0);
  const reduce = useReducedMotion();
  return (
    <Stage note="opacity 0→1, y 24→0 · 0.7s · fires once, 80px before entering view" onReplay={() => setK((n) => n + 1)}>
      <motion.div
        key={k}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={block}
      >
        Fades up on scroll
      </motion.div>
    </Stage>
  );
}

/* ---------------- hover lift: 24 uses, the signature ---------------- */

export function HoverLiftDemo() {
  return (
    <Stage note="scale 1.04 on hover · the site's single interactive gesture (24 uses)">
      <span className="inline-block rounded-full bg-black px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.04]">
        Hover me
      </span>
    </Stage>
  );
}

/* ---------------- image zoom inside a card ---------------- */

export function ImageZoomDemo() {
  return (
    <Stage note="group-hover scale 1.04 · 700ms ease-out · the image moves, the frame does not">
      <div className="group w-[190px] overflow-hidden rounded-xl ring-1 ring-black/10">
        <div className="aspect-[6/4.4] w-full bg-gradient-to-br from-stone-300 via-stone-400 to-stone-600 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
    </Stage>
  );
}

/* ---------------- colour transition ---------------- */

export function ColorShiftDemo() {
  return (
    <Stage note="transition-colors · 34 uses · pills invert on hover rather than dimming">
      <span className="group inline-block cursor-default rounded-full bg-black/5 px-6 py-3 text-[14px] font-medium text-black transition-colors hover:bg-black hover:text-white">
        Hover me
      </span>
    </Stage>
  );
}

/* ---------------- menu overlay: the Nav pattern ---------------- */

export function MenuOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Stage note="backdrop fades 0.35s; items stagger in from y 30 — the mobile menu">
      <div className="relative h-[112px] w-full max-w-[280px] overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
          className="absolute right-2 top-2 z-10 rounded-full bg-black px-3 py-1.5 text-[12px] font-medium text-white"
        >
          {open ? "Close" : "Menu"}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-black p-4"
            >
              {["Focus", "The Lab", "Research"].map((l, i) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                  className="text-[15px] text-white"
                >
                  {l}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  );
}

/* ---------------- chevron rotate ---------------- */

export function ChevronDemo() {
  return (
    <Stage note="rotate 180° · 200ms · also fires on focus-within, so keyboards get it too">
      <span className="group inline-flex cursor-default items-center gap-2 text-[14px] font-medium">
        Research
        <svg viewBox="0 0 12 12" className="size-3 transition-transform duration-200 group-hover:rotate-180">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </Stage>
  );
}

/* ---------------- stagger ---------------- */

export function StaggerDemo() {
  const [k, setK] = useState(0);
  return (
    <Stage note="delay 0.06s per item · enough to read as sequence, not as lag" onReplay={() => setK((n) => n + 1)}>
      <div key={k} className="w-full max-w-[240px] space-y-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className="h-8 rounded-lg bg-white ring-1 ring-black/10"
          />
        ))}
      </div>
    </Stage>
  );
}

/* ---------------- the curve itself ---------------- */

export function EasingDemo() {
  const [k, setK] = useState(0);
  return (
    <Stage note="cubic-bezier(0.22, 1, 0.36, 1) — covers most of the distance early, then settles" onReplay={() => setK((n) => n + 1)}>
      <div className="w-full max-w-[260px]">
        <div className="relative h-1.5 rounded-full bg-black/10">
          <motion.div
            key={k}
            initial={{ left: "0%" }}
            animate={{ left: "calc(100% - 14px)" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-black"
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
          <span>fast out</span><span>long settle</span>
        </div>
      </div>
    </Stage>
  );
}
