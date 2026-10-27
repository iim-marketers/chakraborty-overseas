import { SectionHead } from "@/components/ui";

const steps = [
  {
    n: "01",
    title: "Specification",
    body: "You send size, grade, standard, finish and quantity. We come back with anything that needs pinning down before we go to a mill.",
  },
  {
    n: "02",
    title: "Sourcing",
    body: "We place the enquiry with manufacturing partners who already make that item at that grade, and quote with lead time and packing.",
  },
  {
    n: "03",
    title: "Inspection",
    body: "Goods are checked before dispatch — dimensions, grade markings, plating and count. Third-party inspection on request.",
  },
  {
    n: "04",
    title: "Export packing",
    body: "Packed for sea freight: moisture protection, marked cartons, palletised and strapped for the container.",
  },
  {
    n: "05",
    title: "Documents",
    body: "Invoice, packing list, certificate of origin, mill test certificates and shipping documents, matched to your bank's requirement.",
  },
  {
    n: "06",
    title: "Freight & delivery",
    body: "Booked with our freight forwarding partners — sea or air — cleared through customs at the port of loading and delivered to your destination.",
  },
];

export function ProcessSection() {
  return (
    <section className="on-dark relative overflow-hidden bg-graphite py-12 text-ivory lg:py-16">
      <div className="blueprint absolute inset-0 opacity-70" aria-hidden />
      <div className="shell relative">
        <SectionHead
          eyebrow="From enquiry to bill of lading"
          title="How an order runs"
          lede="We are a merchant exporter, so our work sits between your purchase order and the factory gate. This is the sequence every order follows."
          dark
        />

        <ol className="grid gap-px overflow-hidden rounded-tile border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="group relative bg-graphite p-7 transition-colors hover:bg-carbon"
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold">
                Step {s.n}
              </span>
              <h3 className="mt-5 font-display text-[1.05rem] font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[0.85rem] leading-relaxed text-steel-light">
                {s.body}
              </p>
              {i < steps.length - 1 && (i + 1) % 3 !== 0 && (
                <span
                  className="absolute right-5 top-7 hidden h-px w-5 bg-white/20 transition-all duration-300 group-hover:w-7 group-hover:bg-gold lg:block"
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
