import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { DotField } from "@/components/DotField";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "404 | Luis Angel Perez Aguilera",
  description: "Page not found. Página no encontrada.",
};

/**
 * 404 for any URL that matches no route. The page has no language of its own
 * (the URL has none), so it speaks both and links to each home page.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body>
        <DotField />
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p
            className="text-[clamp(120px,28vw,320px)] font-bold leading-[0.85] tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: "var(--stroke) var(--foreground)" }}
          >
            404
          </p>
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] md:text-5xl">Page not found</h1>
          <p className="mt-2 text-lg text-muted md:text-xl">Página no encontrada</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {/* Plain anchors on purpose: /en and /es have different root layouts */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/en"
              className="btn btn-solid rounded-full bg-foreground px-6 py-3.5 text-[15px] font-medium text-background"
            >
              Back to home
            </a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/es"
              className="btn btn-outline rounded-full border border-foreground px-6 py-3.5 text-[15px] font-medium"
            >
              Volver al inicio
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
