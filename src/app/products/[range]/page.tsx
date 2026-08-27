import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductExplorer } from "@/components/product-explorer";
import { Reveal } from "@/components/reveal";
import { CTABand, SpecSheet } from "@/components/ui";
import { ranges, rangeBySlug } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return ranges.map((r) => ({ range: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[range]">): Promise<Metadata> {
  const { range: slug } = await params;
  const range = rangeBySlug(slug);
  if (!range) return { title: "Range not found" };

  const lines = range.groups.reduce((n, g) => n + g.items.length, 0);
  return {
    title: `${range.name} — ${range.sizeRange}`,
    description: `${range.intro} ${lines} lines exported from Kolkata by ${site.name}.`,
    alternates: { canonical: `/products/${range.slug}` },
    keywords: [
      `${range.shortName} fasteners exporter India`,
      ...range.groups.flatMap((g) =>
        g.items.slice(0, 3).map((i) => `${i.name} exporter`),
      ),
    ],
    openGraph: {
      title: `${range.name} · ${site.name}`,
      description: range.intro,
      url: `/products/${range.slug}`,
      images: [{ url: range.heroPhoto, alt: range.name }],
    },
  };
}

export default async function RangePage({
  params,
}: PageProps<"/products/[range]">) {
  const { range: slug } = await params;
  const range = rangeBySlug(slug);
  if (!range) notFound();

  const lines = range.groups.reduce((n, g) => n + g.items.length, 0);
  const others = ranges.filter((r) => r.slug !== range.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: range.name,
    description: range.intro,
    url: `${site.url}/products/${range.slug}`,
    hasPart: range.groups.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Product",
        name: i.name,
        category: `${range.shortName} fasteners`,
        brand: { "@type": "Brand", name: site.name },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- range hero ---------- */}
      <section className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute right-20 top-1/2 hidden w-[38%] max-w-85 -translate-y-1/2 opacity-70 lg:block"
          aria-hidden
        >
          <Image
            src={range.heroPhoto}
            alt=""
            width={760}
            height={760}
            priority
            sizes="420px"
            className="h-auto w-full animate-float-slow drop-shadow-[0_30px_50px_rgba(0,0,0,.65)]"
          />
        </div>
        <div
          className="absolute -left-20 top-0 h-95 w-130 rounded-full bg-gold/10 blur-[110px]"
          aria-hidden
        />
        <div className="shell relative py-12 lg:py-16">
          <p className="eyebrow">{range.code}</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.1rem,5vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.032em] text-balance">
            {range.name}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-steel-light text-pretty">
            {range.detail}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 pt-7">
            {[
              ["Lines", String(lines)],
              ["Sizes", range.sizeRange],
              ["Applications", range.applications.join(" · ")],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-gold-light">
                  {k}
                </p>
                <p className="mt-1.5 text-[0.86rem] text-steel-light">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?range=${range.slug}`}
              className="btn btn-gold"
            >
              Enquire about this range
            </Link>
            <Link
              href="/catalogue"
              className="btn btn-outline-light btn-download"
            >
              Download catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- spec sheet ---------- */}
      <section className="border-b border-line bg-white py-12">
        <div className="shell">
          <Reveal>
            <SpecSheet rows={range.sheet} />
            <p className="mt-5 flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-steel">
              <span className="h-px w-4 bg-gold" aria-hidden />
              {range.finishNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- products ---------- */}
      <section className="py-14 lg:py-20">
        <div className="shell">
          <ProductExplorer range={range} />
        </div>
      </section>

      {/* ---------- other ranges ---------- */}
      <section className="border-t border-line bg-ivory-2 py-14">
        <div className="shell">
          <p className="spec-label">Other ranges</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((r) => (
              <Link
                key={r.slug}
                href={`/products/${r.slug}`}
                className="tile group flex items-center justify-between px-5 py-4 transition-colors hover:border-gold"
              >
                <span>
                  <span className="block font-display text-[1rem] font-semibold tracking-tight">
                    {r.shortName}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-steel">
                    {r.code}
                  </span>
                </span>
                <span
                  className="text-gold-ink transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
