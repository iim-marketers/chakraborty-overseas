import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const freight = [
  "Booking and space confirmation with the carrier, by sea or by air",
  "Export documentation prepared and checked against your bank's requirement",
  "Customs clearance at the Indian port or airport of loading",
  "Delivery to your nominated port or airport of destination, on the agreed date",
];

export function FreightSection() {
  return (
    <section className="border-t border-line bg-white py-12 lg:py-16">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Reveal>
          <p className="eyebrow">Logistics</p>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold tracking-tight text-balance">
            Tied up with leading freight forwarders
          </h2>
          <p className="mt-5 text-ink/70 text-pretty">
            Sourcing and inspection only matter if the cargo arrives. We work
            with established freight forwarders across both sea and air cargo,
            so the shipping side is handled by people who do it every day — and
            you deal with one point of contact throughout.
          </p>
          <ul className="mt-4">
            {freight.map((f) => (
              <li
                key={f}
                className="relative border-b border-line-soft py-2 pl-7 text-[0.94rem]"
              >
                <span
                  className="absolute left-0 top-[1.3em] h-px w-3.5 bg-gold"
                  aria-hidden
                />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-tile border border-line bg-ivory-2 p-7">
            <p className="spec-label">Sea ports</p>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink/75">
              {site.contact.ports}
            </p>
            <p className="spec-label mt-7">Airports</p>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink/75">
              {site.contact.airports}
            </p>
            <p className="mt-7 border-t border-line pt-5 text-[0.85rem] leading-relaxed text-ink/60">
              Shipping on {site.incoterms.join(" / ")} terms. Tell us the
              incoterm your purchase order runs on and we will quote to it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
