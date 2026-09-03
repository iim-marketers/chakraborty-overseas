"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CountrySelect } from "@/components/country-select";
import type { Country } from "@/lib/countries";
import { ranges } from "@/lib/products";
import { site } from "@/lib/site";

type Fields = {
  name: string;
  company: string;
  email: string;
  country: string;
  range: string;
  message: string;
};

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  country: "",
  range: ranges[0].shortName,
  message: "",
};

export function EnquiryForm({ countries }: { countries: Country[] }) {
  const params = useSearchParams();
  const [touched, setTouched] = useState<Partial<Fields>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [sent, setSent] = useState(false);

  const product = params.get("product");
  const rangeSlug = params.get("range");
  const f: Fields = {
    ...empty,
    range: ranges.find((r) => r.slug === rangeSlug)?.shortName ?? empty.range,
    message: product
      ? `Enquiry for: ${product}\n\nSize / grade / finish:\nQuantity:\nDestination port:\n`
      : "",
    ...touched,
  };

  const put = (k: keyof Fields, value: string) => {
    setTouched((p) => ({ ...p, [k]: value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const set =
    (k: keyof Fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      put(k, e.target.value);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) next.name = "Tell us who you are";
    if (!f.company.trim()) next.company = "Company name, please";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      next.email = "A valid email address, please";
    if (!f.country.trim()) next.country = "Which country are we shipping to?";
    if (f.message.trim().length < 12)
      next.message = "A line on the specification and quantity";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = document.getElementById(`f-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }

    const body = [
      `Name: ${f.name}`,
      `Company: ${f.company}`,
      `Email: ${f.email}`,
      `Country: ${f.country}`,
      `Range: ${f.range}`,
      "",
      f.message,
    ].join("\n");

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      `Fastener enquiry — ${f.company}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-[0.95rem] text-ivory outline-none transition-colors placeholder:text-steel focus:border-gold";

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      {(
        [
          ["name", "Your name", "name"],
          ["company", "Company", "organization"],
          ["email", "Email", "email"],
        ] as const
      ).map(([key, label, auto]) => (
        <div key={key} className="flex flex-col gap-2">
          <label
            htmlFor={`f-${key}`}
            className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-steel-light"
          >
            {label}
          </label>
          <input
            id={`f-${key}`}
            name={key}
            type={key === "email" ? "email" : "text"}
            autoComplete={auto}
            value={f[key]}
            onChange={set(key)}
            aria-invalid={!!errors[key]}
            className={`${field} ${errors[key] ? "border-copper" : "border-white/12"}`}
          />
          {errors[key] && (
            <p className="text-[0.72rem] text-copper">{errors[key]}</p>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="f-country"
          className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-steel-light"
        >
          Country
        </label>
        <CountrySelect
          id="f-country"
          name="country"
          value={f.country}
          onChange={(v) => put("country", v)}
          countries={countries}
          invalid={!!errors.country}
          className={`${field} ${errors.country ? "border-copper" : "border-white/12"}`}
        />
        {errors.country && (
          <p className="text-[0.72rem] text-copper">{errors.country}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label
          htmlFor="f-range"
          className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-steel-light"
        >
          Product interest
        </label>
        <select
          id="f-range"
          name="range"
          value={f.range}
          onChange={set("range")}
          className={`${field} border-white/12`}
        >
          {ranges.map((r) => (
            <option key={r.slug} value={r.shortName} className="bg-graphite">
              {r.shortName}
            </option>
          ))}
          <option value="Mixed / multiple ranges" className="bg-graphite">
            Mixed / multiple ranges
          </option>
          <option value="Catalogue request" className="bg-graphite">
            Catalogue request
          </option>
        </select>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label
          htmlFor="f-message"
          className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-steel-light"
        >
          Specification, quantity and destination port
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          value={f.message}
          onChange={set("message")}
          placeholder="e.g. M12 x 60 hex bolts, class 8.8, hot dip galvanised, DIN 931 — 20,000 pcs, CIF Jebel Ali"
          aria-invalid={!!errors.message}
          className={`${field} resize-y ${errors.message ? "border-copper" : "border-white/12"}`}
        />
        {errors.message && (
          <p className="text-[0.72rem] text-copper">{errors.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="btn btn-gold">
          Send enquiry
        </button>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
          We reply within one working day · Quotes in USD or INR
        </span>
      </div>

      {sent && (
        <p
          role="status"
          className="border-l-2 border-gold bg-white/5 px-4 py-3 text-[0.9rem] text-steel-light sm:col-span-2"
        >
          Your enquiry is ready in your mail client. If nothing opened, write to{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-gold-light underline"
          >
            {site.contact.email}
          </a>{" "}
          or message us on WhatsApp at {site.contact.phone}.
        </p>
      )}
    </form>
  );
}
