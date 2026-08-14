import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "CivikStack Design System",
  description: "The site, broken into foundations, primitives, sections and templates — the source every other asset is built from.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 md:px-10">
            <Link href="/" className="mr-2 shrink-0">
              <span className="rounded-md bg-black px-2 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-white">
                CivikStack Design System
              </span>
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-1">
              {[{ id: "curves", name: "Curves" }, { id: "recipes", name: "Recipes" }].map((c) => (
                <Link key={c.id} href={`/${c.id}`}
                  className="text-[14px] text-black/60 transition hover:text-black">
                  {c.name}
                </Link>
              ))}
              {CATEGORIES.map((c) => (
                <Link key={c.id} href={`/${c.id}`}
                  className="text-[14px] text-black/60 transition hover:text-black">
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-6 pb-28 pt-8 md:px-10">{children}</main>
      </body>
    </html>
  );
}
