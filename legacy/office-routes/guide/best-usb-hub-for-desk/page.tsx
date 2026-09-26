import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription, metaTitle, metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  hubs,
  atAGlance,
  poweredVsUnpowered,
  usbAvsC,
  buyingCriteria,
  whichHubTable,
  faq,
  type UsbHub,
} from "@/data/guides/best-usb-hub-for-desk";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-usb-hub-for-desk",
  image: fallbackHeroImage,
  type: "article",
});

const typeLabel: Record<string, string> = {
  "powered-usb-a": "Powered USB-A",
  "powered-usb-c": "Powered USB-C",
  "unpowered-usb-a": "Unpowered USB-A",
  grommet: "Grommet",
};
const typeColor: Record<string, { bg: string; text: string }> = {
  "powered-usb-a": { bg: "#eef2e8", text: "#5c6f4b" },
  "powered-usb-c": { bg: "#eef3e7", text: "#48602f" },
  "unpowered-usb-a": { bg: "#f3f4f6", text: "#374151" },
  grommet: { bg: "#fdf4ff", text: "#7e22ce" },
};
const powerBadge: Record<string, { label: string; bg: string; text: string }> = {
  powered: { label: "Powered", bg: "#dcfce7", text: "#48602f" },
  unpowered: { label: "Unpowered", bg: "#f3f4f6", text: "#6b7280" },
  partial: { label: "Partial", bg: "#fef9c3", text: "#a16207" },
};

function ScoreChip({ score }: { score: number }) {
  const bg = score >= 9.0 ? "#dcfce7" : score >= 8.5 ? "#fef9c3" : "#f3f4f6";
  const color = score >= 9.0 ? "#5f7a4a" : score >= 8.5 ? "#a8875a" : "#374151";
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums" style={{ background: bg, color }}>
      {score.toFixed(1)}
    </span>
  );
}

