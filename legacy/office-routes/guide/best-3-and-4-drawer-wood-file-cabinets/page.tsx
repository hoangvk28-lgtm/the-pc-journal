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
  backupProducts,
  atAGlanceRows,
  faq,
  relatedGuides,
  type MultiDrawerCabinet,
} from "@/data/guides/best-3-and-4-drawer-wood-file-cabinets";

export const revalidate = 604800;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-3-and-4-drawer-wood-file-cabinets",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: MultiDrawerCabinet }) {
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
                {product.format}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.drawers}
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

export default async function Best3And4DrawerWoodFileCabinetsPage() {
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
      "@id": `${SITE_URL}/guide/best-3-and-4-drawer-wood-file-cabinets`,
    },
    about: [
      { "@type": "Thing", name: "4-Drawer File Cabinet" },
      { "@type": "Thing", name: "3-Drawer File Cabinet" },
      { "@type": "Thing", name: "Home Office Storage" },
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
        name: "Best 3 and 4-Drawer Wood File Cabinets",
        item: `${SITE_URL}/guide/best-3-and-4-drawer-wood-file-cabinets`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guideTitle,
    description: metaDescription,
    numberOfItems: products.length,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name} - ${p.badge}`,
      url: `${SITE_URL}/guide/best-3-and-4-drawer-wood-file-cabinets#${p.id}`,
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
          <span className="text-ink">Best 3 and 4-Drawer Wood File Cabinets</span>
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
            <span className="text-xs text-ink-muted">Updated July 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            3 primary picks plus 2 backup options evaluated across the 3-drawer mobile and
            4-drawer vertical categories. Ranked by review count, buyer satisfaction, and
            practical fit for home office use.
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
              3 primary picks plus 2 backup options evaluated
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
            alt="Best 3-drawer and 4-drawer wood file cabinets for home office"
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
                    Format
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Drawers
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
                      {row.format}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.drawers}
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
            The 3-drawer and 4-drawer wood file cabinet categories cover two very different
            products. A 3-drawer mobile cabinet (like the DEVAISE) is a low-profile rolling
            unit designed to sit beside or under a desk, combining file storage with open
            shelves and a printer stand surface. A 4-drawer vertical cabinet (like the Sauder
            Clifford Place) is a tall, stationary filing unit designed to hold a large volume
            of hanging files against a wall. Both use engineered wood construction at this
            price range. Choosing the right one depends on your workflow, available floor
            space, and filing volume. For a broader overview of the full category, see our{" "}
            <Link prefetch={false}
              href="/guide/best-wood-file-cabinets"
              className="text-brand hover:underline"
            >
              best wood file cabinets
            </Link>{" "}
            guide. For lighter storage needs with fewer drawers, see our{" "}
            <Link prefetch={false}
              href="/guide/best-2-drawer-wood-file-cabinets"
              className="text-brand hover:underline"
            >
              best 2-drawer wood file cabinets
            </Link>{" "}
            guide.
          </p>
        </section>

        {/* What to Know section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">
            What to Know Before Buying
          </h2>
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                3-Drawer Mobile vs 4-Drawer Vertical: Different Tools
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                A 3-drawer mobile cabinet and a 4-drawer vertical cabinet are not interchangeable.
                The mobile unit rolls, sits low at 24 to 28 inches, and combines drawers with open
                shelves for active desk-side use. The vertical unit stands 50-plus inches tall,
                anchors against a wall, and is optimized purely for hanging file capacity. Decide
                which workflow you need before choosing between them.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                Height Considerations for Tall Cabinets
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                A 4-drawer vertical file cabinet at 50-plus inches is a significant piece of
                furniture. In rooms with standard 8-foot ceilings it remains proportionate, but
                in rooms with sloped ceilings, built-in shelving, or compact layouts it can feel
                visually dominant. Measure the wall space carefully before ordering, and account
                for the depth (typically 18 to 22 inches) when planning clearance for drawers to
                open fully.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <h3 className="text-base font-bold text-ink mb-2">
                Assembly Time for Multi-Drawer Cabinets
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                3-drawer and 4-drawer cabinets have more parts than 2-drawer units. Expect 45
                to 90 minutes of assembly for a 3-drawer mobile cabinet and 90 minutes to 2
                hours for a 4-drawer vertical unit. Read recent Amazon reviews specifically for
                assembly comments on your chosen model. A second person is helpful for positioning
                heavier 4-drawer units during assembly.
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
          3 Best Picks for 3-Drawer and 4-Drawer Wood File Cabinets
        </h2>

        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Backup Picks */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">
            Backup Picks (Low Review Count)
          </h2>
          <p className="text-sm text-ink-secondary mb-6">
            These products have distinctive features but insufficient buyer data for a primary
            recommendation. Consider them only if you specifically need what they offer.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {backupProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border bg-white overflow-hidden"
              >
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="block w-full h-44 bg-gray-50 border-b border-border overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={176}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </a>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    {product.badge}
                  </span>
                  <p className="font-bold text-ink text-sm leading-snug">
                    {product.name}
                  </p>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {product.whyItWorks.split(". ")[0]}.
                  </p>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-white hover:opacity-90 transition-opacity w-fit mt-1"
                    style={{ background: "#FF9900" }}
                  >
                    <svg
                      className="w-3 h-3 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
                    </svg>
                    Check on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            How to Choose Between 3-Drawer and 4-Drawer Wood File Cabinets
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              3-Drawer Mobile vs 4-Drawer Vertical: Different Products for Different Needs
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Format</th>
                    <th className="text-left px-4 py-3 font-semibold">Height</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best For</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Mobility</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      format: "3-Drawer Mobile",
                      height: "24 to 28 inches",
                      bestFor: "Desk-side filing, printer stand, active daily access",
                      mobility: "Rolling casters - fully mobile",
                    },
                    {
                      format: "4-Drawer Vertical",
                      height: "50 to 54 inches",
                      bestFor: "High-volume filing, wall placement, long-term document storage",
                      mobility: "Stationary - not intended to move once placed",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.format}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.height}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.bestFor}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.mobility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              How Many Files Can These Cabinets Hold?
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Drawer Count</th>
                    <th className="text-left px-4 py-3 font-semibold">Approx. Capacity</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      drawers: "3-Drawer Mobile (file drawers only)",
                      capacity: "100 to 200 hanging folders",
                      notes: "Remaining drawers may be open shelves or utility drawers, not file drawers",
                    },
                    {
                      drawers: "4-Drawer Vertical",
                      capacity: "200 to 400 hanging folders",
                      notes: "All 4 drawers typically accept hanging files; letter or legal size depends on model",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.drawers}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.capacity}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20">
            <h3 className="text-base font-bold text-ink mb-2">
              Verify Drawer Configuration Before Ordering
            </h3>
            <p className="text-sm text-ink-secondary">
              Not every drawer in a multi-drawer cabinet is a file drawer. The DEVAISE, for
              example, includes open shelves alongside its file drawers. Always check the
              product specifications on the current Amazon listing to confirm how many drawers
              accept hanging files versus how many are utility or open shelves.
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
                context: "Best overall by trust signal",
                id: "devaise-3-drawer-mobile-rustic-brown",
                name: "DEVAISE 3-Drawer Mobile, Rustic Brown",
                verdict: " - 2,800 plus reviews at 4.1 stars, rolling casters, open shelves, printer stand top, under $100.",
              },
              {
                context: "Best 3-drawer farmhouse style",
                id: "vasagle-3-drawer-honey-brown",
                name: "VASAGLE 3-Drawer, Honey Brown and Black",
                verdict: " - warm farmhouse finish from a trusted brand, pairs well with light wood desks. Verify current drawer count and price before ordering.",
              },
              {
                context: "Best 4-drawer vertical by reviews",
                id: "sauder-clifford-4-drawer-grand-walnut",
                name: "Sauder Clifford Place 4-Drawer, Grand Walnut",
                verdict: " - 465 reviews at 4.0 stars, maximum filing capacity, traditional home office aesthetic. $303.99 is a premium but justified by brand and review count.",
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
            Browse 3-drawer wood file cabinets on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            Filter by drawer count, finish, and price. All Prime-eligible options available.
          </p>
          <a
            href="https://www.amazon.com/s?k=3+drawer+wood+file+cabinet&tag=theofficejournal-20"
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
            Last updated: July 2026. Verify current Amazon prices before purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
