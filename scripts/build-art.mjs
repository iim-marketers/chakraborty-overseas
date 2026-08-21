/* Renders every part in every finish to a standalone SVG in public/art/. */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { PARTS } from "./art/parts.mjs";
import { TONES, svg } from "./art/primitives.mjs";

const OUT = "public/art";
rmSync(OUT, { recursive: true, force: true });

let n = 0;
for (const toneName of Object.keys(TONES)) {
  const t = TONES[toneName];
  mkdirSync(`${OUT}/${toneName}`, { recursive: true });
  for (const [name, draw] of Object.entries(PARTS)) {
    writeFileSync(`${OUT}/${toneName}/${name}.svg`, svg(t, draw(t)));
    n++;
  }
}
console.log(`wrote ${n} files across ${Object.keys(TONES).length} finishes`);
