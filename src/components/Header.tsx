"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type HeaderProps = {
  lang: Locale;
  dict: Dictionary["nav"];
};

const sections = ["work", "services", "experience", "contact"] as const;

/**
 * The language links are plain anchors on purpose: /en and /es have different
 * root layouts, and a full page load is what lets the browser fade between them.
 * This also tells the next page to skip its intro animations (see the layout script).
 */
function markLanguageSwitch() {
  try {
    sessionStorage.setItem("lang-switch", "1");
  } catch {
    // Storage can be blocked; the page then just plays its intro again.
  }
}

function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  return (
    <span
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-sm"
    >
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page load is intentional */}
      <a
        href="/en"
        hrefLang="en"
        onClick={markLanguageSwitch}
        aria-current={lang === "en" ? "true" : undefined}
        className={lang === "en" ? "font-bold" : "text-muted hover:text-foreground"}
      >
        EN
      </a>
      <span aria-hidden>/</span>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page load is intentional */}
      <a
        href="/es"
        hrefLang="es"
        onClick={markLanguageSwitch}
        aria-current={lang === "es" ? "true" : undefined}
        className={lang === "es" ? "font-bold" : "text-muted hover:text-foreground"}
      >
        ES
      </a>
    </span>
  );
}

export function Header({ lang, dict }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-in sticky top-0 z-50 border-b border-line bg-background">
      <span aria-hidden className="scroll-progress" />
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-16 md:py-5">
        <nav className="hidden gap-8 text-[15px] text-muted md:flex" aria-label="Main">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="link-underline pb-0.5 transition-colors hover:text-foreground"
            >
              {dict[id]}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:gap-5">
          <span className="hidden items-center gap-2 text-sm text-muted lg:flex">
            <span className="dot-live h-2 w-2 rounded-full bg-available" aria-hidden />
            {dict.available}
          </span>
          <LanguageSwitcher lang={lang} label={dict.language} />
          <button
            type="button"
            aria-label={dict.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="tap flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg md:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="menu-sheet border-t border-line bg-background px-4 py-2 md:hidden"
      >
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setOpen(false)}
            className="block border-b border-line py-4 text-lg last:border-b-0"
          >
            {dict[id]}
          </a>
        ))}
      </nav>
    </header>
  );
}
