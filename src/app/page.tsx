import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import {
  IndustryIcon,
  PackingDrawing,
  SupplyFlow,
} from "@/components/diagrams";
import Image from "next/image";
import { RangeCard } from "@/components/range-card";
import { Reveal } from "@/components/reveal";
import { CTABand, SectionHead, StandardsStrip } from "@/components/ui";
import { ranges, productCount } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Fastener Merchant Exporter, Kolkata, India`,
  description:
    "Mild steel, stainless steel and high tension fasteners sourced from verified Indian manufacturers, quality-checked, export packed and shipped worldwide from Kolkata.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Fastener Merchant Exporter, Kolkata`,
    description:
      "Mild steel, stainless steel and high tension fasteners sourced from verified Indian manufacturers, quality-checked and exported worldwide.",
    url: "/",
  },
};

const steps = [
  {
    n: "01",
    title: "Specification",
    body: "You send size, grade, standard, finish and quantity. We come back with anything that needs pinning down before we go to a mill.",
  },
  {
    n: "02",
    title: "Sourcing",
    body: "We place the enquiry with manufacturing partners who already make that item at that grade, and quote with lead time and packing.",
  },
  {
    n: "03",
    title: "Inspection",
    body: "Goods are checked before dispatch — dimensions, grade markings, plating and count. Third-party inspection on request.",
  },
  {
    n: "04",
    title: "Export packing",
    body: "Packed for sea freight: moisture protection, marked cartons, palletised and strapped for the container.",
  },
  {
    n: "05",
    title: "Documents",
    body: "Invoice, packing list, certificate of origin, mill test certificates and shipping documents, matched to your bank's requirement.",
  },
];

const packing = [
  "Oiled or VCI-protected goods in moisture-resistant liners against condensation",
  "Export-grade cartons, then palletised, strapped and stretch-wrapped",
  "Wooden cases with ISPM-15 heat treatment where the destination requires it",
  "Cartons marked with item, size, grade, batch, net and gross weight",
  "Packing list matched carton by carton to the invoice",
  "Bulk and small-pack options — loose kegs, boxes or retail bags to your count",
];

