/**
 * The part library. Each entry returns the drawing body for one fastener,
 * composed from the primitives. Names match the `art` key on a product.
 */
import {
  bore, boxPrism, cross, cskHead, disc, dome, ground, hexPrism, rod, shank,
  socketRecess, slot,
} from "./primitives.mjs";

/* helpers -------------------------------------------------------------- */
const hexBoltHead = (t, { cx = 60, cy = 26, rx = 23, h = 13 } = {}) => hexPrism(t, { cx, cy, rx, h });

const threadRing = (t, cx, cy, rx) =>
  `<path d="M${cx - rx} ${cy}a${rx} ${rx * 0.42} 0 0 0 ${rx * 2} 0" fill="none" stroke="${t.edge}" stroke-opacity=".45" stroke-width=".9"/>`;

/** a coil spring, drawn as stacked ellipse arcs */
function coil(t, { cx, top, rx, turns = 4, step = 7 }) {
  let d = "";
  for (let i = 0; i < turns; i++) {
    const y = top + i * step;
    d += `M${cx - rx} ${y}a${rx} ${rx * 0.45} 0 1 0 ${rx * 2} ${step * 0.5}`;
  }
  return `<path d="${d}" fill="none" stroke="url(#gFront)" stroke-width="3.4" stroke-linecap="round"/>`;
}

/** knurled cylinder wall (rivet nuts, anchors) */
function knurl(t, { cx, top, bottom, rx, n = 9 }) {
  let d = "";
  for (let i = 1; i < n; i++) {
    const x = cx - rx + (rx * 2 * i) / n;
    d += `M${x.toFixed(1)} ${top + 1}V${bottom - 1}`;
  }
  return `<path d="${d}" stroke="${t.line}" stroke-opacity=".28" stroke-width=".8"/>`;
}

