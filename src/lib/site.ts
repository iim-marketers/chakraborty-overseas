export const site = {
  name: "Chakraborty Overseas",
  tagline: "Trusted. Transparent. Committed.",
  role: "Merchant exporter of industrial fasteners",
  legalForm: "sole proprietorship",
  city: "Howrah (Kolkata), West Bengal",
  url: "https://www.chakrabortyoverseas.com",
  description:
    "Merchant exporter of mild steel, stainless steel and high tension fasteners, based in Howrah (Kolkata), West Bengal. Sourced from verified Indian manufacturing partners, checked against your specification and shipped with complete export documentation.",
  contact: {
    email: "exports@chakrabortyoverseas.com",
    phone: "+91 98316 47114",
    phoneHref: "+919831647114",
    whatsapp: "919831647114",
    address:
      "30/2 Shib Chandra Chatterjee Street, Belur Bazar, Howrah 711202, West Bengal, India",
    postal: {
      street: "30/2 Shib Chandra Chatterjee Street, Belur Bazar",
      locality: "Howrah",
      postcode: "711202",
      region: "West Bengal",
      country: "IN",
    },
    hours: "Monday – Saturday · 10:00 – 19:00 IST (GMT +5:30)",
    responseTime: "Every enquiry answered within one working day",
    quoting: "Quotations issued in USD, EUR, GBP or INR — tell us which you prefer",
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
  downloads: {
    catalogue: "chakraborty-overseas-catalogue.pdf",
    profile: "chakraborty-overseas-company-profile.pdf",
  },
  incoterms: ["FOB", "CFR", "CIF", "FCA", "CPT", "CIP"],
  incotermsOnRequest: ["EXW"],
  hsHeading: "7318",
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
