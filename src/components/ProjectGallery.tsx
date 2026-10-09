"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type ProjectGalleryProps = {
  images: string[];
  alt: string;
  /** Accessible label for the jump buttons, e.g. "Show image". */
  label: string;
  /** Time each image stays on screen, in ms. */
  interval?: number;
};

/**
 * Preview that changes image by itself: a soft fade with a small rise, and a
 * thin progress bar per image. The bar's CSS animation drives the timing, so
 * pausing (hover, off screen, hidden tab) is just pausing that animation.
 * With reduced motion there is no autoplay; the bars still jump to an image.
 */
export function ProjectGallery({ images, alt, label, interval = 4500 }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onChange = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const paused = hovered || !onScreen || tabHidden;
  const count = images.length;

  return (
    <div
      ref={rootRef}
      onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[2/1] overflow-hidden rounded-xl border border-line bg-placeholder">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === index ? `${alt} (${i + 1}/${count})` : ""}
            aria-hidden={i === index ? undefined : true}
            fill
            unoptimized
            sizes="(min-width: 1024px) 560px, 100vw"
            data-active={i === index}
            className="gallery-slide object-cover object-top"
          />
        ))}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center gap-3">
          <div className="flex flex-1 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${label} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="group/bar flex-1 py-2"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-line">
                  {i < index && <span className="block h-full w-full bg-foreground" />}
                  {i === index && (
                    <span
                      className="gallery-fill block h-full w-full bg-accent"
                      style={
                        {
                          "--gallery-interval": `${interval}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        } as CSSProperties
                      }
                      onAnimationEnd={() => setIndex((current) => (current + 1) % count)}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <span className="text-xs tabular-nums text-muted" aria-hidden>
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
