/**
 * Content model for The PC Journal articles.
 *
 * Two templates share one foundation:
 *   - "guide":         informational, helps a reader understand or act without buying
 *   - "buying-guide":  researched Best X / comparison article with product sections
 *
 * Every evidence-bearing field records its basis so the template can keep
 * manufacturer specifications, attributed third-party tests, our own documented
 * measurements and editorial interpretation visibly distinct.
 */

export const PC_CATEGORIES = ["components", "pc-builds", "upgrades", "monitors", "peripherals"] as const;
export type PcCategory = (typeof PC_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PcCategory, string> = {
  components: "Components",
  "pc-builds": "PC Builds",
  upgrades: "Upgrades",
  monitors: "Monitors",
  peripherals: "Peripherals",
};

export type ContentType = "guide" | "buying-guide";

/**
 * published: public, in sitemap and homepage.
 * draft:     never rendered publicly.
 * fixture:   development sample data; only rendered under /dev with fixtures enabled, always noindex.
 */
export type PublicationStatus = "published" | "draft" | "fixture";

export interface SourceRef {
  id: string;
  label: string;
  url: string;
  publisher?: string;
  /** What the source is: documentation, a third-party test, or our own documented measurement. */
  kind: "manufacturer" | "third-party-test" | "pcj-measurement" | "reference";
  accessed?: string; // ISO date
}

/** How a claim is supported. Controls the label the reader sees. */
export type EvidenceBasis = "manufacturer-spec" | "third-party-test" | "pcj-measurement" | "editorial";

export interface EvidenceItem {
  claim: string;
  basis: EvidenceBasis;
  /** Required for every basis except "editorial". */
  sourceId?: string;
  /** Required for test results: system, settings, resolution, driver/firmware, etc. */
  conditions?: string;
}

export interface ArticleImage {
  src: string;
  alt: string;
  /** Shown under the hero, e.g. "Illustrative image". */
  caption?: string;
}

export interface ArticleBase {
  slug: string;
  type: ContentType;
  status: PublicationStatus;
  category: PcCategory;
  /** <title> text; buildMetadata appends the site name. */
  seoTitle: string;
  /** Visible H1; may differ from seoTitle. */
  title: string;
  /** Short dek under the H1. Also the meta description when metaDescription is absent. */
  dek: string;
  metaDescription?: string;
  /** Homepage/card excerpt: what the reader can decide or check after reading. */
  teaser?: string;
  /** Attribution from real data only. Publisher attribution is used when no person is credited. */
  author?: { name: string; url?: string };
  /** ISO dates, only when accurate. Omitted dates are not rendered. */
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  hero?: ArticleImage;
  /** Card-sized image for listings; falls back to hero. */
  thumbnail?: ArticleImage;
  sources?: SourceRef[];
  /** Slugs of related articles; unpublished targets are dropped and flagged. */
  related?: string[];
}

/* ─────────────────────────── Informational Guide ─────────────────────────── */

export type GuideModule =
  | { kind: "key-takeaway"; heading?: string; body: string }
  | { kind: "check-your-pc"; heading?: string; intro?: string; items: { label: string; how: string }[] }
  | { kind: "explanation"; heading: string; paragraphs: string[]; evidence?: EvidenceItem[] }
  | { kind: "steps"; heading?: string; intro?: string; steps: { title: string; body: string }[] }
  | { kind: "compatibility"; heading?: string; notes: string[] }
  | { kind: "decision-table"; heading: string; intro?: string; columns: [string, string, ...string[]]; rows: string[][] }
  | { kind: "choose-if"; heading: string; options: { choice: string; when: string[] }[] }
  | { kind: "mistakes"; heading?: string; items: { mistake: string; instead: string }[] }
  | { kind: "next-steps"; heading?: string; items: { label: string; href?: string; text?: string }[] }
  | { kind: "callout"; tone: "note" | "caution"; heading?: string; body: string };

export interface InformationalGuide extends ArticleBase {
  type: "guide";
  modules: GuideModule[];
}

/* ──────────────────────────── Best X Buying Guide ─────────────────────────── */

export interface SpecColumn {
  key: string;
  label: string;
  unit?: string;
}

export interface SpecValue {
  value: string | number;
  /** Specs default to manufacturer data; must cite a source. */
  sourceId: string;
}

export interface RetailerLink {
  retailer: "amazon" | "other";
  url: string;
  label?: string;
}

export interface ProductRecommendation {
  id: string;
  /** Exact model name, including variant/revision where it matters. */
  model: string;
  /** Optional label such as "Best for 1440p". Requires labelReason. */
  label?: string;
  labelReason?: string;
  verdict: string;
  bestFor: string;
  skipIf: string;
  image?: ArticleImage;
  /** Category-specific specs, keyed by the article's specColumns. */
  specs: Record<string, SpecValue>;
  compatibilityChecks: string[];
  evidence: EvidenceItem[];
  pros: string[];
  cons: string[];
  alternative?: { model: string; tradeOff: string; href?: string };
  /** Only rendered when a retailer is configured for this publication. */
  retailer?: RetailerLink;
  /** Only rendered when the article declares a documented scoring system. */
  score?: number;
}

export interface BuyingGuide extends ArticleBase {
  type: "buying-guide";
  /** What the guide covers and for whom, e.g. "Graphics cards for 1440p gaming on a mid-range budget". */
  scope: string;
  /** How the picks were researched. Never implies hands-on testing unless testingRecord exists. */
  researchBasis: string;
  /** Present only if we documented our own measurements (method, equipment, dates). */
  testingRecord?: { method: string; equipment: string; period: string };
  /** Present only if a documented PC-specific evaluation system exists. */
  scoringSystem?: { name: string; methodologyUrl: string; scale: number };
  specColumns: SpecColumn[];
  products: ProductRecommendation[];
  compatibilityChecklist: string[];
  howWeChose: { title: string; body: string }[];
  whatToLookFor: { title: string; body: string }[];
  alsoConsidered?: { model: string; reason: string }[];
  conclusion: { summary: string; paths: { if: string; then: string }[] };
  limitations: string[];
}

export type PcArticle = InformationalGuide | BuyingGuide;
