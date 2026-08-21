/**
 * Isometric fastener drawing primitives.
 *
 * Everything is drawn in a 0–120 square, lit from the upper left: top faces
 * catch the light, right facets sit in half tone, left facets fall away, and
 * shanks carry a cylindrical gradient with a specular streak. Threads are
 * drawn as slanted bands rather than hatching so they read as helices.
 */

export const TONES = {
  steel: {
    name: "steel",
    top: ["#FFFFFF", "#DDE6EB", "#A9B7C1"],
    front: ["#5F6D79", "#B3C0C9", "#F2F7F9", "#8E9CA7", "#46525C"],
    left: ["#414D57", "#7E8C97"],
    right: ["#9EACB6", "#4C5860"],
    bore: ["#66747F", "#1B2229"],
    edge: "#F4F8FA",
    line: "#33404A",
    accent: "#8FA0AC",
  },
  zinc: {
    name: "zinc",
    top: ["#FFFDF6", "#EDE6CE", "#B5A97F"],
    front: ["#7E7454", "#D5CBAA", "#FDFBF2", "#B3A986", "#6B6247"],
    left: ["#6B6247", "#A79D7C"],
    right: ["#C6BC98", "#7E7454"],
    bore: ["#867C5D", "#2C2820"],
    edge: "#FFFDF2",
    line: "#3F3A28",
    accent: "#BDB18C",
  },
  black: {
    name: "black",
    top: ["#7C858D", "#39424A", "#1A2026"],
    front: ["#10161B", "#39434C", "#7E8890", "#2A333B", "#0A0E12"],
    left: ["#0D1217", "#333C44"],
    right: ["#4A545C", "#141A1F"],
    bore: ["#3A434B", "#080B0E"],
    edge: "#95A0A8",
    line: "#05080B",
    accent: "#68727A",
  },
};

/** Gradient + shadow definitions, id-namespaced so files stay self-contained. */
export function defs(t) {
  return `<defs>
  <linearGradient id="gTop" x1="0" y1="0" x2=".45" y2="1">
    <stop offset="0" stop-color="${t.top[0]}"/><stop offset=".52" stop-color="${t.top[1]}"/><stop offset="1" stop-color="${t.top[2]}"/>
  </linearGradient>
  <linearGradient id="gFront" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.front[0]}"/><stop offset=".2" stop-color="${t.front[1]}"/>
    <stop offset=".42" stop-color="${t.front[2]}"/><stop offset=".72" stop-color="${t.front[3]}"/><stop offset="1" stop-color="${t.front[4]}"/>
  </linearGradient>
  <linearGradient id="gLeft" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.left[0]}"/><stop offset="1" stop-color="${t.left[1]}"/>
  </linearGradient>
  <linearGradient id="gRight" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.right[0]}"/><stop offset="1" stop-color="${t.right[1]}"/>
  </linearGradient>
  <linearGradient id="gDome" x1=".2" y1="0" x2=".85" y2="1">
    <stop offset="0" stop-color="${t.top[0]}"/><stop offset=".4" stop-color="${t.top[1]}"/><stop offset="1" stop-color="${t.top[2]}"/>
  </linearGradient>
  <radialGradient id="gBore" cx=".38" cy=".3" r=".85">
    <stop offset="0" stop-color="${t.bore[0]}"/><stop offset="1" stop-color="${t.bore[1]}"/>
  </radialGradient>
  <radialGradient id="gGround" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#0B1015" stop-opacity=".38"/><stop offset="1" stop-color="#0B1015" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gNylon" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8FD3F4"/><stop offset="1" stop-color="#2F7FA8"/>
  </linearGradient>
  <linearGradient id="gNylonW" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#F4F7F9"/><stop offset="1" stop-color="#B4C0C8"/>
  </linearGradient>
</defs>`;
}

export const ground = (cx = 60, cy = 112, rx = 30, ry = 7) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gGround)"/>`;

