"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms, used to stagger siblings. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its content in when it enters the viewport.
 * The visual values live in globals.css (.reveal) so mobile and
 * reduced-motion rules stay in one place.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.visible = "true";
          observer.disconnect();
        }
      },
      // Wait until the element is well inside the screen, so the motion is seen
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
