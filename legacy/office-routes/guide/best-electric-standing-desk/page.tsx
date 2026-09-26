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
  type ElectricDesk,
} from "@/data/guides/best-electric-standing-desk";

export const revalidate = 604800;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-electric-standing-desk",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: ElectricDesk }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">
                {product.size}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.heightRange}
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

export default async function BestElectricStandingDeskPage() {
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
      "@id": `${SITE_URL}/guide/best-electric-standing-desk`,
    },
    about: [
      { "@type": "Thing", name: "Electric Standing Desk" },
      { "@type": "Thing", name: "Motorized Desk" },
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
        name: "Best Electric Standing Desks",
        item: `${SITE_URL}/guide/best-electric-standing-desk`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Electric Standing Desks in 2026",
    description: metaDescription,
    numberOfItems: products.length,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name} - ${p.badge}`,
      url: `${SITE_URL}/guide/best-electric-standing-desk#${p.id}`,
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
          <span className="text-ink">Best Electric Standing Desks</span>
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
            Six electric standing desks ranked by sales volume, review count,
            motor reliability, and height range. All picks are one-piece
            complete desks with a desktop surface included, currently in stock,
            and rated 4.5 stars or higher.
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
              6 electric standing desks evaluated
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
            alt="Best electric standing desks for home office"
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
                    Height Range
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
                      {row.heightRange}
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
            Electric standing desks range from reliable workhorse frames under
            $200 to feature-dense setups with drawers, USB ports, and LED
            lighting over $500. For most home office buyers, the decision comes
            down to three things: motor quality at the price point, whether the
            listing includes the desktop surface or just the frame, and whether
            the height range fits your body. If you want a natural wood surface
            instead of laminate, see our guide to the best{" "}
            <Link prefetch={false}
              href="/guide/best-solid-wood-standing-desk"
              className="text-brand hover:underline"
            >
              solid wood standing desks
            </Link>
            . For a complete FlexiSpot model breakdown, see our{" "}
            <Link prefetch={false}
              href="/guide/best-flexispot-standing-desk"
              className="text-brand hover:underline"
            >
              FlexiSpot standing desk comparison
            </Link>
            .
          </p>
        </section>

        {/* What makes a good electric standing desk */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">
            What Makes a Good Electric Standing Desk
          </h2>
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                One-Piece vs Frame-Only
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                A one-piece desk includes both the motorized frame and the
                desktop surface in the listing price. A frame-only desk covers
                only the motorized legs and crossbeam - no desktop surface is
                included. All six picks on this list are one-piece complete
                desks. Many FlexiSpot E5, E7, and Uplift listings are
                frame-only. Check if the listing shows a complete desk with a
                surface in the photos before ordering.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                Anti-Collision Detection
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                When the desk motor encounters resistance during upward movement
                - a chair arm, a hanging cable, someone&apos;s hand - the
                motor&apos;s current draw spikes. The controller detects this
                spike, stops the motor, and reverses direction 1 to 2 inches.
                Without anti-collision, the motor continues driving against
                resistance until something breaks. Anti-collision means you can
                safely use memory presets without watching the desk rise every
                time.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                Height Range by User Height
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand text-white">
                      <th className="text-left px-4 py-3 font-semibold">User Height</th>
                      <th className="text-left px-4 py-3 font-semibold">Target Standing Height</th>
                      <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                        Recommended Max
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { user: "5'0\" to 5'4\"", standing: "35\" to 39\"", max: "40\"+" },
                      { user: "5'5\" to 5'9\"", standing: "39\" to 43\"", max: "44\"+" },
                      { user: "5'10\" to 6'0\"", standing: "43\" to 46\"", max: "47\"+" },
                      { user: "6'1\" to 6'4\"", standing: "46\" to 49\"", max: "50\"+" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                        <td className="px-4 py-3 font-medium text-ink text-xs">{row.user}</td>
                        <td className="px-4 py-3 text-ink-secondary text-xs">{row.standing}</td>
                        <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-ink-muted mt-3">
                Measure from the floor to the bottom of your forearm when
                standing with elbow bent at 90 degrees. Subtract 1 inch for
                your target desk height.
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
          6 Best Electric Standing Desks
        </h2>

        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            How to Choose an Electric Standing Desk
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Motor Type and Stability
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Motor Type</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Stability
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Noise
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">Price Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Single motor, 2-stage", stability: "Moderate wobble at max height", noise: "45 to 55 dB", price: "Under $300" },
                    { type: "Single motor, 3-stage", stability: "Improved rigidity", noise: "45 to 52 dB", price: "$250 to $400" },
                    { type: "Dual motor, 2-stage", stability: "Noticeably more stable", noise: "40 to 50 dB", price: "$350 to $600" },
                    { type: "Dual motor, 3-stage", stability: "Best in class", noise: "38 to 48 dB", price: "$500+" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.type}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.stability}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.noise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Surface Width vs. Monitor Setup
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Width</th>
                    <th className="text-left px-4 py-3 font-semibold">Fits</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { width: "48 inches", fits: "Single monitor or dual 24\" with arm", notes: "Minimum for dual-monitor comfort" },
                    { width: "55 inches", fits: "Dual 24\" to 27\" monitors", notes: "Comfortable side-by-side layout" },
                    { width: "60 inches", fits: "Dual 27\"+ or ultrawide", notes: "Full workstation without compromise" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.width}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.fits}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20">
            <h3 className="text-base font-bold text-ink mb-2">
              Verifying a One-Piece Listing
            </h3>
            <p className="text-sm text-ink-secondary">
              Search the listing title and description for the word
              &ldquo;frame&rdquo; or &ldquo;legs only.&rdquo; If the primary
              product photos show only the metal frame without a desktop
              surface, the listing is frame-only. All six desks on this list
              include the surface. FlexiSpot E5 and E7, and many Uplift V2
              listings, are frame-only and require purchasing a separate desktop
              surface.
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
                context: "Best overall by sales volume and review count",
                id: "ergear-48x24",
                name: "ErGear 48x24\"",
                verdict: " - No.1 Best Seller, 11,000+ reviews at 4.5 stars, 47.6\" max height.",
              },
              {
                context: "Best budget option under $200",
                id: "claiks-48x24",
                name: "Claiks 48x24\"",
                verdict: " - 3,000+ monthly purchases, same footprint as ErGear at a lower price.",
              },
              {
                context: "Best brand with the longest warranty",
                id: "flexispot-en1-48x24",
                name: "FlexiSpot EN1",
                verdict: " - 5-year warranty, 12,471 reviews, one-piece desktop construction.",
              },
              {
                context: "Best Amazon's Choice rating",
                id: "fezibo-48x24",
                name: "FEZIBO 48x24\"",
                verdict: " - 4.6 stars at 4,552 reviews, Amazon's Choice badge.",
              },
              {
                context: "Best wide surface for dual monitors",
                id: "veken-55",
                name: "Veken 55\"",
                verdict: " - only 55\" option on the list, published motor noise spec under 52 dB.",
              },
              {
                context: "Best simple home office pick with top rating",
                id: "huanuo-48x24",
                name: "HUANUO 48x24\"",
                verdict: " - 4.6 stars tied for highest on this list, monitor accessory brand background.",
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
            Browse electric standing desks on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            Filter by size, height range, and price. All Prime-eligible options
            available.
          </p>
          <a
            href="https://www.amazon.com/s?k=electric+standing+desk+home+office&tag=theofficejournal-20"
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
            Last updated: June 2026. Verify current Amazon prices before
            purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
