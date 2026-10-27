import type { MetadataRoute } from "next";
import { legalDocs } from "@/lib/legal";
import { ranges } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/products",
    "/catalogue",
    "/about",
    "/certifications",
    "/contact",
    "/legal",
  ];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...ranges.map((r) => ({
      url: `${site.url}/products/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalDocs.map((d) => ({
      url: `${site.url}/legal/${d.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
