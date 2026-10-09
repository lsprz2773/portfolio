import type { Dictionary } from "@/app/[lang]/dictionaries";
import { profile } from "@/content/profile";
import { ProjectGallery } from "./ProjectGallery";
import { Reveal } from "./Reveal";

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline inline-flex items-center gap-1 pb-0.5 text-[15px] font-medium transition-colors hover:text-accent"
    >
      {label}
      <span aria-hidden>&#8599;</span>
    </a>
  );
}

export function Work({ dict }: { dict: Dictionary["work"] }) {
  const columns = dict.items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section id="work" className="scroll-mt-20 border-t border-line px-4 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-6 text-[34px] font-semibold tracking-[-0.02em] md:mb-12 md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <div className={`grid gap-4 md:gap-6 ${columns}`}>
          {dict.items.map((item, index) => {
            const links = profile.projects[index];

            return (
              <Reveal key={item.name} delay={index * 100} className="h-full">
                <article className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 md:p-5">
                  {links?.images.length ? (
                    <ProjectGallery
                      images={links.images}
                      alt={item.name}
                      label={dict.showImage}
                      interval={4500 + index * 800}
                    />
                  ) : (
                    <div className="aspect-[2/1] overflow-hidden rounded-xl">
                      <div className="flex h-full items-center justify-center bg-placeholder p-4 text-center text-sm text-muted transition-transform duration-500 group-hover:scale-105 md:text-base">
                        {dict.imagePending}
                      </div>
                    </div>
                  )}

                  <h3 className="mb-1.5 mt-4 text-xl font-semibold md:mb-2 md:mt-6 md:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mb-3 text-[15px] text-muted md:mb-4 md:text-base">
                    {item.description}
                  </p>

                  <ul className="mb-5 flex flex-wrap gap-1.5">
                    {item.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
                    {links?.github && <ProjectLink href={links.github} label={dict.github} />}
                    {links?.demo && <ProjectLink href={links.demo} label={dict.demo} />}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
