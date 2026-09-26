// Prints a compact digest per ASIN: bullet headlines plus number-bearing phrases, for writing fact sheets.
// Usage: node scripts/pcj-feature-digest.mjs <pool.json> ASIN...
import { readFileSync } from "fs";
const [poolPath, ...asins] = process.argv.slice(2);
const pool = JSON.parse(readFileSync(poolPath, "utf-8"));
for (const a of asins) {
  const p = pool[a]; if (!p) { console.log(`\n## ${a} MISSING`); continue; }
  const text = p.features.join(" | ");
  const heads = p.features.map((x) => { const m = x.match(/^[【\[]?([^:】\]—–-]{4,55})[:】\]—–-]/); return (m ? m[1] : x.slice(0, 55)).trim(); });
  const nums = [...new Set([...text.matchAll(/[^|.;,]{0,28}\b\d[\d.,]*\s?(?:hours?|hrs?|h\b|mm|cm|inch(?:es)?|"|in\b|lbs?|g\b|grams|oz|kg|Hz|kHz|dB|mAh|ms|slots?|W\b|GB|MHz|DPI|keys|buttons|ft|ms|nits|°)[^|.;,]{0,18}/gi)].map((m) => m[0].trim()))].slice(0, 14);
  console.log(`\n## ${a} ${p.price} ${p.title.slice(0, 90)}\n  H: ${heads.join(" / ")}\n  N: ${nums.join(" ; ")}`);
}
