import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Reveal } from "./Reveal";

export function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <section id="services" className="scroll-mt-20 bg-surface-alt px-4 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-6 text-[34px] font-semibold tracking-[-0.02em] md:mb-12 md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <div className="grid gap-6 md:gap-12 lg:grid-cols-3">
          {dict.items.map((item, index) => (
            <Reveal key={index} delay={index * 80} className="group">
              <span className="mb-3 block text-sm font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="line-grow mb-4 block h-px w-full bg-foreground" />
              <h3 className="mb-1.5 text-[19px] font-semibold transition-transform duration-300 group-hover:translate-x-2 md:mb-3 md:text-[22px]">
                {item.name}
              </h3>
              <p className="text-[15px] text-muted md:text-base">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
