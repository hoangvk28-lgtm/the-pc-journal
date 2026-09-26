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
  type MechKeyboard100,
} from "@/data/guides/best-mechanical-keyboard-under-100";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-mechanical-keyboard-under-100",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: MechKeyboard100 }) {
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
                Layout: {product.layout}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Wireless: {product.wireless}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Switches: {product.switchType}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Mount: {product.mount}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                Keycaps: {product.keycaps}
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

export default async function BestMechanicalKeyboardUnder100Page() {
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
      "@id": `${SITE_URL}/guide/best-mechanical-keyboard-under-100`,
    },
    about: [
      { "@type": "Thing", name: "Mechanical Keyboards Under $100" },
      { "@type": "Thing", name: "Home Office Keyboards" },
      { "@type": "Thing", name: "Gaming Keyboards" },
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
        name: "Best Mechanical Keyboard Under $100",
        item: `${SITE_URL}/guide/best-mechanical-keyboard-under-100`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Mechanical Keyboards Under $100 in 2026",
    description:
      "6 mechanical keyboards under $100 in 2026 across budget, wired, and wireless categories.",
    numberOfItems: 9,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-mechanical-keyboard-under-100#${p.id}`,
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
          <span className="text-ink">Best Mechanical Keyboard Under $100</span>
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
            Under $100 in 2026 covers the full range of practical mechanical
            keyboard features - from the $29 Redragon K552 as a proven
            entry-level first keyboard, to gasket-mount PBT boards with QMK/VIA
            and hot-swap at $84. The meaningful decisions are form factor, switch
            type, gasket vs tray mount, and wired vs wireless - not brand. This
            guide covers six keyboards that represent the best value at each
            price point.
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
              6 picks evaluated across budget, wired, and wireless categories
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best mechanical keyboard under $100 in 2026"
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
                  <th className="text-left px-4 py-3 font-semibold">Keyboard</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Layout
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Wireless
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Switch
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
                      {row.layout}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.wireless}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.switchType}
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
            Under $100 in 2026 covers the full range of practical mechanical
            keyboard features: from the $29 Redragon K552 (first-keyboard
            standard) to the Keychron V1 with double-gasket mount, PBT keycaps,
            QMK/VIA, and hot-swap at $84. The meaningful decisions are form
            factor, switch type, gasket vs tray mount, and wired vs wireless -
            not brand.
          </p>
          <p>
            For the rest of your desk setup, see the{" "}
            <Link prefetch={false}
              href="/guide/best-standing-desk-under-200"
              className="text-brand hover:underline"
            >
              best standing desk under $200
            </Link>{" "}
            and the{" "}
            <Link prefetch={false}
              href="/guide/best-monitor-arm-under-100"
              className="text-brand hover:underline"
            >
              best monitor arm under $100
            </Link>
            .
          </p>
        </section>

        {/* Before You Pick */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Before You Pick: 4 Things That Matter More Than Brand
          </h2>

          {/* 1. Layout and Desk Space */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              1. Keyboard Layout and Desk Space
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Layout</th>
                    <th className="text-left px-4 py-3 font-semibold">Keys</th>
                    <th className="text-left px-4 py-3 font-semibold">Width</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">What is missing</th>
                    <th className="text-left px-4 py-3 font-semibold">Best desk width</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      layout: "Full 100%",
                      keys: "104",
                      width: '~17.5"',
                      missing: "Nothing",
                      desk: '48"+',
                    },
                    {
                      layout: "TKL 87%",
                      keys: "87",
                      width: '~14"',
                      missing: "Numpad",
                      desk: '40"+',
                    },
                    {
                      layout: "75%",
                      keys: "84",
                      width: '~12.5"',
                      missing: "Numpad, some nav keys",
                      desk: '36"+',
                    },
                    {
                      layout: "65%",
                      keys: "~68",
                      width: '~11"',
                      missing: "Numpad, F-row",
                      desk: '36"+',
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.layout}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.keys}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.width}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.missing}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.desk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              A TKL keyboard at 14 inches wide leaves 26 inches of clear space
              on a 40-inch desk - enough for a mouse, notepad, and a small
              monitor stand. A 75% at 12.5 inches leaves 27.5 inches on the same
              desk. For desks 36-40 inches wide, the 75% layout is the practical
              choice: it retains the F-row and dedicated arrow keys while being
              narrower than TKL.
            </p>
          </div>

          {/* 2. Switch Type */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              2. Switch Type: Linear, Tactile, or Clicky
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Feel</th>
                    <th className="text-left px-4 py-3 font-semibold">Sound</th>
                    <th className="text-left px-4 py-3 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Red (linear)",
                      feel: "Smooth, no bump",
                      sound: "Quiet",
                      best: "Gaming, fast typing, quiet offices",
                    },
                    {
                      type: "Brown (tactile)",
                      feel: "Bump, no click",
                      sound: "Moderate",
                      best: "Work + gaming, most home offices",
                    },
                    {
                      type: "Blue (clicky)",
                      feel: "Bump + audible click",
                      sound: "Loud",
                      best: "Typing satisfaction - NOT for calls",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.feel}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.sound}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.best}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink">Blue switches are audible on video calls even with noise suppression active.</strong>{" "}
              If any part of your work involves video calls, Brown or Red switches
              are the appropriate choice. Blue switches are designed for typing
              satisfaction in solo environments.
            </p>
          </div>

          {/* 3. Gasket Mount vs Tray Mount */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              3. Gasket Mount vs Tray Mount
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Tray mount means the PCB is screwed directly to the plastic case.
              Every keystroke transmits vibration directly through the case to
              the desk surface - louder typing sound and a harder, harsher feel.
              Gasket mount means the PCB sits on silicone or rubber gaskets
              between the top and bottom case halves. The result is a softer,
              bouncier typing feel with less noise transmission. The Keychron C3
              Pro at $40 is the lowest price gasket mount option in this guide.
              For users typing 4+ hours daily, the $15-20 premium for gasket
              mount is worth it.
            </p>
          </div>

          {/* 4. PBT vs ABS */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              4. PBT vs ABS Keycaps
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              ABS plastic develops a greasy, shiny surface in 6-12 months of
              daily typing use. The shine is permanent - cleaning does not
              remove it. PBT is a harder plastic that retains its texture
              through years of use. Double-shot PBT legends are a second layer
              of plastic molded into the keycap, not ink or dye - they cannot
              fade or wear off regardless of how many keystrokes. Boards with
              hot-swap sockets allow keycap replacement for $25-40 in 15 minutes
              without tools.
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
          6 Best Mechanical Keyboards Under $100
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* Full comparison table */}
        <section className="mb-14 scroll-mt-20" id="comparison">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Full Comparison: All 6 Keyboards
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Keyboard</th>
                  <th className="text-left px-4 py-3 font-semibold">Layout</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Wireless</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Hot-Swap</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Mount</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Keycaps</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">QMK/VIA</th>
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
                      {p.layout}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {p.wireless}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {p.hotSwap}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {p.mount}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {p.keycaps}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden lg:table-cell">
                      {p.id === "keychron-c3-pro" || p.id === "keychron-v1"
                        ? "Yes"
                        : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Which Keyboard for Which Desk Size */}
        <section className="mb-14 scroll-mt-20" id="desk-size-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Which Keyboard for Which Desk Size
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Desk width</th>
                  <th className="text-left px-4 py-3 font-semibold">Best layout</th>
                  <th className="text-left px-4 py-3 font-semibold">Recommended pick</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    desk: "Under 36\"",
                    layout: "65% or 60%",
                    pick: "Upgrade to Keychron K6 Pro",
                  },
                  {
                    desk: "36-40\"",
                    layout: "75%",
                    pick: "Keychron V1 or RK84",
                  },
                  {
                    desk: "40-48\" standard",
                    layout: "TKL or 75%",
                    pick: "Any in this guide",
                  },
                  {
                    desk: '48"+',
                    layout: "Any",
                    pick: "Personal preference",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">
                      {row.desk}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">
                      {row.layout}
                    </td>
                    <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                      {row.pick}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Desk space math: a TKL keyboard (14 inches wide) on a 40-inch desk
            leaves 26 inches for mouse, monitor stand, and peripherals. A 75%
            keyboard (12.5 inches wide) on the same desk leaves 27.5 inches.
            For desks under 36 inches, neither TKL nor 75% keyboards in this
            guide are the right fit - a 65% or 60% layout is worth considering
            instead.
          </p>
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
            Browse mechanical keyboards under $100 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Budget, wired, and wireless mechanical keyboards
            compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=mechanical+keyboard+under+100&tag=theofficejournal-20"
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
