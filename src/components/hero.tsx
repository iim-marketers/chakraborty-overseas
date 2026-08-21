import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const heads = [
  { mark: "A2-70", range: "Stainless", tensile: "700 MPa" },
  { mark: "A4-80", range: "Stainless", tensile: "800 MPa" },
  { mark: "4.6", range: "Mild steel", tensile: "400 MPa" },
  { mark: "8.8", range: "High tension", tensile: "800 MPa" },
  { mark: "10.9", range: "High tension", tensile: "1040 MPa" },
  { mark: "12.9", range: "High tension", tensile: "1220 MPa" },
] as const;

const HEX = "96,50 73,89.8 27,89.8 4,50 27,10.2 73,10.2";

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-130 w-205 -translate-x-1/2 rounded-full bg-gold/12 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink"
        aria-hidden
      />

      <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-10 lg:py-24">
        <div className="min-w-0 max-w-xl animate-rise">
          <p className="eyebrow">Mild steel · Stainless steel · High tension</p>

          <h1 className="mt-6 text-[clamp(2.5rem,6.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance">
            <span className="block text-[0.42em] font-light tracking-[0.01em] text-steel-light">
              Sourcing fasteners out of India?
            </span>
            The bolt is <span className="gold-text">the easy part.</span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-steel-light text-pretty">
            Finding a mill that holds the grade, meets the shipment date and
            hands over documents that clear customs — that is the work.{" "}
            {site.name} is a merchant exporter in Kolkata. We source from
            verified Indian manufacturing partners, check the goods against your
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
                <dd className="mt-1.5 font-mono text-[0.76rem] leading-snug text-steel-light">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ------------------------- head marks ------------------------- */}
        <figure className="mx-auto w-full min-w-0 max-w-135 animate-rise overflow-hidden rounded-tile border border-white/10 bg-carbon shadow-(--shadow-lift) [animation-delay:160ms]">
          {/* one shared metal gradient for all six heads */}
          <svg className="absolute h-0 w-0" aria-hidden>
            <defs>
              <linearGradient id="headFace" x1="0" y1="0" x2="0.7" y2="1">
                <stop offset="0" stopColor="#2A3846" />
                <stop offset="1" stopColor="#151E27" />
              </linearGradient>
            </defs>
          </svg>

          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/10 px-6 py-4 font-mono text-[0.58rem] uppercase tracking-[0.18em]">
            <span className="text-gold-light">Head marks</span>
            <span className="text-steel">Three ranges · one stamp each</span>
          </figcaption>

          <ul className="grid grid-cols-3 gap-px bg-white/8">
            {heads.map((h) => (
              <li
                key={h.mark}
                className="group flex flex-col items-center gap-3.5 bg-carbon px-2 py-6"
              >
                <span className="relative block w-full max-w-22">
                  <svg
                    viewBox="0 0 100 100"
                    className="block w-full"
                    aria-hidden
                  >
                    <polygon
                      points={HEX}
                      fill="url(#headFace)"
                      className="stroke-gold/45 transition-colors duration-300 group-hover:stroke-gold-light"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="32"
                      fill="none"
                      className="stroke-white/10"
                      strokeWidth="1"
                    />
                  </svg>
                  <span
                    className={`absolute inset-0 grid place-items-center font-mono font-medium leading-none text-ivory ${
                      h.mark.length > 3 ? "text-[0.72rem]" : "text-[0.92rem]"
                    }`}
                  >
                    {h.mark}
                  </span>
                </span>

                <span className="text-center">
                  <span className="block font-mono text-[0.55rem] uppercase tracking-[0.15em] text-gold-light">
                    {h.range}
                  </span>
                  {/* <span className="mt-1 block font-mono text-[0.55rem] tracking-[0.08em] text-steel">
                    {h.tensile}
                  </span> */}
                </span>
              </li>
            ))}
          </ul>

          {/* the real thing, so the panel is not all drawing */}
          <div className="relative aspect-21/6 border-y border-white/10">
            <Image
              src="/facility/bolts-dark.webp"
              alt="High tension hex bolts and socket head cap screws in black finish"
              fill
              preload
              sizes="(max-width: 1024px) 92vw, 520px"
              className="object-cover"
            />
            <span
              className="absolute inset-0 bg-linear-to-r from-carbon via-carbon/25 to-carbon/70"
              aria-hidden
            />
          </div>

          <div className="p-6">
            <p className="text-[0.88rem] leading-relaxed text-steel-light text-pretty">
              The property class is stamped on the head — the one thing you can
              verify the moment the container is opened. We check it against
              your purchase order before the carton is sealed.
            </p>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-white/10 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-steel">
              <span>M3 – M72</span>
              <span>{site.standards.map((s) => s.code).join(" · ")}</span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
