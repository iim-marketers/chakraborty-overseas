import type { Metadata } from "next";
import {
  FreightSection,
  Hero,
  IndustriesSection,
  PackingSection,
  ProcessSection,
  RangesSection,
  WhereWeSitSection,
} from "@/components/home";
import { CTABand } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Fastener Merchant Exporter, Kolkata, India`,
  description:
    "Mild steel, stainless steel and high tension fasteners sourced from verified Indian manufacturers, quality-checked, export packed and shipped worldwide from Kolkata.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Fastener Merchant Exporter, Kolkata`,
    description:
      "Mild steel, stainless steel and high tension fasteners sourced from verified Indian manufacturers, quality-checked and exported worldwide.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <RangesSection />
      <WhereWeSitSection />
      <ProcessSection />
      <PackingSection />
      <FreightSection />
      <IndustriesSection />
      <CTABand />
    </>
  );
}
