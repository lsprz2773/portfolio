import type { Dictionary } from "@/app/[lang]/dictionaries";
import { contactLinks } from "@/content/links";
import { profile } from "@/content/profile";
import { LinkList } from "./LinkList";
import { Reveal } from "./Reveal";

export function Contact({ dict, pending }: { dict: Dictionary["contact"]; pending: string }) {
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
            {profile.cvPath ? (
              <a
                href={profile.cvPath}
                download
                className="tap cta-button rounded-full bg-accent px-7 py-4 text-center text-base font-medium text-white"
              >
                {dict.downloadCv}
              </a>
            ) : (
              <>
                <span
                  aria-disabled="true"
                  className="rounded-full bg-accent px-7 py-4 text-center text-base font-medium text-white opacity-60"
                >
                  {dict.downloadCv}
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
