"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ranges } from "@/lib/products";

export function SiteHeader() {
  /* Menu state is keyed to the route, so a navigation closes both menus
     without an effect having to reset them. */
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [rangedPath, setRangedPath] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const pathname = usePathname();
  const open = openPath === pathname;
  const ranged = rangedPath === pathname;

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          stuck
            ? "border-b border-line bg-ivory/85 backdrop-blur-xl"
            : "border-b border-transparent bg-ivory/60 backdrop-blur-sm"
        }`}
      >
        <div className="shell flex h-18.5 items-center gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label={`${site.name}, home`}
          >
            <Image
              src="/logo.png"
              alt=""
              width={52}
              height={52}
              priority
              className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_4px_10px_rgba(200,162,74,.35)]"
            />
            <span className="min-w-0 leading-none">
              <span className="block truncate font-display text-[0.92rem] font-semibold tracking-tight sm:text-[1.02rem]">
                Chakraborty Overseas
              </span>
              <span className="mt-1 block truncate font-mono text-[0.5rem] uppercase tracking-[0.16em] text-steel sm:text-[0.55rem] sm:tracking-[0.24em]">
                Fastener export · Kolkata
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.href === "/products" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setRangedPath(pathname)}
                  onMouseLeave={() => setRangedPath(null)}
                >
                  <Link
                    href="/products"
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.86rem] font-medium transition-colors ${
                      active(item.href)
                        ? "text-ink"
                        : "text-ink/65 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M1 1l3.5 3.5L8 1"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </Link>
                  {ranged && (
                    <div className="absolute left-1/2 top-full w-135 -translate-x-1/2 pt-3">
                      <div className="tile overflow-hidden p-2 shadow-(--shadow-lift)">
                        <p className="spec-label px-3 pb-1 pt-2">Ranges</p>
                        <div className="grid gap-1">
                          {ranges.map((r) => (
                            <Link
                              key={r.slug}
                              href={`/products/${r.slug}`}
                              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ivory-2"
                            >
                              <span className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-gold-ink">
                                {r.code.replace("Range ", "")}
                              </span>
                              <span>
                                <span className="block font-display text-[0.95rem] font-semibold group-hover:text-gold-ink">
                                  {r.shortName}
                                </span>
                                <span className="block text-[0.78rem] leading-snug text-ink/55">
                                  {r.tagline}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-[0.86rem] font-medium transition-colors ${
                    active(item.href)
                      ? "text-ink"
                      : "text-ink/65 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <Link
            href="/contact"
            className="btn btn-gold btn-sm ml-auto hidden lg:ml-4 lg:inline-flex"
          >
            Get a quote
          </Link>

          {/* burger */}
          <button
            type="button"
            onClick={() => setOpenPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-[1.6px] w-4 bg-ink transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.6px] w-4 bg-ink transition-opacity duration-300 ${
                  open ? "top-1.5 opacity-0" : "top-1.5"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.6px] w-4 bg-ink transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu — a floating card, not a full-screen takeover. */}
      <div
        className={`fixed inset-0 z-55 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpenPath(null)}
        aria-hidden
      />

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed inset-x-3 top-21.5 z-60 origin-top overflow-hidden rounded-[26px] border border-line bg-ivory shadow-[0_40px_80px_-30px_rgba(8,12,17,.55)] transition-all duration-300 ease-out-soft lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.97] opacity-0"
        }`}
      >
        <div className="max-h-[min(74vh,620px)] overflow-y-auto overscroll-contain">
          {/* ranges first — that is what buyers come for */}
          <div className="bg-ink px-4 pb-4 pt-4 text-ivory">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-light">
              Ranges
            </p>
            <div className="mt-3 grid gap-2">
              {ranges.map((r, i) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  tabIndex={open ? 0 : -1}
                  style={{ transitionDelay: `${open ? 60 + i * 45 : 0}ms` }}
                  className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-3.5 py-3 transition-all duration-300 ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 font-mono text-[0.6rem] text-gold-light">
                    {r.code.replace("Range ", "")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[0.98rem] font-semibold leading-tight text-white">
                      {r.shortName}
                    </span>
                    <span className="block truncate text-[0.74rem] text-steel-light">
                      {r.tagline}
                    </span>
                  </span>
                  <span className="ml-auto text-gold-light" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* the rest of the site, two up */}
          <nav className="grid grid-cols-2 gap-px bg-line">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                className={`bg-ivory px-4 py-3.5 font-display text-[0.98rem] font-semibold tracking-tight transition-colors ${
                  active(item.href) ? "text-gold-ink" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 border-t border-line bg-ivory-2 p-3">
            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              className="btn btn-gold btn-sm flex-1"
            >
              Get a quote
            </Link>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              aria-label="WhatsApp"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-ink"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.25-4.38 8.23 8.23 0 118.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 01-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.17-.47-.29z" />
              </svg>
            </a>
            <a
              href={`tel:${site.contact.phoneHref}`}
              tabIndex={open ? 0 : -1}
              aria-label="Call"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-ink"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 2h3l1.4 3.2-1.7 1.4a10 10 0 004.7 4.7l1.4-1.7L15 11v3a1 1 0 01-1.1 1A12.5 12.5 0 012 3.1 1 1 0 013 2z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
