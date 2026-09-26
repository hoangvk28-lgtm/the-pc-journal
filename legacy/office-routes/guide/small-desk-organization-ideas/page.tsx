import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription, metaTitle, metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  comparisonTable,
  checklistPhases,
  faq,
  type OrgProduct,
} from "@/data/guides/small-desk-organization-ideas";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/small-desk-organization-ideas",
  image: fallbackHeroImage,
  type: "article",
});

function ProductCard({ product }: { product: OrgProduct }) {
  return (
    <div id={product.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-white scroll-mt-20">
      <div className="sm:w-32 sm:shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={128}
          height={128}
          className="w-full sm:w-32 h-32 object-contain rounded-lg bg-gray-50"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="font-bold text-ink text-sm leading-snug">{product.name}</p>
            <p className="text-xs text-ink-muted mt-0.5">Footprint: {product.footprint}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums"
              style={{
                background: product.score >= 8.8 ? "#dcfce7" : product.score >= 8.5 ? "#fef9c3" : "#f3f4f6",
                color: product.score >= 8.8 ? "#5f7a4a" : product.score >= 8.5 ? "#a8875a" : "#374151",
              }}
            >
              {product.score.toFixed(1)}
            </span>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
              style={{ background: "#FF9900" }}
            >
              View
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1">Why it works</p>
            <ul className="space-y-0.5">
              {product.whyItWorks.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                  <span className="text-green-500 shrink-0 mt-0.5">&#10003;</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1">Tradeoffs</p>
            <ul className="space-y-0.5">
              {product.tradeoffs.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                  <span className="text-amber-500 shrink-0 mt-0.5">&#9888;</span>{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const methodProducts = (method: number) => products.filter((p) => p.method === method);

export default async function SmallDeskOrganizationIdeasPage() {
  const heroImage = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/small-desk-organization-ideas` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/small-desk-organization-ideas` }] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Container className="py-12 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Small Desk Organization Ideas</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Desk Setup</span>
            <span className="text-ink-muted">·</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">·</span>
            <span className="text-xs text-ink-muted">Updated {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            {guideDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-brand" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <Link prefetch={false} href="/author/deskfinds-editorial-team" className="hover:text-accent hover:underline transition-colors">The Office Journal Editorial Team</Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              7 methods evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              12 product picks scored
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImage}
            alt="Small desk organization ideas for compact workspaces"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            A small desk doesn&apos;t need more organization products - it needs the right <em>method</em>. Most desk organization guides throw 20 products at you and hope something sticks. That&apos;s how you end up with an organizer caddy sitting on top of another organizer caddy, both full of things you don&apos;t use.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            We&apos;ve evaluated organization approaches across dozens of compact desk setups - dorm desks, bedroom desks, home office desks under 48 inches - and found that the best small desk organization ideas aren&apos;t products. They&apos;re systems. Products just support the system. Here are seven methods that actually work, with specific product picks scored on how well they earn their footprint.
          </p>
        </section>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#golden-rule", label: "Golden rule" },
            { href: "#methods", label: "7 methods" },
            { href: "#comparison", label: "Comparison table" },
            { href: "#by-situation", label: "By situation" },
            { href: "#checklist", label: "Setup checklist" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
              {label}
            </a>
          ))}
        </div>

        {/* Golden Rule */}
        <section id="golden-rule" className="mb-12 scroll-mt-20 p-6 rounded-2xl border-2 border-brand/20 bg-brand-muted/10">
          <h2 className="text-xl font-bold text-ink mb-3">The Golden Rule: Declutter Before You Organize</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Every organization expert agrees on one thing: <strong className="text-ink">don&apos;t buy storage until you&apos;ve removed what you don&apos;t need.</strong> The single biggest mistake people make with small desks is buying a cute organizer, filling it with things they barely use, and ending up with less desk space plus an organizer to manage.
          </p>
          <div className="bg-white rounded-xl p-4 border border-border">
            <p className="text-sm font-semibold text-ink mb-3">The 5-minute desk audit - pull everything off your desk, then sort into three groups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Daily use", color: "#5f7a4a", bg: "#dcfce7", items: "Keyboard, mouse, laptop, one pen, phone charger. These earn desktop space." },
                { label: "Weekly use", color: "#a8875a", bg: "#fef9c3", items: "Notebooks, headphones, extra cables, sticky notes. These go near the desk, not on it." },
                { label: "Rarely use", color: "#dc2626", bg: "#fee2e2", items: "Spare pens, old papers, random cables, decorative items. These leave the desk area entirely." },
              ].map((g) => (
                <div key={g.label} className="p-3 rounded-lg" style={{ background: g.bg }}>
                  <p className="text-xs font-bold mb-1" style={{ color: g.color }}>{g.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{g.items}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-ink-muted mt-3 italic">Most people discover that 60–70% of their desk clutter falls into the weekly or rarely category. That&apos;s your real problem - not a lack of organizers.</p>
          </div>
        </section>

        {/* 7 Methods */}
        <section id="methods" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">The 7 Small Desk Organization Methods</h2>
          <p className="text-sm text-ink-secondary mb-8">Each method is a system first. The product picks below each method support the system - they don&apos;t replace it.</p>

          {/* Method 1 */}
          <div id="method-1" className="mb-12 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The Vertical Stack - Go Up, Not Out</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: Desks under 40 inches with wall space behind them</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                <strong className="text-ink">Core idea:</strong> Your desk surface is limited. The air above it isn&apos;t. Every inch of vertical space you use is an inch of desktop you reclaim.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                Instead of spreading supplies horizontally across the desk, stack them vertically using risers, shelves, or wall-mounted storage. The goal is a desk surface that holds only your active work tools - laptop, keyboard, mouse - while everything else lives above or beside. For a full comparison of riser and organizer options by footprint, see our guide to{" "}
                <Link prefetch={false} href="/guide/best-desk-shelves-small-desks" className="text-brand hover:underline">desk shelves for small desks</Link>.
              </p>
              <div className="space-y-3">
                {methodProducts(1).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-xs text-blue-800"><strong>Pro tip:</strong> The Reddit decluttering community consistently recommends pegboards as the single best wall storage for small desks. The key is restraint - hang only what you use weekly, not everything you own.</p>
              </div>
            </div>
          </div>

          {/* Method 2 */}
          <div id="method-2" className="mb-12 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The Under-Desk System - Hidden Storage Below</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: Desks with no drawers (the most common small desk problem)</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                <strong className="text-ink">Core idea:</strong> The space under your desk is usually wasted. Reclaim it with mounted drawers, trays, and storage that stays invisible from above.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                If your desk has no built-in drawers - and most budget IKEA desks, folding desks, and dorm desks don&apos;t - you create your own drawer system underneath. This is the method that transforms a basic tabletop into a functional workstation.
              </p>
              <div className="space-y-3">
                {methodProducts(2).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>

          {/* Method 3 */}
          <div id="method-3" className="mb-12 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The One-Bin Rule - Contain, Don&apos;t Spread</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: People who accumulate desk clutter throughout the day</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                <strong className="text-ink">Core idea:</strong> Give yourself exactly one container for loose items. When it&apos;s full, it&apos;s time to sort - not time to buy a second container.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                This method comes from Dana K. White&apos;s &ldquo;container concept,&rdquo; frequently cited in decluttering communities. The container is the limit. For a small desk, this means one compact organizer - a mesh caddy, pen cup, or small tray - that holds your daily-use items. If it overflows, you declutter. You don&apos;t add another organizer.
              </p>
              <div className="space-y-3">
                {methodProducts(3).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>

          {/* Method 4 */}
          <div id="method-4" className="mb-12 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The Monitor Riser Strategy - Storage You Sit In Front Of</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: Setups with an external monitor (not laptop-only)</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                <strong className="text-ink">Core idea:</strong> A monitor riser elevates your screen to ergonomic height while creating a storage shelf underneath - the most efficient use of desk real estate available.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                Your monitor&apos;s base takes up 8–12 inches of desk depth. A riser lifts the monitor 4–5 inches and turns that dead zone into a shelf or drawer. Slide your keyboard underneath when not in use, store notebooks flat, or add a small drawer for supplies.
              </p>
              <div className="space-y-3">
                {methodProducts(4).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>

          {/* Method 5 */}
          <div id="method-5" className="mb-12 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">5</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The Zone System - Divide the Desk Into Territories</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: Desks between 40–48 inches where you do multiple types of work</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                <strong className="text-ink">Core idea:</strong> Assign each section of the desk a specific job. Nothing crosses zones. When something is in the wrong zone, it goes back.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                Divide your desk into three zones. The zone system prevents the &ldquo;creep&rdquo; - where items slowly migrate from the edges to the center of your desk until you&apos;re working in a 12-inch gap surrounded by clutter. When each item has a zone, putting things back is automatic, not a decision.
              </p>
              {/* Zone diagram */}
              <div className="rounded-xl border border-border bg-white overflow-hidden mb-4">
                <div className="p-3 text-center border-b border-border bg-bg">
                  <p className="text-xs font-bold text-ink-secondary uppercase tracking-widest">Zone 3: Reference</p>
                  <p className="text-xs text-ink-muted">Shelf riser, pegboard, or wall storage - items you see but don&apos;t touch constantly</p>
                </div>
                <div className="flex">
                  <div className="w-1/3 p-3 border-r border-border bg-amber-50/50">
                    <p className="text-xs font-bold text-amber-700 mb-1">Zone 2: Supplies</p>
                    <p className="text-xs text-ink-muted">One organizer caddy, 6-inch strip on one side</p>
                  </div>
                  <div className="flex-1 p-3 bg-green-50/50">
                    <p className="text-xs font-bold text-green-700 mb-1">Zone 1: Active Work</p>
                    <p className="text-xs text-ink-muted">Laptop or monitor + keyboard + mouse. Nothing else lives here permanently.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {methodProducts(5).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>

          {/* Method 6 */}
          <div id="method-6" className="mb-12 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">6</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The Paper Elimination - Go Digital or Go Away</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: Desks drowning in papers, notes, and printouts</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                <strong className="text-ink">Core idea:</strong> Paper is the single largest space thief on a small desk. Every paper you digitize is surface area you reclaim.
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                Audit every piece of paper on or near your desk. For each one, ask: can this exist as a file on my computer instead? Most receipts, notes, reference sheets, and forms can be photographed, scanned, or replaced with a digital version.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-xs font-bold text-green-700 mb-2">Digitize these</p>
                  <ul className="space-y-1 text-xs text-ink-secondary">
                    {["Receipts (photo + cloud folder)", "Notes (Notion, Apple Notes, Google Keep)", "Reference sheets (bookmarked PDF)", "Bills and statements (online portals)"].map((i) => (
                      <li key={i} className="flex items-start gap-1.5"><span className="text-green-500 shrink-0">&#10003;</span>{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-xs font-bold text-amber-700 mb-2">Keep physical</p>
                  <ul className="space-y-1 text-xs text-ink-secondary">
                    {["Legal documents requiring original signatures", "Tax forms you're actively filing", "One notebook for daily handwritten notes"].map((i) => (
                      <li key={i} className="flex items-start gap-1.5"><span className="text-amber-500 shrink-0">&#9679;</span>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                {methodProducts(6).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>

          {/* Method 7 */}
          <div id="method-7" className="mb-4 scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shrink-0">7</span>
              <div>
                <h3 className="text-xl font-bold text-ink leading-tight">The End-of-Day Reset - The Habit That Keeps Everything Working</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">Best for: Everyone - this is the method that makes all other methods sustainable</p>
              </div>
            </div>
            <div className="pl-12">
              <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                <strong className="text-ink">Core idea:</strong> No organization system survives daily use without a reset habit. Spend 2 minutes at the end of each workday returning everything to its assigned place.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {[
                  ["Desktop check", "Anything on the desk that doesn't belong in Zone 1? Move it back."],
                  ["Drawer check", "Are under-desk drawers still organized, or did something get tossed in randomly?"],
                  ["Paper check", "Any new papers? File, scan, or recycle. Don't leave them for tomorrow."],
                  ["Cable check", "Are chargers and cables back in their clips or tray?"],
                ].map(([label, desc]) => (
                  <div key={label as string} className="p-3 rounded-xl border border-border bg-white">
                    <p className="text-xs font-bold text-ink mb-1">{label}</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-brand-muted/10 border border-brand/20">
                <p className="text-sm text-ink-secondary leading-relaxed">
                  The entire reset takes 90 seconds to 2 minutes. The top-voted advice in every Reddit thread about desk organization is some version of &ldquo;don&apos;t buy storage - declutter first.&rdquo; The end-of-day reset is the ongoing version of that advice. <strong className="text-ink">No product can replace this habit.</strong> But with this habit, even basic products work exceptionally well.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section id="comparison" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Complete Product Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-center px-4 py-3 font-semibold">Method</th>
                  <th className="text-left px-4 py-3 font-semibold">Footprint</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((item, i) => {
                  const prod = products.find((p) => p.id === item.id);
                  return (
                    <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-2.5 text-ink-muted text-xs font-medium">{i + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-ink text-sm">{item.name}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-block w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">{item.method}</span>
                      </td>
                      <td className="px-4 py-2.5 text-ink-secondary text-xs">{item.footprint}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span
                          className="inline-block text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums"
                          style={{
                            background: item.score >= 8.8 ? "#dcfce7" : item.score >= 8.5 ? "#fef9c3" : "#f3f4f6",
                            color: item.score >= 8.8 ? "#5f7a4a" : item.score >= 8.5 ? "#a8875a" : "#374151",
                          }}
                        >
                          {item.score.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        {prod && (
                          <a
                            href={prod.amazonUrl}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg text-white whitespace-nowrap inline-block"
                            style={{ background: "#FF9900" }}
                          >
                            View
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Situation */}
        <section id="by-situation" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Small Desk Organization by Situation</h2>
          <p className="text-sm text-ink-secondary mb-6">Not every desk problem is the same. Here&apos;s which methods to prioritize based on your specific setup:</p>
          <div className="space-y-4">
            {[
              {
                title: "How to organize a small desk without drawers",
                desc: "The most common pain point - a basic tabletop or folding desk with zero built-in storage.",
                methods: ["Method 2 (Under-Desk System) - Add adhesive drawers and stackable units below", "Method 1 (Vertical Stack) - Shelf riser or pegboard above", "Method 3 (One-Bin Rule) - One compact organizer on the surface"],
                budget: "~$50–$70 for a functional drawer + riser + organizer combo",
              },
              {
                title: "How to organize a small desk with two monitors",
                desc: "Dual monitors eat surface space. The desk mat you're working on shrinks to almost nothing.",
                methods: ["Method 4 (Monitor Riser/Arm) - Mount both monitors on arms to reclaim base footprint", "Method 2 (Under-Desk System) - All storage goes below since the surface is monitor territory", "Method 5 (Zone System) - Define narrow supply zone on one side"],
                budget: "~$70–$110 for dual monitor arms + under-desk storage",
              },
              {
                title: "How to organize a small desk in a dorm room",
                desc: "Dorm desks are usually 40–48 inches, shared spaces, and you can't drill into walls.",
                methods: ["Method 1 (Vertical Stack) - Desktop shelf riser (no wall mounting needed)", "Method 3 (One-Bin Rule) - One organizer, enforced limit", "Method 6 (Paper Elimination) - Digitize aggressively to minimize physical storage", "Method 7 (End-of-Day Reset) - Essential in shared spaces"],
                budget: "~$40–$60 for riser + organizer + cable clips",
              },
              {
                title: "Cute ways to organize your desk",
                desc: "If aesthetics matter as much as function, focus on materials and color coordination.",
                methods: ["Bamboo monitor riser (warm, natural look)", "Felt and cork desk mat (textured, minimal)", "Bamboo desktop tray (matches the riser)", "Pick one material family and stick to it - matching materials make a small desk look intentional"],
                budget: "~$60–$80 for a coordinated bamboo + felt setup",
              },
            ].map((sit) => (
              <div key={sit.title} className="p-5 rounded-2xl border border-border bg-white">
                <h3 className="font-bold text-ink mb-1">{sit.title}</h3>
                <p className="text-sm text-ink-secondary mb-3">{sit.desc}</p>
                <ul className="space-y-1 mb-3">
                  {sit.methods.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                      <span className="text-brand font-bold shrink-0 mt-0.5">{i + 1}.</span>{m}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-brand">Budget: {sit.budget}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section id="checklist" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Step-by-Step Setup Checklist</h2>
          <p className="text-sm text-ink-secondary mb-6">The exact order to organize a small desk from scratch:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checklistPhases.map((phase, pi) => (
              <div key={phase.phase} className="p-5 rounded-2xl border border-border bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0">{pi + 1}</span>
                  <div>
                    <p className="font-bold text-ink text-sm leading-tight">{phase.phase}</p>
                    <p className="text-xs text-ink-muted">{phase.time}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                      <span className="mt-0.5 w-4 h-4 rounded border-2 border-border shrink-0 inline-flex items-center justify-center bg-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-semibold text-ink mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-12 p-6 rounded-2xl border-2 border-brand/20 bg-brand-muted/10">
          <h2 className="text-xl font-bold text-ink mb-3">Final Verdict</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            The best small desk organization idea isn&apos;t a product - it&apos;s a system. Declutter first, add vertical and under-desk storage second, and build a daily reset habit third. Products support the system, but they don&apos;t replace it.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            If you&apos;re starting from zero, these three purchases cover 80% of what a small desk needs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { num: 1, name: "Bamboo Monitor Riser with Drawer", price: "$40", note: "Combines ergonomics with hidden storage", id: "bamboo-monitor-riser-drawer" },
              { num: 2, name: "Under-Desk Cable Management Tray", price: "$28", note: "Removes the biggest visual clutter source", id: "under-desk-cable-tray" },
              { num: 3, name: "Compact Mesh Desk Organizer", price: "$15", note: "One bin for daily supplies, enforcing limits", id: "compact-mesh-organizer" },
            ].map((item) => {
              const prod = products.find((p) => p.id === item.id);
              return (
                <div key={item.num} className="p-4 rounded-xl bg-white border border-border">
                  <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-2">{item.num}</span>
                  <p className="text-sm font-semibold text-ink mb-1 leading-snug">{item.name}</p>
                  <p className="text-xs text-ink-muted mb-2">{item.note}</p>
                  <div className="flex items-center justify-between">
                    {prod && (
                      <a href={prod.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-2.5 py-1 rounded-lg text-white" style={{ background: "#FF9900" }}>View</a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm font-semibold text-ink">Total: ~$83. A complete small desk organization system for less than a mediocre office chair.</p>
          <p className="text-xs text-ink-muted mt-2">The rest - pegboards, desk mats, paper trays - are situational upgrades. Add them only when you have a specific problem they solve.</p>
        </section>

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all desk organization products on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=desk+organization+small+desk&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z"/>
            </svg>
            Shop Desk Organization on Amazon
          </a>
        </div>

        {/* Related guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/best-small-desk-accessories", title: "12 Best Small Desk Accessories That Actually Save Space", label: "Desk Setup" },
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/dorm-room-power-essentials", title: "Best Power Strips for Dorm Rooms", label: "Dorm Essentials" },
            ].map((g) => (
              <Link prefetch={false} key={g.href} href={g.href} className="group p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-1">{g.label}</span>
                <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors leading-snug">{g.title}</p>
                <span className="text-xs font-semibold text-brand mt-2 inline-block">Read guide &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

      </Container>
    </>
  );
}
