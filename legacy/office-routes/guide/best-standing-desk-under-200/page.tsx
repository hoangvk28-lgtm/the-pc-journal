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
  type StandingDesk200,
} from "@/data/guides/best-standing-desk-under-200";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-standing-desk-under-200",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: StandingDesk200 }) {
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
                Motor: {product.motor}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.heightRange}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.capacity}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Warranty: {product.warranty}
              </span>
            </div>
            <div className="text-xs text-ink-secondary">
              <span className="font-semibold text-ink">Desktop:</span>{" "}
              {product.desktopSize}
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

export default async function BestStandingDeskUnder200Page() {
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
      "@id": `${SITE_URL}/guide/best-standing-desk-under-200`,
    },
    about: [
      { "@type": "Thing", name: "Standing Desks Under $200" },
      { "@type": "Thing", name: "Electric Height-Adjustable Desks" },
      { "@type": "Thing", name: "Home Office Desks" },
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
        name: "Best Electric Standing Desk Under $200",
        item: `${SITE_URL}/guide/best-standing-desk-under-200`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Electric Standing Desk Under $200 in 2026",
    description:
      "6 electric standing desks under $200 in 2026 for home office and small-space setups.",
    numberOfItems: 6,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-standing-desk-under-200#${p.id}`,
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
          <span className="text-ink">Best Electric Standing Desk Under $200</span>
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
            Under $200 is where electric standing desks become genuinely
            accessible. Every desk at this price uses a single motor and a
            2-stage column rather than the 3-stage found in $300+ models. The
            desktops are particle board or MDF rather than premium composite.
            These are real trade-offs - but they do not eliminate the core
            benefit: effortless height transitions throughout the day.
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
              6 picks evaluated across price, warranty, size, and accessories
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best electric standing desk under $200 in 2026"
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
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Height Range
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Capacity
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Desktop
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
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.heightRange}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.capacity}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {products[i].desktopSize}
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
            Under $200 is where electric standing desks become genuinely
            accessible. Every desk at this price uses a single motor and a
            2-stage column rather than the 3-stage found in $300+ models. The
            desktops are particle board or MDF rather than premium composite.
            These are real trade-offs - but they do not eliminate the core
            benefit: effortless height transitions throughout the day.
          </p>
          <p>
            If your setup involves two large monitors or you are over 6 feet 2
            inches, see our{" "}
            <Link prefetch={false}
              href="/guide/best-standing-desk-under-300"
              className="text-brand hover:underline"
            >
              best standing desk under $300
            </Link>{" "}
            guide for when upgrading makes sense. For ergonomic height guidance
            specific to your size, the{" "}
            <Link prefetch={false}
              href="/guide/standard-desk-height"
              className="text-brand hover:underline"
            >
              standard desk height guide
            </Link>{" "}
            walks through seated and standing positions by user height.
          </p>
        </section>

        {/* What $200 Gets You */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            What $200 Gets You (and What It Doesn&apos;t)
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-semibold">Under $200</th>
                  <th className="text-left px-4 py-3 font-semibold">Under $300</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    factor: "Motor type",
                    under200: "Single motor only",
                    under300: "Single or dual motor",
                  },
                  {
                    factor: "Column stages",
                    under200: "2-stage",
                    under300: "3-stage (most models)",
                  },
                  {
                    factor: "Max height",
                    under200: '45.5"-47.6"',
                    under300: '48"-50"+',
                  },
                  {
                    factor: "Desktop thickness",
                    under200: "0.75\"-1\" particle board / MDF",
                    under300: "1\"-1.1\" MDF or composite",
                  },
                  {
                    factor: "Wobble at standing height",
                    under200: "Noticeable at full extension",
                    under300: "Reduced, especially dual motor",
                  },
                  {
                    factor: "Warranty",
                    under200: "1-3 years",
                    under300: "2-5 years",
                  },
                  {
                    factor: "Price",
                    under200: "$100-200",
                    under300: "$200-300",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.factor}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.under200}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.under300}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink">Single motor wobble at max height.</strong>{" "}
              All single-motor 2-stage desks wobble when extended to full height.
              For a single 27-inch monitor this is generally not distracting. For
              two 32-inch or larger monitors the combined weight and leverage
              makes wobble more noticeable during typing.
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink">Height ceiling for users over 6&apos;1&quot;.</strong>{" "}
              Most under-$200 desks max out at 45.5-47.6 inches. Users over 6
              feet 1 inch may find the standing position slightly lower than
              ergonomics recommend at maximum extension.
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink">Desktop material.</strong>{" "}
              Particle board and MDF are standard at this price. Both are
              functional but scratch more easily than higher-end laminate. A
              desk pad covers this for most users.
            </p>
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
          6 Best Electric Standing Desks Under $200
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Full comparison table */}
        <section className="mb-14 scroll-mt-20" id="comparison">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Full Comparison: All 6 Desks
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Desk</th>
                  <th className="text-left px-4 py-3 font-semibold">Motor</th>
                  <th className="text-left px-4 py-3 font-semibold">Height Range</th>
                  <th className="text-left px-4 py-3 font-semibold">Capacity</th>
                  <th className="text-left px-4 py-3 font-semibold">Presets</th>
                  <th className="text-left px-4 py-3 font-semibold">Drawer</th>
                  <th className="text-left px-4 py-3 font-semibold">Warranty</th>
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
                      {p.motor}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.heightRange}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.capacity}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.presets}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.id === "shw-48x24-drawer" ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.warranty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Who Should Upgrade to $300 */}
        <section className="mb-14 scroll-mt-20" id="upgrade-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Who Should Upgrade to $300
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Situation</th>
                  <th className="text-left px-4 py-3 font-semibold">Under $200 fine</th>
                  <th className="text-left px-4 py-3 font-semibold">Upgrade to $300</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    situation: "Single 27\" monitor",
                    under200: "Yes",
                    upgrade: "Not necessary",
                  },
                  {
                    situation: "Dual monitors under 12 lbs each",
                    under200: "Yes",
                    upgrade: "Either works",
                  },
                  {
                    situation: "User over 6'2\"",
                    under200: "Borderline - check height table",
                    upgrade: "Yes, for 50\"+ max height",
                  },
                  {
                    situation: "Need 5yr+ warranty",
                    under200: "No",
                    upgrade: "Yes",
                  },
                  {
                    situation: "Heavy equipment over 120 lbs",
                    under200: "SHW borderline - others at 176 lbs fine",
                    upgrade: "Consider for dual motor stability",
                  },
                  {
                    situation: "Standing 4+ hours daily",
                    under200: "Acceptable",
                    upgrade: "Dual motor reduces wobble fatigue",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.situation}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.under200}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.upgrade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* By User Height */}
        <section className="mb-14 scroll-mt-20" id="height-guidance">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            By User Height: Which Desk Fits You
          </h2>
          <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
            Ergonomic standing posture requires elbows at roughly 90-100 degrees
            with shoulders relaxed. Use the table below to confirm a desk reaches
            your standing height before purchasing. Heights are approximate -
            footwear adds 0.5-1 inch.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">User Height</th>
                  <th className="text-left px-4 py-3 font-semibold">Seated Desk Height</th>
                  <th className="text-left px-4 py-3 font-semibold">Standing Desk Height</th>
                  <th className="text-left px-4 py-3 font-semibold">Fits in This Guide</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    userHeight: "5'0\" - 5'3\"",
                    seated: "~24-26\"",
                    standing: "~37-40\"",
                    fits: "All 6 desks - SMUG best for lowest seated height",
                  },
                  {
                    userHeight: "5'4\" - 5'7\"",
                    seated: "~26-27\"",
                    standing: "~39-42\"",
                    fits: "All 6 desks",
                  },
                  {
                    userHeight: "5'8\" - 5'11\"",
                    seated: "~27-29\"",
                    standing: "~42-45\"",
                    fits: "All 6 desks",
                  },
                  {
                    userHeight: "6'0\" - 6'1\"",
                    seated: "~29-30\"",
                    standing: "~44-46\"",
                    fits: "EN1 (47.6\"), Marsail (46.5\"), FEZIBO 48x24 (46.5\"), SMUG (46.9\")",
                  },
                  {
                    userHeight: "6'2\"+",
                    seated: "~30-31\"",
                    standing: "~46-48\"",
                    fits: "Under $200 may be insufficient - check $300 tier",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.userHeight}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.seated}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.standing}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.fits}
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

        {/* CTA */}
        <section
          className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Browse electric standing desks under $200 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Single motor electric height-adjustable desks
            for home office and small spaces.
          </p>
          <a
            href="https://www.amazon.com/s?k=electric+standing+desk+under+200&tag=theofficejournal-20"
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
