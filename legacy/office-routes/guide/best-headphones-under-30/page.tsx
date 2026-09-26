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
  type Budget30Headphone,
} from "@/data/guides/best-headphones-under-30";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-headphones-under-30",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: Budget30Headphone }) {
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
                {product.type}
              </span>
              {product.anc && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
                  ANC
                </span>
              )}
              {product.wireless ? (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">
                  Wireless
                </span>
              ) : (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                  Wired
                </span>
              )}
              {product.battery !== "N/A" && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                  {product.battery}
                </span>
              )}
              {product.waterproof !== "N/A" && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-700 font-bold">
                  {product.waterproof}
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

export default async function BestHeadphonesUnder30Page() {
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
      "@id": `${SITE_URL}/guide/best-headphones-under-30`,
    },
    about: [
      { "@type": "Thing", name: "Budget Headphones" },
      { "@type": "Thing", name: "Headphones Under $30" },
      { "@type": "Thing", name: "Wireless Earbuds" },
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
        name: "Best Headphones Under $30",
        item: `${SITE_URL}/guide/best-headphones-under-30`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Headphones Under $30 in 2026",
    description:
      "7 headphones under $30 in 2026: ANC earbuds, waterproof earbuds, wired studio, and wireless on-ear picks.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-headphones-under-30#${p.id}`,
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
          <span className="text-ink">Best Headphones Under $30</span>
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
            The under-$30 headphone category gets dismissed by most review
            sites. At this price you can get{" "}
            <Link prefetch={false}
              href="/guide/best-headphones-for-online-classes"
              className="text-brand hover:underline"
            >
              active noise cancellation
            </Link>
            , IPX8 waterproofing, 55-hour battery life, and genuinely good
            audio if you know which products to look at. This guide covers seven
            headphones under $30 across three categories: true wireless earbuds,
            wired on-ear, and{" "}
            <Link prefetch={false}
              href="/guide/best-headphones-for-working-out"
              className="text-brand hover:underline"
            >
              wireless on-ear
            </Link>
            .
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
              7 picks evaluated across earbuds, wired, and wireless on-ear
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
            alt="Best headphones under $30 in 2026"
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
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    ANC
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Wireless
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlanceRows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                  >
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
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span
                        className={
                          row.anc
                            ? "text-green-700 font-bold"
                            : "text-ink-muted"
                        }
                      >
                        {row.anc ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span
                        className={
                          row.wireless
                            ? "text-blue-700 font-bold"
                            : "text-ink-muted"
                        }
                      >
                        {row.wireless ? "Yes" : "No"}
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
            The under-$30 headphone category gets dismissed by most review
            sites. At this price you can get active noise cancellation, IPX8
            waterproofing, 55-hour battery life, and genuinely good audio if you
            know which products to look at.
          </p>
          <p>
            This guide covers seven headphones under $30 across three
            categories: true wireless earbuds, wired on-ear, and wireless
            on-ear. If you are deciding between earbuds and over-ear headphones
            for a specific use, the comparison table below covers the key
            trade-offs.
          </p>
        </section>

        {/* Buying Guide: Type comparison */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Earbuds vs On-Ear vs Wired: Which Type Should You Get?
          </h2>

          <div className="mb-8">
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Noise isolation
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Mic quality
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Battery
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                      Wearability
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Best use case
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "True wireless earbuds",
                      isolation: "Good (in-ear seal)",
                      mic: "Good",
                      battery: "20-55h combined",
                      wear: "Compact, portable",
                      use: "Commute, gym, calls",
                    },
                    {
                      type: "Wired on-ear",
                      isolation: "Moderate (open-back leaks)",
                      mic: "Good (inline)",
                      battery: "None needed",
                      wear: "Lightweight, no charging",
                      use: "Desk, studio listening",
                    },
                    {
                      type: "Wireless on-ear",
                      isolation: "Good (ear cushions)",
                      mic: "Good",
                      battery: "34h per charge",
                      wear: "Comfortable, foldable",
                      use: "All-day desk, classes",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.isolation}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.mic}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.battery}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                        {row.wear}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.use}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Decision guide:</strong> Need ANC?
              Go earbuds (P20i). Best sound at a desk? Go wired (KPH30i). Need
              all-day comfort? Go wireless on-ear (Riff Wireless 2).
            </div>
          </div>

          {/* What to Expect Under $30 */}
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">
            What to Expect Under $30
          </h2>

          <div className="mb-8 space-y-5">
            <div>
              <h3 className="text-base font-bold text-ink mb-2">
                What you get
              </h3>
              <ul className="space-y-2">
                {[
                  "Real ANC - the Soundcore P20i at $20 has hybrid ANC that measurably reduces ambient noise",
                  "IPX8 waterproofing - the TOZO T10 is fully submersible at $25",
                  "55-hour combined battery - the TOZO T10 outlasts many $100 options",
                  "Wireless charging case - included with the TOZO T10, rare at this price",
                  "Multipoint Bluetooth (2-device) - available on the Dime 3 and Riff Wireless 2",
                  "Audiophile-grade drivers - the Koss KPH30i and Porta Pro beat wireless options costing 2 to 3 times more",
                  "USB-C charging - standard on all wireless picks in this guide",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <span className="mt-1 w-3.5 h-3.5 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 font-bold text-[9px]">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-ink mb-2">
                What you won&apos;t get
              </h3>
              <ul className="space-y-2">
                {[
                  "Premium ANC depth - P20i ANC is real but not comparable to $150+ headphones",
                  "Multipoint on earbuds with ANC - the P20i does not support multipoint",
                  "Active noise cancellation on wireless on-ear - no pick at this price has ANC in an over-ear design",
                  "Premium materials or build finishes - plastics throughout at this price tier",
                  "Hi-res audio certification or LDAC/aptX HD codecs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <span className="mt-1 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">
                      &minus;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
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
          7 Best Headphones Under $30
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
                context: "Best ANC under $30",
                id: "soundcore-p20i",
                name: "Soundcore P20i",
                verdict:
                  ": hybrid ANC at $20, USB-C charging, 30h combined battery.",
              },
              {
                context: "Best audio quality",
                id: "koss-kph30i",
                name: "Koss KPH30i",
                verdict:
                  ": wired, $20, audiophile-grade sound that beats wireless options at $50+.",
              },
              {
                context: "Best waterproof and gym",
                id: "tozo-t10",
                name: "TOZO T10",
                verdict:
                  ": IPX8 fully submersible at $25, wireless charging case, 55h combined battery.",
              },
              {
                context: "Best all-day wireless",
                id: "skullcandy-riff-wireless-2",
                name: "Skullcandy Riff Wireless 2",
                verdict:
                  ": 34h battery, multipoint Bluetooth, AUX backup cable, plush cushions for desk use.",
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
            Browse headphones under $30 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. ANC earbuds, waterproof earbuds, wired on-ear,
            and wireless on-ear options.
          </p>
          <a
            href="https://www.amazon.com/s?k=headphones+under+30&tag=theofficejournal-20"
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
