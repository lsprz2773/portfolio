import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { contactLinks } from "@/content/links";
import { profile } from "@/content/profile";
import { LinkList } from "./LinkList";
import { Reveal } from "./Reveal";

type ContactProps = {
  lang: Locale;
  dict: Dictionary["contact"];
  pending: string;
};

export function Contact({ lang, dict, pending }: ContactProps) {
  // The CV opens in a new tab; the browser's PDF viewer already offers a download button.
  const cvPath = profile.cv[lang];

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-dark px-4 py-[72px] text-background md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-7 text-[44px] font-bold uppercase leading-[1.05] tracking-[-0.02em] md:mb-14 md:text-[clamp(56px,7vw,88px)] md:leading-[0.95] md:tracking-[-0.03em]">
            {dict.titleLine1}
            <br />
            {dict.titleLine2}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="lg:w-[360px] lg:flex-none">
            <LinkList items={contactLinks(dict)} pendingLabel={pending} tone="dark" />
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            {cvPath ? (
              <a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn cta-button rounded-full bg-accent px-7 py-4 text-center text-base font-medium text-white"
              >
                {dict.viewCv}
              </a>
            ) : (
              <>
                <span
                  aria-disabled="true"
                  className="rounded-full bg-accent px-7 py-4 text-center text-base font-medium text-white opacity-60"
                >
                  {dict.viewCv}
                </span>
                <span className="text-center text-[13px] text-dark-muted lg:text-right">
                  {dict.cvPending}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