const industries = [
  {
    icon: "construction",
    label: "Construction",
    note: "Structural sets, anchors, foundation bolts",
  },
  {
    icon: "automotive",
    label: "Automotive",
    note: "Class 10.9 and 12.9 socket and flange lines",
  },
  {
    icon: "infrastructure",
    label: "Infrastructure",
    note: "HSFG assemblies, galvanised fixings",
  },
  {
    icon: "rail",
    label: "Railways",
    note: "Heavy hex, fish plate and track fasteners",
  },
  {
    icon: "mining",
    label: "Mining & earthmoving",
    note: "JCB furniture, elevator bucket, fala bolts",
  },
  {
    icon: "agriculture",
    label: "Agriculture",
    note: "Carriage, U and J bolts, plated hardware",
  },
  {
    icon: "plant",
    label: "Plant & machinery",
    note: "Precision turned parts to drawing",
  },
  {
    icon: "aerospace",
    label: "Marine & offshore",
    note: "A4-80 and Super Duplex stainless",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------------- proof strip ---------------- */}
      <section className="border-b border-line bg-ivory-2">
        <div className="shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Product lines", `${productCount}+`, "Across three ranges"],
            ["Size range", "M3 – M72", "Stainless to M72, MS/HT to M48"],
            ["Standards", "8", "ISO, DIN, BIS, ASTM, ANSI, BS, BSW, UNC"],
            ["Loading ports", "3", "Kolkata, Haldia, Nhava Sheva"],
          ].map(([label, value, note], i) => (
            <Reveal key={label} delay={i * 70}>
              <p className="spec-label">{label}</p>
              <p className="mt-2 font-display text-[1.9rem] font-semibold tracking-tight">
                {value}
              </p>
              <p className="mt-1 text-[0.82rem] text-ink/55">{note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- ranges ---------------- */}
      <section className="py-20 ">
        <div className="shell">
          <SectionHead
            eyebrow="Three ranges"
            title="What we ship"
            lede="Every line is sourced from an Indian manufacturing partner we have vetted, then checked against the grade and standard on your purchase order before it is packed."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ranges.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80} className="h-full">
                <RangeCard
                  range={r}
                  count={r.groups.reduce((n, g) => n + g.items.length, 0)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- what a merchant exporter does ---------------- */}
      <section className="border-y border-line bg-white py-20 ">
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
              {[
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
              ].map(([t, b]) => (
                <li
                  key={t}
                  className="flex gap-4 border-t border-line-soft pt-4"
                >
                  <span
                    className="mt-2 h-px w-6 shrink-0 bg-gold"
                    aria-hidden
                  />
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
              {[
                {
                  src: "/facility/mill-coils.webp",
                  alt: "Wire rod coils staged at a partner mill",
                },
                {
                  src: "/facility/wire-drawing.webp",
                  alt: "Wire drawing line",
                },
                {
                  src: "/facility/thread-rolling.webp",
                  alt: "Thread rolling machine",
                },
                { src: "/facility/furnace.webp", alt: "Hardening furnace" },
              ].map((f, i) => (
                <div
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
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
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
              ].map((f) => (
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

      {/* ---------------- process ---------------- */}
      <section className="on-dark relative overflow-hidden bg-graphite py-20 text-ivory ">
        <div className="blueprint absolute inset-0 opacity-70" aria-hidden />
        <div className="shell relative">
          <SectionHead
            eyebrow="From enquiry to bill of lading"
            title="How an order runs"
            lede="We are a merchant exporter, so our work sits between your purchase order and the factory gate. This is the sequence every order follows."
            dark
          />
          {/* <div className="mb-8 overflow-hidden rounded-tile border border-white/10 bg-white/4 p-6">
            <SupplyFlow className="mx-auto w-full max-w-160 [&_text]:fill-steel-light" />
          </div> */}

          <ol className="grid gap-px overflow-hidden rounded-tile border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="group relative bg-graphite p-7 transition-colors hover:bg-carbon"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold">
                  Step {s.n}
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-steel-light">
                  {s.body}
                </p>
                {i < steps.length - 1 && (
                  <span
                    className="absolute right-5 top-7 hidden h-px w-5 bg-white/20 transition-all duration-300 group-hover:w-7 group-hover:bg-gold lg:block"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- packing ---------------- */}
      <section className="py-20 ">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Export packaging</p>
            <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold tracking-tight text-balance">
              Packed for the sea, not the shelf
            </h2>
            <p className="mt-5 text-ink/70 text-pretty">
              Fasteners travel for weeks in a steel box that sweats. Packing is
              where a good consignment is quietly lost, so we treat it as part
              of the specification rather than an afterthought.
            </p>
            <ul className="mt-8">
              {packing.map((p) => (
                <li
                  key={p}
                  className="relative border-b border-line-soft py-3.5 pl-7 text-[0.94rem]"
                >
                  <span
                    className="absolute left-0 top-[1.55em] h-px w-3.5 bg-gold"
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="space-y-4">
            <div className="relative aspect-16/10 overflow-hidden rounded-tile border border-line">
              <Image
                src="/facility/warehouse.webp"
                alt="Packed stock in warehouse racking before loading"
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>
            {/* <div className="relative overflow-hidden rounded-tile border border-line bg-white p-5">
              <span
                aria-hidden
                className="blueprint-light absolute inset-0 opacity-60"
              />
              <PackingDrawing className="relative mx-auto w-full max-w-95" />
            </div> */}
          </Reveal>
        </div>

        <div className="shell mt-16">
          <Reveal>
            <p className="spec-label mb-4">Standards we quote against</p>
            <StandardsStrip />
          </Reveal>
        </div>
      </section>

      {/* ---------------- industries ---------------- */}
      <section className="border-t border-line bg-ivory-2 py-20 lg:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="Where the goods end up"
            title="Industries we supply"
            lede="The same bolt does very different work depending on where it lands. Tell us the application and we will point you at the right grade and finish."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {industries.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 50}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-5 transition-colors hover:border-gold">
                  <span
                    aria-hidden
                    className="blueprint-light absolute inset-0 opacity-50"
                  />
                  <div className="relative">
                    <IndustryIcon
                      name={i.icon}
                      className="h-9 w-9 text-gold-ink transition-transform duration-500 group-hover:-translate-y-0.5"
                    />
                    <h3 className="mt-4 font-display text-[1rem] font-semibold tracking-tight">
                      {i.label}
                    </h3>
                    <p className="mt-1.5 text-[0.8rem] leading-snug text-ink/60">
                      {i.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
