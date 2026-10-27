"use server";

import { randomInt } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import {
  cleanEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { customerEmail, teamEmail } from "@/lib/enquiry-emails";
import { site } from "@/lib/site";

export type EnquiryResult =
  | { ok: true; ref: string; email: string }
  | { ok: false; error: string; fields?: EnquiryErrors };

const INBOX = process.env.ENQUIRY_INBOX || "chakraborty.overseas@gmail.com";

const FAILED = `We couldn't send your enquiry just now. Please try again in a moment, or write to ${site.contact.email} directly.`;

const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string) {
  const now = Date.now();
  if (hits.size > 500) {
    for (const [k, times] of hits)
      if (now - times[times.length - 1] > WINDOW) hits.delete(k);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function makeRef(d: Date) {
  const ymd = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .split("/")
    .reverse()
    .join("");
  const tail = Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `CO-${ymd}-${tail}`;
}

export async function sendEnquiry(
  input: Enquiry & { website?: string },
): Promise<EnquiryResult> {
  const submittedAt = new Date();
  const ref = makeRef(submittedAt);
  const f = cleanEnquiry(input);

  if (input.website) return { ok: true, ref, email: f.email };

  const fields = validateEnquiry(f);
  if (Object.keys(fields).length)
    return { ok: false, error: "A few details need another look.", fields };

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) {
    console.error("[enquiry] RESEND_API_KEY or RESEND_FROM is not set");
    return { ok: false, error: FAILED };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (throttled(ip))
    return {
      ok: false,
      error: `That's a lot of enquiries in a few minutes — please wait a little, or write to ${site.contact.email} directly.`,
    };

  const resend = new Resend(key);
  const meta = { ref, submittedAt };

  // Desk copy must succeed before the buyer is told it was received.
  try {
    const team = teamEmail(f, meta);
    const { error } = await resend.emails.send(
      {
        from,
        to: INBOX,
        replyTo: `${f.name.replace(/["<>]/g, "")} <${f.email}>`,
        ...team,
        tags: [{ name: "type", value: "enquiry-team" }],
      },
      { idempotencyKey: `enquiry-team/${ref}` },
    );
    if (error) {
      console.error("[enquiry] desk email failed", ref, error);
      return { ok: false, error: FAILED };
    }
  } catch (err) {
    console.error("[enquiry] desk email threw", ref, err);
    return { ok: false, error: FAILED };
  }

  try {
    const ack = customerEmail(f, meta);
    const { error } = await resend.emails.send(
      {
        from,
        to: f.email,
        replyTo: INBOX,
        ...ack,
        tags: [{ name: "type", value: "enquiry-ack" }],
      },
      { idempotencyKey: `enquiry-ack/${ref}` },
    );
    if (error) console.error("[enquiry] acknowledgement failed", ref, error);
  } catch (err) {
    console.error("[enquiry] acknowledgement threw", ref, err);
  }

  return { ok: true, ref, email: f.email };
}
