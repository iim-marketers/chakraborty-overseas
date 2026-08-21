import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Get a Fastener Quote from Kolkata",
  description:
    "Send your fastener specification and quantity to Chakraborty Overseas, Kolkata. Email exports@chakrabortyoverseas.com or WhatsApp +91 98316 47114. We reply within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Chakraborty Overseas",
    description: "Send the specification and quantity — we reply within one working day.",
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
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Alternate email", value: site.contact.altEmail, href: `mailto:${site.contact.altEmail}` },
  { label: "Phone / WhatsApp", value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
  { label: "Registered address", value: site.contact.address },
  { label: "Working hours", value: site.contact.hours },
  { label: "Nearest ports", value: site.contact.ports },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Enquiries"
        title={
          <>
            Send a specification. <span className="gold-text">Get a real quote.</span>
          </>
        }
        lede="Size, grade, standard, finish and quantity is enough to start. If a detail is missing we will ask rather than assume — it is faster than re-quoting later."
      />

      <section className="py-16 lg:py-24">
        <div className="shell grid gap-px overflow-hidden rounded-[var(--radius-tile)] border border-white/10 bg-white/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="on-dark bg-graphite p-8 text-ivory lg:p-10">
            <h2 className="font-display text-[1.15rem] font-semibold text-white">{site.name}</h2>
            <p className="mt-2 text-[0.88rem] text-steel-light">{site.role}</p>

            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {info.map((i) => (
                <div key={i.label} className="py-4">
                  <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-light">
                    {i.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.92rem] text-steel-light">
                    {i.href ? (
                      <a href={i.href} className="break-all border-b border-white/20 pb-0.5 transition-colors hover:border-gold hover:text-white">
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
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-gold-light">{k}</dt>
                  <dd className="mt-1 font-mono text-[0.76rem] text-steel-light">{v}</dd>
                </div>
              ))}
            </dl>

            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light mt-8 w-full"
            >
              Message on WhatsApp
            </a>
          </div>

          <div className="on-dark bg-carbon p-8 text-ivory lg:p-10">
            <Suspense fallback={<p className="text-steel-light">Loading form…</p>}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>

        <div className="shell mt-10 grid gap-5 sm:grid-cols-3">
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
        </div>
      </section>
    </>
  );
}
