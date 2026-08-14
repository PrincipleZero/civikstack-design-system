"use client";

import { motion } from "framer-motion";

/**
 * UI vignettes for the curve gallery. Each curve animates the component it is
 * best suited to drive — a real tab thumb, dropdown, toast, page transition —
 * using that curve's own easing and duration. The abstract dot told you the
 * shape; these show the job.
 */

type Ease = number[] | "linear";

function parseEase(e: string): Ease {
  const m = e.match(/cubic-bezier\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
  if (m) return m.slice(1).map(Number);
  return "linear";
}

/** Where each demo key shows up in real interfaces — the example chips. */
export const EXAMPLES: Record<string, string[]> = {
  reorder: ["lists", "kanban", "layout shifts"],
  segthumb: ["tabs", "segmented controls", "toggles"],
  tooltip: ["tooltips", "popovers", "hints"],
  stash: ["minimize", "dock", "collapse to bar"],
  popmenu: ["dropdowns", "context menus", "quick actions"],
  expandcard: ["row → detail", "accordions", "cards"],
  toast: ["toasts", "notifications", "dismissals"],
  alertbanner: ["banners", "system alerts"],
  success: ["success states", "confirmations", "widgets"],
  badge: ["badges", "notification dots", "counters"],
  chipadd: ["chips", "tags", "filters"],
  chipremove: ["chip removal", "tag clear", "undo"],
  failcollapse: ["error collapse", "field removal"],
  dropreject: ["invalid drop", "refusals"],
  focusring: ["focus rings", "keyboard nav", "inputs"],
  dangerarm: ["destructive confirm", "arm-to-delete"],
  pressbtn: ["buttons", "CTAs", "press feedback"],
  hoverbtn: ["buttons", "hover states", "links"],
  ctabar: ["CTA bars", "sticky footers"],
  viewfade: ["page transitions", "view swaps"],
  formfade: ["form steps", "page transitions"],
  themecut: ["theme switch", "instant swaps"],
  backswipe: ["back navigation", "page transitions"],
  onboard: ["onboarding steps", "wizards", "page transitions"],
  searchbar: ["search widgets", "command bars"],
  navline: ["nav underlines", "active indicators"],
  ticker: ["counters", "tickers", "stat widgets"],
  anchorscroll: ["anchor scroll", "in-page nav"],
  snap: ["drag release", "snap back"],
  dragsnap: ["drag & drop", "grid snap"],
  sheetdismiss: ["bottom sheets", "modals out"],
  lightbox: ["lightboxes", "image zoom", "media"],
  shakefield: ["invalid input", "form errors"],
  aimat: ["spotlights", "targets", "coach marks"],
};

/* ---------- shared bits ---------- */

const stage =
  "relative flex h-[96px] w-full items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-black/10";
const chip = "rounded-full bg-black px-3 py-1.5 text-[11px] font-medium text-white";
const rowCls = "flex h-6 w-40 items-center rounded-md bg-black/[0.06] px-2 ring-1 ring-black/10";

type P = { ease: Ease; d: number };
const loop = (d: number) => ({ repeat: Infinity, repeatDelay: 1.4, duration: d });
const mirror = (d: number) => ({ repeat: Infinity, repeatType: "mirror" as const, repeatDelay: 1.1, duration: d });

/* ---------- vignettes ---------- */

function SwapRows({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="relative h-[60px] w-44">
        <motion.div animate={{ y: [0, 32, 32] }} transition={{ ...mirror(d), ease, times: [0, 0.9, 1] }}
          className="absolute inset-x-0 top-0 flex h-6 items-center rounded-md bg-black px-2 text-[10px] font-medium text-white">Row A</motion.div>
        <motion.div animate={{ y: [0, -32, -32] }} transition={{ ...mirror(d), ease, times: [0, 0.9, 1] }}
          className={`absolute inset-x-0 top-8 ${rowCls} text-[10px] text-black/60`}>Row B</motion.div>
      </div>
    </div>
  );
}

function SegThumb({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="relative flex w-48 rounded-full bg-black/[0.06] p-1 ring-1 ring-black/10">
        <motion.div animate={{ x: [0, 60, 120] }} transition={{ ...mirror(d), ease, times: [0, 0.5, 1] }}
          className="absolute h-6 w-14 rounded-full bg-black" />
        {["Day", "Week", "Month"].map((t) => (
          <span key={t} className="relative z-10 flex h-6 w-[60px] items-center justify-center text-[10.5px] font-medium mix-blend-difference text-white">{t}</span>
        ))}
      </div>
    </div>
  );
}

function Tooltip({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="relative">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, 0] }}
          transition={{ ...loop(d / 1000 * 4), ease, times: [0, 0.18, 0.85, 1] }}
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2.5 py-1 text-[10.5px] text-white">
          Saved to map
        </motion.div>
        <span className={chip}>Hover me</span>
      </div>
    </div>
  );
}

