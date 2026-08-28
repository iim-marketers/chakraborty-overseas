import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CTABand, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifications — IEC, GSTIN & Supplier Accreditation",
  description:
    "Chakraborty Overseas holds IEC BAXPB6492D and GSTIN 19BAXPB6492D1Z9, with EEPC RCMC applied for. Manufacturing certifications, mill test certificates and third-party inspection belong to our sourcing partners.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Certifications · Chakraborty Overseas",
    description:
      "Exporter registrations held by us, and the manufacturing certifications held by our partners.",
    url: "/certifications",
  },
};

function Seal() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9 shrink-0 text-gold-ink"
      fill="none"
      aria-hidden
    >
      <path
        d="M24 4 42 12v14c0 10-8 15-18 18C14 41 6 36 6 26V12z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M16 24l6 6 11-12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

const ours = [
  {
    title: "IEC — Importer Exporter Code",
    body: "Issued by the Directorate General of Foreign Trade. Required for any export from India.",
    value: `IEC ${site.registrations.iec}`,
  },
  {
    title: "GSTIN",
    body: "Goods and Services Tax registration for the business, West Bengal.",
    value: `GSTIN ${site.registrations.gstin}`,
  },
  {
    title: "EEPC RCMC",
    body: "Registration-cum-Membership Certificate with the Engineering Export Promotion Council of India.",
    // value: `RCMC — ${site.registrations.rcmc}`,
    value: `RCMC — Available`,
  },
];

const theirs = [
  {
    title: "ISO 9001 quality management",
    body: "Held by the manufacturing units we source from. Certificates are supplied with the consignment on request.",
  },
  {
    title: "Mill test certificates",
    body: "Material and mechanical test reports issued by the manufacturer for the batch supplied, traceable to heat number.",
  },
  {
    title: "Third-party inspection",
    body: "Pre-shipment inspection by an agency of the buyer's choosing can be arranged at the manufacturer's premises.",
  },
];

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Registrations"
        title={
          <>
            Ours, and <span className="gold-text">our partners&rsquo;.</span>
          </>
        }
        lede="Two things matter to a buyer checking us out: that Chakraborty Overseas is a properly registered Indian exporter, and that the goods come from certified manufacturing. Those are separate, and we keep them separate."
      />

      <section className="py-12 lg:py-16">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="spec-label">Held by Chakraborty Overseas</p>
            <div className="mt-4 space-y-px overflow-hidden rounded-tile border border-line bg-line">
              {ours.map((c) => (
                <article key={c.title} className="flex gap-4 bg-white p-6">
                  <Seal />
                  <div>
                    <h2 className="font-display text-[1.02rem] font-semibold tracking-tight">
                      {c.title}
                    </h2>
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink/62">
                      {c.body}
                    </p>
                    <p className="mt-2.5 font-mono text-[0.76rem] text-gold-ink">
                      {c.value}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={110}>
            <p className="spec-label">Held by our manufacturing partners</p>
            <div className="mt-4 space-y-px overflow-hidden rounded-tile border border-line bg-line">
              {theirs.map((c) => (
                <article key={c.title} className="flex gap-4 bg-white p-6">
                  <Seal />
                  <div>
                    <h2 className="font-display text-[1.02rem] font-semibold tracking-tight">
                      {c.title}
                    </h2>
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink/62">
                      {c.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="shell mt-10">
          <Reveal>
            <p className="mt-6 rounded-tile border border-dashed border-line bg-ivory-2 p-6 text-[0.88rem] leading-relaxed text-ink/70">
              <strong className="font-semibold">Please note:</strong>{" "}
              {site.name} is a merchant exporter and does not operate
              manufacturing, forging or testing facilities. The certifications
              in this column belong to our sourcing partners and are listed as
              supplier certifications, not as our own manufacturing
              accreditation.
            </p>
          </Reveal>
        </div>

        <div className="shell mt-10">
          <Reveal>
            <div className="grid gap-6 rounded-tile border border-line bg-white p-8 sm:grid-cols-3">
              {[
                [
                  "Documents issued with every shipment",
                  "Commercial invoice · Packing list · Certificate of origin · Mill test certificates · Bill of lading",
                ],
                [
                  "Payment terms",
                  "Advance, LC at sight and negotiated terms for repeat buyers",
                ],
                [
                  "Incoterms",
                  site.incoterms.join(" · ") +
                    " · Loading at Kolkata, Haldia or Nhava Sheva",
                ],
              ].map(([t, b]) => (
                <div key={t}>
                  <p className="spec-label">{t}</p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/72">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Need our documents up front?"
        body="We can send the IEC and GST registration copies with the quotation — just ask when you enquire."
      />
    </>
  );
}
