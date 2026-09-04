import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LegalToc } from "@/components/legal-toc";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/ui";
import { legalBySlug, legalDocs, type LegalBlock } from "@/lib/legal";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalBySlug(slug);
  if (!doc) return { title: "Not found" };

  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/legal/${doc.slug}` },
    openGraph: {
      title: `${doc.title} · ${site.name}`,
      description: doc.summary,
      url: `/legal/${doc.slug}`,
    },
  };
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string")
    return (
      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75 text-pretty first:mt-0">
        {block}
      </p>
    );

  return (
    <ul className="mt-4 grid gap-2.5">
      {block.map((li) => (
        <li key={li} className="flex gap-3 text-[0.95rem] leading-relaxed">
          <span
            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold"
            aria-hidden
          />
          <span className="text-ink/75 text-pretty">{li}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function LegalDocPage({
  params,
}: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = legalBySlug(slug);
  if (!doc) notFound();

  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="absolute -right-24 top-0 h-105 w-130 rounded-full bg-gold/12 blur-[110px]"
          aria-hidden
        />
        <div className="shell relative py-12 lg:py-16">
          <p className="eyebrow">{doc.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.1rem,4.8vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.032em] text-balance">
            {doc.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed text-steel-light text-pretty">
            {doc.lede}
          </p>
          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold-light">
            Last updated {doc.updated}
          </p>
        </div>
      </section>

      {/* ---------- contents + body ---------- */}
      <section className="py-12 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
          {/* on this page */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="spec-label">On this page</p>
            <LegalToc
              sections={doc.sections.map((s) => ({
                id: s.id,
                heading: s.heading,
              }))}
            />

            <p className="spec-label mt-10">Other documents</p>
            <nav className="mt-4 grid">
              {others.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="border-l-2 border-line py-1.5 pl-4 text-[0.84rem] leading-snug text-ink/60 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  {d.shortTitle}
                </Link>
              ))}
            </nav>
          </aside>

          {/* the document */}
          <div className="min-w-0 max-w-[68ch]">
            {doc.sections.map((s, i) => (
              <Reveal key={s.id} delay={i < 4 ? i * 60 : 0}>
                <section
                  id={s.id}
                  className="border-t border-line py-8 first:border-t-0 first:pt-0"
                >
                  <h2 className="font-display text-[1.14rem] font-semibold tracking-tight">
                    {s.heading}
                  </h2>
                  <div className="mt-4">
                    {s.blocks.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-4 rounded-tile border border-line bg-white p-7">
                <p className="spec-label">Questions on this document</p>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
                  Write to us before you order rather than after. We would
                  rather answer a clause now than argue about it against a bill
                  of lading later.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem]">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-medium text-gold-ink underline underline-offset-4"
                  >
                    {site.contact.email}
                  </a>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="font-medium text-gold-ink underline underline-offset-4"
                  >
                    {site.contact.phone}
                  </a>
                  <span className="text-ink/55">{site.contact.address}</span>
                </div>
              </div>
            </Reveal>

            <div className="mt-8">
              <Link href="/legal" className="btn btn-outline btn-sm">
                All legal documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
