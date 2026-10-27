import type { Attachment } from "resend";
import { emailLogoPng } from "@/lib/email-logo";
import type { Enquiry } from "@/lib/enquiry";
import { site } from "@/lib/site";

export type EnquiryMeta = { ref: string; submittedAt: Date };

type Email = {
  subject: string;
  html: string;
  text: string;
  attachments: Attachment[];
};

const c = {
  ink: "#080c11",
  graphite: "#10161d",
  carbon: "#18212b",
  steel: "#5f7183",
  steelLight: "#93a3b2",
  ivory: "#f8f6f1",
  paper: "#ffffff",
  gold: "#c8a24a",
  goldLight: "#e7c878",
  goldInk: "#6e5417",
  text: "#2a3440",
  rule: "#e8e2d4",
};

const font = {
  display: "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
  body: "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",
  mono: "'JetBrains Mono','SFMono-Regular',Menlo,Consolas,monospace",
};

const LOGO_CID = "logo@chakrabortyoverseas";
const attachments: Attachment[] = [
  {
    filename: "chakraborty-overseas.png",
    content: emailLogoPng,
    contentType: "image/png",
    contentId: LOGO_CID,
  },
];

const whatsapp = `https://wa.me/${site.contact.whatsapp}`;
const catalogue = `${site.url}/catalogue/${site.downloads.catalogue}`;
const host = site.url.replace(/^https?:\/\/(www\.)?/, "");

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (s: string) => esc(s).replace(/\n/g, "<br>");

const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

const firstName = (name: string) => name.trim().split(/\s+/)[0];

const IST = "Asia/Kolkata";

const stamp = (d: Date) =>
  `${new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d)} IST`;

function replyDue(d: Date) {
  const due = new Date(d.getTime() + 24 * 60 * 60 * 1000);
  const weekday = (x: Date) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: IST, weekday: "short" }).format(x);
  if (weekday(due) === "Sun") due.setTime(due.getTime() + 24 * 60 * 60 * 1000);
  const day = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(due);
  return `${day}, 19:00 IST`;
}

const eyebrow = (text: string, color = c.goldInk) =>
  `<div style="font-family:${font.mono};font-size:11px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${color};">${text}</div>`;

const heading = (text: string) =>
  `<h2 style="margin:0 0 16px;font-family:${font.mono};font-size:11px;line-height:16px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${c.steel};padding-bottom:10px;border-bottom:1px solid ${c.rule};">${text}</h2>`;

const para = (html: string, extra = "") =>
  `<p style="margin:0 0 16px;font-family:${font.body};font-size:15px;line-height:24px;color:${c.text};${extra}">${html}</p>`;

function button(href: string, label: string, variant: "gold" | "outline" = "gold") {
  const solid = variant === "gold";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:0 8px 8px 0;">
  <tr>
    <td align="center" bgcolor="${solid ? c.gold : c.paper}" style="border-radius:999px;${solid ? "" : `border:1px solid ${c.graphite};`}">
      <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:13px 26px;font-family:${font.mono};font-size:12px;line-height:16px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;text-decoration:none;color:${solid ? "#241b05" : c.graphite};border-radius:999px;">${esc(label)}</a>
    </td>
  </tr>
</table>`;
}

function details(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${rows
  .map(
    ([label, value], i) => `  <tr>
    <td class="label" valign="top" width="150" style="padding:11px 12px 11px 0;${i ? `border-top:1px solid ${c.rule};` : ""}font-family:${font.mono};font-size:11px;line-height:20px;letter-spacing:1.4px;text-transform:uppercase;color:${c.steel};">${label}</td>
    <td valign="top" style="padding:11px 0;${i ? `border-top:1px solid ${c.rule};` : ""}font-family:${font.body};font-size:15px;line-height:20px;color:${c.graphite};">${value}</td>
  </tr>`,
  )
  .join("\n")}
</table>`;
}

