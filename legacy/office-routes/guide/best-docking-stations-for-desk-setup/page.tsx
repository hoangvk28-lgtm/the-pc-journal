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
  dockVsHubRows,
  tbComparisonRows,
  monitorCountRows,
  chargingWattageRows,
  faq,
  type DockProduct,
} from "@/data/guides/best-docking-stations-for-desk-setup";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-docking-stations-for-desk-setup",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: DockProduct }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">{product.connection}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.monitors} monitors</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.charging} charging</span>
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

export default async function BestDockingStationsPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-03", dateModified: "2026-06-03", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-docking-stations-for-desk-setup` }, about: [{ "@type": "Thing", name: "Docking Station" }, { "@type": "Thing", name: "Thunderbolt 4 Dock" }, { "@type": "Thing", name: "Laptop Desk Setup" }], mentions: [{ "@type": "Thing", name: "Thunderbolt 4" }, { "@type": "Thing", name: "Thunderbolt 5" }, { "@type": "Thing", name: "USB4" }, { "@type": "Thing", name: "USB-C Power Delivery" }, { "@type": "Thing", name: "Dual Monitor Setup" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Docking Stations for Desk Setup", item: `${SITE_URL}/guide/best-docking-stations-for-desk-setup` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Docking Stations for Desk Setup 2026", description: "Top 6 docking stations for laptop desk setups -- from budget USB-C hubs to Thunderbolt 5 powerhouses, ranked by use case.", numberOfItems: 6, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-docking-stations-for-desk-setup#${p.id}` })) };

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
          <span className="text-ink">Best Docking Stations for Desk Setup</span>
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
              TB4, USB4, USB-C -- 6 picks with 5-step setup guide
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Learn more</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best docking stations for desk setup" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
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
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Connection</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Monitors</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Charging</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.connection}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.monitors}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.charging}</td>
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
          <p>Right now, most laptop desk setups look like this: one power adapter plugged into the wall, one HDMI cable to the monitor, one USB dongle for the keyboard and mouse, one USB-A for the webcam, another USB-C cable dangling for phone charging. Pick up the laptop to take it to a meeting, and you unplug six things. Set it back down, and you replug six things.</p>
          <p>A docking station turns that into one cable. Plug in the Thunderbolt or USB-C cable, and the laptop instantly connects to every monitor, peripheral, and charger at once. Pick it up, pull one cable. Come back, plug in one cable.</p>
          <p>This guide explains what docking stations actually do, which standard you actually need (hint: most people do not need Thunderbolt 5), and the six best options for real home office and desk setups in 2026.</p>
        </section>

        {/* ── WHAT IS A DOCKING STATION? ── */}
        <section className="mb-12 scroll-mt-20" id="what-is-a-dock">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">What Is a Docking Station? (And How Is It Different From a USB Hub?)</h2>
          <p className="text-sm text-ink-secondary mb-5">
            This is the question competitors assume you already know the answer to. Most people searching &quot;docking station for desk setup&quot; are not IT professionals -- they have a laptop, they want a cleaner desk, and they are confused about what they actually need.
          </p>

          <h3 className="text-base font-bold text-ink mb-3">Docking Station vs. USB Hub vs. Charging Station</h3>
          <div className="overflow-x-auto rounded-xl border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold">Docking Station</th>
                  <th className="text-left px-4 py-3 font-semibold">USB Hub</th>
                  <th className="text-left px-4 py-3 font-semibold">Charging Station</th>
                </tr>
              </thead>
              <tbody>
                {dockVsHubRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                    <td className="px-4 py-3 text-xs text-ink-secondary">{row.dock}</td>
                    <td className="px-4 py-3 text-xs text-ink-secondary">{row.hub}</td>
                    <td className="px-4 py-3 text-xs text-ink-secondary">{row.charger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">The practical rule:</strong> If you want one cable to connect your laptop to monitors + keyboard + mouse + network + phone charging, you need a docking station. If you just need extra USB ports and maybe video out, a USB hub is enough.
          </div>
          <p className="text-xs text-ink-muted mt-3">
            <strong>For charging-only (no monitor connection):</strong>{" "}
            <Link prefetch={false} href="/guide/best-charging-stations-for-desk" className="text-brand hover:underline font-medium">Best Charging Stations for Desk</Link>
          </p>
        </section>

        {/* ── DO YOU NEED TB4? ── */}
        <section className="mb-12 scroll-mt-20" id="do-you-need-tb4">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Do You Actually Need Thunderbolt 4?</h2>
          <p className="text-sm text-ink-secondary mb-5">
            This is the question that matters most for buyers, and the one review sites consistently fail to answer simply.
          </p>

          <h3 className="text-base font-bold text-ink mb-3">Thunderbolt 4 vs. USB-C vs. USB4 -- Plain English</h3>
          <div className="overflow-x-auto rounded-xl border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold">USB-C</th>
                  <th className="text-left px-4 py-3 font-semibold">USB4</th>
                  <th className="text-left px-4 py-3 font-semibold">Thunderbolt 4</th>
                  <th className="text-left px-4 py-3 font-semibold">Thunderbolt 5</th>
                </tr>
              </thead>
              <tbody>
                {tbComparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                    <td className="px-4 py-3 text-xs text-ink-secondary">{row.usbC}</td>
                    <td className="px-4 py-3 text-xs text-ink-secondary">{row.usb4}</td>
                    <td className="px-4 py-3 text-xs font-medium text-brand">{row.tb4}</td>
                    <td className="px-4 py-3 text-xs text-ink-secondary">{row.tb5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Choose Thunderbolt 4 if:", items: ["Your laptop has a Thunderbolt port (look for the ⚡ symbol on the port)", "You run two 4K monitors or one 4K + one 1440p", "You need maximum stability and bandwidth (video editors, developers)", "You use a MacBook Pro or MacBook Air M3/M4"] },
              { label: "Choose USB4 if:", items: ["Your laptop has USB4 but not Thunderbolt (common on mid-range Windows laptops)", "You need two monitors at 4K60 without paying TB4 prices", "The Plugable USB4 dock is a strong choice here"] },
              { label: "USB-C dock is enough if:", items: ["You only need one external monitor", "You want the most affordable single-cable desk solution", "You are not doing video editing or high-bandwidth work"] },
            ].map((col, i) => (
              <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "border-brand/30 bg-brand/5" : "border-border bg-white"}`}>
                <p className="text-xs font-bold text-ink uppercase tracking-wide mb-2">{col.label}</p>
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

          <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
            <strong className="text-ink">How to check your laptop port:</strong>
            <ul className="mt-2 space-y-1.5">
              {[
                "MacBook (M1/M2/M3/M4): all ports are Thunderbolt -- get a TB4 dock",
                "Dell XPS / HP Spectre / Lenovo ThinkPad X1: look for ⚡ on port or check spec sheet",
                "Budget Windows laptops (under $800): likely USB-C only, not Thunderbolt -- get a USB4 or USB-C dock",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                  <span className="w-1 h-1 rounded-full bg-brand-muted mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
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
              { href: "#what-is-a-dock", label: "Dock vs Hub" },
              { href: "#do-you-need-tb4", label: "Do you need TB4?" },
              { href: "#best-overall", label: "Best Overall" },
              { href: "#best-macbook", label: "Best MacBook" },
              { href: "#best-triple", label: "Triple Display" },
              { href: "#best-usb4", label: "USB4 Non-TB" },
              { href: "#best-budget", label: "Best Budget" },
              { href: "#best-premium", label: "Best Premium" },
              { href: "#setup-guide", label: "5-step setup" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Docking Stations for Desk Setup</h2>

        {/* Products */}
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* ── 5-STEP SETUP GUIDE ── */}
        <div id="setup-guide" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">How to Set Up a Docking Station for Your Desk</h2>

          {/* Step 1 */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Step 1 -- Check Your Laptop Port</h3>
            <p className="text-sm text-ink-secondary mb-4">Before buying anything, identify what port(s) your laptop has:</p>
            <div className="space-y-2 mb-3">
              {[
                { port: "MacBook (any M-series)", action: "Thunderbolt 4 ports -- any TB4 dock works" },
                { port: "⚡ symbol on Windows laptop port", action: "Thunderbolt -- any TB3/TB4/TB5 dock works" },
                { port: "USB4 symbol (two arrows)", action: "USB4 dock or TB4 dock in USB4 mode" },
                { port: "USB-C with no symbol", action: "Standard USB-C -- use the Anker 8-in-1 or any USB-C dock, not Thunderbolt" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                  <span className="font-bold text-brand text-xs shrink-0 mt-0.5 whitespace-nowrap">{item.port}</span>
                  <p className="text-xs text-ink-secondary">{item.action}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-secondary">
              Buying a Thunderbolt 4 dock for a USB-C-only laptop means you overspend on bandwidth the laptop cannot use.
            </p>
          </section>

          {/* Step 2 */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Step 2 -- Count Your Monitors</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Monitor count</th>
                    <th className="text-left px-4 py-3 font-semibold">What you need</th>
                  </tr>
                </thead>
                <tbody>
                  {monitorCountRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-semibold text-ink">{row.count}</td>
                      <td className="px-4 py-3 text-ink-secondary">{row.needs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 3 */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Step 3 -- List Your Peripherals</h3>
            <p className="text-sm text-ink-secondary mb-4">Write down every device you connect to your laptop regularly:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { device: "External keyboard + mouse", port: "need 2x USB-A or USB receiver" },
                { device: "Wired webcam", port: "USB-A" },
                { device: "External SSD or USB drive", port: "USB-A or USB-C" },
                { device: "Wired headset / audio interface", port: "3.5mm or USB audio" },
                { device: "Ethernet cable", port: "Gigabit or 2.5GbE port" },
                { device: "SD card / camera", port: "SD card reader" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-xl border border-border bg-white">
                  <span className="font-semibold text-ink text-xs shrink-0">{item.device}</span>
                  <span className="text-ink-muted text-xs">-- {item.port}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-secondary mt-3">
              Count the ports and ensure your dock has enough. Most full-size TB4 docks (Anker 777, CalDigit TS4) cover a fully loaded desk without running short.
            </p>
          </section>

          {/* Step 4 */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Step 4 -- Choose Laptop Charging Wattage</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Laptop</th>
                    <th className="text-left px-4 py-3 font-semibold">Minimum dock charging</th>
                    <th className="text-left px-4 py-3 font-semibold">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {chargingWattageRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.laptop}</td>
                      <td className="px-4 py-3 text-ink-secondary">{row.minimum}</td>
                      <td className="px-4 py-3 font-bold text-brand">{row.recommended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary">
              Docks that charge below the laptop&apos;s minimum will not charge while the laptop is under load -- the battery drains even when connected. Always verify the dock&apos;s Power Delivery wattage exceeds your laptop&apos;s minimum.
            </p>
          </section>

          {/* Step 5 */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-ink mb-3">Step 5 -- Place the Dock on Your Desk</h3>
            <div className="space-y-3">
              {[
                { option: "On the desk surface", desc: "Standard placement. The dock sits beside the laptop or monitor stand. Route the Thunderbolt/USB-C cable to the laptop and all peripheral cables into the dock." },
                { option: "Under the desk (mounted)", desc: "Cleaner surface, all cables routed down and out of sight. Compatible with most docks via under-desk mounts or cable management trays." },
                { option: "On a monitor arm shelf", desc: "Some monitor arms have a cable management shelf -- the dock clips onto the arm itself, removing it from the desk entirely." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white">
                  <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-bold text-ink text-sm mb-0.5">{item.option}</p>
                    <p className="text-xs text-ink-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* How We Evaluated */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Picks</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Connection standard match", note: "Does the dock standard match what the laptop port can actually use? TB4 pricing is only justified for TB-equipped laptops." },
              { label: "Laptop charging wattage", note: "Is the dock's PD wattage sufficient to charge the laptop under real load -- not just at idle?" },
              { label: "Port coverage for real desks", note: "Does the port selection cover keyboard, mouse, webcam, Ethernet, SD, audio, and phone charging simultaneously?" },
              { label: "Display output stability", note: "Stable at 4K@60Hz under sustained use, not just on cold boot. Multi-monitor stability is the most common failure mode on low-cost docks." },
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
              { product: "Anker 777 Thunderbolt 4", verdict: "is the best starting point. Twelve ports, 90W charging, two 4K monitors, Gigabit Ethernet, at a fair Thunderbolt price.", href: "#best-overall" },
              { product: "CalDigit TS4", verdict: "is the upgrade for MacBook Pro heavy users who need maximum stability and 2.5GbE.", href: "#best-macbook" },
              { product: "Plugable USB4 Dual HDMI", verdict: "gives you the same 40 Gbps bandwidth and 4K@120Hz for significantly less money -- if your laptop has USB4 but not Thunderbolt.", href: "#best-usb4" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {["For most home office and desk setups, the", "For MacBook Pro heavy users,", "For Windows laptops with USB4 but not Thunderbolt,"][i]}{" "}
                  <a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}
                </p>
              </div>
            ))}
            <div className="mt-2 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm font-bold text-red-700 mb-1">Important:</p>
              <p className="text-sm text-red-700">Do not buy a Thunderbolt dock if your laptop does not have a Thunderbolt port. The Anker 8-in-1 USB-C hub at $55--80 covers a single-monitor home office for any USB-C laptop without paying the Thunderbolt premium.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse docking stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">TB4, USB4, and USB-C options -- all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=thunderbolt+docking+station+desk&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "If you need device charging, not monitor connectivity" },
              { href: "/guide/best-charging-stations-for-multiple-devices-desk", title: "Best Multi-Device Charging Stations", desc: "When monitors aren't the priority" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/ergonomic-desk-setup", title: "Ergonomic Desk Setup Guide", desc: "How to position everything correctly" },
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
