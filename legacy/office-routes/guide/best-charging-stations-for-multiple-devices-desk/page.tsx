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
  quickPicksRows,
  perDeviceTable,
  wattagePerPortTable,
  faq,
  type MultiDeviceProduct,
} from "@/data/guides/best-charging-stations-for-multiple-devices-desk";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-charging-stations-for-multiple-devices-desk",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: MultiDeviceProduct }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {product.badge}
        </span>
        <h2 className="text-2xl font-bold text-ink tracking-tight">{product.name}</h2>
      </div>
      <p className="text-xs text-ink-muted mb-4 pl-1">Best for: {product.subBadge}</p>

      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a href={product.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={product.imageUrl} alt={product.name} width={220} height={200} className="object-contain w-full h-full p-3" unoptimized />
          </a>

          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">{product.totalWattage}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.ports}</span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWins}</p>
            </div>
            {product.bodyParagraphs.map((para, i) => (
              <p key={i} className="text-sm text-ink-secondary leading-relaxed">{para}</p>
            ))}

            <a href={product.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
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

export default async function BestMultipleDevicesChargingPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-03", dateModified: "2026-06-03", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-charging-stations-for-multiple-devices-desk` }, about: [{ "@type": "Thing", name: "Multi-Device Charging Station" }, { "@type": "Thing", name: "Desktop Charging Hub" }, { "@type": "Thing", name: "Family Charging Station" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Charging Stations for Multiple Devices", item: `${SITE_URL}/guide/best-charging-stations-for-multiple-devices-desk` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Desk Charging Stations for Multiple Devices 2026", description: "Top 6 multi-device desk charging stations, ranked by device count and use case.", numberOfItems: 9, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-charging-stations-for-multiple-devices-desk#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Best Charging Stations for Multiple Devices</span>
        </nav>

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
              6 picks + watt-per-device calculator
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Learn more</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best desk charging stations for multiple devices" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks by Device Count */}
        <section className="mb-10" id="quick-picks">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks by Device Count</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Devices</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Pick</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Ports</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Total W</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {quickPicksRows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{row.devices}</td>
                    <td className="px-4 py-3 text-ink text-xs"><a href={`#${row.id}`} className="font-bold text-brand hover:underline">{row.pick}</a></td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.ports}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.wattage}</td>
                    <td className="px-4 py-3">
                      <a href={`#${row.id}`} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-muted text-brand hover:bg-brand hover:text-white transition-colors whitespace-nowrap">See pick</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>Count the devices on your desk right now. For most people in 2026, it is at least five: a phone, a pair of wireless earbuds, a smartwatch, a tablet, and a laptop. Add a second phone for a partner, an e-reader, a Bluetooth keyboard, and a mouse dongle, and you are at eight.</p>
          <p>A single-port USB-C adapter handles none of this. A standard power strip handles the laptop via its own adapter -- and nothing else cleanly. A multi-device charging station handles all of it from one hub, with one cable to the wall.</p>
          <p>The challenge with multi-device chargers is picking the right wattage. Too low, and everything charges slowly simultaneously. Too high, and you pay for capacity you will never use. This guide solves that with a watt-per-device calculator before the picks -- so you know exactly what you need before reading a single product review.</p>
        </section>

        {/* ── WATTAGE CALCULATOR ── */}
        <section className="mb-12 scroll-mt-20" id="wattage-calculator">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">How Much Wattage Do You Actually Need?</h2>
          <p className="text-sm text-ink-secondary mb-5">
            This is the section every competitor skips, which is why buyers either overspend on a 500W charger for three phones or underspend on a 60W hub that slows to a crawl under real load.
          </p>

          {/* Per-device table */}
          <h3 className="text-base font-bold text-ink mb-3">Per-Device Power Reference</h3>
          <div className="overflow-x-auto rounded-xl border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Device</th>
                  <th className="text-left px-4 py-3 font-semibold">Typical Fast-Charge Draw</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Overnight / Slow OK</th>
                </tr>
              </thead>
              <tbody>
                {perDeviceTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">{row.device}</td>
                    <td className="px-4 py-3 font-bold text-brand">{row.fast}</td>
                    <td className="px-4 py-3 text-ink-secondary hidden sm:table-cell">{row.slow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3-Step Calculator */}
          <h3 className="text-base font-bold text-ink mb-3">The 3-Step Wattage Calculator</h3>
          <div className="space-y-3 mb-6">
            {[
              { step: "1", text: "List devices you charge simultaneously (not total devices owned)" },
              { step: "2", text: "Sum their typical fast-charge draw from the table above" },
              { step: "3", text: "Add 20% buffer -- chargers run more efficiently with headroom" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs">{item.step}</span>
                <p className="text-sm text-ink-secondary">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Examples */}
          <div className="grid sm:grid-cols-3 gap-4 mb-2">
            {[
              {
                label: "Apple home office desk",
                devices: ["MacBook Air M3: 35W", "iPhone 16: 27W", "iPad Air: 25W", "AirPods Pro: 5W", "Apple Watch: 5W"],
                total: "97W → ~115W minimum",
                note: "Anker Prime 200W handles this with 85W in reserve.",
              },
              {
                label: "Family of 4 (phones only)",
                devices: ["4x Android/iPhone phones:", "4 × 20W = 80W"],
                total: "80W → ~96W minimum",
                note: "Alxum 120W 10-Port handles this cleanly.",
              },
              {
                label: "Power user (laptop + peripherals)",
                devices: ['MacBook Pro 16": 140W', "iPhone: 27W", "iPad Pro: 45W"],
                total: "212W → ~255W minimum",
                note: "Only the Baseus 245W covers this fully.",
              },
            ].map((ex, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-bg">
                <p className="text-xs font-bold text-ink mb-2">{ex.label}</p>
                <ul className="space-y-0.5 mb-2">
                  {ex.devices.map((d, j) => <li key={j} className="text-xs text-ink-secondary">{d}</li>)}
                </ul>
                <p className="text-xs font-bold text-brand mb-1">{ex.total}</p>
                <p className="text-xs text-ink-muted">{ex.note}</p>
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
              { href: "#wattage-calculator", label: "Wattage calculator" },
              { href: "#best-overall", label: "Best Overall" },
              { href: "#best-power-user", label: "245W All-in-One" },
              { href: "#best-family", label: "Best for Families" },
              { href: "#best-10port", label: "10-Port" },
              { href: "#best-budget", label: "Best Budget" },
              { href: "#best-laptop", label: "Laptop + Multi" },
              { href: "#how-to-choose", label: "How to choose" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Multi-Device Desk Charging Stations</h2>

        {/* Product sections */}
        {products.map((product) => (
          <div key={product.id}>
            <ProductSection product={product} />
            {product.id === "best-overall" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">See also:</strong>{" "}
                <Link prefetch={false} href="/guide/best-charging-stations-for-desk" className="text-brand hover:underline font-medium">Best Charging Stations for Desk</Link>{" "}
                -- full single-page overview
              </div>
            )}
            {product.id === "best-laptop" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">Need monitor + Ethernet connectivity too?</strong>{" "}
                <Link prefetch={false} href="/guide/best-docking-stations-for-desk-setup" className="text-brand hover:underline font-medium">Best Docking Stations for Desk Setup</Link>
              </div>
            )}
          </div>
        ))}

        {/* ── HOW TO CHOOSE ── */}
        <div id="how-to-choose" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">How to Choose the Right Multi-Device Charger for Your Desk</h2>

          {/* Match Wattage */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Match Wattage to Your Actual Device List</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-3">
              Use the calculator above. The single most common mistake when buying a multi-device charger is picking one with enough ports but not enough total wattage -- every device ends up slow-charging because the hub is at its limit.
            </p>
            <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Rule:</strong> Total wattage of all devices you charge simultaneously + 20% buffer = minimum charger wattage.
            </div>
          </section>

          {/* USB-C vs USB-A */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">USB-C vs USB-A: Check Your Cables First</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">Before buying, look at the cables currently connecting your devices:</p>
            <div className="space-y-2 mb-4">
              {[
                { label: "USB-C cables", note: "need USB-C ports (obvious, but worth checking)" },
                { label: "Lightning cables", note: "need USB-A or USB-C via Lightning-to-USB-C" },
                { label: "Micro-USB cables", note: "need USB-A ports" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                  <span className="font-bold text-brand text-xs shrink-0 mt-0.5">{item.label}</span>
                  <p className="text-xs text-ink-secondary">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Most modern phones, tablets, and earbuds now use USB-C. If your desk has a mix of USB-C and older USB-A cables, look for a charger with at least 2 USB-C ports and 2 USB-A ports -- the TESSAN, Anker Prime, and UGREEN Nexode all deliver this.
            </p>
          </section>

          {/* Simultaneous vs Sequential */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Simultaneous vs. Sequential Charging</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Simultaneous", desc: "All devices plugged in and charging at the same time. Requires total wattage ≥ sum of all device draws. Best for home offices and family desks where everything charges during the day." },
                { label: "Sequential", desc: "Charge 2--3 devices at a time, rotate. Works fine with lower-wattage chargers. Best for small desks where only a phone and earbuds actually need to charge at once, despite owning 6 devices." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-white">
                  <p className="font-bold text-ink text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Most buyers overestimate how many devices they actually charge simultaneously. If you plug in your MacBook separately and only use the hub for phone, watch, and earbuds, a 60W charger is plenty.
            </p>
          </section>

          {/* Port Count ≠ Speed */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Port Count Does Not Equal Charging Speed</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              A 10-port charger at 60W total gives each port ~6W average -- slower than a single 20W USB-C adapter. Check total wattage per port count:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Charger</th>
                    <th className="text-left px-4 py-3 font-semibold">Total Wattage</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Ports</th>
                    <th className="text-left px-4 py-3 font-semibold">Avg W/Port</th>
                  </tr>
                </thead>
                <tbody>
                  {wattagePerPortTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.charger}</td>
                      <td className="px-4 py-3 text-ink-secondary">{row.total}</td>
                      <td className="px-4 py-3 text-ink-secondary hidden sm:table-cell">{row.ports}</td>
                      <td className={`px-4 py-3 font-bold ${i < 3 ? "text-cta" : i < 5 ? "text-amber-600" : "text-red-500"}`}>{row.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-muted mt-2">Higher average wattage per port = faster charging under full load.</p>
          </section>
        </div>

        {/* ── HOW WE EVALUATED ── */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Picks</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Total wattage vs device mix", note: "Does the charger's wattage budget actually cover the device combinations listed in the Quick Picks table?" },
              { label: "Smart power allocation", note: "Does the charger prioritize high-draw devices (laptops) automatically, or does it distribute equally regardless of need?" },
              { label: "Port mix practicality", note: "USB-C PD for modern devices, USB-A for accessories, AC outlets for desk accessories -- evaluated against real desk setups." },
              { label: "Value per watt", note: "Cost-per-watt across price tiers, with specific attention to the GaN efficiency premium vs. non-GaN alternatives at similar prices." },
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
              { product: "Anker Prime 200W", context: "For most desks (3--5 devices)", verdict: "handles any combination of modern devices at full speed. Smart power routing keeps the laptop prioritized. It is the most flexible choice for a desk whose device mix changes day to day.", href: "#best-overall" },
              { product: "Baseus Nomos 245W", context: "For full-load power users (laptop + 5 devices)", verdict: "covers everything -- retractable cables, wireless pad, LCD display, 245W total. The price is high but the functionality is unmatched.", href: "#best-power-user" },
              { product: "TESSAN 130W 8-in-1", context: "For families or shared desks", verdict: "delivers the best value for mixed households: GaN technology, three AC outlets, three fast USB-C ports, and under $38.", href: "#best-family" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary leading-relaxed">
                  <strong className="text-ink">{item.context}:</strong> The{" "}
                  <a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}
                </p>
              </div>
            ))}
            <p className="text-sm text-ink-secondary mt-2">
              Whatever you choose: use the watt calculator above before buying. Port count without adequate wattage is the most common -- and most frustrating -- mistake in this category.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse multi-device charging stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All products are Prime-eligible with free delivery.</p>
          <a href="https://www.amazon.com/s?k=multi+device+charging+station+desk&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "Full roundup across all categories" },
              { href: "/guide/best-wireless-charging-stations-for-desk", title: "Best Wireless Charging Stations for Desk", desc: "If wireless matters for your setup" },
              { href: "/guide/best-docking-stations-for-desk-setup", title: "Best Docking Stations for Desk Setup", desc: "When you need monitor + network too" },
              { href: "/guide/best-usb-hub-for-desk", title: "Best USB Hubs for Desk", desc: "If you only need more USB ports, not a full charging hub" },
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
