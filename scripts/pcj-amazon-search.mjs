// Usage: node scripts/pcj-amazon-search.mjs <out.json> "query 1" "query 2" ...
// Creators API searchItems; keeps the top results per query with features, image and price.
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
for (const line of readFileSync(resolve(ROOT, ".env.local"), "utf-8").split(/\r?\n/)) {
  const t = line.trim(); if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("="); if (eq > 0 && !process.env[t.slice(0, eq)]) process.env[t.slice(0, eq)] = t.slice(eq + 1);
}
const { AMAZON_PAAPI_ACCESS_KEY: id, AMAZON_PAAPI_SECRET_KEY: secret, AMAZON_PAAPI_PARTNER_TAG: tag } = process.env;
if (!id || !secret || !tag) throw new Error("Missing AMAZON_PAAPI_* in .env.local");
const MARKETPLACE = "www.amazon.com";
const tok = await (await fetch("https://api.amazon.com/auth/o2/token", { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ grant_type: "client_credentials", client_id: id, client_secret: secret, scope: "creatorsapi::default" }) })).json();
if (!tok.access_token) throw new Error("Token failed: " + JSON.stringify(tok));
const [out, ...queries] = process.argv.slice(2);
const pool = {};
for (const q of queries) {
  const res = await fetch("https://creatorsapi.amazon/catalog/v1/searchItems", { method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${tok.access_token}`, "x-marketplace": MARKETPLACE },
    body: JSON.stringify({ keywords: q, marketplace: MARKETPLACE, partnerTag: tag, itemCount: 5,
      resources: ["images.primary.large", "itemInfo.title", "itemInfo.features", "itemInfo.byLineInfo", "offersV2.listings.price"] }) });
  const data = await res.json();
  const items = data.searchResult?.items || data.itemsResult?.items || [];
  if (!items.length) console.log(`!! ${q}: ${res.status} ${JSON.stringify(data.errors ?? data).slice(0, 200)}`);
  pool[q] = items.map((i) => ({ asin: i.asin || i.itemId, title: i.itemInfo?.title?.displayValue, brand: i.itemInfo?.byLineInfo?.brand?.displayValue,
    price: i.offersV2?.listings?.[0]?.price?.money?.displayAmount, img: i.images?.primary?.large?.url, features: i.itemInfo?.features?.displayValues || [] }));
  console.log(`\n=== ${q}`); pool[q].forEach((x) => console.log(`  ${x.asin} | ${x.price ?? "-"} | ${x.title?.slice(0, 110)}`));
  await new Promise((r) => setTimeout(r, 1100));
}
writeFileSync(out, JSON.stringify(pool, null, 2));
