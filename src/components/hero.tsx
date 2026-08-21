"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

type Layer = {
  src: string;
  alt: string;
  className: string;
  depth: number;
  spin?: number;
  delay?: number;
};

const layers: Layer[] = [
  {
    src: "/cutouts/hex-bolt.webp",
    alt: "Stainless steel hex bolt and nut",
    className: "left-[13%] top-[20%] w-[56%]",
    depth: 46,
    spin: -6,
  },
  {
    src: "/cutouts/hex-nut.webp",
    alt: "High tensile hex nuts",
    className: "left-[-2%] bottom-[4%] w-[32%]",
    depth: 78,
    spin: 4,
    delay: 900,
  },
  {
    src: "/cutouts/black-bolt.webp",
    alt: "High tensile bolts, black finish",
    className: "right-[-1%] top-[10%] w-[27%]",
    depth: 96,
    spin: 8,
    delay: 400,
  },
  {
    src: "/cutouts/zinc-bolt.webp",
    alt: "Yellow zinc plated hex bolts",
    className: "right-[6%] bottom-[16%] w-[26%]",
    depth: 116,
    spin: -6,
    delay: 1400,
  },
];

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gold/12 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink"
        aria-hidden
      />

      <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-6 lg:py-24">
        <div className="min-w-0 max-w-xl animate-[var(--animate-rise)]">
          <p className="eyebrow">Mild steel · Stainless steel · High tension</p>

          <h1 className="mt-6 text-[clamp(2.5rem,6.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance">
            <span className="block text-[0.42em] font-light tracking-[0.01em] text-steel-light">
              Sourcing fasteners out of India?
            </span>
            The bolt is <span className="gold-text">the easy part.</span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-steel-light text-pretty">
            Finding a mill that holds the grade, meets the shipment date and hands over documents
            that clear customs — that is the work. {site.name} is a merchant exporter in Kolkata. We
            source from verified Indian manufacturing partners, check the goods against your
            specification, and ship them properly packed and papered.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-gold">
              View products
            </Link>
            <Link href="/contact" className="btn btn-outline-light">
              Get a quote
            </Link>
          </div>

          <dl className="mt-11 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3">
            {[
              ["IEC", site.registrations.iec],
              ["GSTIN", site.registrations.gstin],
              ["EEPC RCMC", site.registrations.rcmc],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-light">
                  {k}
                </dt>
                <dd className="mt-1.5 font-mono text-[0.76rem] leading-snug text-steel-light">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------- 3D assembly ---------------- */}
        <div
          ref={stage}
          className="scene relative mx-auto aspect-square w-full min-w-0 max-w-[540px]"
          style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
        >
          {/* dimension ring */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full animate-[var(--animate-spin-slow)] opacity-70"
            aria-hidden
          >
            <circle cx="200" cy="200" r="168" fill="none" stroke="#C8A24A" strokeOpacity=".28" strokeWidth="1" strokeDasharray="3 9" />
            <circle cx="200" cy="200" r="142" fill="none" stroke="#ffffff" strokeOpacity=".08" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="24"
                x2="200"
                y2="38"
                stroke="#C8A24A"
                strokeOpacity=".5"
                strokeWidth="1.4"
                transform={`rotate(${i * 30} 200 200)`}
              />
            ))}
          </svg>

          {/* soft plate under the parts */}
          <div
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,162,74,.22),transparent_68%)]"
            aria-hidden
          />

          {layers.map((l) => (
            <div
              key={l.src}
              className={`absolute ${l.className} layer-3d`}
              style={{
                transform: `translate3d(calc(var(--px) * ${l.depth}px), calc(var(--py) * ${l.depth}px), 0) rotate(${l.spin ?? 0}deg)`,
                transition: "transform .35s var(--ease-out-soft)",
              }}
            >
              <div
                className="animate-[var(--animate-float-slow)]"
                style={{ animationDelay: `${l.delay ?? 0}ms` }}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={760}
                  height={760}
                  priority={l.depth < 60}
                  sizes="(max-width: 1024px) 60vw, 320px"
                  className="h-auto w-full object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,.65)]"
                />
              </div>
            </div>
          ))}

          {/* callouts */}
          <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            <g stroke="#C8A24A" strokeOpacity=".7" strokeWidth="1" fill="none">
              <path d="M250 96l24-70h110" />
              <path d="M126 306l-24 54H6" />
            </g>
            <g
              fill="#E7C878"
              fontFamily="var(--font-mono-tech), monospace"
              fontSize="9"
              letterSpacing="1.6"
              style={{ textTransform: "uppercase" }}
            >
              <text x="396" y="20" textAnchor="end">Class 8.8 · 10.9 · 12.9 · 14.9</text>
              <text x="6" y="376">M3 – M72 · ISO · DIN · ASTM</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
