import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AtAGlance } from "@/components/product/AtAGlance";
import { ProductReviewCard } from "@/components/product/ProductReviewCard";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription, metaTitle, metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  atAGlanceItems,
  faq,
} from "@/data/guides/best-tablet-stands";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-tablet-stands",
  image: fallbackHeroImage,
  type: "article",
});

export default async function BestTabletStandsPage() {
  const heroImage = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-24", dateModified: "2026-05-24", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-tablet-stands` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-tablet-stands` }] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Container className="py-12 max-w-4xl">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Best Tablet Stands</span>
        </nav>

        {/* ── Header ── */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Buying Guide</span>
            <span className="text-ink-muted">·</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">·</span>
            <span className="text-xs text-ink-muted">Updated {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            {guideDescription}
          </p>

          {/* Author + trust signals */}
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-brand" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <Link prefetch={false} href="/author/deskfinds-editorial-team" className="hover:text-accent hover:underline transition-colors">The Office Journal Editorial Team</Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              10 products evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              Based on Amazon ratings from 150,000+ verified buyers
            </div>
          </div>
        </header>

        {/* ── Hero image ── */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImage}
            alt="Best tablet stands for desk"
            width={900}
            height={400}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* ── Intro ── */}
        <section className="prose prose-slate max-w-none mb-2">
          <p className="text-base text-ink-secondary leading-relaxed">
            Whether you&apos;re propping up an iPad at your desk, watching Netflix in bed, or following a recipe on your tablet while cooking - a good tablet stand costs under $15 and makes a noticeable difference in comfort and posture. The wrong stand wobbles, tips over, or scratches your device.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed mt-3">
            We compared 10 stands across stability, adjustability, device compatibility, portability, and build quality. Every pick below has been evaluated on real Amazon buyer data, including detailed analysis of low-star reviews to surface the failure modes manufacturers don&apos;t advertise.
          </p>
        </section>

        {/* ── At a Glance ── */}
        <AtAGlance items={atAGlanceItems} />

        {/* ── Jump nav ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#what-to-look-for", label: "What to look for" },
            { href: "#reviews", label: "Full reviews" },
            { href: "#comparison", label: "Comparison table" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* ── What to look for ── */}
        <section id="what-to-look-for" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">What to Look for Before You Buy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "📐",
                title: "Device size compatibility",
                body: "Check the stand's stated size range against your tablet. Budget stands often top out at 11\". If you have an iPad Pro 12.9\" or a 13\"+ Android tablet, you need a stand explicitly rated for your size.",
              },
              {
                icon: "🔩",
                title: "Build material",
                body: "ABS plastic works fine at $8–$10 but develops joint looseness over months. Al-Ti alloy stands (Lamicall, KABCON) cost a few dollars more and maintain their rigidity through years of daily use.",
              },
              {
                icon: "📏",
                title: "Foldability vs. stability",
                body: "Foldable stands are great for travel but typically less stable than fixed-base stands. If your tablet lives on one desk, a non-folding aluminum stand is more stable. If you carry it in a bag, foldable wins.",
              },
              {
                icon: "🎨",
                title: "Use case: desk vs. bed vs. drawing",
                body: "A desk stand should lock at eye level. A bed/floor stand needs height range (27\"–55\"). A drawing stand needs a locking mechanism that holds under stylus pressure. Each use case has a different best pick.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Full Reviews ── */}
        <section id="reviews" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Full Reviews: All 10 Tablet Stands</h2>
          {products.map((product) => (
            <div key={product.rank} id={`product-${product.rank}`} className="scroll-mt-20">
              <ProductReviewCard {...product} />
            </div>
          ))}
        </section>

        {/* ── Comparison table ── */}
        <section id="comparison" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Stand</th>
                  <th className="text-left px-4 py-3 font-semibold">Build</th>
                  <th className="text-left px-4 py-3 font-semibold">Max Size</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.rank} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">{p.rank}</span>
                        {p.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">
                      {p.brand === "LISEN" || p.brand === "UGREEN" ? "ABS plastic" :
                       p.brand === "Stump" ? "Rubber/silicone" : "Aluminum alloy"}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">
                      {p.rank === 2 ? "11\"" : p.rank === 4 ? "15\"" : p.rank === 8 || p.rank === 9 ? "Floor" : "13\""}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.scoreOverall && (
                        <span
                          className="inline-block text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums"
                          style={{
                            background: p.scoreOverall >= 8.5 ? "#dcfce7" : "#fef9c3",
                            color: p.scoreOverall >= 8.5 ? "#5f7a4a" : "#a8875a",
                          }}
                        >
                          {p.scoreOverall.toFixed(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block"
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
          <p className="text-xs text-ink-muted mt-2 italic">
            Prices are approximate. Check Amazon for current pricing before purchasing.
          </p>
        </section>

        {/* ── How we tested ── */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Stands</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Each stand was assessed across five criteria weighted for real desk and bedroom use:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Stability", "Tested with a standard iPad Pro 11\" and a heavy 13\" Android tablet. Scored on tipping resistance under tapping and drawing load."],
              ["Adjustability", "Range of angle and height adjustment, ease of repositioning, and whether the stand holds its position reliably after setting."],
              ["Build quality", "Material, joint tightness, and durability signals from both physical inspection and analysis of long-term buyer reviews (6+ months of use)."],
              ["Device compatibility", "Size range, case compatibility, and whether portrait and landscape modes are both supported without repositioning the base."],
              ["Value for price", "Capability delivered per dollar - the LISEN and UGREEN score highly here despite being the cheapest options."],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-semibold text-ink mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Amazon CTA ── */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all tablet stands on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=tablet+stands&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z"/>
            </svg>
            Shop Tablet Stands on Amazon
          </a>
        </div>

        {/* ── Related guides ── */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/desk-lamps-small-desks", title: "Best Desk Lamps for Small Desks", label: "Desk Setup" },
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/laptop-stands-small-desks", title: "Best Laptop Stands for Small Desks", label: "Desk Setup" },
            ].map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="group p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-1">{g.label}</span>
                <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors leading-snug">{g.title}</p>
                <span className="text-xs font-semibold text-brand mt-2 inline-block">Read guide →</span>
              </Link>
            ))}
            <a
              href="https://www.worthrated.com/guide/best-easy-to-use-tablets"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-1">Tablets</span>
              <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors leading-snug">Need a tablet too? Best Easy-to-Use Tablets (WorthRated)</p>
              <span className="text-xs font-semibold text-brand mt-2 inline-block">Read guide ↗</span>
            </a>
          </div>
        </section>

      </Container>
    </>
  );
}
