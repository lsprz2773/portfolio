import type { Dictionary } from "@/app/[lang]/dictionaries";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line px-4 py-6 text-[13px] text-muted md:px-16 md:py-7 md:text-sm">
      <div className="mx-auto flex max-w-[1280px] justify-center md:justify-start">
        <span>{dict.copyright}</span>
      </div>
    </footer>
  );
}
