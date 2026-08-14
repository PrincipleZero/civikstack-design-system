import type { Metadata } from "next";
import { Nav, Main } from "@/components/Chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayfinder — the CivikStack design system",
  description:
    "Wayfinder: the CivikStack site, catalogued — foundations, elements, motion, primitives, sections and templates — the source every other asset is built from.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
