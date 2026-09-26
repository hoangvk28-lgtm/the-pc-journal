import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, atAGlanceItems,
  sittingDurationRows, heightMatchRows, smallDeskRows, warrantyRows, faq,
  type BudgetChair,
} from "@/data/guides/best-office-chair-under-100";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-office-chair-under-100",
  image: fallbackHeroImage, type: "article",
});

function ChairSection({ chair }: { chair: BudgetChair }) {
  return (
    <section id={chair.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">{chair.badge}</span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{chair.name}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a href={chair.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-56 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={chair.imageUrl} alt={chair.name} width={220} height={220} className="object-contain w-full h-full p-3" unoptimized />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{chair.bestFor}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{chair.whyItWins}</p>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{chair.bodyParagraph}</p>
            <a href={chair.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity w-fit mt-auto"
              style={{ background: "#FF9900" }}>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
              </svg>
              Check price on Amazon
            </a>
          </div>
        </div>
        <div className="border-t border-border grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-ink mb-3">Specs</p>
            <ul className="space-y-1.5">
              {chair.specs.map((spec, i) => <li key={i} className="text-xs text-ink-secondary"><span className="font-semibold text-ink">{spec.label}:</span> {spec.value}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {chair.pros.map((pro, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>{pro}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {chair.cons.map((con, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>{con}</li>)}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border"><span className="font-semibold text-ink">Best for:</span> {chair.bestForDetail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestOfficeChairUnder100Page() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-04", dateModified: "2026-06-04", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-office-chair-under-100` }, about: [{ "@type": "Thing", name: "Office Chair" }, { "@type": "Thing", name: "Budget Desk Chair" }, { "@type": "Thing", name: "Dorm Room Furniture" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Office Chair Under $100", item: `${SITE_URL}/guide/best-office-chair-under-100` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Office Chairs Under $100 2026", numberOfItems: 9, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-office-chair-under-100#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Best Office Chair Under $100</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Budget Guide</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated June 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">{guideTitle}</h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">{guideDescription}</p>
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              6 picks + height guide, small desk compatibility, warranty reference
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best office chairs under $100" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best For</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.bestFor}</td>
                    <td className="px-4 py-3"><a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>A $100 office chair used to mean a stiff, non-adjustable seat that hurt your back within an hour. That is no longer true. The budget office chair market in 2026 has enough legitimate options -- mesh backs, lumbar support, adjustable armrests -- that you do not need to spend $300 to sit comfortably for a full study or work session.</p>
          <p>The problem is that most chairs in this range look similar in the listing photos. Same high-back mesh shape, same five-star base, same claim of &quot;ergonomic lumbar support.&quot; This guide compares six picks across different use cases -- from dorm rooms to home office desks -- so you can find the one that actually fits your setup and sitting habits.</p>
        </section>

        {/* What Ergonomic Means */}
        <section className="mb-12 scroll-mt-20" id="ergonomic-guide">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">What &quot;Ergonomic&quot; Actually Means Under $100</h2>
          <p className="text-sm text-ink-secondary mb-5">At this price point, &quot;ergonomic&quot; is a marketing word, not a certification. Here is what it actually means in practice:</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Meaningful (worth paying for)", color: "#5f7a4a", items: ["Adjustable lumbar support -- moves up/down or in/out", "Height-adjustable seat -- fits different desk heights", "Adjustable armrests -- especially flip-up or 3D", "Seat depth -- deeper fits taller, shallower fits shorter"] },
              { label: "Sounds good, matters less", color: "#a8875a", items: ["'Headrest' -- most too low to be useful unless reclining", "'Breathable mesh' -- mesh quality varies a lot", "'Tilt lock' -- useful, but standard on most chairs here"] },
              { label: "What most under-$100 chairs cannot do", color: "#dc2626", items: ["Adjust seat depth (slide forward/back)", "True 4D armrests (all axes)", "Meaningful recline beyond 120°"] },
            ].map((col, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-white">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: col.color }}>{col.label}</p>
                <ul className="space-y-1.5">
                  {col.items.map((item, j) => <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: col.color }} />{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10"><h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 6 Picks at a Glance</h2><AtAGlance items={atAGlanceItems} /></section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[{ href: "#ergonomic-guide", label: "What ergonomic means" }, { href: "#best-overall", label: "Best Overall" }, { href: "#best-mesh", label: "Best Mesh" }, { href: "#best-ergonomic", label: "Best Ergonomic" }, { href: "#best-dorms", label: "Best for Dorms" }, { href: "#best-leather", label: "Best Aesthetic" }, { href: "#best-budget", label: "Best Budget" }, { href: "#how-to-choose", label: "How to choose" }, { href: "#faq", label: "FAQ" }].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Office Chairs Under $100</h2>
        {products.map((chair) => <ChairSection key={chair.id} chair={chair} />)}

        {/* How to Choose */}
        <div id="how-to-choose" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">How to Choose an Office Chair Under $100</h2>

          {/* By sitting duration */}
          <section className="mb-10">
            <h3 className="text-lg font-bold text-ink mb-3">By Sitting Duration</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Daily sitting time</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Minimum features needed</th>
                  <th className="text-left px-4 py-3 font-semibold">Best pick</th>
                </tr></thead>
                <tbody>
                  {sittingDurationRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-semibold text-ink">{row.duration}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.minimum}</td>
                      <td className="px-4 py-3"><a href={`#${row.id}`} className="text-xs font-bold text-brand hover:underline">{row.pick}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-muted px-1">No chair under $100 is designed for 8+ hours of daily use over multiple years. At that usage level, investing more upfront saves money on back problems later.</p>
          </section>

          {/* By room type */}
          <section className="mb-10">
            <h3 className="text-lg font-bold text-ink mb-3">By Room Type</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { room: "Dorm room", rec: "Amazon Basics -- compact, reliable, fits under standard dorm desks.", id: "#best-dorms" },
                { room: "Home office (visible on video calls)", rec: "Sweetcrispy -- leather-look aesthetic works better on camera than mesh.", id: "#best-leather" },
                { room: "Hot apartment or small room", rec: "Flysky -- mesh provides airflow that padded alternatives cannot.", id: "#best-mesh" },
                { room: "Dedicated desk setup (ergonomics first)", rec: "CLATINA -- most adjustment options, best lumbar system in this price range.", id: "#best-overall" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white">
                  <span className="font-bold text-brand text-xs shrink-0 mt-0.5">{item.room}:</span>
                  <p className="text-xs text-ink-secondary">{item.rec}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Height matching */}
          <section className="mb-10">
            <h3 className="text-lg font-bold text-ink mb-3">Chair Height vs Your Height -- Matching Guide</h3>
            <p className="text-sm text-ink-secondary mb-4">The critical number is <strong className="text-ink">minimum seat height</strong> -- the lowest the chair can go with the pneumatic cylinder fully compressed. If that height is too tall for you, your feet will dangle, putting pressure on the back of your thighs.</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Your height</th>
                  <th className="text-left px-4 py-3 font-semibold">Ideal seat height</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Which picks work</th>
                </tr></thead>
                <tbody>
                  {heightMatchRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.height}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.seatHeight}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.picks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-muted px-1">Practical check: Measure from the floor to the back of your knee while seated. That number is your ideal seat height.</p>
          </section>

          {/* Small desk compatibility */}
          <section className="mb-10">
            <h3 className="text-lg font-bold text-ink mb-3">Small Desk Compatibility -- What Competitors Don&apos;t Tell You</h3>
            <p className="text-sm text-ink-secondary mb-4">For small desks (under 100 cm wide) or dorm desks, the <strong className="text-ink">armrest width and flip-up capability</strong> matter more than most buyers realize. Standard office chairs have armrests that extend beyond the seat width -- when you push the chair under a small desk, the armrests hit the desk edge.</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Chair</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Armrest type</th>
                  <th className="text-left px-4 py-3 font-semibold">Slides under small desk?</th>
                </tr></thead>
                <tbody>
                  {smallDeskRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.chair}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.armType}</td>
                      <td className={`px-4 py-3 text-xs font-medium ${row.fits.startsWith("Yes") ? "text-cta" : row.fits.startsWith("Cannot") ? "text-red-600" : "text-amber-600"}`}>{row.fits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-bg border border-brand/20 text-xs text-ink-secondary">
              <strong className="text-ink">For dorm desks or IKEA desks (MICKE, ALEX, LINNMON):</strong> The Flysky or Sweetcrispy with flip-up arms is the right choice. The arms fold flat, the chair slides fully under, and the desk surface is clear when you stand.
            </div>
          </section>

          {/* When to spend more */}
          <section className="mb-10">
            <h3 className="text-lg font-bold text-ink mb-3">When to Spend More Than $100</h3>
            <p className="text-sm text-ink-secondary mb-4">No chair under $100 is designed for 8+ hours of daily use over 3+ years. If any of these apply to you, the $100 budget is too low:</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Situation</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Why $100 isn&apos;t enough</th>
                  <th className="text-left px-4 py-3 font-semibold">Consider</th>
                </tr></thead>
                <tbody>
                  {[
                    { situation: "Sitting 7+ hours daily", why: "Foam compresses in 6--12 months", consider: "$150--200 range" },
                    { situation: "Chronic lower back pain", why: "Fixed lumbar won't adapt to your needs", consider: "$200+ with adjustable lumbar depth" },
                    { situation: "Over 230 lbs", why: "Weight rating is borderline on most picks", consider: "Sweetcrispy (280 lb) or $150+" },
                    { situation: "Remote work (daily video calls)", why: "Camera-facing appearance matters", consider: "Sweetcrispy leather-look or $150+" },
                    { situation: "3+ year expected use", why: "Budget mesh degrades faster than expected", consider: "$200+" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.situation}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.why}</td>
                      <td className="px-4 py-3 text-xs font-bold text-brand">{row.consider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary">The honest calculation: a $90 chair that needs replacing in 18 months costs $60/year. A $180 chair that lasts 5 years costs $36/year. If you sit daily, spending more upfront is cheaper long-term.</p>
          </section>
        </div>

        {/* Warranty */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Warranty Quick Reference</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Chair</th>
                <th className="text-left px-4 py-3 font-semibold">Warranty</th>
                <th className="text-left px-4 py-3 font-semibold">Return window</th>
              </tr></thead>
              <tbody>
                {warrantyRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">{row.chair}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.warranty}</td>
                    <td className="px-4 py-3 text-xs font-medium text-cta">{row.returnWindow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted px-1">Amazon&apos;s 30-day return window is your real protection on budget chairs. If the chair is uncomfortable or defective, return it within 30 days. Do not assemble the chair on a surface that leaves marks on the box if you think you might return it.</p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-bold text-ink text-sm mb-2">{item.question}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Bottom Line</h2>
          <div className="space-y-4">
            {[
              { product: "CLATINA", context: "For most buyers in this price range", verdict: "is the best pick -- it has the most adjustment options and the only truly independent lumbar support under $100. If you sit 4--6 hours daily, this is worth the ~$85--95 price.", href: "#best-overall" },
              { product: "Amazon Basics Office Task Chair", context: "For dorm rooms and small spaces", verdict: "is more practical -- compact enough to fit in tight spaces, reliable Amazon Basics build quality, and a lower price.", href: "#best-dorms" },
              { product: "FDW", context: "For buyers who want the lowest possible spend with a functional chair", verdict: "at ~$55--65 covers the basics.", href: "#best-budget" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary"><strong className="text-ink">{item.context}:</strong> the{" "}<a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse office chairs under $100 on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">Mesh, leather-look, ergonomic -- all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=office+chair+under+100+ergonomic&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/ergonomic-desk-setup", title: "Ergonomic Desk Setup Guide", desc: "The correct way to position everything at your desk" },
              { href: "/guide/best-dorm-items-under-25", title: "Best Dorm Items Under $25", desc: "25 high-impact dorm essentials on a student budget" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/best-desk-lamp-under-30", title: "Best Desk Lamp Under $30", desc: "Dorm-friendly desk lamps for studying" },
            ].map((g) => (
              <Link prefetch={false} key={g.href} href={g.href} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-brand transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <div>
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">{g.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Prices checked at time of writing -- verify current Amazon price before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
