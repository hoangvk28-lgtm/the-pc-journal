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
  trays,
  quickPicks,
  tierMeta,
  mountMethods,
  scoringCriteria,
  faq,
  type CableTray,
} from "@/data/guides/best-under-desk-cable-trays";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-under-desk-cable-trays",
  image: fallbackHeroImage,
  type: "article",
});

function TrayCard({ tray }: { tray: CableTray }) {
  return (
    <div id={tray.id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-border bg-white scroll-mt-20">
      {tray.imageUrl && (
        <div className="sm:w-36 sm:shrink-0">
          <Image
            src={tray.imageUrl}
            alt={tray.name}
            width={144}
            height={144}
            className="w-full sm:w-36 h-36 object-contain rounded-lg bg-gray-50"
            unoptimized
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold text-ink-muted">#{tray.rank}</span>
              {tray.badge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{tray.badge}</span>
              )}
            </div>
            <p className="font-bold text-ink leading-snug">{tray.name}</p>
            <p className="text-xs text-ink-muted mt-0.5">{tray.mountLabel} &middot; {tray.cableCapacity}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span
              className="text-sm font-bold px-2 py-0.5 rounded-lg tabular-nums"
              style={{
                background: tray.score >= 9.0 ? "#dcfce7" : tray.score >= 8.5 ? "#fef9c3" : "#f3f4f6",
                color: tray.score >= 9.0 ? "#5f7a4a" : tray.score >= 8.5 ? "#a8875a" : "#374151",
              }}
            >
              {tray.score.toFixed(1)}
            </span>
            <a
              href={tray.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
              style={{ background: "#FF9900" }}
            >
              View on Amazon
            </a>
          </div>
        </div>
        <p className="text-xs text-ink-secondary mb-3 italic">Best for: {tray.bestFor}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Why it works</p>
            <ul className="space-y-1">
              {tray.whyItWorks.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500 shrink-0 mt-0.5" style={{ flexShrink: 0 }}>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Tradeoffs</p>
            <ul className="space-y-1">
              {tray.tradeoffs.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-amber-400 shrink-0 mt-0.5" style={{ flexShrink: 0 }}>
                    <path d="M6 2v5M6 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function BestUnderDeskCableTraysPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-under-desk-cable-trays` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-under-desk-cable-trays` }] };

  const budgetTrays = trays.filter((t) => t.tier === "budget");
  const midRangeTrays = trays.filter((t) => t.tier === "mid-range");
  const premiumTrays = trays.filter((t) => t.tier === "premium" || t.tier === "specialty");
  const premiumPlusTrays = trays.filter((t) => t.tier === "premium-plus");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
      {/* Hero */}
      <div className="w-full overflow-hidden bg-gray-100">
        <Image
          src={heroImg}
          alt="Under desk cable tray setup"
          width={900}
          height={420}
          className="w-full h-auto object-contain"
          priority
          unoptimized
        />
      </div>

      <Container className="py-10 max-w-3xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-4">
            {guideTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted mb-4">
            <span>Updated {lastUpdated}</span>
            <span>&middot;</span>
            <span>{readTime} read</span>
            <span>&middot;</span>
            <span>By Jamie Cole</span>
          </div>
          <p className="text-ink-secondary text-base leading-relaxed">{guideDescription}</p>
        </header>

        {/* Quick Picks */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">Quick Picks by Situation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickPicks.map((pick) => (
              <a
                key={pick.id}
                href={`#${pick.id}`}
                className="block p-4 rounded-xl border border-border bg-white hover:border-amber-400 transition-colors"
              >
                <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide mb-1">{pick.situation}</p>
                <p className="font-semibold text-ink text-sm leading-snug mb-1">{pick.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">{pick.score.toFixed(1)}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="prose prose-sm max-w-none text-ink-secondary mb-10">
          <p>
            Cable clutter under a desk is one of the most common complaints in any home office or dorm room setup. A power strip sitting on the floor, cables looping from the desk to the wall, and a visible nest behind the monitor - these are fixable with the right under-desk cable tray. The challenge is choosing between adhesive, screw, and clamp mounting, matching the tray depth to your cable count, and finding a product that actually holds up past the first month.
          </p>
          <p>
            This guide covers 10 cable trays from $12 to $310, organized by budget tier. Whether you are renting (no drilling allowed), using a glass desk, running 20+ cables from a standing desk, or just want the cheapest option that works - there is a specific recommendation below.
            If you also want to add concealed storage under the desk surface, see our guide to{" "}
            <Link prefetch={false}
              href="/guide/best-clamp-on-desk-drawers"
              className="text-brand hover:underline"
            >
              clamp-on desk drawers
            </Link>.
          </p>
        </section>

        {/* How We Evaluated */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">How We Evaluated These Trays</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scoringCriteria.map((c) => (
              <div key={c.label} className="p-4 rounded-xl bg-white border border-border">
                <p className="font-bold text-ink text-sm mb-1">{c.label} <span className="font-normal text-ink-muted">({c.weight})</span></p>
                <p className="text-xs text-ink-secondary">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Budget Tier */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ink">Budget Picks</h2>
            <span className="text-xs font-semibold text-ink-muted bg-gray-100 px-2 py-1 rounded">{tierMeta.budget.range}</span>
          </div>
          <div className="space-y-4">
            {budgetTrays.map((t) => <TrayCard key={t.id} tray={t} />)}
          </div>
        </section>

        {/* Mid-Range Tier */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ink">Mid-Range Picks</h2>
            <span className="text-xs font-semibold text-ink-muted bg-gray-100 px-2 py-1 rounded">{tierMeta["mid-range"].range}</span>
          </div>
          <div className="space-y-4">
            {midRangeTrays.map((t) => <TrayCard key={t.id} tray={t} />)}
          </div>
        </section>

        {/* Premium / Specialty */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ink">Premium and No-Drill Picks</h2>
            <span className="text-xs font-semibold text-ink-muted bg-gray-100 px-2 py-1 rounded">{tierMeta.premium.range}</span>
          </div>
          <div className="space-y-4">
            {premiumTrays.map((t) => <TrayCard key={t.id} tray={t} />)}
          </div>
        </section>

        {/* Premium+ */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ink">Premium+ Picks</h2>
            <span className="text-xs font-semibold text-ink-muted bg-gray-100 px-2 py-1 rounded">{tierMeta["premium-plus"].range}</span>
          </div>
          <div className="space-y-4">
            {premiumPlusTrays.map((t) => <TrayCard key={t.id} tray={t} />)}
          </div>
        </section>

        {/* Mounting Methods Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">Mounting Methods Compared</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Method</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Install Time</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Reversible?</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Best For</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Tradeoff</th>
                </tr>
              </thead>
              <tbody>
                {mountMethods.map((m, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 font-semibold text-ink border-b border-border">{m.method}</td>
                    <td className="p-3 text-ink-secondary border-b border-border">{m.time}</td>
                    <td className="p-3 text-ink-secondary border-b border-border">{m.reversible}</td>
                    <td className="p-3 text-ink-secondary border-b border-border">{m.bestFor}</td>
                    <td className="p-3 text-ink-secondary border-b border-border">{m.tradeoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">Which Tray Is Right for Your Setup?</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-border bg-white">
              <p className="font-bold text-ink text-sm mb-1">You have a glass desk (no drilling)</p>
              <p className="text-sm text-ink-secondary">Use a clamp-on tray. The <a href="#scandinavian-hub-clamp" className="text-amber-600 font-semibold hover:underline">Scandinavian Hub Clamp Tray</a> is the top pick - it works on glass and thick laminate and holds 20+ lbs without sagging.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <p className="font-bold text-ink text-sm mb-1">You are renting (no permanent holes)</p>
              <p className="text-sm text-ink-secondary">Use an adhesive tray. The <a href="#no-drill-adhesive-cable-tray" className="text-amber-600 font-semibold hover:underline">No-Drill Adhesive Tray</a> holds 15+ lbs on most wood desks and can optionally add screws later for permanent installs. Budget option: <a href="#qiaoyoubang-wire-rack" className="text-amber-600 font-semibold hover:underline">QiaoYoubang 2-pack</a>.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <p className="font-bold text-ink text-sm mb-1">You have a standing desk</p>
              <p className="text-sm text-ink-secondary">Use a clamp-on tray that attaches to the desk frame, not the desktop, so it moves during height adjustments. The <a href="#stand-up-desk-store-clamp" className="text-amber-600 font-semibold hover:underline">Stand Up Desk Store Clamp Tray</a> is designed specifically for this. Leave 18 inches of cable slack per 12 inches of height adjustment range.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <p className="font-bold text-ink text-sm mb-1">You have large power bricks or laptop chargers</p>
              <p className="text-sm text-ink-secondary">Standard trays (2-3 inches deep) will not contain them. Use the <a href="#vivo-extra-deep" className="text-amber-600 font-semibold hover:underline">VIVO Extra Deep Tray</a> (4+ inch depth) or the BTOD Ultimate Cable Box for complete enclosure.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-white">
              <p className="font-bold text-ink text-sm mb-1">You want cables completely hidden from all angles</p>
              <p className="text-sm text-ink-secondary">Only two options fully enclose cables: <a href="#humanscale-neattech" className="text-amber-600 font-semibold hover:underline">Humanscale NeatTech</a> ($120-150, drop-down door) and <a href="#btod-ultimate-cable-box" className="text-amber-600 font-semibold hover:underline">BTOD Ultimate Box</a> ($240+, solid metal enclosure). All other trays show cables through mesh or netting from below.</p>
            </div>
          </div>
        </section>

        {/* Full Comparison Table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">Full Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Tray</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Score</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Mount</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {trays.map((t, i) => (
                  <tr key={t.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 border-b border-border">
                      <a href={`#${t.id}`} className="font-semibold text-ink hover:text-amber-600 transition-colors">
                        {t.badge ? <><span className="text-xs text-amber-600 font-bold mr-1">[{t.badge}]</span>{t.name}</> : t.name}
                      </a>
                    </td>
                    <td className="p-3 border-b border-border">
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded tabular-nums"
                        style={{
                          background: t.score >= 9.0 ? "#dcfce7" : t.score >= 8.5 ? "#fef9c3" : "#f3f4f6",
                          color: t.score >= 9.0 ? "#5f7a4a" : t.score >= 8.5 ? "#a8875a" : "#374151",
                        }}
                      >
                        {t.score.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-3 text-ink-secondary border-b border-border">{t.mountLabel}</td>
                    <td className="p-3 text-ink-secondary border-b border-border">{t.cableCapacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-bold text-ink mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-10 p-8 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-ink mb-3">Final Verdict</h2>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-2xl mb-4">
              For most wood desk setups: the <strong>No-Drill Adhesive Tray</strong> at $34-44 is the best single purchase - strong adhesive, 15+ lb capacity, and easy installation with no commitment to screw holes. On a tighter budget, the <strong>QiaoYoubang 2-pack</strong> at $18-25 covers most desks with two open-mesh trays. For glass desks and standing desks, the <strong>Scandinavian Hub Clamp Tray</strong> is the only correct choice - adhesive will not hold on glass. If you need cables completely hidden, budget for the <strong>Humanscale NeatTech</strong> ($120-150) or the <strong>BTOD Ultimate Box</strong> ($240+).
            </p>
            <a
              href="#no-drill-adhesive-cable-tray"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
              style={{ background: "#FF9900" }}
            >
              See Best Overall Pick
            </a>
          </div>
        </section>
      </Container>
    </main>
    </>
  );
}
