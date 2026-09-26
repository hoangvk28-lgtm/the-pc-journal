import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, faq,
  type MultiCharger,
} from "@/data/guides/best-budget-multi-device-charging-station-under-50";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-budget-multi-device-charging-station-under-50",
  image: fallbackHeroImage, type: "article",
});

function ProductSection({ product }: { product: MultiCharger }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">{product.badge}</span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{product.name}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a href={product.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={product.imageUrl} alt={product.name} width={220} height={200} className="object-contain w-full h-full p-3" unoptimized />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.wattage}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.ports}</span>
              {product.usbCPD !== "None" && <span className="text-xs px-2.5 py-1 rounded-lg bg-cta-light text-cta font-bold">USB-C PD {product.usbCPD}</span>}
              {product.watchSupport && <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 font-bold">Watch Arm</span>}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it works</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWorks}</p>
            </div>
            {product.tradeoffs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1">Trade-offs</p>
                <ul className="space-y-1">
                  {product.tradeoffs.map((t, i) => <li key={i} className="text-xs text-ink-secondary">&middot; {t}</li>)}
                </ul>
              </div>
            )}
            <p className="text-xs text-ink-muted"><span className="font-semibold text-ink">Skip if:</span> {product.skipIf}</p>
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
        <div className="border-t border-border grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {product.pros.map((pro, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>{pro}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {product.cons.map((con, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>{con}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestBudgetMultiDeviceChargingStationUnder50Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: guideTitle, description: metaDescription,
    datePublished: "2026-06-07", dateModified: "2026-06-07",
    author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` },
    publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-budget-multi-device-charging-station-under-50` },
    about: [{ "@type": "Thing", name: "Multi-Device Charging Station" }, { "@type": "Thing", name: "GaN Charger" }, { "@type": "Thing", name: "Desk Accessories" }],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: "Best Budget Multi-Device Charging Station Under $50", item: `${SITE_URL}/guide/best-budget-multi-device-charging-station-under-50` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Best Budget Multi-Device Charging Stations Under $50 2026",
    description: "5 best multi-device charging stations under $50, compared by GaN, USB-C PD wattage, port count, and value.",
    numberOfItems: 5,
    itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name}, ${p.badge}`, url: `${SITE_URL}/guide/best-budget-multi-device-charging-station-under-50#${p.id}` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Best Budget Multi-Device Charging Station Under $50</span>
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
              5 picks, all under $50, GaN and USB-C options included
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission, at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best budget multi-device charging stations under $50" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Wattage</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">USB-C PD</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.wattage}</td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      {p.usbCPD !== "None" ? <span className="text-cta font-bold">{p.usbCPD}</span> : <span className="text-ink-muted">No</span>}
                    </td>
                    <td className="px-4 py-3">
                      <a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                        className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>
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
          <p>The $30–$50 range is where USB charging stations start getting genuinely interesting. At $25, you get USB-A hubs that charge phones reliably. At $35–$50, you start getting GaN technology, smaller, cooler-running chargers that can fast-charge laptops alongside phones.</p>
          <p>The 5 picks in this guide were evaluated on wattage per port, USB-C PD availability, GaN efficiency, and whether they handle mixed Apple and Android device households without compromise.</p>
          <p>Every pick is from a brand with a verifiable Amazon history, UGREEN, Anker, SooPii, ORICO, and Sabrent all have thousands of reviews across their product lines.</p>
        </section>

        {/* What to Know */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">What to Know Before Buying a Multi-Device Charging Station</h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">GaN vs Traditional Silicon, Why It Matters at This Price</h3>
            <p className="text-sm text-ink-secondary mb-4">Traditional chargers use silicon transistors. GaN (Gallium Nitride) chargers use a different semiconductor that runs at higher frequencies, this makes them smaller, cooler, and more power-efficient. A 65W GaN charger like the UGREEN Nexode is roughly deck-of-cards size. A traditional 65W charger would be significantly larger.</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { label: "Traditional silicon charger", items: ["Larger physical size", "Runs warmer, generates more heat", "Less efficient, some wattage lost as heat", "Often cheaper at same wattage"] },
                { label: "GaN charger", items: ["Compact, often 40–60% smaller", "Runs cooler, better long-term durability", "More efficient, less wasted heat", "Slightly more expensive at same wattage"] },
              ].map((col, i) => (
                <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "border-gray-200 bg-gray-50" : "border-cta/30 bg-cta-light/20"}`}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2 text-ink">{col.label}</p>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-ink-muted" />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">At $30–$40, GaN is now available:</strong> The UGREEN Nexode 65W is the clearest example, 65W GaN in a compact body at a price that was $60+ just 2 years ago.
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">How Much USB-C Wattage Do You Actually Need?</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Device</th>
                  <th className="text-left px-4 py-3 font-semibold">Minimum PD needed</th>
                  <th className="text-left px-4 py-3 font-semibold">Full-speed charge</th>
                </tr></thead>
                <tbody>
                  {[
                    { device: "iPhone 12–16", min: "20W", full: "20W (0–50% in 30 min)" },
                    { device: "iPad Air / iPad Pro", min: "20W", full: "30W (full speed overnight)" },
                    { device: "MacBook Air M2/M3", min: "30W (slow)", full: "65W (fast, active use)" },
                    { device: "MacBook Pro 14\"", min: "30W (charge while asleep)", full: "96W (active use, not available here)" },
                    { device: "Android flagship (most)", min: "18W PD", full: "25–45W (device-specific)" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.device}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.min}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.full}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to pick</p>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">
                #{p.rank} {p.badge}
              </a>
            ))}
            <a href="#faq" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">FAQ</a>
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top 5 Picks</h2>
        {products.map((product) => <ProductSection key={product.id} product={product} />)}

        {/* FAQ */}
        <section id="faq" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-bold text-ink text-sm mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Bottom Line</h2>
          <div className="space-y-4">
            {[
              { context: "Best overall and best GaN", product: "UGREEN Nexode 65W", href: "#ugreen-nexode-65w", verdict: ", 65W GaN, 3 USB-C ports, deck-of-cards size. Best watt-per-dollar at this price." },
              { context: "Best for Apple Watch + cables", product: "SooPii Premium 6-Port", href: "#soopii-6-port-watch", verdict: ", built-in Watch arm, 6 cables included, PD 20W, best for mixed Apple households." },
              { context: "Most ports (family use)", product: "ORICO 10-Port 120W", href: "#orico-10-port-120w", verdict: ", 12W per port across 10 devices, double the wattage of typical budget stations." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary"><strong className="text-ink">{item.context}:</strong> the{" "}<a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{item.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse multi-device charging stations under $50 on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">GaN options included. All Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=multi+device+usb+charging+station+under+50&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-budget-usb-charging-station-under-30", title: "Best USB Charging Stations Under $30", desc: "7 reliable picks for phones, earbuds, and tablets, under $30" },
              { href: "/guide/best-budget-apple-3-in-1-charging-station-under-40", title: "Best Apple 3-in-1 Charging Stations Under $40", desc: "iPhone + Watch + AirPods on one stand, under $40" },
              { href: "/compare/usb-c-hub-vs-docking-station", title: "USB-C Hub vs Docking Station", desc: "Which one do you actually need for your setup?" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
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
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Prices checked at time of writing, verify current Amazon price before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
