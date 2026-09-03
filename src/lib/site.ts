export const site = {
  name: "Chakraborty Overseas",
  tagline: "Trusted. Transparent. Committed.",
  role: "Merchant exporter of industrial fasteners",
  city: "Kolkata",
  url: "https://www.chakrabortyoverseas.com",
  description:
    "Kolkata-based merchant exporter of mild steel, stainless steel and high tension fasteners. Sourced from verified Indian manufacturing partners, checked against your specification and shipped with complete export documentation.",
  contact: {
    email: "exports@chakrabortyoverseas.com",
    // altEmail: "Chakraborty.overseas@gmail.com",
    phone: "+91 98316 47114",
    phoneHref: "+919831647114",
    whatsapp: "919831647114",
    address: "Kolkata, West Bengal, India",
    hours: "Monday – Saturday · 10:00 – 19:00 IST (GMT +5:30)",
    ports:
      "Kolkata · Haldia · Nhava Sheva (JNPT) · Mundra · Chennai · Tuticorin · Visakhapatnam · Cochin · Kandla · Krishnapatnam",
    airports: "Kolkata · Chennai · Mumbai · Delhi",
  },
  registrations: {
    // iec: "BAXPB6492D",
    // gstin: "19BAXPB6492D1Z9",
    // rcmc: "Applied for — awaiting issue",
    iec: "Available",
    gstin: "Available",
    rcmc: "Available",
  },
  incoterms: ["FOB", "CFR", "CIF", "EXW", "FCA", "CPT", "DAP", "CIP", "DDP"],
  hsHeading: "7318",
  /* GB (Chinese) dropped per the client's punch list; BSW and UNC added. */
  standards: [
    { code: "ISO", label: "International" },
    { code: "DIN", label: "German" },
    { code: "BIS / IS", label: "Indian" },
    { code: "ASTM", label: "American" },
    { code: "ANSI", label: "American" },
    { code: "BS", label: "British" },
    { code: "BSW", label: "Whitworth" },
    { code: "UNC", label: "Unified coarse" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
] as const;
