"use client";

import { scrollToTop } from "@/lib/utils";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="self-start cursor-pointer uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-white"
    >
      Back to top
    </button>
  );
}
