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
  wattageTable,
  footprintTable,
  comparisonRows,
  faq,
  type ChargingProduct,
} from "@/data/guides/best-charging-stations-for-desk";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-charging-stations-for-desk",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: ChargingProduct }) {
  return (
    <section id={product.id} className="mb-16 scroll-mt-20">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand">
          {product.badge}
        </span>
        <h2 className="text-2xl font-bold text-ink tracking-tight">{product.name}</h2>
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          {/* Image */}
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-64 h-56 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={240}
              height={200}
              className="object-contain w-full h-full p-3"
              unoptimized
            />
          </a>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWins}</p>
            </div>

            {product.bodyParagraphs.map((para, i) => (
              <p key={i} className="text-sm text-ink-secondary leading-relaxed">{para}</p>
            ))}

            {/* CTA */}
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
        <div className="border-t border-border">
          <div className="grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {/* Specs */}
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-ink mb-3">Specs at a glance</p>
              <ul className="space-y-2">
                {product.specs.map((spec, i) => (
                  <li key={i} className="text-xs text-ink-secondary">
                    <span className="font-semibold text-ink">{spec.label}:</span> {spec.value}
                  </li>
                ))}
                <li className="text-xs text-ink-secondary pt-1 border-t border-border">
                  <span className="font-semibold text-ink">Desk footprint:</span> {product.footprint}
                </li>
              </ul>
            </div>

            {/* Pros */}
            <div className="p-5">
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

            {/* Cons */}
            <div className="p-5">
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
      </div>
    </section>
  );
}

export default async function BestChargingStationsForDeskPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-03", dateModified: "2026-06-03", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-charging-stations-for-desk` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Charging Stations for Desk", item: `${SITE_URL}/guide/best-charging-stations-for-desk` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Charging Stations for Desk 2026", numberOfItems: 7, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-charging-stations-for-desk#${p.id}` })) };

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
          <span className="text-ink">Best Charging Stations for Desk</span>
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
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
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
              12+ options evaluated, 7 picks by category
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Learn more</Link>.
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best charging stations for desk" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks table */}
        <section className="mb-10" id="quick-picks">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Ports</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3">
                      <a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary hidden sm:table-cell text-xs">{p.ports}</td>
                    <td className="px-4 py-3">
                      <a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>
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
          <p>It&apos;s 2 PM on a Tuesday and your phone is at 14%. Your AirPods are flashing orange. Your Apple Watch buzz just reminded you about a call in 20 minutes -- and you have one cable dangling from a laptop, nowhere near the other devices.</p>
          <p>If that&apos;s your desk right now, a charging station would fix all of it.</p>
          <p>A good desk charging station consolidates everything -- phone, watch, earbuds, tablet, even your laptop -- into one hub with one power cord running to the wall. Less cable clutter, less scrambling, less dead-battery anxiety during the workday.</p>
          <p>The catch is that not all charging stations are made for desks. Some are too big, some have the wrong port mix, and some look like they belong in a server room, not on your workspace.</p>
          <p>We tested and reviewed 12+ options across every category. Below are the seven best desk charging stations in 2026, picked by use case so you can find exactly what fits your setup.</p>
        </section>

        {/* At a Glance */}
        <section className="mb-10" id="at-a-glance">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 7 Picks at a Glance</h2>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "#best-overall", label: "Best Overall" },
              { href: "#best-usb-c", label: "Best USB-C" },
              { href: "#best-wireless", label: "Best Wireless" },
              { href: "#best-multi-device", label: "Best Multi-Device" },
              { href: "#best-compact", label: "Best Compact" },
              { href: "#best-organizer", label: "Best with Organizer" },
              { href: "#best-budget", label: "Best Budget" },
              { href: "#buying-guide", label: "Buying guide" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* H2: Our Top Picks */}
        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Desk Charging Stations</h2>

        {/* Product sections */}
        {products.map((product, i) => (
          <div key={product.id}>
            <ProductSection product={product} />
            {/* Internal link callouts after specific products */}
            {product.id === "best-wireless" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">Want more wireless options?</strong> See our full guide:{" "}
                <Link prefetch={false} href="/guide/best-desk-setup-accessories" className="text-brand hover:underline font-medium">Best Desk Setup Accessories</Link>
              </div>
            )}
            {product.id === "best-multi-device" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">Need to charge 6+ devices?</strong> See our guide:{" "}
                <Link prefetch={false} href="/guide/best-usb-hub-for-desk" className="text-brand hover:underline font-medium">Best USB Hubs for Desk</Link>
              </div>
            )}
            {product.id === "best-compact" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">More compact picks:</strong>{" "}
                <Link prefetch={false} href="/guide/small-desk-setup" className="text-brand hover:underline font-medium">Small Desk Setup Ideas</Link>
              </div>
            )}
            {product.id === "best-organizer" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">More organizer options:</strong>{" "}
                <Link prefetch={false} href="/guide/small-desk-organization-ideas" className="text-brand hover:underline font-medium">Small Desk Organization Ideas</Link>
              </div>
            )}
          </div>
        ))}

        {/* ── BUYING GUIDE ── */}
        <div id="buying-guide" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">What to Look for in a Desk Charging Station</h2>

          {/* Wattage section */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">How Much Wattage Do You Actually Need?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              This is the question most buyers skip -- and then end up with a charger that trickle-charges their laptop while everything else waits.
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">Here&apos;s a quick reference for common device power requirements:</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Device</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical Power Draw</th>
                  </tr>
                </thead>
                <tbody>
                  {wattageTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.device}</td>
                      <td className="px-4 py-3 text-ink-secondary">{row.draw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
              <strong className="text-ink">Practical rule:</strong> Add up all devices you&apos;ll charge simultaneously, then add 20% buffer. A 5-device Apple setup (iPhone + Watch + AirPods + iPad + MacBook Air) needs roughly 80--90W minimum. The Anker Prime 200W handles that with room to spare.
              <br /><br />
              If you&apos;re only charging phones and earbuds, a 65W hub is plenty. Laptop users should look for at least 100W total with a primary port of 65W+.
            </div>
          </section>

          {/* Port Types */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Port Types: USB-A vs USB-C vs Wireless</h3>
            <div className="space-y-4">
              {[
                { label: "USB-A", desc: "The older rectangular port. Still everywhere -- on older phones, accessories, cables -- but maxes out at around 18--22.5W for fast charging. If your charging cables are the old-style plug, you have USB-A devices." },
                { label: "USB-C", desc: "The current standard. Most new phones, tablets, laptops, and accessories use USB-C. It supports USB Power Delivery (PD), which enables fast charging up to 240W on a single cable. If your newest devices use USB-C, prioritize stations with USB-C ports." },
                { label: "Wireless (Qi / Qi2 / MagSafe)", desc: "Eliminates cables entirely for compatible devices. Qi2 is the current open standard at 15W -- identical speed to Apple MagSafe but works on any Qi2-certified phone. If you have an iPhone 12 or newer (or any Qi2-compatible phone), a wireless pad makes desk charging noticeably cleaner." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                  <span className="font-bold text-brand shrink-0 text-sm">{item.label}</span>
                  <p className="text-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
              <strong className="text-ink">For most desks in 2026:</strong> Look for a mix of USB-C and USB-A ports. Pure USB-C stations are ideal if all your devices are current-generation. Keep at least one USB-A port for accessories, cables, and older devices.
            </div>
          </section>

          {/* Desk Footprint */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Desk Footprint: Does It Actually Fit?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              This is the most consistently overlooked spec in charging station reviews. The footprint -- the base area the charger occupies on your desk -- matters enormously, especially on smaller desks.
            </p>
            <p className="text-sm text-ink-secondary mb-4">A practical guide to desk space:</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Desk Width</th>
                    <th className="text-left px-4 py-3 font-semibold">Realistic Usable Charging Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {footprintTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.width}</td>
                      <td className="px-4 py-3 text-ink-secondary">{row.zone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink">Flat vs. upright chargers:</strong> Upright/tower chargers use height instead of desk area. They&apos;re ideal for small desks. Flat chargers with organizer tops (like the BESTEK) use more base area but add functionality above the footprint. Always check the base dimensions before buying. &quot;Compact&quot; in a manufacturer&apos;s description can mean anything.
            </p>
          </section>

          {/* Cable Management */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Cable Management: Does It Hide the Wires?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Most charging stations come with one power cord running to the wall -- which is already an improvement over five separate adapters. But the cables between your devices and the station can still create clutter.
            </p>
            <p className="text-sm text-ink-secondary mb-3">Look for:</p>
            <ul className="space-y-2 mb-4">
              {[
                { label: "Built-in cable channels or clips", desc: "on the station itself" },
                { label: "Retractable cables", desc: "(like the Baseus Nomos) that eliminate loose cables entirely" },
                { label: "Short (0.3m) charging cables", desc: "-- sold separately -- that keep connections tidy and close" },
                { label: "Under-desk routing", desc: "-- if you mount the station under the desk, all cables go downward and are invisible from above" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                  <span><strong className="text-ink">{item.label}</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">For a completely cable-free surface:</strong> Combine a wireless charging pad with{" "}
              <Link prefetch={false} href="/guide/best-under-desk-cable-trays" className="text-brand hover:underline font-medium">under-desk cable management solutions</Link>.
            </div>
          </section>

          {/* Design */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Design: Does It Look Good on Your Desk?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              This matters. If you spend hours at your desk, the charger sits in your peripheral vision constantly.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Minimalist desks", desc: "Look for matte black, white, or wooden-accented chargers. The Baseus Nomos, Anker Prime, and UGREEN Nexode all come in clean matte finishes." },
                { label: "Visible desks (video calls, client visits)", desc: "Avoid chargers with bright LED indicators or industrial-looking designs. Fanless models also eliminate the slight hum some units produce." },
                { label: "Small desk aesthetic", desc: "Vertical tower chargers are neater-looking than flat hubs with multiple cables radiating outward." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-white">
                  <p className="font-bold text-ink text-sm mb-2">{item.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── COMPARISON: Station vs Strip vs Bank ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Charging Station vs Power Strip vs Power Bank -- Which Do You Need?</h2>
          <p className="text-sm text-ink-secondary mb-5">These three products solve different problems. Here&apos;s how to tell them apart:</p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold">Charging Station</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Power Strip</th>
                  <th className="text-left px-4 py-3 font-semibold">Power Bank</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.station}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.strip}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.bank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-secondary mt-4 leading-relaxed">
            If you need to expand AC outlets in your room, a power strip is the answer. If you need charging on the go, a power bank. For daily desk charging of multiple devices, a dedicated charging station is the right tool.
          </p>
        </section>

        {/* ── COMPARISON: Station vs Docking Station ── */}
        <section className="mb-12 p-5 rounded-xl border border-border bg-bg">
          <h2 className="text-xl font-bold text-ink mb-3">Charging Station vs Docking Station -- What&apos;s the Difference?</h2>
          <p className="text-sm text-ink-secondary mb-3">A common point of confusion:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Charging station", desc: "Charges your devices&apos; batteries. That's it." },
              { label: "Docking station", desc: "Connects your laptop to monitors, Ethernet, USB peripherals, and also charges. Think of it as a hub for your entire desk setup." },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-border bg-white">
                <p className="font-bold text-ink text-sm mb-1">{item.label}</p>
                <p className="text-xs text-ink-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-ink-secondary mt-4">
            If you work with a laptop and external monitor(s), you probably want a docking station, not just a charging station.
          </p>
        </section>

        {/* ── HOW WE EVALUATED ── */}
        <section className="mb-12 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Picks</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Total wattage vs device mix", note: "Does the station's output actually cover a realistic combination of laptop + phone + tablets?" },
              { label: "Desk footprint", note: "Is the base footprint appropriate for small desks (under 40 inches), not just large home offices?" },
              { label: "Port mix and future compatibility", note: "USB-C PD, Qi2 wireless, and USB-A coverage for both current and legacy accessories." },
              { label: "Build and thermal performance", note: "GaN efficiency, fanless operation, and temperature management under sustained multi-device load." },
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
        <section id="faq" className="mb-12 scroll-mt-20">
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
        <section className="mb-12 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Bottom Line</h2>
          <div className="space-y-4">
            {[
              { product: "Anker Prime 200W", verdict: "the all-around best pick: enough power for a laptop alongside multiple devices, all USB-C and USB-A ports covered, GaN-quiet, and a footprint that fits beside a keyboard without crowding the space.", href: "#best-overall" },
              { product: "Anker MagSafe 3-in-1 Qi2", verdict: "eliminates phone/watch/AirPods cables completely -- and goes on deep discount regularly.", href: "#best-wireless" },
              { product: "Anker Nano 6-in-1", verdict: "delivers the most capability in the smallest footprint available.", href: "#best-compact" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary leading-relaxed">
                  For{" "}
                  {i === 0 ? "most desks" : i === 1 ? "Apple-only setups" : "the best small-desk pick"},{" "}
                  the{" "}
                  <a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">
                    {item.product}
                  </a>{" "}
                  {item.verdict}
                </p>
              </div>
            ))}
            <p className="text-sm text-ink-secondary mt-2">Whatever your setup, one charging station beats five separate cables every time.</p>
          </div>
        </section>

        {/* Amazon CTA */}
        <section className="mb-12 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse desk charging stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All products are Prime-eligible with free delivery.</p>
          <a
            href="https://www.amazon.com/s?k=desk+charging+station&tag=theofficejournal-20"
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
              { href: "/guide/best-usb-hub-for-desk", title: "Best USB Hubs for Desk", desc: "Powered and bus-powered hubs for consolidating desk connections" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under-Desk Cable Trays", desc: "Hide power strips and cables completely out of sight" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/small-desk-setup", title: "Small Desk Setup Ideas", desc: "15 smart ways to build a better compact workspace" },
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
