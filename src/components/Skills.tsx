import type { Dictionary } from "@/app/[lang]/dictionaries";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

function ChipGroup({
  label,
  items,
  pending,
}: {
  label: string;
  items: string[];
  pending: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="mb-2.5 text-[13px] text-muted md:mb-3 md:text-sm">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {items.length === 0 ? (
          <li className="rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted md:text-[15px]">
            {pending}
          </li>
        ) : (
          items.map((item, index) => (
            <li key={item}>
              <Reveal delay={index * 40}>
                <span className="block rounded-full border border-line px-4 py-2 text-sm transition duration-200 hover:-translate-y-0.5 hover:border-foreground md:text-[15px]">
                  {item}
                </span>
              </Reveal>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function Skills({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line px-4 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-6 text-[34px] font-semibold tracking-[-0.02em] md:mb-10 md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>
        <ChipGroup label={dict.languages} items={profile.skills.languages} pending={dict.pending} />
        <ChipGroup label={dict.tools} items={profile.skills.tools} pending={dict.pending} />
      </div>
    </section>
  );
}
