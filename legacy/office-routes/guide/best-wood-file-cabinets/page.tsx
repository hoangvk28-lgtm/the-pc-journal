import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  metaTitle,
  metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  metalAlternatives,
  atAGlanceRows,
  faq,
  relatedGuides,
  type FileCabinet,
} from "@/data/guides/best-wood-file-cabinets";

export const revalidate = 604800;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-wood-file-cabinets",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: FileCabinet }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {product.badge}
        </span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">
          {product.name}
        </h2>
      </div>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={220}
              height={200}
              className="object-cover w-full h-full"
              unoptimized
            />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.drawers}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.lock}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">
                Why it works
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {product.whyItWorks}
              </p>
            </div>
            {product.tradeoffs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1">
                  Trade-offs
                </p>
                <ul className="space-y-1">
                  {product.tradeoffs.map((t, i) => (
                    <li key={i} className="text-xs text-ink-secondary">
                      &middot; {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-ink-muted">
              <span className="font-semibold text-ink">Skip if:</span>{" "}
              {product.skipIf}
            </p>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity w-fit mt-auto"
              style={{ background: "#FF9900" }}
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
              </svg>
              Check price on Amazon
            </a>
          </div>
        </div>
        <div className="border-t border-border grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">
              Pros
            </p>
            <ul className="space-y-1.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">
                    +
                  </span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">
              Cons
            </p>
            <ul className="space-y-1.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">
                    &minus;
                  </span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestWoodFileCabinetsPage() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: lastUpdated,
    dateModified: lastUpdated,
    author: {
      "@type": "Person",
      name: "Jamie Cole",
      url: `${SITE_URL}/author/jamie-cole`,
    },
    publisher: {
      "@type": "Organization",
      name: "The Office Journal",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/best-wood-file-cabinets`,
    },
    about: [
      { "@type": "Thing", name: "Wood File Cabinet" },
      { "@type": "Thing", name: "Home Office Storage" },
      { "@type": "Thing", name: "Filing Cabinet" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buying Guides",
        item: `${SITE_URL}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best Wood File Cabinets",
        item: `${SITE_URL}/guide/best-wood-file-cabinets`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Wood File Cabinets in 2026",
    description: metaDescription,
    numberOfItems: products.length,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name} - ${p.badge}`,
      url: `${SITE_URL}/guide/best-wood-file-cabinets#${p.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Container className="py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">
            Buying Guides
          </Link>
          <span>/</span>
          <span className="text-ink">Best Wood File Cabinets</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Buying Guide
            </span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated July 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            Five wood-look file cabinets ranked by review count, rating, drawer
            count, and value for home offices. All picks are currently available
            on Amazon at a range of price points from budget to feature-complete.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              5 wood file cabinets evaluated
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains
          affiliate links. If you buy through our links, we may earn a small
          commission at no extra cost to you. As an Amazon Associate, The Office Journal
          earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">
            Affiliate disclosure
          </Link>
          .
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best wood file cabinets for home office"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Quick Picks table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Quick Picks
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Drawers
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Lock
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlanceRows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3">
                      <a
                        href={`#${row.id}`}
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        {row.badge}
                      </a>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.drawers}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.lock}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={products[i].amazonUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block"
                        style={{ background: "#FF9900" }}
                      >
                        Check price
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>
            This guide covers the best wood-look file cabinets at various price
            points for home offices - from budget two-drawer options under $65 to
            four-drawer locking units for buyers who need document security. All
            five main picks use engineered wood with a laminate finish, which is
            the standard construction at this price range. For solid wood options
            in the $300 to $500 range, see the guide to{" "}
            <Link prefetch={false}
              href="/guide/best-wood-file-cabinets-under-500"
              className="text-brand hover:underline"
            >
              wood file cabinets under $500
            </Link>
            . For buyers who specifically want two-drawer options, see{" "}
            <Link prefetch={false}
              href="/guide/best-2-drawer-wood-file-cabinets"
              className="text-brand hover:underline"
            >
              best 2-drawer wood file cabinets
            </Link>
            .
          </p>
        </section>

        {/* What to know before buying */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">
            What to Know Before Buying a Wood File Cabinet
          </h2>
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                Wood-Look vs Solid Wood at This Price Range
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                At the $57 to $120 range covered by this guide, every cabinet
                uses engineered wood (MDF or particleboard) with a wood-grain
                laminate surface. This is not a flaw - it is how the entire
                category works at this price. The laminate finish provides a
                consistent wood appearance without the cost of solid hardwood.
                Solid wood file cabinets typically start at $300 and go
                significantly higher.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                How Many Drawers Do You Need?
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand text-white">
                      <th className="text-left px-4 py-3 font-semibold">
                        Drawer Count
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Best For
                      </th>
                      <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                        Filing Capacity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        count: "2 Drawers",
                        best: "Light to moderate home office use",
                        capacity: "1 to 2 years of active documents",
                      },
                      {
                        count: "3 Drawers",
                        best: "Most home office users",
                        capacity: "3 to 5 years of organized files",
                      },
                      {
                        count: "4 Drawers",
                        best: "Power users, small business owners",
                        capacity: "High volume of accumulated records",
                      },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                        <td className="px-4 py-3 font-medium text-ink text-xs">
                          {row.count}
                        </td>
                        <td className="px-4 py-3 text-ink-secondary text-xs">
                          {row.best}
                        </td>
                        <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                          {row.capacity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                Mobile vs Stationary
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                All five main wood picks in this guide include rolling casters
                with locking mechanisms. A mobile cabinet can be positioned
                under a desk when not in use and rolled out for access. If you
                prefer a stationary unit that does not move, you can leave the
                casters locked at all times, though some buyers prefer a flush
                floor-mounted base for permanent placement.
              </p>
            </div>
          </div>
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">
            Jump to pick
          </p>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
              >
                #{p.rank} {p.badge}
              </a>
            ))}
            <a
              href="#metal-alternatives"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              Metal Alternatives
            </a>
            <a
              href="#buying-guide"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              Buying Guide
            </a>
            <a
              href="#faq"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              FAQ
            </a>
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">
          5 Best Wood File Cabinets
        </h2>

        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Metal Alternatives */}
        <section id="metal-alternatives" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">
            Metal Alternatives
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-8">
            Not every home office calls for a wood-look cabinet. If durability,
            moisture resistance, or fully assembled delivery is the priority,
            these metal options are worth considering. Metal construction handles
            heavy daily use and damp environments significantly better than
            engineered wood laminate at the same price point.
          </p>
          {metalAlternatives.map((product) => (
            <ProductSection key={product.id} product={product} />
          ))}
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            How to Choose a Wood File Cabinet
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Style Matching by Finish
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Finish</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Best Desk Setup Match
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      finish: "Rustic Brown",
                      match: "Farmhouse, natural wood, organic modern",
                      pick: "DEVAISE 3 Drawer (Pick 1) or 4 Drawer (Pick 5)",
                    },
                    {
                      finish: "Snow White",
                      match: "Scandinavian, minimalist, all-white setups",
                      pick: "VASAGLE CUSTOS (Pick 2)",
                    },
                    {
                      finish: "White (3 drawer)",
                      match: "All-white with more storage capacity",
                      pick: "DEVAISE 3-Drawer White (Pick 3)",
                    },
                    {
                      finish: "Light Brown / Oak",
                      match: "Warm, versatile across traditional and modern",
                      pick: "GYIIYUO Extended Desktop (Pick 4)",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.finish}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.match}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.pick}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Decision Guide by Situation
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Your Situation
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Best Pick
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      situation: "Best overall, proven review base",
                      pick: "DEVAISE 3 Drawer Rustic Brown (Pick 1)",
                    },
                    {
                      situation: "Budget pick, white finish",
                      pick: "VASAGLE CUSTOS Snow White (Pick 2)",
                    },
                    {
                      situation: "White finish with three drawers",
                      pick: "DEVAISE 3-Drawer White (Pick 3)",
                    },
                    {
                      situation: "Need a printer stand too",
                      pick: "GYIIYUO Extended Desktop (Pick 4)",
                    },
                    {
                      situation: "Need a lock and four drawers",
                      pick: "DEVAISE 4-Drawer with Lock (Pick 5)",
                    },
                    {
                      situation: "Durability over aesthetics, fully assembled",
                      pick: "Letaya Metal 3 Drawer (Metal Alternative)",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.situation}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.pick}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20">
            <h3 className="text-base font-bold text-ink mb-2">
              Using a File Cabinet as a Printer Stand
            </h3>
            <p className="text-sm text-ink-secondary">
              Three-drawer rolling units in this guide sit at approximately 27
              to 29 inches tall, close to standard desk height. The GYIIYUO with
              extended desktop is the most purpose-built option for printer
              placement. For any cabinet used as a printer stand, confirm the
              top surface weight capacity in the listing before placing a heavy
              laser printer on it.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-border bg-white"
              >
                <p className="font-bold text-ink text-sm mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">
            Bottom Line
          </h2>
          <div className="space-y-4">
            {[
              {
                context: "Best overall by review count and rating",
                id: "devaise-rustic-brown",
                name: "DEVAISE 3 Drawer Rustic Brown",
                verdict:
                  " - 5,342 reviews at 4.2 stars, three drawers, rolling casters.",
              },
              {
                context: "Best budget pick with white finish",
                id: "vasagle-custos-snow-white",
                name: "VASAGLE CUSTOS Snow White",
                verdict:
                  " - $62.99, 3,262 reviews, clean modern finish for minimalist setups.",
              },
              {
                context: "Best white finish with three drawers",
                id: "devaise-white-3drawer",
                name: "DEVAISE 3-Drawer White",
                verdict:
                  " - 2,784 reviews at 4.1 stars, white finish plus extra storage over Pick 2.",
              },
              {
                context: "Best for printer stand use",
                id: "gyiiyuo-extended-desktop",
                name: "GYIIYUO Extended Desktop",
                verdict:
                  " - built-in 24-inch extended surface solves printer placement without extra furniture.",
              },
              {
                context: "Best for document security with maximum storage",
                id: "devaise-4drawer-lock",
                name: "DEVAISE 4-Drawer with Lock",
                verdict:
                  " - only pick in this guide with both four drawers and a cylinder lock.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary">
                  <strong className="text-ink">{item.context}:</strong>{" "}
                  <a
                    href={`#${item.id}`}
                    className="font-bold text-ink hover:text-brand transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{
            background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Browse wood file cabinets on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            Filter by drawer count, finish, and price. All Prime-eligible options
            available.
          </p>
          <a
            href="https://www.amazon.com/s?k=wood+file+cabinet+home+office&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">
            Related Guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedGuides.map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">
                    {g.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 text-center">
            Last updated: July 2026. Verify current Amazon prices before
            purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