/* ------------------------------------------------------------------ */
/* cylindrical shank with rolled thread                                */
/* ------------------------------------------------------------------ */
export function shank(t, { cx = 60, top, bottom, w, thread = true, tip = "flat", pitch = 5.4 }) {
  const half = w / 2;
  const ry = half * 0.42;
  let body;
  if (tip === "point") {
    body = `M${cx - half} ${top}h${w}v${bottom - top - w * 0.9}l${-half} ${w * 0.9}l${-half} ${-w * 0.9}z`;
  } else if (tip === "drill") {
    body = `M${cx - half} ${top}h${w}v${bottom - top - w * 0.55}l${-half} ${w * 0.55}l${-half} ${-w * 0.55}z`;
  } else {
    body = `M${cx - half} ${top}h${w}v${bottom - top}a${half} ${ry} 0 0 1 ${-w} 0z`;
  }
  let threads = "";
  if (thread) {
    const end = tip === "flat" ? bottom - 1 : bottom - w * 0.9;
    const dark = [];
    const light = [];
    for (let y = top + pitch * 0.6; y < end; y += pitch) {
      const narrow = tip !== "flat" && y > end - w ? (end - y) / w : 1;
      const ww = half * 2 * Math.max(0.35, narrow);
      const x0 = cx - ww / 2;
      dark.push(`M${x0.toFixed(1)} ${y.toFixed(1)}q${(ww / 2).toFixed(1)} ${(pitch * 0.5).toFixed(1)} ${ww.toFixed(1)} ${(pitch * 0.32).toFixed(1)}`);
      light.push(`M${x0.toFixed(1)} ${(y - pitch * 0.28).toFixed(1)}q${(ww / 2).toFixed(1)} ${(pitch * 0.5).toFixed(1)} ${ww.toFixed(1)} ${(pitch * 0.32).toFixed(1)}`);
    }
    threads =
      `<path d="${dark.join("")}" fill="none" stroke="${t.line}" stroke-opacity=".42" stroke-width="${(w * 0.3).toFixed(1)}" stroke-linecap="round"/>` +
      `<path d="${light.join("")}" fill="none" stroke="${t.edge}" stroke-opacity=".5" stroke-width="${(w * 0.12).toFixed(1)}" stroke-linecap="round"/>`;
  }
  return `<path d="${body}" fill="url(#gFront)"/>${threads}`;
}

/* plain (unthreaded) cylinder */
export const rod = (t, o) => shank(t, { ...o, thread: false });

/* ------------------------------------------------------------------ */
/* hexagon prism — the head of a bolt, the body of a nut               */
/* ------------------------------------------------------------------ */
export function hexPrism(t, { cx = 60, cy, rx, h }) {
  const ry = rx * 0.433;
  const inset = rx * 0.5;
  const L = cx - rx, R = cx + rx, IL = cx - inset, IR = cx + inset;
  const topFace = `M${IL} ${cy - ry}h${inset * 2}L${R} ${cy}l${-inset} ${ry}h${-inset * 2}L${L} ${cy}z`;
  return `
  <path d="M${L} ${cy}l${inset} ${ry}v${h}l${-inset} ${-ry}z" fill="url(#gLeft)"/>
  <path d="M${IL} ${cy + ry}h${inset * 2}v${h}h${-inset * 2}z" fill="url(#gFront)"/>
  <path d="M${IR} ${cy + ry}L${R} ${cy}v${h}l${-inset} ${ry}z" fill="url(#gRight)"/>
  <path d="${topFace}" fill="url(#gTop)"/>
  <path d="${topFace}" fill="none" stroke="${t.edge}" stroke-opacity=".55" stroke-width=".8"/>`;
}

/** square prism — square nuts, square necks, T heads */
export function boxPrism(t, { cx = 60, cy, rx, h, ry = null }) {
  const yr = ry ?? rx * 0.45;
  return `
  <path d="M${cx - rx} ${cy}l${rx} ${yr}v${h}l${-rx} ${-yr}z" fill="url(#gLeft)"/>
  <path d="M${cx} ${cy + yr}l${rx} ${-yr}v${h}l${-rx} ${yr}z" fill="url(#gRight)"/>
  <path d="M${cx} ${cy + yr}v${h}" stroke="${t.line}" stroke-opacity=".35" stroke-width=".7"/>
  <path d="M${cx} ${cy - yr}l${rx} ${yr}l${-rx} ${yr}l${-rx} ${-yr}z" fill="url(#gTop)"/>`;
}

