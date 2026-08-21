import { site } from "@/lib/site";

const items = [
  ["Merchant exporter", "Kolkata, India"],
  ["HS heading", site.hsHeading],
  ["Terms", site.incoterms.join(" / ")],
  ["Ports", "Kolkata · Haldia · Nhava Sheva"],
  ["IEC", site.registrations.iec],
  ["GSTIN", site.registrations.gstin],
];

export function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-ink py-2">
      <div className="flex w-max animate-[var(--animate-marquee)] gap-10 pr-10">
        {row.map(([label, value], i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel-light/70"
          >
            <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
            {label} <b className="font-medium text-gold-light">{value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
