/**
 * Validates every PC Journal article record (published, draft and fixtures).
 * Usage: npx tsx scripts/validate-pc-content.ts
 * Exits 1 if a published article has an error. Fixture issues are expected and reported only.
 */
import { publishedArticles, validationReport } from "../lib/pc-content";
import { fixtures } from "../data/fixtures/pc-fixtures";

const fixtureSlugs = new Set(fixtures.map((f) => f.slug));
const issues = validationReport();
for (const i of issues) console.log(`${fixtureSlugs.has(i.slug) ? "[fixture] " : ""}${i.severity.toUpperCase()} ${i.slug} ${i.field}: ${i.message}`);
console.log(`\n${publishedArticles.length} published article(s) pass validation.`);
const blocking = issues.filter((i) => i.severity === "error" && !fixtureSlugs.has(i.slug));
if (blocking.length) { console.error(`${blocking.length} blocking error(s).`); process.exit(1); }
