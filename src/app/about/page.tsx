import type { Metadata } from "next";
import Image from "next/image";
import { InspectionChart } from "@/components/diagrams";
import { Reveal } from "@/components/reveal";
import { CTABand, PageHero, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Mission, Vision & How an Order Runs",
  description:
    "Chakraborty Overseas is a Kolkata merchant exporter of fasteners. Our mission, vision, the sequence every order follows, and how consignments are packed for sea freight.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Chakraborty Overseas",
    description:
      "Mission and vision, the order sequence from specification to bill of lading, and our export packing standard.",
    url: "/about",
  },
};

const steps = [
  [
    "01",
    "Specification",
    "You send size, grade, standard, finish and quantity. We come back with anything that needs pinning down before we go to a mill.",
  ],
  [
    "02",
    "Sourcing",
    "We place the enquiry with manufacturing partners who already make that item at that grade, and quote with lead time and packing.",
  ],
  [
    "03",
    "Inspection",
    "Goods are checked before dispatch against the order — dimensions, grade markings, plating and count. Third-party inspection can be arranged.",
  ],
  [
    "04",
    "Export packing",
    "Packed for sea freight: moisture protection, marked cartons, palletised and strapped for the container.",
  ],
  [
    "05",
    "Documents",
    "Invoice, packing list, certificate of origin, mill test certificates and shipping documents, prepared to match your bank's requirement.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Why we exist"
        title={
          <>
            India makes fasteners well.{" "}
            <span className="gold-text">Buying them well</span> is the harder
            part.
          </>
        }
        lede="The difficulty for an overseas buyer has never been supply — it is knowing which supplier to trust, and getting the consignment out cleanly."
      />

      {/* mission & vision */}
      <section className="py-16 lg:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="Mission & vision"
            title="What we are building"
            lede="We do not own a factory. We own the relationship with the ones that matter, and the responsibility for what leaves the port."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                tag: "Vision",
                title: "A sourcing partner buyers can hand a drawing to.",
                body: "To become the first name an international buyer thinks of when they need Indian-made fasteners — trusted not because we own a factory, but because we know which factories to use and we stand behind what leaves the port.",
              },
              {
                tag: "Mission",
                title: "Source it right, check it, ship it on time.",
                body: "To source mild steel, stainless steel and high tension fasteners from verified Indian manufacturers, quality-check every consignment against the buyer's specification, pack it to export standard, and deliver it with complete and accurate documentation.",
              },
            ].map((c, i) => (
              <Reveal key={c.tag} delay={i * 90}>
                <article className="h-full rounded-tile border border-line bg-white p-8 lg:p-10">
                  <p className="spec-label">{c.tag}</p>
                  <h3 className="mt-4 font-display text-[1.45rem] font-semibold tracking-tight text-balance">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-ink/70 text-pretty">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-display text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold leading-tight tracking-tight text-balance">
                One order, one point of contact, from drawing to bill of lading.
              </p>
              <cite className="mt-3 block font-mono text-[0.6rem] uppercase not-italic tracking-[0.2em] text-steel">
                {site.tagline}
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* order flow */}
      <section className="on-dark relative overflow-hidden bg-graphite py-16 text-ivory lg:py-24">
        <div className="blueprint absolute inset-0 opacity-70" aria-hidden />
        <div className="shell relative">
          <SectionHead
            eyebrow="From enquiry to bill of lading"
            title="How an order runs"
            lede="Our work sits between your purchase order and the factory gate. This is the sequence every order follows."
            dark
          />
          <ol className="grid gap-px overflow-hidden rounded-tile border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
            {steps.map(([n, title, body]) => (
              <li
                key={n}
                className="bg-graphite p-7 transition-colors hover:bg-carbon"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold">
                  Step {n}
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-steel-light">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* inspection */}
      <section className="py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  src: "/facility/inspection.webp",
                  alt: "Goods checked on the shop floor before dispatch",
                },
                {
                  src: "/facility/lab.webp",
                  alt: "Laboratory measurement of a sample",
                },
                {
                  src: "/facility/test-lab.webp",
                  alt: "Mechanical test equipment",
                },
                {
                  src: "/facility/salt-spray.webp",
                  alt: "Salt spray cabinet for coating tests",
                },
              ].map((f) => (
                <div
                  key={f.src}
                  className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line"
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-tile border border-line bg-white p-6">
              <span
                aria-hidden
                className="blueprint-light absolute inset-0 opacity-60"
              />
              {/* <InspectionChart className="relative w-full" /> */}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">Before it ships</p>
            <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold tracking-tight text-balance">
              Checked against the order, not against a promise
            </h2>
            <p className="mt-5 text-ink/70 text-pretty">
              Every consignment is verified before it leaves the manufacturer:
              dimensions against the standard, grade markings on the head,
              plating thickness and appearance, and a physical count against the
              packing list. Mill test certificates travel with the goods,
              traceable to heat number.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Dimensional check against the quoted standard",
                "Grade and property class markings verified",
                "Plating and finish inspected for coverage and colour",
                "Carton-by-carton count reconciled to the packing list",
                "Third-party pre-shipment inspection arranged on request",
              ].map((l) => (
                <li
                  key={l}
                  className="relative border-b border-line-soft pb-3 pl-7 text-[0.94rem]"
                >
                  <span
                    className="absolute left-0 top-[0.75em] h-px w-3.5 bg-gold"
                    aria-hidden
                  />
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
