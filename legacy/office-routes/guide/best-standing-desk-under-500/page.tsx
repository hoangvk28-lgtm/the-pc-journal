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
  type StandingDesk500,
} from "@/data/guides/best-standing-desk-under-500";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-standing-desk-under-500",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: StandingDesk500 }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {product.badge}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-ink-secondary shrink-0">
          {product.standoutFeature}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-ink tracking-tight mb-4 min-w-0 break-words">
        {product.name}
      </h2>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-64 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={240}
              height={200}
              className="object-contain w-full h-full p-3"
              unoptimized
            />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.motor}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.heightRange}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.capacity}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.desktopSize}
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

export default async function BestStandingDeskUnder500Page() {
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
      "@id": `${SITE_URL}/guide/best-standing-desk-under-500`,
    },
    about: [
      { "@type": "Thing", name: "Standing Desk Under $500" },
      { "@type": "Thing", name: "Dual Motor Standing Desk" },
      { "@type": "Thing", name: "L-Shaped Standing Desk" },
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
        name: "Best Standing Desk Under $500",
        item: `${SITE_URL}/guide/best-standing-desk-under-500`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guideTitle,
    description: metaDescription,
    numberOfItems: 5,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-standing-desk-under-500#${p.id}`,
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
          <span className="text-ink">Best Standing Desk Under $500</span>
        </nav>

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
            The $300-$500 tier is where standing desks stop requiring compromises.
            Dual motors, 3-stage lift columns for taller height ranges, 5-year
            warranties, and 220-330 lb capacities all become standard. This guide
            covers five desks across dual motor, L-shaped corner, ergonomic edge,
            and premium real-wood categories - each under $500.
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
              5 picks: dual motor, L-shaped, ergonomic edge, and real wood top
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best standing desks under $500 in 2026"
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
                    Motor
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Max Height
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
                      {row.motor}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.heightRange.split("-")[1]}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.capacity}
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

        {/* What Changes at $300-$500 */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            What Changes at $300-$500
          </h2>

          <div className="mb-8">
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold">Single Motor (Under $300)</th>
                    <th className="text-left px-4 py-3 font-semibold">Dual Motor ($300-$500)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Motor count",
                      single: "1 motor, 1 column",
                      dual: "2 motors, independent columns",
                    },
                    {
                      feature: "Lateral sway",
                      single: "Noticeable at standing height with monitors",
                      dual: "Minimal - columns resist independently",
                    },
                    {
                      feature: "Weight capacity",
                      single: "150-175 lb typical",
                      dual: "220-330 lb at this price tier",
                    },
                    {
                      feature: "Warranty",
                      single: "1-3 years",
                      dual: "5 years on frame and motors",
                    },
                    {
                      feature: "Lift column stages",
                      single: "2-stage (limited height range)",
                      dual: "3-stage (wider range for more heights)",
                    },
                    {
                      feature: "Noise level",
                      single: "50-60dB typical",
                      dual: "Under 45dB on top models",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.single}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.dual}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary mb-4">
              If you are currently on a{" "}
              <Link prefetch={false}
                href="/guide/best-standing-desk-under-300"
                className="text-brand hover:underline"
              >
                standing desk under $300
              </Link>
              , the primary reason to upgrade is dual motors with 3-stage columns.
              The difference in stability and height range is significant enough
              to justify the $150-$200 premium for daily use over 3+ years.
            </p>

            {/* 3-Stage vs 2-Stage */}
            <h3 className="text-xl font-bold text-ink mb-4 tracking-tight">
              3-Stage vs 2-Stage Lift Columns
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 font-semibold">2-Stage Columns</th>
                    <th className="text-left px-4 py-3 font-semibold">3-Stage Columns</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      factor: "Height range typical",
                      two: "28\"-45\" typical",
                      three: "25\"-50.5\" (this guide)",
                    },
                    {
                      factor: "Min height suitability",
                      two: "Users 5'3\"+ only",
                      three: "Users 4'11\"+ (Vari Classic)",
                    },
                    {
                      factor: "Max height suitability",
                      two: "Users up to 6'0\"",
                      three: "Users up to 6'4\" (Vari Classic)",
                    },
                    {
                      factor: "Structural complexity",
                      two: "Simpler, fewer joints",
                      three: "More joints, heavier column",
                    },
                    {
                      factor: "Price premium",
                      two: "Baseline",
                      three: "+$50-$100 typically",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.factor}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.two}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.three}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warranty */}
            <h3 className="text-xl font-bold text-ink mb-3 tracking-tight">
              Warranty: 5-Year vs 10-Year
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              All five desks in this guide carry 5-year warranties except the
              Fezibo (1-2 years). At this price tier, 5 years covers frame,
              motors, and electronics. A 10-year warranty (found on desks above
              $600) typically extends coverage to the desktop surface as well.
              For a desk used 8 hours daily, 5 years is sufficient protection
              given that motor failures typically appear within the first 2 years
              or after 5+ years of heavy use.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Decision guide:</strong> Need the
              widest height range? Go Vari Classic 60x30. Need the most stable
              large-capacity desk? Go FlexiSpot EC3. Need a corner desk with
              storage? Go Fezibo Triple Motor. Want a waterfall ergonomic edge?
              Go Vari ComfortEdge. Want real wood? Go FlexiSpot E3Q-PRO.
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
          5 Best Standing Desks Under $500
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Side-by-side comparison */}
        <section className="mb-12 scroll-mt-20" id="comparison">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Desk</th>
                  <th className="text-left px-4 py-3 font-semibold">Motor</th>
                  <th className="text-left px-4 py-3 font-semibold">Height Range</th>
                  <th className="text-left px-4 py-3 font-semibold">Capacity</th>
                  <th className="text-left px-4 py-3 font-semibold">Size</th>
                  <th className="text-left px-4 py-3 font-semibold">Warranty</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-xs">
                      <a href={`#${p.id}`} className="font-bold text-brand hover:underline">
                        {p.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{p.motor}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{p.heightRange}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{p.capacity}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{p.desktopSize}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{p.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Which desk is right for you */}
        <section className="mb-12 scroll-mt-20" id="which-desk">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Which Standing Desk Is Right for You?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Your Situation</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Choice</th>
                  <th className="text-left px-4 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    situation: "Best overall - daily use, any height",
                    choice: "FlexiSpot EC3",
                    why: "275 lb capacity, USB-A, 5-year warranty, under 45dB",
                  },
                  {
                    situation: "User 4'11\" to 6'4\" or ultrawide monitor",
                    choice: "Vari Classic 60x30",
                    why: "Widest height range (25.5\"-50.5\") and widest surface (60\")",
                  },
                  {
                    situation: "Corner room layout or need built-in storage",
                    choice: "Fezibo Triple Motor L-Shaped",
                    why: "Only L-shaped under $500 with 330 lb and 3 drawers",
                  },
                  {
                    situation: "Long typing sessions with wrist/forearm discomfort",
                    choice: "Vari ComfortEdge 48x30",
                    why: "Sloped waterfall edge reduces arm pressure at $399",
                  },
                  {
                    situation: "Prefer real wood over laminate, want built-in power",
                    choice: "FlexiSpot E3Q-PRO",
                    why: "Only solid rubberwood top, 4-leg frame, integrated outlets",
                  },
                  {
                    situation: "Under 5'3\" seated height or taller than 6'0\"",
                    choice: "Vari Classic 60x30",
                    why: "Best height range (25.5\"-50.5\") covers the most body types",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">{row.situation}</td>
                    <td className="px-4 py-3 text-brand font-bold text-xs">{row.choice}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-ink mb-4 tracking-tight">
            Upgrade Path from Under $300
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">If you have</th>
                  <th className="text-left px-4 py-3 font-semibold">Upgrade to</th>
                  <th className="text-left px-4 py-3 font-semibold">What you gain</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    have: "Single motor, 2-stage, 150 lb capacity",
                    upgrade: "FlexiSpot EC3 (~$350-$450)",
                    gain: "Dual motor, 3-stage, 275 lb, USB-A, 5-year warranty",
                  },
                  {
                    have: "48\" wide desk, need more surface",
                    upgrade: "Vari Classic 60x30 (~$450-$499)",
                    gain: "60\" wide, best height range, T-frame",
                  },
                  {
                    have: "Separate desk + storage unit taking up 2 walls",
                    upgrade: "Fezibo Triple Motor L-Shaped (~$450-$479)",
                    gain: "Corner config with 3 drawers in one footprint",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.have}</td>
                    <td className="px-4 py-3 text-brand font-bold text-xs">{row.upgrade}</td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">{row.gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What you cannot expect */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            What You Cannot Expect Under $500
          </h2>
          <p className="text-sm text-ink-secondary mb-4 leading-relaxed">
            The $500 ceiling is a real limit. At this price point you should not
            expect: a 10-year warranty (those start around $600-$700), max height
            above 50.5\" (Vari Classic tops out here), built-in wireless charging
            pads, memory controller with child safety lock as a standard feature,
            or commercial-grade powder coat finishes on all color options.
          </p>
          <p className="text-sm text-ink-secondary mb-4 leading-relaxed">
            For users who need 6'2\"+ standing clearance reliably across all color
            options, the FlexiSpot E7 Pro or Uplift V2 Commercial (both $600-$900)
            are the next tier up. Pair any desk here with an{" "}
            <Link prefetch={false}
              href="/guide/best-ergonomic-chair-under-500"
              className="text-brand hover:underline"
            >
              ergonomic chair under $500
            </Link>{" "}
            and a{" "}
            <Link prefetch={false}
              href="/guide/best-monitor-under-100"
              className="text-brand hover:underline"
            >
              monitor under $100
            </Link>{" "}
            for a complete home office at a reasonable total cost. A full{" "}
            <Link prefetch={false}
              href="/guide/ergonomic-desk-setup"
              className="text-brand hover:underline"
            >
              ergonomic desk setup
            </Link>{" "}
            guide covers monitor placement, chair height, and keyboard tray
            considerations.
          </p>
          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">What $500 does buy:</strong> Dual motors
            with 3-stage columns, 220-330 lb capacity, 5-year warranties, and in
            one case a real hardwood top with built-in power. The FlexiSpot EC3
            is the best value in this price range for most users. The Fezibo
            Triple Motor is the only realistic L-shaped option under $500.
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

        {/* Amazon CTA */}
        <section
          className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Browse standing desks under $500 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Dual motor, L-shaped, and premium wood options compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=standing+desk+under+500&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related Guides */}
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