function StashChip({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="flex flex-col items-center gap-2">
        <motion.span animate={{ y: [0, 26], opacity: [1, 0.15], scale: [1, 0.72] }}
          transition={{ ...mirror(d), ease }} className={chip}>Draft brief</motion.span>
        <div className="h-2.5 w-32 rounded-full bg-black/15" />
      </div>
    </div>
  );
}

function PopMenu({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="flex items-start gap-2">
        <span className={chip}>Actions ▾</span>
        <motion.div style={{ transformOrigin: "top left" }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.88, 1, 1, 0.96], y: [-4, 0, 0, -2] }}
          transition={{ ...loop(Math.max(d / 1000 * 5, 2)), ease, times: [0, 0.15, 0.85, 1] }}
          className="w-28 rounded-lg bg-white p-1 shadow-lg ring-1 ring-black/10">
          {["Verify", "Correct", "Dispute"].map((t) => (
            <p key={t} className="rounded px-2 py-1 text-[10.5px] text-black/70">{t}</p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ExpandCard({ ease, d }: P) {
  return (
    <div className={stage}>
      <motion.div animate={{ width: [160, 210], height: [26, 66] }} transition={{ ...mirror(d), ease }}
        className="overflow-hidden rounded-lg bg-black/[0.05] ring-1 ring-black/10">
        <p className="px-2.5 pt-1 text-[10.5px] font-medium">Session One</p>
        <p className="px-2.5 pt-1 text-[9.5px] leading-snug text-black/50">Oct 3 · Durham · 30 seats · paid for residents</p>
      </motion.div>
    </div>
  );
}

function Toast({ ease, d }: P) {
  return (
    <div className={stage}>
      <motion.div animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 0, 90] }}
        transition={{ ...loop(Math.max(d / 1000 * 6, 2.4)), ease, times: [0, 0.1, 0.8, 1] }}
        className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-[11px] text-white">
        Card verified <span className="text-white/50">· just now</span>
      </motion.div>
    </div>
  );
}

function Banner({ ease, d, bottom = false }: P & { bottom?: boolean }) {
  return (
    <div className={stage}>
      <motion.div animate={{ y: [bottom ? 40 : -40, 0], opacity: [0, 1] }} transition={{ ...mirror(d), ease }}
        className={`absolute inset-x-2 ${bottom ? "bottom-2" : "top-2"} rounded-md bg-black px-3 py-1.5 text-[10.5px] text-white`}>
        {bottom ? "Ready to publish? Review 3 contested claims →" : "Connection restored — syncing the map"}
      </motion.div>
    </div>
  );
}

function SuccessPop({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="flex items-center gap-2">
        <motion.span animate={{ scale: [0, 1], opacity: [0, 1] }} transition={{ ...mirror(d), ease }}
          className="flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[11px] text-white">✓</motion.span>
        <span className="text-[11.5px] font-medium">Seat confirmed</span>
      </div>
    </div>
  );
}

function BadgePop({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="relative">
        <span className="rounded-lg bg-black/[0.06] px-3 py-2 text-[11px] font-medium ring-1 ring-black/10">Inbox</span>
        <motion.span animate={{ scale: [0, 1] }} transition={{ ...mirror(d), ease }}
          className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-600 text-[9.5px] font-semibold text-white">3</motion.span>
      </div>
    </div>
  );
}

function ChipOut({ ease, d, collapse = false }: P & { collapse?: boolean }) {
  return (
    <div className={stage}>
      <div className="flex items-center gap-1.5">
        <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[10.5px] ring-1 ring-black/10">Academic</span>
        <motion.span
          animate={collapse ? { scaleY: [1, 0], opacity: [1, 0] } : { opacity: [1, 0], scale: [1, 0.8] }}
          transition={{ ...mirror(d), ease }}
          className="rounded-full bg-black px-2.5 py-1 text-[10.5px] text-white">Athletics ✕</motion.span>
        <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[10.5px] ring-1 ring-black/10">Arts</span>
      </div>
    </div>
  );
}

