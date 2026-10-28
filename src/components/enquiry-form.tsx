"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  LoaderCircleIcon,
  RotateCcwIcon,
} from "lucide-react";
import { sendEnquiry, type EnquiryResult } from "@/app/contact/actions";
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
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { Country } from "@/lib/countries";
import {
  rangeOptions,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { ranges } from "@/lib/products";
import { site } from "@/lib/site";

const empty: Enquiry = {
  name: "",
  company: "",
  email: "",
  country: "",
  range: rangeOptions[0],
  message: "",
};

const field =
  "h-12 rounded-xl px-4 text-[0.95rem] md:text-[0.95rem] dark:bg-white/5";

const labelClass =
  "font-mono text-[0.6rem] font-normal uppercase tracking-[0.18em] text-steel-light";

export function EnquiryForm({ countries }: { countries: Country[] }) {
  const params = useSearchParams();
  const [touched, setTouched] = useState<Partial<Enquiry>>({});
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [pending, startTransition] = useTransition();

  const product = params.get("product");
  const rangeSlug = params.get("range");
  const f: Enquiry = {
    ...empty,
    range: ranges.find((r) => r.slug === rangeSlug)?.shortName ?? empty.range,
    message: product
      ? `Enquiry for: ${product}\n\nSize / grade / finish:\nQuantity:\nDestination port:\n`
      : "",
    ...touched,
  };

  const put = (k: keyof Enquiry, value: string) => {
    setTouched((p) => ({ ...p, [k]: value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const set =
    (k: keyof Enquiry) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      put(k, e.target.value);

  const flag = (next: EnquiryErrors) => {
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`f-${first}`)?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    const next = validateEnquiry(f);
    if (Object.keys(next).length) return flag(next);

    setResult(null);
    startTransition(async () => {
      try {
        const res = await sendEnquiry({ ...f, website });
        setResult(res);
        if (!res.ok && res.fields) flag(res.fields);
      } catch {
        setResult({
          ok: false,
          error: `We couldn't reach the server. Check your connection and try again, or write to ${site.contact.email}.`,
        });
      }
    });
  };

  const reset = () => {
    setTouched({});
    setErrors({});
    setResult(null);
  };

  if (result?.ok) return <Sent reference={result.ref} email={result.email} onReset={reset} />;

  return (
    /* `dark` flips the shadcn tokens for the controls — this form always sits
       on the carbon panel. */
    <form
      onSubmit={submit}
      noValidate
      aria-busy={pending}
      className="dark grid gap-5 sm:grid-cols-2"
    >
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
            aria-invalid={!!errors.range}
            className={`${field} w-full data-[size=default]:h-12`}
          >
            <SelectValue placeholder="Choose a range" />
          </SelectTrigger>
          <SelectContent className="dark rounded-xl">
            {rangeOptions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.range && (
          <p className="text-[0.72rem] text-destructive">{errors.range}</p>
        )}
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

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input
          id="f-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {result && !result.ok && (
        <div
          role="alert"
          className="flex animate-fade-in gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-[0.88rem] text-steel-light sm:col-span-2"
        >
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>
            {result.error}{" "}
            {!result.fields && (
              <>
                You can also reach us on{" "}
                <a
                  href={`https://wa.me/${site.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-light underline underline-offset-2"
                >
                  WhatsApp
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-gold min-w-44 disabled:pointer-events-none disabled:opacity-80"
        >
          {pending ? (
            <>
              <LoaderCircleIcon className="size-3.5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
          We reply within one working day · Quotes in USD, EUR, GBP or INR
        </span>
      </div>
    </form>
  );
}

function Sent({
  reference,
  email,
  onReset,
}: {
  reference: string;
  email: string;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      className="flex min-h-[26rem] animate-fade-in flex-col justify-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-gold/15 text-gold-light ring-1 ring-gold/40">
        <CircleCheckIcon className="size-6" aria-hidden />
      </span>

      <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold-light">
        Enquiry sent
      </p>
      <h3 className="mt-2 font-display text-[1.6rem] font-semibold leading-tight text-white">
        Thank you — it&rsquo;s with our export desk.
      </h3>
      <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-steel-light">
        We&rsquo;ve sent a confirmation to{" "}
        <span className="break-all text-white">{email}</span>. Expect a reply
        within one working day — usually a quotation, or a quick question if a
        detail needs confirming.
      </p>

      <dl className="mt-8 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
        <div className="bg-carbon px-4 py-3">
          <dt className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-steel">
            Reference
          </dt>
          <dd className="mt-1 font-mono text-[0.9rem] tracking-wider text-white">
            {reference}
          </dd>
        </div>
        <div className="bg-carbon px-4 py-3">
          <dt className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-steel">
            Quotes in
          </dt>
          <dd className="mt-1 text-[0.9rem] text-white">USD · EUR · GBP · INR</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
            `Hello, following up on my enquiry ${reference}.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
        >
          <WhatsAppIcon size={14} />
          Follow up on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn btn-outline-light">
          <RotateCcwIcon className="size-3.5" aria-hidden />
          New enquiry
        </button>
      </div>
    </div>
  );
}
