"use client";

import { useEffect, useState } from "react";

type Entry = { id: string; heading: string };

export function LegalToc({ sections }: { sections: Entry[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const ids = sections.map((s) => s.id).join(",");

  useEffect(() => {
    const els = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const line = 120;
    let frame = 0;

    const measure = () => {
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top > line) break;
        current = el.id;
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4)
        current = els[els.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return (
    <nav className="mt-4 grid">
      {sections.map((s) => {
        const on = s.id === activeId;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={on ? "location" : undefined}
            className={`border-l-2 py-1.5 pl-4 text-[0.84rem] leading-snug transition-colors duration-200 ${
              on
                ? "border-gold font-medium text-gold-ink"
                : "border-line text-ink/60 hover:border-ink/25 hover:text-ink"
            }`}
          >
            {s.heading}
          </a>
        );
      })}
    </nav>
  );
}
