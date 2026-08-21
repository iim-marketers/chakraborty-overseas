import { ranges } from "../src/lib/products.ts";
import { site } from "../src/lib/site.ts";
import { writeFileSync } from "node:fs";
writeFileSync("/tmp/co-data.json", JSON.stringify({ ranges, site }, null, 2));
console.log("ranges:", ranges.length);
