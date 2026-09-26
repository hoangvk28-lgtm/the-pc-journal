import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AffiliateDisclosureBar } from "@/components/affiliate/AffiliateDisclosureBar";
import { ComparePageClient } from "@/components/compare/ComparePageClient";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/data/categories";
import { getPublicProducts } from "@/lib/public-products";

const VS_ARTICLES = [
  {
    slug: "monitor-stand-vs-monitor-arm",
    title: "Monitor Stand vs Monitor Arm",
    description: "Adjustability, desk space, stability, and value — with picks under $50 and a decision flowchart.",
    tag: "Ergonomics",
  },
  {
    slug: "usb-c-hub-vs-docking-station",
    title: "USB-C Hub vs Docking Station",
    description: "Ports, power delivery, display support, and portability — for laptops, WFH, and small desks.",
    tag: "Connectivity",
  },
  {
    slug: "lap-desk-vs-standing-desk-converter",
    title: "Lap Desk vs Standing Desk Converter",
    description: "Ergonomics, portability, and price — for couch workers, students, and small-space setups.",
    tag: "Workspace",
  },
  {
    slug: "desk-mat-vs-mouse-pad",
    title: "Desk Mat vs Mouse Pad",
    description: "Tracking surface, desk protection, and aesthetics — for gamers, WFH setups, and minimal desks.",
    tag: "Accessories",
  },
];

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Compare Small-Space Products Side-by-Side",
  description:
    "Compare scores, specs, and prices for all small-space products we've evaluated. Filter by category, sort by overall score, value, or small-space fit.",
  path: "/compare",
});

export default async function ComparePage() {
  const products = await getPublicProducts();

  return (
    <Container className="py-14">
      {/* Page header */}
      <div className="mb-8 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-brand">Compare</span>
        <h1 className="text-4xl font-bold text-ink mt-2 mb-3 tracking-tight">
          Compare Small-Space Products
        </h1>
        <p className="text-ink-secondary leading-relaxed text-lg">
          All {products.length} products we&apos;ve evaluated, scored on a 1–10 scale. Filter by category and sort by the metric that matters most to you.
        </p>
      </div>

      {/* Jump links */}
      <div className="flex flex-wrap gap-3 mb-8 text-sm">
        <a href="#table" className="text-brand font-medium hover:text-brand-dark transition-colors">
          ↓ Comparison table
        </a>
        <span className="text-border">·</span>
        <a href="#cards" className="text-brand font-medium hover:text-brand-dark transition-colors">
          ↓ Product cards
        </a>
        <span className="text-border">·</span>
        <a href="/how-we-review" className="text-ink-muted hover:text-brand transition-colors">
          How we score →
        </a>
      </div>

      {/* VS Articles section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-ink mb-4">VS Comparisons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VS_ARTICLES.map((article) => (
            <Link prefetch={false}
              key={article.slug}
              href={`/compare/${article.slug}`}
              className="group rounded-2xl border border-border bg-white hover:border-brand hover:shadow-sm transition-all p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand">{article.tag}</span>
                <span className="text-xs text-ink-muted group-hover:text-brand transition-colors font-medium">Read →</span>
              </div>
              <p className="font-bold text-ink text-sm leading-snug">{article.title}</p>
              <p className="text-xs text-ink-muted leading-relaxed">{article.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <AffiliateDisclosureBar variant="banner" className="mb-8" />

      {/* Interactive client component */}
      <ComparePageClient products={products} categories={categories} />

      {/* Score explanation */}
      <div className="mt-12 p-6 bg-white rounded-card border border-border max-w-2xl">
        <h2 className="font-bold text-ink mb-2 text-base">About These Scores</h2>
        <p className="text-sm text-ink-secondary leading-relaxed mb-3">
          All scores are on a 1–10 scale based on our evaluation methodology. Scores reflect how well each product performs for small-space use - not general use. A score of 9.0+ indicates best-in-class for this use case.
        </p>
        <a
          href="/how-we-review"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
        >
          Full methodology →
        </a>
      </div>
    </Container>
  );
}