const specification = (message: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="background:${c.ivory};border-left:3px solid ${c.gold};border-radius:0 10px 10px 0;padding:18px 20px;font-family:${font.mono};font-size:13px;line-height:22px;color:${c.graphite};word-break:break-word;">${multiline(message)}</td>
  </tr>
</table>`;

const link = (href: string, text: string, color = c.goldInk) =>
  `<a href="${esc(href)}" style="color:${color};text-decoration:underline;">${text}</a>`;

function shell({
  title,
  preheader,
  body,
  footnote,
}: {
  title: string;
  preheader: string;
  body: string;
  footnote: string;
}) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { color:${c.goldInk}; }
  @media (max-width:620px) {
    .px { padding-left:22px !important; padding-right:22px !important; }
    .stack, .stack tbody, .stack tr, .stack td { display:block !important; width:100% !important; box-sizing:border-box; }
    .stack td.cell { border-left:0 !important; border-top:1px solid ${c.rule} !important; }
    .stack td.cell:first-child { border-top:0 !important; }
    .h1 { font-size:24px !important; line-height:30px !important; }
    .label { width:96px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${c.ivory};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.ivory}" style="background:${c.ivory};">
  <tr>
    <td align="center" style="padding:32px 12px 40px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

        <tr>
          <td class="px" bgcolor="${c.graphite}" style="background:${c.graphite};border-radius:16px 16px 0 0;padding:26px 36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="padding-right:16px;">
                  <a href="${site.url}" target="_blank" style="text-decoration:none;"><img src="cid:${LOGO_CID}" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border:0;outline:none;"></a>
                </td>
                <td valign="middle">
                  <div style="font-family:${font.display};font-size:19px;line-height:24px;font-weight:600;color:#ffffff;">${site.name}</div>
                  <div style="padding-top:4px;font-family:${font.mono};font-size:10px;line-height:14px;letter-spacing:2px;text-transform:uppercase;color:${c.goldLight};">${esc(site.role)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td height="3" bgcolor="${c.gold}" style="height:3px;line-height:3px;font-size:0;background:${c.gold};">&nbsp;</td></tr>

        <tr>
          <td class="px" bgcolor="${c.paper}" style="background:${c.paper};padding:40px 36px 36px;">
${body}
          </td>
        </tr>

        <tr>
          <td class="px" bgcolor="${c.graphite}" style="background:${c.graphite};border-radius:0 0 16px 16px;padding:28px 36px;">
            <div style="font-family:${font.display};font-size:15px;line-height:20px;font-weight:600;color:#ffffff;">${site.name}</div>
            <div style="padding-top:4px;font-family:${font.mono};font-size:10px;line-height:14px;letter-spacing:2px;text-transform:uppercase;color:${c.gold};">${esc(site.tagline)}</div>
            <div style="padding-top:16px;font-family:${font.body};font-size:13px;line-height:21px;color:${c.steelLight};">
              ${link(`mailto:${site.contact.email}`, site.contact.email, c.steelLight)}&nbsp;&nbsp;·&nbsp;&nbsp;<span style="white-space:nowrap;">${link(`tel:${site.contact.phoneHref}`, site.contact.phone, c.steelLight)}</span><br>
              ${esc(site.contact.hours)}<br>
              ${esc(site.contact.address)}&nbsp;&nbsp;·&nbsp;&nbsp;${link(site.url, host, c.steelLight)}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 36px 0;font-family:${font.body};font-size:12px;line-height:18px;color:${c.steel};text-align:center;">
            ${footnote}
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const steps = [
  [
    "Specification check",
    "We read the size, grade, standard and finish you sent, and ask rather than assume if anything needs confirming.",
  ],
  [
    "Sourcing & pricing",
    "We price the order with our verified Indian manufacturing partners for your quantity and finish.",
  ],
  [
    "Written quotation",
    "You receive a quotation in USD, EUR, GBP or INR with Incoterms, lead time and export packing spelled out.",
  ],
];

export function customerEmail(f: Enquiry, { ref, submittedAt }: EnquiryMeta): Email {
  const name = firstName(f.name);
  const subject = oneLine(`We've received your enquiry · Ref. ${ref}`);

  const body = `
            ${eyebrow("Enquiry received")}
            <h1 class="h1" style="margin:10px 0 18px;font-family:${font.display};font-size:28px;line-height:34px;font-weight:600;color:${c.graphite};">Thank you, ${esc(name)}.</h1>
            ${para(`Your enquiry has reached our export desk in ${site.city}. A member of the team will come back to you <strong style="color:${c.graphite};">within one working day</strong> — usually with a quotation, or with a short question if a detail in the specification needs confirming.`)}

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack" style="margin:24px 0 36px;border:1px solid ${c.rule};border-radius:12px;">
              <tr>
                <td class="cell" valign="top" width="50%" style="padding:16px 20px;">
                  ${eyebrow("Your reference", c.steel)}
                  <div style="padding-top:6px;font-family:${font.mono};font-size:17px;line-height:22px;font-weight:600;letter-spacing:1px;color:${c.graphite};">${ref}</div>
                </td>
                <td class="cell" valign="top" width="50%" style="padding:16px 20px;border-left:1px solid ${c.rule};">
                  ${eyebrow("Submitted", c.steel)}
                  <div style="padding-top:6px;font-family:${font.body};font-size:15px;line-height:22px;color:${c.graphite};">${stamp(submittedAt)}</div>
                </td>
              </tr>
            </table>

            ${heading("What happens next")}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
${steps
  .map(
    ([title, text], i) => `              <tr>
                <td valign="top" width="44" style="padding:6px 0 14px;font-family:${font.mono};font-size:13px;line-height:22px;font-weight:600;color:${c.gold};">0${i + 1}</td>
                <td valign="top" style="padding:6px 0 14px;">
                  <div style="font-family:${font.display};font-size:16px;line-height:22px;font-weight:600;color:${c.graphite};">${title}</div>
                  <div style="padding-top:3px;font-family:${font.body};font-size:14px;line-height:22px;color:${c.text};">${text}</div>
                </td>
              </tr>`,
  )
  .join("\n")}
            </table>

            ${heading("Your enquiry")}
            ${details([
              ["Name", esc(f.name)],
              ["Company", esc(f.company)],
              ["Country", esc(f.country)],
              ["Product", esc(f.range)],
            ])}
            <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
            ${specification(f.message)}

            <div style="height:32px;line-height:32px;font-size:0;">&nbsp;</div>
            ${para(`Need to add a drawing, revise a quantity or change the destination port? Simply <strong style="color:${c.graphite};">reply to this email</strong> and keep the reference in the subject line. For anything urgent, we're on WhatsApp.`)}
            <div style="padding-top:4px;">
              ${button(whatsapp, "Chat on WhatsApp")}${button(catalogue, "Download catalogue", "outline")}
            </div>

            <div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>
            ${para(`Warm regards,<br><strong style="color:${c.graphite};">Export Desk</strong><br>${site.name}, ${site.city}`, "margin:0;")}`;

  const html = shell({
    title: subject,
    preheader: `Thanks, ${name} — we'll reply within one working day. Your reference is ${ref}.`,
    body,
    footnote: `You're receiving this because an enquiry was submitted at ${link(`${site.url}/contact`, host, c.steel)} with this address. If that wasn't you, you can safely ignore this email.`,
  });

  const text = `Thank you, ${name}.

Your enquiry has reached our export desk in ${site.city}. A member of the team will come back to you within one working day — usually with a quotation, or with a short question if a detail in the specification needs confirming.

Reference: ${ref}
Submitted: ${stamp(submittedAt)}

WHAT HAPPENS NEXT
${steps.map(([t, d], i) => `${i + 1}. ${t} — ${d}`).join("\n")}

YOUR ENQUIRY
Name:     ${f.name}
Company:  ${f.company}
Country:  ${f.country}
Product:  ${f.range}

${f.message}

Need to add a drawing, revise a quantity or change the destination port? Reply to this email and keep the reference in the subject line.

WhatsApp: ${whatsapp}
Catalogue: ${catalogue}

Warm regards,
Export Desk
${site.name}, ${site.city}
${site.contact.email} · ${site.contact.phone}
${site.url}
`;

  return { subject, html, text, attachments };
}

