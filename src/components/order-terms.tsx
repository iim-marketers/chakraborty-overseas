import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

const leadTimes = [
  { weeks: "2–3", label: "Standard sizes", note: "Regular catalogue items" },
  { weeks: "3–6", label: "Made to order", note: "Special sizes or your drawing" },
  {
    weeks: "2–8",
    label: "Heat treated, HSFG or special coating",
    note: "Extra processing time at the mill",
  },
];

const payments: { balance: string; detail?: string }[] = [
  {
    balance: "After we send a scanned copy of the bill of lading",
    detail:
      "The bill of lading is the shipping line's receipt. It shows your goods are loaded on the vessel.",
  },
  { balance: "Bank to bank" },
  {
    balance: "By letter of credit (LC) at sight",
    detail:
      "Your bank guarantees the payment and releases it as soon as it receives the shipping documents.",
  },
];

const documents = [
  ["Commercial invoice", "The bill for the goods"],
  ["Packing list", "What is in each carton, with weights"],
  ["Certificate of origin", "Shows the goods are made in India"],
  ["Mill test certificates", "The manufacturer's material and strength test report"],
  ["Bill of lading or airway bill", "The shipping receipt, by sea or by air"],
];

function Row({
  label,
  summary,
  children,
}: {
  label: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 bg-white p-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-10 lg:p-8">
      <div>
        <p className="spec-label">{label}</p>
        <h3 className="mt-2 font-display text-[1.12rem] font-semibold tracking-tight text-balance">
          {summary}
        </h3>
      </div>
      <div className="min-w-0 text-[0.92rem] leading-relaxed text-ink/72">
        {children}
      </div>
    </div>
  );
}

export function OrderTerms() {
  return (
    <section className="py-12 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="Order terms"
          title="How ordering works"
          lede="Samples, timelines, payment and paperwork in plain words, so you know what to expect before you place an order."
        />

        <Reveal>
          <div className="space-y-px overflow-hidden rounded-tile border border-line bg-line">
            <Row label="Samples" summary="Free for catalogue items">
              <ul className="space-y-2.5">
                <li>
                  Up to <strong className="font-semibold text-ink">10 pieces of each size</strong>{" "}
                  from our standard catalogue, at no charge.
                </li>
                <li>
                  You pay only the courier. If you prefer, give us your own
                  courier account number and we will ship on it.
                </li>
                <li>
                  Samples made to your drawing are charged, and we deduct that
                  amount from your first order.
                </li>
              </ul>
            </Row>

            <Row label="Lead time" summary="2 to 8 weeks, depending on the item">
              <div className="grid gap-3 sm:grid-cols-3">
                {leadTimes.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-tile border border-line-soft bg-ivory p-4"
                  >
                    <p className="font-display text-[1.6rem] font-semibold leading-none tracking-tight">
                      {t.weeks}
                      <span className="ml-1.5 text-[0.82rem] font-medium text-ink/60">
                        weeks
                      </span>
                    </p>
                    <p className="mt-2.5 text-[0.86rem] font-semibold leading-snug text-ink">
                      {t.label}
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-snug text-ink/60">
                      {t.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                Time is counted from when we receive your confirmed purchase
                order, or your advance payment or LC, until the goods reach the
                port of loading in India. HSFG means high-strength friction-grip
                structural bolts.
              </p>
            </Row>

            <Row label="Payment" summary="30% advance, 70% balance. You choose how">
              <p>
                Every order starts with a 30% advance. You can pay the
                remaining 70% in any one of these three ways:
              </p>
              <ol className="mt-4 grid gap-3 lg:grid-cols-3">
                {payments.map((p, i) => (
                  <li
                    key={p.balance}
                    className="flex flex-col rounded-tile border border-line-soft bg-ivory p-4"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-ink">
                      Option {i + 1}
                    </p>
                    <div
                      className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-line"
                      aria-hidden
                    >
                      <span className="w-[30%] bg-gold" />
                      <span className="w-[70%] bg-ink/70" />
                    </div>
                    <p className="mt-1.5 flex justify-between font-mono text-[0.66rem] text-ink/55">
                      <span>30% advance</span>
                      <span>70% balance</span>
                    </p>
                    <p className="mt-3 text-[0.88rem] font-semibold leading-snug text-ink">
                      Balance: {p.balance}
                    </p>
                    {p.detail && (
                      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink/62">
                        {p.detail}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </Row>

            <Row label="Currency" summary="Quoted in the currency you prefer">
              <ul className="flex flex-wrap gap-2">
                {["USD", "EUR", "GBP", "INR"].map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line bg-ivory px-3.5 py-1 font-mono text-[0.8rem] text-ink"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Tell us which one when you enquire. The quotation and invoice
                will be in that currency.
              </p>
            </Row>

            <Row label="Documents" summary="Sent with every shipment">
              <dl className="divide-y divide-line-soft">
                {documents.map(([name, meaning]) => (
                  <div
                    key={name}
                    className="grid gap-0.5 py-2.5 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="font-semibold text-ink">{name}</dt>
                    <dd>{meaning}</dd>
                  </div>
                ))}
              </dl>
            </Row>

            <Row label="Shipping" summary="Quoted on the Incoterm you need">
              <p>
                {site.incoterms.join(", ")}. {site.incotermsOnRequest.join(" and ")}{" "}
                on request.
              </p>
              <p className="mt-2">
                <span className="font-semibold text-ink">Sea:</span>{" "}
                {site.contact.ports}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-ink">Air:</span>{" "}
                {site.contact.airports}
              </p>
            </Row>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
