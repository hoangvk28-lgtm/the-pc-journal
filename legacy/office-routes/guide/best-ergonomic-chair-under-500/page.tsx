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
  type ErgoChair500,
} from "@/data/guides/best-ergonomic-chair-under-500";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-ergonomic-chair-under-500",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: ErgoChair500 }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {product.badge}
        </span>
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-ink-secondary shrink-0">
          {product.priceTag}
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
                Cap: {product.capacity}
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

export default async function BestErgonomicChairUnder500Page() {
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
      "@id": `${SITE_URL}/guide/best-ergonomic-chair-under-500`,
    },
    about: [
      { "@type": "Thing", name: "Ergonomic Chairs Under $500" },
      { "@type": "Thing", name: "Office Chairs" },
      { "@type": "Thing", name: "Home Office Furniture" },
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
        name: "Best Ergonomic Chair Under $500",
        item: `${SITE_URL}/guide/best-ergonomic-chair-under-500`,
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
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-ergonomic-chair-under-500#${p.id}`,
    })),
  };

  const tier1Products = products.filter((p) =>
    p.priceTag.startsWith("Tier 1")
  );
  const tier2Products = products.filter((p) =>
    p.priceTag.startsWith("Tier 2")
  );
  const tier3Products = products.filter((p) =>
    p.priceTag.startsWith("Tier 3")
  );
  const tier4Products = products.filter((p) =>
    p.priceTag.startsWith("Tier 4")
  );

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
          <span className="text-ink">Best Ergonomic Chair Under $500</span>
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
            The $500 ceiling is where the ergonomic chair category becomes
            genuinely competitive. Sihoo&apos;s dynamic weight-sensing lumbar,
            Branch&apos;s 5D armrests with lateral slide, BIFMA-certified
            commercial builds, and 7-year warranties all sit under $500. This
            guide covers 10 chairs across four price tiers - from $130 budget
            mesh to the Branch Pro at $499 - so you can match spend to actual
            daily use hours. For{" "}
            <Link prefetch={false}
              href="/guide/best-ergonomic-chair-under-300"
              className="text-brand hover:underline"
            >
              ergonomic chairs under $300
            </Link>{" "}
            specifically, see our focused guide. If you are also setting up
            your workspace, our{" "}
            <Link prefetch={false}
              href="/guide/ergonomic-desk-setup"
              className="text-brand hover:underline"
            >
              ergonomic desk setup
            </Link>{" "}
            guide covers pairing a chair with a desk. Need to start even
            lower?{" "}
            <Link prefetch={false}
              href="/guide/best-office-chair-under-100"
              className="text-brand hover:underline"
            >
              best office chair under $100
            </Link>{" "}
            or add{" "}
            <Link prefetch={false}
              href="/guide/best-seat-cushions-for-office-chair"
              className="text-brand hover:underline"
            >
              seat cushions
            </Link>{" "}
            to an existing chair are options too.
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
              10 chairs evaluated across 4 price tiers from $130 to $499
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best ergonomic chairs under $500 in 2026"
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
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap hidden sm:table-cell">Tier</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Product</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap hidden md:table-cell">Lumbar</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap hidden md:table-cell">Armrests</th>
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
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell whitespace-nowrap">
                      {row.priceTag}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.lumbar}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.armrests}
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

        {/* The Price Ladder */}
        <section className="mb-12 scroll-mt-20" id="price-ladder">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            The Price Ladder
          </h2>
          <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
            Each $100 increment in this category buys a specific set of ergonomic
            features - not just brand prestige. Here is what each tier actually
            delivers:
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Tier</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Price Range</th>
                  <th className="text-left px-4 py-3 font-semibold">What You Get</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap hidden sm:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    tier: "Tier 1",
                    range: "$130-$200",
                    gets: "Mesh back or full mesh, basic to 2D lumbar, 2D-3D armrests, height adjustment",
                    bestFor: "Part-time use, 3-5 hrs/day, first ergonomic chair",
                  },
                  {
                    tier: "Tier 2",
                    range: "$200-$280",
                    gets: "Dynamic auto-adjust lumbar or 4D lumbar, memory foam options, 3D-4D armrests, 135-155 deg recline",
                    bestFor: "Full-time use, 6-8 hrs/day, posture-focused buyers",
                  },
                  {
                    tier: "Tier 3",
                    range: "$250-$400",
                    gets: "BIFMA commercial certification, furniture-grade aesthetics, 7-year warranty, wide seat options",
                    bestFor: "Commercial durability, home office visibility, warranty priority",
                  },
                  {
                    tier: "Tier 4",
                    range: "$400-$500",
                    gets: "5D armrests with lateral slide, forward seat tilt, adjustable seat depth, aluminum base, 14 adjustment points",
                    bestFor: "8+ hrs/day, non-standard proportions, maximum adjustability",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-bold text-ink text-xs whitespace-nowrap">
                      {row.tier}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">
                      {row.range}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.gets}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Before You Buy */}
        <section className="mb-12 scroll-mt-20" id="before-you-buy">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Buy: Features That Matter
          </h2>

          <h3 className="text-lg font-bold text-ink mb-3">
            Forward Seat Tilt - What It Is and Why It Matters
          </h3>
          <p className="text-sm text-ink-secondary mb-4 leading-relaxed">
            Forward seat tilt angles the seat pan so the front drops slightly
            lower than the back. This opens the hip angle beyond 90 degrees,
            reduces compression on the lumbar discs, and shifts weight forward
            onto the thighs. Only one chair in this guide has it - the Branch Pro.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Seat Position</th>
                  <th className="text-left px-4 py-3 font-semibold">Hip Angle</th>
                  <th className="text-left px-4 py-3 font-semibold">Lumbar Load</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    position: "Standard flat seat",
                    hip: "90 deg",
                    load: "Moderate",
                    bestFor: "General office work",
                  },
                  {
                    position: "Reclined (seat locked back)",
                    hip: "100-130 deg",
                    load: "Lower - weight shifts to back",
                    bestFor: "Reading, passive tasks",
                  },
                  {
                    position: "Forward tilt (Branch Pro)",
                    hip: "100+ deg open",
                    load: "Lower - weight shifts to thighs",
                    bestFor: "Active typing, leaning forward tasks",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.position}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.hip}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.load}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-ink mb-3">
            Armrest Dimensions Explained: 2D Through 5D
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Dimension</th>
                  <th className="text-left px-4 py-3 font-semibold">What It Adjusts</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    dim: "Height (all 2D+)",
                    what: "Up and down",
                    why: "Elbow at 90 deg, shoulders relaxed",
                  },
                  {
                    dim: "Pivot (all 3D+)",
                    what: "Rotate pad inward/outward",
                    why: "Aligns with forearm angle",
                  },
                  {
                    dim: "Forward/back (4D+)",
                    what: "Slide pad toward or away from desk",
                    why: "Supports arms during close typing",
                  },
                  {
                    dim: "Width (4D+)",
                    what: "Move arms closer together or apart",
                    why: "Matches shoulder width",
                  },
                  {
                    dim: "Lateral slide (5D, Branch Pro only)",
                    what: "Shift pad left/right independently",
                    why: "Precise elbow support for narrow or wide shoulders",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs whitespace-nowrap">
                      {row.dim}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.what}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">BIFMA certification note:</strong> BIFMA
            5.1 is an independent commercial safety and durability standard tested
            to 250,000 tilt cycles and 100,000 seat drop cycles. Only the ELABEST
            in this guide carries this certification. It does not guarantee
            ergonomic quality - it guarantees that the chair will not fail under
            commercial daily use loads.
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
              Full Comparison
            </a>
            <a
              href="#faq"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              FAQ
            </a>
          </div>
        </nav>

        {/* Tier 1 */}
        <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight border-b border-border pb-3">
          Tier 1: $130-$200
        </h2>
        {tier1Products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Tier 2 */}
        <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight border-b border-border pb-3">
          Tier 2: $200-$280
        </h2>
        {tier2Products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Tier 3 */}
        <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight border-b border-border pb-3">
          Tier 3: $250-$400
        </h2>
        {tier3Products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Tier 4 */}
        <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight border-b border-border pb-3">
          Tier 4: $400-$500
        </h2>
        {tier4Products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Full Comparison Table */}
        <section id="comparison" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Full Comparison: All 10 Chairs
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
                      <a
                        href={`#${p.id}`}
                        className="font-bold text-brand hover:underline"
                      >
                        {p.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.lumbar}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">
                      {p.armrests}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">
                      {p.recline}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">
                      {p.capacity}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.seatType}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs whitespace-nowrap">
                      {p.warranty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Which Chair Is Right For You? */}
        <section className="mb-12 scroll-mt-20" id="decision-guide">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Which Chair Is Right For You?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Your Situation</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Best Pick</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    situation: "Part-time use, under 4 hrs/day, tight budget",
                    pick: "TRALT (~$130-$180)",
                    reason: "Lifetime warranty, all-mesh, lowest cost",
                  },
                  {
                    situation: "Full-time use, prefer foam over mesh",
                    pick: "Marsail (~$150-$200)",
                    reason: "3D armrests, 2D lumbar, high-density foam at Tier 1",
                  },
                  {
                    situation: "Full-time use, prefer mesh, warm climate",
                    pick: "Sihoo M57 (~$150-$200)",
                    reason: "Full mesh back + seat, 3D armrests, 2D lumbar, 3-year warranty",
                  },
                  {
                    situation: "Hard floors, prefer foam, want most recline",
                    pick: "Duramont (~$200-$270)",
                    reason: "4D lumbar, 155 deg recline, rollerblade wheels, memory foam",
                  },
                  {
                    situation: "Best lumbar tech under $300, 6-8 hrs/day",
                    pick: "Sihoo Doro C300 (~$200-$280)",
                    reason: "Dynamic auto-adjust lumbar, 330 lb, 3-year warranty",
                  },
                  {
                    situation: "White or distinctive aesthetic, home office video calls",
                    pick: "HOLLUDLE (~$200-$280)",
                    reason: "V-back design, white colorway, 3D lumbar with tilt",
                  },
                  {
                    situation: "Commercial use or durability certification required",
                    pick: "ELABEST (~$250-$350)",
                    reason: "BIFMA 5.1 certified, wide seat pan, commercial-grade build",
                  },
                  {
                    situation: "Best aesthetics, 7-year warranty, 5-7 hrs/day",
                    pick: "Branch Ergonomic (~$349-$389)",
                    reason: "Furniture-grade appearance, Sand/White colorways, 7-year warranty",
                  },
                  {
                    situation: "8+ hrs/day, non-standard proportions, maximum adjustability",
                    pick: "Branch Pro (~$449-$499)",
                    reason: "5D armrests, forward seat tilt, adjustable seat depth, aluminum base",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-ink text-xs font-medium">
                      {row.situation}
                    </td>
                    <td className="px-4 py-3 text-brand text-xs font-bold whitespace-nowrap">
                      {row.pick}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Branch Pro vs C300 */}
        <section className="mb-12 scroll-mt-20" id="branch-pro-vs-c300">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Is the Branch Pro Worth $200 More Than the C300?
          </h2>
          <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
            The Sihoo Doro C300 at $200-$280 and the Branch Pro at $449-$499
            are both strong picks - but they optimize for different things.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Sihoo C300 ($200-$280)</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Branch Pro ($449-$499)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Lumbar",
                    c300: "Dynamic auto-adjust (weight-sensing)",
                    pro: "2D padded (manual height + depth)",
                  },
                  {
                    feature: "Armrests",
                    c300: "3D",
                    pro: "5D with lateral slide",
                  },
                  {
                    feature: "Seat depth",
                    c300: "Fixed",
                    pro: "Adjustable 16.7\" to 19.7\"",
                  },
                  {
                    feature: "Forward seat tilt",
                    c300: "No",
                    pro: "Yes",
                  },
                  {
                    feature: "Base",
                    c300: "Nylon",
                    pro: "Aluminum alloy",
                  },
                  {
                    feature: "Warranty",
                    c300: "3 years",
                    pro: "7 years",
                  },
                  {
                    feature: "Capacity",
                    c300: "330 lb",
                    pro: "300 lb",
                  },
                  {
                    feature: "Best for",
                    c300: "Best-in-class lumbar auto-adjustment, daily posture shifts",
                    pro: "Non-standard proportions, 8+ hrs, seat depth adjustment",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.c300}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">Verdict:</strong> Buy the C300 if your
            main issue is lumbar discomfort that shifts through the day - its
            dynamic auto-adjust is strictly better than the Branch Pro&apos;s
            manual pad. Buy the Branch Pro if your main issue is arm positioning
            (shoulders, elbows) or if you have never found a chair that fits
            your proportions - the seat depth and 5D armrests address those
            problems directly.
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
          style={{
            background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Browse ergonomic chairs on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Mesh, foam, and commercial options across every
            budget tier.
          </p>
          <a
            href="https://www.amazon.com/s?k=ergonomic+chair&tag=theofficejournal-20"
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
