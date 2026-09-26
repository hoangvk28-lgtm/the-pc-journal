import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import type { PcCategory } from "@/lib/pc-content/types";
import { batch12 } from "@/data/clusters/batch12";
import { batch12b } from "@/data/clusters/batch12b";
import { batch12c } from "@/data/clusters/batch12c";
import { batch12d } from "@/data/clusters/batch12d";
import { L, maker, type Entry } from "./batch12-lib";

/**
 * Batch 13c helpers: one article per keyword. Takes written for batch 12 are reused; takes in the
 * batch 13c files override them. Each pick carries an editorial label whose reason is a listed fact.
 */
const b12: Record<string, string> = {};
for (const b of [...batch12, ...batch12b, ...batch12c, ...batch12d]) {
  for (const [k, v] of Object.entries(b.cfg.takes ?? {})) if (v && !b12[k]) b12[k] = v as string;
}

/** [asin, badge, label reason (a listed fact), best for] */
export type Pick = [string, string, string, string];
export type Art = {
  slug: string; kw: string; seo: string; title: string; meta: string; dek: string; teaser?: string;
  intro: string[]; bottom: string[]; picks: Pick[]; prio: string[]; related: string[]; crumb?: string;
};

export const factory = (schema: CategorySchema, facts: Record<string, Fact>, category: PcCategory, takes: Record<string, string>) => {
  const x = maker(schema, facts, category, { ...b12, ...takes });
  return (a: Art): Entry => x({
    slug: a.slug, seoTitle: a.seo, title: a.title, breadcrumbLabel: a.crumb ?? a.seo, mainKeyword: a.kw,
    dek: a.dek, metaDescription: a.meta, teaser: a.teaser ?? a.dek,
    asins: a.picks.map((p) => p[0]),
    labels: Object.fromEntries(a.picks.map((p) => [p[0], L(p[1], p[2], p[3])])),
    intro: a.intro, bottomLine: a.bottom, priorityCriteria: a.prio, related: a.related,
  });
};
