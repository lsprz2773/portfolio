import { SocialIcon, type SocialIconName } from "./SocialIcon";

export type LinkItem = {
  label: string;
  /** Optional icon shown before the label. */
  icon?: SocialIconName;
  /** Accessible name when the visible label is not enough, e.g. "Instagram: przls27". */
  ariaLabel?: string;
  /** Final URL (https, mailto, tel). `null` while the data is pending. */
  href: string | null;
  /** Text shown on the right when there is no arrow, e.g. an email address. */
  value?: string | null;
};

type LinkListProps = {
  items: LinkItem[];
  pendingLabel: string;
  tone?: "light" | "dark";
};

/** Vertical list of links with a trailing arrow, as in the reference design. */
export function LinkList({ items, pendingLabel, tone = "light" }: LinkListProps) {
  const dark = tone === "dark";
  const border = dark ? "border-dark-line" : "border-line";
  const muted = dark ? "text-dark-muted" : "text-muted";

  return (
    <ul className={`border-t ${dark ? "border-dark-line" : "border-foreground"}`}>
      {items.map((item) => {
        const external = item.href?.startsWith("https://");
        const row = (
          <span className="flex items-center justify-between py-3.5 text-[17px]">
            <span className="flex items-center gap-3">
              {item.icon && <SocialIcon name={item.icon} />}
              {item.label}
            </span>
            {item.href ? (
              <span
                aria-hidden={item.value ? undefined : true}
                className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
              >
                {item.value ? item.value : "↗"}
              </span>
            ) : (
              <span className={muted}>{pendingLabel}</span>
            )}
          </span>
        );

        return (
          <li key={item.label} className={`border-b ${border}`}>
            {item.href ? (
              <a
                href={item.href}
                aria-label={item.ariaLabel}
                className="group block transition-colors hover:text-accent"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {row}
              </a>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ul>
  );
}
