import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Reveal } from "./Reveal";

export function Work({ dict }: { dict: Dictionary["work"] }) {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line px-4 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-6 text-[34px] font-semibold tracking-[-0.02em] md:mb-12 md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {dict.items.map((item, index) => (
            <Reveal key={index} delay={index * 100}>
              <article className="card-lift group h-full rounded-2xl border border-line bg-surface p-4 md:p-5">
                <div className="h-[180px] overflow-hidden rounded-xl md:h-[260px]">
                  <div className="flex h-full items-center justify-center bg-placeholder p-4 text-center text-sm text-muted transition-transform duration-500 group-hover:scale-105 md:text-base">
                    {dict.imagePending}
                  </div>
                </div>
                <h3 className="mb-1.5 mt-4 flex items-center text-xl font-semibold md:mb-2 md:mt-6 md:text-2xl">
                  {item.name}
                  <span
                    aria-hidden
                    className="ml-2 inline-block -translate-x-1 text-accent opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    &#8599;
                  </span>
                </h3>
                <p className="mb-3 text-[15px] text-muted md:mb-4 md:text-base">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {item.tech.map((tech, techIndex) => (
                    <li
                      key={techIndex}
                      className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
