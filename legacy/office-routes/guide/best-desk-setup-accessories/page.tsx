import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle, guideDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage,
  picks, quickPicks, howToChoose, faq,
  type AccessoryPick,
metaTitle, metaDescription,
} from "@/data/guides/best-desk-setup-accessories";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-desk-setup-accessories", image: fallbackHeroImage, type: "article",
});

function PickSection({ pick }: { pick: AccessoryPick }) {
  return (
    <section id={pick.id} className="mb-14 scroll-mt-20">
      <h2 className="text-2xl font-bold text-ink tracking-tight mb-5">{pick.category}</h2>

      <article className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-bg">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 bg-brand">
            #1
          </span>
          <div className="flex-1 min-w-0">
            <a href={pick.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="font-bold text-ink text-base leading-tight hover:text-brand transition-colors">
              {pick.name}
            </a>
            <p className="text-xs text-ink-muted mt-0.5">{pick.brand}</p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col sm:flex-row gap-5 mb-5">
            {/* Image */}
            <a href={pick.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="shrink-0 flex items-center justify-center w-full sm:w-64 h-56 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
              <Image src={pick.imageUrl} alt={pick.name} width={240} height={200}
                className="object-contain w-full h-full p-3" unoptimized />
            </a>

            <div className="flex-1 min-w-0 flex flex-col gap-3">
              {/* Style */}
              <p className="text-xs text-ink-secondary">
                <span className="font-semibold text-ink">Style:</span> {pick.style}
              </p>

              {/* Pros / Cons */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-2">Reasons to Buy</p>
                  <ul className="space-y-1.5">
                    {pick.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                        <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-2">Reasons to Avoid</p>
                  <ul className="space-y-1.5">
                    {pick.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                        <span className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[9px]"
                          style={{ background: con.severity === "major" ? "#fee2e2" : "#fef9c3", color: con.severity === "major" ? "#dc2626" : "#a8875a" }}>
                          &minus;
                        </span>
                        {con.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <a href={pick.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity mt-auto"
                style={{ background: "#FF9900" }}>
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
                </svg>
                Check price on Amazon
              </a>
            </div>
          </div>

          {/* Review text */}
          <div className="space-y-3 text-sm text-ink-secondary leading-relaxed border-t border-border pt-4">
            {pick.reviewText.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          {/* Alt picks */}
          {pick.altPicks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-bold text-ink uppercase tracking-wide mb-2">Also Consider</p>
              <div className="space-y-2">
                {pick.altPicks.map((alt, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-gray-50 border border-border">
                    <div className="flex-1 min-w-0">
                      <a href={alt.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                        className="text-sm font-semibold text-ink hover:text-brand transition-colors">
                        {alt.name}
                      </a>
                      <p className="text-xs text-ink-muted mt-0.5">{alt.why}</p>
                    </div>
                    <a href={alt.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                      className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
                      style={{ background: "#FF9900" }}>
                      Check price
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

export default async function BestDeskSetupAccessoriesPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-30", dateModified: "2026-05-30", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-desk-setup-accessories` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-desk-setup-accessories` }] };

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
          <span className="text-ink">Best Desk Setup Accessories</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Buying Guide</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            Best Desk Setup Accessories for a Cleaner, More Productive Workspace
          </h1>
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
              9 categories, 27 products evaluated
            </div>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image src={heroImg} alt="Best desk setup accessories" width={900} height={420}
            className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            A good desk setup isn&apos;t about having the most expensive equipment -- it&apos;s about having the right accessories that remove friction from your daily workflow. The right lamp eliminates eye strain. The right cable tray removes visual noise. The right organizer means you stop hunting for things. Each of these is a small change that compounds over every work session.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            We evaluated accessories across 9 categories and selected the best option in each, with honest trade-offs and two alternatives per pick. All products are available on Amazon with Prime shipping.
          </p>
        </section>

        {/* Quick Picks */}
        <section className="mb-10" id="quick-picks">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Pick</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {quickPicks.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">
                      <a href={`#${p.id}`} className="hover:text-brand transition-colors">{p.category}</a>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">{p.name}</td>
                    <td className="px-4 py-3">
                      <a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block"
                        style={{ background: "#FF9900" }}>
                        Check price
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {picks.map((p) => (
            <a key={p.id} href={`#${p.id}`}
              className="px-3 py-1.5 rounded-full border border-border bg-white text-ink-secondary text-xs font-medium hover:border-brand hover:text-brand transition-colors">
              {p.category}
            </a>
          ))}
          <a href="#how-to-choose" className="px-3 py-1.5 rounded-full border border-border bg-white text-ink-secondary text-xs font-medium hover:border-brand hover:text-brand transition-colors">
            How to Choose
          </a>
        </div>

        {/* Per-category sections */}
        {picks.map((pick) => <PickSection key={pick.id} pick={pick} />)}

        {/* How to Choose */}
        <section id="how-to-choose" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">How to Choose Desk Setup Accessories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {howToChoose.map((c) => (
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
          <p className="text-base font-semibold text-ink mb-1">Browse all desk setup accessories on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a href="https://www.amazon.com/s?k=desk+setup+accessories&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: "#FF9900" }}>
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Desk Setup Accessories on Amazon
          </a>
        </div>

        {/* Related */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/best-usb-hub-for-desk", title: "Best USB Hub for Desk", label: "Desk Setup" },
              { href: "/guide/best-desk-mat-for-small-desk", title: "Best Desk Mat for Small Desk", label: "Desk Setup" },
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
