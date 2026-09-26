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
  type Budget100Headphone,
} from "@/data/guides/best-headphones-under-100";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-headphones-under-100",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: Budget100Headphone }) {
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
              {product.ldac && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">
                  LDAC
                </span>
              )}
              {product.wireless ? (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
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

export default async function BestHeadphonesUnder100Page() {
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
      "@id": `${SITE_URL}/guide/best-headphones-under-100`,
    },
    about: [
      { "@type": "Thing", name: "Headphones Under $100" },
      { "@type": "Thing", name: "Wireless ANC Headphones" },
      { "@type": "Thing", name: "Studio Headphones" },
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
        name: "Best Headphones Under $100",
        item: `${SITE_URL}/guide/best-headphones-under-100`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Headphones Under $100 in 2026",
    description:
      "7 headphones under $100 in 2026 across wireless ANC, wired studio, and LDAC categories.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-headphones-under-100#${p.id}`,
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
          <span className="text-ink">Best Headphones Under $100</span>
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
            The $100 ceiling is where the headphone category stops being a
            compromise. Sony&apos;s ANC engineering, LDAC Hi-Res wireless,
            professional studio monitors with detachable cables, and
            Sennheiser&apos;s broadcast-grade passive isolation all become
            accessible under $100. This guide covers seven headphones across
            wireless ANC, wired studio, and LDAC categories.
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
              7 picks evaluated across wireless ANC, LDAC, and wired studio
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
            alt="Best headphones under $100 in 2026"
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
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    ANC
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    LDAC
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Battery
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
                    <td className="px-4 py-3 text-xs hidden md:table-cell">
                      <span
                        className={
                          row.ldac
                            ? "text-blue-700 font-bold"
                            : "text-ink-muted"
                        }
                      >
                        {row.ldac ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.battery}
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
            The $100 ceiling is where the headphone category stops being a
            compromise. Sony&apos;s ANC engineering, LDAC Hi-Res wireless,
            professional studio monitors with detachable cables, and
            Sennheiser&apos;s broadcast-grade passive isolation all become
            accessible under $100. This guide covers seven headphones across
            wireless ANC, wired studio, and LDAC categories.
          </p>
          <p>
            If you need something optimized for calls and conferencing, see our{" "}
            <Link prefetch={false}
              href="/guide/best-headset-for-work"
              className="text-brand hover:underline"
            >
              headset for work
            </Link>{" "}
            guide. For immersive audio in{" "}
            <Link prefetch={false}
              href="/guide/best-headphones-for-gaming"
              className="text-brand hover:underline"
            >
              gaming
            </Link>
            , we cover that separately.
          </p>
        </section>

        {/* Buying Guide: What Does $100 Buy */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            What Does $100 Buy That $70 Doesn&apos;t?
          </h2>

          <div className="mb-8">
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Under $70
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Under $100
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "ANC quality",
                      under70: "Low-frequency only",
                      under100: "Sony V1 chip (voices + mid-freq)",
                    },
                    {
                      feature: "LDAC Hi-Res wireless",
                      under70: "Rarely available",
                      under100: "Two picks (1MORE, Space One)",
                    },
                    {
                      feature: "Studio monitors",
                      under70: "Entry-level options",
                      under100: "ATH-M40x, AKG K361 (professional)",
                    },
                    {
                      feature: "Passive isolation",
                      under70: "Moderate",
                      under100: "Sennheiser HD 280 Pro (32dB)",
                    },
                    {
                      feature: "Detachable cables",
                      under70: "Uncommon",
                      under100: "Standard on studio picks",
                    },
                    {
                      feature: "ANC battery",
                      under70: "Up to 40h",
                      under100: "Up to 70h (1MORE SonoFlow)",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.under70}
                      </td>
                      <td className="px-4 py-3 text-green-700 text-xs font-semibold">
                        {row.under100}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary mb-3">
              The under-$100 tier is where Sony and Sennheiser professional
              lineups become fully accessible for the first time. Below $70 you
              are working with generic ANC processors; above $70 you get Sony&apos;s
              own Integrated Processor V1, the same architecture used in the
              $350 WH-1000XM5.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Decision guide:</strong> Want wireless
              noise cancellation? Go Sony WH-CH720N or Life Q30. Want Hi-Res
              audio? Go 1MORE SonoFlow or Space One. Want professional studio
              accuracy? Go ATH-M40x or AKG K361.
            </div>
          </div>

          {/* Buying Guide: ANC vs Wired Studio */}
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Wireless ANC vs Wired Studio: Choosing the Right Type
          </h2>

          <div className="mb-8">
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Factor
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Wireless ANC
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Wired Studio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      factor: "Isolation method",
                      wireless: "Electronic (mic + processing)",
                      wired: "Physical (ear cup seal)",
                    },
                    {
                      factor: "Best noise type",
                      wireless: "Low to mid-frequency hum",
                      wired: "Broadband, including high-freq",
                    },
                    {
                      factor: "Audio quality ceiling",
                      wireless: "LDAC (990kbps) on Android",
                      wired: "Lossless, limited by DAC",
                    },
                    {
                      factor: "Battery dependency",
                      wireless: "Yes, 35h to 70h",
                      wired: "None",
                    },
                    {
                      factor: "Best use case",
                      wireless: "Commute, open office, travel",
                      wired: "Fixed desk, production, monitoring",
                    },
                    {
                      factor: "Cable failure risk",
                      wireless: "None",
                      wired: "Low (detachable cables on studio picks)",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.factor}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.wireless}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.wired}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-5">
              <h3 className="text-lg font-bold text-ink mb-3">
                When Wired Beats Wireless
              </h3>
              <p className="text-sm text-ink-secondary mb-3">
                ANC electronics generate a small amount of processing noise
                called &ldquo;hiss&rdquo; that is audible in quiet environments.
                Wired studio headphones have no electronics, so this artifact
                does not exist. At a fixed desk, a wired studio monitor will
                deliver cleaner audio than any wireless headphone at the same
                price.
              </p>
              <p className="text-sm text-ink-secondary mb-3">
                The Sennheiser HD 280 Pro achieves 32dB of passive isolation
                without any electronics. The Sony WH-CH720N with ANC on achieves
                approximately 20 to 25dB in practice. For a quiet recording or
                mixing environment, the passive approach wins on both isolation
                and audio fidelity.
              </p>
            </div>

            <div className="mb-5">
              <h3 className="text-lg font-bold text-ink mb-3">
                When Wireless ANC Wins
              </h3>
              <p className="text-sm text-ink-secondary">
                Open offices, commutes, and any situation where a cable is
                impractical. ANC also handles continuous low-frequency noise
                (AC units, airplane engines, bus vibration) more comfortably
                than passive ear cup pressure alone. The Life Q30&apos;s three
                dedicated ANC modes are purpose-built for these environments.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Rule of thumb:</strong> Fixed desk
              with a cable? Go wired studio. Moving around or open office? Go
              wireless ANC. Both at the same time? Two headphones are cheaper
              than one bad compromise.
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
          7 Best Headphones Under $100
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
                context: "Best ANC when on sale",
                id: "sony-wh-ch720n",
                name: "Sony WH-CH720N",
                verdict:
                  ": Sony Integrated Processor V1 handles voices and mid-frequency noise, 35h battery, Quick Charge, 192g.",
              },
              {
                context: "Best reliable 3-mode ANC",
                id: "soundcore-life-q30",
                name: "Soundcore Life Q30",
                verdict:
                  ": Transport, Outdoor, Indoor modes, 50h with ANC on, reliably sub-$80 without sale timing.",
              },
              {
                context: "Best studio monitor",
                id: "ath-m40x",
                name: "Audio-Technica ATH-M40x",
                verdict:
                  ": CCAW voice coils, two detachable cables, 90-degree swivel cups for one-ear monitoring, flat neutral tuning.",
              },
              {
                context: "Best passive isolation",
                id: "sennheiser-hd-280-pro",
                name: "Sennheiser HD 280 Pro",
                verdict:
                  ": 32dB passive isolation, 20+ years in continuous production, industry standard for broadcast and podcast.",
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
            Browse headphones under $100 on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Wireless ANC, LDAC, and studio options compared.
          </p>
          <a
            href="https://www.amazon.com/s?k=headphones+under+100&tag=theofficejournal-20"
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
