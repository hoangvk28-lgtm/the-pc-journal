import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, atAGlanceItems, laptopWattageRows, faq,
  type HomeOfficeProduct,
} from "@/data/guides/best-charging-stations-for-home-office";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-charging-stations-for-home-office",
  image: fallbackHeroImage, type: "article",
});

function ProductSection({ product }: { product: HomeOfficeProduct }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">Laptop PD: {product.laptopPD}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.devices} devices</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWins}</p>
            </div>
            {product.bodyParagraphs.map((para, i) => <p key={i} className="text-sm text-ink-secondary leading-relaxed">{para}</p>)}
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
              {product.specs.map((spec, i) => <li key={i} className="text-xs text-ink-secondary"><span className="font-semibold text-ink">{spec.label}:</span> {spec.value}</li>)}
            </ul>
          </div>
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
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border"><span className="font-semibold text-ink">Best for:</span> {product.bestFor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomeOfficeChargingPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-04", dateModified: "2026-06-04", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-charging-stations-for-home-office` }, about: [{ "@type": "Thing", name: "Home Office Charging Station" }, { "@type": "Thing", name: "Laptop Charging Hub" }, { "@type": "Thing", name: "Home Office Desk Accessories" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Charging Stations for Home Office", item: `${SITE_URL}/guide/best-charging-stations-for-home-office` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Charging Stations for Home Office 2026", numberOfItems: 5, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-charging-stations-for-home-office#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Best Charging Stations for Home Office</span>
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
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              5 picks -- laptop PD specs, GaN, video-call aesthetics
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best charging stations for home office desks" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Laptop PD</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Devices</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.laptopPD}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.devices}</td>
                    <td className="px-4 py-3"><a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>A home office desk has different charging demands than a regular desk -- and most charging station guides completely miss this. The difference: your laptop is not optional. A standard desk charging station review might list a &quot;best compact&quot; pick at 65W and call it good. But at home, on a video call, with your MacBook Pro running Zoom, three browser tabs, and Slack -- that 65W charger is running a deficit.</p>
          <p>Home office charging also has a professional appearance factor. If you are on camera regularly, what is visible behind your keyboard matters. A tangled pile of adapters reads as unprofessional. A single clean hub with one cord to the wall does not.</p>
          <p>This guide picks specifically for the home office context: laptop charging that actually works under load, multi-device support for a full work setup, and clean aesthetics for video-visible desks.</p>
        </section>

        {/* What Makes Home Office Different */}
        <section className="mb-12 scroll-mt-20" id="home-office-difference">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">What Makes a Home Office Charging Station Different</h2>

          {/* Laptop wattage */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-ink mb-3">Laptop Charging Is Non-Negotiable</h3>
            <p className="text-sm text-ink-secondary mb-4">At a home office, you want one hub for everything -- including the laptop. This changes the minimum spec significantly:</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Laptop</th>
                  <th className="text-left px-4 py-3 font-semibold">Minimum PD to charge under load</th>
                </tr></thead>
                <tbody>
                  {laptopWattageRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.laptop}</td>
                      <td className="px-4 py-3 font-bold text-brand">{row.minimum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-muted mt-2">Every pick in this guide has at least 100W on its primary USB-C port -- enough for any MacBook or Windows ultrabook at full load.</p>
          </div>

          {/* Professional aesthetics */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-ink mb-3">Professional Aesthetics Matter in a Home Office</h3>
            <p className="text-sm text-ink-secondary mb-3">If you take video calls from this desk, everything behind and around your keyboard is visible on camera.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-cta/30 bg-cta-light/20">
                <p className="text-xs font-bold text-cta uppercase tracking-widest mb-2">Reads well on video</p>
                <ul className="space-y-1.5">
                  {["One clean charging station with a single cord to the wall", "Matte black or white finish that blends with desk accessories", "No blinking LEDs visible in frame", "No tangled multi-adapter pile"].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full bg-cta mt-1.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-red-200 bg-red-50">
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">What to avoid</p>
                <ul className="space-y-1.5">
                  {["Bright blue or green LED indicators facing the camera", "Multiple large power bricks stacked near the monitor", "Visible cable chaos around the charging zone"].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Device list */}
          <div>
            <h3 className="text-lg font-bold text-ink mb-3">Home Office Setups Charge More Devices Than You Think</h3>
            <p className="text-sm text-ink-secondary mb-3">A typical home office daily charge list: laptop, phone, wireless earbuds, tablet, smartwatch, wireless mouse/keyboard, webcam. That is 5--7 devices regularly needing power from one desk. A 3-port charger does not cut it.</p>
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10"><h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 5 Picks at a Glance</h2><AtAGlance items={atAGlanceItems} /></section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[{ href: "#home-office-difference", label: "What's different" }, { href: "#best-overall", label: "Best Overall" }, { href: "#best-macbook-pro", label: "MacBook Pro 16\"" }, { href: "#best-wireless", label: "Best Wireless" }, { href: "#best-all-in-one", label: "All-in-One" }, { href: "#best-value", label: "Best Value" }, { href: "#setup", label: "Setup tips" }, { href: "#faq", label: "FAQ" }].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Home Office Charging Stations</h2>
        {products.map((product) => <ProductSection key={product.id} product={product} />)}

        {/* Setup section */}
        <section id="setup" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Home Office Charging Setup: The Right Way to Organize It</h2>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-border bg-white">
              <h3 className="font-bold text-ink text-base mb-3">Zone Your Desk for Charging</h3>
              <p className="text-sm text-ink-secondary mb-3">A home office desk has three zones. Place charging accordingly:</p>
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                {[
                  { zone: "Monitor Zone", items: "Monitor, speakers" },
                  { zone: "Work Zone", items: "Keyboard, mouse, notebook, coffee" },
                  { zone: "Charging Zone", items: "Charging hub, phone, watch" },
                ].map((item, i) => (
                  <div key={i} className={`p-3 rounded-lg border text-center ${i === 2 ? "border-brand/30 bg-brand/5" : "border-border bg-bg"}`}>
                    <p className="font-bold text-ink text-xs mb-1">{item.zone}</p>
                    <p className="text-xs text-ink-muted">{item.items}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-secondary">The charging zone lives at one back corner -- typically the corner nearest to your wall outlet. All device cables route to that corner. One power cord exits to the wall.</p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-white">
              <h3 className="font-bold text-ink text-base mb-3">Cable Routing for Video Call Desks</h3>
              <p className="text-sm text-ink-secondary mb-3">If your desk is on camera, cable routing matters as much as the charger choice.</p>
              <div className="space-y-2">
                {[
                  { item: "Short cables (30cm)", desc: "between the hub and devices sitting in the charging zone -- no slack" },
                  { item: "Desk cable clips", desc: "(adhesive, $5--8 pack on Amazon) route the hub's power cord along the desk's back edge to the wall" },
                  { item: "Hub placement behind monitor", desc: "-- the hub disappears behind the monitor stand, with only device cables visible in the charging zone" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-bg">
                    <span className="font-bold text-brand text-xs shrink-0 mt-0.5">{item.item}</span>
                    <p className="text-xs text-ink-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">Do You Need a Docking Station Instead?</strong>
                <p className="mt-1 text-xs">Get a docking station if you want to plug in one cable and have your entire desk come alive -- monitors, wired network, all USB devices, and laptop charging simultaneously.{" "}
                  <Link prefetch={false} href="/guide/best-docking-stations-for-desk-setup" className="text-brand hover:underline font-medium">Best Docking Stations for Desk Setup &rarr;</Link>
                </p>
              </div>
              <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">Under-Desk Option for Clean Video Desks</strong>
                <p className="mt-1 text-xs">For a desk always on camera, consider moving the charging station under the desk entirely. A clamp-mount station puts everything below the surface and completely out of frame.{" "}
                  <Link prefetch={false} href="/guide/under-desk-charging-station" className="text-brand hover:underline font-medium">Best Under-Desk Charging Stations &rarr;</Link>
                </p>
              </div>
            </div>
          </div>
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
              { product: "Anker Prime 200W", context: "For most home offices", verdict: "covers any laptop alongside a full device ecosystem, runs completely silent, and discounts regularly to ~$50 -- the easiest recommendation in this guide.", href: "#best-overall" },
              { product: "UGREEN Nexode 200W", context: "MacBook Pro 16\" users", verdict: "is the only compact hub that delivers 140W to the laptop at full speed, full stop.", href: "#best-macbook-pro" },
              { product: "TESSAN 130W 8-in-1", context: "Budget-conscious full setups", verdict: "at ~$28--38 delivers GaN efficiency, three AC outlets, and laptop-capable USB-C from one hub at a price that undercuts every other option by 40--60%.", href: "#best-value" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary"><strong className="text-ink">{item.context}:</strong> The{" "}<a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse home office charging stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">GaN, laptop-capable, all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=home+office+charging+station+gan&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "Full pillar guide across all categories" },
              { href: "/guide/best-charging-stations-for-multiple-devices-desk", title: "Best Multi-Device Charging Stations", desc: "When device count is the priority" },
              { href: "/guide/best-docking-stations-for-desk-setup", title: "Best Docking Stations for Desk Setup", desc: "One-cable desk connectivity with monitor support" },
              { href: "/guide/under-desk-charging-station", title: "Best Under-Desk Charging Stations", desc: "Remove the charger from the desk surface entirely" },
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
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Prices verified at time of writing -- always check current Amazon price before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
