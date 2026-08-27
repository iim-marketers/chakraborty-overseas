import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Get a Fastener Quote from Kolkata",
  description:
    "Send your fastener specification and quantity to Chakraborty Overseas, Kolkata. Email exports@chakrabortyoverseas.com or WhatsApp +91 98316 47114. We reply within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Chakraborty Overseas",
    description:
      "Send the specification and quantity — we reply within one working day.",
    url: "/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: `${site.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
};

const info = [
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    label: "Alternate email",
    value: site.contact.altEmail,
    href: `mailto:${site.contact.altEmail}`,
  },
  {
    label: "Phone / WhatsApp",
    value: site.contact.phone,
    href: `tel:${site.contact.phoneHref}`,
  },
  { label: "Registered address", value: site.contact.address },
  { label: "Working hours", value: site.contact.hours },
  { label: "Ports", value: site.contact.ports },
  { label: "Airports", value: site.contact.airports },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Enquiries"
        title={
          <>
            Send a specification.{" "}
            <span className="gold-text">Get a real quote.</span>
          </>
        }
        lede="Size, grade, standard, finish and quantity is enough to start. If a detail is missing we will ask rather than assume — it is faster than re-quoting later."
      />

      <section className="py-12 lg:py-16">
        <div className="shell grid gap-px overflow-hidden rounded-tile border border-white/10 bg-white/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="on-dark bg-graphite p-8 text-ivory lg:p-10">
            <h2 className="font-display text-[1.15rem] font-semibold text-white">
              {site.name}
            </h2>
            <p className="mt-2 text-[0.88rem] text-steel-light">{site.role}</p>

            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {info.map((i) => (
                <div key={i.label} className="py-4">
                  <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-light">
                    {i.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.92rem] text-steel-light">
                    {i.href ? (
                      <a
                        href={i.href}
                        className="break-all border-b border-white/20 pb-0.5 transition-colors hover:border-gold hover:text-white"
                      >
                        {i.value}
                      </a>
                    ) : (
                      i.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <dl className="mt-8 grid grid-cols-2 gap-5">
              {[
                ["IEC", site.registrations.iec],
                ["GSTIN", site.registrations.gstin],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-gold-light">
                    {k}
                  </dt>
                  <dd className="mt-1 font-mono text-[0.76rem] text-steel-light">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light  mt-8 w-full"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.25-4.38 8.23 8.23 0 118.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 01-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.17-.47-.29z" />
              </svg>
              Message on WhatsApp
            </a>
          </div>

          <div className="on-dark bg-carbon p-8 text-ivory lg:p-10">
            <Suspense
              fallback={<p className="text-steel-light">Loading form…</p>}
            >
              <EnquiryForm />
            </Suspense>
          </div>
        </div>

        {/* <div className="shell mt-10 grid gap-5 sm:grid-cols-3">
          {[
            ["What to include", "Standard, grade, size, finish, quantity and destination port."],
            ["Response time", "One working day, Monday to Saturday, 10:00 – 19:00 IST."],
            ["Samples", "Sample pieces can be couriered before a bulk order is placed."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 70}>
              <div className="h-full rounded-[var(--radius-tile)] border border-line bg-white p-6">
                <p className="spec-label">{t}</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/70">{b}</p>
              </div>
            </Reveal>
          ))}
        </div> */}
      </section>
    </>
  );
}
