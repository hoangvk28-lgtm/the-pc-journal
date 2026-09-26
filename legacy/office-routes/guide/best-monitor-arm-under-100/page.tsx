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
  type MonitorArm100,
} from "@/data/guides/best-monitor-arm-under-100";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-monitor-arm-under-100",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: MonitorArm100 }) {
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
                Weight: {product.weightCap}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Screen: {product.screenSize}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Spring: {product.springType}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Mount: {product.mount}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">
                WHY IT WORKS
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {product.whyItWorks}
              </p>
            </div>
            {product.tradeoffs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1">
                  TRADE-OFFS
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

export default async function BestMonitorArmUnder100Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-23",
    dateModified: "2026-06-23",
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
      "@id": `${SITE_URL}/guide/best-monitor-arm-under-100`,
    },
    about: [
      { "@type": "Thing", name: "Monitor Arms Under $100" },
      { "@type": "Thing", name: "Desk Monitor Mounts" },
      { "@type": "Thing", name: "Home Office Desk Accessories" },
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
        name: "Best Monitor Arm Under $100",
        item: `${SITE_URL}/guide/best-monitor-arm-under-100`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Monitor Arms Under $100 in 2026",
    description:
      "7 monitor arms under $100 in 2026 across budget, ultrawide, white, and dual monitor categories.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-monitor-arm-under-100#${p.id}`,
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
          <span className="text-ink">Best Monitor Arm Under $100</span>
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
            A monitor arm is one of the highest-ROI desk upgrades at any budget.
            Standard monitor stands occupy 8-12 inches of desk depth - a monitor
            arm returns that entire surface while simultaneously enabling precise
            height, tilt, and rotation adjustments that no fixed stand can
            provide. Under $100 covers the full practical range for most home
            office setups: from proven spring arms at $29 to heavy-duty
            pneumatic arms rated for 49-inch ultrawides at $99.
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
              7 picks evaluated across budget, ultrawide, white, and dual monitor categories
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best monitor arm under $100 in 2026"
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
                    Weight Cap
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Screen Size
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
                      {row.weightCap}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.screenSize}
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
            A monitor arm is one of the highest-ROI desk upgrades at any budget.
            Standard monitor stands occupy 8-12 inches of desk depth - a monitor
            arm returns that entire surface while simultaneously enabling precise
            height, tilt, and rotation adjustments that no fixed stand can
            provide. On a 24-inch deep desk, a standard stand consumes 40-50% of
            the available work surface. A monitor arm reduces that footprint to
            near zero. For desk ergonomics guidance, see our{" "}
            <Link prefetch={false}
              href="/guide/standard-desk-height"
              className="text-brand hover:underline"
            >
              standard desk height guide
            </Link>
            .
          </p>
          <p>
            Under $100 covers the full practical range for most home office
            setups: from proven spring arms at $29 to heavy-duty pneumatic arms
            rated for 49-inch ultrawides at $99. This guide covers seven arms
            across that range - matched to monitor size, weight, desk type, and
            standing desk compatibility. If you are also choosing a monitor, see
            our{" "}
            <Link prefetch={false}
              href="/guide/best-27-inch-monitor-under-200"
              className="text-brand hover:underline"
            >
              best 27-inch monitor under $200
            </Link>{" "}
            picks.
          </p>
        </section>

        {/* Before You Buy */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Buy: 4 Things to Check
          </h2>

          {/* VESA Compatibility */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              VESA Compatibility
            </h3>
            <p className="text-sm text-ink-secondary mb-4">
              VESA compatibility refers to the standardized hole pattern on the
              back of your monitor. Nearly all monitors sold in the last decade
              use 75x75mm or 100x100mm. Larger ultrawides sometimes use
              200x100mm. Check the back panel of your monitor or the spec sheet
              before ordering.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Pattern</th>
                    <th className="text-left px-4 py-3 font-semibold">When it appears</th>
                    <th className="text-left px-4 py-3 font-semibold">Arm compatibility</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      pattern: "75x75mm",
                      when: "Monitors under 22 inches",
                      compat: "All arms in this guide",
                    },
                    {
                      pattern: "100x100mm",
                      when: "Most 22-32 inch monitors",
                      compat: "All arms in this guide",
                    },
                    {
                      pattern: "200x100mm",
                      when: "Some 34-49 inch ultrawides",
                      compat: "VIVO V101G1 with adapter; verify before ordering",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.pattern}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.when}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.compat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weight Capacity */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Weight Capacity: Buy 20% Headroom
            </h3>
            <p className="text-sm text-ink-secondary mb-4">
              Always choose an arm rated at least 20% above your monitor's
              actual weight. This headroom keeps the spring mechanism in its
              optimal operating range and slows wear on the adjustment joint.
              Use the without-stand weight from your monitor's spec sheet.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Monitor size</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical weight</th>
                    <th className="text-left px-4 py-3 font-semibold">Minimum arm capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      size: '24" standard',
                      weight: "8-10 lbs",
                      minCap: "13 lbs",
                    },
                    {
                      size: '27" standard',
                      weight: "10-14 lbs",
                      minCap: "18 lbs",
                    },
                    {
                      size: '27" 4K',
                      weight: "12-16 lbs",
                      minCap: "20 lbs",
                    },
                    {
                      size: '34" ultrawide',
                      weight: "15-22 lbs",
                      minCap: "27 lbs",
                    },
                    {
                      size: '49" superultrawide',
                      weight: "22-30 lbs",
                      minCap: "38 lbs",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.size}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.weight}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.minCap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Desk Thickness */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Desk Thickness
            </h3>
            <p className="text-sm text-ink-secondary">
              Most monitor arms use a C-clamp that grips the desk edge. Standard
              C-clamps accommodate desk thickness from 0.4 to 3.9 inches - this
              covers virtually all solid-wood, MDF, and laminate desktops. If
              your desk uses a hollow-core top (common with IKEA LINNMON), use
              the grommet mount option instead. Grommet mounts pass through a
              pre-drilled hole and distribute weight more safely than a surface
              clamp on hollow-core material. Most arms in this guide include
              both mounting options in the box.
            </p>
          </div>

          {/* Gas Spring vs Spring-Loaded */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Gas Spring vs Spring-Loaded
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 font-semibold">Gas spring</th>
                    <th className="text-left px-4 py-3 font-semibold">Spring-loaded</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      factor: "Adjustment feel",
                      gas: "One-finger smooth",
                      spring: "Requires more force",
                    },
                    {
                      factor: "Longevity",
                      gas: "5-10+ years typical",
                      spring: "3-7 years typical",
                    },
                    {
                      factor: "Price range",
                      gas: "$40-99",
                      spring: "$25-50",
                    },
                    {
                      factor: "Best for",
                      gas: "Frequent height changes, standing desk users",
                      spring: "Set-and-forget users",
                    },
                    {
                      factor: "Examples in guide",
                      gas: "VIVO V101G1, Amazon Basics",
                      spring: "North Bayou F80",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.factor}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.gas}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.spring}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              href="#comparison"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              Comparison
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
          7 Best Monitor Arms Under $100
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Full comparison table */}
        <section className="mb-14 scroll-mt-20" id="comparison">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Full Comparison: All 7 Monitor Arms
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Arm</th>
                  <th className="text-left px-4 py-3 font-semibold">Weight Cap</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Screen
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Spring
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Mount
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">
                    Best for
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-xs">
                      <a
                        href={`#${p.id}`}
                        className="font-bold text-brand hover:underline"
                      >
                        {p.name}
                      </a>
                      <div className="text-ink-muted font-normal mt-0.5">
                        {p.badge}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.weightCap}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {p.screenSize}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {p.springType}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {p.mount}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden lg:table-cell">
                      {p.badge}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How Much Desk Space */}
        <section className="mb-14 scroll-mt-20" id="desk-space">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            How Much Desk Space Does a Monitor Arm Free?
          </h2>
          <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
            Standard monitor stands extend 8-12 inches behind the panel, placing
            the monitor base well into the middle of the desk. A monitor arm
            moves the entire weight-bearing footprint to the desk edge, reducing
            the monitor's desk depth consumption to 1-2 inches for the mount
            hardware only. On a 24-inch deep desk, recovering 8-11 inches is the
            difference between a cramped and a functional workspace.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Desk depth</th>
                  <th className="text-left px-4 py-3 font-semibold">Standard stand footprint</th>
                  <th className="text-left px-4 py-3 font-semibold">Arm footprint</th>
                  <th className="text-left px-4 py-3 font-semibold">Space recovered</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    depth: '20"',
                    stand: '8-10"',
                    arm: '1-2"',
                    recovered: '6-9"',
                  },
                  {
                    depth: '24"',
                    stand: '10-12"',
                    arm: '1-2"',
                    recovered: '8-11"',
                  },
                  {
                    depth: '30"',
                    stand: '10-12"',
                    arm: '1-2"',
                    recovered: '8-11"',
                  },
                  {
                    depth: '32"',
                    stand: '10-12"',
                    arm: '1-2"',
                    recovered: '8-11"',
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.depth}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.stand}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.arm}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.recovered}
                    </td>
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

        {/* Amazon CTA */}
        <section
          className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Browse monitor arms on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Gas spring, spring-loaded, single and dual
            monitor options compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=monitor+arm+under+100&tag=theofficejournal-20"
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
