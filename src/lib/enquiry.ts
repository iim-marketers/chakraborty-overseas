import { ranges } from "@/lib/products";

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  country: string;
  range: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export const rangeOptions = [
  ...ranges.map((r) => r.shortName),
  "Mixed / multiple ranges",
  "Catalogue request",
];

const max: Record<keyof Enquiry, number> = {
  name: 120,
  company: 160,
  email: 254,
  country: 80,
  range: 80,
  message: 5000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanEnquiry(input: Partial<Record<keyof Enquiry, unknown>>): Enquiry {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: str(input.name),
    company: str(input.company),
    email: str(input.email).toLowerCase(),
    country: str(input.country),
    range: str(input.range),
    message: str(input.message).replace(/\r\n?/g, "\n"),
  };
}

export function validateEnquiry(f: Enquiry): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!f.name.trim()) e.name = "Tell us who you are";
  if (!f.company.trim()) e.company = "Company name, please";
  if (!EMAIL.test(f.email.trim())) e.email = "A valid email address, please";
  if (!f.country.trim()) e.country = "Which country are we shipping to?";
  if (!rangeOptions.includes(f.range)) e.range = "Choose a product range";
  if (f.message.trim().length < 12)
    e.message = "A line on the specification and quantity";

  for (const k of Object.keys(max) as (keyof Enquiry)[]) {
    if (!e[k] && f[k].length > max[k])
      e[k] = `Keep this under ${max[k].toLocaleString("en-US")} characters`;
  }
  return e;
}
