import { RangeCard } from "@/components/range-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import { ranges } from "@/lib/products";

export function RangesSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="Three ranges"
          title="What we ship"
          lede="Every line is sourced from an Indian manufacturing partner we have vetted, then checked against the grade and standard on your purchase order before it is packed."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ranges.map((r, i) => (
            <Reveal key={r.slug} delay={i * 80} className="h-full">
              <RangeCard
                range={r}
                count={r.groups.reduce((n, g) => n + g.items.length, 0)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
