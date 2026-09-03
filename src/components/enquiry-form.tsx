"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CountrySelect } from "@/components/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

/* Sizing shared by every control: shadcn ships a compact 32px field, this form
   wants the roomier rhythm the rest of the site uses. */
const field =
  "h-12 rounded-xl px-4 text-[0.95rem] md:text-[0.95rem] dark:bg-white/5";

const labelClass =
  "font-mono text-[0.6rem] font-normal uppercase tracking-[0.18em] text-steel-light";

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
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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

  return (
    /* `dark` flips the shadcn tokens for the controls — this form always sits
       on the carbon panel. */
    <form onSubmit={submit} noValidate className="dark grid gap-5 sm:grid-cols-2">
      {(
        [
          ["name", "Your name", "name"],
          ["company", "Company", "organization"],
          ["email", "Email", "email"],
        ] as const
      ).map(([key, label, auto]) => (
        <div key={key} className="flex flex-col gap-2">
          <Label htmlFor={`f-${key}`} className={labelClass}>
            {label}
          </Label>
          <Input
            id={`f-${key}`}
            name={key}
            type={key === "email" ? "email" : "text"}
            autoComplete={auto}
            value={f[key]}
            onChange={set(key)}
            aria-invalid={!!errors[key]}
            className={field}
          />
          {errors[key] && (
            <p className="text-[0.72rem] text-destructive">{errors[key]}</p>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <Label htmlFor="f-country" className={labelClass}>
          Country
        </Label>
        <CountrySelect
          id="f-country"
          name="country"
          value={f.country}
          onChange={(v) => put("country", v)}
          countries={countries}
          invalid={!!errors.country}
          className={field}
        />
        {errors.country && (
          <p className="text-[0.72rem] text-destructive">{errors.country}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="f-range" className={labelClass}>
          Product interest
        </Label>
        <Select value={f.range} onValueChange={(v) => put("range", v)}>
          <SelectTrigger
            id="f-range"
            name="range"
            className={`${field} w-full data-[size=default]:h-12`}
          >
            <SelectValue placeholder="Choose a range" />
          </SelectTrigger>
          <SelectContent className="dark rounded-xl">
            {ranges.map((r) => (
              <SelectItem key={r.slug} value={r.shortName}>
                {r.shortName}
              </SelectItem>
            ))}
            <SelectItem value="Mixed / multiple ranges">
              Mixed / multiple ranges
            </SelectItem>
            <SelectItem value="Catalogue request">Catalogue request</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="f-message" className={labelClass}>
          Specification, quantity and destination port
        </Label>
        <Textarea
          id="f-message"
          name="message"
          rows={5}
          value={f.message}
          onChange={set("message")}
          placeholder="e.g. M12 x 60 hex bolts, class 8.8, hot dip galvanised, DIN 931 — 20,000 pcs, CIF Jebel Ali"
          aria-invalid={!!errors.message}
          className="min-h-36 resize-y rounded-xl px-4 py-3 text-[0.95rem] md:text-[0.95rem] dark:bg-white/5"
        />
        {errors.message && (
          <p className="text-[0.72rem] text-destructive">{errors.message}</p>
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
