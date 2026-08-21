/* Rasterises the SVG part library to transparent PNGs for the PDF catalogues. */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, readdirSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9401;
const OUT = process.argv[2] || "/tmp/art-png";
const BASE = process.env.ART_BASE || "http://localhost:3211";

const tones = readdirSync("public/art");
const parts = readdirSync(`public/art/${tones[0]}`).map((f) => f.replace(/\.svg$/, ""));

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run", "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`, `--user-data-dir=/tmp/cdp-raster`, "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 40; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === "page");
    if (target) break;
  } catch {}
  await sleep(250);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 120, height: 120, deviceScaleFactor: 3, mobile: false });
await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });

let n = 0;
for (const tone of tones) {
  mkdirSync(`${OUT}/${tone}`, { recursive: true });
  for (const part of parts) {
    /* Navigating straight to the SVG avoids data: URL subresource blocking. */
    await send("Page.navigate", { url: `${BASE}/art/${tone}/${part}.svg` });
    await sleep(90);
    const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    writeFileSync(`${OUT}/${tone}/${part}.png`, Buffer.from(shot.data, "base64"));
    n++;
  }
  console.log(tone, "done");
}
console.log("rasterised", n);
chrome.kill("SIGKILL");
process.exit(0);
