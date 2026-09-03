# Chakraborty Overseas — website

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. Static-rendered marketing site for a
Kolkata-based merchant exporter of industrial fasteners.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export of all 15 routes
pnpm start
```

## Pages

| Route | Contents |
| --- | --- |
| `/` | 3D hero assembly, five ranges, order flow, export packing, industries |
| `/products` | Range index + standards strip |
| `/products/[range]` | Spec sheet, filterable/searchable product grid, quick-view modal |
| `/catalogue` | Downloadable PDF catalogues (master + one per range) + one-page company profile |
| `/about` | Mission & vision, how an order runs, pre-shipment inspection |
| `/certifications` | Registrations held by us vs. by our manufacturing partners |
| `/contact` | Enquiry form (deep-linkable), contact details, WhatsApp |

Ranges: `stainless-steel`, `mild-steel`, `high-tension`. The miscellaneous and
construction/machinery lines from the punch list live inside Mild Steel as their own groups, so
nothing was dropped when the site went to three ranges.

Every page sets its own `title`, `description`, canonical URL and Open Graph data; the root layout
adds `metadataBase`, a title template, icons, robots rules and Organization JSON-LD. `CollectionPage`
JSON-LD is emitted per range and `ContactPage` JSON-LD on `/contact`. `sitemap.xml` and `robots.txt`
are generated from the same data.

## Where the content lives

- `src/lib/site.ts` — business details: IEC, GSTIN, RCMC status, emails, phone, ports, standards strip,
  response time and quoting currency, and the filenames of the two downloads under `public/catalogue/`.
- `src/lib/products.ts` — every range, group and product line, with the specs shown on the cards.
  This one file drives the range pages, the nav, the sitemap and the PDF catalogues.

Changing a product line or a grade means editing `products.ts` only.

## Assets

- `public/photos/<range>__<product>.webp` — one product photograph per line, normalised onto a
  white plate (background flooded to pure white, subject centred, square, 900 px).
- `public/cutouts/*.webp` — transparent versions used on the dark hero and range cards.
- `public/art/<finish>/<part>.svg` — the in-house render library (steel / zinc / black finishes),
  used as the fallback wherever a photograph is missing, and by the PDF generator.
- `public/facility/*.webp` — plant, inspection and warehouse photography used on the home and
  about pages (two files, `cartons.webp` and `palletised.webp`, are deliberately unused: the cartons
  in them carry a supplier's printed logo).
- `public/catalogue/*.pdf` — generated catalogues; `public/logo*.png|webp`, `public/icon-*.png`,
  `public/apple-icon.png` — brand mark and favicons.

**Where the photographs came from.** They were gathered by image search, filtered automatically
(white background, no dark stock-agency bar, no coloured corner logo, OCR-rejected if any text is
visible) and then normalised. `docs/image-sources.json` records the source URL and page for every
file. None of them carries a visible brand, but they are third-party photographs: before the site
goes live, replace them with the client's own shots or licensed stock. Because each product has a
single `photo` field in `src/lib/products.ts`, swapping one is a one-line change.

### Regenerating the render library

```bash
pnpm art                     # writes public/art/<finish>/<part>.svg
node scripts/rasterize-art.mjs /tmp/art-png   # PNGs for the PDFs (needs the dev server running)
```

### Regenerating the catalogues

The PDFs are built from the same product data, so they never drift from the site:

```bash
node --experimental-strip-types scripts/dump-data.mjs   # writes /tmp/co-data.json
python3 scripts/make-catalogues.py                      # needs pymupdf + pillow
```

### Regenerating the one-page company profile

`public/catalogue/chakraborty-overseas-company-profile.pdf` is the sheet procurement teams file when
they open a vendor record: registrations, the three ranges, standards, supplier certifications,
Incoterms and contact details on one A4 page. Its source is `docs/company-profile.html` — a
standalone file with the logo inlined, no build step:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/catalogue/chakraborty-overseas-company-profile.pdf \
  docs/company-profile.html
```

Edit the HTML after changing `src/lib/site.ts` or a range in `products.ts`, then re-run the command
and check the result is still one page.

Product artwork comes from `scripts/art/parts.mjs` — primitives in `primitives.mjs` compose each
fastener, so a new line means adding one entry there.

`scripts/shot.mjs` takes CDP screenshots at any viewport and reports horizontal overflow:

```bash
node scripts/shot.mjs http://localhost:3000/ shot.png 414 900 mobile
```

## Still to wire up (back end)

The enquiry form is front-end only: it validates, then hands the composed enquiry to the visitor's
mail client. To capture enquiries in a spreadsheet the client can download, add a route handler
(`src/app/api/enquiry/route.ts`) that writes to Google Sheets / a CRM and post to it from
`src/components/enquiry-form.tsx` — the form already collects every field needed.
