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
  type ErgoChair300,
} from "@/data/guides/best-ergonomic-chair-under-300";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-ergonomic-chair-under-300",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: ErgoChair300 }) {
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
              className="object-contain w-full h-full p-3"
              unoptimized
            />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Lumbar: {product.lumbar}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Arms: {product.armrests}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.capacity}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Warranty: {product.warranty}
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
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-xs text-ink"
                >
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
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-xs text-ink"
                >
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

export default async function BestErgonomicChairUnder300Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-20",
    dateModified: "2026-06-20",
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
      "@id": `${SITE_URL}/guide/best-ergonomic-chair-under-300`,
    },
    about: [
      { "@type": "Thing", name: "Ergonomic Chairs Under $300" },
      { "@type": "Thing", name: "Home Office Chairs" },
      { "@type": "Thing", name: "Lumbar Support Chairs" },
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
        name: "Best Ergonomic Chair Under $300",
        item: `${SITE_URL}/guide/best-ergonomic-chair-under-300`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guideTitle,
    description: metaDescription,
    numberOfItems: 10,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.badge} - ${p.name}`,
      url: `${SITE_URL}/guide/best-ergonomic-chair-under-300#${p.id}`,
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
          <span className="text-ink">Best Ergonomic Chair Under $300</span>
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
            The $300 ceiling is where ergonomic chairs stop being a compromise.
            Dynamic auto-adjust lumbar, 4D armrests, BIFMA commercial builds,
            and memory foam seating all become accessible. This guide covers 10
            chairs across lumbar systems, seat materials, and warranty tiers for
            home office and dorm use.
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
              10 chairs evaluated across lumbar systems, seat materials, and warranty tiers
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains
          affiliate links. If you buy through our links, we may earn a small
          commission at no extra cost to you. As an Amazon Associate, The Office Journal
          earns from qualifying purchases.{" "}
          <Link prefetch={false}
            href="/affiliate-disclosure"
            className="text-brand hover:underline"
          >
            Affiliate disclosure
          </Link>
          .
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best ergonomic chairs under $300 in 2026"
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
                    Lumbar
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Armrests
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Capacity
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
                      {row.lumbar}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.armrests}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {products[i].capacity}
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
            Under $300, ergonomic chairs have reached a genuine inflection point.
            Dynamic lumbar systems that sense your body weight, 4D armrests with
            lateral width adjustment, BIFMA-certified commercial builds, and
            memory foam thick enough to resist compression for years - these are
            no longer features reserved for $800+ chairs.
          </p>
          <p>
            If you are also evaluating your full desk setup, see our{" "}
            <Link prefetch={false}
              href="/guide/ergonomic-desk-setup"
              className="text-brand hover:underline"
            >
              ergonomic desk setup
            </Link>{" "}
            guide, or consider pairing a chair with a{" "}
            <Link prefetch={false}
              href="/guide/best-standing-desk-under-300"
              className="text-brand hover:underline"
            >
              standing desk under $300
            </Link>
            . For the tightest budgets, the{" "}
            <Link prefetch={false}
              href="/guide/best-office-chair-under-100"
              className="text-brand hover:underline"
            >
              best office chair under $100
            </Link>{" "}
            covers entry-level options, and{" "}
            <Link prefetch={false}
              href="/guide/best-seat-cushions-for-office-chair"
              className="text-brand hover:underline"
            >
              seat cushions
            </Link>{" "}
            can extend the life of any chair.
          </p>
          <p>
            This guide focuses on what each chair does distinctly well and who
            should skip it. Every product is available on Amazon with Prime
            shipping. Verify prices before purchasing - ranges shown reflect
            typical pricing and may shift.
          </p>
        </section>

        {/* Before You Buy */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Buy: What the Specs Actually Mean
          </h2>

          {/* Lumbar Support Types */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Lumbar Support Types
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">What It Does</th>
                    <th className="text-left px-4 py-3 font-semibold">Best For</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">In This Guide</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Fixed pad",
                      what: "Non-adjustable foam or plastic pad",
                      best: "Average-height users (5'5\" to 5'11\") with no back issues",
                      guide: "Gabrylly",
                    },
                    {
                      type: "Height-adjustable",
                      what: "Moves pad up/down to target correct vertebral level",
                      best: "Users with known lumbar sensitivity at a specific vertebral level",
                      guide: "HON Ignition 2.0",
                    },
                    {
                      type: "2D (height + depth)",
                      what: "Adjusts vertical position and how far pad protrudes",
                      best: "Most users - depth adjustment is the key ergonomic variable",
                      guide: "Sihoo M57, Hbada 3D, Marsail",
                    },
                    {
                      type: "3D (height + depth + tilt)",
                      what: "Adds tilt angle to match natural lumbar curve direction",
                      best: "Users with pronounced lumbar lordosis or flat lumbar",
                      guide: "Nouhaus Ergo3D",
                    },
                    {
                      type: "4D (height + depth + tilt + width)",
                      what: "Adds lateral width - pad narrows or widens",
                      best: "Users with narrow or very wide torsos",
                      guide: "Duramont",
                    },
                    {
                      type: "Dynamic auto-adjust",
                      what: "Senses weight shift and adjusts automatically",
                      best: "Users who change posture frequently and dislike manual readjustment",
                      guide: "Sihoo Doro C300",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs whitespace-nowrap">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.what}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.best}
                      </td>
                      <td className="px-4 py-3 text-brand text-xs font-medium hidden sm:table-cell">
                        {row.guide}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Armrest Dimensions */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Armrest Adjustment Dimensions
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Adjustments</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Limitation</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">In This Guide</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Flip-up",
                      adj: "Folds up and down only",
                      limit: "No ergonomic positioning - just gets out of the way",
                      guide: "Gabrylly, CASASIO, TRALT",
                    },
                    {
                      type: "1D",
                      adj: "Height only",
                      limit: "Cannot position arm at desk level without correct height",
                      guide: "-",
                    },
                    {
                      type: "2D",
                      adj: "Height + width",
                      limit: "Cannot pivot or adjust forward/back reach",
                      guide: "HON Ignition 2.0",
                    },
                    {
                      type: "3D",
                      adj: "Height + pivot + forward/back",
                      limit: "No lateral width adjustment between arms",
                      guide: "Sihoo C300, M57, Hbada, Marsail",
                    },
                    {
                      type: "4D",
                      adj: "Height + pivot + forward/back + width",
                      limit: "Most complete - longer setup time",
                      guide: "Nouhaus Ergo3D, Duramont",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.adj}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.limit}
                      </td>
                      <td className="px-4 py-3 text-brand text-xs font-medium hidden md:table-cell">
                        {row.guide}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mesh vs Foam */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Mesh vs Foam Seats
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 font-semibold">Mesh</th>
                    <th className="text-left px-4 py-3 font-semibold">Memory Foam</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">High-Density Foam</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      factor: "Breathability",
                      mesh: "High - air flows through weave",
                      foam: "Low - retains heat",
                      hdf: "Moderate - depends on cover fabric",
                    },
                    {
                      factor: "Initial comfort",
                      mesh: "Firm - requires break-in",
                      foam: "Soft - conforms on first sit",
                      hdf: "Firm but consistent",
                    },
                    {
                      factor: "Longevity",
                      mesh: "4-6 years before stretching",
                      foam: "2-3 years before compression",
                      hdf: "3-5 years depending on density",
                    },
                    {
                      factor: "Best climate",
                      mesh: "Warm - any season",
                      foam: "Cool - adds warmth",
                      hdf: "Neutral",
                    },
                    {
                      factor: "Chairs in guide",
                      mesh: "Sihoo C300, M57, Nouhaus, TRALT",
                      foam: "Duramont, CASASIO",
                      hdf: "Gabrylly, Hbada, Marsail",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.factor}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.mesh}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.foam}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.hdf}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Rule of thumb:</strong> Warm environment
              or 8+ hour days? Choose mesh. Cold office or prefer softness? Choose
              memory foam. Middle ground? High-density foam with mesh backrest.
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
              href="#faq"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              FAQ
            </a>
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">
          10 Best Ergonomic Chairs Under $300
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Side-by-side comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            All 10 Chairs Compared
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Chair</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Lumbar</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Armrests</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Recline</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Capacity</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Seat</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Warranty</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-xs">
                      <a href={`#${p.id}`} className="font-bold text-brand hover:underline whitespace-nowrap">
                        {p.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">{p.lumbar}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">{p.armrests}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">{p.recline}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">{p.capacity}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{p.seatType}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">{p.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Which Chair Is Right for You?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Your Situation</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Pick</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    situation: "You shift posture constantly and dislike adjusting settings",
                    pick: "Sihoo Doro C300",
                    why: "Dynamic lumbar adjusts automatically as you move",
                  },
                  {
                    situation: "Hot environment, 8+ hour days",
                    pick: "Sihoo M57",
                    why: "Full mesh back + seat for maximum airflow",
                  },
                  {
                    situation: "Shared office with multiple users of different builds",
                    pick: "Nouhaus Ergo3D",
                    why: "4D armrests + 3D lumbar covers the widest range of body proportions",
                  },
                  {
                    situation: "Long-term durability is the top priority",
                    pick: "HON Ignition 2.0",
                    why: "BIFMA certified for 5-7 year daily commercial use",
                  },
                  {
                    situation: "User is 6'0\" or taller",
                    pick: "Hbada 3D High Back",
                    why: "Extra-tall backrest covers above shoulder line for tall users",
                  },
                  {
                    situation: "Hard floors, prefer soft seating",
                    pick: "Duramont Ergonomic",
                    why: "Memory foam + rollerblade wheels quiet on hard floors",
                  },
                  {
                    situation: "Tight budget, full-time student",
                    pick: "Gabrylly High Back",
                    why: "Full high-back coverage at the lowest price in this guide",
                  },
                  {
                    situation: "Want maximum warranty coverage",
                    pick: "CASASIO Premium (5-yr) or TRALT (lifetime)",
                    why: "Longest warranty terms for long-term peace of mind",
                  },
                  {
                    situation: "Mid-range, upgrading from a basic chair",
                    pick: "Marsail Ergonomic",
                    why: "3D armrests + 2D lumbar at $150-$200 mid-range price",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-ink text-xs font-medium">{row.situation}</td>
                    <td className="px-4 py-3 text-brand text-xs font-bold whitespace-nowrap">{row.pick}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                context: "Best Overall",
                id: "sihoo-doro-c300",
                name: "Sihoo Doro C300",
                verdict:
                  ": Dynamic weight-sensing lumbar removes the need for manual adjustment. 3D armrests, 330 lb capacity, 135 deg recline, 3-year warranty at $200-$280.",
              },
              {
                context: "Best Commercial Durability",
                id: "hon-ignition-2",
                name: "HON Ignition 2.0",
                verdict:
                  ": BIFMA certified, synchro-tilt mechanism, HON commercial warranty. Designed for 5-7 years of daily 8-hour use.",
              },
              {
                context: "Best for Warm Climates",
                id: "sihoo-m57",
                name: "Sihoo M57",
                verdict:
                  ": Full mesh back and seat for maximum breathability. 2D lumbar, 3D armrests, 330 lb capacity, 3-year warranty at $150-$200.",
              },
              {
                context: "Best Memory Foam",
                id: "duramont-ergonomic",
                name: "Duramont Ergonomic",
                verdict:
                  ": 4D lumbar (most adjustment axes in this guide), memory foam seat, rollerblade wheels, 155 deg recline for hard-floor setups.",
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
            Browse ergonomic chairs under $300 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Dynamic lumbar, full mesh, memory foam, and commercial-grade options.
          </p>
          <a
            href="https://www.amazon.com/s?k=ergonomic+chair+under+300&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
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
            Last updated: June 2026. Verify current Amazon prices before
            purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
