import type { CategorySchema, FieldDef } from "@/lib/pc-compose/generic";

/** Compact schema builder for the batch 37 accessory categories. */
export const mkSchema = (
  id: string, plural: string, fields: FieldDef[], compat: CategorySchema["compat"],
  criteria: [string, string][], faq: [string, string][], evaluated: [string, string][],
): CategorySchema => ({
  id, plural, fields, compat,
  criteria: criteria.map(([title, body], i) => ({ id: `c${i}`, title, body })),
  faq: faq.map(([q, a], i) => ({ id: `q${i}`, q, a })),
  evaluated: evaluated.map(([title, description]) => ({ title, description })),
});
export const F = (asin: string, name: string, short: string, specs: Record<string, number | string | boolean | undefined>, notes: string[]) => ({ asin, name, short, specs, notes });
