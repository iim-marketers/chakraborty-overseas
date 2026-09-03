"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Country } from "@/lib/countries";

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  countries: Country[];
  invalid?: boolean;
  className?: string;
};

export function CountrySelect({
  id,
  name,
  value,
  onChange,
  countries,
  invalid,
  className = "",
}: Props) {
  const listId = `${useId()}-list`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const matches = useMemo(() => {
    const q = fold((query ?? "").trim());
    if (!q) return countries;
    const starts: Country[] = [];
    const contains: Country[] = [];
    for (const c of countries) {
      const folded = fold(c.name);
      if (folded.startsWith(q) || fold(c.code) === q) starts.push(c);
      else if (folded.includes(q)) contains.push(c);
    }
    return [...starts, ...contains];
  }, [countries, query]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const row = list?.children[active];
    if (!list || !row) return;
    const l = list.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    if (r.top < l.top) list.scrollTop -= l.top - r.top;
    else if (r.bottom > l.bottom) list.scrollTop += r.bottom - l.bottom;
  }, [open, active]);

  const show = () => {
    setOpen(true);
    setActive(
      Math.max(
        0,
        matches.findIndex((c) => c.name === value),
      ),
    );
  };

  const close = () => {
    setOpen(false);
    setQuery(null);
  };

  const pick = (c: Country) => {
    onChange(c.name);
    close();
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return show();
      if (matches.length === 0) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      if (open && matches[active]) {
        /* Picking must not also submit the enquiry. */
        e.preventDefault();
        pick(matches[active]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        close();
      }
    } else if (e.key === "Tab") {
      close();
    }
  };

  /* No list to search — the API was unreachable. Degrade to a plain field. */
  if (countries.length === 0) {
    return (
      <input
        id={id}
        name={name}
        type="text"
        autoComplete="country-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!invalid}
        className={className}
      />
    );
  }

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && matches[active] ? `${listId}-${active}` : undefined
        }
        aria-invalid={!!invalid}
        placeholder="Search countries"
        value={query ?? value}
        onChange={(e) => {
          const next = e.target.value;
          setQuery(next);
          onChange(next);
          setActive(0);
          setOpen(true);
        }}
        onFocus={show}
        onClick={() => !open && show()}
        onKeyDown={onKeyDown}
        className={`${className} pr-11`}
      />

      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => (open ? close() : (inputRef.current?.focus(), show()))}
        className="absolute right-0 top-0 flex h-full w-11 items-center justify-center text-steel transition-colors hover:text-gold-light"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1.5 4L6 8.5L10.5 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Countries"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-45 max-h-[min(16rem,45vh)] overflow-y-auto overscroll-contain dark-scrollbar rounded-xl border border-white/12 bg-graphite py-1 shadow-2xl shadow-black/50 sm:max-h-72"
        >
          {matches.map((c, i) => {
            const selected = c.name === value;
            return (
              <li
                key={c.code || c.name}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onMouseMove={() => i !== active && setActive(i)}
                onClick={() => pick(c)}
                className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-[0.9rem] transition-colors sm:py-2 ${
                  i === active ? "bg-white/8 text-gold-light" : "text-ivory"
                }`}
              >
                <span
                  aria-hidden
                  className="w-5 shrink-0 text-[1rem] leading-none"
                >
                  {c.flag}
                </span>
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                {c.code && (
                  <span className="shrink-0 font-mono text-[0.6rem] tracking-[0.14em] text-steel">
                    {c.code}
                  </span>
                )}
              </li>
            );
          })}

          {matches.length === 0 && (
            <li className="px-4 py-3 text-[0.85rem] text-steel-light">
              No match — we will take “{(query ?? value).trim()}” as typed.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
