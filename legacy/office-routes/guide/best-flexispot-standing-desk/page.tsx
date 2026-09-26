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
  atAGlanceRows,
  faq,
  relatedGuides,
  type FlexiSpotDesk,
} from "@/data/guides/best-flexispot-standing-desk";

export const revalidate = 604800;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-flexispot-standing-desk",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: FlexiSpotDesk }) {
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
                {product.size}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.drawer}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.warranty}
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

export default async function BestFlexiSpotStandingDeskPage() {
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
      "@id": `${SITE_URL}/guide/best-flexispot-standing-desk`,
    },
    about: [
      { "@type": "Thing", name: "FlexiSpot Standing Desk" },
      { "@type": "Thing", name: "Electric Standing Desk" },
      { "@type": "Thing", name: "Height Adjustable Desk" },
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
        name: "Best FlexiSpot Standing Desks",
        item: `${SITE_URL}/guide/best-flexispot-standing-desk`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best FlexiSpot Standing Desks 2026",
    description:
      "7 best FlexiSpot standing desks in 2026 - EN1, EN2, Comhar, and bamboo models ranked by review count, specs, and real-world performance.",
    numberOfItems: products.length,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name} - ${p.badge}`,
      url: `${SITE_URL}/guide/best-flexispot-standing-desk#${p.id}`,
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
          <span className="text-ink">Best FlexiSpot Standing Desks</span>
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
            <span className="text-xs text-ink-muted">Updated June 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            FlexiSpot is the most-reviewed electric standing desk brand on Amazon.
            EN1, EN2, Comhar, and bamboo models ranked by review count, frame quality,
            and value. Every current in-stock model evaluated.
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
              7 FlexiSpot models evaluated, EN1 through bamboo
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
            alt="Best FlexiSpot standing desks for home office"
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
                    Size
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Drawer
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Warranty
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
                      {row.size}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.drawer}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.warranty}
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
            FlexiSpot is the most-reviewed electric standing desk brand on Amazon for a
            reason: consistent motor quality, a 5-year warranty, and a model lineup that
            covers every budget. The confusing part is the naming. EN1, EN2, E5, E7,
            Comhar - these names look random but follow a clear logic explained in this
            guide. If you want to compare FlexiSpot against other brands first, see our
            full{" "}
            <Link prefetch={false}
              href="/guide/best-electric-standing-desk"
              className="text-brand hover:underline"
            >
              electric standing desk comparison
            </Link>
            . If a solid wood surface is your priority over laminate, see our guide to{" "}
            <Link prefetch={false}
              href="/guide/best-solid-wood-standing-desk"
              className="text-brand hover:underline"
            >
              solid wood standing desks
            </Link>
            .
          </p>
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
          7 Best FlexiSpot Standing Desks in 2026
        </h2>

        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            FlexiSpot Buying Guide
          </h2>

          {/* Model Hierarchy */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              FlexiSpot Model Hierarchy
            </h3>
            <div className="space-y-4 text-sm text-ink-secondary leading-relaxed mb-5">
              <p>
                FlexiSpot sells two fundamentally different product families. Knowing
                which family a listing belongs to prevents a common ordering mistake.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-white">
                  <p className="font-bold text-ink text-sm mb-2">
                    One-Piece Complete Desks
                  </p>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Frame plus desktop surface included. Ready to use out of box.
                    Includes EN1, EN2, Comhar, and bamboo models. All seven picks
                    on this page are one-piece complete desks.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-white">
                  <p className="font-bold text-ink text-sm mb-2">
                    Frame-Only Products
                  </p>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Frame and motor only - no desktop surface included. Includes E5,
                    E7, and E7 Pro. You supply your own tabletop. Priced lower but
                    require a separate desktop purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Model Tier</th>
                    <th className="text-left px-4 py-3 font-semibold">Models</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Motor Stages
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      tier: "Entry",
                      models: "EN1 (48\")",
                      type: "One-piece",
                      stages: "2-stage",
                      bestFor: "First standing desk, budget-conscious",
                    },
                    {
                      tier: "Mid",
                      models: "EN2 (55\")",
                      type: "One-piece",
                      stages: "2-stage",
                      bestFor: "Dual monitors, more horizontal space",
                    },
                    {
                      tier: "Flagship",
                      models: "Comhar 48\" / 55\"",
                      type: "One-piece",
                      stages: "2-stage",
                      bestFor: "Drawer storage + USB charging needed",
                    },
                    {
                      tier: "Wide",
                      models: "60\" laminate / bamboo",
                      type: "One-piece",
                      stages: "2-stage",
                      bestFor: "Maximum surface area, ultrawide monitor",
                    },
                    {
                      tier: "Pro Frame",
                      models: "E5, E7, E7 Pro",
                      type: "Frame only",
                      stages: "3-stage",
                      bestFor: "Custom desktop surface, higher load capacity",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.tier}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.models}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.type}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.stages}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2-stage vs 3-stage */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              2-Stage vs 3-Stage Frame: What It Actually Means
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Frame Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Height Range</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Stability at Max Height
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">FlexiSpot Models</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "2-stage",
                      range: "28\" to 47\" typical",
                      stability: "Perceptible wobble when pressed",
                      models: "EN1, EN2, Comhar, 60\" models",
                    },
                    {
                      type: "3-stage",
                      range: "22\" to 50\" typical",
                      stability: "Noticeably more rigid at max height",
                      models: "E5, E7, E7 Pro (frame only)",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.type}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.range}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.stability}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.models}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-muted mt-3 leading-relaxed">
              For most home office users, the 2-stage wobble is noticeable but not a
              daily problem. If you type heavily while standing and wobble is a deal-breaker,
              the E7 frame-only series with a custom top is the correct solution.
            </p>
          </div>

          {/* Reddit verdict callout */}
          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20">
            <h3 className="text-base font-bold text-ink mb-2">
              Reddit Verdict on FlexiSpot
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Across r/StandingDesk and r/homeoffice, FlexiSpot EN1 and Comhar appear
              consistently as recommended entry and mid-tier picks. The recurring
              positives are warranty honoring and assembly straightforwardness. The
              recurring complaints are 2-stage wobble at full standing height and 24\"
              depth being tight for large monitors without an arm. Both are accurately
              reflected in the tradeoffs listed for each pick above.
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
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
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
                context: "Best overall, most reviews, proven quality",
                id: "flexispot-en1-48x24",
                name: "FlexiSpot EN1 48x24\"",
                verdict: " - 12,000+ reviews, 5-year warranty, one-piece desktop.",
              },
              {
                context: "27\"+ monitor without a monitor arm",
                id: "flexispot-en1-48x30",
                name: "FlexiSpot EN1 48x30\"",
                verdict: " - 30\" depth gives proper focal distance for larger screens.",
              },
              {
                context: "Dual monitor setup, more horizontal space",
                id: "flexispot-en2-55x28",
                name: "FlexiSpot EN2 55x28\"",
                verdict: " - 4.6 stars, 7\" wider than EN1, 28\" comfortable depth.",
              },
              {
                context: "Need drawer storage and USB charging",
                id: "flexispot-comhar-48",
                name: "FlexiSpot Comhar 48\"",
                verdict: " - drawer rises with desk, 2x USB-A plus 1x USB-C built in.",
              },
              {
                context: "Natural surface over laminate",
                id: "flexispot-bamboo-60x30",
                name: "FlexiSpot Bamboo 60x30\"",
                verdict: " - solid bamboo, Janka 1,300 to 1,800 lbf, largest footprint.",
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
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Browse FlexiSpot desks on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            Filter by size, color, and price. All Prime-eligible options available.
          </p>
          <a
            href="https://www.amazon.com/s?k=flexispot+standing+desk&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Browse FlexiSpot desks on Amazon &rarr;
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
            Last updated: June 2026. Verify current Amazon prices before purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
