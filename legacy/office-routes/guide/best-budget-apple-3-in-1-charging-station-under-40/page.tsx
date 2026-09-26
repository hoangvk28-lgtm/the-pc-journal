import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, faq,
  type Apple3in1,
} from "@/data/guides/best-budget-apple-3-in-1-charging-station-under-40";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-budget-apple-3-in-1-charging-station-under-40",
  image: fallbackHeroImage, type: "article",
});

function ProductSection({ product }: { product: Apple3in1 }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.iphoneSpeed}</span>
              {product.foldable && <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 font-bold">Foldable</span>}
              {product.adapterIncluded && <span className="text-xs px-2.5 py-1 rounded-lg bg-cta-light text-cta font-bold">Adapter Included</span>}
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

export default async function BestBudgetApple3in1ChargingStationUnder40Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: guideTitle, description: metaDescription,
    datePublished: "2026-06-07", dateModified: "2026-06-07",
    author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` },
    publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-budget-apple-3-in-1-charging-station-under-40` },
    about: [{ "@type": "Thing", name: "Apple MagSafe Charger" }, { "@type": "Thing", name: "3-in-1 Charging Station" }, { "@type": "Thing", name: "Apple Watch Charger" }],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: "Best Budget Apple 3-in-1 Charging Station Under $40", item: `${SITE_URL}/guide/best-budget-apple-3-in-1-charging-station-under-40` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Best Budget Apple 3-in-1 Charging Stations Under $40 2026",
    description: "5 best budget Apple 3-in-1 charging stations under $40, MagSafe for iPhone, Apple Watch, and AirPods in one stand.",
    numberOfItems: 5,
    itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name}, ${p.badge}`, url: `${SITE_URL}/guide/best-budget-apple-3-in-1-charging-station-under-40#${p.id}` })),
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
          <span className="text-ink">Best Budget Apple 3-in-1 Charging Station Under $40</span>
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
              5 picks, all under $40, all MagSafe-compatible
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission, at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best budget Apple 3-in-1 charging stations under $40" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">iPhone Speed</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Foldable</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.iphoneSpeed}</td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span className={p.foldable ? "text-cta font-bold" : "text-ink-muted"}>{p.foldable ? "Yes" : "No"}</span>
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
          <p>Apple&apos;s own MagSafe Duo charger costs $149. It charges your iPhone and Apple Watch, but not AirPods, and it doesn&apos;t fold into a travel-friendly shape. For $25–$40, several third-party manufacturers have produced MagSafe-certified alternatives that charge all three Apple devices simultaneously and fold flat enough to fit in a bag pocket.</p>
          <p>Every pick in this guide is MagSafe-compatible (15W for iPhone 12 and later) and charges Apple Watch. The difference between picks comes down to three factors: maximum charging speed, whether it folds for travel, and whether it comes with the adapter you&apos;ll need.</p>
          <p>We evaluated these based on charging speed accuracy (are the 15W claims real?), build quality at the price point, folding mechanism durability, and whether the Watch arm position works for nightstand mode.</p>
        </section>

        {/* What to Know */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Before You Buy: What Nobody Explains Clearly</h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">1. &quot;MagSafe Compatible&quot; Is Not the Same as &quot;Made for MagSafe&quot;</h3>
            <p className="text-sm text-ink-secondary mb-4">This is the single biggest quality differentiator in this category. Apple licenses its &quot;Made for MagSafe&quot; certification, only certified products can deliver the full 15W. Uncertified &quot;MagSafe compatible&quot; products are capped at 7.5W Qi, the same speed as a standard wireless charger from 2018.</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { label: "Made for MagSafe (certified)", items: ["Full 15W, iPhone charges in ~90 minutes", "Magnetic alignment confirmed accurate", "Apple licensing means accountability", "Usually labeled on product page with Apple MFM badge"] },
                { label: "MagSafe compatible (uncertified)", items: ["Caps at 7.5W Qi, same as any Qi pad", "Magnetic alignment may be weaker", "No Apple oversight", "Usually cheaper, but you’re paying for 7.5W with extra steps"] },
              ].map((col, i) => (
                <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "border-cta/30 bg-cta-light/20" : "border-yellow-200 bg-yellow-50"}`}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2 text-ink">{col.label}</p>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: i === 0 ? "#5f7a4a" : "#a8875a" }} />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">ESR and KEEPRO both confirm Made for MagSafe certification</strong> on their product pages. The budget generic (pick #5) is uncertified but still rates 15W in buyer reports, verify this on the specific listing before purchasing.
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">2. Apple Watch Charger Disk Is Not Included</h3>
            <p className="text-sm text-ink-secondary mb-3">Every 3-in-1 stand in this guide includes a magnetic Watch arm holder, but not the magnetic charging disk (the small puck that actually charges the Watch). You need Apple&apos;s own USB-C Magnetic Fast Charge Cable, or an Apple-certified third-party disk.</p>
            <p className="text-sm text-ink-secondary mb-3">This is expected and standard in the category. Apple Watch charging disks are licensed hardware, third-party stands can hold and position them, but they can&apos;t include the disk itself without Apple licensing (which pushes the price well above $40).</p>
            <div className="p-3 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
              <strong className="text-ink">What to buy:</strong> Apple USB-C Magnetic Fast Charge Cable ($29) works with all 3-in-1 arms in this guide and enables Apple Watch fast charging (Series 7+). The Magnetic Charging Cable (USB-A, $19) works but doesn&apos;t fast-charge.
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-ink mb-3">3. Desk vs Travel: Two Different Use Cases</h3>
            <p className="text-sm text-ink-secondary mb-3">Stand-style 3-in-1 chargers (ESR CryoBoost) are better for permanent desk or nightstand use, more stable, better viewing angles, but don&apos;t fold flat. Foldable chargers (ESR HaloLock, KEEPRO models) fold to shirt-pocket size and are the right choice for travel or small desk surfaces.</p>
            <p className="text-sm text-ink-secondary mb-3">The picks in this guide are labeled with their use case so cậu can choose the one that fits.</p>
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
              { context: "Best overall (desk use)", product: "ESR HaloLock Foldable", href: "#esr-halolock-foldable", verdict: ", Made for MagSafe, 15W, folds flat, nightstand Watch mode, certified at this price." },
              { context: "Fastest charging", product: "ESR 25W CryoBoost", href: "#esr-25w-cryoboost", verdict: ", 25W MagSafe, built-in cooling fan, Watch fast charge (Series 7+). Best for daily desk use." },
              { context: "Best for travel / under $30", product: "KEEPRO Ultra-Compact", href: "#keepro-ultra-compact", verdict: ", shirt-pocket size, 3.9oz, adapter included, 15W MagSafe." },
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
          <h2 className="text-xl font-bold text-white mb-2">Browse Apple 3-in-1 charging stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">MagSafe-compatible picks under $40. All Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=apple+3+in+1+charging+station+magsafe&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
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
              { href: "/guide/best-budget-multi-device-charging-station-under-50", title: "Best Multi-Device Charging Stations Under $50", desc: "GaN, USB-C PD, and Apple Watch arms, the upgrade picks" },
              { href: "/guide/dorm-room-power-essentials", title: "Dorm Room Power Essentials", desc: "Power strips, surge protectors, and USB hubs for dorm setups" },
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
