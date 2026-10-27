import { IndustryIcon } from "@/components/diagrams";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";

const industries = [
  {
    icon: "construction",
    label: "Construction",
    note: "Structural sets, anchors, foundation bolts",
  },
  {
    icon: "automotive",
    label: "Automotive",
    note: "Class 10.9 and 12.9 socket and flange lines",
  },
  {
    icon: "infrastructure",
    label: "Infrastructure",
    note: "HSFG assemblies, galvanised fixings",
  },
  {
    icon: "rail",
    label: "Railways",
    note: "Heavy hex, fish plate and track fasteners",
  },
  {
    icon: "mining",
    label: "Mining & earthmoving",
    note: "JCB furniture, elevator bucket, fala bolts",
  },
  {
    icon: "agriculture",
    label: "Agriculture",
    note: "Carriage, U and J bolts, plated hardware",
  },
  {
    icon: "plant",
    label: "Plant & machinery",
    note: "Precision turned parts to drawing",
  },
  {
    icon: "aerospace",
    label: "Marine & offshore",
    note: "A4-80 and Super Duplex stainless",
  },
];

export function IndustriesSection() {
  return (
    <section className="border-t border-line bg-ivory-2 py-12 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="Where the goods end up"
          title="Industries we supply"
          lede="The same bolt does very different work depending on where it lands. Tell us the application and we will point you at the right grade and finish."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((i, idx) => (
            <Reveal key={i.label} delay={idx * 50}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-5 transition-colors hover:border-gold">
                <span
                  aria-hidden
                  className="blueprint-light absolute inset-0 opacity-50"
                />
                <div className="relative">
                  <IndustryIcon
                    name={i.icon}
                    className="h-9 w-9 text-gold-ink transition-transform duration-500 group-hover:-translate-y-0.5"
                  />
                  <h3 className="mt-4 font-display text-[1rem] font-semibold tracking-tight">
                    {i.label}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-snug text-ink/60">
                    {i.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
