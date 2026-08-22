import type { Metadata } from "next";
import Link from "next/link";
import { RangeCard } from "@/components/range-card";
import { Reveal } from "@/components/reveal";
import { CTABand, PageHero, StandardsStrip } from "@/components/ui";
import { ranges, productCount } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Stainless, Mild Steel & High Tension Fasteners",
  description:
    "Three fastener ranges exported from Kolkata: stainless steel (M3–M72, including Super Duplex), mild steel, and high tension & precision — 87 lines in all.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Chakraborty Overseas",
    description:
      "Stainless steel, mild steel and high tension & precision fastener ranges, exported from Kolkata.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product ranges"
        title={
          <>
            Three ranges,{" "}
            <span className="gold-text">{productCount} lines</span>, one
            consignment.
          </>
        }
        lede="Sizes run M3 to M72 in stainless and M3 to M48 in mild steel and high tension, with nuts to M60. Send the standard, grade, finish and quantity — we will confirm availability and lead time against it."
      />

      <section className="py-16 lg:py-24">
        <div className="shell">
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

          <Reveal className="mt-16">
            <p className="spec-label mb-4">Standards we quote against</p>
            <StandardsStrip />
            <p className="mt-4 max-w-3xl text-[0.86rem] text-ink/55">
              BSW and UNC threads are available on several lines — dome bolts,
              hex thin nuts and hex flange nuts among them. Ask when you send
              the specification.
            </p>
          </Reveal>

          <Reveal className="mt-16 grid gap-6 rounded-tile border border-line bg-white p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-display text-[1.4rem] font-semibold tracking-tight">
                Prefer it on paper?
              </h2>
              <p className="mt-2 max-w-2xl text-[0.94rem] text-ink/65">
                Every range has a downloadable catalogue with the line list,
                grades, standards and sizes we quote against.
              </p>
            </div>
            <Link href="/catalogue" className="btn btn-ink">
              Download catalogue
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