function FocusRing({ ease, d, danger = false }: P & { danger?: boolean }) {
  return (
    <div className={stage}>
      <div className="relative">
        <span className={`rounded-lg px-4 py-2 text-[11px] font-medium ring-1 ${danger ? "bg-red-600 text-white ring-red-700" : "bg-black/[0.06] ring-black/10"}`}>
          {danger ? "Delete workspace" : "Request a seat"}
        </span>
        <motion.span animate={{ scale: [1.5, 1], opacity: [0, 1] }} transition={{ ...mirror(d), ease }}
          className={`pointer-events-none absolute -inset-1.5 rounded-xl border-2 ${danger ? "border-red-500" : "border-black/60"}`} />
      </div>
    </div>
  );
}

function PressBtn({ ease, d }: P) {
  return (
    <div className={stage}>
      <motion.span animate={{ scale: [1, 0.94, 1] }} transition={{ ...loop(Math.max(d / 1000, 0.6)), ease, times: [0, 0.35, 1] }}
        className="rounded-full bg-black px-5 py-2.5 text-[12px] font-medium text-white">Send to the map</motion.span>
    </div>
  );
}

function HoverBtn({ ease, d }: P) {
  return (
    <div className={stage}>
      <motion.span animate={{ scale: [1, 1.04], backgroundColor: ["#0000000d", "#000000"], color: ["#000000", "#ffffff"] }}
        transition={{ ...mirror(d), ease }}
        className="rounded-full px-5 py-2.5 text-[12px] font-medium ring-1 ring-black/10">Partner with us</motion.span>
    </div>
  );
}

function PageSwap({ ease, d, mode }: P & { mode: "fade" | "slide" | "cut" | "vertical" }) {
  const dur = mode === "cut" ? 0.001 : d / 1000;
  const move = mode === "slide" ? { x: [0, 88] } : mode === "vertical" ? { y: [0, -30] } : {};
  return (
    <div className={stage}>
      <div className="relative h-[72px] w-40 overflow-hidden rounded-md ring-1 ring-black/15">
        <div className="absolute inset-0 bg-black/[0.04] p-2">
          <div className="h-2 w-16 rounded bg-black/30" />
          <div className="mt-1.5 h-1.5 w-24 rounded bg-black/15" />
          <div className="mt-1 h-1.5 w-20 rounded bg-black/15" />
        </div>
        <motion.div animate={{ opacity: [0, 1], ...move }} transition={{ ...mirror(dur), ease }}
          className="absolute inset-0 bg-black p-2">
          <div className="h-2 w-14 rounded bg-white/70" />
          <div className="mt-1.5 h-1.5 w-24 rounded bg-white/30" />
          <div className="mt-1 h-1.5 w-16 rounded bg-white/30" />
        </motion.div>
      </div>
    </div>
  );
}

function SearchExpand({ ease, d }: P) {
  return (
    <div className={stage}>
      <motion.div animate={{ width: [120, 208] }} transition={{ ...mirror(d), ease }}
        className="flex h-8 items-center gap-1.5 overflow-hidden rounded-full bg-black/[0.05] px-3 ring-1 ring-black/10">
        <span className="text-[11px] text-black/40">⌕</span>
        <span className="whitespace-nowrap text-[10.5px] text-black/45">after-school programs in 27701…</span>
      </motion.div>
    </div>
  );
}

function NavLine({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="relative flex gap-5 text-[11.5px] font-medium text-black/60">
        <span>Programs</span><span>Intake</span><span>Gaps</span>
        <motion.span animate={{ x: [0, 62, 116] }} transition={{ ...mirror(d), ease, times: [0, 0.5, 1] }}
          className="absolute -bottom-1.5 left-0 h-[2px] w-12 rounded bg-black" />
      </div>
    </div>
  );
}

function Ticker({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="flex items-baseline gap-2">
        <div className="h-7 overflow-hidden text-[22px] font-medium tabular-nums">
          <motion.div animate={{ y: [0, -28, -56] }} transition={{ ...mirror(d), ease, times: [0, 0.5, 1] }}>
            <div>12</div><div>13</div><div>14</div>
          </motion.div>
        </div>
        <span className="text-[11px] text-black/50">programs verified</span>
      </div>
    </div>
  );
}

