"""Builds the downloadable range catalogues from the site's own product data."""
import json, io, os, sys
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
OUT = os.path.join(PUB, "catalogue")
os.makedirs(OUT, exist_ok=True)
data = json.load(open("/tmp/co-data.json"))
RANGES, SITE = data["ranges"], data["site"]

W, H = 595, 842
M = 46
INK = (0.031, 0.047, 0.067)
GOLD = (0.784, 0.635, 0.290)
GOLD_L = (0.906, 0.784, 0.471)
STEEL = (0.373, 0.443, 0.514)
LINE = (0.878, 0.855, 0.808)
IVORY = (0.973, 0.965, 0.945)
WHITE = (1, 1, 1)

def clean(s):
    """helv is latin-1; swap the typographic characters it cannot encode."""
    return (s.replace("\u2013", "-").replace("\u2014", "-").replace("\u2018", "'")
             .replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
             .replace("\u2192", "->"))

ART_PNG = os.environ.get("ART_PNG", "/tmp/art-png")

def art_bytes(part, tone, bg_rgb=(255, 255, 255)):
    """One of the in-house renders, flattened onto the page colour."""
    path = os.path.join(ART_PNG, tone, f"{part}.png")
    if not os.path.exists(path):
        return None
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (*bg_rgb, 255))
    bg.alpha_composite(im)
    im = bg.convert("RGB")
    im.thumbnail((360, 360), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=80, optimize=True)
    return buf.getvalue()

def img_bytes(rel, bg_rgb=(255, 255, 255)):
    path = os.path.join(PUB, rel.lstrip("/"))
    if not os.path.exists(path):
        return None
    im = Image.open(path)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGBA", im.size, (*bg_rgb, 255))
        bg.alpha_composite(im.convert("RGBA"))
        im = bg.convert("RGB")
    else:
        im = im.convert("RGB")
    im.thumbnail((360, 360), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=78, optimize=True)
    return buf.getvalue()

def text(page, x, y, s, size=9, color=(0, 0, 0), font="helv", width=None, leading=None):
    s = clean(s)
    if width:
        rect = pymupdf.Rect(x, y - size, x + width, y + 400)
        page.insert_textbox(rect, s, fontsize=size, fontname=font, color=color,
                            lineheight=(leading / size) if leading else 1.3)
    else:
        page.insert_text((x, y), s, fontsize=size, fontname=font, color=color)

def cover(doc, title, subtitle, blurb):
    page = doc.new_page(width=W, height=H)
    page.draw_rect(pymupdf.Rect(0, 0, W, H), color=None, fill=INK)
    # blueprint grid
    for gx in range(0, W, 34):
        page.draw_line(pymupdf.Point(gx, 0), pymupdf.Point(gx, H), color=(0.09, 0.11, 0.14), width=0.4)
    for gy in range(0, H, 34):
        page.draw_line(pymupdf.Point(0, gy), pymupdf.Point(W, gy), color=(0.09, 0.11, 0.14), width=0.4)

    logo = img_bytes("/logo.png", bg_rgb=(8, 12, 17))
    if logo:
        page.insert_image(pymupdf.Rect(W / 2 - 52, 120, W / 2 + 52, 224), stream=logo, keep_proportion=True)

    text(page, M, 300, SITE["name"].upper(), 11, GOLD_L, "hebo")
    page.draw_line(pymupdf.Point(M, 312), pymupdf.Point(W - M, 312), color=GOLD, width=0.8)
    text(page, M, 356, title, 30, WHITE, "hebo", width=W - 2 * M, leading=34)
    text(page, M, 440, subtitle, 12, (0.72, 0.78, 0.83), "helv", width=W - 2 * M, leading=17)
    text(page, M, 520, blurb, 9.5, STEEL, "helv", width=W - 2 * M - 60, leading=14)

    y = H - 150
    text(page, M, y, "MERCHANT EXPORTER · KOLKATA, INDIA", 7.5, GOLD_L, "hebo")
    rows = [
        f"IEC {SITE['registrations']['iec']}",
        f"GSTIN {SITE['registrations']['gstin']}",
        f"EEPC RCMC — {SITE['registrations']['rcmc']}",
        SITE["contact"]["email"],
        SITE["contact"]["phone"],
    ]
    for i, r in enumerate(rows):
        text(page, M, y + 20 + i * 13, r, 8.5, (0.72, 0.78, 0.83))
    return page

