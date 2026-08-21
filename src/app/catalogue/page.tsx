import type { Metadata } from "next";
import Link from "next/link";
import { statSync } from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/reveal";
import { CTABand, PageHero } from "@/components/ui";
import { ranges } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download Catalogue — Fastener Range Sheets",
  description:
    "Download the Chakraborty Overseas fastener catalogue: the complete range sheet, or an individual catalogue for stainless steel, mild steel or high tension and precision fasteners.",
  alternates: { canonical: "/catalogue" },
  openGraph: {
    title: "Download Catalogue · Chakraborty Overseas",
    description:
      "Range sheets with grades, standards, sizes and finishes for every fastener range we export.",
    url: "/catalogue",
  },
};

function fileSize(file: string) {
  try {
    const bytes = statSync(
      path.join(process.cwd(), "public", "catalogue", file),
    ).size;
    return `${(bytes / 1024 / 1024).toFixed(bytes > 1024 * 1024 ? 1 : 2)} MB`;
  } catch {
    return "PDF";
  }
}

const master = {
  file: "chakraborty-overseas-catalogue.pdf",
  title: "Complete range catalogue",
  blurb:
    "Every range in one document — grades, standards, sizes, finishes and the full line list for all three ranges.",
};

export default function CataloguePage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={
          <>
            The range, <span className="gold-text">on paper.</span>
          </>
        }
        lede="Each catalogue carries the line list, the grades and standards we quote against, and the sizes available. Download the complete book or just the range you are buying."
      />

      <section className="py-16 lg:py-24">
        <div className="shell">
          {/* master download */}
          <Reveal>
            <div className="grid gap-8 overflow-hidden rounded-[var(--radius-tile)] border border-line bg-white p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <p className="eyebrow">Master document</p>
                <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-tight">
                  {master.title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink/65 text-pretty">
                  {master.blurb}
                </p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
                  PDF · {fileSize(master.file)} · Updated{" "}
                  {new Date().getFullYear()}
                </p>
              </div>
              <a
                href={`/catalogue/${master.file}`}
                download
                className="btn btn-gold shrink-0"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6.5 1v8M3 6l3.5 3.5L10 6M1.5 11.5h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Download catalogue
              </a>
            </div>
          </Reveal>

          {/* per range */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ranges.map((r, i) => {
              const file = `chakraborty-overseas-${r.slug}.pdf`;
              const lines = r.groups.reduce((n, g) => n + g.items.length, 0);
              return (
                <Reveal key={r.slug} delay={i * 70} className="h-full">
                  <article className="flex h-full flex-col rounded-tile border border-line bg-white p-6 transition-colors hover:border-gold">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-ink">
                      {r.code}
                    </p>
                    <h3 className="mt-3 font-display text-[1.2rem] font-semibold tracking-tight">
                      {r.shortName}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-ink/62">
                      {r.tagline}
                    </p>
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line-soft pt-4">
                      <div>
                        <dt className="spec-label">Lines</dt>
                        <dd className="mt-1 text-[0.86rem]">{lines}</dd>
                      </div>
                      <div>
                        <dt className="spec-label">Sizes</dt>
                        <dd className="mt-1 text-[0.86rem]">{r.sizeRange}</dd>
                      </div>
                    </dl>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={`/catalogue/${file}`}
                        download
                        className="btn btn-gold btn-sm"
                      >
                        Download PDF
                      </a>
                      <Link
                        href={`/products/${r.slug}`}
                        className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-ink hover:underline"
                      >
                        View online →
                      </Link>
                    </div>
                    <p className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-steel">
                      PDF · {fileSize(file)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 rounded-[var(--radius-tile)] border border-dashed border-line bg-ivory-2 p-7">
            <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
              Need a size-and-weight sheet for a specific item?
            </h2>
            <p className="mt-2 max-w-3xl text-[0.92rem] text-ink/65">
              Dimensional tables, weights per thousand and packing details are
              issued per item on request — tell us the range and the sizes you
              are buying and we will send the current sheet with your quotation.
              Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-gold-ink underline"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Quoting against a drawing?"
        body="Send the drawing with the catalogue reference and we will come back with grade, lead time and packing."
      />
    </>
  );
}
