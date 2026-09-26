import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, atAGlanceItems,
  clampVsStandingRows, colorTempGuide, studySituationRows, brightnessGuideRows, faq,
  type BudgetLamp,
} from "@/data/guides/best-desk-lamp-under-30";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-desk-lamp-under-30",
  image: fallbackHeroImage, type: "article",
});

function LampSection({ lamp }: { lamp: BudgetLamp }) {
  return (
    <section id={lamp.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">{lamp.badge}</span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{lamp.name}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a href={lamp.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={lamp.imageUrl} alt={lamp.name} width={220} height={200} className="object-contain w-full h-full p-3" unoptimized />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{lamp.bestFor}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{lamp.whyItWins}</p>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{lamp.bodyParagraph}</p>
            <a href={lamp.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
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
              {lamp.specs.map((spec, i) => <li key={i} className="text-xs text-ink-secondary"><span className="font-semibold text-ink">{spec.label}:</span> {spec.value}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {lamp.pros.map((pro, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>{pro}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {lamp.cons.map((con, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>{con}</li>)}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border"><span className="font-semibold text-ink">Best for:</span> {lamp.bestForDetail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestDeskLampUnder30Page() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-04", dateModified: "2026-06-04", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-desk-lamp-under-30` }, about: [{ "@type": "Thing", name: "Desk Lamp" }, { "@type": "Thing", name: "Student Desk Accessories" }, { "@type": "Thing", name: "Dorm Room Essentials" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Desk Lamp Under $30", item: `${SITE_URL}/guide/best-desk-lamp-under-30` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Desk Lamps Under $30 2026", description: "Top 5 desk lamps under $30 for students -- chosen for small-desk footprint, color temperature options, USB power, and dorm compatibility.", numberOfItems: 5, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-desk-lamp-under-30#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Best Desk Lamp Under $30</span>
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
              5 picks -- all under $30, all USB-powered (except one)
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best desk lamps under $30 for students" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best For</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.bestFor}</td>
                    <td className="px-4 py-3"><a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>Most desk lamp guides are written for people with large desks, dedicated offices, and no roommates. That is not the reality for most students and apartment dwellers.</p>
          <p>The real constraints: a small desk with limited surface area, a shared room where a harsh blue-white light at midnight is inconsiderate, a power strip with limited outlets, and a budget that needs to cover tuition, rent, and food before desk lamps.</p>
          <p>Every pick in this guide is under $30, addresses small-desk footprint, and is evaluated on whether it works for actual study and online class use -- not just as a decorative light.</p>
        </section>

        {/* What Competitors Don't Tell You */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">What Competitors Don&apos;t Tell You: 4 Things That Matter for Students</h2>

          {/* 1. Clamp vs Standing */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">1. Clamp vs Standing -- The Space Question Nobody Answers</h3>
            <p className="text-sm text-ink-secondary mb-4">Most reviews compare lamps against each other but never ask the fundamental question: <strong className="text-ink">do you have room for a lamp base on your desk?</strong></p>
            <p className="text-sm text-ink-secondary mb-4">A standard desk lamp base takes up roughly 12--15 cm of desk space. On a 60--80 cm desk with a laptop, keyboard, and a few essentials, that matters.</p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Lamp type</th>
                  <th className="text-left px-4 py-3 font-semibold">Desk footprint</th>
                  <th className="text-left px-4 py-3 font-semibold">Best for</th>
                </tr></thead>
                <tbody>
                  {clampVsStandingRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink">{row.type}</td>
                      <td className={`px-4 py-3 text-xs font-bold ${i === 1 ? "text-cta" : "text-ink-secondary"}`}>{row.footprint}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Color Temperature */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">2. Color Temperature: Which Light for What Task</h3>
            <p className="text-sm text-ink-secondary mb-4">Most lamp specs list &quot;warm to cool&quot; or &quot;2700K--6500K&quot; without explaining what this means for studying.</p>
            <div className="space-y-3 mb-3">
              {colorTempGuide.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap" style={{ background: i === 0 ? "#fef3c7" : i === 1 ? "#ecfdf5" : "#eef2e8", color: i === 0 ? "#a8875a" : i === 1 ? "#5f7a4a" : "#7c9068" }}>{item.range}</span>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-bg border border-brand/20 text-xs text-ink-secondary">
              <strong className="text-ink">For online classes specifically:</strong> The cool/daylight setting makes your face look cleaner on camera (not yellow-toned from warm light). If you are frequently on video calls, set the lamp to 5000K+ when in class.
            </div>
          </div>

          {/* 3. USB vs Plug-In */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">3. USB-Powered vs Plug-In: The Dorm Outlet Problem</h3>
            <p className="text-sm text-ink-secondary mb-3">Standard desk lamps plug into wall outlets. Most dorms have 2 outlets per room -- already occupied by laptop chargers, phone chargers, and other essentials.</p>
            <p className="text-sm text-ink-secondary mb-3">USB-powered lamps draw power from a USB port -- on your laptop, a USB hub, or a USB charger. This eliminates the outlet competition. For a dorm setup where every outlet counts, USB-powered lamps are meaningfully more practical.</p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">All picks in this guide are USB-powered unless noted otherwise.</strong>
            </div>
          </div>

          {/* 4. Roommate */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-ink mb-3">4. Roommate Considerations (No Review Covers This)</h3>
            <p className="text-sm text-ink-secondary mb-3">Sharing a room means your desk lamp affects more than you. At 11pm when your roommate is sleeping:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Avoid", items: ["Harsh cool-white (6500K) lights spread light broadly and disrupt sleep", "Freestanding lamps that angle light upward into the room"] },
                { label: "Prefer", items: ["Directional lamps (gooseneck, adjustable arm) focus light on desk only", "Warm settings (2700K--3000K) significantly less disruptive", "Lower brightness levels (20--40%) focused on desk surface"] },
              ].map((col, i) => (
                <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "border-red-200 bg-red-50" : "border-cta/30 bg-cta-light/20"}`}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: i === 0 ? "#dc2626" : "#5f7a4a" }}>{col.label}</p>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: i === 0 ? "#dc2626" : "#5f7a4a" }} />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10"><h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 5 Picks at a Glance</h2><AtAGlance items={atAGlanceItems} /></section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[{ href: "#buying-guide", label: "Buying guide" }, { href: "#best-overall", label: "Best Overall" }, { href: "#best-clamp", label: "Best Clamp" }, { href: "#best-usb-charging", label: "USB Charging" }, { href: "#best-dorm", label: "Best Dorm" }, { href: "#best-budget", label: "Best Budget" }, { href: "#by-situation", label: "By situation" }, { href: "#faq", label: "FAQ" }].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks</h2>
        {products.map((lamp) => <LampSection key={lamp.id} lamp={lamp} />)}

        {/* By situation */}
        <section id="by-situation" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Choosing by Study Situation</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Situation</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">What you need</th>
                <th className="text-left px-4 py-3 font-semibold">Best pick</th>
              </tr></thead>
              <tbody>
                {studySituationRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.situation}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.need}</td>
                    <td className="px-4 py-3"><a href={`#${row.id}`} className="text-xs font-bold text-brand hover:underline">{row.pick}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Brightness guide */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">How Much Brightness Do You Actually Need?</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Task</th>
                <th className="text-left px-4 py-3 font-semibold">Minimum brightness needed</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best color temp</th>
              </tr></thead>
              <tbody>
                {brightnessGuideRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">{row.task}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.brightness}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.colorTemp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted mt-2 px-1">The Lepro at 800 lumens spread over a desk surface delivers approximately 400--600 lux at 40--50 cm distance -- adequate for all study tasks.</p>
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
              { product: "Lepro (B08LMPCX3D)", context: "For most students", verdict: "-- 800 lumens, 25 light combinations, USB-powered, Forbes vetted. Under $25, covers every study scenario.", href: "#best-overall" },
              { product: "iVict clamp (B0C462K8S4)", context: "For small desks under 80 cm", verdict: "-- clips to the desk edge, zero surface footprint, flexible gooseneck, under $22.", href: "#best-clamp" },
              { product: "iVict Gooseneck Clamp (B0BLK6RFGH)", context: "For dorm rooms with roommates", verdict: "-- directional warm-dimmable light that does not disturb a sleeping roommate.", href: "#best-dorm" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary"><strong className="text-ink">{item.context}:</strong> the{" "}<a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse desk lamps under $30 on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">USB-powered, dorm-friendly, all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=usb+desk+lamp+dorm+study&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-dorm-items-under-25", title: "Best Dorm Items Under $25", desc: "25 high-impact dorm essentials on a student budget" },
              { href: "/guide/small-desk-setup", title: "Small Desk Setup Ideas", desc: "15 practical ideas for compact workspace setups" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/ergonomic-desk-setup", title: "Ergonomic Desk Setup", desc: "The correct way to position everything at your desk" },
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
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Prices checked at time of writing -- verify current Amazon price before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
