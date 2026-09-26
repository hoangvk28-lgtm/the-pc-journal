import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, atAGlanceItems, kvmComparisonRows, faq,
  type LaptopDesktopDock,
} from "@/data/guides/best-docking-stations-for-laptop-and-desktop";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-docking-stations-for-laptop-and-desktop",
  image: fallbackHeroImage, type: "article",
});

function ProductSection({ product }: { product: LaptopDesktopDock }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">{product.hosts} host{product.hosts !== "1 (TB4)" ? "s" : ""}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.monitors}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.charging}</span>
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
              {product.specs.map((spec, i) => (
                <li key={i} className="text-xs text-ink-secondary"><span className="font-semibold text-ink">{spec.label}:</span> {spec.value}</li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>{pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>{con}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border"><span className="font-semibold text-ink">Best for:</span> {product.bestFor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function DockingLaptopDesktopPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-04", dateModified: "2026-06-04", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-docking-stations-for-laptop-and-desktop` }, about: [{ "@type": "Thing", name: "KVM Docking Station" }, { "@type": "Thing", name: "Docking Station for Laptop and Desktop" }, { "@type": "Thing", name: "Dual Computer Desk Setup" }], mentions: [{ "@type": "Thing", name: "KVM Switch" }, { "@type": "Thing", name: "Thunderbolt 4" }, { "@type": "Thing", name: "USB4" }, { "@type": "Thing", name: "Dual Monitor Setup" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Docking Stations for Laptop and Desktop", item: `${SITE_URL}/guide/best-docking-stations-for-laptop-and-desktop` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Docking Stations for Laptop and Desktop 2026", numberOfItems: 7, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-docking-stations-for-laptop-and-desktop#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Docking Stations for Laptop and Desktop</span>
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
              4 picks -- KVM, USB4, TB4, budget
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best docking stations for laptop and desktop" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10" id="quick-picks">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Hosts</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Monitors</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">PD</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.hosts}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.monitors}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.charging}</td>
                    <td className="px-4 py-3"><a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>Most desk setups have one computer. But a growing number of people have two: a work laptop that belongs to their employer, and a personal desktop or personal laptop at home. Every morning the work laptop arrives, and every evening it leaves. The personal machine stays.</p>
          <p>Without the right dock, this means two sets of monitors, two keyboards, two mice -- or an annoying cable-swap routine every morning and evening. With the right dock, one cable connects whichever computer is active to the full desk setup: monitors, keyboard, mouse, Ethernet, audio, and charging.</p>
          <p>This guide is specifically for that dual-computer situation. It covers what a KVM docking station is (and when you need one), what works with both a laptop and a desktop, and four picks for different budgets and connection requirements.</p>
        </section>

        {/* KVM vs Standard */}
        <section className="mb-12 scroll-mt-20" id="kvm-vs-standard">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">The Key Concept: KVM vs Standard Dock</h2>
          <p className="text-sm text-ink-secondary mb-5">This is the question everyone skips, so the buying decision gets confusing.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {[
              { label: "Standard Docking Station", items: ["Connects one laptop to monitors, Ethernet, and peripherals via one cable", "When you switch to your desktop, you disconnect from the dock and plug into the desktop directly", "Fine if your desk is used by one computer at a time, with a few minutes to re-plug"] },
              { label: "KVM Docking Station", items: ["Connects two computers to the same monitors, keyboard, and mouse", "A button (or hotkey) switches the entire peripheral set between Computer A and Computer B -- monitors change input, keyboard and mouse swap, instantly", "No cable unplugging. No re-plugging. One press or hotkey"] },
            ].map((col, i) => (
              <div key={i} className={`p-4 rounded-xl border ${i === 1 ? "border-brand/30 bg-brand/5" : "border-border bg-white"}`}>
                <p className="font-bold text-ink text-sm mb-2">{col.label}</p>
                <ul className="space-y-1.5">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                      <span className="w-1 h-1 rounded-full bg-brand mt-1.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-border mb-4">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold"></th>
                <th className="text-left px-4 py-3 font-semibold">Standard Dock</th>
                <th className="text-left px-4 py-3 font-semibold">KVM Dock</th>
              </tr></thead>
              <tbody>
                {kvmComparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.standard}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs font-medium">{row.kvm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
            <strong className="text-ink">Do you need KVM?</strong> Only if both computers need to be connected at the same time. If you just swap the dock cable manually when switching, a standard dock is fine and cheaper.
          </div>
        </section>

        {/* Does desktop need a dock? */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Does Your Desktop Actually Need a Dock?</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">Most desktop PCs already have more ports than any laptop: multiple USB-A, USB-C, HDMI, DisplayPort, Ethernet directly on the motherboard. A desktop usually does not need a dock -- it connects directly to monitors and peripherals.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {[
              { label: "Desktop benefits from a dock when", items: ["The desktop has a Thunderbolt or USB4 port and you want to expand bandwidth", "You are using a KVM setup and both computers need to connect via the same dock", "The desktop lacks a specific port (e.g., older desktop, no USB-C)"] },
              { label: "Desktop does NOT need a dock when", items: ["It already has HDMI/DP outputs for monitors", "It has enough USB-A ports for keyboard, mouse, and accessories", "It has an Ethernet port", "You plan to switch manually between laptop and desktop cables"] },
            ].map((col, i) => (
              <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "border-cta/30 bg-cta-light/20" : "border-red-200 bg-red-50"}`}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: i === 0 ? "#5f7a4a" : "#dc2626" }}>{col.label}</p>
                <ul className="space-y-1.5">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: i === 0 ? "#5f7a4a" : "#dc2626" }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10"><h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 4 Picks at a Glance</h2><AtAGlance items={atAGlanceItems} /></section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[{ href: "#kvm-vs-standard", label: "KVM vs Standard" }, { href: "#best-kvm", label: "Best KVM" }, { href: "#best-usb4", label: "Best USB4" }, { href: "#best-tb4", label: "Best TB4" }, { href: "#best-budget", label: "Best Budget" }, { href: "#setup-guide", label: "Setup guide" }, { href: "#faq", label: "FAQ" }].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks</h2>
        {products.map((product) => <ProductSection key={product.id} product={product} />)}

        {/* Setup guide */}
        <section id="setup-guide" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Setting Up One Desk for Two Computers</h2>
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-border bg-white">
              <h3 className="font-bold text-ink text-base mb-2">The One-Cable Swap Approach (Standard Dock)</h3>
              <p className="text-sm text-ink-secondary leading-relaxed mb-3">If you go with a standard dock (Plugable, Anker 777, or Selore):</p>
              <div className="bg-bg rounded-xl p-4 font-mono text-xs text-ink-secondary mb-3 space-y-1">
                <p>Computer A (work laptop)</p>
                <p className="pl-8">&#8595; TB4/USB4/USB-C cable</p>
                <p className="pl-4">[DOCK] &#8594;&#8594; Monitors + Keyboard + Mouse + Ethernet</p>
                <p className="pl-8">&#8593; TB4/USB4/USB-C cable</p>
                <p>Computer B (personal desktop/laptop)</p>
              </div>
              <p className="text-xs text-ink-secondary"><strong className="text-ink">When switching:</strong> unplug Computer A&apos;s cable, plug in Computer B&apos;s cable. Takes ~10 seconds. <strong className="text-ink">This is the right approach for most people.</strong></p>
            </div>
            <div className="p-5 rounded-xl border border-brand/20 bg-brand/5">
              <h3 className="font-bold text-ink text-base mb-2">The KVM Approach (StarTech KVM Dock)</h3>
              <p className="text-sm text-ink-secondary mb-2">Both computers connect to the dock simultaneously -- never unplug. Press the button (or hotkey) to switch. Monitors change input, keyboard/mouse transfer, both computers stay charging.</p>
              <p className="text-xs text-brand font-semibold">Best when: You switch 5+ times per day, or you never want to touch cables.</p>
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
              { product: "StarTech USB-C KVM Dock", context: "For daily switching between two computers", verdict: "is the only pick that eliminates cable handling. Both computers stay connected, one button switches everything. Worth the $300+ if you switch multiple times daily.", href: "#best-kvm" },
              { product: "Plugable USB4 11-in-1", context: "For occasional switching or single-host use", verdict: "gives you the best display output (4K@120Hz) and bandwidth for the price. The cable swap is a 10-second trade-off for $150+ in savings.", href: "#best-usb4" },
              { product: "Selore 8-in-1", context: "For tight budgets", verdict: "costs under $55 and handles a functional dual-monitor desk with any USB-C computer.", href: "#best-budget" },
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
          <h2 className="text-xl font-bold text-white mb-2">Browse docking stations on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">KVM, USB4, and TB4 options -- all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=kvm+docking+station+laptop+desktop&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-docking-stations-for-desk-setup", title: "Best Docking Stations for Desk Setup", desc: "Full docking station guide for single-computer setups" },
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "Device charging without monitor connectivity" },
              { href: "/guide/under-desk-charging-station", title: "Best Under-Desk Charging Stations", desc: "Hide the dock and cables under the desk" },
              { href: "/guide/ergonomic-desk-setup", title: "Ergonomic Desk Setup Guide", desc: "How to position everything correctly" },
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
