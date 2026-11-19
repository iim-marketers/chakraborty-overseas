import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ranges } from "@/lib/products";
import { legalDocs } from "@/lib/legal";
import { BackToTop } from "@/components/back-to-top";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ivory text-ink/70">
      <div className="blueprint-light absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div className="shell relative pt-10 pb-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${site.name} logo`}
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <span className="font-display text-lg font-semibold text-ink">
                {site.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-ink/70">
              Merchant exporter of mild steel, stainless steel and high tension
              fasteners, based in {site.city}, India. We source from verified Indian
              manufacturing partners; we do not operate manufacturing facilities
              of our own.
            </p>
            <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold-ink">
              {site.tagline}
            </p>
            <a
              href={`/catalogue/${site.downloads.catalogue}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm mt-6"
            >
              Download catalogue
            </a>
          </div>

          <div>
            <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold-ink">
              Sections
            </h4>
            <ul className="mt-4 space-y-2.5 text-[0.88rem]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="transition-colors hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold-ink">
              Ranges
            </h4>
            <ul className="mt-4 space-y-2.5 text-[0.88rem]">
              {ranges.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/products/${r.slug}`}
                    className="transition-colors hover:text-ink"
                  >
                    {r.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold-ink">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-[0.88rem]">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors hover:text-ink"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="transition-colors hover:text-ink"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.address}</li>
              {/* <li className="text-steel-light/70">{site.contact.hours}</li> */}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel md:flex-row md:items-center md:justify-between">
          <span>
            {site.name} · Est. {site.established} · {site.city}, India
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalDocs.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="transition-colors hover:text-ink"
                >
                  {d.shortTitle}
                </Link>
              ))}
            </nav>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
