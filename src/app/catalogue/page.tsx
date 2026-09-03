import type { Metadata } from "next";
import { statSync } from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/reveal";
import { CTABand, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download Catalogue — Fastener Range Sheets",
  description:
    "Download the Chakraborty Overseas fastener catalogue: the complete range sheet, or an individual catalogue for stainless steel, mild steel or high tension and precision fasteners. A one-page company profile for vendor pre-qualification is here too.",
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
  file: site.downloads.catalogue,
  title: "Complete range catalogue",
  blurb:
    "Every range in one document — grades, standards, sizes, finishes and the full line list for all three ranges.",
};

const profile = {
  file: site.downloads.profile,
  title: "Company profile",
  blurb:
    "Registrations, the three ranges, standards quoted against, supplier certifications, Incoterms and contact details on a single sheet — the page procurement teams file when they open a vendor record.",
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

      <section className="py-12 lg:py-16">
        <div className="shell">
          {/* master download */}
          <Reveal>
            <div className="grid gap-8 overflow-hidden rounded-tile border border-line bg-white p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
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

          {/* one-page profile */}
          <Reveal delay={90}>
            <div className="mt-5 grid gap-8 overflow-hidden rounded-tile border border-line bg-ivory-2 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <p className="eyebrow">Vendor pre-qualification</p>
                <h2 className="mt-4 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-tight">
                  {profile.title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink/65 text-pretty">
                  {profile.blurb}
                </p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
                  PDF · {fileSize(profile.file)} · 1 page
                </p>
              </div>
              <a
                href={`/catalogue/${profile.file}`}
                download
                className="btn btn-outline shrink-0"
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
                Download profile
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-12 rounded-tile border border-dashed border-line bg-ivory-2 p-7">
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
