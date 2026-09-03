"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { QuickView } from "@/components/quick-view";
import type { Product, Range } from "@/lib/products";

export function ProductExplorer({ range }: { range: Range }) {
  const [group, setGroup] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Product | null>(null);

  const groups = useMemo(
    () => ["All", ...range.groups.map((g) => g.title)],
    [range],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return range.groups
      .filter((g) => group === "All" || g.title === group)
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) =>
            !q ||
            i.name.toLowerCase().includes(q) ||
            i.specs.some((s) => s.value.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [range, group, query]);

  const total = visible.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      {/* controls */}
      <div className="sticky top-18.5 z-30 -mx-1 mb-10 flex flex-col gap-3 bg-ivory/85 px-1 py-3 backdrop-blur-md lg:flex-row lg:items-center">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors ${
                group === g
                  ? "border-ink bg-ink text-ivory"
                  : "border-line bg-white text-ink/60 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <label className="relative lg:ml-auto lg:w-72">
          <span className="sr-only">Search this range</span>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden
          >
            <circle
              cx="5.5"
              cy="5.5"
              r="4.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M8.8 8.8L12 12" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search size, grade or standard"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-[0.85rem] outline-none transition-colors placeholder:text-steel/70 focus:border-gold"
          />
        </label>
      </div>

      {total === 0 && (
        <p className="tile px-6 py-10 text-center text-ink/60">
          Nothing in this range matches “{query}”. We quote non-standard items
          too — send the specification and we will source it.
        </p>
      )}

      <div className="space-y-16">
        {visible.map((g) => (
          <section key={g.title}>
            <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-5">
              <h2 className="font-display text-[1.35rem] font-semibold tracking-tight">
                {g.title}
              </h2>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
                {g.items.length} {g.items.length === 1 ? "line" : "lines"}
              </span>
              {g.note && (
                <p className="basis-full text-[0.86rem] text-ink/55 lg:basis-auto">
                  {g.note}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((item, i) => (
                <ProductCard
                  key={item.slug}
                  product={item}
                  tone={range.tone}
                  index={i}
                  onOpen={setOpen}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <QuickView
        product={open}
        tone={range.tone}
        rangeName={range.shortName}
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
