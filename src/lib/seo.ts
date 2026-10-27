import type { Metadata } from "next";
import { site } from "@/lib/site";

// Next replaces a parent's openGraph wholesale, so every page spreads this in.
export const openGraphBase = {
  type: "website",
  siteName: site.name,
  locale: "en_IN",
  images: [
    {
      url: "/logo-large.png",
      width: 1024,
      height: 1024,
      alt: `${site.name} logo`,
    },
  ],
} satisfies Metadata["openGraph"];
