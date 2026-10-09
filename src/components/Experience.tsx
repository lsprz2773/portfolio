import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Reveal } from "./Reveal";

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  return (
    <section id="experience" className="scroll-mt-20 px-4 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-6 text-[34px] font-semibold tracking-[-0.02em] md:mb-12 md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <div className="grid gap-6 md:gap-16 lg:grid-cols-2">
          <Reveal className="reveal-left relative border-l-2 border-line pl-4 md:pl-6">
            <span aria-hidden className="dot-accent absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-accent" />
            <p className="mb-1 text-[13px] text-muted md:text-sm">{dict.educationLabel}</p>
            <h3 className="mb-1.5 text-lg font-semibold md:text-xl">{dict.degree}</h3>
            <p className="text-[15px] text-muted md:text-base">{dict.institutionPending}</p>
          </Reveal>

          <Reveal delay={100} className="reveal-left relative border-l-2 border-line pl-4 md:pl-6">
            <span aria-hidden className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />
            <p className="mb-1 text-[13px] text-muted md:text-sm">{dict.experienceLabel}</p>
            <p className="text-[15px] text-muted md:text-base">{dict.experiencePending}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
