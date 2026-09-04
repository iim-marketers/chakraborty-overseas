import type { MetadataRoute } from "next";
import { legalDocs } from "@/lib/legal";
import { ranges } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...ranges.map((r) => ({
      url: `${site.url}/products/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalDocs.map((d) => ({
      url: `${site.url}/legal/${d.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
