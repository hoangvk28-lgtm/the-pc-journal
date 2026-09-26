import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription, metaTitle, metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  stands,
  quickPicks,
  scoringCriteria,
  byDeskSize,
  faq,
  type HeadphoneStand,
} from "@/data/guides/best-headphone-stand-desk";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-headphone-stand-desk",
  image: fallbackHeroImage,
  type: "article",
});

function ScoreChip({ score }: { score: number }) {
  const bg = score >= 9.0 ? "#dcfce7" : score >= 8.5 ? "#fef9c3" : "#f3f4f6";
  const color = score >= 9.0 ? "#5f7a4a" : score >= 8.5 ? "#a8875a" : "#374151";
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums" style={{ background: bg, color }}>
      {score.toFixed(1)}
    </span>
  );
}

const mountLabel: Record<string, string> = {
  desktop: "Desktop",
  "under-desk": "Under-Desk",
  clamp: "Clamp-On",
};

const mountBadge: Record<string, { bg: string; text: string }> = {
  desktop: { bg: "#eef2ff", text: "#3730a3" },
  "under-desk": { bg: "#eef3e7", text: "#48602f" },
  clamp: { bg: "#fff7ed", text: "#c2410c" },
};

function StandCard({ stand }: { stand: HeadphoneStand }) {
  const badge = mountBadge[stand.mount];
  return (
    <div id={stand.id} className="rounded-2xl border border-border bg-white overflow-hidden scroll-mt-20">
      {/* Mount style banner */}
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: badge.bg }}>
        <span className="text-xs font-bold" style={{ color: badge.text }}>
          {mountLabel[stand.mount]}
        </span>
        {stand.badge && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: badge.text }}>
            {stand.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {/* Image */}
        <div className="sm:w-36 sm:shrink-0">
          <Image
            src={stand.imageUrl}
            alt={stand.name}
            width={144}
            height={144}
            className="w-full sm:w-36 h-36 object-contain rounded-xl bg-gray-50"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <span className="text-xs font-bold text-ink-muted mr-2">#{stand.rank}</span>
              <span className="font-bold text-ink text-base leading-snug">{stand.name}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <ScoreChip score={stand.score} />
              <a
                href={stand.amazonUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
                style={{ background: "#FF9900" }}
              >
                View on Amazon
              </a>
            </div>
          </div>

          <p className="text-xs text-ink-muted mb-1">
            Footprint: {stand.footprint} &middot; {stand.features}
          </p>
          <p className="text-xs text-ink-secondary italic mb-3">Best for: {stand.bestFor}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Why it earns its footprint</p>
              <ul className="space-y-1">
                {stand.whyItWorks.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500 shrink-0 mt-0.5">
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
                {stand.tradeoffs.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-amber-400 shrink-0 mt-0.5">
                      <path d="M6 2v5M6 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {stand.redditNote && (
            <p className="mt-3 text-xs text-ink-muted italic bg-gray-50 rounded-lg px-3 py-2">
              <span className="font-semibold not-italic">Reddit:</span> {stand.redditNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function BestHeadphoneStandDeskPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-headphone-stand-desk` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-headphone-stand-desk` }] };

  const desktopStands = stands.filter((s) => s.mount === "desktop");
  const spaceStands = stands.filter((s) => s.mount !== "desktop");

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
          <span className="text-ink">Best Headphone Stands</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Buying Guide</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
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
              8 headphone stands evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              Based on Amazon ratings from verified buyers
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImg}
            alt="Best headphone stands for desk setups"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Intro */}
        <section className="mb-6">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            A headphone stand has one job: keep your headphones off the desk without becoming desk clutter itself. That sounds simple until you realize most headphone stands occupy 4–6 inches of surface area for a product you use twice a day -- once to pick up your headphones, once to put them back.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            On a small desk, that footprint matters. We evaluated 8 headphone stands across three mounting styles -- desktop, under-desk, and clamp-on -- and scored them on how well they earn their space. Some do more than hold headphones: they charge your phone, add USB ports, or disappear under the desk entirely.
          </p>
        </section>

        {/* Quick Picks (At a Glance) */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-4">Quick Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickPicks.map((pick) => (
              <a
                key={pick.id}
                href={`#${pick.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white hover:border-amber-400 transition-colors"
              >
                <span className="text-xl shrink-0">{pick.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide">{pick.label}</p>
                  <p className="font-semibold text-ink text-sm leading-snug truncate">{pick.name}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <ScoreChip score={pick.score} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Jump Nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#how-we-scored", label: "How we scored" },
            { href: "#mount-styles", label: "Mounting styles" },
            { href: "#reviews", label: "Full reviews" },
            { href: "#comparison", label: "Comparison table" },
            { href: "#by-desk-size", label: "By desk size" },
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

        {/* How We Scored */}
        <section id="how-we-scored" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">How We Scored</h2>
          <p className="text-sm text-ink-secondary mb-4">
            Most headphone stand reviews score on aesthetics and build quality alone. That misses the point for compact desk setups. We scored on five criteria weighted for real desk impact:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scoringCriteria.map((c) => (
              <div key={c.label} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <div className="w-12 shrink-0 text-center">
                  <span className="text-sm font-bold text-brand">{c.weight}</span>
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{c.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mounting Styles */}
        <section id="mount-styles" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Three Mounting Styles: Which Fits Your Desk?</h2>
          <p className="text-sm text-ink-secondary mb-5">Before picking a stand, pick a style. Each solves the headphone problem differently.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                style: "Desktop Stand",
                badge: "desktop",
                footprint: "3–5\" of desk surface",
                bestFor: "Users who want headphones visible and accessible; stands with USB hubs or chargers",
                tradeoff: "Takes desk space",
                icon: "🗂️",
              },
              {
                style: "Under-Desk Hook",
                badge: "under-desk",
                footprint: "Zero desk surface",
                bestFor: "Small desks, minimalists, users who want headphones hidden",
                tradeoff: "Headphones hang below -- not visible",
                icon: "🪝",
              },
              {
                style: "Clamp-On",
                badge: "clamp",
                footprint: "Zero desk surface (edge only)",
                bestFor: "Users who want headphones at desk level but off the surface",
                tradeoff: "Requires desk edge 0.5–2 inches thick",
                icon: "🔩",
              },
            ].map((m) => {
              const s = mountBadge[m.badge];
              return (
                <div key={m.style} className="p-4 rounded-xl border bg-white" style={{ borderColor: s.bg }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{m.icon}</span>
                    <span className="font-bold text-sm" style={{ color: s.text }}>{m.style}</span>
                  </div>
                  <div className="space-y-2 text-xs text-ink-secondary">
                    <p><span className="font-semibold text-ink">Footprint:</span> {m.footprint}</p>
                    <p><span className="font-semibold text-ink">Best for:</span> {m.bestFor}</p>
                    <p><span className="font-semibold text-ink">Tradeoff:</span> {m.tradeoff}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full Reviews */}
        <section id="reviews" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Full Reviews: All 8 Headphone Stands</h2>

          {/* Desktop section */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full" style={{ background: mountBadge.desktop.text }} />
              <h3 className="text-base font-bold text-ink">Desktop Stands</h3>
            </div>
            <div className="space-y-4">
              {desktopStands.map((s) => <StandCard key={s.id} stand={s} />)}
            </div>
          </div>

          {/* Space-saving section */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full" style={{ background: mountBadge["under-desk"].text }} />
              <h3 className="text-base font-bold text-ink">Space-Saving Alternatives (Zero Desktop Footprint)</h3>
            </div>
            <div className="space-y-4">
              {spaceStands.map((s) => <StandCard key={s.id} stand={s} />)}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Stand</th>
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Footprint</th>
                  <th className="text-left px-4 py-3 font-semibold">Features</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {stands.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">{s.rank}</span>
                        <a href={`#${s.id}`} className="hover:text-brand transition-colors">{s.name}</a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: mountBadge[s.mount].bg, color: mountBadge[s.mount].text }}>
                        {mountLabel[s.mount]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">{s.footprint}</td>
                    <td className="px-4 py-3 text-ink-secondary">{s.features}</td>
                    <td className="px-4 py-3 text-center"><ScoreChip score={s.score} /></td>
                    <td className="px-4 py-3">
                      <a
                        href={s.amazonUrl}
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
        </section>

        {/* How to Choose by Desk Size */}
        <section id="by-desk-size" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">How to Choose: By Desk Size and Use Case</h2>
          <div className="space-y-5">
            {byDeskSize.map((group) => (
              <div key={group.size} className="rounded-xl border border-border bg-white overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 border-b border-border">
                  <p className="font-bold text-ink">{group.size}</p>
                  <p className="text-xs text-ink-muted mt-0.5">Priority: {group.priority}</p>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {group.picks.map((pick) => (
                      <a key={pick.id} href={`#${pick.id}`} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-amber-400 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-500 shrink-0 mt-0.5">
                          <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <p className="font-semibold text-ink text-sm">{pick.name}</p>
                          <p className="text-xs text-ink-secondary">{pick.why}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  {group.note && (
                    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{group.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How We Evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Stands</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Each stand was assessed across footprint efficiency, stability under one-handed use, build durability, bonus features, and headphone compatibility. For small desk setups, footprint efficiency was weighted most heavily -- a stand that takes 5 inches of space must justify that space with tangible value.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Desktop stands", "Evaluated on base footprint, cable storage, USB/charging features, and headband protection."],
              ["Under-desk and clamp options", "Evaluated on adhesive reliability, weight capacity, installation reversibility, and accessibility."],
              ["Build quality", "Materials, finish, and documented buyer feedback after 6+ months of daily use."],
              ["Value per dollar", "Features delivered per dollar -- a $12 stand that holds two pairs outperforms a $30 stand with identical features."],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            This guide reflects research across published specifications, manufacturer documentation, and analysis of verified Amazon buyer review patterns. Scores reflect our analysis relative to category expectations at each price point.
          </p>
        </section>

        {/* DIY callout */}
        <section className="mb-12 p-5 rounded-2xl border border-border bg-white">
          <h2 className="text-base font-bold text-ink mb-2">What About DIY and 3D-Printed Stands?</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            Sites like Thingiverse and Printables have hundreds of free headphone stand designs. If you own a 3D printer, printing a stand costs $2&ndash;$5 in filament. The result is fully customizable but won&apos;t have USB ports, charging, or cable management.
          </p>
          <p className="text-xs text-ink-muted italic">
            Our take: if you already own a printer, print one to test whether you like having a stand at all. If you don&apos;t own a printer, the New Bee ($12) costs less than most filament rolls.
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

        {/* Final Verdict */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">Final Verdict</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-5 rounded-2xl border border-green-200 bg-green-50">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Under $15</p>
              <p className="font-bold text-ink text-sm mb-1">&quot;Just need headphones off the desk&quot;</p>
              <p className="text-xs text-ink-secondary mb-3">
                Hidden: <a href="#elevation-lab-anchor" className="text-green-700 font-semibold hover:underline">Elevation Lab Anchor</a><br />
                Visible: <a href="#new-bee-aluminum" className="text-green-700 font-semibold hover:underline">New Bee Aluminum</a>
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">$25–$35</p>
              <p className="font-bold text-ink text-sm mb-1">&quot;A stand that does more&quot;</p>
              <p className="text-xs text-ink-secondary mb-3">
                <a href="#cozoo-usb-stand" className="text-amber-700 font-semibold hover:underline">Cozoo USB Stand</a> -- headphone stand + USB hub + AC outlets in one footprint
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">$60–$75</p>
              <p className="font-bold text-ink text-sm mb-1">&quot;Gaming + ecosystem&quot;</p>
              <p className="text-xs text-ink-secondary mb-3">
                <a href="#razer-base-station-v2" className="text-slate-700 font-semibold hover:underline">Razer Base Station V2</a> -- RGB + USB hub + DAC
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-ink text-sm mb-2">The honest truth</p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              The best headphone stand is the one that earns its footprint. On a small desk, that means zero-footprint hooks. On a medium desk, that means dual-function stands with USB ports. On a large desk, that means whatever looks best next to your setup. At $10–$35 for most options, a headphone stand is one of the cheapest desk upgrades that makes a visible difference every day.
            </p>
          </div>
        </section>

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all headphone stands on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=headphone+stand+desk&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Headphone Stands on Amazon
          </a>
        </div>

        {/* Related Guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/best-small-desk-accessories", title: "12 Best Small Desk Accessories That Actually Save Space", label: "Desk Setup" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under Desk Cable Trays for Clean Setups", label: "Desk Setup" },
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
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
