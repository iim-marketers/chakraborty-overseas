import Link from "next/link";
import { GradeStage } from "@/components/grade-stage";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-130 w-205 -translate-x-1/2 rounded-full bg-gold/12 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink"
        aria-hidden
      />

      <div className="shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-10 lg:py-16">
        <div className="min-w-0 max-w-xl animate-rise">
          <p className="eyebrow">Mild steel · Stainless steel · High tension</p>

          <h1 className="mt-6 text-[clamp(2.5rem,6.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance">
            <span className="block text-[0.42em] font-light tracking-[0.01em] text-steel-light">
              Sourcing fasteners out of India?
            </span>
            The bolt is <span className="gold-text">the easy part.</span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-steel-light text-pretty">
            Finding a mill that holds the grade, meets the shipment date and
            hands over documents that clear customs — that is the work.{" "}
            {site.name} is a merchant exporter in Kolkata. We source from
            verified Indian manufacturing partners, check the goods against your
            specification, and ship them properly packed and papered.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-gold">
              View products
            </Link>
            <Link href="/contact" className="btn btn-outline-light">
              Get a quote
            </Link>
          </div>

          <dl className="mt-11 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3">
            {[
              ["IEC", "Available"],
              ["GSTIN", "Available"],
              ["EEPC RCMC", "Available"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-light">
                  {k}
                </dt>
                <dd className="mt-1.5 font-mono text-[0.76rem] leading-snug text-steel-light">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ------------------------ the grade stage ------------------------ */}
        <figure className="mx-auto w-full min-w-0 max-w-135 animate-rise overflow-hidden rounded-tile border border-white/10 bg-carbon shadow-(--shadow-lift) [animation-delay:160ms]">
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/10 px-6 py-4 font-mono text-[0.58rem] uppercase tracking-[0.18em]">
            <span className="text-gold-light">Three ranges</span>
            <span className="text-steel">Grade stamped on every head</span>
          </figcaption>

          <GradeStage />

          <div className="p-6">
            <p className="text-[0.88rem] leading-relaxed text-steel-light text-pretty">
              The property class is stamped on the head — the one thing you can
              verify the moment the container is opened. We check it against
              your purchase order before the carton is sealed.
            </p>
            {/* <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-white/10 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-steel">
              <span>M3 – M72</span>
              <span>{site.standards.map((s) => s.code).join(" · ")}</span>
            </div> */}
          </div>
        </figure>
      </div>
    </section>
  );
}