export function teamEmail(f: Enquiry, { ref, submittedAt }: EnquiryMeta): Email {
  const subject = oneLine(`New enquiry: ${f.company} (${f.country}) · ${f.range} [${ref}]`);
  const replyHref = `mailto:${f.email}?subject=${encodeURIComponent(
    `Re: Your enquiry ${ref} — ${site.name}`,
  )}`;
  const due = replyDue(submittedAt);

  const fact = (label: string, value: string, first = false) => `
                <td class="cell" valign="top" width="33%" style="padding:14px 18px;${first ? "" : `border-left:1px solid ${c.rule};`}">
                  ${eyebrow(label, c.steel)}
                  <div style="padding-top:6px;font-family:${font.body};font-size:14px;line-height:20px;font-weight:600;color:${c.graphite};">${value}</div>
                </td>`;

  const body = `
            ${eyebrow(`New website enquiry · ${ref}`)}
            <h1 class="h1" style="margin:10px 0 6px;font-family:${font.display};font-size:28px;line-height:34px;font-weight:600;color:${c.graphite};">${esc(f.company)}</h1>
            <p style="margin:0 0 24px;font-family:${font.body};font-size:15px;line-height:22px;color:${c.steel};">${esc(f.name)}&nbsp;&nbsp;·&nbsp;&nbsp;${esc(f.country)}</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack" style="margin-bottom:24px;border:1px solid ${c.rule};border-radius:12px;">
              <tr>${fact("Product", esc(f.range), true)}${fact("Received", stamp(submittedAt))}${fact("Reply due", due)}
              </tr>
            </table>

            <div style="padding-bottom:32px;">
              ${button(replyHref, `Reply to ${firstName(f.name)}`)}
            </div>

            ${heading("Specification, quantity &amp; port")}
            ${specification(f.message)}

            <div style="height:32px;line-height:32px;font-size:0;">&nbsp;</div>
            ${heading("Contact")}
            ${details([
              ["Name", esc(f.name)],
              ["Company", esc(f.company)],
              ["Email", link(`mailto:${f.email}`, esc(f.email))],
              ["Country", esc(f.country)],
              ["Product", esc(f.range)],
              ["Reference", `<span style="font-family:${font.mono};font-size:14px;">${ref}</span>`],
            ])}

            <div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:${c.ivory};border-radius:10px;padding:14px 18px;font-family:${font.body};font-size:13px;line-height:20px;color:${c.text};">
                  Hitting <strong>Reply</strong> on this email writes straight to ${esc(f.email)}. The buyer has already received an acknowledgement quoting reference <strong style="font-family:${font.mono};">${ref}</strong> and a promise of a reply within one working day.
                </td>
              </tr>
            </table>`;

  const html = shell({
    title: subject,
    preheader: `${f.name} · ${f.country} · ${f.range} — reply due ${due}`,
    body,
    footnote: `Sent automatically from the enquiry form at ${link(`${site.url}/contact`, `${host}/contact`, c.steel)}.`,
  });

  const text = `NEW WEBSITE ENQUIRY · ${ref}

${f.company}
${f.name} · ${f.country}

Product:    ${f.range}
Received:   ${stamp(submittedAt)}
Reply due:  ${due}

SPECIFICATION, QUANTITY & PORT
${f.message}

CONTACT
Name:     ${f.name}
Company:  ${f.company}
Email:    ${f.email}
Country:  ${f.country}

Reply to this email to write straight to the buyer. They have already received an acknowledgement quoting ${ref}.
`;

  return { subject, html, text, attachments };
}
