/* Headless screenshots + layout checks over the Chrome DevTools Protocol. */
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const [, , url, out, wArg, hArg, mobileArg] = process.argv;
const width = Number(wArg || 1440);
const height = Number(hArg || 900);
const mobile = mobileArg === "mobile";

mkdirSync(out.replace(/\/[^/]+$/, ""), { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run", "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`, `--user-data-dir=/tmp/cdp-profile-${PORT}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let target;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      target = list.find((t) => t.type === "page");
      if (target) break;
    } catch {}
    await sleep(250);
  }
  if (!target) throw new Error("chrome did not start");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 1, mobile,
    screenWidth: width, screenHeight: height,
  });
  await send("Page.navigate", { url });
  await sleep(3500);
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, document.body.scrollHeight); void 0" });
  await sleep(1200);
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0); void 0" });
  await sleep(600);

  const check = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      inner: window.innerWidth,
      scrollW: document.documentElement.scrollWidth,
      bodyW: document.body.scrollWidth,
      overflow: [...document.querySelectorAll('body *')]
        .filter(el => el.getBoundingClientRect().right > window.innerWidth + 2)
        .slice(0, 8)
        .map(el => el.tagName + '.' + (el.className.baseVal ?? el.className ?? '').toString().slice(0, 70)),
    })`,
    returnByValue: true,
  });
  console.log(check.result.value);

  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log("saved", out);
  ws.close();
  chrome.kill("SIGKILL");
  process.exit(0);
}

main().catch((e) => {
  console.error(e.message);
  chrome.kill("SIGKILL");
  process.exit(1);
});