/* ------------------------------------------------------------------ */
/* disc — washers, flanges, collars                                    */
/* ------------------------------------------------------------------ */
export function disc(t, { cx = 60, cy, rx, h, bore = 0, ry = null, fill = "url(#gTop)" }) {
  const yr = ry ?? rx * 0.42;
  const boreRx = bore * rx;
  const boreRy = boreRx * 0.42;
  return `
  <path d="M${cx - rx} ${cy}v${h}a${rx} ${yr} 0 0 0 ${rx * 2} 0v${-h}z" fill="url(#gFront)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${yr}" fill="${fill}"/>
  ${bore ? `<ellipse cx="${cx}" cy="${cy}" rx="${boreRx}" ry="${boreRy}" fill="url(#gBore)"/>
  <path d="M${cx - boreRx} ${cy}a${boreRx} ${boreRy} 0 0 0 ${boreRx * 2} 0" fill="none" stroke="${t.edge}" stroke-opacity=".5" stroke-width=".9"/>` : ""}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${yr}" fill="none" stroke="${t.edge}" stroke-opacity=".5" stroke-width=".8"/>`;
}

/** internally threaded bore, drawn on a nut's top face */
export function bore(t, { cx = 60, cy, rx, depth = 0 }) {
  const ry = rx * 0.42;
  return `
  ${depth ? `<path d="M${cx - rx} ${cy}a${rx} ${ry} 0 0 0 ${rx * 2} 0v${depth}a${rx} ${ry} 0 0 1 ${-rx * 2} 0z" fill="${t.bore[1]}"/>` : ""}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gBore)"/>
  <path d="M${cx - rx * 0.82} ${cy - ry * 0.35}q${rx * 0.82} ${ry * 1.1} ${rx * 1.64} ${ry * 0.2}M${cx - rx * 0.82} ${cy + ry * 0.35}q${rx * 0.82} ${ry * 1.1} ${rx * 1.64} ${ry * 0.2}" fill="none" stroke="${t.accent}" stroke-opacity=".65" stroke-width=".8"/>`;
}

/** hex socket drive recess */
export function socketRecess(t, { cx = 60, cy, r }) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * 0.45 * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="url(#gBore)"/>
  <polygon points="${pts.join(" ")}" fill="none" stroke="${t.edge}" stroke-opacity=".35" stroke-width=".7"/>`;
}

/** dome / button head */
export function dome(t, { cx = 60, cy, rx, h, ry = null }) {
  const yr = ry ?? rx * 0.4;
  return `
  <path d="M${cx - rx} ${cy}v${yr * 0.5}a${rx} ${yr} 0 0 0 ${rx * 2} 0v${-yr * 0.5}z" fill="url(#gFront)"/>
  <path d="M${cx - rx} ${cy}a${rx} ${h} 0 0 1 ${rx * 2} 0a${rx} ${yr} 0 0 1 ${-rx * 2} 0z" fill="url(#gDome)"/>`;
}

/** countersunk head */
export function cskHead(t, { cx = 60, cy, rx, h }) {
  const ry = rx * 0.42;
  const bottom = rx * 0.42;
  return `
  <path d="M${cx - rx} ${cy}l${rx - bottom} ${h}h${bottom * 2}l${rx - bottom} ${-h}z" fill="url(#gFront)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gTop)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${t.edge}" stroke-opacity=".5" stroke-width=".8"/>`;
}

/** slot / cross drive on a flat head */
export const slot = (t, { cx = 60, cy, r }) =>
  `<rect x="${cx - r}" y="${cy - r * 0.16}" width="${r * 2}" height="${r * 0.32}" rx="${r * 0.14}" fill="${t.bore[1]}" opacity=".85"/>`;

export const cross = (t, { cx = 60, cy, r }) =>
  `${slot(t, { cx, cy, r })}<rect x="${cx - r * 0.16}" y="${cy - r * 0.42}" width="${r * 0.32}" height="${r * 0.84}" rx="${r * 0.12}" fill="${t.bore[1]}" opacity=".85"/>`;

export function svg(t, body, { w = 120 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 120" width="${w}" height="120" role="img">${defs(t)}${body}</svg>`;
}
