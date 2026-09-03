"use client";

import { Tilt } from "@/components/tilt";
import { ProductMedia } from "@/components/product-media";
import type { Product, Tone } from "@/lib/products";

/** A light wash under the artwork, tinted to the range's finish. */
const wash: Record<Tone, string> = {
  steel: "from-[#EAF0F3]",
  zinc: "from-[#F5EEDF]",
  black: "from-[#ECEEF0]",
};

export function ProductCard({
  product,
  tone,
  onOpen,
  index = 0,
}: {
  product: Product;
  tone: Tone;
  onOpen: (p: Product) => void;
  index?: number;
}) {
  return (
    <Tilt className="group h-full" max={9}>
      <article className="flex h-full flex-col overflow-hidden rounded-tile border border-line bg-white shadow-(--shadow-plate) transition-shadow duration-300 group-hover:shadow-(--shadow-lift)">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="relative block aspect-4/3 w-full overflow-hidden bg-white"
          aria-label={`Open details for ${product.name}`}
        >
          <span
            className="layer-3d absolute inset-0 flex items-center justify-center p-5 transition-transform duration-500 ease-out-soft group-hover:-translate-y-2 group-hover:scale-[1.07]"
            style={{ transform: "translateZ(28px)" }}
          >
            <ProductMedia product={product} tone={tone} priority={index < 4} />
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent opacity-70 ${wash[tone]}`}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 blueprint-light opacity-30 transition-opacity duration-500 group-hover:opacity-50"
          />
        </button>

        <div className="flex flex-1 flex-col p-5">
          <div className="min-h-31">
            <h3 className="font-display text-[1.02rem] font-semibold tracking-tight text-ink">
              {product.name}
            </h3>
            <dl className="mt-3 space-y-1.5 pb-4">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[62px_1fr] gap-2">
                  <dt className="font-mono mt-0.5 text-[0.56rem] uppercase tracking-[0.14em] text-steel">
                    {s.label}
                  </dt>
                  <dd className="text-[0.76rem] leading-snug text-ink/70">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="mt-auto inline-flex items-center gap-1.5 self-start border-b border-line pb-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-ink transition-colors hover:border-gold"
          >
            Details & enquiry
            <span aria-hidden>→</span>
          </button>
        </div>
      </article>
    </Tilt>
  );
}
