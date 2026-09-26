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
  whatSlotsTable,
  comboVsSeparateRows,
  faq,
  type OrganizerProduct,
} from "@/data/guides/best-charging-station-desk-organizers";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-charging-station-desk-organizers",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: OrganizerProduct }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">{product.charging}</span>
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

export default async function BestDeskOrganizersPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-03", dateModified: "2026-06-03", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-charging-station-desk-organizers` }, about: [{ "@type": "Thing", name: "Charging Station Desk Organizer" }, { "@type": "Thing", name: "Wireless Charging Desk Organizer" }, { "@type": "Thing", name: "Desk Accessories" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Charging Station Desk Organizers", item: `${SITE_URL}/guide/best-charging-station-desk-organizers` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Charging Station Desk Organizers 2026", description: "Top 6 desk organizers with built-in charging, chosen for genuine organizer function and real charging performance.", numberOfItems: 6, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-charging-station-desk-organizers#${p.id}` })) };

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
          <span className="text-ink">Best Charging Station Desk Organizers</span>
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
              6 picks -- wireless, USB hub, mat, and compact options
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Learn more</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best charging station desk organizers" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
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
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Charging</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Organizer Features</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-sm">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.charging}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.organizerFeatures}</td>
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
          <p>Two products on your desk: a charger and an organizer. Two cables to the wall. Two footprints eating into your workspace. Two separate things to buy, arrange, and eventually knock over.</p>
          <p>A charging station desk organizer solves this the clean way -- one product, one cable, one footprint. Your phone charges. Your pens have a home. Your watch goes in a slot. Your sticky notes don&apos;t migrate to the floor anymore.</p>
          <p>The market for these has matured fast. You can now get everything from a $25 USB hub with adjustable phone slots to a $130 full-desk mat that charges through the surface. The hard part is knowing which version of &quot;organizer + charger&quot; actually matches how you use your desk.</p>
          <p>This guide breaks it down by use case. Every pick below was chosen because it genuinely does both jobs -- not just a charger with a token pen slot, and not just an organizer with a weak wireless pad stapled on.</p>
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
              { href: "#best-overall", label: "Best Overall" },
              { href: "#best-wireless", label: "Best Wireless" },
              { href: "#best-usb-hub", label: "Best USB Hub" },
              { href: "#best-desk-mat", label: "Best Mat + Charger" },
              { href: "#best-compact", label: "Best Compact" },
              { href: "#best-budget", label: "Best Budget" },
              { href: "#what-to-look-for", label: "What to look for" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Charging Station Desk Organizers</h2>

        {/* Product sections */}
        {products.map((product) => (
          <div key={product.id}>
            <ProductSection product={product} />
            {product.id === "best-usb-hub" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">Need to charge 6+ devices?</strong>{" "}
                <Link prefetch={false} href="/guide/best-charging-stations-for-multiple-devices-desk" className="text-brand hover:underline font-medium">Best Charging Stations for Multiple Devices</Link>
              </div>
            )}
            {product.id === "best-desk-mat" && (
              <div className="mb-8 p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
                <strong className="text-ink">More wireless mat options:</strong>{" "}
                <Link prefetch={false} href="/guide/best-wireless-charging-stations-for-desk" className="text-brand hover:underline font-medium">Best Wireless Charging Stations for Desk</Link>
              </div>
            )}
          </div>
        ))}

        {/* ── WHAT TO LOOK FOR ── */}
        <div id="what-to-look-for" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">What to Look for in a Charging Station Desk Organizer</h2>

          {/* What slots */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">The Organizer Half: What Slots Do You Actually Use?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              Most buyers focus on the charging specs and overlook the organizer side -- then end up with a unit that has four slots but they only use one. Before choosing, do a 30-second inventory of what actually sits on your desk right now:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">What&apos;s on your desk</th>
                    <th className="text-left px-4 py-3 font-semibold">Organizer feature you need</th>
                  </tr>
                </thead>
                <tbody>
                  {whatSlotsTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.onDesk}</td>
                      <td className="px-4 py-3 text-ink-secondary">{row.feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              The best organizer-charger for your desk is the one whose compartments match this list -- not the one with the most total compartments.
            </p>
          </section>

          {/* Wireless vs USB */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Wireless vs. USB: Choosing the Right Charging Side</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Choose wireless (Qi/Qi2) if", items: ["Your phone charges wirelessly and you want zero cables to the device", "Aesthetics matter -- no cable running from charger to phone is visibly cleaner", "You're in an Apple ecosystem where Qi2/MagSafe delivers full speed"] },
                { label: "Choose USB if", items: ["You charge Android and Apple devices -- USB-C PD charges any device at full speed", "You need to charge tablets or laptops (USB-C PD handles this, wireless does not)", "You charge 4+ devices simultaneously -- USB hubs scale better than wireless pads"] },
                { label: "Choose both (like Satechi) if", items: ["Your phone goes wireless while tablets and accessories stay wired", "You want one hub for the whole desk, not two separate charging zones"] },
              ].map((col, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-white">
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">{col.label}</p>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                        <span className="w-1 h-1 rounded-full bg-brand mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Wireless pad position */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Does the Wireless Pad Position Actually Work?</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              This is the detail that separates organizers that work from ones you stop using after a week. The wireless pad needs to be <strong className="text-ink">accessible and not blocked by the organizer&apos;s other compartments.</strong> On some units, the wireless pad sits under an overhang or beside a compartment that forces you to place your phone at an angle -- meaning it misses the charging sweet spot and never fully charges.
            </p>
            <div className="space-y-2 mb-2">
              <p className="text-sm font-semibold text-ink">Before buying, check that:</p>
              {[
                "The wireless pad is on the top or front face -- not buried under slots",
                "The pad area is large enough for your specific phone size",
                "If using MagSafe (Qi2), the pad has the magnetic ring alignment",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                  <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs">{i + 1}</span>
                  <p className="text-xs text-ink-secondary">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cable management */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Cable Management: The Feature Nobody Shows in Product Photos</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              A charging station desk organizer with no cable management creates ironic clutter -- you bought it to declutter, but the charging cables for 6 devices now radiate from one spot on your desk like a spider web.
            </p>
            <div className="space-y-3 mb-2">
              {[
                { label: "Hollow base / cable channel (Satechi)", desc: "Cables thread inside the unit body and exit at the back" },
                { label: "Back-exit cable routing (most units)", desc: "At minimum, cables should exit from the rear, not the sides or front" },
                { label: "Short cables", desc: "Always use 30 cm cables between devices and the organizer -- available on Amazon for under $5 each, dramatically reduces cable mess" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                  <span className="font-bold text-brand text-xs shrink-0 mt-0.5">{item.label}</span>
                  <p className="text-xs text-ink-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Combo vs Separate */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Organizer + Charger vs. Two Separate Products</h3>
            <p className="text-sm text-ink-secondary mb-4">The honest comparison:</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold"></th>
                    <th className="text-left px-4 py-3 font-semibold">Combo Organizer-Charger</th>
                    <th className="text-left px-4 py-3 font-semibold">Separate Organizer + Charger</th>
                  </tr>
                </thead>
                <tbody>
                  {comboVsSeparateRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.combo}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.separate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              For most desks under 100 cm wide: the combo wins on footprint and cable count. For large desks where best-in-class charging and best-in-class organization both matter, two separate products (like the Anker Prime 200W for charging + a premium bamboo organizer) can deliver better results at a similar total cost.
            </p>
          </section>
        </div>

        {/* How We Evaluated */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Picks</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Both jobs, genuinely", note: "Every pick had to deliver real charging function AND real organizer function -- not just a token slot bolted onto a charger." },
              { label: "Wireless pad accessibility", note: "Tested whether the wireless charging zone was actually usable or blocked/awkward due to organizer compartment placement." },
              { label: "Cable management built in", note: "Does the unit help keep charging cables tidy, or does it create a second source of clutter?" },
              { label: "Value at price point", note: "Combo products carry a premium over standalone chargers. Evaluated whether the organizer function justified the added cost." },
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
              { product: "Satechi 7-Port with Velcro dividers", verdict: "is the best all-rounder -- aluminum build, genuine cable management, wireless pad on top, and adjustable device slots that fit anything from a slim phone to a tablet.", href: "#best-overall" },
              { product: "TopMade 4-Slot Wireless Organizer", verdict: "packs surprising function into its compact footprint -- four real compartments, velvet lining, and an upright phone stand that makes it both a charger and the most useful organizer in this price range.", href: "#best-compact" },
              { product: "POUT H3 SplitMax charging mat", verdict: "hides the charging function in the mat itself and adds a magnetic tray organizer -- ideal if you want the wireless charging integrated into your desk surface without any standalone unit.", href: "#best-desk-mat" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {["For most desks, the", "For wireless-first setups on a tighter budget, the", "For the cleanest possible desk surface, the"][i]}{" "}
                  <a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse desk organizer chargers on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All products are Prime-eligible with free delivery.</p>
          <a href="https://www.amazon.com/s?k=charging+station+desk+organizer&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "Full roundup including non-organizer picks" },
              { href: "/guide/best-small-desk-charging-stations", title: "Best Small Desk Charging Stations", desc: "Compact picks for tight spaces" },
              { href: "/guide/best-wireless-charging-stations-for-desk", title: "Best Wireless Charging Stations for Desk", desc: "Wireless-first setups" },
              { href: "/guide/small-desk-organization-ideas", title: "Small Desk Organization Ideas", desc: "Practical organization tips for compact workspaces" },
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
