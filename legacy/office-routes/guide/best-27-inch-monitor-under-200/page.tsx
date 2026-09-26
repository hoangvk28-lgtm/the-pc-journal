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
  type Monitor27Under200,
} from "@/data/guides/best-27-inch-monitor-under-200";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-27-inch-monitor-under-200",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: Monitor27Under200 }) {
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
                {product.resolution}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.refresh}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Panel: {product.panelType}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Color: {product.colorGamut}
              </span>
            </div>
            <div className="text-xs text-ink-secondary">
              <span className="font-semibold text-ink">Connectivity:</span>{" "}
              {product.connectivity}
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

export default async function Best27InchMonitorUnder200Page() {
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
      "@id": `${SITE_URL}/guide/best-27-inch-monitor-under-200`,
    },
    about: [
      { "@type": "Thing", name: "27-Inch Monitors Under $200" },
      { "@type": "Thing", name: "1440p Gaming Monitors" },
      { "@type": "Thing", name: "Home Office Monitors" },
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
        name: "Best 27-Inch Monitor Under $200",
        item: `${SITE_URL}/guide/best-27-inch-monitor-under-200`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best 27-Inch Monitor Under $200 in 2026",
    description:
      "6 best 27-inch monitors under $200 in 2026 for work and gaming.",
    numberOfItems: 8,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-27-inch-monitor-under-200#${p.id}`,
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
          <span className="text-ink">Best 27-Inch Monitor Under $200</span>
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
            Six 27-inch monitors under $200 covering every use case: 1440p
            gaming at 170-210Hz, MacBook USB-C connectivity, 1080p for older
            GPUs, and budget office picks from LG and Samsung. The right choice
            depends on your GPU, how you use the screen, and whether you need
            a proper ergonomic stand.
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
              6 picks evaluated across 1440p, 1080p, gaming, and productivity
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best 27-inch monitor under $200 in 2026"
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
                    Resolution
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Refresh
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Color
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
                      {row.resolution}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.refresh}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.colorGamut}
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
            In 2026, a 27-inch monitor under $200 can deliver 1440p resolution
            at 170-210Hz - specs that required $300+ two years ago. The
            meaningful decision is no longer what you can get at this price, but
            which configuration fits your actual GPU, workflow, and desk setup.
          </p>
          <p>
            For desk setup context, see the{" "}
            <Link prefetch={false}
              href="/guide/best-monitor-arm-under-100"
              className="text-brand hover:underline"
            >
              best monitor arm under $100
            </Link>{" "}
            guide if you want to free up desk space, or the{" "}
            <Link prefetch={false}
              href="/guide/best-standing-desk-under-200"
              className="text-brand hover:underline"
            >
              best standing desk under $200
            </Link>{" "}
            guide to complete a full ergonomic setup.
          </p>
        </section>

        {/* 1080p vs 1440p section */}
        <section className="mb-12 scroll-mt-20" id="resolution-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            The Key Decision: 1080p vs 1440p at 27 Inches
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-semibold">
                    1080p at 27&quot;
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    1440p at 27&quot;
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    factor: "Pixel density",
                    p1080: "82 PPI",
                    p1440: "109 PPI",
                  },
                  {
                    factor: "Text sharpness",
                    p1080: "Noticeably softer at desk distance",
                    p1440: "Sharp and clear",
                  },
                  {
                    factor: "GPU requirement",
                    p1080: "GTX 1060 / RX 580 or newer",
                    p1440: "RTX 3060 / RX 6600 recommended",
                  },
                  {
                    factor: "Gaming at target fps",
                    p1080: "Easier on older hardware",
                    p1440: "Needs modern GPU for high fps",
                  },
                  {
                    factor: "Price",
                    p1080: "~$100-160",
                    p1440: "~$150-200",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.factor}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.p1080}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.p1440}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 text-sm text-ink-secondary leading-relaxed">
            <p>
              At 27 inches, 1440p is 109 PPI vs 82 PPI at 1080p. The difference
              in text sharpness is visible at normal viewing distance - browsers,
              spreadsheets, and code editors are meaningfully crisper. For most
              users who split time between documents and gaming, 1440p is the
              right call at this screen size.
            </p>
            <p>
              The GPU threshold is RTX 3060 or RX 6600 for comfortable 1440p
              gaming at 100fps+. If your GPU is GTX 1060 or RX 580 class, 1080p
              at 165Hz lets the hardware do what it is actually capable of.
              Integrated graphics users (Intel Iris, AMD Radeon integrated) should
              stick to 1080p at 75-100Hz.
            </p>
          </div>
        </section>

        {/* Before You Buy */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Buy: 3 Quick Checks
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              1. What is your GPU?
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              GTX 1060 or RX 580 and older: go 1080p. You will hit 120-165fps at
              1080p but struggle to maintain 60fps at 1440p in demanding games.
              RTX 3060 or RX 6600 and newer: 1440p is the right resolution. Your
              GPU has headroom for 1440p at high settings and your frame rates
              will still push toward the monitor&apos;s refresh. Integrated
              graphics (Intel Iris, AMD Vega): 1080p at 75-100Hz is the correct
              target.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              2. What is your primary use?
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Pure productivity with occasional video: a 1080p 100Hz monitor at
              $120-150 is sufficient. Gaming first: match resolution to your GPU
              as above, and prioritize response time and refresh rate. Mixed work
              and gaming every day: the 1440p picks handle both without
              compromise, and the MSI G274QPF-QD adds a proper ergonomic stand
              for desk sessions.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              3. Do you need a monitor arm?
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Four of the six monitors in this guide have tilt-only stands with
              no height adjustment. For desk sessions over two hours, proper
              monitor height reduces neck and shoulder fatigue significantly.
              A monitor arm also reclaims 8-10 inches of desk depth that the
              stand would otherwise occupy. See the{" "}
              <Link prefetch={false}
                href="/guide/best-monitor-arm-under-100"
                className="text-brand hover:underline"
              >
                best monitor arm under $100
              </Link>{" "}
              guide for options starting at $29.
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
          6 Best 27-Inch Monitors Under $200
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Full comparison table */}
        <section className="mb-14 scroll-mt-20" id="comparison">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Full Comparison: All 6 Monitors
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Monitor</th>
                  <th className="text-left px-4 py-3 font-semibold">Resolution</th>
                  <th className="text-left px-4 py-3 font-semibold">Refresh</th>
                  <th className="text-left px-4 py-3 font-semibold">Panel</th>
                  <th className="text-left px-4 py-3 font-semibold">Color</th>
                  <th className="text-left px-4 py-3 font-semibold">USB-C</th>
                  <th className="text-left px-4 py-3 font-semibold">Height Adj</th>
                  <th className="text-left px-4 py-3 font-semibold">Speakers</th>
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
                      {p.resolution}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.refresh}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.panelType}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {p.colorGamut}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {p.id === "msi-g274qpf-qd" ? (
                        <span className="text-green-700 font-semibold">Yes</span>
                      ) : (
                        <span className="text-ink-muted">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {p.id === "msi-g274qpf-qd" || p.id === "ktc-h27t22c3" ? (
                        <span className="text-green-700 font-semibold">Yes</span>
                      ) : (
                        <span className="text-ink-muted">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {p.id === "ktc-h27t22c3" ? (
                        <span className="text-green-700 font-semibold">Yes</span>
                      ) : p.id === "acer-vg271u-m3" ? (
                        <span className="text-ink-secondary">2W</span>
                      ) : (
                        <span className="text-ink-muted">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Use Case */}
        <section className="mb-14 scroll-mt-20" id="use-case">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            By Use Case: Which Monitor to Buy
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Use Case</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    use: "Hybrid work and gaming",
                    pick: "MSI G274QPF-QD",
                    why: "1440p + USB-C + height-adjustable stand covers both modes",
                  },
                  {
                    use: "Gaming with RTX 3060+",
                    pick: "Acer Nitro VG271U M3",
                    why: "1440p 180Hz at the best price in this guide",
                  },
                  {
                    use: "Competitive max fps",
                    pick: "KTC H27T22C-3",
                    why: "210Hz OC is the highest here, dual DP 1.4 for two-PC setups",
                  },
                  {
                    use: "Office productivity",
                    pick: "LG 27MR400-B",
                    why: "Reader Mode, OnScreen Control, 99% sRGB for document work",
                  },
                  {
                    use: "Gaming with older GPU",
                    pick: "Samsung Odyssey G30D",
                    why: "1080p 165Hz lets GTX 1060-1080 and RX 580-6600 hit target frame rates",
                  },
                  {
                    use: "Second monitor - tightest budget",
                    pick: "LG 27MP400-B",
                    why: "Lowest price for LG IPS quality, 99% sRGB",
                  },
                  {
                    use: "MacBook user",
                    pick: "MSI G274QPF-QD",
                    why: "Only USB-C pick in the guide - single cable for video, data, and charging",
                  },
                  {
                    use: "Hobbyist photo editing",
                    pick: "MSI G274QPF-QD or Acer VG271U M3",
                    why: "Both deliver 95% DCI-P3 at this price range",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.use}
                    </td>
                    <td className="px-4 py-3 text-brand text-xs font-bold">
                      {row.pick}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.why}
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
            Browse 27-inch monitors under $200 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. 1080p and 1440p IPS options compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=27+inch+monitor+under+200&tag=theofficejournal-20"
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
