import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle, guideDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage,
  items, categories, problemsTable, priorityOrder, faq,
  type DormItem, type DormCategory,
metaTitle, metaDescription,
} from "@/data/guides/25-best-dorm-items-under-25";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-dorm-items-under-25", image: fallbackHeroImage, type: "article",
});

const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));

function ItemCard({ item }: { item: DormItem }) {
  const cat = catMap[item.category];
  const c = cat.color;
  return (
    <article id={item.id} className="mb-8 rounded-2xl border border-border bg-white overflow-hidden shadow-card scroll-mt-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border" style={{ background: c.bg }}>
        <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: c.text }}>
          {item.number}
        </span>
        <div className="flex-1 min-w-0">
          <a href={item.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="font-bold text-ink text-base leading-tight hover:text-brand transition-colors">
            {item.name}
          </a>
          <p className="text-xs mt-0.5 font-semibold" style={{ color: c.text }}>{item.brand}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-5 mb-4">
          {/* Image */}
          <a href={item.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-56 h-48 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={item.imageUrl} alt={item.name} width={200} height={180}
              className="object-contain w-full h-full p-3" unoptimized />
          </a>

          <div className="flex-1 min-w-0 flex flex-col gap-3">
            {/* Problem solved */}
            <div className="p-3 rounded-xl text-sm italic text-ink-secondary leading-relaxed" style={{ background: c.bg, borderLeft: `3px solid ${c.text}`, paddingLeft: "12px" }}>
              <span className="font-semibold not-italic text-ink">Problem: </span>{item.problemSolved}
            </div>

            {/* Pros / Cons */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: c.text }}>Reasons to Buy</p>
                <ul className="space-y-1.5">
                  {item.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                      <span className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[9px]"
                        style={{ background: c.bg, color: c.text }}>+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1.5">Reasons to Avoid</p>
                <ul className="space-y-1.5">
                  {item.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                      <span className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[9px]"
                        style={{ background: con.severity === "major" ? "#fee2e2" : "#fef9c3", color: con.severity === "major" ? "#dc2626" : "#a8875a" }}>−</span>
                      {con.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
              <a href={item.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: "#FF9900" }}>
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z"/>
                </svg>
                Check price on Amazon
              </a>
              {item.chooseIf && (
                <p className="text-xs text-ink-muted italic">
                  <span className="font-semibold not-italic text-ink">Choose if: </span>{item.chooseIf}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Review text */}
        <div className="space-y-2.5 text-sm text-ink-secondary leading-relaxed border-t border-border pt-4">
          {item.reviewText.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.specs.map((s, i) => (
            <span key={i} className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: c.bg, color: c.text }}>{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default async function DormItems25Page() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-30", dateModified: "2026-05-30", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-dorm-items-under-25` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-dorm-items-under-25` }] };

  const itemsByCategory = (cat: DormCategory) => items.filter((i) => i.category === cat);

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
          <span className="text-ink">25 Best Dorm Items Under $25</span>
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
              25 dorm essentials evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
              </svg>
              All items under $25
            </div>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image src={heroImg} alt="25 best dorm items under $25" width={900} height={420}
            className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            Moving into a dorm is one of the few times in life where you&apos;re expected to build an entire living setup -- sleeping, studying, showering, charging, storing -- inside 150 square feet, on a student budget. The good news: the items that make the biggest difference in daily dorm life are almost all under $25.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed mb-4">
            This list skips the obvious and focuses on the high-impact, low-cost items most freshmen forget, underestimate, or discover too late.
          </p>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-ink-secondary">
            <span className="font-bold text-ink">Quick stat: </span>The average US dorm room is 130-180 sq ft -- smaller than a standard two-car garage. Every item on this list was selected with that constraint in mind.
          </div>
        </section>

        {/* Problems table */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-3">What Every Dorm Room Struggles With</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Problem</th>
                  <th className="text-left px-4 py-3 font-semibold">Category to Shop</th>
                </tr>
              </thead>
              <tbody>
                {problemsTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-2.5 text-ink italic">{row.problem}</td>
                    <td className="px-4 py-2.5 font-semibold text-brand">{row.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Category nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <a key={cat.id} href={`#cat-${cat.id}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm font-medium transition-colors hover:opacity-80"
              style={{ background: cat.color.bg, color: cat.color.text, borderColor: cat.color.border }}>
              <span>{cat.emoji}</span> {cat.label}
            </a>
          ))}
          <a href="#priority" className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
            Priority order
          </a>
          <a href="#faq" className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
            FAQ
          </a>
        </div>

        {/* Category sections */}
        {categories.map((cat) => {
          const catItems = itemsByCategory(cat.id as DormCategory);
          return (
            <section key={cat.id} id={`cat-${cat.id}`} className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-ink tracking-tight">{cat.label}</h2>
                  <p className="text-sm font-semibold" style={{ color: cat.color.text }}>{cat.range}</p>
                </div>
              </div>
              {catItems.map((item) => <ItemCard key={item.id} item={item} />)}
            </section>
          );
        })}

        {/* Priority Order */}
        <section id="priority" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">Priority Order: What to Buy First</h2>
          <div className="space-y-3">
            {priorityOrder.map((row, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-white">
                <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <p className="text-xs font-bold text-brand uppercase tracking-wide mb-0.5">{row.priority}</p>
                  <p className="font-semibold text-ink text-sm mb-0.5">{row.items}</p>
                  <p className="text-xs text-ink-secondary">{row.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick reference table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Full List -- Quick Reference</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const cat = catMap[item.category];
                  return (
                    <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-2.5 font-bold text-ink-muted">{item.number}</td>
                      <td className="px-4 py-2.5">
                        <a href={`#${item.id}`} className="font-semibold text-ink hover:text-brand transition-colors">{item.name}</a>
                      </td>
                      <td className="px-4 py-2.5 hidden sm:table-cell">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: cat.color.bg, color: cat.color.text }}>
                          {cat.emoji} {cat.label}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
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
          <p className="text-base font-semibold text-ink mb-1">Browse all dorm essentials on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a href="https://www.amazon.com/s?k=dorm+room+essentials+under+25&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: "#FF9900" }}>
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Dorm Essentials on Amazon
          </a>
        </div>

        {/* Related */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/best-clip-on-desk-lamp", title: "Best Clip-On Desk Lamps for Small Desks", label: "Desk Setup" },
              { href: "/guide/best-desk-mat-for-small-desk", title: "Best Desk Mats for Small Desks", label: "Desk Setup" },
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
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
