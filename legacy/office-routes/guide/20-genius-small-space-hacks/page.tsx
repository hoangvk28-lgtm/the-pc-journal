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
  hacks,
  zones,
  spaceRecoveryTable,
  roiTable,
  faq,
  type SpaceHack,
} from "@/data/guides/20-genius-small-space-hacks";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/20-genius-small-space-hacks",
  image: fallbackHeroImage,
  type: "article",
});

const zoneColorMap: Record<string, { bg: string; text: string; border: string }> = {
  "dead-space": { bg: "#eef2e8", text: "#5c6f4b", border: "#bfdbfe" },
  compression: { bg: "#eef3e7", text: "#48602f", border: "#bbf7d0" },
  capacity: { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  mobile: { bg: "#fdf4ff", text: "#7e22ce", border: "#e9d5ff" },
};
const zoneLabel: Record<string, string> = {
  "dead-space": "Dead Space",
  compression: "Compression",
  capacity: "Capacity",
  mobile: "Mobile",
};

function HackCard({ hack }: { hack: SpaceHack }) {
  const c = zoneColorMap[hack.zone];
  return (
    <div id={hack.id} className="rounded-2xl border bg-white overflow-hidden scroll-mt-20" style={{ borderColor: c.border }}>
      <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ background: c.bg, borderColor: c.border }}>
        <span className="w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center shrink-0" style={{ background: c.text }}>
          {hack.number}
        </span>
        <span className="text-xs font-bold" style={{ color: c.text }}>{zoneLabel[hack.zone]}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className="sm:w-36 sm:shrink-0">
          <Image src={hack.imageUrl} alt={hack.name} width={144} height={144}
            className="w-full sm:w-36 h-36 object-contain rounded-xl bg-gray-50" unoptimized />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="font-bold text-ink text-sm leading-snug">{hack.name}</h4>
            <a href={hack.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap shrink-0" style={{ background: "#FF9900" }}>
              Check price
            </a>
          </div>

          {/* Space recovered badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-3 text-xs font-semibold" style={{ background: c.bg, color: c.text }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {hack.spaceRecovered}
          </div>

          <div className="space-y-2.5 text-xs text-ink-secondary">
            <div>
              <span className="font-semibold text-ink">Dead zone: </span>{hack.deadZone}
            </div>
            <div>
              <span className="font-semibold text-ink">The hack: </span>{hack.theHack}
            </div>
            {hack.chooseIf && (
              <div className="bg-amber-50 rounded-lg px-3 py-2 text-amber-700">
                <span className="font-semibold">Choose this if: </span>{hack.chooseIf}
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {hack.specs.map((s, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-ink-muted font-medium">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function SmallSpaceHacksPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/20-genius-small-space-hacks` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/20-genius-small-space-hacks` }] };

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
          <span className="text-ink">20 Small-Space Hacks</span>
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
              20 products evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Apartments, dorms &amp; studios
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image src={heroImg} alt="20 genius small space hacks" width={900} height={420}
            className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            The problem with most small-space advice is that it&apos;s about buying more storage furniture -- which takes up the floor space you&apos;re trying to reclaim. Real small-space hacks work differently: they recover space you already have but aren&apos;t using, or they compress what you own so it takes up less room.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {zones.map((z) => (
              <a key={z.id} href={`#zone-${z.id}`} className="p-3 rounded-xl border text-center hover:opacity-80 transition-opacity" style={{ background: z.color.bg, borderColor: z.color.border }}>
                <div className="text-2xl mb-1">{z.emoji}</div>
                <p className="text-xs font-bold" style={{ color: z.color.text }}>{z.label}</p>
                <p className="text-[10px] text-ink-muted mt-0.5">{z.items}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Space Recovery table */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-3">How Much Space Can These Hacks Actually Recover?</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Hack Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Avg. Space Recovered</th>
                  <th className="text-left px-4 py-3 font-semibold">Where</th>
                </tr>
              </thead>
              <tbody>
                {spaceRecoveryTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-2.5 font-medium text-ink text-sm">{row.hackType}</td>
                    <td className="px-4 py-2.5 text-ink-secondary text-sm font-semibold">{row.avgRecovered}</td>
                    <td className="px-4 py-2.5 text-ink-secondary text-sm">{row.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted italic px-1">
            A standard dorm room has 75-100 sq ft of usable floor space. The under-bed zone alone is 15-30 cubic feet -- often the largest single unused storage zone in the room.
          </p>
        </section>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {zones.map((z) => (
            <a key={z.id} href={`#zone-${z.id}`} className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
              {z.emoji} {z.label.split("--")[1]?.trim() ?? z.label}
            </a>
          ))}
          <a href="#roi-table" className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
            Best ROI
          </a>
          <a href="#faq" className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
            FAQ
          </a>
        </div>

        {/* 4 Zones */}
        {zones.map((zone) => {
          const zoneHacks = hacks.filter((h) => h.zone === zone.id);
          const c = zone.color;
          return (
            <section key={zone.id} id={`zone-${zone.id}`} className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{zone.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-ink tracking-tight">{zone.label}</h2>
                  <p className="text-sm" style={{ color: c.text }}>{zone.items}</p>
                </div>
              </div>
              <p className="text-sm text-ink-secondary mb-5 border-l-2 pl-3" style={{ borderColor: c.text }}>{zone.desc}</p>
              <div className="space-y-4">
                {zoneHacks.map((hack) => <HackCard key={hack.id} hack={hack} />)}
              </div>
            </section>
          );
        })}

        {/* Compression zone also has hack 19 */}
        <section className="mb-12 -mt-4">
          <div className="space-y-4">
            {[hacks.find((h) => h.number === 19)!].map((hack) => <HackCard key={hack.id} hack={hack} />)}
          </div>
        </section>

        {/* ROI Table */}
        <section id="roi-table" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Which Hacks Give the Most Space Back Per Dollar?</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Hack</th>
                  <th className="text-left px-4 py-3 font-semibold">Cost</th>
                  <th className="text-left px-4 py-3 font-semibold">Space Impact</th>
                  <th className="text-center px-4 py-3 font-semibold">ROI</th>
                </tr>
              </thead>
              <tbody>
                {roiTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.hack}</td>
                    <td className="px-4 py-3 text-ink-secondary font-medium">{row.cost}</td>
                    <td className="px-4 py-3 text-ink-secondary">{row.impact}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className={`text-sm ${j < row.stars ? "text-amber-400" : "text-gray-200"}`}>★</span>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-ink-secondary">
            <span className="font-bold text-ink">Start here: </span>
            Velvet hangers (#11) + second closet rod (#12) + medium vacuum bags (#6) costs under $40 combined and recovers the most space per dollar of any three-item combination on this list.
          </div>
        </section>

        {/* Full Quick Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Full Quick Reference -- 20 Hacks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Zone</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {hacks.map((h, i) => {
                  const c = zoneColorMap[h.zone];
                  return (
                    <tr key={h.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-2.5 font-bold text-ink-muted">{h.number}</td>
                      <td className="px-4 py-2.5">
                        <a href={`#${h.id}`} className="font-semibold text-ink hover:text-brand transition-colors">{h.name}</a>
                      </td>
                      <td className="px-4 py-2.5 hidden sm:table-cell">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>{zoneLabel[h.zone]}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <a href={h.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
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
          <p className="text-base font-semibold text-ink mb-1">Browse all small-space storage solutions on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping</p>
          <a href="https://www.amazon.com/s?k=small+space+storage+hacks+dorm&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: "#FF9900" }}>
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Storage Hacks on Amazon
          </a>
        </div>

        {/* Related */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under Desk Cable Trays", label: "Desk Setup" },
              { href: "/guide/desk-upgrades-under-100", title: "10 Desk Upgrades Under $100", label: "Desk Setup" },
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