def footer(page, n):
    page.draw_line(pymupdf.Point(M, H - 46), pymupdf.Point(W - M, H - 46), color=LINE, width=0.6)
    text(page, M, H - 32, f"{SITE['name']} · {SITE['contact']['email']} · {SITE['contact']['phone']}", 7.5, STEEL)
    text(page, W - M - 20, H - 32, str(n), 7.5, STEEL)

def range_pages(doc, rng, start_no):
    n = start_no
    page = doc.new_page(width=W, height=H)
    # header
    page.draw_rect(pymupdf.Rect(0, 0, W, 96), color=None, fill=INK)
    text(page, M, 40, rng["code"].upper(), 7.5, GOLD_L, "hebo")
    text(page, M, 66, rng["name"], 19, WHITE, "hebo")
    y = 128
    text(page, M, y, "SPECIFICATION", 7.5, (0.43, 0.33, 0.09), "hebo")
    y += 16
    for row in rng["sheet"]:
        page.draw_line(pymupdf.Point(M, y - 8), pymupdf.Point(W - M, y - 8), color=LINE, width=0.5)
        text(page, M, y + 4, row["label"].upper(), 7.5, STEEL, "hebo")
        box = pymupdf.Rect(M + 110, y - 4, W - M, y + 60)
        page.insert_textbox(box, clean(row["value"]), fontsize=9, fontname="helv", color=(0.1, 0.13, 0.16), lineheight=1.35)
        lines = 1 + len(row["value"]) // 78
        y += 14 + lines * 11
    text(page, M, y + 14, rng["finishNote"], 8, STEEL, "hebo", width=W - 2 * M)
    footer(page, n)

    # product grid
    cols, cw, ch = 3, (W - 2 * M) / 3, 150
    x0 = M
    y = y + 52
    for group in rng["groups"]:
        if y + ch + 40 > H - 70:
            n += 1
            page = doc.new_page(width=W, height=H)
            footer(page, n)
            y = 70
        text(page, M, y, group["title"].upper(), 8, (0.43, 0.33, 0.09), "hebo")
        page.draw_line(pymupdf.Point(M, y + 6), pymupdf.Point(W - M, y + 6), color=GOLD, width=0.7)
        y += 24
        for i, item in enumerate(group["items"]):
            c = i % cols
            if c == 0 and i > 0:
                y += ch
            if y + ch > H - 70:
                n += 1
                page = doc.new_page(width=W, height=H)
                footer(page, n)
                y = 70
            cx = x0 + c * cw
            page.draw_rect(pymupdf.Rect(cx + 3, y, cx + cw - 6, y + ch - 10), color=LINE, width=0.6, fill=WHITE, radius=0.04)
            b = None
            if item.get("photo"):
                b = img_bytes(item["photo"])
            if b is None and item.get("art"):
                b = art_bytes(item["art"], rng["tone"])
            if b:
                page.insert_image(pymupdf.Rect(cx + 12, y + 8, cx + cw - 15, y + 78), stream=b, keep_proportion=True)
            name_box = pymupdf.Rect(cx + 12, y + 84, cx + cw - 12, y + 104)
            page.insert_textbox(name_box, clean(item["name"]), fontsize=8.5, fontname="hebo", color=(0.05, 0.08, 0.1), lineheight=1.2)
            sy = y + 108
            for s in item["specs"]:
                page.insert_textbox(
                    pymupdf.Rect(cx + 12, sy, cx + cw - 12, sy + 18),
                    clean(f"{s['label'].upper()}  {s['value']}"), fontsize=6, fontname="helv", color=(0.37, 0.44, 0.51), lineheight=1.25,
                )
                sy += 14
        y += ch + 14
    return n

def build(path, title, subtitle, blurb, rngs):
    doc = pymupdf.open()
    cover(doc, title, subtitle, blurb)
    n = 2
    for r in rngs:
        n = range_pages(doc, r, n) + 1
    doc.save(path, deflate=True, garbage=4)
    doc.close()
    return os.path.getsize(path)

total = build(
    os.path.join(OUT, "chakraborty-overseas-catalogue.pdf"),
    "Fastener Export Catalogue",
    "Mild steel · Stainless steel · High tension & precision · Miscellaneous · Construction & machinery",
    "Sourced from verified Indian manufacturing partners, checked against your specification, export packed and shipped with complete documentation. Sizes M3 to M72 subject to range and item.",
    RANGES,
)
print("master", total)
for r in RANGES:
    size = build(
        os.path.join(OUT, f"chakraborty-overseas-{r['slug']}.pdf"),
        r["name"], r["tagline"], r["detail"], [r],
    )
    print(r["slug"], size)
