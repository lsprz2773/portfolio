type MarqueeProps = {
  items: string[];
};

/** Decorative looping band of keywords. Hidden from assistive technology. */
export function Marquee({ items }: MarqueeProps) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {[...items, ...items].map((item, index) => (
        <li
          key={index}
          className="flex items-center whitespace-nowrap px-5 text-[28px] font-bold uppercase tracking-[-0.02em] md:px-9 md:text-5xl"
        >
          <span
            className={index % 2 === 0 ? "text-foreground" : "text-transparent"}
            style={index % 2 === 0 ? undefined : { WebkitTextStroke: "var(--stroke) var(--foreground)" }}
          >
            {item}
          </span>
          <span className="ml-5 h-2 w-2 rounded-full bg-accent md:ml-9 md:h-2.5 md:w-2.5" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden className="marquee-wrap overflow-hidden border-t border-line py-5 md:py-7">
      <div className="marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
