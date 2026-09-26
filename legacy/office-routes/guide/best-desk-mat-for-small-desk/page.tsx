import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import { ProductReviewCard } from "@/components/product/ProductReviewCard";
import {
  guideTitle, guideDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, mats, atAGlanceItems, sizeGuide,
  materialComparison, buyingCriteria, faq, type DeskMat,
metaTitle, metaDescription,
} from "@/data/guides/best-desk-mat-for-small-desk";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-desk-mat-for-small-desk", image: fallbackHeroImage, type: "article",
});


export default async function BestDeskMatPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-30", dateModified: "2026-05-30", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-desk-mat-for-small-desk` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-desk-mat-for-small-desk` }] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Best Desk Mat for Small Desk</span>
        </nav>

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
              8 desk mats evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              Tested on 30&quot;, 36&quot;, and 40&quot; desks
            </div>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image src={heroImg} alt="Best desk mat for small desk" width={900} height={420}
            className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            Most desk mat guides are written for 60-inch desks with room to spare. This one isn&apos;t. If your desk is 36-40 inches wide (or smaller), picking the wrong mat size means it either hangs off the edge, slides around, or looks proportionally wrong.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            We evaluated eight desk mats specifically for small desks -- tested on 30&quot;, 36&quot;, and 40&quot; tabletops -- and picked the best options by size, material, non-slip performance, and value.
          </p>
        </section>

        {/* At a Glance */}
        <AtAGlance items={atAGlanceItems} />

        {/* Size Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-3">First: What Size Desk Mat Do You Actually Need?</h2>
          <p className="text-sm text-ink-secondary mb-4">
            <strong>Rule of thumb:</strong> Your desk mat should be 2-4 inches narrower than your desk width, and 10-16 inches deep (front-to-back).
          </p>
          <div className="overflow-x-auto rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Your Desk Width</th>
                  <th className="text-left px-4 py-3 font-semibold">Mat Width</th>
                  <th className="text-left px-4 py-3 font-semibold">Mat Depth</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best Picks</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-2.5 font-semibold text-ink">{row.deskWidth}</td>
                    <td className="px-4 py-2.5 text-ink-secondary">{row.matWidth}</td>
                    <td className="px-4 py-2.5 text-ink-secondary">{row.matDepth}</td>
                    <td className="px-4 py-2.5 text-ink-secondary hidden sm:table-cell">{row.picks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted italic px-1">
            Dorm desks are almost always 30-40&quot; wide. A 35x17&quot; mat fits any standard US dorm desk perfectly with a 1&quot; margin on each side.
          </p>
        </section>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#what-to-look-for", label: "What to look for" },
            { href: "#reviews", label: "Full reviews" },
            { href: "#materials", label: "Materials comparison" },
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
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Full Reviews: All 8 Desk Mats</h2>
          {mats.map((m) => (
            <div key={m.id} id={m.id} className="scroll-mt-20">
              <ProductReviewCard
                rank={m.rank}
                badge={m.badge}
                name={m.name}
                brand={m.brand}
                imageUrl={m.imageUrl}
                affiliateUrl={m.amazonUrl}
                price={m.price}
                style={m.style}
                pros={m.pros.map((text) => ({ text }))}
                cons={m.cons}
                reviewText={m.reviewText}
                scoreOverall={m.score}
              />
            </div>
          ))}
        </section>

        {/* Material Comparison */}
        <section id="materials" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Material Comparison: Leather vs. Felt vs. Cork vs. Fabric</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Material</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Surface Feel</th>
                  <th className="text-left px-4 py-3 font-semibold">Spill Resistance</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Mouse Glide</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {materialComparison.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.material}</td>
                    <td className="px-4 py-3 text-ink-secondary hidden sm:table-cell">{row.feel}</td>
                    <td className="px-4 py-3 text-ink-secondary">{row.spill}</td>
                    <td className="px-4 py-3 text-ink-secondary hidden sm:table-cell">{row.glide}</td>
                    <td className="px-4 py-3 text-ink-secondary">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-ink-secondary">
            <span className="font-bold text-ink">For most small desks: </span>
            Vegan leather (PU) is the practical default. Wipes clean in seconds, firm wrist surface, looks polished. Only trade-off: if you&apos;re a high-DPI gamer, leather surfaces can feel slightly sticky vs. cloth.
          </div>
        </section>

        {/* How We Evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Desk Mats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Small-Space Fit (25%)", "Proportionality on 30\"-40\" desks, visual weight relative to desk size"],
              ["Non-Slip Performance (25%)", "Shifting during sustained typing and heavy mouse use sessions"],
              ["Material Quality (20%)", "Surface texture, edge construction, durability over time"],
              ["Ease of Cleaning (15%)", "Wipe-clean performance, spill resistance in real use"],
              ["Value (15%)", "Price relative to comparable options from same tier"],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            We specifically paid attention to edge stitching -- cheaper mats use a wrapped edge (glued, not sewn) that peels apart within months. All picks on this list use stitched edges.
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

        {/* Final Verdict */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">The Bottom Line</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Best Overall", name: "Nordik Gray Leather 35x17\"", id: "nordik-gray-leather", color: "#dcfce7", text: "#48602f" },
              { label: "Best Eco-Friendly", name: "Nordik Cork-Leather", id: "nordik-cork-leather", color: "#fff7ed", text: "#c2410c" },
              { label: "Best for Gaming+Office", name: "DESKMATEC Snow Leopard", id: "deskmatec-snow-leopard", color: "#fdf4ff", text: "#7e22ce" },
            ].map((v) => (
              <div key={v.id} className="p-5 rounded-2xl border" style={{ background: v.color, borderColor: v.color }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: v.text }}>{v.label}</p>
                <a href={`#${v.id}`} className="font-bold text-ink text-sm hover:underline">{v.name}</a>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-ink-secondary leading-relaxed">
              For most small-desk setups, the <strong>Nordik Vegan Leather in Alaskan Gray</strong> is the clear best buy -- sized right (35x17&quot;), stays put, wipes clean, and looks polished without premium pricing. Dark look? Get the <strong>Pebble Black</strong>. Eco-friendly? Choose the <strong>Cork-Leather</strong>. Desk under 30&quot;? The <strong>10x12&quot; compact mat</strong> is the practical choice.
            </p>
          </div>
        </section>

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all desk mats on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a href="https://www.amazon.com/s?k=desk+mat+small+desk&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: "#FF9900" }}>
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Desk Mats on Amazon
          </a>
        </div>

        {/* Related */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/best-clip-on-desk-lamp", title: "Best Clip-On Desk Lamps for Small Desks", label: "Desk Setup" },
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/best-usb-hub-for-desk", title: "Best USB Hub for Desk", label: "Desk Setup" },
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
