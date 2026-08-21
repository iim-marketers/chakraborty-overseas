"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tilt } from "@/components/tilt";

const HEX = "96,50 73,89.8 27,89.8 4,50 27,10.2 73,10.2";

const bolts = [
  {
    slug: "stainless-steel",
    name: "Stainless",
    finish: "Bright / passivated",
    marks: ["A2-70", "A4-80"],
    note: "SS 304 and 316 — the range specified when the fastener has to outlive the structure.",
    src: "/cutouts/stage/hex-bolt.webp",
    w: 702,
    h: 415,
    /** This pair lies flat in frame, so it needs a little more width to match. */
    zoom: 1.16,
    alt: "Two stainless steel hex head bolts, the grade stamped on the head",
  },
  {
    slug: "mild-steel",
    name: "Mild steel",
    finish: "Yellow zinc plated",
    marks: ["4.6", "4.8", "5.8"],
    note: "Carbon steel in every plating a project asks for — the everyday volume range.",
    src: "/cutouts/stage/zinc-bolt.webp",
    w: 782,
    h: 608,
    zoom: 1,
    alt: "Two yellow zinc plated mild steel hex bolts, property class 4.8 stamped on the head",
  },
  {
    slug: "high-tension",
    name: "High tension",
    finish: "Black oxide",
    marks: ["8.8", "10.9", "12.9"],
    note: "Heat treated alloy steel, for the joints that actually carry the load.",
    src: "/cutouts/stage/black-bolt.webp",
    w: 702,
    h: 552,
    zoom: 0.98,
    alt: "Two black oxide high tension hex bolts",
  },
] as const;

/** 0 = centre stage, 1 = waiting on the right, 2 = waiting on the left. */
const slots = [
  { x: "50%", z: 92, scale: 1, opacity: 1, blur: 0 },
  { x: "90%", z: -80, scale: 0.56, opacity: 0.3, blur: 1.6 },
  { x: "10%", z: -80, scale: 0.56, opacity: 0.3, blur: 1.6 },
];

const DWELL = 5400;

export function GradeStage() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const bolt = bolts[active];

  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % bolts.length),
      DWELL,
    );
    return () => clearTimeout(id);
  }, [active, held]);

  return (
    <div
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* ---------------------------- the stage ---------------------------- */}
      <Tilt className="h-66 sm:h-72 lg:h-80" max={7}>
        <span className="blueprint absolute inset-0 opacity-70" aria-hidden />

        {/* studio backlight behind whichever bolt is centre stage */}
        <span
          aria-hidden
          className="absolute bottom-[24%] left-1/2 h-44 w-72 rounded-[50%] bg-[radial-gradient(closest-side,rgba(231,200,120,0.2),rgba(231,200,120,0.04)_62%,transparent)] blur-xl"
          style={{ transform: "translateX(-50%) translateZ(-24px)" }}
        />

        {/* the floor the bolts stand on */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-b from-white/7 to-transparent"
        />
        <span
          aria-hidden
          className="absolute inset-x-8 bottom-[30%] h-px bg-linear-to-r from-transparent via-gold/55 to-transparent"
        />

        {bolts.map((b, i) => {
          const s = slots[(i - active + bolts.length) % bolts.length];
          return (
            <button
              key={b.slug}
              type="button"
              tabIndex={-1}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="absolute bottom-[30%] w-[46%] max-w-58 cursor-pointer transition-[transform,opacity,filter] duration-700 ease-out-soft"
              style={{
                left: s.x,
                opacity: s.opacity,
                filter: s.blur ? `blur(${s.blur}px)` : undefined,
                transform: `translateX(-50%) translateZ(${s.z}px) scale(${s.scale * b.zoom})`,
                transformOrigin: "50% 100%",
              }}
            >
              <Image
                src={b.src}
                alt={b.alt}
                width={b.w}
                height={b.h}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="(max-width: 640px) 46vw, 240px"
                className="block h-auto w-full drop-shadow-[0_24px_26px_rgba(0,0,0,0.6)]"
              />
              {/* the bolt again, upside down, as its reflection in the floor */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-full -scale-y-100 [-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,0.5),transparent_62%)] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.5),transparent_62%)]"
              >
                <Image
                  src={b.src}
                  alt=""
                  width={b.w}
                  height={b.h}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 46vw, 240px"
                  className="block h-auto w-full opacity-40"
                />
              </span>
            </button>
          );
        })}

        {/* the two waiting bolts melt into the edges of the panel */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-carbon to-transparent"
        />
        <span
          aria-hidden
          className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-carbon to-transparent"
        />
      </Tilt>

      {/* --------------------------- the readout --------------------------- */}
      <div
        key={bolt.slug}
        className="animate-fade-in border-t border-white/10 px-6 py-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-gold-light">
              {bolt.finish}
            </p>
            <Link
              href={`/products/${bolt.slug}`}
              className="group mt-1 inline-flex items-baseline gap-2 font-display text-[1.15rem] font-semibold tracking-tight text-ivory transition-colors hover:text-gold-light"
            >
              {bolt.name}
              <span
                className="font-mono text-[0.7rem] text-gold transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>

          {/* the head marks you will find stamped on that range */}
          <ul className="flex items-center gap-1.5">
            {bolt.marks.map((m) => (
              <li key={m} className="relative block w-10">
                <svg viewBox="0 0 100 100" className="block w-full" aria-hidden>
                  <polygon
                    points={HEX}
                    fill="#1E2833"
                    className="stroke-gold/45"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`absolute inset-0 grid place-items-center font-mono font-medium leading-none text-ivory ${
                    m.length > 3 ? "text-[0.5rem]" : "text-[0.62rem]"
                  }`}
                >
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 min-h-[2.9em] text-[0.82rem] leading-relaxed text-steel-light text-pretty">
          {bolt.note}
        </p>
      </div>

      {/* ---------------------------- the picker --------------------------- */}
      <div className="grid grid-cols-3 gap-px border-y border-white/10 bg-white/8">
        {bolts.map((b, i) => (
          <button
            key={b.slug}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`relative cursor-pointer bg-carbon px-2 py-3.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] transition-colors ${
              i === active
                ? "text-gold-light"
                : "text-steel hover:text-steel-light"
            }`}
          >
            {b.name}
            <span
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-px transition-colors ${
                i === active ? "bg-gold" : "bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
