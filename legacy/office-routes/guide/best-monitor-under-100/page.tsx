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
  type BudgetMonitor,
} from "@/data/guides/best-monitor-under-100";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-monitor-under-100",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: BudgetMonitor }) {
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
                {product.panelType}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.sizeInches}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.resolution}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                  product.refreshHz >= 144
                    ? "bg-green-100 text-green-700 font-bold"
                    : product.refreshHz >= 100
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "bg-gray-100 text-ink-secondary"
                }`}
              >
                {product.refreshHz}Hz
              </span>
              {product.speakers && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
                  Speakers
                </span>
              )}
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

export default async function BestMonitorUnder100Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-18",
    dateModified: "2026-06-18",
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
      "@id": `${SITE_URL}/guide/best-monitor-under-100`,
    },
    about: [
      { "@type": "Thing", name: "Budget Monitor" },
      { "@type": "Thing", name: "Monitor Under $100" },
      { "@type": "Thing", name: "IPS Monitor" },
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
        name: "Best Monitors Under $100",
        item: `${SITE_URL}/guide/best-monitor-under-100`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Monitors Under $100 in 2026",
    description:
      "7 monitors under $100 in 2026: IPS, VA curved, 1440p, and 180Hz picks. Philips, LG, Sceptre, Sansui, KTC, AOC compared for desk, dorm and gaming.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-monitor-under-100#${p.id}`,
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
          <span className="text-ink">Best Monitors Under $100</span>
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
            Finding a good monitor under $100 used to mean accepting a TN panel,
            60Hz, and washed-out colors. In 2026, IPS panels are the default at
            this price, refresh rates of 100 to 180Hz are standard, and one pick
            delivers 1440p at under $100. This guide covers seven monitors under
            $100 organized by use case: best value, best brand IPS, best curved
            for movies, best gaming refresh rate, best 1440p, best frameless
            design, and best with built-in speakers.
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
              7 picks evaluated: IPS, VA curved, 1440p, and 180Hz
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
            alt="Best monitors under $100 in 2026"
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
                    Panel
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Resolution
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Refresh
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Speakers
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
                      {row.panelType}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.resolution}
                    </td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell">
                      <span
                        className={
                          row.refreshHz >= 144
                            ? "text-green-700 font-bold"
                            : row.refreshHz >= 100
                            ? "text-blue-700 font-semibold"
                            : "text-ink-muted"
                        }
                      >
                        {row.refreshHz}Hz
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell">
                      <span
                        className={
                          row.speakers
                            ? "text-green-700 font-bold"
                            : "text-ink-muted"
                        }
                      >
                        {row.speakers ? "Yes" : "No"}
                      </span>
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
            Finding a good monitor under $100 used to mean accepting a TN panel,
            60Hz, and washed-out colors. In 2026, IPS panels are the default at
            this price, refresh rates of 100 to 180Hz are standard, and one pick
            delivers 1440p at under $100.
          </p>
          <p>
            This guide covers seven monitors under $100 organized by use case.
            If your desk space is the bottleneck, see our guide on{" "}
            <Link prefetch={false}
              href="/guide/monitor-stands-small-desks"
              className="text-brand hover:underline"
            >
              monitor stands
            </Link>{" "}
            for small desks, or browse our full{" "}
            <Link prefetch={false}
              href="/guide/desk-setup-essentials"
              className="text-brand hover:underline"
            >
              desk setup
            </Link>{" "}
            guide for the complete picture.
          </p>
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Buy: Key Decisions
          </h2>

          {/* Panel Type */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Panel Type: IPS vs VA
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">IPS</th>
                    <th className="text-left px-4 py-3 font-semibold">
                      VA Curved
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Contrast ratio",
                      ips: "1000:1",
                      va: "3000:1",
                    },
                    {
                      feature: "Viewing angles",
                      ips: "178 degrees, no shift",
                      va: "Narrower, color shifts off-axis",
                    },
                    {
                      feature: "Color accuracy",
                      ips: "99% sRGB, excellent",
                      va: "Good, not as consistent",
                    },
                    {
                      feature: "Response time",
                      ips: "Faster, less ghosting",
                      va: "Slower, visible in fast games",
                    },
                    {
                      feature: "Best for",
                      ips: "Studying, productivity, gaming",
                      va: "Movies, dark scenes, immersive gaming",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.ips}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.va}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary">
              Six of seven picks in this guide use IPS panels. Choose VA (the
              Sceptre C248W) only if movies and dark-scene gaming are your
              primary use case.
            </p>
          </div>

          {/* Size */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Size: 21-22 inch vs 24 inch
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Size</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Typical Width
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Depth Needed
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Best for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      size: "21.5 inch (Philips 221V8LB)",
                      width: "~49 cm",
                      depth: "~50 cm minimum",
                      best: "Tight desks under 60cm wide",
                    },
                    {
                      size: "24 inch (all other picks)",
                      width: "~54 cm",
                      depth: "~60 cm recommended",
                      best: "Standard dorm and home office desks",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.size}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.width}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.depth}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.best}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resolution */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Resolution: 1080p vs 1440p
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">1080p (1920x1080)</strong> at 24
              inches produces 92 PPI. Adequate for most tasks and supported by
              every GPU including integrated graphics.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">1440p (2560x1440)</strong> at 24
              inches produces 123 PPI. The step up in text sharpness is
              immediately visible for code, PDFs, and spreadsheets. Requires a
              dedicated GPU or a modern integrated GPU that supports 1440p
              output. The KTC H24T27 is the only 1440p pick in this guide.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Verify before buying 1440p:</strong>{" "}
              Check that your laptop or desktop GPU supports 2560x1440 output
              and that the KTC H24T27 price is currently at or below $100. The
              price fluctuates.
            </div>
          </div>

          {/* Refresh Rate */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Refresh Rate: 75Hz vs 100Hz vs 180Hz
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">75Hz</strong> is the baseline. Fine
              for studying, documents, and video. AOC 24B2XH and both Sceptre
              models are 75Hz.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">100Hz</strong> is noticeably smoother
              for everything including desktop navigation, scrolling, and casual
              gaming. The Philips 221V8LB and LG 24MR400-B deliver 100Hz at $70
              to $100. This is the sweet spot for most buyers.
            </p>
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">180Hz</strong> is exclusively for
              competitive gaming. The Sansui ES-G24F4 is the only 180Hz pick in
              this guide. The improvement over 100Hz is only meaningful in fast
              FPS and battle royale games.
            </p>
          </div>

          {/* What you cannot expect */}
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            What You Cannot Expect Under $100
          </h2>
          <div className="mb-8 space-y-2">
            {[
              {
                label: "USB-C input",
                note: "Starts at $120 to $150. No monitor in this guide has USB-C.",
              },
              {
                label: "Height-adjustable stand",
                note: "All picks have tilt-only stands. Add a monitor arm for $25 to $30 to solve this.",
              },
              {
                label: "4K resolution",
                note: "4K at 24 inches starts at $150 or more. Not available under $100.",
              },
              {
                label: "Meaningful HDR brightness",
                note: "HDR10 support on the KTC H24T27 is present but limited to 300 nits. True HDR performance requires 600+ nits.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-border"
              >
                <span className="mt-0.5 w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  !
                </span>
                <p className="text-sm text-ink-secondary">
                  <strong className="text-ink">{item.label}:</strong> {item.note}
                </p>
              </div>
            ))}
          </div>

          {/* Decision flowchart */}
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Decision Flowchart
          </h2>
          <div className="mb-8 rounded-xl border border-border bg-white overflow-hidden">
            <div className="p-4 bg-brand/5 border-b border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Use case decision tree
              </p>
            </div>
            <pre className="p-5 text-xs text-ink-secondary leading-relaxed overflow-x-auto font-mono whitespace-pre">
{`Tight budget ($70)?
  YES -> Philips 221V8LB (best value + 4-year warranty)

Standard 24-inch + proven brand?
  YES -> LG 24MR400-B (LG IPS, 100Hz, FreeSync)

Movies and dark scenes are primary use?
  YES -> Sceptre C248W-1920RN (VA 3000:1 contrast, 1500R curve, speakers)

Competitive gaming is priority?
  YES -> Sansui ES-G24F4 (180Hz, 1ms GtG)

GPU supports 1440p AND price is at or below $100?
  YES -> KTC H24T27 (sharpest text, 123 PPI)

Want frameless design for dual monitor or clean desk?
  YES -> AOC 24B2XH (ultra-slim 3-sided frame)

No speakers elsewhere on desk?
  YES -> Sceptre E248W-19203R (built-in speakers, 2x HDMI)`}
            </pre>
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
          7 Best Monitors Under $100
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

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
                context: "Best value + warranty",
                id: "philips-221v8lb",
                name: "Philips 221V8LB",
                verdict:
                  ": $70, 100Hz IPS, and a 4-year advance replacement warranty that no competitor matches at this price.",
              },
              {
                context: "Best brand IPS color",
                id: "lg-24mr400-b",
                name: "LG 24MR400-B",
                verdict:
                  ": LG's proven IPS panel with 99% sRGB, 100Hz FreeSync, and OnScreen Control software at $85 to $100.",
              },
              {
                context: "Best for movies",
                id: "sceptre-c248w-curved",
                name: "Sceptre C248W-1920RN",
                verdict:
                  ": VA 3000:1 contrast, 1500R curvature, and built-in speakers for immersive movie watching.",
              },
              {
                context: "Best for gaming",
                id: "sansui-es-g24f4",
                name: "Sansui ES-G24F4",
                verdict:
                  ": 180Hz IPS with 1ms GtG, the fastest monitor in this guide at $99.",
              },
              {
                context: "Best 1440p value",
                id: "ktc-h24t27",
                name: "KTC H24T27",
                verdict:
                  ": 2560x1440 at 24 inches for under $100 when the price is right. Verify before buying.",
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
            Browse monitors under $100 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. IPS, VA curved, 1080p and 1440p options
            compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=monitor+under+100&tag=theofficejournal-20"
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
