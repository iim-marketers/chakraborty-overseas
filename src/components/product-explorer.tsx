"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ProductCard } from "@/components/product-card";
import { QuickView } from "@/components/quick-view";
import type { Product, Range } from "@/lib/products";
import { scrollBehavior } from "@/lib/utils";

const ALL = "All";
const GUTTER = "clamp(18px,4.2vw,46px)";

export function ProductExplorer({ range }: { range: Range }) {
  const [group, setGroup] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Product | null>(null);
  const [fade, setFade] = useState({ left: false, right: false });

  const barRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef(new Map<string, HTMLButtonElement>());
  const pendingScroll = useRef(false);

  const q = query.trim().toLowerCase();

  const matched = useMemo(
    () =>
      range.groups.map((g) => ({
        ...g,
        items: g.items.filter(
          (i) =>
            !q ||
            i.name.toLowerCase().includes(q) ||
            i.specs.some((s) => s.value.toLowerCase().includes(q)),
        ),
      })),
    [range, q],
  );

  const chips = useMemo(
    () => [
      { title: ALL, count: matched.reduce((n, g) => n + g.items.length, 0) },
      ...matched.map((g) => ({ title: g.title, count: g.items.length })),
    ],
    [matched],
  );

  const visible = matched.filter(
    (g) => (group === ALL || g.title === group) && g.items.length > 0,
  );
  const total = visible.reduce((n, g) => n + g.items.length, 0);

  const updateFade = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const left = rail.scrollLeft > 4;
    const right = rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4;
    setFade((f) =>
      f.left === left && f.right === right ? f : { left, right },
    );
  }, []);

  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, [updateFade, chips]);

  const reveal = useCallback((title: string) => {
    const behavior = scrollBehavior();

    const rail = railRef.current;
    const chip = chipRefs.current.get(title);
    if (rail && chip) {
      rail.scrollTo({
        left: chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2,
        behavior,
      });
    }

    const bar = barRef.current;
    const list = listRef.current;
    if (bar && list) {
      const stuckAt = parseFloat(getComputedStyle(bar).top) || 0;
      const top =
        list.getBoundingClientRect().top +
        window.scrollY -
        stuckAt -
        bar.offsetHeight;
      window.scrollTo({ top: Math.max(top, 0), behavior });
    }
  }, []);

  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    reveal(group);
  }, [group, reveal]);

  const select = (title: string) => {
    if (title === group) {
      reveal(title);
      return;
    }
    pendingScroll.current = true;
    setGroup(title);
  };

  const mask = `linear-gradient(to right, transparent 0, #000 ${
    fade.left ? 28 : 0
  }px, #000 calc(100% - ${fade.right ? 28 : 0}px), transparent 100%)`;

  return (
    <div>
      <div
        ref={barRef}
        className="sticky top-18.5 z-30 mb-8 flex flex-col gap-3 bg-ivory/90 py-3 backdrop-blur-md lg:flex-row lg:items-center lg:gap-5"
        style={{ marginInline: `calc(-1 * ${GUTTER})`, paddingInline: GUTTER }}
      >
        <div
          ref={railRef}
          onScroll={updateFade}
          className="no-scrollbar relative -mx-(--gutter) flex min-w-0 gap-2 overflow-x-auto px-(--gutter) lg:mx-0 lg:flex-1 lg:px-0"
          style={
            {
              "--gutter": GUTTER,
              maskImage: mask,
              WebkitMaskImage: mask,
            } as CSSProperties
          }
          role="toolbar"
          aria-label="Filter by category"
        >
          {chips.map(({ title, count }) => {
            const active = group === title;
            const empty = count === 0;
            return (
              <button
                key={title}
                ref={(el) => {
                  if (el) chipRefs.current.set(title, el);
                  else chipRefs.current.delete(title);
                }}
                type="button"
                onClick={() => select(title)}
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-2 rounded-full border py-2 pl-4 pr-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-[background-color,border-color,color,opacity] duration-200 ${
                  active
                    ? "border-ink bg-ink text-ivory shadow-[0_6px_16px_-8px_rgba(8,12,17,0.55)]"
                    : "border-line bg-white text-ink/65 hover:border-ink/40 hover:text-ink"
                } ${empty && !active ? "opacity-45" : ""}`}
              >
                {title}
                <span
                  className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[0.56rem] tracking-normal tabular-nums ${
                    active ? "bg-white/15 text-gold-light" : "bg-ivory-2 text-steel"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <label className="relative shrink-0 lg:w-72">
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
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search size, grade or standard"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-10 text-[0.85rem] outline-none transition-colors placeholder:text-steel/70 focus:border-gold [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-steel transition-colors hover:bg-ivory-2 hover:text-ink"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                <path
                  d="M1.5 1.5l7 7M8.5 1.5l-7 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </label>
      </div>

      <div ref={listRef}>
        {total === 0 && (
          <p className="tile px-6 py-10 text-center text-ink/60">
            {q
              ? `Nothing ${group === ALL ? "in this range" : `under ${group}`} matches “${query}”.`
              : "Nothing listed here yet."}{" "}
            We quote non-standard items too — send the specification and we
            will source it.
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
