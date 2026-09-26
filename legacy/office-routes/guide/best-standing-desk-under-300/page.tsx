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
  type StandingDesk300,
} from "@/data/guides/best-standing-desk-under-300";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-standing-desk-under-300",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: StandingDesk300 }) {
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

export default async function BestStandingDeskUnder300Page() {
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
      "@id": `${SITE_URL}/guide/best-standing-desk-under-300`,
    },
    about: [
      { "@type": "Thing", name: "Standing Desks Under $300" },
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
        name: "Best Standing Desk Under $300",
        item: `${SITE_URL}/guide/best-standing-desk-under-300`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Standing Desk Under $300 in 2026",
    description:
      "7 standing desks under $300 in 2026 across dual motor, compact, and small apartment categories.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-standing-desk-under-300#${p.id}`,
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
          <span className="text-ink">Best Standing Desk Under $300</span>
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
            The $300 ceiling is where electric standing desks become genuinely
            useful. Dual-motor stability, 176 lb capacity, anti-collision
            sensors, and 5-year warranties all appear under this threshold. This
            guide covers seven desks - from the $120 FlexiSpot EC1 frame for
            IKEA pairings to the Vari Essential with commercial-grade build
            quality. Whether you need a 55-inch surface for dual monitors or a
            compact 48x24 for a dorm room, there is a specific pick here.
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
              7 picks evaluated across single motor, dual motor, and frame-only options
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best standing desk under $300 in 2026"
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
            The standing desk market under $300 in 2026 splits into three
            distinct tiers: bare frames for custom tops (FlexiSpot EC1 from
            $120), standard complete desks with single motors ($150-$270), and
            premium-spec desks with dual motors or long warranties ($250-$299).
            Each tier serves a different buyer. This guide identifies the best
            option in each category so you are not overpaying for features you
            do not need.
          </p>
          <p>
            If you need a more refined setup with advanced features, see our{" "}
            <Link prefetch={false}
              href="/guide/best-standing-desk-under-500"
              className="text-brand hover:underline"
            >
              best standing desk under $500
            </Link>{" "}
            guide. For the rest of your workspace, we also cover the best{" "}
            <Link prefetch={false}
              href="/guide/best-ergonomic-chair-under-300"
              className="text-brand hover:underline"
            >
              ergonomic chair
            </Link>{" "}
            under $300 and a full{" "}
            <Link prefetch={false}
              href="/guide/ergonomic-desk-setup"
              className="text-brand hover:underline"
            >
              ergonomic desk setup
            </Link>{" "}
            guide.
          </p>
        </section>

        {/* Before You Buy */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Buy: What Actually Matters Under $300
          </h2>

          {/* Single vs Dual Motor */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Single Motor vs Dual Motor
            </h3>
            <p className="text-sm text-ink-secondary mb-4">
              Most desks under $300 use a single motor driving both legs through
              a crossbar. Dual-motor desks have one motor per leg. The practical
              difference is lateral stability at maximum standing height -
              single-motor desks can develop a racking twist over time,
              especially under heavy monitor loads.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 font-semibold">Single Motor</th>
                    <th className="text-left px-4 py-3 font-semibold">Dual Motor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      factor: "Lateral stability at max height",
                      single: "Moderate - some wobble under load",
                      dual: "High - independent leg control",
                    },
                    {
                      factor: "Noise during adjustment",
                      single: "50-65dB typical",
                      dual: "Under 50dB (Fezibo dual motor)",
                    },
                    {
                      factor: "Long-term racking risk",
                      single: "Higher with heavy setups",
                      dual: "Lower - each leg self-corrects",
                    },
                    {
                      factor: "Price premium",
                      single: "Base price tier",
                      dual: "$50-$100 more in this price range",
                    },
                    {
                      factor: "Best for",
                      single: "Single monitor, light loads",
                      dual: "Dual monitors, typing-heavy work",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.factor}
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
          </div>

          {/* Height Range by User Height */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Height Range by User Height
            </h3>
            <p className="text-sm text-ink-secondary mb-4">
              Standing desk ergonomics require your elbows at roughly 90 degrees
              when standing. A desk that cannot reach your ideal standing height
              forces you into a hunched posture, defeating the purpose.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">User Height</th>
                    <th className="text-left px-4 py-3 font-semibold">Sitting Height</th>
                    <th className="text-left px-4 py-3 font-semibold">Standing Height</th>
                    <th className="text-left px-4 py-3 font-semibold">Desks That Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      userHeight: "5'0\" - 5'4\"",
                      sitting: "~24-25\"",
                      standing: "~37-39\"",
                      fits: "All 7 desks",
                    },
                    {
                      userHeight: "5'5\" - 5'9\"",
                      sitting: "~25-27\"",
                      standing: "~39-42\"",
                      fits: "All 7 desks",
                    },
                    {
                      userHeight: "5'10\" - 6'0\"",
                      sitting: "~27-28\"",
                      standing: "~42-44\"",
                      fits: "EN1, VIVO, Fezibo dual, EC1, Vari Essential",
                    },
                    {
                      userHeight: "6'1\" - 6'2\"",
                      sitting: "~28-29\"",
                      standing: "~44-46\"",
                      fits: "VIVO 55x24 (48.4\"), EC1 frame (47.6\"), Vari Essential (47.2\")",
                    },
                    {
                      userHeight: "6'3\"+",
                      sitting: "~29-30\"",
                      standing: "~46\"+",
                      fits: "VIVO 55x24 only (48.4\" max)",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.userHeight}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.sitting}
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
          </div>

          {/* Desktop Size Guide */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Desktop Size Guide
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Setup Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Recommended Size</th>
                    <th className="text-left px-4 py-3 font-semibold">Best Desk Here</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      setup: "Single monitor, laptop, minimal peripherals",
                      size: "48x24\"",
                      best: "FlexiSpot EN1 or Fezibo dual motor",
                    },
                    {
                      setup: "Dual monitors or ultrawide",
                      size: "55x24\" or wider",
                      best: "VIVO Electric 55x24",
                    },
                    {
                      setup: "Custom top (IKEA or own surface)",
                      size: "43-83\" wide",
                      best: "FlexiSpot EC1 frame",
                    },
                    {
                      setup: "Small apartment / dorm room",
                      size: "48x24\" (standard wall fit)",
                      best: "FlexiSpot EN1 or SHW with drawer",
                    },
                    {
                      setup: "Needs built-in storage",
                      size: "48x24\" with drawers",
                      best: "Fezibo double drawer or SHW drawer",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.setup}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.size}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.best}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Quick note:</strong> Pairing a
              standing desk with a{" "}
              <Link prefetch={false}
                href="/guide/best-monitor-under-100"
                className="text-brand hover:underline"
              >
                monitor under $100
              </Link>{" "}
              and a{" "}
              <Link prefetch={false}
                href="/guide/best-compact-keyboard-under-50"
                className="text-brand hover:underline"
              >
                compact keyboard
              </Link>{" "}
              keeps the total setup cost under $500.
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
          7 Best Standing Desks Under $300
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Side-by-side comparison table */}
        <section className="mb-14 scroll-mt-20" id="comparison">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Full Comparison: All 7 Desks
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
                      {p.warranty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Which desk is right for you */}
        <section className="mb-14 scroll-mt-20" id="decision-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Which Standing Desk Is Right for You?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">If You Need...</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    need: "Best all-around value under $250",
                    pick: "FlexiSpot EN1",
                    why: "One-piece top, 176 lb capacity, 4 presets, 2-year warranty",
                  },
                  {
                    need: "Dual monitors or widest surface",
                    pick: "VIVO 55x24",
                    why: "55\" wide, 48.4\" max height, 3-year warranty",
                  },
                  {
                    need: "Best stability / dual motor",
                    pick: "Fezibo Dual Motor",
                    why: "Only dual-motor desk under $275, less wobble at standing height",
                  },
                  {
                    need: "Built-in storage for small rooms",
                    pick: "SHW 48\" with Drawer",
                    why: "Drawer + cable tray included, digital height display",
                  },
                  {
                    need: "IKEA top or custom surface",
                    pick: "FlexiSpot EC1 Frame",
                    why: "Fits 43-83\" tops, lowest entry price, 47.6\" max height",
                  },
                  {
                    need: "Longest warranty / best build quality",
                    pick: "Vari Essential",
                    why: "5-year warranty, commercial T-frame, tool-free assembly",
                  },
                  {
                    need: "Most storage, small apartment",
                    pick: "Fezibo Double Drawer + Shelf",
                    why: "2 drawers + shelf replaces a separate drawer unit",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.need}
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

        {/* Heights by user height guidance */}
        <section className="mb-14 scroll-mt-20" id="height-guidance">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Standing Desk Heights by User Height
          </h2>
          <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
            Ergonomic standing posture requires elbows at roughly 90-100 degrees
            with shoulders relaxed. Use the table below to confirm a desk
            reaches your standing height before purchasing. Heights are
            approximate - footwear adds 0.5-1 inch.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">User Height</th>
                  <th className="text-left px-4 py-3 font-semibold">Ideal Standing Desk Height</th>
                  <th className="text-left px-4 py-3 font-semibold">Desks in This Guide That Reach It</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    height: "5'0\"",
                    ideal: "~36-38\"",
                    desks: "All 7 desks",
                  },
                  {
                    height: "5'4\"",
                    ideal: "~38-40\"",
                    desks: "All 7 desks",
                  },
                  {
                    height: "5'8\"",
                    ideal: "~40-42\"",
                    desks: "All 7 desks",
                  },
                  {
                    height: "5'10\"",
                    ideal: "~42-44\"",
                    desks: "EN1, VIVO, Fezibo dual, EC1, Vari Essential",
                  },
                  {
                    height: "6'0\"",
                    ideal: "~43-45\"",
                    desks: "EN1 (46.5\"), VIVO (48.4\"), EC1 (47.6\"), Vari (47.2\")",
                  },
                  {
                    height: "6'2\"",
                    ideal: "~45-47\"",
                    desks: "VIVO (48.4\"), EC1 (47.6\"), Vari Essential (47.2\")",
                  },
                  {
                    height: "6'4\"",
                    ideal: "~47\"+",
                    desks: "VIVO only (48.4\" max)",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.height}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.ideal}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.desks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What you cannot expect */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">
            What You Cannot Expect Under $300
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Keypad programmable profiles",
                detail:
                  "Memory presets (up to 4) are standard. Full keypad apps or Bluetooth sync to standing time goals appear at $400+.",
              },
              {
                label: "Commercial-grade weight capacity",
                detail:
                  "Most desks here cap at 154-176 lb. Professional-grade frames handling 250+ lb start at $350-$500.",
              },
              {
                label: "Seamless top on dual-motor desks",
                detail:
                  "The only dual-motor desk in this guide (Fezibo) uses a splice-board two-piece top. One-piece tops on dual-motor desks appear at higher prices.",
              },
              {
                label: "Anti-glare or tempered glass tops",
                detail:
                  "All complete desks here use laminate surfaces. Tempered glass and bamboo tops are available at $300-$500.",
              },
              {
                label: "Wire management channels in the frame",
                detail:
                  "The SHW with drawer includes a cable tray. Integrated wire channels routed through the legs are uncommon under $300.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400 mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary">
                  <strong className="text-ink">{item.label}:</strong>{" "}
                  {item.detail}
                </p>
              </div>
            ))}
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
            Browse standing desks under $300 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Electric height-adjustable, single and dual
            motor options compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=standing+desk+under+300&tag=theofficejournal-20"
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
