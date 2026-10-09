"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  /** Maximum shift in px at the edges of the window. */
  strength?: number;
  className?: string;
};

/**
 * Moves its content slightly with the pointer. Only active with a fine
 * pointer on wide screens, and never when the user prefers reduced motion.
 */
export function Parallax({ children, strength = 14, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    if (!enabled.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        element.style.setProperty("--px", `${(x * strength).toFixed(1)}px`);
        element.style.setProperty("--py", `${(y * strength).toFixed(1)}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}
