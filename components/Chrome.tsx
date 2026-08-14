"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";

/**
 * The header is now just a wordmark and a Menu button; navigation lives in a
 * side panel built from Wayfinder's own catalogued specs: backdrop fades 0.35s,
 * items rise from y30 on a 0.06s stagger, everything on the signature curve —
 * the same grammar as the Foundation site's menu (see Motion → Menu overlay).
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { id: "curves", name: "Curves" },
  { id: "recipes", name: "Recipes" },
  ...CATEGORIES.map((c) => ({ id: c.id as string, name: c.name })),
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Home starts transparent over the black hero and goes solid when light
  // content reaches the header — the documented rule in Foundations → Colour.
  useEffect(() => {
    if (path !== "/") return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  // Route change closes the panel; Esc closes it; body scroll locks while open.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = path === "/" && !scrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors ${
          onDark ? "bg-transparent" : "border-b border-black/10 bg-white/85 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 py-4 md:px-10">
          <Link href="/" className="shrink-0">
            <span
              className={`rounded-md px-2 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] ${
                onDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Wayfinder
            </span>
          </Link>

          {/* The main categories live in the bar; Curves, Recipes and Admin
              stay in the panel. Hidden on small screens — the panel covers those. */}
          <nav className="hidden flex-wrap gap-x-5 gap-y-1 md:flex">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}`}
                aria-current={path === `/${c.id}` ? "page" : undefined}
                className={`text-[14px] transition ${
                  onDark
                    ? path === `/${c.id}` ? "text-white" : "text-white/60 hover:text-white"
                    : path === `/${c.id}` ? "text-black" : "text-black/60 hover:text-black"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-transform hover:scale-[1.04] ${
              onDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* scrim — 0.35s fade, the measured backdrop timing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/50"
            />
            {/* the side panel */}
            <motion.aside
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-black text-white"
            >
              <div className="flex items-center justify-between px-8 py-5">
                <span className="rounded-md bg-white px-2 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-black">
                  Wayfinder
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black transition-transform hover:scale-[1.04]"
                >
                  Close
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 py-6">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                  >
                    <Link
                      href={`/${l.id}`}
                      aria-current={path === `/${l.id}` ? "page" : undefined}
                      className={`block text-[32px] font-medium uppercase leading-[1.25] tracking-tight transition-opacity hover:opacity-50 md:text-[40px] ${
                        path === `/${l.id}` ? "opacity-50" : ""
                      }`}
                    >
                      {l.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.06 * LINKS.length, ease: EASE }}
                className="border-t border-white/15 px-8 py-5"
              >
                <a href="/admin" className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/50 transition-colors hover:text-white">
                  Admin — edit the catalogue →
                </a>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/** The home page is full-bleed; catalogue pages get the light wrapper. */
export function Main({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/") return <main>{children}</main>;
  // Full-bleed: each page opens with its hero band; body content wraps itself
  // in <Gutter>.
  return <main className="light-page min-h-screen bg-white text-black">{children}</main>;
}
