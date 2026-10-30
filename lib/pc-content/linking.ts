import { articleHref, getPublishedArticle, publishedArticles } from "./index";
import { classify, getSubtopic, subtopicHref, SUBTOPICS, type Subtopic } from "./subtopics";
import type { PcArticle } from "./types";

/** A hub needs this many published guides before it is linked, listed in the sitemap or indexed. */
export const MIN_HUB_ARTICLES = 5;

export interface ContextLink { href: string; title: string; reason: string }

const STOP = new Set(["best", "for", "and", "the", "with", "a", "an", "of", "to", "in", "on", "your", "pc", "pcs", "how", "what", "is", "it", "vs", "2026", "reddit", "good", "top"]);
const tokens = (slug: string) => new Set(slug.split("-").filter((t) => t && !STOP.has(t)));
const seed = (s: string) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const isInfo = (a: PcArticle) => a.type !== "best-guide";

let index: Map<string, PcArticle[]> | undefined;
/** Published articles per sub-topic, informational guides first, then shorter (head-term) slugs. */
export function articlesBySubtopic(): Map<string, PcArticle[]> {
  if (index) return index;
  index = new Map(SUBTOPICS.map((s) => [s.slug, [] as PcArticle[]]));
  for (const a of publishedArticles) {
    const s = classify(a);
    if (s) index.get(s.slug)!.push(a);
  }
  for (const list of index.values()) list.sort((x, y) => Number(isInfo(y)) - Number(isInfo(x)) || x.slug.length - y.slug.length || x.slug.localeCompare(y.slug));
  return index;
}

export const articlesInSubtopic = (s: Subtopic) => articlesBySubtopic().get(s.slug) ?? [];
export const hubIsLive = (s: Subtopic) => articlesInSubtopic(s).length >= MIN_HUB_ARTICLES;
export const liveSubtopics = () => SUBTOPICS.filter(hubIsLive);

/** The live hub an article sits under, for breadcrumbs and the "more in this topic" link. */
export function articleSubtopic(a: PcArticle): Subtopic | undefined {
  const s = classify(a);
  return s && hubIsLive(s) ? s : undefined;
}

function similarity(a: Set<string>, b: Set<string>) {
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return shared / (a.size + b.size - shared || 1);
}

const BUDGET = /(^|-)(budget|cheap|cheapest|affordable|inexpensive|low-cost|entry-level|value)(-|$)/;
const PREMIUM = /(^|-)(high-end|premium|flagship|enthusiast|luxury)(-|$)/;
const priceCap = (slug: string) => { const m = /(^|-)under-(\d+)(-|$)/.exec(slug); return m ? Number(m[2]) : undefined; };

/**
 * 6-10 contextual links for an article: close siblings in its sub-topic, a cheaper and a
 * higher-budget alternative, explainers from the same hub, guides from the hubs that answer
 * its compatibility questions, and the hub itself. Declared `related` slugs come first.
 */
export function contextualLinks(a: PcArticle, max = 9): ContextLink[] {
  const out: ContextLink[] = [];
  const seen = new Set([a.slug]);
  const add = (x: PcArticle | undefined, reason: string) => {
    if (!x || seen.has(x.slug) || out.length >= max) return;
    seen.add(x.slug);
    out.push({ href: articleHref(x), title: x.title, reason });
  };

  for (const slug of a.related ?? []) add(getPublishedArticle(slug), "Related guide");

  const sub = classify(a);
  if (!sub) return out;
  const mine = tokens(a.slug);
  const siblings = articlesInSubtopic(sub).filter((x) => x.slug !== a.slug);
  const ranked = siblings
    .filter((x) => !isInfo(x))
    .map((x) => ({ x, score: similarity(mine, tokens(x.slug)) }))
    .sort((p, q) => q.score - p.score || p.x.slug.length - q.x.slug.length);

  // Price ladder: the nearest lower and higher "under-N" guide, or a budget/premium counterpart.
  const cap = priceCap(a.slug);
  if (cap !== undefined) {
    const capped = ranked.map((r) => ({ ...r, cap: priceCap(r.x.slug) })).filter((r) => r.cap !== undefined && r.score > 0);
    add(capped.filter((r) => r.cap! < cap).sort((p, q) => q.cap! - p.cap! || q.score - p.score)[0]?.x, "Lower budget");
    add(capped.filter((r) => r.cap! > cap).sort((p, q) => p.cap! - q.cap! || q.score - p.score)[0]?.x, "Higher budget");
  } else if (BUDGET.test(a.slug)) {
    add(ranked.find((r) => !BUDGET.test(r.x.slug) && priceCap(r.x.slug) === undefined && r.score > 0)?.x, "Without a budget limit");
  } else {
    add(ranked.find((r) => (BUDGET.test(r.x.slug) || priceCap(r.x.slug) !== undefined) && r.score > 0)?.x, "Lower budget");
    if (!PREMIUM.test(a.slug)) add(ranked.find((r) => PREMIUM.test(r.x.slug) && r.score > 0)?.x, "Higher budget");
  }

  // Closest siblings by shared slug terms (same use case, platform or size).
  for (const r of ranked.slice(0, 6)) if (out.length < 5) add(r.x, "Similar guide");

  // Explainers from the same hub, then the compatibility hubs.
  for (const x of siblings.filter(isInfo).slice(0, 2)) add(x, "Explainer");
  for (const c of sub.compat) {
    const hub = getSubtopic(c);
    if (!hub) continue;
    const list = articlesInSubtopic(hub);
    const infos = list.filter(isInfo);
    // Rotate by slug so one explainer does not collect every link from a large hub.
    const pool = infos.length ? infos : list.slice(0, 5);
    add(pool[seed(a.slug) % pool.length], sub.category === "peripherals" || sub.category === "monitors" ? `Also see: ${hub.title.toLowerCase()}` : `Check compatibility: ${hub.title.toLowerCase()}`);
    if (out.length >= max - 1) break;
  }
  // Fill with further siblings if the hub was thin on explainers.
  for (const r of ranked) { if (out.length >= max) break; add(r.x, "Similar guide"); }
  return out;
}

export const hubLink = (s: Subtopic): ContextLink => ({ href: subtopicHref(s), title: `All ${s.title.toLowerCase()} guides`, reason: "Topic hub" });
