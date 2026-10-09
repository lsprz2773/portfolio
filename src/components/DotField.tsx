"use client";

import { useEffect, useRef } from "react";

const SPACING = 30; // px between dots
const RADIUS = 150; // pointer influence radius in px
const PUSH = 14; // max displacement in px
const EASE = 0.12; // 0-1, higher settles faster
const RGB = "20, 20, 19";

type Dot = { x: number; y: number; dx: number; dy: number };

/**
 * Fixed background of small dots. Near the pointer they drift away and grow
 * slightly. The page scrolls over it, which gives a parallax feel.
 * With touch input or reduced motion it is drawn once and stays still.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    const step = (): boolean => {
      ctx.clearRect(0, 0, width, height);
      let moving = false;

      for (const dot of dots) {
        let targetX = 0;
        let targetY = 0;
        let near = 0;

        const vx = dot.x - pointer.x;
        const vy = dot.y - pointer.y;
        const distance = Math.hypot(vx, vy);
        if (distance > 0 && distance < RADIUS) {
          near = (1 - distance / RADIUS) ** 2;
          targetX = (vx / distance) * near * PUSH;
          targetY = (vy / distance) * near * PUSH;
        }

        dot.dx += (targetX - dot.dx) * EASE;
        dot.dy += (targetY - dot.dy) * EASE;
        if (Math.abs(targetX - dot.dx) > 0.05 || Math.abs(targetY - dot.dy) > 0.05) {
          moving = true;
        }

        ctx.fillStyle = `rgba(${RGB}, ${0.14 + near * 0.3})`;
        ctx.beginPath();
        ctx.arc(dot.x + dot.dx, dot.y + dot.dy, 1.1 + near * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      return moving;
    };

    const tick = () => {
      if (step()) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (running || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const startX = (width - (cols - 1) * SPACING) / 2;
      const startY = (height - (rows - 1) * SPACING) / 2;

      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({ x: startX + col * SPACING, y: startY + row * SPACING, dx: 0, dy: 0 });
        }
      }
      step();
    };

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(build);
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      wake();
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      wake();
    };

    build();
    window.addEventListener("resize", onResize);
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
