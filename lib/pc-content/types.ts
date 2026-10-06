/**
 * Content model for The PC Journal articles.
 *
 * Two templates:
 *   - "guide":       informational, helps a reader understand or act without buying
 *   - "best-guide":  Best X roundup rendered with The Office Journal editorial template
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

export type ContentType = "guide" | "best-guide" | "long-form";

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

export interface LongFormGuide extends ArticleBase {
  type: "long-form";
  body: string;
}

/* ──────────────────────── Best X guide (The Office Journal template) ─────────────────────── */

/** One pick. Shape matches components/guide/RichGuidePage GuideProduct so the editorial components render it unchanged. */
export interface BestProduct {
  id: string;
  rank: number;
  /** Pick label, e.g. "Quietest Measured". */
  badge: string;
  /** Exact product name. */
  name: string;
  asin: string;
  /** Kept for internal reference only; never rendered. */
  price: string;
  imageUrl: string;
  amazonUrl: string;
  /** First sentence = verdict pull quote; the rest ("

"-separated) = "Why we like it". */
  description: string;
  specs: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  skipIf?: string;
  /** One-line reason the pick is in the guide (Quick Picks). */
  summary?: string;
  /** Optional 1-2 sentence "The catch": the most important real trade-off, naming the pick that covers it. */
  catch?: string;
}

export interface HowToChooseSection {
  subheading: string;
  intro?: string;
  table?: { headers: string[]; rows: string[][] };
  cards?: { label: string; text: string }[];
  note?: string;
}

export interface BestGuide extends ArticleBase {
  type: "best-guide";
  /** Short label for breadcrumbs, e.g. "Best 850W Power Supplies". */
  breadcrumbLabel: string;
  mainKeyword: string;
  introParagraphs: string[];
  products: BestProduct[];
  howWeEvaluated: { title: string; description: string }[];
  buyingCriteria: { criterion: string; explanation: string }[];
  howToChoose: HowToChooseSection[];
  faq: { q: string; a: string }[];
  bottomLine: string[];
}

export type PcArticle = InformationalGuide | BestGuide | LongFormGuide;
