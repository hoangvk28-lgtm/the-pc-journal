import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription, metaTitle, metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  accessories,
  quickPicks,
  categoryOrder,
  categoryMeta,
  badgeColors,
  setupCombos,
  faq,
} from "@/data/guides/best-small-desk-accessories";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-small-desk-accessories",
  image: fallbackHeroImage,
  type: "article",
});

export default async function BestSmallDeskAccessoriesPage() {
  const heroImage = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-small-desk-accessories` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-small-desk-accessories` }] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Container className="py-12 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Best Small Desk Accessories</span>
        </nav>

        {/* Header */}
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

          {/* Trust signals */}
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
              12 accessories evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              Based on Amazon ratings from verified buyers
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImage}
            alt="Best small desk accessories for compact desks and dorm rooms"
            width={900}
            height={400}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Intro */}
        <section className="prose prose-slate max-w-none mb-8">
          <p className="text-base text-ink-secondary leading-relaxed">
            The fastest way to make a small desk more functional is not to buy a bigger desk. It is to choose accessories that store vertically, mount underneath, or clip to the sides instead of sitting flat on the surface. Most desks under 48 inches are not too small - they just have poor accessory choices taking up the surface area.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed mt-3">
            This guide covers 12 accessories across four categories: organization and storage, cable management, ergonomics, and productivity tech. Each accessory was selected for a compact footprint or zero footprint (mounted, clipped, or vertical). Scores reflect a mix of build quality, footprint efficiency, and value relative to alternatives on Amazon.
          </p>
        </section>

        {/* Quick Picks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks at a Glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickPicks.map((item) => {
              const colors = item.badge ? badgeColors[item.badge] : null;
              return (
                <div key={item.rank} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white">
                  <span className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    {item.badge && colors && (
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <p className="font-semibold text-sm text-ink leading-snug">{item.name}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{item.footprint}</p>
                  </div>
                  <a
                    href={item.amazonUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg text-white shrink-0 whitespace-nowrap"
                    style={{ background: "#FF9900" }}
                  >
                    View
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#how-to-choose", label: "How to choose" },
            { href: "#reviews", label: "All 12 accessories" },
            { href: "#comparison", label: "Comparison table" },
            { href: "#budget-combos", label: "Budget combos" },
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

        {/* How to Choose */}
        <section id="how-to-choose" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            How to Choose Accessories for a Small Desk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "📐",
                title: "Footprint over function",
                body: "The first question for any small desk accessory is not what it does - it is how much surface area it takes. Prioritize accessories that mount underneath, clip to edges, or stand vertically. A monitor riser that also has storage under it earns its footprint twice. A decorative organizer that sits flat earns its footprint zero times.",
              },
              {
                icon: "🔢",
                title: "Solve one problem at a time",
                body: "Most small desks have three root problems: no vertical storage, cables everywhere, and an uncomfortable sitting position. Address them in that order. A monitor riser plus under-desk cable tray solves 80% of what makes a small desk frustrating. Add ergonomics accessories second, tech accessories third.",
              },
              {
                icon: "🔌",
                title: "Cable management first",
                body: "Before buying any visible accessory, deal with cables. One under-desk cable tray and a pack of cable clips costs under $40 and makes the desk look dramatically cleaner. Everything you add after cable management looks intentional instead of piled on.",
              },
              {
                icon: "🏠",
                title: "Dorm vs home office constraints",
                body: "Dorm rooms and rentals often prohibit drilling or permanent adhesive. Stick to clamp-on cable trays, pressure-fit organizers, and freestanding risers. For owned spaces, adhesive-mount under-desk drawers and cable trays unlock more options. Check whether adhesive will damage your desk surface before committing.",
              },
              {
                icon: "💰",
                title: "Set a total budget, not per-item",
                body: "It is easy to spend $200 on accessories that conflict or overlap. Set a total budget of $60 to $120 and pick accessories from different categories. A $40 monitor riser plus a $28 cable tray plus a $20 desk mat covers the three main problems for under $90 with no overlap.",
              },
              {
                icon: "⚖️",
                title: "Skip purely aesthetic items",
                body: "On a desk under 48 inches, every accessory must earn its footprint with a daily function. A small plant, a decorative tray, or a second organizer where you already have one is not saving space - it is adding clutter with aesthetic intent. Save decorative accessories for larger desks where surface area is not a constraint.",
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

        {/* All 12 accessories by category */}
        <section id="reviews" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">
            All 12 Small Desk Accessories: Full Reviews
          </h2>
          <p className="text-sm text-ink-secondary mb-8">
            Grouped by category. Each entry includes footprint, best use case, why it works for small desks, and honest tradeoffs.
          </p>

          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat];
            const items = accessories.filter((a) => a.category === cat);
            return (
              <div key={cat} className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{meta.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-ink">{meta.label}</h3>
                    <p className="text-sm text-ink-secondary">{meta.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {items.map((item) => {
                    const colors = item.badge ? badgeColors[item.badge] : null;
                    return (
                      <div
                        key={item.rank}
                        id={`accessory-${item.rank}`}
                        className="p-5 rounded-2xl border border-border bg-white scroll-mt-20"
                      >
                        {/* Card header */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-start gap-3">
                            <span className="w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {item.rank}
                            </span>
                            <div>
                              {item.badge && colors && (
                                <span
                                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1"
                                  style={{ background: colors.bg, color: colors.text }}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <h4 className="text-base font-bold text-ink leading-tight">{item.name}</h4>
                              <p className="text-xs text-ink-muted mt-0.5">
                                Footprint: {item.footprint}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <div
                                className="text-sm font-bold px-2.5 py-1 rounded-lg tabular-nums inline-block"
                                style={{
                                  background: item.score >= 8.8 ? "#dcfce7" : item.score >= 8.5 ? "#fef9c3" : "#f3f4f6",
                                  color: item.score >= 8.8 ? "#5f7a4a" : item.score >= 8.5 ? "#a8875a" : "#374151",
                                }}
                              >
                                {item.score.toFixed(1)}
                              </div>
                            </div>
                            <a
                              href={item.amazonUrl}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="text-xs font-bold px-3 py-2 rounded-lg text-white whitespace-nowrap inline-block"
                              style={{ background: "#FF9900" }}
                            >
                              View on Amazon
                            </a>
                          </div>
                        </div>

                        {/* Best for */}
                        <p className="text-xs font-semibold text-brand mb-2 uppercase tracking-wide">
                          Best for: {item.bestFor}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Why it works / Tradeoffs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-bold text-ink uppercase tracking-wide mb-2">Why it works</p>
                            <ul className="space-y-1">
                              {item.whyItWorks.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                                  <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-ink uppercase tracking-wide mb-2">Tradeoffs</p>
                            <ul className="space-y-1">
                              {item.tradeoffs.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                                  <span className="text-amber-500 mt-0.5 shrink-0">&#9888;</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* Comparison table */}
        <section id="comparison" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Accessory</th>
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Footprint</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {accessories.map((item, i) => (
                  <tr key={item.rank} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">{item.rank}</span>
                        <span className="leading-snug">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{item.categoryLabel}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{item.footprint}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-block text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums"
                        style={{
                          background: item.score >= 8.8 ? "#dcfce7" : item.score >= 8.5 ? "#fef9c3" : "#f3f4f6",
                          color: item.score >= 8.8 ? "#5f7a4a" : item.score >= 8.5 ? "#a8875a" : "#374151",
                        }}
                      >
                        {item.score.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={item.amazonUrl}
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

        {/* Budget combos */}
        <section id="budget-combos" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">
            Setup Combinations by Budget
          </h2>
          <p className="text-sm text-ink-secondary mb-6">
            If you want a complete small desk upgrade rather than one-off purchases, these three combinations cover different budgets with no overlap in function.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {setupCombos.map((combo) => (
              <div key={combo.label} className="p-5 rounded-2xl border border-border bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">{combo.label}</p>
                <p className="text-xs text-ink-secondary mb-4 italic">{combo.tagline}</p>
                <ul className="space-y-2">
                  {combo.items.map((ci) => (
                    <li key={ci.name} className="flex items-start justify-between gap-2 text-xs">
                      <span className="text-ink-secondary leading-snug">{ci.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How we evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Accessories</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Each accessory was assessed across four criteria weighted for small desk and dorm room constraints:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Footprint efficiency", "How much desktop, under-desk, or vertical space does the accessory consume relative to what it provides? Zero-footprint accessories (mounted, clipped, vertical) score highest."],
              ["Build quality and durability", "Material quality, weight capacity, and expected lifespan based on Amazon verified buyer review patterns and manufacturer specifications."],
              ["Setup simplicity", "Whether installation requires drilling, permanent adhesive, or complex assembly. Clamp-on and freestanding options score higher for renters and dorm setups."],
              ["Value for price", "Features delivered per dollar. Budget accessories need to deliver a clear daily function without requiring replacement within a year. The compact mesh organizer scores well here at under $18."],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            This guide reflects research across published specifications, manufacturer documentation, and analysis of verified Amazon buyer review patterns. Where observations reference buyer experience, they are based on review pattern analysis, not individual testing claims.
          </p>
        </section>

        {/* FAQ */}
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

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all small desk accessories on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=small+desk+accessories&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z"/>
            </svg>
            Shop Desk Accessories on Amazon
          </a>
        </div>

        {/* Related guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/best-small-keyboards", title: "Best Small Keyboards for Compact Desks", label: "Desk Setup" },
              { href: "/guide/desk-lamps-small-desks", title: "Best Desk Lamps for Small Desks", label: "Desk Setup" },
            ].map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="group p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-1">{g.label}</span>
                <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors leading-snug">{g.title}</p>
                <span className="text-xs font-semibold text-brand mt-2 inline-block">Read guide &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

      </Container>
    </>
  );
}
