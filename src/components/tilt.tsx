"use client";

import { useRef, type ReactNode } from "react";

export function Tilt({
  children,
  className = "",
  max = 12,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--scale", String(scale));
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--scale", "1");
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className={`scene relative ${className}`}
      style={{
        ["--rx" as string]: "0deg",
        ["--ry" as string]: "0deg",
        ["--scale" as string]: "1",
      }}
    >
      <div
        className="layer-3d relative h-full transition-transform duration-300 ease-out-soft"
        style={{
          transform:
            "rotateX(var(--rx)) rotateY(var(--ry)) scale3d(var(--scale), var(--scale), var(--scale))",
        }}
      >
        {children}
      </div>
    </div>
  );
}
