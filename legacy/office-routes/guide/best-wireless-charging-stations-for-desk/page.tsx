import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle,
  guideDescription,
  metaTitle,
  metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  atAGlanceItems,
  qiComparisonRows,
  caseCompatibilityRows,
  wirelessVsWiredRows,
  faq,
  type WirelessProduct,
} from "@/data/guides/best-wireless-charging-stations-for-desk";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-wireless-charging-stations-for-desk",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: WirelessProduct }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {product.badge}
        </span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{product.name}</h2>
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          {/* Image */}
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image src={product.imageUrl} alt={product.name} width={220} height={200} className="object-contain w-full h-full p-3" unoptimized />
          </a>

          <div className="flex-1 min-w-0 flex flex-col gap-3">
            {/* Standard badge */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">{product.standard}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.devices}</span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWins}</p>
            </div>

            {product.bodyParagraphs.map((para, i) => (
              <p key={i} className="text-sm text-ink-secondary leading-relaxed">{para}</p>
            ))}

            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity w-fit mt-auto"
              style={{ background: "#FF9900" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
              </svg>
              Check price on Amazon
            </a>
          </div>
        </div>

        {/* Specs + Pros/Cons */}
        <div className="border-t border-border grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-ink mb-3">Specs</p>
            <ul className="space-y-1.5">
              {product.specs.map((spec, i) => (
                <li key={i} className="text-xs text-ink-secondary">
                  <span className="font-semibold text-ink">{spec.label}:</span> {spec.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>
                  {con}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border">
              <span className="font-semibold text-ink">Best for:</span> {product.bestFor}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestWirelessChargingStationsPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-03", dateModified: "2026-06-03", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-wireless-charging-stations-for-desk` }, about: [{ "@type": "Thing", name: "Wireless Charging Station" }, { "@type": "Thing", name: "MagSafe Charger" }, { "@type": "Thing", name: "Qi2 Wireless Charging" }, { "@type": "Thing", name: "Desk Accessories" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Wireless Charging Stations for Desk", item: `${SITE_URL}/guide/best-wireless-charging-stations-for-desk` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Wireless Charging Stations for Desk 2026", description: "Top 6 wireless desk charging stations -- 3-in-1 stands, flat Qi2 pads, and charging desk mats, ranked by use case.", numberOfItems: 6, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-wireless-charging-stations-for-desk#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Container className="py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Best Wireless Charging Stations for Desk</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Buying Guide</span>
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
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              6 picks -- 3-in-1 stands, Qi2 pads, and charging mats
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Learn more</Link>.
        </div>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best wireless charging stations for desk" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10" id="quick-picks">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Standard</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Devices</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-sm">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.standard}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.devices}</td>
                    <td className="px-4 py-3">
                      <a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>The case for wireless charging on a desk is simple: your phone charges every time you set it down. No fumbling for a cable, no micro-USB mismatch, no fraying Lightning connector. You put the phone down, pick it up fully charged an hour later. That is the whole pitch.</p>
          <p>The case against is equally simple: wireless charging is slower than wired for most phones, it runs warmer, and if your phone lands off-center on the pad, it charges at reduced speed or not at all.</p>
          <p>Both of those statements were more true in 2021 than they are in 2026. Qi2 -- the current open wireless standard -- charges iPhones at 15W via magnetic alignment, matching Apple&apos;s own MagSafe speed. The magnetic ring snaps the phone to the center of the pad automatically, so misalignment is no longer a problem. Heat management has improved across the board.</p>
          <p>For desk use specifically, wireless charging has another advantage competitors&apos; guides consistently miss: <strong className="text-ink">it reduces the number of cables crossing your desk surface.</strong> One wireless pad replaces three cables to your phone, earbuds, and watch. That is a meaningful visual and ergonomic improvement, especially on small desks.</p>
          <p>This guide covers every wireless charging format that makes sense for a desk -- 3-in-1 stations, single-device stands, flat pads, and charging desk mats.</p>
        </section>

        {/* ── Qi vs Qi2 vs MagSafe ── */}
        <section className="mb-12 scroll-mt-20" id="qi-comparison">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Qi vs Qi2 vs MagSafe -- What Is the Actual Difference?</h2>
          <p className="text-sm text-ink-secondary mb-5">
            This is the section every competitor skips, which is why buyers end up confused about why their &quot;MagSafe charger&quot; doesn&apos;t deliver 15W on their Android phone.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold">Qi</th>
                  <th className="text-left px-4 py-3 font-semibold">Qi2</th>
                  <th className="text-left px-4 py-3 font-semibold">MagSafe</th>
                </tr>
              </thead>
              <tbody>
                {qiComparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.qi}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.qi2}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.magsafe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm font-semibold text-ink mb-3">The practical rule for desk buyers:</p>
          <div className="space-y-2">
            {[
              { user: "iPhone users", rule: "Get a Qi2 or MagSafe charger. Both deliver 15W. Qi2 is slightly cheaper and works on future non-Apple Qi2 devices too." },
              { user: "Android users", rule: "Check if your phone is Qi2-certified (Samsung Galaxy S25+, Pixel 9 series, and others). If yes, Qi2 pads deliver full speed. If not, any Qi pad charges -- but at the phone manufacturer's standard (typically 5--15W depending on brand)." },
              { user: "Mixed household", rule: "A Qi2 pad covers everyone. It works on Qi2 phones at 15W and on standard Qi phones at whatever speed the phone supports." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                <span className="text-xs font-bold text-brand px-2 py-1 rounded-lg bg-brand-muted shrink-0">{item.user}</span>
                <p className="text-xs text-ink-secondary leading-relaxed">{item.rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10" id="at-a-glance">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 6 Picks at a Glance</h2>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "#qi-comparison", label: "Qi vs Qi2 vs MagSafe" },
              { href: "#best-3in1-value", label: "Best Value 3-in-1" },
              { href: "#best-3in1-premium", label: "Best Premium 3-in-1" },
              { href: "#best-qi2-compact", label: "Best Qi2 Compact" },
              { href: "#best-flat-pad", label: "Best Flat Pad" },
              { href: "#best-desk-mat", label: "Best Desk Mat" },
              { href: "#best-budget", label: "Best Budget" },
              { href: "#practical-tips", label: "Practical tips" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        {/* H2 products heading */}
        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Wireless Charging Stations for Desk</h2>

        {/* Product sections */}
        {products.map((product) => (
          <div key={product.id}>
            <ProductSection product={product} />
            {product.id === "best-desk-mat" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">See the full desk mat + organizer guide:</strong>{" "}
                <Link prefetch={false} href="/guide/small-desk-organization-ideas" className="text-brand hover:underline font-medium">Small Desk Organization Ideas</Link>
              </div>
            )}
          </div>
        ))}

        {/* ── PRACTICAL THINGS TO KNOW ── */}
        <div id="practical-tips" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Wireless Charging on a Desk -- Practical Things to Know</h2>

          {/* Placement */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Where to Place a Wireless Pad on Your Desk</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Placement determines whether wireless desk charging actually gets used. The best position is where your phone <strong className="text-ink">naturally rests</strong> when you are not holding it -- not where you think it should go.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl border border-cta/30 bg-cta-light/20">
                <p className="text-xs font-bold uppercase tracking-widest text-cta mb-2">Placements that work</p>
                <ul className="space-y-1.5">
                  {[
                    "Left of keyboard (natural drop zone, left-handed phone pickup)",
                    "Right of keyboard (same logic, right-handed)",
                    "Back-center beside monitor (passive charging, phone out of work zone)",
                    "Corner of desk (charging area separate from working area)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-cta mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-red-200 bg-red-50">
                <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Placement to avoid</p>
                <ul className="space-y-1.5">
                  {[
                    "In front of keyboard (forces you to reach over phone constantly)",
                    "On top of a stack of papers (wireless charging does not work through thick materials)",
                    "Near a metal desk lamp base (some interference possible)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              For stand chargers (Anker 3-in-1, Belkin, LISEN): place where the screen is readable. The main benefit of a stand over a flat pad is passive screen monitoring -- seeing notifications, calls, or time without picking up the phone.
            </p>
          </section>

          {/* Phone case compatibility */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Does Wireless Charging Work Through a Phone Case?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">Yes -- with important limits.</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Case Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Wireless Charging</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Speed Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {caseCompatibilityRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 text-ink text-xs">{row.caseType}</td>
                      <td className={`px-4 py-3 text-xs font-medium ${row.impact === "Complete block" ? "text-red-600" : "text-cta"}`}>{row.works}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink">The magnetic alignment of Qi2</strong> means that even thicker cases work better than on standard Qi chargers, because the magnet centers the phone precisely regardless of case.
            </p>
          </section>

          {/* Heat */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Does Wireless Charging Heat Up Your Phone or Desk?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-3">This is the question most reviews skip.</p>
            <div className="space-y-3 mb-4">
              {[
                { label: "Phone heat", body: "Wireless charging is less efficient than wired (typically 80--85% efficiency vs. 95%+ wired). The lost energy becomes heat. A phone charging wirelessly at 15W may feel warmer than one charging at the same rate via USB-C. Most modern phones manage this via thermal throttling -- they slow the charge rate automatically if temperature rises above safe levels." },
                { label: "Desk heat", body: "Qi2 and MagSafe pads generate minimal surface heat. The pad itself may be warm to the touch under load, but not hot enough to damage desk surfaces including lacquered wood, glass, or standard desk mats." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-white">
                  <p className="font-bold text-ink text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
              <strong className="text-ink">Practical note:</strong> If you leave your phone on a wireless pad in direct sunlight or under a desk lamp, the combined heat can trigger thermal throttling and slow the charge. Keep the charging zone out of direct light for consistent speed.
            </div>
          </section>

          {/* Wireless vs Wired */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Wireless vs. Wired on a Desk -- Honest Comparison</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold"></th>
                    <th className="text-left px-4 py-3 font-semibold">Wireless (Qi2 15W)</th>
                    <th className="text-left px-4 py-3 font-semibold">Wired USB-C (PD 27W)</th>
                  </tr>
                </thead>
                <tbody>
                  {wirelessVsWiredRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.wireless}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.wired}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">The honest answer: use both.</strong> A Qi2 wireless pad for passive desk charging (phone charges whenever you set it down), plus a USB-C PD cable nearby for fast top-ups before a meeting. This combination beats either option alone.
              <br /><br />
              <strong>For wired options alongside wireless:</strong>{" "}
              <Link prefetch={false} href="/guide/best-charging-stations-for-desk" className="text-brand hover:underline font-medium">Best Charging Stations for Desk</Link>
            </div>
          </section>
        </div>

        {/* ── HOW WE EVALUATED ── */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Picks</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Charging standard and speed", note: "Qi2 vs MagSafe vs standard Qi -- actual delivered wattage on a desk, not just listed specs." },
              { label: "Desk footprint", note: "Stand dimensions and how the unit fits on typical small-to-medium desk setups with keyboard and monitor." },
              { label: "Build quality and stability", note: "Does the charger stay in place when you pick up the phone one-handed? Weighted bases tested against lightweight alternatives." },
              { label: "Value at price point", note: "What the unit delivers vs. what it costs -- with specific attention to adapter inclusion, which significantly affects effective price." },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-muted text-brand flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink text-sm">{c.label}</p>
                  <p className="text-xs mt-0.5 leading-relaxed">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 pt-4 border-t border-border">
            The Office Journal earns a commission on qualifying purchases at no extra cost to you.
          </p>
        </section>

        {/* ── FAQ ── */}
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

        {/* ── BOTTOM LINE ── */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Bottom Line</h2>
          <div className="space-y-4">
            {[
              { product: "Anker MagSafe 3-in-1 Qi2", context: "For Apple households", verdict: "is the starting point -- it covers phone, watch, and AirPods from a compact stand, frequently discounts to $35, and includes the adapter. Start here.", href: "#best-3in1-value" },
              { product: "Belkin BoostCharge Pro", context: "If the desk is visible (home office, client-facing workspace)", verdict: "-- the weighted base and adjustable tilt justify the premium for a charger that stays put and looks deliberate.", href: "#best-3in1-premium" },
              { product: "Journey ALTI Qi2 desk mat", context: "For the purest, most minimal desk setup where no hardware should be visible at all", verdict: "embeds the charger in the surface itself and disappears.", href: "#best-desk-mat" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {item.context}, the{" "}
                  <a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}
                </p>
              </div>
            ))}
            <p className="text-sm text-ink-secondary mt-2">
              Whatever you choose: use a stand-style charger (not a flat pad) so your phone is readable while charging. That is the single biggest difference between a wireless charger that genuinely improves your desk workflow and one that just sits there.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse wireless desk chargers on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">Qi2, MagSafe, and 3-in-1 options -- all Prime-eligible.</p>
          <a
            href="https://www.amazon.com/s?k=wireless+charging+station+desk&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related Guides */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "Full roundup including wired options" },
              { href: "/guide/best-small-desk-charging-stations", title: "Best Small Desk Charging Stations", desc: "Compact picks for tight spaces" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/best-desk-mat-for-small-desk", title: "Best Desk Mats for Small Desks", desc: "Top desk mats reviewed for compact workspaces" },
            ].map((g) => (
              <Link prefetch={false} key={g.href} href={g.href} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-brand transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">{g.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 text-center">
            Last updated: June 2026. Prices and availability checked at time of writing -- always verify current price on Amazon before purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
