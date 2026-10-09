import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { contactLinks } from "@/content/links";
import { profile } from "@/content/profile";
import { LinkList } from "./LinkList";
import { Parallax } from "./Parallax";

type HeroProps = {
  dict: Dictionary;
};

export function Hero({ dict }: HeroProps) {
  const { hero, contact, common } = dict;

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-10 md:px-16 md:pb-24 md:pt-14"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="hero-rise relative z-10 mb-2 text-lg text-muted md:mb-3 md:text-center md:text-2xl">
          {hero.hello}
        </p>

        <h1
          className="relative z-10 text-[clamp(40px,9vw,124px)] font-bold uppercase leading-[0.92] tracking-[-0.03em] md:text-center"
        >
          <span
            className="hero-rise block text-transparent transition-colors duration-500 hover:text-foreground"
            style={{ WebkitTextStroke: "var(--stroke) var(--foreground)", animationDelay: "100ms" }}
          >
            {hero.firstName}
          </span>
          <span className="block">
            <span className="name-fill relative inline-block">
              {hero.lastName}
              <svg
                aria-hidden
                viewBox="0 0 400 24"
                preserveAspectRatio="none"
                className="scribble pointer-events-none absolute -bottom-2 left-0 h-4 w-full text-accent md:h-6"
              >
                <path
                  d="M4 16 C 60 4, 120 22, 190 12 S 320 6, 396 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                />
              </svg>
            </span>
          </span>
        </h1>

        <div className="relative z-20 mt-8 w-full md:mx-auto md:mt-10 md:max-w-[300px] lg:absolute lg:left-1/2 lg:top-[150px] lg:mt-0 lg:w-[300px] lg:max-w-none lg:-translate-x-1/2">
          <Parallax>
            <div className="photo-card relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-placeholder p-6 text-center text-sm text-muted lg:h-[380px]">
          {profile.photoPath ? (
            <Image
              src={profile.photoPath}
              alt={`${hero.firstName} ${hero.lastName}`}
              fill
              priority
              sizes="300px"
              className="object-cover"
            />
          ) : (
              hero.photoPending
            )}
            </div>
          </Parallax>
        </div>

        <div className="relative z-30 mt-10 flex flex-col gap-10 lg:mt-[260px] lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="hero-rise min-w-0 flex-1" style={{ animationDelay: "700ms" }}>
            <p className="mb-1.5 text-xl font-semibold">{hero.role}</p>
            <p className="mb-7 max-w-[520px] text-lg text-muted">{hero.intro}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="btn btn-solid rounded-full bg-foreground px-6 py-3.5 text-[15px] font-medium text-background"
              >
                {hero.getInTouch}
              </a>
              <a
                href="#work"
                className="btn btn-outline rounded-full border border-foreground px-6 py-3.5 text-[15px] font-medium"
              >
                {hero.viewWork}
              </a>
            </div>
          </div>

          <div className="hero-rise w-full lg:w-[340px] lg:flex-none" style={{ animationDelay: "850ms" }}>
            <LinkList items={contactLinks(contact)} pendingLabel={common.pending} />
          </div>
        </div>
      </div>
    </section>
  );
}
