"use client";

import { scrollToTop } from "@/lib/utils";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="self-start cursor-pointer uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-ink"
    >
      Back to top
    </button>
  );
}
