import type { CategorySchema, Fact, GenericArticleConfig } from "@/lib/pc-compose/generic";
import { TAKE } from "./batch10-takes";

export type Entry = { cfg: GenericArticleConfig; schema: CategorySchema; facts: Record<string, Fact> };
export const L = (badge: string, reason: string, bestFor: string) => ({ badge, reason, bestFor });
export const research = "This is a research-based comparison built from maker specifications and retailer listings; we did not test these parts ourselves.";

type Spec = Omit<GenericArticleConfig, "category" | "updatedAt" | "takes"> & { fit?: Record<string, string> };

/** Builds a batch 10 entry: base takes from TAKE plus optional per-article fit sentences. */
export function mk(schema: CategorySchema, facts: Record<string, Fact>, s: Spec): Entry {
  const { fit, ...rest } = s;
  const takes: Record<string, string> = {};
  for (const a of s.asins) {
    if (!TAKE[a]) throw new Error(`No take for ${a}`);
    takes[a] = fit?.[a] ? `${TAKE[a]} ${fit[a]}` : TAKE[a];
  }
  return { schema, facts, cfg: { ...rest, category: "components", updatedAt: "2026-09-26", takes } };
}
