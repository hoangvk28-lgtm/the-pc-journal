// Extracts candidate PSU facts from Amazon feature bullets (manufacturer claims) for editorial review.
// Usage: node scripts/pcj-extract-psu-facts.mjs data/pcj-pool/psu.json ASIN1 ASIN2 ... > out.tsv
import { readFileSync } from "fs";
const [poolPath, ...asins] = process.argv.slice(2);
const pool = JSON.parse(readFileSync(poolPath, "utf-8"));
const pick = (t, re) => { const m = t.match(re); return m ? (m[1] ?? m[0]) : ""; };
for (const a of asins) {
  const p = pool[a]; if (!p) { console.log(a + "\tMISSING"); continue; }
  const t = (p.title + " || " + p.features.join(" || ")).replace(/\s+/g, " ");
  const f = {
    watts: pick(t, /(\d{3,4})\s?W\b/i),
    form: /SFX-L/i.test(t) ? "SFX-L" : /\bSFX\b/i.test(t) ? "SFX" : /Flex ?ATX/i.test(t) ? "FlexATX" : "ATX",
    atx: pick(t, /ATX\s?(3\.[01])/i),
    p80: pick(t, /80\s?(?:\+|PLUS|Plus)\s?(Titanium|Platinum|Gold|Bronze|White)/i),
    cyb: pick(t, /Cybenetics\s(Titanium|Platinum|Gold|Silver|Bronze)/i),
    lambda: pick(t, /(?:Lambda|LAMBDA|noise)[^|]{0,20}?\b(A\+\+|A\+|A-|A)\b/),
    depth: pick(t, /(1[2-9]\d)\s?mm(?:[- ]?(?:long|deep|depth|length|L\b))/i) || pick(t, /(?:length|depth|deep|long)[^|]{0,25}?(1[2-9]\d)\s?mm/i),
    fan: pick(t, /(1[2-4][05])\s?mm[^|]{0,40}?fan/i),
    bearing: pick(t, /(fluid[- ]dynamic|FDB|rifle|hydraulic|ball)\s?bearing/i),
    zero: /zero[- ]?(rpm|fan)|semi-passive|fanless mode|hybrid fan|fan stops|0 ?RPM/i.test(t) ? "yes" : "",
    modular: /semi-modular/i.test(t) ? "semi" : /non-modular/i.test(t) ? "non" : /fully modular|full modular/i.test(t) ? "full" : "",
    warranty: pick(t, /(\d{1,2})[- ]?(?:year|yr)s?\s?(?:limited\s)?warranty/i),
    pcie: pick(t, /(\d)\s?(?:x\s?)?PCIe\s?(?:6\+2|8-pin)/i),
    hpwr: pick(t, /(dual|two|2)\s?12V-2x6/i) ? "2" : /12V-2x6|12VHPWR/i.test(t) ? "1" : "",
    color: /white/i.test(p.title) ? "white" : "black",
  };
  console.log([a, p.price, p.brand ?? "", (p.title || "").slice(0, 70), ...Object.entries(f).map(([k, v]) => `${k}=${v}`)].join("\t"));
}
