import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "split",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "split" | "center";
  dark?: boolean;
}) {
  if (align === "center") {
    return (
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <p className="eyebrow justify-center">{eyebrow}</p>
        <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {lede && (
          <p className={`mt-4 text-[1rem] leading-relaxed text-pretty ${dark ? "text-steel-light" : "text-ink/65"}`}>
            {lede}
          </p>
        )}
      </Reveal>
    );
  }
  return (
    <Reveal className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-5 text-[clamp(1.8rem,3.8vw,2.9rem)] font-semibold tracking-tight text-balance">
          {title}
        </h2>
      </div>
      {lede && (
        <p className={`max-w-[56ch] text-[1rem] leading-relaxed text-pretty ${dark ? "text-steel-light" : "text-ink/65"}`}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute -right-24 top-0 h-[420px] w-[520px] rounded-full bg-gold/12 blur-[110px]"
        aria-hidden
      />
      <div className="shell relative grid gap-8 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-20">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 text-[clamp(2.2rem,5.4vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.032em] text-balance">
            {title}
          </h1>
        </div>
        {lede && (
          <p className="max-w-[56ch] text-[1.02rem] leading-relaxed text-steel-light text-pretty">{lede}</p>
        )}
        {children}
      </div>
    </section>
  );
}

export function SpecSheet({ rows, dark = false }: { rows: { label: string; value: string }[]; dark?: boolean }) {
  return (
    <dl
      className="grid gap-px overflow-hidden rounded-[var(--radius-tile)] border sm:grid-cols-2 lg:grid-cols-3"
      style={{
        borderColor: dark ? "rgba(255,255,255,.1)" : "var(--color-line)",
        background: dark ? "rgba(255,255,255,.08)" : "var(--color-line)",
      }}
    >
      {rows.map((r) => (
        <div key={r.label} className={`p-5 ${dark ? "bg-graphite" : "bg-white"}`}>
          <dt className="spec-label">{r.label}</dt>
          <dd className={`mt-2 text-[0.9rem] leading-snug ${dark ? "text-steel-light" : "text-ink/80"}`}>
            {r.value}
          </dd>
        </div>
      ))}
      {/* fillers keep the last row solid rather than showing the rule colour */}
      {Array.from({ length: (2 - (rows.length % 2)) % 2 }).map((_, i) => (
        <div key={`s${i}`} className={`hidden sm:block lg:hidden ${dark ? "bg-graphite" : "bg-white"}`} />
      ))}
      {Array.from({ length: (3 - (rows.length % 3)) % 3 }).map((_, i) => (
        <div key={`l${i}`} className={`hidden lg:block ${dark ? "bg-graphite" : "bg-white"}`} />
      ))}
    </dl>
  );
}

export function StandardsStrip({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-tile)] border sm:grid-cols-4 lg:grid-cols-8"
      style={{
        borderColor: dark ? "rgba(255,255,255,.1)" : "var(--color-line)",
        background: dark ? "rgba(255,255,255,.08)" : "var(--color-line)",
      }}
    >
      {site.standards.map((s) => (
        <div key={s.code} className={`px-3 py-5 text-center ${dark ? "bg-graphite" : "bg-white"}`}>
          <p className={`font-display text-[1.02rem] font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
            {s.code}
          </p>
          <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-steel">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function CTABand({
  title = "Send us a specification",
  body = "Size, grade, standard, finish and quantity is enough to start. If something is missing we will ask rather than assume.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-graphite text-ivory">
      <Image
        src="/facility/bolts-dark.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/40" aria-hidden />
      <div className="blueprint absolute inset-0 opacity-70" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[110px]"
        aria-hidden
      />
      <div className="shell relative flex flex-col items-start gap-7 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow">Enquiries</p>
          <h2 className="mt-4 text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold tracking-tight text-balance">
            {title}
          </h2>
          <p className="mt-4 text-steel-light text-pretty">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-gold">
            Get a quote
          </Link>
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
