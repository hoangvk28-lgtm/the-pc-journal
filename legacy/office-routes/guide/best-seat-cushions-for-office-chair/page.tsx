import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription,
  metaTitle,
  metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  atAGlanceRows,
  faq,
  relatedGuides,
  type SeatCushion,
} from "@/data/guides/best-seat-cushions-for-office-chair";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-seat-cushions-for-office-chair",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: SeatCushion }) {
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
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={220}
              height={200}
              className="object-contain w-full h-full p-3"
              unoptimized
            />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.cushionType}</span>
              {product.coccyxCutout && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">Coccyx Cutout</span>
              )}
              {product.gelLayer && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">Gel Layer</span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it works</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWorks}</p>
            </div>
            {product.tradeoffs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1">Trade-offs</p>
                <ul className="space-y-1">
                  {product.tradeoffs.map((t, i) => (
                    <li key={i} className="text-xs text-ink-secondary">&middot; {t}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-ink-muted">
              <span className="font-semibold text-ink">Skip if:</span> {product.skipIf}
            </p>
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
        <div className="border-t border-border grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestSeatCushionsPage() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-16",
    dateModified: "2026-06-16",
    author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` },
    publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-seat-cushions-for-office-chair` },
    about: [
      { "@type": "Thing", name: "Seat Cushion" },
      { "@type": "Thing", name: "Coccyx Cushion" },
      { "@type": "Thing", name: "Office Chair Cushion" },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: "Best Seat Cushions for Office Chair", item: `${SITE_URL}/guide/best-seat-cushions-for-office-chair` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Seat Cushions for Office Chair 2026",
    description: "7 best office chair seat cushions from $30 to $70, covering coccyx cutout, gel-infused, and flat contoured options for tailbone pain, sciatica, and all-day comfort.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-seat-cushions-for-office-chair#${p.id}`,
    })),
  };

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
          <span className="text-ink">Best Seat Cushions for Office Chair</span>
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
              7 cushions evaluated, budget to premium, coccyx to flat contoured
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best seat cushions for office chair 2026"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Quick Picks table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Gel</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlanceRows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3">
                      <a href={`#${row.id}`} className="text-xs font-bold text-brand hover:underline">{row.badge}</a>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{row.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.cushionType}</td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span className={row.gelLayer ? "text-blue-700 font-bold" : "text-ink-muted"}>
                        {row.gelLayer ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={products[i].amazonUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block"
                        style={{ background: "#FF9900" }}
                      >
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
          <p>Most seat cushion guides skip the part where they explain which type of cushion addresses which problem. A coccyx cutout cushion and a flat contoured cushion solve different problems, and using the wrong type does not deliver the relief you expect.</p>
          <p>This guide covers 7 seat cushions from $30 to $70 across four cushion types, ranked from budget to premium. If you are also rebuilding your full workstation, see our <Link prefetch={false} href="/guide/ergonomic-desk-setup" className="text-brand hover:underline">ergonomic desk setup guide</Link> or our guide to <Link prefetch={false} href="/guide/best-office-chair-under-100" className="text-brand hover:underline">best office chairs under $100</Link> for context on what a cushion can and cannot fix.</p>
          <p>Every pick was evaluated against the specific pain or fatigue problem it claims to solve. A cushion that does not address the right anatomical pressure point is not a useful pick regardless of its star rating.</p>
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">What to Look For in a Seat Cushion</h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">4 Cushion Types: Which One Do You Need</h3>
            <p className="text-sm text-ink-secondary mb-3">
              Coccyx cutout cushions have a U-shaped or V-shaped gap at the rear where the tailbone sits, keeping it from making contact with the seat. These are the right choice for tailbone pain and most sciatica presentations.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              Flat contoured cushions provide even padding across the full seat pan. These are better for general fatigue, hip pressure, numbness, or all-day sitting without a specific medical complaint.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              Gel-infused foam combines memory foam with a gel layer to reduce heat buildup. Useful for warm environments, summer WFH use, or anyone who finds standard memory foam gets uncomfortably warm during long sessions.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Extra-dense foam</strong> (Cushion Lab picks) uses higher-density foam that does not bottom out under sustained pressure. The primary advantage is shape retention under 6 to 10 hours of daily use that lower-density foam cannot maintain past 6 to 12 months.
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Sciatica vs Tailbone Pain: Different Problems</h3>
            <p className="text-sm text-ink-secondary mb-3">
              Tailbone pain (coccydynia) is localized at the very base of the spine. A coccyx cutout cushion keeps the tailbone from making contact with the seat and is the direct solution for this.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              Sciatica radiates from the lower back through the glute and into the leg. The sciatic nerve can be aggravated by pressure on the piriformis muscle, which sits in the upper glute area. A larger coccyx cutout like the Everlasting Comfort redistributes weight away from that area. Some sciatica sufferers find flat contoured cushions preferable since even distribution reduces any single pressure point.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Memory Foam vs Gel-Infused vs All-Gel: Heat Matters</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Material</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Heat</th>
                    <th className="text-left px-4 py-3 font-semibold">Lifespan</th>
                    <th className="text-left px-4 py-3 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { material: "Standard memory foam", heat: "Warm after 1-2 hours", lifespan: "6-12 months", best: "Cool rooms, moderate use" },
                    { material: "Gel-infused foam", heat: "Cooler than standard", lifespan: "6-12 months", best: "Warm offices, summer use" },
                    { material: "Extra-dense foam", heat: "Cooler than standard", lifespan: "12-24 months", best: "8+ hour daily sitting" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.material}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.heat}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.lifespan}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">The Height Problem Nobody Mentions</h3>
            <p className="text-sm text-ink-secondary mb-3">
              Adding a seat cushion raises your seated height by 3 to 4 centimeters on average. This affects your arm angle relative to your desk and your eye level relative to your monitor. After adding a seat cushion, raise your chair height to restore a 90-degree knee bend. Then check whether your monitor needs to move up.
            </p>
            <p className="text-sm text-ink-secondary">
              Skipping this step is the most common reason people feel no ergonomic benefit from an otherwise good cushion. The cushion adds pressure relief at the seat level, but if your posture chain is now misaligned at the desk and monitor level, you replace one discomfort with another.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-ink mb-3">When a Cushion Helps vs When You Need a New Chair</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Problem</th>
                    <th className="text-left px-4 py-3 font-semibold">Cushion helps?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { problem: "Tailbone pain on contact with seat", helps: "Yes - coccyx cutout" },
                    { problem: "Hip or thigh numbness after 2+ hours", helps: "Yes - flat contoured or extra-dense" },
                    { problem: "Seat padding worn completely flat", helps: "Yes - buys 12-24 months" },
                    { problem: "Lower back pain from lumbar gap", helps: "No - need lumbar pillow or better chair" },
                    { problem: "Chair seat pan wrong width or depth", helps: "No - cushion does not change dimensions" },
                    { problem: "No height adjustment on chair", helps: "Partially - raises height but limits further adjustment" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.problem}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.helps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to pick</p>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
              >
                #{p.rank} {p.badge}
              </a>
            ))}
            <a href="#faq" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">FAQ</a>
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">7 Best Seat Cushions for Office Chair</h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* FAQ */}
        <section id="faq" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-bold text-ink text-sm mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Bottom Line</h2>
          <div className="space-y-4">
            {[
              { context: "Testing if a cushion helps, tightest budget", id: "xtreme-comforts", name: "Xtreme Comforts Memory Foam", verdict: ": coccyx cutout, non-slip bottom, washable cover at $30." },
              { context: "Daily WFH with tailbone or coccyx pain", id: "comfilife-premium-memory-foam", name: "ComfiLife Premium Memory Foam", verdict: ": best-proportioned coccyx cutout, durable foam, fits most chairs at $35." },
              { context: "All-day sitting without acute tailbone pain", id: "cushion-lab-patented", name: "Cushion Lab Patented Pressure Relief", verdict: ": extra-dense foam holds shape through 8-hour daily use, charcoal foam runs cooler at $70." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary">
                  <strong className="text-ink">{item.context}:</strong>{" "}
                  <a href={`#${item.id}`} className="font-bold text-ink hover:text-brand transition-colors">{item.name}</a>
                  {item.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse office chair seat cushions on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All Prime-eligible. Coccyx cutout, gel-infused, and flat contoured options.</p>
          <a
            href="https://www.amazon.com/s?k=best+seat+cushion+office+chair&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedGuides.map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">{g.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Verify current Amazon prices before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
