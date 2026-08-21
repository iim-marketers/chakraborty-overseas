"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ProductMedia } from "@/components/product-media";
import type { Product, Tone } from "@/lib/products";

export function QuickView({
  product,
  tone,
  rangeName,
  onClose,
}: {
  product: Product | null;
  tone: Tone;
  rangeName: string;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-ivory shadow-[var(--shadow-lift)] outline-none sm:rounded-3xl"
        style={{ animation: "rise .4s var(--ease-out-soft) both" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/90 text-ink transition-colors hover:bg-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div className="grid sm:grid-cols-[0.95fr_1.05fr]">
          <div
            className={`relative flex aspect-square items-center justify-center p-10 sm:aspect-auto sm:min-h-[400px] ${
              "bg-white"
            }`}
          >
            <div className="relative h-full max-h-[340px] w-full">
              <ProductMedia product={product} tone={tone} priority sizes="(max-width: 640px) 90vw, 380px" />
            </div>
            <span aria-hidden className="pointer-events-none absolute inset-0 blueprint-light opacity-30" />
          </div>

          <div className="p-7 sm:p-9">
            <p className="eyebrow">{rangeName}</p>
            <h2 className="mt-4 font-display text-[1.7rem] font-semibold tracking-tight">
              {product.name}
            </h2>
            {product.blurb && <p className="mt-3 text-[0.94rem] leading-relaxed text-ink/70">{product.blurb}</p>}

            <dl className="mt-6 divide-y divide-line-soft border-y border-line-soft">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[86px_1fr] gap-3 py-3">
                  <dt className="spec-label pt-0.5">{s.label}</dt>
                  <dd className="text-[0.9rem]">{s.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[0.82rem] leading-relaxed text-ink/55">
              Send the size, grade, finish and quantity and we will confirm availability, lead time
              and packing against it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="btn btn-gold btn-sm"
              >
                Enquire about this
              </Link>
              <Link href="/catalogue" className="btn btn-outline btn-sm">
                Download catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
