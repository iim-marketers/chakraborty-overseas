export type Tone = "steel" | "zinc" | "black";

export type Product = {
  slug: string;
  name: string;
  /** Key into the in-house render library, see scripts/art/parts.mjs. */
  art: string;
  /** Product photograph; the render is used when this is absent. */
  photo?: string;
  /** Two spec rows shown on the card. */
  specs: { label: string; value: string }[];
  blurb?: string;
};

export type ProductGroup = {
  title: string;
  note?: string;
  items: Product[];
};

export type Range = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  tone: Tone;
  tagline: string;
  intro: string;
  /** Longer copy for the range page hero. */
  detail: string;
  /** Render shown behind the range hero. */
  heroArt: string;
  /** Photograph used on the range card and hero. */
  heroPhoto: string;
  sizeRange: string;
  finishNote: string;
  sheet: { label: string; value: string }[];
  groups: ProductGroup[];
  applications: string[];
};

export const ranges: Range[] = [
  /* ====================================================================== */
  {
    slug: "stainless-steel",
    code: "Range 01",
    name: "Stainless Steel Fasteners",
    shortName: "Stainless Steel",
    tone: "steel",
    tagline: "A2 / A4 and Super Duplex, for water, salt and chemistry",
    intro:
      "Bright and passivated stainless in 304, 316 and Super Duplex — the range buyers specify when the fastener has to outlive the structure it holds together.",
    detail:
      "Our stainless partner runs 202, 304, 304L, 316, 316L and Super Duplex across the full standard catalogue: bolts, nuts, washers, screws, threaded rod, anchors and made-to-drawing specials. Sizes run from M2.5 to M72, with self-tapping and self-drilling screws in ST2.9 to ST6.3, and BSW and UNC threads available on several lines.",
    heroArt: "group-bolts",
    heroPhoto: "/cutouts/hex-bolt.webp",
    sizeRange: "M2.5 – M72 · ST2.9 – ST6.3 · BSW / UNC on request",
    finishNote:
      "Shown in bright and passivated stainless — electropolished and PTFE coated to order",
    sheet: [
      /* Grade 410 removed; 202 / Super Duplex added; A2 = SS 304, A4 = SS 316.
         Draft 2: one grade set runs across every fastener type in this range. */
      {
        label: "Grades",
        value:
          "SS 202 · SS 304 (A2) · SS 316 (A4) · SS 304L · SS 316L · SS Super Duplex — the same set across every type",
      },
      { label: "Standards", value: "BIS, IS, DIN, ASTM, BSW, UNC" },
      {
        label: "Sizes",
        value:
          "M2.5 – M72 bolts, nuts, screws, washers and studs · ST2.9 – ST6.3 self-tapping and self-drilling",
      },
      {
        label: "Finish",
        value: "Self colour, passivated, electropolished, PTFE coated",
      },
      {
        label: "Typical use",
        value:
          "Marine and offshore, food and chemical plant, façades, water treatment",
      },
    ],
    applications: [
      "Marine & offshore",
      "Chemical & food plant",
      "Water treatment",
      "Architectural façades",
    ],
    groups: [
      {
        title: "Bolts & screws",
        items: [
          {
            slug: "ss-hex-bolts",
            name: "Hex bolts",
            art: "hex-bolt",
            photo: "/photos/stainless-steel__ss-hex-bolts.webp",
            specs: [
              { label: "Grade", value: "A2-70 (SS 304) · A4-80 (SS 316)" },
              { label: "Standard", value: "ISO 4014 / 4017, DIN 931 / 933" },
            ],
            blurb:
              "Full and half thread, hot forged and rolled, in 304 and 316 as standard and Super Duplex to order.",
          },
          {
            slug: "ss-flange-bolts",
            name: "Flange bolts",
            art: "flange-bolt",
            photo: "/photos/stainless-steel__ss-flange-bolts.webp",
            specs: [
              { label: "Grade", value: "A2 / A4 · serrated or plain flange" },
              { label: "Standard", value: "DIN 6921, IS 1364" },
            ],
          },
          {
            slug: "ss-carriage-bolts",
            name: "Carriage bolts",
            art: "carriage-bolt",
            photo: "/photos/stainless-steel__ss-carriage-bolts.webp",
            specs: [
              { label: "Head", value: "Cup head, square neck" },
              { label: "Standard", value: "DIN 603, IS 2609" },
            ],
            blurb:
              "Made in stainless as a standard line — not a mild steel only item.",
          },
          {
            slug: "ss-eye-bolts",
            name: "Eye bolts",
            art: "eye-bolt",
            photo: "/photos/stainless-steel__ss-eye-bolts.webp",
            specs: [
              { label: "Type", value: "Collared lifting and plain eye" },
              { label: "Standard", value: "DIN 580, IS 4190" },
            ],
          },
          {
            slug: "ss-u-bolts",
            name: "U-bolts",
            art: "u-bolt",
            photo: "/photos/stainless-steel__ss-u-bolts.webp",
            specs: [
              { label: "Type", value: "Round and square bend, with nuts" },
              { label: "Standard", value: "To drawing or pipe schedule" },
            ],
          },
          {
            slug: "ss-j-bolts",
            name: "J-bolts",
            art: "j-bolt",
            photo: "/photos/stainless-steel__ss-j-bolts.webp",
            specs: [
              { label: "Type", value: "Hook bolt, threaded one end" },
              { label: "Standard", value: "To drawing" },
            ],
          },
          {
            slug: "ss-machine-screws",
            name: "Machine screws",
            art: "machine-screw",
            photo: "/photos/stainless-steel__ss-machine-screws.webp",
            specs: [
              { label: "Head", value: "Pan, cheese, CSK, raised CSK" },
              { label: "Standard", value: "DIN 84, DIN 963, ISO 7045" },
            ],
          },
          {
            slug: "ss-self-tapping-screws",
            name: "Self-tapping & self-drilling screws",
            art: "self-drilling-screw",
            photo: "/photos/stainless-steel__ss-self-tapping-screws.webp",
            specs: [
              { label: "Point", value: "Type A, AB, B and self-drilling" },
              {
                label: "Standard",
                value: "DIN 7981 / 7982, DIN 7504, ISO 1479",
              },
            ],
          },
        ],
      },
      {
        title: "Nuts",
        items: [
          {
            slug: "ss-hex-nuts",
            name: "Hex nuts",
            art: "hex-nut",
            photo: "/photos/stainless-steel__ss-hex-nuts.webp",
            specs: [
              { label: "Grade", value: "A2 / A4 (SS 304 / SS 316)" },
              { label: "Standard", value: "ISO 4032 / 4033, DIN 934" },
            ],
          },
          {
            slug: "ss-heavy-hex-nuts",
            name: "Heavy hex nuts",
            art: "heavy-hex-nut",
            photo: "/photos/stainless-steel__ss-heavy-hex-nuts.webp",
            specs: [
              { label: "Grade", value: "A4 · Super Duplex on request" },
              { label: "Standard", value: "ASTM A194, DIN 6915" },
            ],
            blurb:
              "Heavy pattern in stainless and Super Duplex for offshore and flange work.",
          },
          {
            slug: "ss-nylock-nuts",
            name: "Nylock nuts",
            art: "nylock-nut",
            photo: "/photos/stainless-steel__ss-nylock-nuts.webp",
            specs: [
              { label: "Insert", value: "Nylon ring, prevailing torque" },
              { label: "Standard", value: "DIN 985, ISO 7040" },
            ],
          },
          {
            slug: "ss-dome-nuts",
            name: "Dome nuts",
            art: "dome-nut",
            photo: "/photos/stainless-steel__ss-dome-nuts.webp",
            specs: [
              { label: "Type", value: "Closed cap, high and low crown" },
              { label: "Standard", value: "DIN 1587, DIN 917" },
            ],
          },
          {
            slug: "ss-wing-nuts",
            name: "Wing nuts & wing bolts",
            art: "wing-nut",
            photo: "/photos/stainless-steel__ss-wing-nuts.webp",
            specs: [
              { label: "Type", value: "Cold forged and cast pattern" },
              { label: "Standard", value: "DIN 315, IS 2687" },
            ],
          },
          {
            slug: "ss-flange-nuts",
            name: "Flange nuts",
            art: "flange-nut",
            photo: "/photos/stainless-steel__ss-flange-nuts.webp",
            specs: [
              { label: "Type", value: "Serrated and plain flange" },
              { label: "Standard", value: "DIN 6923, BSW / UNC to order" },
            ],
          },
        ],
      },
      {
        title: "Washers, rod & anchors",
        items: [
          {
            slug: "ss-washers",
            name: "Washers",
            art: "plain-washer",
            photo: "/photos/stainless-steel__ss-washers.webp",
            specs: [
              {
                label: "Type",
                value: "Plain, spring, star, taper, heavy duty",
              },
              { label: "Standard", value: "DIN 125, DIN 127, ISO 7089" },
            ],
          },
          {
            slug: "ss-threaded-rod",
            name: "Threaded rod & studs",
            art: "threaded-rod",
            photo: "/photos/stainless-steel__ss-threaded-rod.webp",
            specs: [
              { label: "Length", value: "1 m / 3 m bar and cut studs" },
              { label: "Standard", value: "DIN 975 / 976, ASTM A193 B8" },
            ],
          },
          {
            slug: "ss-anchor-bolts",
            name: "Anchor & wedge bolts",
            art: "wedge-anchor",
            photo: "/photos/stainless-steel__ss-anchor-bolts.webp",
            specs: [
              { label: "Type", value: "Wedge, sleeve and drop-in" },
              { label: "Standard", value: "To manufacturer specification" },
            ],
            blurb:
              "Stainless anchors for coastal, pool and process plant fixing.",
          },
          {
            slug: "ss-specials",
            name: "Specials to drawing",
            art: "special-item",
            photo: "/photos/stainless-steel__ss-specials.webp",
            specs: [
              { label: "Basis", value: "Made to buyer drawing or sample" },
              { label: "Standard", value: "As specified on the drawing" },
            ],
          },
        ],
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: "mild-steel",
    code: "Range 02",
    name: "Mild Steel Fasteners",
    shortName: "Mild Steel",
    tone: "zinc",
    tagline: "The everyday range — plated, packed and priced for volume",
    intro:
      "Class 4.6 to 8.8 carbon steel in every plating a project asks for: black, bright zinc, yellow zinc, hot dip galvanised and geomet.",
    detail:
      "This is the workhorse range: hex, flange and carriage bolts, the full nut family down to the individual patterns fabricators ask for by name, the complete washer set including star washers, the anchor range as our partner actually makes it, the specialist insert and profile hardware, and the purpose-made construction and machinery bolts.",
    heroArt: "group-assembly",
    heroPhoto: "/cutouts/zinc-bolt.webp",
    /* Largest documented size: M48 bolts, M60 nuts. */
    sizeRange: "M3 – M48 bolts · nuts to M60",
    finishNote:
      "Shown in bright and yellow zinc — black, hot dip galvanised and geomet to order",
    sheet: [
      /* Draft 2: property classes pulled back to 4.6 / 4.8 / 5.6 — 8.8 and
         above belong to the high tension range. Washers and screws are sized,
         not property-class rated. */
      {
        label: "Grades",
        value:
          "Bolts, nuts, studs and threaded rod: class 4.6, 4.8, 5.6 · washers and screws are size-rated, not property-class rated",
      },
      {
        label: "Standards",
        value:
          "DIN 933 / 931 (bolts) · DIN 934 (nuts) · DIN 125 (washers) · IS 1364 / 1367",
      },
      { label: "Sizes", value: "M3 – M48 for bolts · nuts to M60" },
      {
        label: "Finish",
        value: "Black, bright zinc, yellow zinc, hot dip galvanised, geomet",
      },
      {
        label: "Typical use",
        value: "General fabrication, construction, furniture, sheet metal",
      },
    ],
    applications: [
      "Fabrication",
      "Construction",
      "Furniture & fit-out",
      "Materials handling",
    ],
    groups: [
      {
        title: "Bolts",
        items: [
          {
            slug: "ms-hex-bolts",
            name: "Hex bolts",
            art: "hex-bolt",
            photo: "/photos/mild-steel__ms-hex-bolts.webp",
            specs: [
              { label: "Grade", value: "4.6 / 4.8 / 5.6 / 5.8 / 8.8" },
              {
                label: "Standard",
                value: "IS 1363, DIN 931 / 933, ANSI B18.2.1",
              },
            ],
            blurb:
              "Full and half thread, M3 to M48, in every standard plating.",
          },
          {
            slug: "ms-flange-bolts",
            name: "Hex flange bolts",
            art: "flange-bolt",
            photo: "/photos/mild-steel__ms-flange-bolts.webp",
            specs: [
              { label: "Grade", value: "8.8 · serrated or plain flange" },
              { label: "Standard", value: "DIN 6921, IS 1364" },
            ],
          },
          {
            slug: "ms-carriage-bolts",
            name: "Carriage bolts",
            art: "carriage-bolt",
            photo: "/photos/mild-steel__ms-carriage-bolts.webp",
            specs: [
              { label: "Head", value: "Cup head, square neck" },
              { label: "Standard", value: "DIN 603, IS 2609" },
            ],
          },
          {
            slug: "ms-eye-bolts",
            name: "Eye bolts",
            art: "eye-bolt",
            photo: "/photos/mild-steel__ms-eye-bolts.webp",
            specs: [
              { label: "Type", value: "Collared lifting and plain eye" },
              { label: "Standard", value: "DIN 580, IS 4190" },
            ],
          },
          {
            slug: "ms-threaded-rod",
            name: "Threaded rod, tie rod & studs",
            art: "threaded-rod",
            photo: "/photos/mild-steel__ms-threaded-rod.webp",
            specs: [
              { label: "Type", value: "Male full thread rod and cut studs" },
              { label: "Standard", value: "DIN 975 / 976" },
            ],
          },
        ],
      },
      {
        title: "Screws",
        /* CSK and Allen screws moved to High Tension per the punch list. */
        note: "Socket and CSK cap screws sit under High Tension & Precision — they are a high tensile line.",
        items: [
          {
            slug: "ms-self-tapping-screws",
            name: "Self-tapping screws",
            art: "self-tapping-screw",
            photo: "/photos/mild-steel__ms-self-tapping-screws.webp",
            specs: [
              { label: "Point", value: "Type A, AB, B and self-drilling" },
              { label: "Standard", value: "DIN 7981, DIN 7504" },
            ],
          },
          {
            slug: "ms-drywall-screws",
            name: "Drywall screws",
            art: "drywall-screw",
            photo: "/photos/mild-steel__ms-drywall-screws.webp",
            specs: [
              { label: "Thread", value: "Coarse and fine, bugle head" },
              { label: "Finish", value: "Phosphated black, zinc" },
            ],
          },
          {
            slug: "ms-chipboard-screws",
            name: "Chipboard screws",
            art: "chipboard-screw",
            photo: "/photos/mild-steel__ms-chipboard-screws.webp",
            specs: [
              { label: "Drive", value: "Pozi, Torx, Phillips" },
              { label: "Finish", value: "Yellow zinc, bright zinc" },
            ],
          },
          {
            slug: "ms-machine-screws",
            name: "Machine screws",
            art: "machine-screw",
            photo: "/photos/mild-steel__ms-machine-screws.webp",
            specs: [
              { label: "Head", value: "Pan, cheese, CSK, raised CSK" },
              { label: "Standard", value: "DIN 84, DIN 963, ISO 7045" },
            ],
          },
        ],
      },
      {
        title: "Nuts",
        items: [
          {
            slug: "ms-hex-nuts",
            name: "Hex & square nuts",
            art: "hex-nut",
            photo: "/photos/mild-steel__ms-hex-nuts.webp",
            specs: [
              { label: "Grade", value: "Class 5, 6, 8 · thin and thick" },
              { label: "Standard", value: "IS 1363, DIN 934, DIN 557" },
            ],
          },
          {
            slug: "ms-nylock-nuts",
            name: "Nylock nuts",
            art: "nylock-nut",
            photo: "/photos/mild-steel__ms-nylock-nuts.webp",
            specs: [
              { label: "Insert", value: "Nylon ring, prevailing torque" },
              { label: "Standard", value: "DIN 985, DIN 982, ISO 7040" },
            ],
          },
          {
            slug: "ms-dome-nuts",
            name: "Dome nuts",
            art: "dome-nut",
            photo: "/photos/mild-steel__ms-dome-nuts.webp",
            specs: [
              { label: "Type", value: "Closed cap, high and low crown" },
              { label: "Standard", value: "DIN 1587, DIN 917" },
            ],
          },
          {
            slug: "ms-wing-nuts",
            name: "Wing nuts",
            art: "wing-nut",
            photo: "/photos/mild-steel__ms-wing-nuts.webp",
            specs: [
              { label: "Type", value: "Cold forged and cast pattern" },
              { label: "Standard", value: "DIN 315, IS 2687" },
            ],
          },
          {
            slug: "ms-flange-nuts",
            name: "Flange nuts",
            art: "flange-nut",
            photo: "/photos/mild-steel__ms-flange-nuts.webp",
            specs: [
              { label: "Type", value: "Serrated and plain, MS & HT" },
              { label: "Standard", value: "DIN 6923" },
            ],
          },
        ],
      },
      {
        title: "Individual nut types",
        note: "Patterns fabricators ask for by name — quoted as individual lines, not as a generic hex nut.",
        items: [
          {
            slug: "ms-t-slot-nut",
            name: "T slot nut",
            art: "t-slot-nut",
            photo: "/photos/mild-steel__ms-t-slot-nut.webp",
            specs: [
              { label: "Use", value: "Machine tables and profile slots" },
              { label: "Standard", value: "DIN 508, to drawing" },
            ],
          },
          {
            slug: "ms-spring-channel-nut",
            name: "Spring channel nut",
            art: "spring-channel-nut",
            photo: "/photos/mild-steel__ms-spring-channel-nut.webp",
            specs: [
              { label: "Type", value: "Long and short spring, plain" },
              { label: "Use", value: "Strut channel support systems" },
            ],
          },
          {
            slug: "ms-long-hex-nut",
            name: "Long hex nut / bar nut",
            art: "long-hex-nut",
            photo: "/photos/mild-steel__ms-long-hex-nut.webp",
            specs: [
              { label: "Type", value: "Coupling nut, hex bar" },
              { label: "Standard", value: "DIN 6334" },
            ],
          },
          {
            slug: "ms-df-nut",
            name: "DF nut / hex bar nut",
            art: "df-nut",
            photo: "/photos/mild-steel__ms-df-nut.webp",
            specs: [
              { label: "Type", value: "Deformed thread, prevailing torque" },
              { label: "Standard", value: "DIN 980" },
            ],
          },
          {
            slug: "ms-heavy-hex-2h-nut",
            name: "Heavy hex 2H nut",
            art: "heavy-hex-nut",
            photo: "/photos/mild-steel__ms-heavy-hex-2h-nut.webp",
            specs: [
              { label: "Grade", value: "ASTM A194 Grade 2H" },
              { label: "Use", value: "Flanged joints, structural sets" },
            ],
          },
          {
            slug: "ms-lock-nuts",
            name: "Thin hex / lock nuts",
            art: "thin-hex-nut",
            photo: "/photos/mild-steel__ms-lock-nuts.webp",
            specs: [
              { label: "Type", value: "Jam nut, half thickness" },
              { label: "Standard", value: "DIN 439, ISO 4035" },
            ],
          },
        ],
      },
      {
        title: "Washers",
        items: [
          {
            slug: "ms-plain-washer",
            name: "Plain washer",
            art: "plain-washer",
            photo: "/photos/mild-steel__ms-plain-washer.webp",
            specs: [
              { label: "Type", value: "Form A and heavy pattern" },
              { label: "Standard", value: "DIN 125, IS 2016" },
            ],
          },
          {
            slug: "ms-spring-washer",
            name: "Spring washer",
            art: "spring-washer",
            photo: "/photos/mild-steel__ms-spring-washer.webp",
            specs: [
              { label: "Material", value: "MS and spring steel (En 42)" },
              { label: "Standard", value: "DIN 127, IS 3063" },
            ],
          },
          {
            slug: "ms-star-washer",
            name: "Star washer — internal",
            art: "star-washer",
            photo: "/photos/mild-steel__ms-star-washer.webp",
            specs: [
              { label: "Type", value: "Internal tooth serrated" },
              { label: "Standard", value: "DIN 6797 J" },
            ],
          },
          {
            slug: "ms-external-star-washer",
            name: "Star washer — external & overlap",
            art: "external-star-washer",
            photo: "/photos/mild-steel__ms-external-star-washer.webp",
            specs: [
              { label: "Type", value: "External tooth and overlap star" },
              { label: "Standard", value: "DIN 6797 A" },
            ],
          },
          {
            slug: "ms-taper-washer",
            name: "Taper washer",
            art: "taper-washer",
            photo: "/photos/mild-steel__ms-taper-washer.webp",
            specs: [
              { label: "Use", value: "Channel and joist flanges" },
              { label: "Standard", value: "IS 5372 / 5374" },
            ],
          },
          {
            slug: "ms-square-washer",
            name: "Square washer",
            art: "square-washer",
            photo: "/photos/mild-steel__ms-square-washer.webp",
            specs: [
              { label: "Use", value: "Timber and structural packing" },
              { label: "Standard", value: "To drawing" },
            ],
          },
        ],
      },
      {
        title: "Anchor fasteners",
        /* Chemical stud removed — replaced with the partner's actual anchor range. */
        note: "The range as our partner manufactures it. Chemical anchors are not part of it.",
        items: [
          {
            slug: "ms-wedge-anchor",
            name: "Wedge anchor",
            art: "wedge-anchor",
            photo: "/photos/mild-steel__ms-wedge-anchor.webp",
            specs: [
              { label: "Fixing", value: "Through fixing into concrete" },
              { label: "Finish", value: "Bright zinc, yellow zinc, HDG" },
            ],
          },
          {
            slug: "ms-drop-in-anchor",
            name: "Drop-in anchor",
            art: "drop-in-anchor",
            photo: "/photos/mild-steel__ms-drop-in-anchor.webp",
            specs: [
              { label: "Fixing", value: "Flush internally threaded" },
              { label: "Setting", value: "Setting tool required" },
            ],
          },
          {
            slug: "ms-nylon-frame-anchor",
            name: "Nylon frame fixing anchor",
            art: "nylon-frame-anchor",
            photo: "/photos/mild-steel__ms-nylon-frame-anchor.webp",
            specs: [
              { label: "Fixing", value: "Frame and façade fixing" },
              { label: "Body", value: "Nylon sleeve with screw" },
            ],
          },
          {
            slug: "ms-rawl-bolt-anchor",
            name: "Rawl bolt anchor",
            art: "rawl-bolt-anchor",
            photo: "/photos/mild-steel__ms-rawl-bolt-anchor.webp",
            specs: [
              { label: "Type", value: "Bolt projecting, loose bolt" },
              { label: "Finish", value: "Yellow zinc" },
            ],
          },
          {
            slug: "ms-rawl-hook-anchor",
            name: "Rawl hook anchor",
            art: "rawl-hook-anchor",
            photo: "/photos/mild-steel__ms-rawl-hook-anchor.webp",
            specs: [
              { label: "Type", value: "Eye and hook pattern" },
              { label: "Use", value: "Suspended services" },
            ],
          },
          {
            slug: "ms-pin-type-anchor",
            name: "Pin type anchor",
            art: "pin-type-anchor",
            photo: "/photos/mild-steel__ms-pin-type-anchor.webp",
            specs: [
              { label: "Type", value: "Hammer-set pin anchor" },
              { label: "Finish", value: "Yellow zinc" },
            ],
          },
          {
            slug: "ms-sleeve-anchor",
            name: "Sleeve anchor",
            art: "sleeve-anchor",
            photo: "/photos/mild-steel__ms-sleeve-anchor.webp",
            specs: [
              { label: "Head", value: "Hex, flange, CSK" },
              { label: "Use", value: "Concrete, brick, block" },
            ],
          },
          {
            slug: "ms-anchor-shell",
            name: "Anchor shell & anchor nut",
            art: "anchor-shell-nut",
            photo: "/photos/mild-steel__ms-anchor-shell.webp",
            specs: [
              { label: "Type", value: "Shell with internal thread" },
              { label: "Use", value: "Ceiling and soffit fixing" },
            ],
          },
          {
            slug: "ms-rawl-goli",
            name: "Rawl goli",
            art: "rawl-goli",
            photo: "/photos/mild-steel__ms-rawl-goli.webp",
            specs: [
              { label: "Type", value: "Expansion ball anchor" },
              { label: "Use", value: "Light duty concrete fixing" },
            ],
          },
        ],
      },

      {
        title: "Insert & rivet nuts",
        note: "Specialist items usually bought separately — carried here so they travel in the same container, on the same invoice.",
        items: [
          {
            slug: "rivet-insert-nuts",
            name: "Rivet / insert nuts",
            art: "rivet-insert-nut",
            photo: "/photos/mild-steel__rivet-insert-nuts.webp",
            specs: [
              { label: "Body", value: "Knurled, round and hex body" },
              { label: "Head", value: "Flat, reduced, CSK" },
            ],
          },
          {
            slug: "tee-nut-prong",
            name: "Tee nut — prong",
            art: "tee-nut-prong",
            photo: "/photos/mild-steel__tee-nut-prong.webp",
            specs: [
              { label: "Type", value: "Four prong, hammer in" },
              { label: "Use", value: "Timber and board" },
            ],
          },
          {
            slug: "wooden-d-insert-nut",
            name: "Wooden D insert nut",
            art: "wooden-d-insert-nut",
            photo: "/photos/mild-steel__wooden-d-insert-nut.webp",
            specs: [
              { label: "Type", value: "Screw-in threaded insert" },
              { label: "Finish", value: "Yellow zinc, bright zinc" },
            ],
          },
          {
            slug: "clinch-nut",
            name: "Clinch nut",
            art: "clinch-nut",
            photo: "/photos/mild-steel__clinch-nut.webp",
            specs: [
              { label: "Type", value: "Self-clinching for sheet metal" },
              { label: "Use", value: "Panels and enclosures" },
            ],
          },
          {
            slug: "socket-rivet-bush-nut",
            name: "Socket rivet / bush nut",
            art: "barrel-nut",
            photo: "/photos/mild-steel__socket-rivet-bush-nut.webp",
            specs: [
              { label: "Type", value: "Bush and barrel socket rivet" },
              { label: "Finish", value: "Nickel, zinc" },
            ],
          },
        ],
      },
      {
        title: "Cage, profile & channel hardware",
        items: [
          {
            slug: "cage-nut",
            name: "Cage nut",
            art: "cage-nut",
            photo: "/photos/mild-steel__cage-nut.webp",
            specs: [
              { label: "Type", value: "Spring cage, square hole" },
              { label: "Use", value: "Racks and enclosures" },
            ],
          },
          {
            slug: "slotted-profile-t-nut",
            name: "Slotted profile T-nut",
            art: "t-slot-nut",
            photo: "/photos/mild-steel__slotted-profile-t-nut.webp",
            specs: [
              { label: "Type", value: "Slide-in and drop-in T nut" },
              { label: "Use", value: "Aluminium profile systems" },
            ],
          },
          {
            slug: "t-hammer-bolt",
            name: "T-hammer bolt",
            art: "t-hammer-bolt",
            photo: "/photos/mild-steel__t-hammer-bolt.webp",
            specs: [
              { label: "Type", value: "Quarter turn hammer head" },
              { label: "Use", value: "Profile and channel systems" },
            ],
          },
          {
            slug: "t-hammer-nut",
            name: "T-hammer nut",
            art: "t-hammer-nut",
            photo: "/photos/mild-steel__t-hammer-nut.webp",
            specs: [
              { label: "Type", value: "Hammer head nut" },
              { label: "Use", value: "Profile and channel systems" },
            ],
          },
          {
            slug: "flange-nylock-nut",
            name: "Flange nylock nut",
            art: "flange-nylock-nut",
            photo: "/photos/mild-steel__flange-nylock-nut.webp",
            specs: [
              { label: "Type", value: "Serrated flange, nylon insert" },
              { label: "Standard", value: "DIN 6926" },
            ],
          },
        ],
      },
      {
        title: "Furniture fittings",
        items: [
          {
            slug: "minifix-items",
            name: "Minifix items",
            art: "minifix",
            photo: "/photos/mild-steel__minifix-items.webp",
            specs: [
              { label: "Set", value: "Cam, bolt, dowel and cap" },
              { label: "Use", value: "Knock-down furniture" },
            ],
          },
          {
            slug: "barrel-nut",
            name: "Barrel nut",
            art: "barrel-nut",
            photo: "/photos/mild-steel__barrel-nut.webp",
            specs: [
              { label: "Type", value: "Cross dowel, slotted drive" },
              { label: "Finish", value: "Zinc, nickel" },
            ],
          },
          {
            slug: "cabinet-screw-connector",
            name: "Cabinet screw connector",
            art: "cabinet-screw-connector",
            photo: "/photos/mild-steel__cabinet-screw-connector.webp",
            specs: [
              { label: "Type", value: "Male – female connector screw" },
              { label: "Use", value: "Cabinet and panel joining" },
            ],
          },
        ],
      },

      {
        title: "Construction & machinery bolts",
        note: "Purpose-made lines for civil work, conveyors, elevators and earth-moving plant.",
        items: [
          {
            slug: "foundation-bolt",
            name: "Foundation bolt",
            art: "foundation-bolt",
            photo: "/photos/mild-steel__foundation-bolt.webp",
            specs: [
              { label: "Type", value: "L, J and plate type anchors" },
              { label: "Standard", value: "To drawing, IS 5624" },
            ],
          },
          {
            slug: "u-bolt",
            name: "U-bolt",
            art: "u-bolt",
            photo: "/photos/mild-steel__u-bolt.webp",
            specs: [
              { label: "Type", value: "Round and square bend with nuts" },
              { label: "Use", value: "Pipe and axle clamping" },
            ],
          },
          {
            slug: "j-bolt",
            name: "J-bolt",
            art: "j-bolt",
            photo: "/photos/mild-steel__j-bolt.webp",
            specs: [
              { label: "Type", value: "Hook bolt, threaded one end" },
              { label: "Use", value: "Concrete anchoring, tie down" },
            ],
          },
          {
            slug: "belt-fasteners",
            name: "Belt fasteners",
            art: "belt-fastener",
            photo: "/photos/mild-steel__belt-fasteners.webp",
            specs: [
              { label: "Type", value: "Bolted plate belt joiners" },
              { label: "Use", value: "Conveyor belt splicing" },
            ],
          },
          {
            slug: "elevator-bucket-bolt",
            name: "Elevator bucket bolt",
            art: "elevator-bucket-bolt",
            photo: "/photos/mild-steel__elevator-bucket-bolt.webp",
            specs: [
              { label: "Head", value: "Flat countersunk, square neck" },
              { label: "Use", value: "Bucket elevators, grain handling" },
            ],
          },
          {
            slug: "jcb-furniture-bolt",
            name: "JCB furniture bolt",
            art: "jcb-furniture-bolt",
            photo: "/photos/mild-steel__jcb-furniture-bolt.webp",
            specs: [
              { label: "Head", value: "Dome head, square neck" },
              { label: "Use", value: "Earth-moving attachments" },
            ],
          },
          {
            slug: "fala-bolt",
            name: "Fala bolt",
            art: "fala-bolt",
            photo: "/photos/mild-steel__fala-bolt.webp",
            specs: [
              { label: "Type", value: "Shuttering and scaffold bolt" },
              { label: "Finish", value: "Black, bright zinc" },
            ],
          },
        ],
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: "high-tension",
    code: "Range 03",
    name: "High Tension & Precision",
    shortName: "High Tension",
    tone: "black",
    tagline: "Property class 8.8 to 14.9, structural sets and turned parts",
    intro:
      "Heat treated alloy steel in class 8.8, 10.9, 12.9 and 14.9 — socket screws, structural HSFG assemblies and precision turned components.",
    detail:
      "Where the joint carries load. Bolts and nuts to ISO 898-1, the complete socket series, HSFG structural sets with matching nuts and DTI washers, and CNC turned components made to your drawing.",
    heroArt: "hex-bolt",
    heroPhoto: "/cutouts/black-bolt.webp",
    sizeRange: "M3 – M48 bolts & socket screws · nuts to M60",
    finishNote:
      "Shown in black oxide — Dacro, Geomet, zinc flake and HDG to order",
    sheet: [
      /* Draft 2: HSFG and socket-series classes called out separately. */
      {
        label: "Property class",
        value:
          "Bolts 8.8, 10.9, 12.9, 14.9 · nuts class 8, 10, 12 · studs and threaded rod 8.8, 10.9, 12.9 · socket screws 12.9",
      },
      {
        label: "HSFG class",
        value: "Bolts 8.8S, 10.9S, 12.9S · nuts 8S, 10S, 12S",
      },
      {
        label: "Standards",
        value:
          "DIN 931 / 933 (bolts) · DIN 934 (nuts) · DIN 912 / ISO 4762 (socket cap) · DIN 913 / 914 / 915 / 916 (set screws) · ISO 4014 / 4017 · ISO 898-1 · BS 1768 · ANSI B18.2.1 / 18.2.2",
      },
      { label: "Material", value: "Alloy and carbon steel, heat treated" },
      /* Finish row added for parity with the other two ranges. */
      {
        label: "Finish",
        value:
          "Dacro, Geomet, hot dip galvanised, zinc-aluminium flake, Delta-Seal, Delta-Tone, zinc-iron plating, chrome-passivated zinc, thermal & chemical blackening, electroless nickel",
      },
      {
        label: "Sizes",
        value: "M3 – M48 for bolts and socket screws · nuts to M60",
      },
      {
        label: "Typical use",
        value: "Structural steelwork, automotive, plant and machinery",
      },
    ],
    applications: [
      "Structural steel",
      "Automotive",
      "Plant & machinery",
      "Railways",
    ],
    groups: [
      {
        title: "High tensile bolts & nuts",
        items: [
          {
            slug: "ht-hex-bolts",
            name: "High tensile hex bolts",
            art: "hex-bolt",
            photo: "/photos/high-tension__ht-hex-bolts.webp",
            specs: [
              { label: "Class", value: "8.8 / 10.9 / 12.9 / 14.9" },
              {
                label: "Standard",
                value: "ISO 4014, DIN 931, ASTM A325 / A490",
              },
            ],
            blurb:
              "Full and half thread, heat treated and marked with the property class on the head.",
          },
          {
            slug: "ht-hex-nuts",
            name: "High tensile nuts",
            art: "hex-nut",
            photo: "/photos/high-tension__ht-hex-nuts.webp",
            specs: [
              { label: "Class", value: "8 / 10 / 12 to match bolt class" },
              { label: "Standard", value: "ISO 4032, DIN 934, ASTM A194 2H" },
            ],
          },
          {
            slug: "ht-stud-bolts",
            name: "Structural stud bolts",
            art: "stud-bolt",
            photo: "/photos/high-tension__ht-stud-bolts.webp",
            specs: [
              { label: "Type", value: "Full thread stud with two heavy nuts" },
              { label: "Standard", value: "ASTM A193 B7 / A194 2H" },
            ],
          },
        ],
      },
      {
        title: "HSFG structural assemblies",
        note: "High Strength Friction Grip sets — bolt, nut and washer supplied as a matched assembly.",
        items: [
          {
            slug: "hsfg-bolts",
            name: "HSFG bolts",
            art: "hsfg-bolt",
            photo: "/photos/high-tension__hsfg-bolts.webp",
            specs: [
              { label: "Grade", value: "8.8S / 10.9S / 12.9S" },
              { label: "Standard", value: "IS 3757, BS 4395, ASTM F3125" },
            ],
            blurb:
              "Friction grip bolts for slip-critical structural connections.",
          },
          {
            slug: "hsfg-nuts",
            name: "HSFG nuts",
            art: "heavy-hex-nut",
            photo: "/photos/high-tension__hsfg-nuts.webp",
            specs: [
              { label: "Grade", value: "Matched to bolt grade" },
              { label: "Standard", value: "IS 6623, BS 4395" },
            ],
          },
          {
            slug: "hsfg-washers",
            name: "HSFG washers",
            art: "hsfg-washer",
            photo: "/photos/high-tension__hsfg-washers.webp",
            specs: [
              { label: "Type", value: "Hardened flat, square taper" },
              { label: "Standard", value: "IS 6649, BS 4395" },
            ],
          },
          {
            slug: "dti-washers",
            name: "DTI washers",
            art: "dti-washer",
            photo: "/photos/high-tension__dti-washers.webp",
            specs: [
              { label: "Type", value: "Direct tension indicator" },
              { label: "Standard", value: "ASTM F959, BS 7644" },
            ],
            blurb: "Load indicating washers for verified bolt tension on site.",
          },
        ],
      },
      {
        title: "Socket series",
        note: "Moved here from mild steel — the socket and CSK cap screw range is a high tensile line.",
        items: [
          {
            slug: "socket-head-cap-screws",
            name: "Socket head cap screws",
            art: "socket-head-cap-screw",
            photo: "/photos/high-tension__socket-head-cap-screws.webp",
            specs: [
              { label: "Class", value: "12.9 black or plated" },
              { label: "Standard", value: "DIN 912, ISO 4762, ANSI B18.3" },
            ],
          },
          {
            slug: "socket-button-head-screws",
            name: "Socket button head screws",
            art: "socket-button-head",
            photo: "/photos/high-tension__socket-button-head-screws.webp",
            specs: [
              { label: "Class", value: "10.9 / 12.9" },
              { label: "Standard", value: "ISO 7380, DIN 7380" },
            ],
          },
          {
            slug: "socket-csk-cap-screws",
            name: "Socket countersunk head cap screws",
            art: "socket-csk-cap-screw",
            photo: "/photos/high-tension__socket-csk-cap-screws.webp",
            specs: [
              { label: "Class", value: "10.9 / 12.9" },
              { label: "Standard", value: "DIN 7991, ISO 10642" },
            ],
          },
          {
            slug: "socket-set-screws",
            name: "Socket set / grub screws",
            art: "socket-set-screw",
            photo: "/photos/high-tension__socket-set-screws.webp",
            specs: [
              { label: "Point", value: "Cup, cone, flat, dog point" },
              { label: "Standard", value: "DIN 913 – 916, ISO 4026 – 4029" },
            ],
          },
          {
            slug: "allen-keys-spanners",
            name: "Allen keys & spanners",
            art: "allen-key",
            photo: "/photos/high-tension__allen-keys-spanners.webp",
            specs: [
              { label: "Type", value: "L key, ball end, T handle, spanners" },
              { label: "Sizes", value: "Metric and imperial sets" },
            ],
            blurb:
              "Supplied as a standalone line — useful to add to a fastener consignment.",
          },
        ],
      },
      {
        title: "Precision & specials",
        items: [
          {
            slug: "precision-turned-parts",
            name: "Precision turned parts",
            art: "precision-turned-part",
            photo: "/photos/high-tension__precision-turned-parts.webp",
            specs: [
              { label: "Basis", value: "CNC turned to buyer drawing" },
              { label: "Tolerance", value: "As per drawing · ISO 2768" },
            ],
          },
          {
            slug: "ht-specials",
            name: "Special high tension items",
            art: "special-item",
            photo: "/photos/high-tension__ht-specials.webp",
            specs: [
              {
                label: "Basis",
                value: "Non-standard heads, lengths, coatings",
              },
              { label: "Standard", value: "ISO / DIN / ANSI / BS as required" },
            ],
          },
        ],
      },
    ],
  },
];

export const rangeBySlug = (slug: string) =>
  ranges.find((r) => r.slug === slug);

export const productCount = ranges.reduce(
  (n, r) => n + r.groups.reduce((m, g) => m + g.items.length, 0),
  0,
);

export const allProducts = ranges.flatMap((r) =>
  r.groups.flatMap((g) =>
    g.items.map((i) => ({
      ...i,
      range: r.slug,
      rangeName: r.shortName,
      group: g.title,
    })),
  ),
);
