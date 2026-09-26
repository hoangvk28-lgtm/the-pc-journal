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
  ideas,
  atAGlanceItems,
  checklistRows,
  mistakes,
  faq,
  type SetupIdea,
} from "@/data/guides/small-desk-setup";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/small-desk-setup",
  image: fallbackHeroImage,
  type: "article",
});

function IdeaSection({ idea, flip }: { idea: SetupIdea; flip: boolean }) {
  return (
    <section id={idea.id} className="mb-14 scroll-mt-20">
      <div className={`flex flex-col ${flip ? "sm:flex-row-reverse" : "sm:flex-row"} gap-6 items-start`}>
        {/* Image */}
        <a
          href={idea.amazonUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="shrink-0 w-full sm:w-64 h-52 rounded-2xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          <Image
            src={idea.imageUrl}
            alt={idea.title}
            width={240}
            height={200}
            className="object-contain w-full h-full p-3"
            unoptimized
          />
        </a>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 bg-brand">
              {idea.number}
            </span>
            <h2 className="text-xl font-bold text-ink tracking-tight">{idea.title}</h2>
          </div>

          <div className="space-y-3 text-sm text-ink-secondary leading-relaxed mb-4">
            {idea.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Product callout */}
          <div className="rounded-xl border border-border bg-bg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-0.5">
                {idea.productType}
              </p>
              <p className="text-sm font-bold text-ink leading-snug">{idea.productName}</p>
              <p className="text-xs text-ink-muted mt-0.5">Amazon Prime eligible</p>
            </div>
            <a
              href={idea.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: "#FF9900" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
              </svg>
              Check price
            </a>
          </div>

          {idea.internalLink && (
            <p className="text-xs text-ink-muted mt-3">
              For more options, see our guide to{" "}
              <Link prefetch={false}
                href={idea.internalLink.href}
                className="text-brand hover:underline font-medium"
              >
                {idea.internalLink.text}
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function SmallDeskSetupPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-31", dateModified: "2026-05-31", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/small-desk-setup` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/small-desk-setup` }] };

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
          <span className="text-ink">Small Desk Setup Ideas</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Ideas Guide</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
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
              15 ideas, all products Amazon-verified
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImg}
            alt="Small desk setup ideas"
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
            This guide is for students, remote workers, apartment renters, and anyone trying to make the most of a small desk. The ideas below range from five-minute swaps like adding cable clips to longer setups like mounting a pegboard. Each one includes a specific product suggestion, the reason it helps on a small desk, and a note on when to skip it.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            Not every idea belongs in every setup. Read through the list, pick the three or four that address the problems you actually have, and start there. A small desk that does two things well is more useful than one that tries to do everything.
          </p>
        </section>

        {/* At a Glance */}
        <section className="mb-10" id="at-a-glance">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 15 Ideas at a Glance</h2>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Quick Checklist */}
        <section className="mb-10" id="checklist">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Small Desk Setup Checklist</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Area</th>
                  <th className="text-left px-4 py-3 font-semibold">What to add</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Why it helps</th>
                </tr>
              </thead>
              <tbody>
                {checklistRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.area}</td>
                    <td className="px-4 py-3 text-ink-secondary">{row.what}</td>
                    <td className="px-4 py-3 text-ink-muted hidden sm:table-cell">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Jump nav */}
        <nav className="mb-10 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "#checklist", label: "Checklist" },
              { href: "#clamp-lamp", label: "1. Clamp lamp" },
              { href: "#monitor-stand", label: "3. Monitor stand" },
              { href: "#cable-tray", label: "6. Cable tray" },
              { href: "#desk-organizer", label: "8. Organizer" },
              { href: "#rolling-cart", label: "13. Rolling cart" },
              { href: "#pegboard", label: "14. Pegboard" },
              { href: "#mistakes", label: "Mistakes to avoid" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* 15 Idea sections */}
        <div>
          {ideas.map((idea, i) => (
            <IdeaSection key={idea.id} idea={idea} flip={i % 2 !== 0} />
          ))}
        </div>

        {/* Mistakes section */}
        <section id="mistakes" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Small Desk Setup Mistakes to Avoid</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mistakes.map((m, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-white">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    &times;
                  </span>
                  <div>
                    <p className="font-bold text-ink text-sm mb-1">{m.title}</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How We Evaluated */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Ideas</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Space efficiency", note: "Does the product reduce the desk footprint or use vertical/under-desk space?" },
              { label: "Setup complexity", note: "Can it be installed in under 10 minutes without tools?" },
              { label: "Reversibility", note: "Can it be removed or repositioned without damaging the desk?" },
              { label: "Value", note: "Is the improvement proportional to the cost for a small-desk setup?" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-muted text-brand flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink text-sm">{c.label}</p>
                  <p className="text-xs mt-0.5 leading-relaxed">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 pt-4 border-t border-border">
            Product selections are based on research, specifications, and customer feedback. The Office Journal earns a commission on qualifying purchases at no extra cost to you.
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

        {/* Amazon CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Ready to upgrade your small desk?</h2>
          <p className="text-white/90 text-sm mb-5">All 15 products are available on Amazon with Prime shipping.</p>
          <a
            href="https://www.amazon.com/?tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon
          </a>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/small-desk-organization-ideas", title: "Small Desk Organization Ideas", desc: "How to keep a small desk clutter-free" },
              { href: "/guide/best-desk-setup-accessories", title: "Best Desk Setup Accessories", desc: "Top picks across 9 accessory categories" },
              { href: "/guide/best-under-desk-cable-trays", title: "Best Under-Desk Cable Trays", desc: "Hide cables and reclaim your desk surface" },
            ].map((g) => (
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
                  <p className="text-xs text-ink-muted mt-0.5">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
