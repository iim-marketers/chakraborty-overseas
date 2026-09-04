import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { CTABand, PageHero } from "@/components/ui";
import { legalDocs } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal — Terms, Privacy & Trading Conditions",
  description: `Terms of service, terms of sale, privacy policy and disclaimer for ${site.name}, merchant exporter of industrial fasteners, Kolkata.`,
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal · ${site.name}`,
    description:
      "The website terms, the trading terms behind a consignment, and what we do with your information.",
    url: "/legal",
  },
};

export default function LegalIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            The small print, <span className="gold-text">in plain words.</span>
          </>
        }
        lede="Four documents. What you may do with this website, what a quotation and a consignment commit us both to, what happens to your information, and what our published specifications actually mean."
      />

      <section className="py-12 lg:py-16">
        <div className="shell">
          <Reveal>
            <div className="mt-8 grid gap-px overflow-hidden rounded-tile border border-line bg-line sm:grid-cols-2">
              {legalDocs.map((doc, i) => (
                <Reveal key={doc.slug} delay={i * 70}>
                  <Link
                    href={`/legal/${doc.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden bg-white p-7 transition-colors duration-300 hover:bg-ivory-2 sm:p-8"
                  >
                    {/* the gold rule the desktop nav uses, borrowed as a hover tell */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/0 blur-2xl transition-colors duration-500 group-hover:bg-gold/15"
                    />

                    {/* <div className="mb-7 flex items-start justify-between gap-4">
                    {glyphs[doc.slug]}
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-steel">
                      {String(i + 1).padStart(2, "0")} / {total}
                    </span>
                  </div> */}

                    <p className="spec-label">{doc.eyebrow}</p>
                    <h2 className="mt-2 font-display text-[1.3rem] font-semibold tracking-tight transition-colors group-hover:text-gold-ink">
                      {doc.title}
                    </h2>
                    <p className="mt-3 max-w-[46ch] text-[0.9rem] leading-relaxed text-ink/65 text-pretty">
                      {doc.summary}
                    </p>

                    {/* <div className="mt-auto flex items-center justify-between gap-4 border-t border-line-soft pt-5 font-mono text-[0.6rem] uppercase tracking-[0.16em]">
                    <span className="flex items-center gap-2 text-gold-ink">
                      Read
                      <span
                        className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                    <span className="text-steel">
                      {doc.sections.length} sections
                    </span>
                  </div> */}
                  </Link>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="shell mt-10">
          <Reveal>
            <p className="rounded-tile border border-dashed border-line bg-ivory-2 p-6 text-[0.88rem] leading-relaxed text-ink/70">
              <strong className="font-semibold">Precedence:</strong> where a
              signed supply agreement, contract or accepted letter of credit
              covers a point differently, that document governs on that point.
              If anything here is unclear before you order, write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-medium text-gold-ink underline underline-offset-4"
              >
                {site.contact.email}
              </a>{" "}
              and we will answer it in writing.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Read them, then send us a specification."
        body="Size, grade, standard, finish and quantity is enough to start. The terms above apply from the quotation onwards."
      />
    </>
  );
}
