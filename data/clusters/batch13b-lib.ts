import type { CategorySchema, Fact, GenericArticleConfig } from "@/lib/pc-compose/generic";
import type { PcCategory } from "@/lib/pc-content/types";
import { batch2 } from "@/data/clusters/batch2";
import { batch3 } from "@/data/clusters/batch3";
import { batch4 } from "@/data/clusters/batch4";
import { batch5 } from "@/data/clusters/batch5";
import { batch6 } from "@/data/clusters/batch6";
import { batch7 } from "@/data/clusters/batch7";
import { batch8 } from "@/data/clusters/batch8";
import { batch9 } from "@/data/clusters/batch9";
import { batch10 } from "@/data/clusters/batch10";
import { batch10b } from "@/data/clusters/batch10b";
import { batch10c } from "@/data/clusters/batch10c";
import { batch11 } from "@/data/clusters/batch11";
import { batch11b } from "@/data/clusters/batch11b";
import { batch11c } from "@/data/clusters/batch11c";
import { batch12 } from "@/data/clusters/batch12";
import { batch12b } from "@/data/clusters/batch12b";
import { batch12c } from "@/data/clusters/batch12c";
import { batch12d } from "@/data/clusters/batch12d";
import { batch12e } from "@/data/clusters/batch12e";

/**
 * Shared helpers for batch 13b. Editorial takes already written for a product in an earlier batch
 * are reused (first one wins); products new to batch 13b get takes in the batch file itself.
 */
export const updatedAt = "2026-09-26";
export const L = (badge: string, reason: string, bestFor: string) => ({ badge, reason, bestFor });
export type Cfg = Omit<GenericArticleConfig, "takes" | "category" | "updatedAt">;
export type Entry = { cfg: GenericArticleConfig; schema: CategorySchema; facts: Record<string, Fact> };

const prior: Record<string, string> = {};
for (const b of [...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7, ...batch8, ...batch9, ...batch10, ...batch10b, ...batch10c, ...batch11, ...batch11b, ...batch11c, ...batch12, ...batch12b, ...batch12c, ...batch12d, ...batch12e]) {
  for (const [k, v] of Object.entries(b.cfg.takes ?? {})) if (v && !prior[k]) prior[k] = v as string;
}

/** Builds an article factory; `extra` takes override earlier ones for the same ASIN. */
export const maker = (schema: CategorySchema, facts: Record<string, Fact>, category: PcCategory, extra: Record<string, string> = {}) => (c: Cfg): Entry => {
  const lib = { ...prior, ...extra };
  const missing = c.asins.filter((a) => !lib[a] || !facts[a]);
  if (missing.length) throw new Error(`batch13b ${c.slug}: no take or fact sheet for ${missing.join(", ")}`);
  return { schema, facts, cfg: { ...c, category, updatedAt, takes: Object.fromEntries(c.asins.map((a) => [a, lib[a]])) } };
};
