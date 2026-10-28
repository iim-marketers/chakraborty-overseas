import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { PartnerUnitCaption } from "@/components/ui";

const points = [
  [
    "Verified partners",
    "Units we have visited and bought from before, holding ISO 9001 and issuing mill test certificates.",
  ],
  [
    "One point of contact",
    "One order, one invoice, one packing list — even when three factories are involved.",
  ],
  [
    "Documents that clear",
    "Prepared to match your bank's requirement, not ours.",
  ],
];

const facility = [
  {
    src: "/facility/mill-coils.webp",
    alt: "Wire rod coils staged at a partner mill",
    city: "Rohtak",
  },
  {
    src: "/facility/cold-heading.webp",
    alt: "Cold heading machine beside wire rod coils",
    city: "Ahmedabad",
  },
  {
    src: "/facility/heading-shop.webp",
    alt: "Bolt heading and forging machines on the shop floor",
    city: "Ahmedabad",
  },
  { src: "/facility/furnace.webp", alt: "Hardening furnace", city: "Rohtak" },
];

const cutouts = [
  {
    src: "/cutouts/hex-bolt.webp",
    label: "Stainless",
  },
  {
    src: "/cutouts/zinc-bolt.webp",
    label: "Mild steel",
  },
  {
    src: "/cutouts/socket-screw.webp",
    label: "High tension",
  },
];

export function WhereWeSitSection() {
  return (
    <section className="border-y border-line bg-white py-12 lg:py-16">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Where we sit</p>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold tracking-tight text-balance">
            We are not a mill. That is the point.
          </h2>
          <p className="mt-5 text-ink/70 text-pretty">
            A factory sells you what it makes. A merchant exporter finds the
            factory that already makes exactly what you specified — at the
            grade, in the finish, in the quantity, on the date. Our work sits
            between your purchase order and the factory gate.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map(([t, b]) => (
              <li key={t} className="flex gap-4 border-t border-line-soft pt-4">
                <span className="mt-3 h-px w-6 shrink-0 bg-gold" aria-hidden />
                <span>
                  <strong className="font-display text-[1rem] font-semibold">
                    {t}
                  </strong>
                  <span className="mt-1 block text-[0.9rem] text-ink/65">
                    {b}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-3">
            {facility.map((f, i) => (
              <figure
                key={f.src}
                className={`relative aspect-4/3 overflow-hidden rounded-2xl border border-line ${
                  i % 2 === 1 ? "mt-6" : ""
                }`}
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <PartnerUnitCaption city={f.city} />
              </figure>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {cutouts.map((f) => (
              <div
                key={f.label}
                className="relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-line bg-white p-4"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 blueprint-light opacity-40"
                />
                <Image
                  src={f.src}
                  alt=""
                  width={240}
                  height={240}
                  className="relative h-20 w-auto object-contain"
                />
                <span className="relative font-mono text-[0.56rem] uppercase tracking-[0.16em] text-steel">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
