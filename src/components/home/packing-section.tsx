import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { StandardsStrip } from "@/components/ui";

const packing = [
  "Oiled or VCI-protected goods in moisture-resistant liners against condensation",
  "Export-grade cartons, then palletised, strapped and stretch-wrapped",
  "Wooden cases with ISPM-15 heat treatment where the destination requires it",
  "Cartons marked with item, size, grade, batch, net and gross weight",
  "Packing list matched carton by carton to the invoice",
  "Bulk and small-pack options — loose kegs, boxes or retail bags to your count",
];

export function PackingSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Export packaging</p>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold tracking-tight text-balance">
            Packed for the sea, not the shelf
          </h2>
          <p className="mt-5 text-ink/70 text-pretty">
            Fasteners travel for weeks in a steel box that sweats. Packing is
            where a good consignment is quietly lost, so we treat it as part of
            the specification rather than an afterthought.
          </p>
          <ul className="mt-4">
            {packing.map((p) => (
              <li
                key={p}
                className="relative border-b border-line-soft py-2 pl-7 text-[0.94rem]"
              >
                <span
                  className="absolute left-0 top-[1.3em] h-px w-3.5 bg-gold"
                  aria-hidden
                />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="space-y-4">
          <div className="relative aspect-16/10 overflow-hidden rounded-tile border border-line">
            <Image
              src="/facility/warehouse.webp"
              alt="Packed stock in warehouse racking before loading"
              fill
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="shell mt-16">
        <Reveal>
          <p className="spec-label mb-4">Standards we quote against</p>
          <StandardsStrip />
        </Reveal>
      </div>
    </section>
  );
}