/* ---------------------------------------------------------------------- */
export const PARTS = {
  /* ---------- bolts ---------- */
  "hex-bolt": (t) =>
    ground() + shank(t, { top: 36, bottom: 102, w: 21 }) + hexBoltHead(t),

  "hex-bolt-half": (t) =>
    ground() +
    rod(t, { top: 36, bottom: 104, w: 21 }) +
    shank(t, { top: 66, bottom: 102, w: 21 }) +
    hexBoltHead(t),

  "flange-bolt": (t) =>
    ground() +
    shank(t, { top: 44, bottom: 104, w: 19 }) +
    disc(t, { cy: 42, rx: 28, h: 4 }) +
    hexPrism(t, { cy: 24, rx: 18, h: 11 }),

  "carriage-bolt": (t) =>
    ground() +
    shank(t, { top: 48, bottom: 104, w: 19 }) +
    boxPrism(t, { cy: 38, rx: 13, h: 12 }) +
    dome(t, { cy: 32, rx: 26, h: 15 }),

  "eye-bolt": (t) =>
    ground(60, 112, 22) +
    shank(t, { top: 52, bottom: 104, w: 18 }) +
    `<circle cx="60" cy="36" r="21" fill="none" stroke="url(#gDome)" stroke-width="11"/>
     <circle cx="60" cy="36" r="21" fill="none" stroke="${t.edge}" stroke-opacity=".45" stroke-width=".9"/>
     <circle cx="60" cy="36" r="15.5" fill="none" stroke="${t.line}" stroke-opacity=".45" stroke-width="1"/>`,

  "u-bolt": (t) =>
    ground(60, 112, 26, 6) +
    `<path d="M34 96V46a26 26 0 0 1 52 0v50" fill="none" stroke="url(#gFront)" stroke-width="12" stroke-linecap="round"/>
     <path d="M34 96V46a26 26 0 0 1 52 0v50" fill="none" stroke="${t.edge}" stroke-opacity=".35" stroke-width="2.4" stroke-linecap="round" transform="translate(-2.5 -1)"/>` +
    shank(t, { cx: 34, top: 74, bottom: 104, w: 12, pitch: 4.4 }) +
    shank(t, { cx: 86, top: 74, bottom: 104, w: 12, pitch: 4.4 }),

  "j-bolt": (t) =>
    ground(60, 112, 24, 6) +
    `<path d="M74 30v52a17 17 0 0 1-34 0v-8" fill="none" stroke="url(#gFront)" stroke-width="12" stroke-linecap="round"/>` +
    shank(t, { cx: 74, top: 16, bottom: 52, w: 12, pitch: 4.4 }),

  "foundation-bolt": (t) =>
    ground(60, 112, 26, 6) +
    `<path d="M62 26v66H36" fill="none" stroke="url(#gFront)" stroke-width="13" stroke-linecap="round"/>` +
    shank(t, { cx: 62, top: 12, bottom: 50, w: 13, pitch: 4.6 }) +
    hexPrism(t, { cx: 62, cy: 20, rx: 15, h: 9 }),

  "fala-bolt": (t) =>
    ground(60, 112, 24, 6) +
    shank(t, { top: 24, bottom: 100, w: 15, pitch: 5 }) +
    disc(t, { cy: 60, rx: 25, h: 4.5 }) +
    hexPrism(t, { cy: 20, rx: 17, h: 10 }),

  "elevator-bucket-bolt": (t) =>
    ground(60, 112, 22) +
    shank(t, { top: 52, bottom: 100, w: 18 }) +
    boxPrism(t, { cy: 44, rx: 12, h: 10 }) +
    cskHead(t, { cy: 36, rx: 27, h: 9 }),

  "jcb-furniture-bolt": (t) =>
    ground(60, 112, 24) +
    shank(t, { top: 54, bottom: 102, w: 20 }) +
    boxPrism(t, { cy: 44, rx: 14, h: 12 }) +
    dome(t, { cy: 34, rx: 28, h: 13 }),

  "belt-fastener": (t) =>
    ground(60, 106, 34, 7) +
    `<path d="M24 58h72v10H24z" fill="url(#gFront)"/>
     <path d="M24 58l8-8h72l-8 8z" fill="url(#gTop)"/>
     <path d="M96 58l8-8v10l-8 8z" fill="url(#gRight)"/>
     <path d="M24 74h72v10H24z" fill="url(#gFront)" opacity=".92"/>
     <path d="M24 74l8-8h72l-8 8z" fill="url(#gTop)" opacity=".9"/>` +
    [36, 60, 84].map((x) => `<ellipse cx="${x}" cy="54" rx="6" ry="3" fill="url(#gBore)"/>`).join("") +
    [36, 60, 84].map((x) => `<rect x="${x - 3.4}" y="54" width="6.8" height="30" rx="2" fill="url(#gFront)"/>`).join(""),

  "t-hammer-bolt": (t) =>
    ground(60, 112, 22) +
    shank(t, { top: 44, bottom: 104, w: 17 }) +
    `<path d="M28 30h64v12H28z" fill="url(#gFront)"/>
     <path d="M28 30l8-7h64l-8 7z" fill="url(#gTop)"/>
     <path d="M92 30l8-7v12l-8 7z" fill="url(#gRight)"/>`,

  /* the structural set as it ships: bolt, washer and nut, assembled */
  "hsfg-bolt": (t) =>
    ground(60, 116, 24, 5) +
    shank(t, { top: 28, bottom: 112, w: 17 }) +
    hexPrism(t, { cy: 16, rx: 21, h: 12 }) +
    disc(t, { cy: 82, rx: 26, h: 4 }) +
    hexPrism(t, { cy: 92, rx: 19, h: 12 }),

  /* ---------- screws ---------- */
  "machine-screw": (t) =>
    ground(60, 112, 20) +
    shank(t, { top: 40, bottom: 102, w: 17 }) +
    dome(t, { cy: 34, rx: 25, h: 12 }) +
    cross(t, { cy: 27, r: 12 }),

  "self-tapping-screw": (t) =>
    ground(60, 110, 16, 5) +
    shank(t, { top: 40, bottom: 106, w: 17, tip: "point", pitch: 6.4 }) +
    dome(t, { cy: 34, rx: 24, h: 11 }) +
    cross(t, { cy: 28, r: 11 }),

  "self-drilling-screw": (t) =>
    ground(60, 110, 16, 5) +
    shank(t, { top: 44, bottom: 106, w: 17, tip: "drill", pitch: 6.4 }) +
    hexPrism(t, { cy: 32, rx: 19, h: 9 }) +
    disc(t, { cy: 44, rx: 24, h: 3 }),

  "drywall-screw": (t) =>
    ground(60, 110, 14, 5) +
    shank(t, { top: 34, bottom: 108, w: 14, tip: "point", pitch: 7 }) +
    cskHead(t, { cy: 30, rx: 23, h: 8 }) +
    cross(t, { cy: 30, r: 10 }),

  "chipboard-screw": (t) =>
    ground(60, 110, 14, 5) +
    shank(t, { top: 34, bottom: 108, w: 15, tip: "point", pitch: 7.6 }) +
    cskHead(t, { cy: 30, rx: 24, h: 8 }) +
    cross(t, { cy: 30, r: 10 }),

  "socket-head-cap-screw": (t) =>
    ground(60, 112, 20) +
    shank(t, { top: 44, bottom: 104, w: 18 }) +
    disc(t, { cy: 28, rx: 22, h: 16 }) +
    knurl(t, { cx: 60, top: 30, bottom: 44, rx: 21, n: 12 }) +
    socketRecess(t, { cy: 28, r: 11 }),

  "socket-button-head": (t) =>
    ground(60, 112, 20) +
    shank(t, { top: 42, bottom: 104, w: 18 }) +
    dome(t, { cy: 36, rx: 25, h: 13 }) +
    socketRecess(t, { cy: 29, r: 10 }),

  "socket-csk-cap-screw": (t) =>
    ground(60, 112, 18) +
    shank(t, { top: 44, bottom: 104, w: 17 }) +
    cskHead(t, { cy: 34, rx: 26, h: 11 }) +
    socketRecess(t, { cy: 34, r: 10 }),

  "socket-set-screw": (t) =>
    ground(60, 106, 18, 5) +
    shank(t, { top: 32, bottom: 96, w: 26, pitch: 6.4 }) +
    `<ellipse cx="60" cy="32" rx="13" ry="5.5" fill="url(#gTop)"/>` +
    socketRecess(t, { cy: 32, r: 8.5 }),

  "allen-key": (t) =>
    ground(58, 108, 22, 5) +
    `<path d="M26 34h44v11H26z" fill="url(#gFront)"/>
     <path d="M26 34l6-6h44l-6 6z" fill="url(#gTop)"/>
     <path d="M70 34l6-6v11l-6 6z" fill="url(#gRight)"/>
     <path d="M64 40h12v56H64z" fill="url(#gFront)"/>
     <path d="M64 40l6-6h12l-6 6z" fill="url(#gTop)"/>
     <path d="M76 40l6-6v56l-6 6z" fill="url(#gRight)"/>`,

  "threaded-rod": (t) =>
    ground(60, 112, 18) +
    shank(t, { top: 12, bottom: 104, w: 22, pitch: 5.8 }) +
    `<ellipse cx="60" cy="12" rx="11" ry="4.6" fill="url(#gTop)"/>`,

  "stud-bolt": (t) =>
    ground(60, 112, 22) +
    shank(t, { top: 10, bottom: 106, w: 19, pitch: 5.4 }) +
    hexPrism(t, { cy: 26, rx: 21, h: 12 }) +
    hexPrism(t, { cy: 82, rx: 21, h: 12 }),

  /* ---------- nuts ---------- */
  "hex-nut": (t) => ground(60, 100, 30) + hexPrism(t, { cy: 46, rx: 34, h: 26 }) + bore(t, { cy: 46, rx: 16, depth: 26 }),
  "heavy-hex-nut": (t) => ground(60, 106, 32) + hexPrism(t, { cy: 40, rx: 35, h: 34 }) + bore(t, { cy: 40, rx: 16, depth: 34 }),
  "thin-hex-nut": (t) => ground(60, 92, 30) + hexPrism(t, { cy: 50, rx: 34, h: 15 }) + bore(t, { cy: 50, rx: 16, depth: 15 }),
  "long-hex-nut": (t) => ground(60, 110, 24) + hexPrism(t, { cy: 26, rx: 24, h: 62 }) + bore(t, { cy: 26, rx: 11, depth: 62 }),

  "square-nut": (t) =>
    ground(60, 100, 30) + boxPrism(t, { cy: 46, rx: 32, h: 20 }) + bore(t, { cy: 46, rx: 13, depth: 20 }),

  "nylock-nut": (t) =>
    ground(60, 102, 32) +
    hexPrism(t, { cy: 52, rx: 34, h: 24 }) +
    `<path d="M32 46v-6a28 12 0 0 1 56 0v6a28 12 0 0 1-56 0z" fill="url(#gNylon)" opacity=".92"/>
     <ellipse cx="60" cy="40" rx="28" ry="12" fill="url(#gNylonW)"/>
     <ellipse cx="60" cy="40" rx="14" ry="6" fill="url(#gBore)"/>`,

  "flange-nylock-nut": (t) =>
    ground(60, 104, 34) +
    disc(t, { cy: 74, rx: 36, h: 5 }) +
    hexPrism(t, { cy: 50, rx: 28, h: 22 }) +
    `<ellipse cx="60" cy="44" rx="23" ry="10" fill="url(#gNylonW)"/>
     <ellipse cx="60" cy="44" rx="12" ry="5" fill="url(#gBore)"/>`,

  "dome-nut": (t) =>
    ground(60, 104, 30) +
    hexPrism(t, { cy: 56, rx: 32, h: 24 }) +
    dome(t, { cy: 50, rx: 30, h: 22 }),

  "wing-nut": (t) =>
    ground(60, 100, 28) +
    `<path d="M32 46c-16-6-24-24-14-30 9-5 14 10 18 24z" fill="url(#gLeft)"/>
     <path d="M88 46c16-6 24-24 14-30-9-5-14 10-18 24z" fill="url(#gDome)"/>` +
    hexPrism(t, { cy: 52, rx: 26, h: 20 }) +
    bore(t, { cy: 52, rx: 11 }),

  "flange-nut": (t) =>
    ground(60, 102, 34) +
    disc(t, { cy: 72, rx: 36, h: 5 }) +
    hexPrism(t, { cy: 44, rx: 28, h: 26 }) +
    bore(t, { cy: 44, rx: 13, depth: 26 }),

  "df-nut": (t) =>
    ground(60, 102, 30) +
    hexPrism(t, { cy: 48, rx: 32, h: 26 }) +
    `<ellipse cx="60" cy="42" rx="26" ry="11" fill="url(#gTop)"/>` +
    bore(t, { cy: 42, rx: 13 }),

  "t-slot-nut": (t) =>
    ground(60, 104, 30) +
    `<path d="M22 56h76v14H22z" fill="url(#gFront)"/>
     <path d="M22 56l10-9h76l-10 9z" fill="url(#gTop)"/>
     <path d="M98 56l10-9v14l-10 9z" fill="url(#gRight)"/>
     <path d="M38 70h44v22H38z" fill="url(#gFront)"/>
     <path d="M82 70l10-9v22l-10 9z" fill="url(#gRight)"/>` +
    bore(t, { cy: 50, rx: 12 }),

  "spring-channel-nut": (t) =>
    ground(60, 110, 26, 6) +
    coil(t, { cx: 60, top: 66, rx: 17, turns: 4, step: 9 }) +
    `<path d="M26 40h68v14H26z" fill="url(#gFront)"/>
     <path d="M26 40l9-8h68l-9 8z" fill="url(#gTop)"/>
     <path d="M94 40l9-8v14l-9 8z" fill="url(#gRight)"/>` +
    bore(t, { cy: 36, rx: 12 }),

  "t-hammer-nut": (t) =>
    ground(60, 100, 30) +
    `<path d="M24 50h72v18H24z" fill="url(#gFront)"/>
     <path d="M24 50l10-9h72l-10 9z" fill="url(#gTop)"/>
     <path d="M96 50l10-9v18l-10 9z" fill="url(#gRight)"/>` +
    bore(t, { cy: 44, rx: 13 }) +
    `<path d="M34 44h52" stroke="${t.line}" stroke-opacity=".25" stroke-width="1"/>`,

  "cage-nut": (t) =>
    ground(60, 104, 28) +
    `<path d="M26 40h68v44H26z" fill="none" stroke="url(#gFront)" stroke-width="7"/>
     <path d="M26 40l8-8h68l-8 8z" fill="url(#gTop)"/>
     <path d="M94 40l8-8v44l-8 8z" fill="url(#gRight)" opacity=".9"/>` +
    hexPrism(t, { cy: 56, rx: 20, h: 12 }) +
    bore(t, { cy: 56, rx: 10 }),

  "tee-nut-prong": (t) =>
    ground(60, 104, 30) +
    `<path d="M46 46h28v42H46z" fill="url(#gFront)"/>` +
    disc(t, { cy: 44, rx: 32, h: 4, bore: 0.36 }) +
    `<path d="M32 46l6 26M88 46l-6 26M44 52l2 22M76 52l-2 22" stroke="url(#gFront)" stroke-width="5" stroke-linecap="round"/>`,

  "rivet-insert-nut": (t) =>
    ground(60, 104, 24) +
    `<path d="M42 40h36v50H42z" fill="url(#gFront)"/>` +
    knurl(t, { cx: 60, top: 44, bottom: 88, rx: 18, n: 10 }) +
    disc(t, { cy: 40, rx: 28, h: 4, bore: 0.44 }) +
    `<ellipse cx="60" cy="90" rx="18" ry="7" fill="url(#gRight)" opacity=".7"/>`,

  "wooden-d-insert-nut": (t) =>
    ground(60, 104, 24) +
    shank(t, { top: 40, bottom: 92, w: 38, pitch: 9 }) +
    `<ellipse cx="60" cy="40" rx="19" ry="8" fill="url(#gTop)"/>` +
    socketRecess(t, { cy: 40, r: 10 }),

  "barrel-nut": (t) =>
    ground(60, 100, 30) +
    `<path d="M26 44h68v26H26z" fill="url(#gFront)"/>
     <ellipse cx="26" cy="57" rx="8" ry="13" fill="url(#gLeft)"/>
     <ellipse cx="94" cy="57" rx="8" ry="13" fill="url(#gTop)"/>
     <ellipse cx="94" cy="57" rx="4" ry="7" fill="url(#gBore)"/>
     <ellipse cx="58" cy="46" rx="10" ry="4.5" fill="url(#gBore)"/>`,

  "clinch-nut": (t) =>
    ground(60, 100, 26) +
    disc(t, { cy: 62, rx: 30, h: 5, bore: 0.34 }) +
    `<path d="M42 44h36v18H42z" fill="url(#gFront)"/>` +
    disc(t, { cy: 44, rx: 18, h: 0, bore: 0.56 }),

  /* ---------- washers ---------- */
  "plain-washer": (t) => ground(60, 92, 34) + disc(t, { cy: 58, rx: 40, h: 6, bore: 0.42 }),
  "hsfg-washer": (t) => ground(60, 94, 34) + disc(t, { cy: 56, rx: 38, h: 11, bore: 0.44 }),

  /* split washer: a full ring with the coil ends stepped apart */
  "spring-washer": (t) =>
    ground(60, 94, 32) +
    `<ellipse cx="60" cy="60" rx="36" ry="15" fill="none" stroke="url(#gFront)" stroke-width="13"/>
     <ellipse cx="60" cy="60" rx="36" ry="15" fill="none" stroke="${t.edge}" stroke-opacity=".4" stroke-width="2.4" transform="translate(-1.5 -3)"/>
     <path d="M52 45h18l6 6H58z" fill="url(#gTop)"/>
     <path d="M52 45l-4 8h10z" fill="url(#gRight)"/>`,

  "star-washer": (t) => {
    const teeth = [];
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI / 6) * i;
      const x = 60 + Math.cos(a) * 17, y = 58 + Math.sin(a) * 7.2;
      teeth.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.4" ry="2" fill="${t.bore[1]}" opacity=".55"/>`);
    }
    return ground(60, 90, 30) + disc(t, { cy: 58, rx: 36, h: 5, bore: 0.34 }) + teeth.join("");
  },

  "external-star-washer": (t) => {
    const teeth = [];
    for (let i = 0; i < 14; i++) {
      const a = (Math.PI / 7) * i;
      const x = 60 + Math.cos(a) * 37, y = 58 + Math.sin(a) * 15.6;
      teeth.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="4" ry="2.4" fill="url(#gRight)"/>`);
    }
    return ground(60, 90, 32) + teeth.join("") + disc(t, { cy: 58, rx: 33, h: 5, bore: 0.42 });
  },

  "taper-washer": (t) =>
    ground(60, 92, 32) +
    `<path d="M22 52l38-14 38 8-38 16z" fill="url(#gTop)"/>
     <path d="M22 52v9l38 16v-16z" fill="url(#gLeft)"/>
     <path d="M60 62v16l38-22v-10z" fill="url(#gRight)"/>
     <ellipse cx="60" cy="53" rx="11" ry="5" fill="url(#gBore)"/>`,

  "square-washer": (t) =>
    ground(60, 92, 32) +
    `<path d="M60 34l38 16-38 16-38-16z" fill="url(#gTop)"/>
     <path d="M22 50v7l38 16v-7z" fill="url(#gLeft)"/>
     <path d="M60 66v7l38-16v-7z" fill="url(#gRight)"/>
     <ellipse cx="60" cy="50" rx="11" ry="5" fill="url(#gBore)"/>`,

  "dti-washer": (t) => {
    const bumps = [];
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI / 4) * i;
      bumps.push(`<ellipse cx="${(60 + Math.cos(a) * 26).toFixed(1)}" cy="${(56 + Math.sin(a) * 11).toFixed(1)}" rx="5" ry="2.6" fill="url(#gDome)"/>`);
    }
    return ground(60, 92, 32) + disc(t, { cy: 58, rx: 38, h: 7, bore: 0.4 }) + bumps.join("");
  },

  /* ---------- anchors ---------- */
  "wedge-anchor": (t) =>
    ground(60, 112, 22) +
    rod(t, { top: 46, bottom: 92, w: 17 }) +
    `<path d="M51 78h18l4 16H47z" fill="url(#gRight)"/>
     <path d="M51 78h18l-2 16h-14z" fill="url(#gTop)" opacity=".7"/>
     <path d="M51 94h18v10H51z" fill="url(#gFront)"/>` +
    shank(t, { top: 20, bottom: 50, w: 17 }) +
    disc(t, { cy: 44, rx: 24, h: 3 }) +
    hexPrism(t, { cy: 30, rx: 18, h: 10 }),

  "drop-in-anchor": (t) =>
    ground(60, 106, 24) +
    `<path d="M38 34h44v58H38z" fill="url(#gFront)"/>` +
    knurl(t, { cx: 60, top: 40, bottom: 88, rx: 22, n: 8 }) +
    `<ellipse cx="60" cy="34" rx="22" ry="9" fill="url(#gTop)"/>
     <ellipse cx="60" cy="34" rx="13" ry="5.5" fill="url(#gBore)"/>
     <path d="M60 92v-24" stroke="${t.line}" stroke-opacity=".45" stroke-width="2.4"/>
     <ellipse cx="60" cy="92" rx="22" ry="9" fill="url(#gRight)" opacity=".8"/>`,

  "sleeve-anchor": (t) =>
    ground(60, 108, 26) +
    `<path d="M40 44h40v52H40z" fill="url(#gFront)"/>
     <path d="M46 56v34M60 56v34M74 56v34" stroke="${t.line}" stroke-opacity=".3" stroke-width="1.4"/>
     <ellipse cx="60" cy="96" rx="20" ry="8" fill="url(#gRight)" opacity=".85"/>` +
    shank(t, { top: 22, bottom: 46, w: 15 }) +
    disc(t, { cy: 44, rx: 22, h: 3 }) +
    hexPrism(t, { cy: 28, rx: 17, h: 10 }),

  "nylon-frame-anchor": (t) =>
    ground(60, 108, 26) +
    `<path d="M40 40h40v58H40z" fill="url(#gNylonW)"/>
     <path d="M40 40l6-6h40l-6 6z" fill="#F7FAFB"/>
     <path d="M44 56h32M44 66h32M44 76h32M44 86h32" stroke="#9AA7B0" stroke-opacity=".7" stroke-width="1.6"/>` +
    shank(t, { top: 16, bottom: 44, w: 13, pitch: 5 }) +
    cskHead(t, { cy: 20, rx: 22, h: 7 }) +
    cross(t, { cy: 20, r: 9 }),

  "rawl-bolt-anchor": (t) =>
    ground(60, 108, 26) +
    `<path d="M42 50h36v48H42z" fill="url(#gFront)"/>
     <path d="M60 54v42" stroke="${t.line}" stroke-opacity=".4" stroke-width="2"/>
     <ellipse cx="60" cy="98" rx="18" ry="7" fill="url(#gRight)" opacity=".8"/>` +
    shank(t, { top: 24, bottom: 52, w: 15 }) +
    disc(t, { cy: 50, rx: 23, h: 3 }) +
    hexPrism(t, { cy: 30, rx: 17, h: 10 }),

  "rawl-hook-anchor": (t) =>
    ground(60, 108, 24) +
    `<path d="M46 52h32v46H46z" fill="url(#gFront)"/>
     <ellipse cx="62" cy="98" rx="16" ry="6" fill="url(#gRight)" opacity=".8"/>
     <path d="M62 52V34a14 14 0 1 1 28 0" fill="none" stroke="url(#gDome)" stroke-width="9" stroke-linecap="round"/>`,

  "pin-type-anchor": (t) =>
    ground(60, 108, 22) +
    `<path d="M46 46h28v52H46z" fill="url(#gFront)"/>
     <path d="M60 46v52" stroke="${t.line}" stroke-opacity=".35" stroke-width="1.6"/>
     <ellipse cx="60" cy="98" rx="14" ry="6" fill="url(#gRight)" opacity=".8"/>` +
    disc(t, { cy: 44, rx: 24, h: 4 }) +
    `<path d="M54 20h12v24H54z" fill="url(#gFront)"/>
     <ellipse cx="60" cy="20" rx="6" ry="3" fill="url(#gTop)"/>`,

  "anchor-shell-nut": (t) =>
    ground(60, 108, 28) +
    `<path d="M36 46h48v50H36z" fill="url(#gFront)"/>` +
    knurl(t, { cx: 60, top: 52, bottom: 92, rx: 24, n: 9 }) +
    `<ellipse cx="60" cy="46" rx="24" ry="10" fill="url(#gTop)"/>` +
    bore(t, { cy: 46, rx: 13 }) +
    hexPrism(t, { cx: 60, cy: 24, rx: 18, h: 11 }),

  "rawl-goli": (t) =>
    ground(60, 104, 24) +
    `<path d="M44 44h32v46H44z" fill="url(#gFront)"/>
     <ellipse cx="60" cy="44" rx="16" ry="7" fill="url(#gTop)"/>
     <ellipse cx="60" cy="90" rx="16" ry="7" fill="url(#gRight)" opacity=".8"/>
     <circle cx="60" cy="30" r="13" fill="url(#gDome)"/>
     <circle cx="55" cy="26" r="4" fill="#FFFFFF" opacity=".45"/>`,

  /* ---------- fittings & specials ---------- */
  minifix: (t) =>
    ground(60, 104, 34, 7) +
    disc(t, { cx: 40, cy: 52, rx: 24, h: 9, bore: 0.3 }) +
    `<path d="M64 62h34v9H64z" fill="url(#gFront)"/>
     <ellipse cx="98" cy="66.5" rx="4" ry="4.5" fill="url(#gTop)"/>
     <path d="M64 78h30v7H64z" fill="#C9A87A"/>
     <ellipse cx="94" cy="81.5" rx="3" ry="3.5" fill="#B08E5F"/>`,

  "cabinet-screw-connector": (t) =>
    ground(60, 104, 32, 7) +
    `<path d="M22 56h40v12H22z" fill="url(#gFront)"/>
     <ellipse cx="22" cy="62" rx="5" ry="6" fill="url(#gLeft)"/>
     <ellipse cx="62" cy="62" rx="5" ry="6" fill="url(#gTop)"/>` +
    shank(t, { cx: 84, top: 50, bottom: 74, w: 14, pitch: 5 }) +
    `<ellipse cx="84" cy="50" rx="7" ry="3" fill="url(#gTop)"/>
     <path d="M62 52h14v20H62z" fill="url(#gRight)"/>`,

  "precision-turned-part": (t) =>
    ground(60, 108, 30) +
    disc(t, { cy: 74, rx: 34, h: 20 }) +
    disc(t, { cy: 48, rx: 23, h: 28 }) +
    disc(t, { cy: 22, rx: 14, h: 28, bore: 0.42 }),

  "special-item": (t) =>
    ground() +
    shank(t, { top: 40, bottom: 100, w: 20 }) +
    hexPrism(t, { cy: 28, rx: 22, h: 12 }) +
    `<g stroke="${t.accent}" stroke-opacity=".8" stroke-width="1" fill="none" stroke-dasharray="4 3">
       <path d="M38 22h-16M38 106h-16M28 22v84"/>
     </g>
     <path d="M28 22l-3 6h6zM28 106l-3-6h6z" fill="${t.accent}" opacity=".8"/>`,

  /* ---------- groups, for range cards and the hero ---------- */
  "group-bolts": (t) =>
    `<g transform="translate(-16 6) rotate(-8 60 60) scale(.78)">${ground()}${shank(t, { top: 36, bottom: 102, w: 21 })}${hexBoltHead(t)}</g>
     <g transform="translate(20 -4) rotate(9 60 60) scale(.66)">${ground()}${shank(t, { top: 36, bottom: 102, w: 21 })}${hexBoltHead(t)}</g>
     <g transform="translate(30 30) rotate(-4 60 60) scale(.5)">${ground()}${shank(t, { top: 36, bottom: 102, w: 21 })}${hexBoltHead(t)}</g>`,

  "group-assembly": (t) =>
    `<g transform="translate(-14 0) scale(.8)">${ground()}${shank(t, { top: 36, bottom: 102, w: 21 })}${hexBoltHead(t)}</g>
     <g transform="translate(44 34) scale(.52)">${ground(60, 100, 30)}${hexPrism(t, { cy: 46, rx: 34, h: 26 })}${bore(t, { cy: 46, rx: 16, depth: 26 })}</g>
     <g transform="translate(40 -14) scale(.46)">${ground(60, 92, 34)}${disc(t, { cy: 58, rx: 40, h: 6, bore: 0.42 })}</g>`,
};

/* Aliases keep the product data readable without duplicating drawings. */
export const ALIASES = {
  "hsfg-nut": "heavy-hex-nut",
  "lock-nut": "thin-hex-nut",
  "machine-screw-csk": "drywall-screw",
  "u-bolt-ss": "u-bolt",
};
