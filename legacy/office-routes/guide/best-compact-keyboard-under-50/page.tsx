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
  type CompactKeyboard,
} from "@/data/guides/best-compact-keyboard-under-50";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-compact-keyboard-under-50",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: CompactKeyboard }) {
  const wirelessIsTrimode = product.wireless.includes("Tri-mode");
  const wirelessIsWired =
    product.wireless === "Wired only" || product.wireless === "Bluetooth only";

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
                {product.layout}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.widthCm}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                  wirelessIsTrimode
                    ? "bg-green-100 text-green-700 font-bold"
                    : wirelessIsWired
                    ? "bg-gray-100 text-ink-secondary"
                    : "bg-gray-100 text-ink-secondary"
                }`}
              >
                {product.wireless}
              </span>
              {product.hotSwap && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
                  Hot-Swap
                </span>
              )}
              {product.qmkVia && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">
                  QMK/VIA
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

export default async function BestCompactKeyboardUnder50Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-17",
    dateModified: "2026-06-17",
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
      "@id": `${SITE_URL}/guide/best-compact-keyboard-under-50`,
    },
    about: [
      { "@type": "Thing", name: "Compact Keyboard" },
      { "@type": "Thing", name: "Mechanical Keyboard Under $50" },
      { "@type": "Thing", name: "60% Keyboard" },
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
        name: "Best Compact Keyboards Under $50",
        item: `${SITE_URL}/guide/best-compact-keyboard-under-50`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Compact Keyboards Under $50 in 2026",
    description:
      "7 compact keyboards under $50 across 60%, 65%, 75%, and TKL layouts, compared by wireless type, hot-swap, QMK support, and desk footprint.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-compact-keyboard-under-50#${p.id}`,
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
          <span className="text-ink">Best Compact Keyboards Under $50</span>
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
            The $50 ceiling used to mean settling for mushy keys, plastic flex,
            and unreliable wireless. Tri-mode wireless, hot-swappable switches,
            gasket mounting, and QMK/VIA programmability are all available under
            $50 in 2026. This guide covers 7 compact keyboards under $50 across
            60%, 65%, 75%, and TKL layouts.
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
              7 picks evaluated across 60%, 65%, 75%, and TKL layouts
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
            alt="Best compact keyboards under $50 in 2026"
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
                  <th className="text-left px-4 py-3 font-semibold">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Layout
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Wireless
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
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span
                        className={
                          row.wireless.includes("Tri-mode")
                            ? "text-green-700 font-bold"
                            : "text-ink-muted"
                        }
                      >
                        {row.wireless}
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
            The $50 ceiling used to mean settling for mushy keys, plastic flex,
            and unreliable wireless. Tri-mode wireless, hot-swappable switches,
            gasket mounting, and QMK/VIA programmability are all available under
            $50 in 2026.
          </p>
          <p>
            This guide covers 7 compact keyboards under $50 across 60%, 65%,
            75%, and TKL layouts. If you are also researching layout options
            more broadly, see our guide on{" "}
            <Link prefetch={false}
              href="/guide/best-small-keyboards"
              className="text-brand hover:underline"
            >
              best small keyboards
            </Link>{" "}
            or if you need a number pad alongside a small footprint, our{" "}
            <Link prefetch={false}
              href="/guide/best-small-keyboard-with-numpad"
              className="text-brand hover:underline"
            >
              compact keyboards with numpad
            </Link>{" "}
            guide covers that.
          </p>
        </section>

        {/* Buying Guide: Layout */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Which Layout Do You Actually Need
          </h2>

          <div className="mb-8">
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Layout
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">Keys</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Width
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Arrow Keys
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                      Function Row
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      layout: "60%",
                      keys: "61",
                      width: "~29 cm",
                      arrows: "Fn layer only",
                      frow: "Fn layer only",
                    },
                    {
                      layout: "65%",
                      keys: "68",
                      width: "~31 cm",
                      arrows: "Dedicated",
                      frow: "Fn layer only",
                    },
                    {
                      layout: "75%",
                      keys: "84",
                      width: "~32 cm",
                      arrows: "Dedicated",
                      frow: "Dedicated",
                    },
                    {
                      layout: "TKL 87%",
                      keys: "87",
                      width: "~36 cm",
                      arrows: "Dedicated",
                      frow: "Dedicated",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.layout}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.keys}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.width}
                      </td>
                      <td className="px-4 py-3 text-xs hidden sm:table-cell">
                        <span
                          className={
                            row.arrows === "Dedicated"
                              ? "text-green-700 font-semibold"
                              : "text-ink-muted"
                          }
                        >
                          {row.arrows}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs hidden md:table-cell">
                        <span
                          className={
                            row.frow === "Dedicated"
                              ? "text-green-700 font-semibold"
                              : "text-ink-muted"
                          }
                        >
                          {row.frow}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">60%</strong> is the smallest and
              most desk-friendly but requires the largest adjustment period.
              Arrow keys and the function row live behind Fn layers.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">65%</strong> adds dedicated arrow
              keys in only 2 cm of extra width over 60%. The practical sweet
              spot for users who need arrows daily.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">75%</strong> adds the function row
              back in a frame barely wider than 65%. Best balance of compactness
              and key accessibility.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">TKL 87%</strong> removes only the
              numpad. Easiest transition from a full-size keyboard, keeps all
              navigation and function keys.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Decision guide:</strong> Need arrow
              keys? Skip 60%. Need function row? Go 75% or TKL.
            </div>
          </div>

          {/* Buying Guide: Budget Features */}
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            What to Look for in a Budget Compact Keyboard
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Hot-Swap vs Soldered
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              Hot-swappable keyboards let you pull switches out and replace them
              without soldering. For a long-term board, this means you can swap
              a broken switch in seconds, and experiment with different switch
              feels without buying a new keyboard. Six of the seven picks in
              this guide are hot-swappable.
            </p>
            <p className="text-sm text-ink-secondary">
              Soldered keyboards (the Logitech K380s in this guide uses
              scissor-over-membrane, not traditional switches) are typically
              non-mechanical and built for compact portability rather than
              switch customization.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Wireless Connection Types
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Latency
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Multi-device
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Best for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Tri-mode (BT + 2.4 GHz + USB)",
                      latency: "Low (2.4 GHz)",
                      multi: "Yes (Bluetooth)",
                      best: "Most versatile",
                    },
                    {
                      type: "Bluetooth only",
                      latency: "Marginal",
                      multi: "Yes",
                      best: "Mac, multi-device",
                    },
                    {
                      type: "Wired only",
                      latency: "Zero",
                      multi: "No",
                      best: "Gaming, fixed desk",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.latency}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.multi}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.best}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Switch Types</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Feel</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Sound
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Best for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Red (linear)",
                      feel: "Smooth, no bump",
                      sound: "Quiet",
                      best: "Gaming, fast typing",
                    },
                    {
                      type: "Brown (tactile)",
                      feel: "Tactile bump, no click",
                      sound: "Moderate",
                      best: "Typing and office use",
                    },
                    {
                      type: "Blue (clicky)",
                      feel: "Tactile bump + click",
                      sound: "Loud",
                      best: "Typing, not office",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.feel}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.sound}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.best}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-ink mb-3">Build Quality</h3>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">Metal plate:</strong> Adds rigidity
              and a firmer typing feel. The Redragon K552P includes a metal top
              plate under $35, which is rare at this price.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              <strong className="text-ink">PBT vs ABS keycaps:</strong> PBT
              keycaps (Keychron C3 Pro, Tecware Phantom+ Elite) resist shine and
              feel slightly textured. ABS keycaps (most budget boards) develop a
              glossy shine over months of use but are cheaper to produce.
            </p>
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">Gasket or foam dampening:</strong>{" "}
              Gasket mounting isolates the switch plate from the case, reducing
              vibration and producing a softer, quieter sound profile. Both the
              Keychron C3 Pro and Epomaker TH80 SE offer this under $50.
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
          7 Best Compact Keyboards Under $50
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
                context: "Best overall",
                id: "rk-rk61",
                name: "RK Royal Kludge RK61",
                verdict:
                  ": tri-mode wireless, hot-swap, 60% footprint, QMK/VIA under $45.",
              },
              {
                context: "Best typing feel",
                id: "keychron-c3-pro",
                name: "Keychron C3 Pro",
                verdict:
                  ": gasket mount, QMK/VIA, PBT keycaps, the best wired pick at ~$35.",
              },
              {
                context: "Best for Mac and multi-device",
                id: "logitech-k380s",
                name: "Logitech Pebble Keys 2 K380s",
                verdict:
                  ": 3-device Bluetooth switching, narrowest footprint, quiet keys designed for macOS.",
              },
              {
                context: "Most features per dollar",
                id: "epomaker-th80-se",
                name: "Epomaker TH80 SE",
                verdict:
                  ": gasket mount, rotary knob, tri-mode wireless, 4000 mAh battery when on sale under $50.",
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
            Browse compact keyboards under $50 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. 60%, 65%, 75%, and TKL options with wireless
            and hot-swap.
          </p>
          <a
            href="https://www.amazon.com/s?k=compact+keyboard+under+50&tag=theofficejournal-20"
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
