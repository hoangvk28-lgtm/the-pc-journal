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
  upgrades,
  impactTable,
  priorityGuide,
  beforeYouBuy,
  quickReference,
  faq,
  type UpgradeProduct,
} from "@/data/guides/desk-upgrades-under-100";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/desk-upgrades-under-100",
  image: fallbackHeroImage,
  type: "article",
});

// Upgrade number → accent color
const upgradeColor = (n: number) => {
  const palette = [
    { bg: "#eef2e8", text: "#5c6f4b", border: "#bfdbfe" }, // blue
    { bg: "#eef3e7", text: "#48602f", border: "#bbf7d0" }, // green
    { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" }, // orange
    { bg: "#fdf4ff", text: "#7e22ce", border: "#e9d5ff" }, // purple
    { bg: "#fefce8", text: "#a16207", border: "#fde68a" }, // yellow
    { bg: "#fff1f2", text: "#be123c", border: "#fecdd3" }, // rose
    { bg: "#eef3e7", text: "#047857", border: "#a7f3d0" }, // emerald
    { bg: "#eef2e8", text: "#1e40af", border: "#bfdbfe" }, // blue-dark
  ];
  return palette[(n - 1) % palette.length];
};

function ProductCard({ product, upgradeNum }: { product: UpgradeProduct; upgradeNum: number }) {
  const c = upgradeColor(upgradeNum);
  return (
    <div
      id={product.id}
      className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border bg-white scroll-mt-20"
      style={{ borderColor: c.border }}
    >
      {/* Image */}
      <div className="sm:w-36 sm:shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={144}
          height={144}
          className="w-full sm:w-36 h-36 object-contain rounded-xl bg-gray-50"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            {product.badge && (
              <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: c.bg, color: c.text }}>
                {product.badge}
              </span>
            )}
            <h4 className="font-bold text-ink text-base leading-snug">{product.name}</h4>
          </div>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap shrink-0"
            style={{ background: "#FF9900" }}
          >
            Check price
          </a>
        </div>

        <p className="text-sm text-ink-secondary leading-relaxed mb-3">{product.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl text-xs" style={{ background: c.bg }}>
            <p className="font-bold mb-1" style={{ color: c.text }}>Best for</p>
            <p className="text-ink-secondary">{product.bestFor}</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50">
            <p className="font-bold text-ink mb-1.5">Specs</p>
            <ul className="space-y-0.5">
              {product.specs.map((s, i) => (
                <li key={i} className="text-ink-secondary">
                  <span className="font-semibold text-ink">{s.label}:</span> {s.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {product.caveat && (
          <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
            <span className="font-semibold">Note:</span> {product.caveat}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function DeskUpgradesUnder100Page() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/desk-upgrades-under-100` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/desk-upgrades-under-100` }] };

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
          <span className="text-ink">10 Desk Upgrades Under $100</span>
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
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">{guideDescription}</p>

          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-brand" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              13 products evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
              </svg>
              All under $100
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImg}
            alt="10 desk upgrades under $100"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            Most desk upgrades fall into two categories: things you&apos;ll notice every single day, and things you&apos;ll forget you bought within a week. This guide only covers the first kind.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            We evaluated upgrades specifically for small desks (under 48 inches wide) and student/remote-work setups where the goal is maximum impact per dollar. Each of the 10 upgrades addresses a specific, measurable pain point -- more desk space, less wrist fatigue, no more cord hunting, cleaner power setup.
          </p>
        </section>

        {/* Impact vs Cost table */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-4">Impact vs. Cost -- Know What You&apos;re Buying</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Upgrade Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Daily Impact</th>
                  <th className="text-left px-4 py-3 font-semibold">Time to Feel It</th>
                  <th className="text-left px-4 py-3 font-semibold">Cost Range</th>
                </tr>
              </thead>
              <tbody>
                {impactTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.type}</td>
                    <td className="px-4 py-3">
                      <span className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className={`text-sm ${j < row.dailyImpact ? "text-amber-400" : "text-gray-200"}`}>★</span>
                        ))}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">{row.timeToFeel}</td>
                    <td className="px-4 py-3 text-ink-secondary font-medium">{row.costRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-ink-secondary">
            <span className="font-bold text-ink">Where to start if budget is tight: </span>
            Monitor arm first, always. It&apos;s the only upgrade on this list that physically recovers square inches of desk surface you can see and use.
          </div>
        </section>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#upgrades", label: "All 10 upgrades" },
            { href: "#priority", label: "Which first?" },
            { href: "#before-you-buy", label: "Before you buy" },
            { href: "#quick-reference", label: "Quick reference" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
              {label}
            </a>
          ))}
        </div>

        {/* All 10 Upgrades */}
        <section id="upgrades" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">The 10 Upgrades</h2>
          <div className="space-y-10">
            {upgrades.map((upgrade) => {
              const c = upgradeColor(upgrade.number);
              return (
                <div key={upgrade.slug} id={upgrade.slug} className="scroll-mt-20">
                  {/* Upgrade header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0 mt-0.5" style={{ background: c.bg, color: c.text }}>
                      {upgrade.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink leading-tight">{upgrade.title}</h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: c.text }}>{upgrade.subtitle}</p>
                    </div>
                  </div>

                  {/* Why */}
                  <div className="ml-14 mb-5">
                    <p className="text-sm text-ink-secondary leading-relaxed border-l-2 pl-3" style={{ borderColor: c.text }}>
                      {upgrade.why}
                    </p>
                  </div>

                  {/* Products */}
                  <div className="space-y-4">
                    {upgrade.products.map((product) => (
                      <ProductCard key={product.id} product={product} upgradeNum={upgrade.number} />
                    ))}
                  </div>

                  {upgrade.note && (
                    <p className="mt-3 text-xs text-ink-muted italic pl-14">{upgrade.note}</p>
                  )}
                </div>
              );
            })}

            {/* Upgrade 9 -- text-only */}
            <div id="wrist-pads" className="scroll-mt-20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0" style={{ background: "#eef3e7", color: "#48602f" }}>9</div>
                <div>
                  <h3 className="text-xl font-bold text-ink">Add Wrist Pads for Keyboard + Mouse Zones</h3>
                  <p className="text-sm font-semibold mt-0.5 text-green-700">Cheapest ergonomic upgrade available</p>
                </div>
              </div>
              <div className="ml-14 p-4 rounded-xl bg-gray-50 border border-border text-sm text-ink-secondary">
                <p className="mb-2">If you bought a keyboard with a built-in wrist rest (Upgrade 3), you don&apos;t need this. If you&apos;re keeping your existing keyboard and just want wrist protection, a standalone wrist rest pad costs $10-$20.</p>
                <p className="text-xs italic">Note: A wrist pad supports only the wrist zone. If you use a mouse heavily (4+ hours/day), consider the full armrest in Upgrade 4 instead -- it covers more of the arm and reduces shoulder tension a wrist pad can&apos;t address. The keyboard combos in Upgrade 3 (Trueque, Wave Keys) include integrated wrist rests -- if you chose one of those, skip this upgrade.</p>
              </div>
            </div>

            {/* Upgrade 10 -- text-only with table */}
            <div id="go-wireless" className="scroll-mt-20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0" style={{ background: "#eef2e8", color: "#5c6f4b" }}>10</div>
                <div>
                  <h3 className="text-xl font-bold text-ink">Go Wireless: The Complete Desk Declutter</h3>
                  <p className="text-sm font-semibold mt-0.5 text-blue-700">Final step to a fully clean desk surface</p>
                </div>
              </div>
              <div className="ml-14">
                <p className="text-sm text-ink-secondary mb-4">The cumulative effect of Upgrades 1-9 is dramatic, but the final visible clutter on most desks is the keyboard and mouse cables. Going wireless is the last step. All three options use 2.4G wireless (nano USB receiver, not Bluetooth) -- more reliable than Bluetooth for desktops and better for fast typing.</p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 font-bold text-ink border-b border-border">Starting Setup</th>
                        <th className="text-left px-4 py-3 font-bold text-ink border-b border-border">Recommended Combo</th>
                        <th className="px-4 py-3 border-b border-border"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { need: "Needs all-in-one with phone stand", name: "Trueque KM23", id: "trueque-km23" },
                        { need: "Types heavily, wants wave layout", name: "Wave Keys Combo", id: "wave-keys-combo" },
                        { need: "Wants color options + ergonomics", name: "Purple Ergonomic Combo", id: "purple-ergonomic-combo" },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                          <td className="px-4 py-3 text-ink-secondary">{row.need}</td>
                          <td className="px-4 py-3 font-semibold text-ink">{row.name}</td>
                          <td className="px-4 py-3">
                            <a href={`#${row.id}`} className="text-xs font-semibold text-brand hover:underline">View review</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Priority guide */}
        <section id="priority" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Which Upgrade Should You Do First?</h2>
          <p className="text-sm text-ink-secondary mb-5">Priority order for most small-desk setups:</p>
          <div className="space-y-3">
            {priorityGuide.map((g, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-white">
                <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <p className="text-sm font-bold text-ink mb-0.5">If {g.situation.toLowerCase()}</p>
                  <p className="text-xs text-brand font-semibold mb-1">{g.recommendation}</p>
                  <p className="text-xs text-ink-secondary">{g.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before You Buy */}
        <section id="before-you-buy" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Before You Buy: 3 Things to Check</h2>
          <div className="space-y-3">
            {beforeYouBuy.map((item, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <p className="font-bold text-ink text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="quick-reference" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Full Quick Reference -- 13 Products, 10 Upgrades</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Upgrade</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {quickReference.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-xs font-semibold text-ink-muted">{row.upgrade}</td>
                    <td className="px-4 py-3">
                      <a href={`#${row.id}`} className="font-semibold text-ink hover:text-brand transition-colors">{row.name}</a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={row.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>
                        Check price
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How We Evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Upgrades</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Each upgrade was evaluated on daily usage impact, ergonomic benefit with a realistic timeline, cost relative to alternatives at the same price tier, and compatibility with common small-desk setups (IKEA tables, dorm desks, 40-48 inch workstations).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Daily impact", "Does this change something you notice every single session, or something you adjust once and forget?"],
              ["Ergonomic benefit", "Based on published ergonomic research, not marketing claims. Timelines for feeling the benefit are realistic estimates, not best-case."],
              ["Price-to-value ratio", "Compared against alternatives at the same price tier. A $40 gas-spring arm is evaluated against $25 friction arms, not $200 premium options."],
              ["Small-desk compatibility", "Verified compatibility with IKEA LINNMON, standard dorm desks (1-1.5\" thick), and desks under 48\" wide."],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            This guide reflects research across published specifications, manufacturer documentation, and analysis of verified Amazon buyer review patterns.
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
          <p className="text-base font-semibold text-ink mb-1">Browse all desk upgrade products on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=ergonomic+desk+upgrades&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Desk Upgrades on Amazon
          </a>
        </div>

        {/* Related Guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/best-clip-on-desk-lamp", title: "Best Clip-On Desk Lamps for Small Desks", label: "Desk Setup" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under Desk Cable Trays", label: "Desk Setup" },
              { href: "/guide/best-small-desk-accessories", title: "12 Best Small Desk Accessories", label: "Desk Setup" },
            ].map((g) => (
              <Link prefetch={false} key={g.href} href={g.href} className="group p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all">
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
