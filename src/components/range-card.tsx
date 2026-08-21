"use client";

import Image from "next/image";
import Link from "next/link";
import { Tilt } from "@/components/tilt";
import type { Range, Tone } from "@/lib/products";

/** The finish shows in the wash under the artwork, not in the card itself. */
const wash: Record<Tone, string> = {
  steel: "from-[#E8EEF2]",
  zinc: "from-[#F5EEDF]",
  black: "from-[#EAECEE]",
};

export function RangeCard({ range, count }: { range: Range; count: number }) {
  return (
    <Tilt className="group h-full" max={8}>
      <Link
        href={`/products/${range.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-tile border border-line bg-white shadow-(--shadow-plate) transition-shadow duration-300 group-hover:shadow-(--shadow-lift)"
      >
        <div className="relative aspect-16/10 overflow-hidden bg-white">
          <span
            className="layer-3d absolute inset-0 flex items-center justify-center p-8 transition-transform duration-500 ease-out-soft group-hover:-translate-y-2 group-hover:scale-105"
            style={{ transform: "translateZ(34px)" }}
          >
            <Image
              src={range.heroPhoto}
              alt={range.name}
              width={760}
              height={760}
              sizes="(max-width: 768px) 90vw, 380px"
              className="h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(8,12,17,.28)]"
            />
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t to-transparent opacity-70 ${wash[range.tone]}`}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 blueprint-light opacity-40"
          />
          <span className="absolute left-5 top-5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-ink">
            {range.code}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[1.28rem] font-semibold tracking-tight">
            {range.shortName}
          </h3>
          <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink/65">
            {range.intro}
          </p>
          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-ink">
              Open range →
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
              {count} lines
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
