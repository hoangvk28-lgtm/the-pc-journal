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
  deskSpaceTable,
  setupTips,
  faq,
  type SmallDeskCharger,
} from "@/data/guides/best-small-desk-charging-stations";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-small-desk-charging-stations",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: SmallDeskCharger }) {
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
            {/* Footprint badge */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">
                Footprint: {product.footprint}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.devices} devices
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
              </span>
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

export default async function BestSmallDeskChargingStationsPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-03", dateModified: "2026-06-03", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-small-desk-charging-stations` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Small Desk Charging Stations", item: `${SITE_URL}/guide/best-small-desk-charging-stations` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Small Desk Charging Stations 2026", description: "Top 5 compact charging stations for small desks, chosen by footprint size and real-world fit.", numberOfItems: 5, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-small-desk-charging-stations#${p.id}` })) };

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
          <span className="text-ink">Best Small Desk Charging Stations</span>
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
              5 picks chosen by footprint dimension
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
          <Image src={heroImg} alt="Best small desk charging stations" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
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
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Footprint</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Devices</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-sm">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.footprint}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.devices}</td>
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
          <p>Here is the reality of a small desk: 60 to 100 centimeters wide, your keyboard takes up roughly 40 cm, your mouse needs another 15 cm, and your monitor stand or laptop occupies a chunk of the back edge. The sliver of space left for a charging station is roughly 15 to 20 cm wide.</p>
          <p>Most charging station reviews completely ignore this. They test products on large studio desks, never mention footprint dimensions, and describe a 15 x 12 cm hub as &quot;compact.&quot; That is not compact when you have 15 cm of free space.</p>
          <p>This guide is built specifically for small desks. Every product below was chosen with its base dimensions as the primary filter. We measured, compared, and shortlisted only the chargers that realistically fit the desk sizes most people actually have -- dorm desks, apartment work corners, shared home office setups, and small standing desks.</p>
        </section>

        {/* At a Glance */}
        <section className="mb-10" id="at-a-glance">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 5 Picks at a Glance</h2>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "#best-overall", label: "Best Overall" },
              { href: "#best-slim", label: "Best Slim / Flat" },
              { href: "#best-vertical", label: "Best Vertical" },
              { href: "#best-wireless", label: "Best Wireless" },
              { href: "#best-budget", label: "Best Budget" },
              { href: "#how-to-choose", label: "How to choose" },
              { href: "#setup-tips", label: "Setup tips" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* H2 heading */}
        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Small Desk Charging Stations</h2>

        {/* Product sections */}
        {products.map((product) => (
          <div key={product.id}>
            <ProductSection product={product} />
            {product.id === "best-wireless" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">More wireless options:</strong>{" "}
                <Link prefetch={false} href="/guide/best-wireless-charging-stations-for-desk" className="text-brand hover:underline font-medium">
                  Best Wireless Charging Stations for Desk
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* ── HOW TO CHOOSE ── */}
        <div id="how-to-choose" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">How to Choose a Charging Station for a Small Desk</h2>

          {/* Step 1: Measure */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Step 1: Measure Your Available Space First</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Before anything else, measure the space you actually have. The &quot;charging zone&quot; on a small desk is typically the area between the edge of your keyboard and the edge of your monitor stand or laptop.
            </p>
            <p className="text-sm text-ink-secondary mb-4">A practical guide:</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Desk Width</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Keyboard + Mouse Zone</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical Charging Zone Left</th>
                  </tr>
                </thead>
                <tbody>
                  {deskSpaceTable.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-bg"} ${row.highlight ? "font-semibold" : ""}`}>
                      <td className="px-4 py-3 text-ink">{row.width}</td>
                      <td className="px-4 py-3 text-ink-secondary hidden sm:table-cell">~40 cm keyboard + 10 cm mouse</td>
                      <td className={`px-4 py-3 ${row.highlight ? "text-red-600 font-bold" : "text-ink-secondary"}`}>{row.zone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed mb-3">
              If your desk is 80 cm or under, the Anker Nano (9.9 cm base) or Anker PowerPort 5 are the only picks in this guide that reliably fit in the available zone. Everything else benefits from a 100 cm+ desk.
            </p>
            <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
              <strong className="text-ink">Pro move:</strong> Place the charger at the back corner of your desk -- the dead zone between monitor and wall -- rather than beside your keyboard. Corner placement opens 5--8 extra centimeters compared to straight-across positioning.
            </div>
          </section>

          {/* Vertical vs Flat */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Vertical vs. Flat: Which Saves More Space?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              This is the question most people skip, and it matters more than the listed footprint number.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Flat chargers", example: "Anker Nano, Anker 615", desc: "Spread across the desk surface. What you see in the spec sheet is what you get -- the footprint is the footprint." },
                { label: "Vertical chargers", example: "Anker 525", desc: "Trade horizontal area for height. The base dimensions are similar, but the unit rises upward. On a small desk, vertical chargers feel less intrusive because they don't spread into your working zone -- they just stand in a corner." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-white">
                  <p className="font-bold text-ink text-sm mb-1">{item.label} <span className="text-xs font-normal text-ink-muted">({item.example})</span></p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
              <strong className="text-ink">Rule of thumb:</strong> If your desk is under a shelf with tight vertical clearance, go flat. If your desk has open space above it (normal setup), go vertical -- it will feel less crowded even with the same base area.
            </div>
          </section>

          {/* Wireless? */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Does It Need Wireless Charging?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Adding a wireless pad to a small desk seems like it saves space -- no cable dangling to the phone -- and it does, but only if you use it consistently.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl border border-cta/30 bg-cta-light/20">
                <p className="text-xs font-bold uppercase tracking-widest text-cta mb-2">Wireless works well when</p>
                <ul className="space-y-1.5">
                  {[
                    "You're in an Apple ecosystem and use the 3-in-1 wireless stand",
                    "Your phone always stays in the same spot on the desk while charging",
                    "You want a truly cable-free desk surface aesthetic",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-cta mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">Wired works better when</p>
                <ul className="space-y-1.5">
                  {[
                    "You charge different devices each day",
                    "You need to charge a laptop too",
                    "Budget matters (wireless adds ~$20--40 vs. a comparable wired option)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              For most small desks, a compact wired charger -- paired with one short 30 cm cable per device -- creates a neater result than a wireless pad surrounded by partial cables.
            </p>
          </section>

          {/* Cable Management */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Cable Management for Small Desks</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              The charger footprint is only half the equation. Cables radiating from a charging station can create more visual clutter than the charger itself. On a small desk, that mess is amplified -- there is no space to hide it.
            </p>
            <p className="text-sm text-ink-secondary mb-3">Four things that make a real difference:</p>
            <div className="space-y-3">
              {[
                { item: "Use short cables (30 cm / 1 ft)", desc: "A 30 cm USB-C cable keeps a phone close to the charger with almost no slack. Standard 1-meter cables pile up in loops on small desks." },
                { item: "Cable clips along the desk edge", desc: "Small adhesive clips (available in packs for under $5) route cables along the back edge of the desk and down to the charger. Invisible from the front." },
                { item: "Choose a charger with a built-in cord", desc: "The Anker 615 and Anker 525 have built-in cords routed to the wall -- one less loose cable on your desk surface." },
                { item: "Mount under the desk if possible", desc: "For the cleanest possible small-desk surface, an under-desk power station completely removes the charger from your surface." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                  <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-ink mb-0.5">{item.item}</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Laptop section */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Do You Actually Need to Charge a Laptop?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-3">
              This narrows your options significantly. Here is why:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "A laptop needs at least 65W from a single USB-C port to charge while in use",
                "On a small desk, that often means choosing a charger with fewer ports to keep the footprint minimal",
                "The Anker Nano, Anker 615, and Anker 525 all support 65W USB-C -- but their total wattage means other devices charge more slowly when the laptop is connected",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
              If you primarily charge a laptop at a separate adapter and only need the small charging station for phones, tablets, and accessories, the Anker PowerPort 5 is perfectly adequate. If laptop charging matters, the Anker Nano or Anker 615 are the right compact options.
            </div>
          </section>
        </div>

        {/* ── SETUP TIPS ── */}
        <section id="setup-tips" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Small Desk Charging Station Setup Tips</h2>
          <p className="text-sm text-ink-secondary mb-6">These tips take five minutes and make a visible difference in how clean your small desk looks.</p>
          <div className="space-y-4">
            {setupTips.map((tip) => (
              <div key={tip.number} className="p-5 rounded-xl border border-border bg-white">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    {tip.number}
                  </span>
                  <div>
                    <p className="font-bold text-ink text-sm mb-1">{tip.title}</p>
                    <p className="text-sm text-ink-secondary leading-relaxed">{tip.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW WE EVALUATED ── */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Picks</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Footprint as primary filter", note: "Every pick was measured and verified against the charging zones available on 60--120 cm wide desks." },
              { label: "Vertical vs flat real-world fit", note: "Not just base dimensions -- how the unit actually feels on a crowded desk with keyboard, monitor, and other accessories in place." },
              { label: "Port mix for small-desk users", note: "USB-C PD for laptop and modern device charging, USB-A for accessories, AC outlets for lamps and adapters." },
              { label: "Value at price point", note: "Each pick was evaluated on what it delivers relative to its price, with a specific eye on the budget segment where features are most constrained." },
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
              { product: "Anker Nano 6-in-1", verdict: "is the right pick for most small desks: the smallest base area for a full-function charger, two AC outlets included, GaN technology, and a flat profile that disappears in a back corner.", href: "#best-overall" },
              { product: "Anker PowerPort 5", verdict: "is the call for desks genuinely tight on space and budget -- its minimal footprint and under-$20 price mean the decision is low-risk.", href: "#best-budget" },
              { product: "Anker MagSafe 3-in-1 Qi2", verdict: "is the answer for all-Apple setups wanting zero cables on the desk surface -- it trades wired ports for a dramatically cleaner desk aesthetic.", href: "#best-wireless" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {["For most small desks, the", "If your desk is genuinely tiny, the", "If you're all-Apple and want zero cables, the"][i]}{" "}
                  <a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}
                </p>
              </div>
            ))}
            <p className="text-sm text-ink-secondary mt-2">
              Whatever you choose: measure your available space first, route cables along the back edge, and place the charger in a corner. The charger choice is secondary to the placement.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse small desk charging stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All products are Prime-eligible. Sorted by footprint so you can find what actually fits.</p>
          <a
            href="https://www.amazon.com/s?k=small+desk+charging+station&tag=theofficejournal-20"
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
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "Full roundup across all categories -- wired, wireless, and multi-device" },
              { href: "/guide/best-wireless-charging-stations-for-desk", title: "Best Wireless Charging Stations for Desk", desc: "If you want to go cable-free" },
              { href: "/guide/small-desk-setup", title: "Small Desk Setup Ideas", desc: "15 practical ideas for building a better compact workspace" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under-Desk Cable Trays", desc: "Remove the charger from the surface entirely" },
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