function DragSnap({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg border-2 border-dashed border-black/20">
          <motion.span animate={{ x: [26, 0], y: [-14, 0], rotate: [6, 0] }} transition={{ ...mirror(d), ease }}
            className="block size-6 rounded-md bg-black" />
        </div>
        <span className="text-[10.5px] text-black/45">snaps home</span>
      </div>
    </div>
  );
}

function SheetDown({ ease, d }: P) {
  return (
    <div className={stage}>
      <div className="relative h-[72px] w-40 overflow-hidden rounded-md bg-black/[0.04] ring-1 ring-black/15">
        <motion.div animate={{ y: [10, 46] }} transition={{ ...mirror(d), ease }}
          className="absolute inset-x-1 bottom-0 h-12 rounded-t-lg bg-black p-2">
          <div className="mx-auto h-1 w-8 rounded bg-white/40" />
        </motion.div>
      </div>
    </div>
  );
}

function Lightbox({ ease, d }: P) {
  return (
    <div className={stage}>
      <motion.div animate={{ scale: [0.42, 1], borderRadius: ["6px", "10px"] }} transition={{ ...mirror(d), ease }}
        className="h-16 w-24 bg-gradient-to-br from-stone-300 via-stone-400 to-stone-600 ring-1 ring-black/20" />
    </div>
  );
}

function ShakeField({ d }: P) {
  return (
    <div className={stage}>
      <motion.div animate={{ x: [0, -8, 7, -5, 3, 0] }} transition={{ ...loop(Math.max(d / 1000, 0.5)) }}
        className="flex h-9 w-44 items-center rounded-lg bg-white px-3 text-[10.5px] text-black/40 ring-2 ring-red-500">
        Email is required
      </motion.div>
    </div>
  );
}

/* ---------- the dispatcher ---------- */

const MAP: Record<string, (p: P) => React.ReactNode> = {
  reorder: (p) => <SwapRows {...p} />,
  segthumb: (p) => <SegThumb {...p} />,
  tooltip: (p) => <Tooltip {...p} />,
  stash: (p) => <StashChip {...p} />,
  popmenu: (p) => <PopMenu {...p} />,
  expandcard: (p) => <ExpandCard {...p} />,
  toast: (p) => <Toast {...p} />,
  alertbanner: (p) => <Banner {...p} />,
  ctabar: (p) => <Banner {...p} bottom />,
  success: (p) => <SuccessPop {...p} />,
  badge: (p) => <BadgePop {...p} />,
  chipadd: (p) => <BadgePop {...p} />,
  chipremove: (p) => <ChipOut {...p} />,
  failcollapse: (p) => <ChipOut {...p} collapse />,
  dropreject: (p) => <DragSnap {...p} />,
  focusring: (p) => <FocusRing {...p} />,
  aimat: (p) => <FocusRing {...p} />,
  dangerarm: (p) => <FocusRing {...p} danger />,
  pressbtn: (p) => <PressBtn {...p} />,
  hoverbtn: (p) => <HoverBtn {...p} />,
  viewfade: (p) => <PageSwap {...p} mode="fade" />,
  formfade: (p) => <PageSwap {...p} mode="fade" />,
  themecut: (p) => <PageSwap {...p} mode="cut" />,
  backswipe: (p) => <PageSwap {...p} mode="slide" />,
  onboard: (p) => <PageSwap {...p} mode="slide" />,
  anchorscroll: (p) => <PageSwap {...p} mode="vertical" />,
  searchbar: (p) => <SearchExpand {...p} />,
  navline: (p) => <NavLine {...p} />,
  ticker: (p) => <Ticker {...p} />,
  snap: (p) => <DragSnap {...p} />,
  dragsnap: (p) => <DragSnap {...p} />,
  sheetdismiss: (p) => <SheetDown {...p} />,
  lightbox: (p) => <Lightbox {...p} />,
  shakefield: (p) => <ShakeField {...p} />,
};

export function CurveUIDemo({ demo, easing, duration }: { demo: string; easing: string; duration: number }) {
  const ease = parseEase(easing);
  const d = Math.max(duration / 1000, 0.12);
  const render = MAP[demo];
  if (!render) {
    return <div className={stage}><PressBtn ease={ease} d={d} /></div>;
  }
  return <>{render({ ease, d })}</>;
}
