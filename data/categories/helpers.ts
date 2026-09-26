import type { Fact, SpecValue } from "@/lib/pc-compose/generic";

type PoolRec = { title?: string; img?: string; price?: string };

/** Attaches image and snapshot price from an Amazon pool to hand-reviewed fact sheets. */
export function withPool(pool: Record<string, PoolRec>, facts: Omit<Fact, "img" | "price">[]): Record<string, Fact> {
  const out: Record<string, Fact> = {};
  for (const f of facts) {
    const p = pool[f.asin];
    if (!p) throw new Error(`ASIN ${f.asin} missing from pool`);
    out[f.asin] = { ...f, img: p.img, price: p.price };
  }
  return out;
}

export const n = (v: SpecValue) => String(v);
export const has = (f: Fact, key: string) => f.specs[key] !== undefined;
export const str = (f: Fact, key: string) => (f.specs[key] === undefined ? "" : String(f.specs[key]));