function HubCard({ hub }: { hub: UsbHub }) {
  const tc = typeColor[hub.type];
  const pb = powerBadge[hub.powerStatus];
  return (
    <div id={hub.id} className="rounded-2xl border border-border bg-white overflow-hidden scroll-mt-20">
      {/* Type banner */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border" style={{ background: tc.bg }}>
        <span className="text-xs font-bold" style={{ color: tc.text }}>{typeLabel[hub.type]}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white ml-1" style={{ background: tc.text }}>{hub.badge}</span>
        <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: pb.bg, color: pb.text }}>{pb.label}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 p-5">
        {/* Image */}
        <div className="sm:w-40 sm:shrink-0">
          <Image src={hub.imageUrl} alt={hub.name} width={160} height={160} className="w-full sm:w-40 h-40 object-contain rounded-xl bg-gray-50" unoptimized />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-bold text-ink-muted mr-1">#{hub.rank}</span>
              <span className="font-bold text-ink text-base leading-snug">{hub.name}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <ScoreChip score={hub.score} />
              <a href={hub.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap" style={{ background: "#FF9900" }}>
                Check price
              </a>
            </div>
          </div>

          <p className="text-xs text-ink-muted mb-3">{hub.ports} &middot; {hub.powerSupply}{hub.switches ? " · Per-port switches" : ""}</p>

          {/* Why pick callout */}
          <p className="text-sm text-ink-secondary italic border-l-2 border-brand pl-3 mb-3 leading-relaxed">{hub.whyPick}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Pros</p>
              <ul className="space-y-1">
                {hub.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500 shrink-0 mt-0.5">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Cons</p>
              <ul className="space-y-1">
                {hub.cons.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-amber-400 shrink-0 mt-0.5">
                      <path d="M6 2v5M6 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-3 text-xs text-ink-muted italic bg-gray-50 rounded-lg px-3 py-2">
            <span className="font-semibold not-italic text-ink">Best for:</span> {hub.bestFor}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function BestUsbHubForDeskPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-usb-hub-for-desk` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-usb-hub-for-desk` }] };

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
          <span className="text-ink">Best USB Hub for Desk</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Buying Guide</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">{guideTitle}</h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">{guideDescription}</p>

          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-brand" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              8 USB hubs evaluated
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image src={heroImg} alt="Best USB hub for desk" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            Modern laptops ship with 2-4 USB ports. A typical desk setup needs 6-10: keyboard, mouse, external drive, webcam, phone charger, desk lamp, card reader, microphone. A USB hub is not a nice-to-have -- it&apos;s infrastructure.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            But not all USB hubs are appropriate for desk use. Travel hubs are compact but unpowered, meaning they draw electricity from your laptop and drop connections under heavy load. The right desk hub is powered, stable, and has enough ports that you stop rotating what&apos;s plugged in.
          </p>
        </section>

        {/* Powered vs Unpowered */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-3">First: Powered vs Unpowered -- The Most Important Distinction</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-ink bg-gray-50 border-b border-border w-1/3"></th>
                  <th className="text-left px-4 py-3 font-bold border-b border-border" style={{ background: "#eef2e8", color: "#5c6f4b" }}>Powered USB Hub</th>
                  <th className="text-left px-4 py-3 font-bold border-b border-border bg-gray-50 text-ink-muted">Unpowered USB Hub</th>
                </tr>
              </thead>
              <tbody>
                {poweredVsUnpowered.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-2.5 font-semibold text-ink text-xs border-b border-border">{row.feature}</td>
                    <td className="px-4 py-2.5 text-ink-secondary text-xs border-b border-border">{row.powered}</td>
                    <td className="px-4 py-2.5 text-ink-secondary text-xs border-b border-border">{row.unpowered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-secondary bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <span className="font-bold text-ink">Rule: </span>If you&apos;re plugging in more than 3 devices simultaneously, buy a powered hub. The $10-$15 price difference is worth the connection stability.
          </p>
        </section>

        {/* USB-A vs USB-C */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-3">USB-A or USB-C Hub -- What to Choose in 2026</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-ink bg-gray-50 border-b border-border w-1/3"></th>
                  <th className="text-left px-4 py-3 font-bold border-b border-border" style={{ background: "#eef2e8", color: "#5c6f4b" }}>USB-A Hub</th>
                  <th className="text-left px-4 py-3 font-bold border-b border-border" style={{ background: "#eef3e7", color: "#48602f" }}>USB-C Hub</th>
                </tr>
              </thead>
              <tbody>
                {usbAvsC.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-2.5 font-semibold text-ink text-xs border-b border-border">{row.feature}</td>
                    <td className="px-4 py-2.5 text-ink-secondary text-xs border-b border-border">{row.usbA}</td>
                    <td className="px-4 py-2.5 text-ink-secondary text-xs border-b border-border">{row.usbC}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-secondary bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <span className="font-bold text-ink">Bottom line: </span>If your laptop has USB-A ports -- use a USB-A hub. Cheaper, simpler, equally fast for most tasks. If you&apos;re on a MacBook or port-starved ultrabook -- get the USB-C model.
          </p>
        </section>

        {/* At a Glance */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-4">Top 8 USB Hubs at a Glance</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Ports</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlance.map((item, i) => {
                  const tc = typeColor[item.type];
                  return (
                    <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 text-ink-muted font-semibold text-sm">{item.rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="w-10 h-10 object-contain rounded-lg bg-gray-50 shrink-0" unoptimized />
                          <a href={`#${item.id}`} className="font-semibold text-ink hover:text-brand transition-colors text-sm">{item.name}</a>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: tc.bg, color: tc.text }}>{typeLabel[item.type]}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-secondary hidden sm:table-cell">{item.ports}</td>
                      <td className="px-4 py-3 text-center"><ScoreChip score={item.score} /></td>
                      <td className="px-4 py-3">
                        <a href={item.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>
                          Check price
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Jump Nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#what-to-look-for", label: "What to look for" },
            { href: "#reviews", label: "Full reviews" },
            { href: "#which-hub", label: "Which hub?" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
              {label}
            </a>
          ))}
        </div>

        {/* What to Look For */}
        <section id="what-to-look-for" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">6 Things to Look For Before You Buy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {buyingCriteria.map((c) => (
              <div key={c.title} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <span className="text-2xl shrink-0 mt-0.5">{c.icon}</span>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{c.title}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Reviews */}
        <section id="reviews" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Reviews: Best USB Hubs for Desk Use</h2>
          <div className="space-y-5">
            {hubs.map((hub) => <HubCard key={hub.id} hub={hub} />)}
          </div>
        </section>

        {/* Which Hub */}
        <section id="which-hub" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Which Hub Should You Buy?</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Your situation</th>
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                </tr>
              </thead>
              <tbody>
                {whichHubTable.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-ink-secondary">{row.situation}</td>
                    <td className="px-4 py-3">
                      <a href={`#${row.id}`} className="font-semibold text-brand hover:underline">{row.pick}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How We Evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Hubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Port stability under load (30%)", "All ports in use simultaneously; no device disconnections or voltage drop."],
              ["Port count & variety (25%)", "Enough ports; mix of USB-A and USB-C where relevant; dedicated charging ports."],
              ["Power supply quality (20%)", "AC adapter wattage; stable voltage under full load."],
              ["Build quality (15%)", "Material (metal vs plastic), cable durability, port fit and feel."],
              ["Value (10%)", "Price vs comparable options from the same brand tier."],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            This guide reflects research across published specifications, manufacturer documentation, and analysis of verified Amazon buyer review patterns.
          </p>
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

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all USB hubs for desk on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a href="https://www.amazon.com/s?k=powered+usb+hub+for+desk&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "#FF9900" }}>
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop USB Hubs on Amazon
          </a>
        </div>

        {/* Related Guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/desk-upgrades-under-100", title: "10 Desk Upgrades Under $100", label: "Desk Setup" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under Desk Cable Trays", label: "Desk Setup" },
              { href: "/guide/best-clip-on-desk-lamp", title: "Best Clip-On Desk Lamps", label: "Desk Setup" },
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
