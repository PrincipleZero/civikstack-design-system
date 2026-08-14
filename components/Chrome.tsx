"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/registry";

const EXTRA = [
  { id: "curves", name: "Curves" },
  { id: "recipes", name: "Recipes" },
];

/**
 * Nav theming is route-derived here for the same reason it is on the site:
 * the home page opens on black, every catalogue page is light. This is the
 * documented rule in Foundations → Colour, applied to the catalogue itself.
 */
export function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // On the home page the header starts transparent over the black hero and
  // goes solid once light content reaches it. Without this the white wordmark
  // lands on white — the exact failure Foundations → Colour warns about.
  useEffect(() => {
    if (path !== "/") return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  const onDark = path === "/" && !scrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        onDark
          ? "bg-transparent"
          : "border-b border-black/10 bg-white/85 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 md:px-10">
        <Link href="/" className="mr-2 shrink-0">
          <span
            className={`rounded-md px-2 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] ${
              onDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Wayfinder
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          {[...EXTRA, ...CATEGORIES].map((c) => (
            <Link
              key={c.id}
              href={`/${c.id}`}
              className={`text-[14px] transition ${
                onDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** The home page is full-bleed; catalogue pages get the standard gutter. */
export function Main({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/") return <main>{children}</main>;
  // The site's rule: a light page declares itself. Nav reads the route to match.
  return (
    <main className="light-page min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1500px] px-6 pb-28 pt-8 md:px-10">{children}</div>
    </main>
  );
}
