import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AffiliateDisclosureBar } from "@/components/affiliate/AffiliateDisclosureBar";
import { ProductReviewCard } from "@/components/product/ProductReviewCard";
import { AtAGlance } from "@/components/product/AtAGlance";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import {
  products,
  atAGlanceItems,
  faq,
  guideTitle,
  guideDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  mainKeyword,
} from "@/data/guides/best-tablet-stands-for-desk";

export const revalidate = 604800;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Best Tablet Stands for Desk (2026)",
    description:
      "The best tablet stand for desk use should save space, stay stable when you tap, and fit how you use your tablet — studying, reading, video calls, or second-screen work. Seven picks for small desks and dorm rooms.",
    path: "/guide/best-tablet-stands-for-desk",
    image: fallbackHeroImage,
    type: "article",
  }),
  keywords: [
    mainKeyword,
    "tablet stand for small desk",
    "best tablet stand for studying",
    "tablet stand for video calls",
    "ipad stand for desk",
    "compact tablet stand",
    "portable tablet stand",
    "adjustable tablet stand desk",
    "tablet stand dorm room",
    "foldable tablet stand",
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guideTitle,
  description: guideDescription,
  datePublished: lastUpdated,
  dateModified: lastUpdated,
  author: { "@type": "Organization", name: "The Office Journal Editorial Team", url: `${SITE_URL}/author/deskfinds-editorial-team` },
  publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-tablet-stands-for-desk` },
  image: fallbackHeroImage,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
    { "@type": "ListItem", position: 3, name: "Best Tablet Stands", item: `${SITE_URL}/guide/best-tablet-stands` },
    { "@type": "ListItem", position: 4, name: guideTitle, item: `${SITE_URL}/guide/best-tablet-stands-for-desk` },
  ],
};


const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: guideTitle,
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: p.affiliateUrl,
  })),
};

const sections = [
  {
    heading: "Best Overall Tablet Stand for Desk: Lamicall S1",
    sub: "Simple, stable, and compact — the right starting point for most small desk setups.",
    index: 0,
    amazonUrl: "https://www.amazon.com/s?k=lamicall+tablet+stand+for+desk&tag=theofficejournal-20",
    amazonLabel: "Browse Lamicall Tablet Stands on Amazon",
    also: "Also consider the UGREEN compact stand ($9.99) if you primarily move your stand between locations — it has a slightly smaller footprint and folds even flatter.",
  },
  {
    heading: "Best Compact Tablet Stand: LISEN Aluminum",
    sub: "A compact aluminum stand for phones, small tablets, and anyone who wants an upgrade over plastic.",
    index: 1,
    amazonUrl: "https://www.amazon.com/s?k=compact+aluminum+tablet+stand&tag=theofficejournal-20",
    amazonLabel: "Browse Compact Aluminum Tablet Stands on Amazon",
    also: "Also consider the UGREEN stand ($9.99) if you have a tablet up to 11\" and want the lightest possible option for carrying between locations.",
  },
  {
    heading: "Best Rotating Tablet Stand: Lamicall 360°",
    sub: "For video calls, shared viewing, and anyone who switches between portrait and landscape often.",
    index: 2,
    amazonUrl: "https://www.amazon.com/s?k=360+rotating+tablet+stand+for+desk&tag=theofficejournal-20",
    amazonLabel: "Browse Rotating Tablet Stands on Amazon",
    also: "Also consider the Lamicall S1 if you rarely rotate your screen — you get the same brand quality and stable base for slightly less.",
  },
  {
    heading: "Best for Large Tablets and Portable Monitors: LISEN Foldable",
    sub: "Handles iPad Pro 12.9\", Surface Pro, and 15.6\" portable monitors while still folding to pocket size.",
    index: 3,
    amazonUrl: "https://www.amazon.com/s?k=tablet+stand+for+large+tablets+portable+monitor&tag=theofficejournal-20",
    amazonLabel: "Browse Large Tablet Stands on Amazon",
    also: "Also consider the Twelve South HoverBar Duo if you want the large tablet raised to eye level on an arm rather than sitting low on the desk surface.",
  },
  {
    heading: "Best Portable Tablet Stand: UGREEN",
    sub: "The smallest footprint in this guide — easy to carry between desk, library, and class.",
    index: 4,
    amazonUrl: "https://www.amazon.com/s?k=ugreen+tablet+stand+adjustable&tag=theofficejournal-20",
    amazonLabel: "Browse UGREEN Tablet Stands on Amazon",
    also: "Also consider the Amazon Basics stand if your main use is e-reader or Kindle viewing and you want the lowest-cost option — the UGREEN is more adjustable but both are affordable.",
  },
  {
    heading: "Best Premium Tablet Stand: Twelve South HoverBar Duo",
    sub: "A weighted arm that positions your iPad at exactly the height and angle you need for desk work and calls.",
    index: 5,
    amazonUrl: "https://www.amazon.com/s?k=twelve+south+hoverbar+duo&tag=theofficejournal-20",
    amazonLabel: "Browse Twelve South iPad Stands on Amazon",
    also: "Also consider a LISEN clamp arm mount if you want a flexible arm at a lower price point — the HoverBar Duo is specifically designed for iPad and has a cleaner aesthetic.",
  },
  {
    heading: "Best Budget Tablet Stand: Amazon Basics Foldable",
    sub: "A simple, affordable stand for occasional desk viewing, Kindle reading, and light use.",
    index: 6,
    amazonUrl: "https://www.amazon.com/s?k=amazon+basics+tablet+stand+foldable&tag=theofficejournal-20",
    amazonLabel: "Browse Budget Foldable Tablet Stands on Amazon",
    also: "Also consider the UGREEN stand for a small price increase — it has a better angle range and slightly more stable construction for regular desk use.",
  },
];

export default async function BestTabletStandsForDeskPage() {
  const heroImage = fallbackHeroImage;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Container className="py-10">

        {/* Breadcrumbs */}
        <Breadcrumbs
          crumbs={[
            { label: "Buying Guides", href: "/guide" },
            { label: "Best Tablet Stands", href: "/guide/best-tablet-stands" },
            { label: "For Desk" },
          ]}
        />

        {/* Header */}
        <header className="mt-6 mb-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Link prefetch={false} href="/guide/desk-setup" className="text-xs font-bold uppercase tracking-widest text-brand hover:text-brand-dark transition-colors">
              Desk Setup
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-4 tracking-tight leading-tight">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed mb-5">
            {guideDescription}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-muted pb-5 border-b border-border">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              <Link prefetch={false} href="/author/deskfinds-editorial-team" className="hover:text-ink hover:underline transition-colors">
                The Office Journal Editorial Team
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
              Updated {formatDate(lastUpdated)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{readTime} read</span>
            <span aria-hidden="true">·</span>
            <span>{products.length} products compared</span>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <AffiliateDisclosureBar
          variant="banner"
          disclosureText="We may earn a commission when you buy through Amazon links. This guide is based on product specs, buyer feedback, and comparison criteria - not paid placement."
          className="mb-8 max-w-3xl"
        />

        {/* Hero image */}
        <div className="relative w-full max-w-3xl h-56 sm:h-72 rounded-xl overflow-hidden mb-10">
          <Image src={heroImage} alt={guideTitle} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority unoptimized />
        </div>

        {/* Intro */}
        <div className="prose max-w-3xl mb-10">
          <p>
            A good tablet stand for desk use should do more than hold your tablet upright. It should save space, stay stable when you tap the screen, and fit the way you actually use your tablet: studying, reading, video calls, second-screen work, or light typing. For small desks, dorm rooms, and compact workspaces, the best stand is not always the biggest or most adjustable one.
          </p>
          <p>
            This guide covers seven picks across the main desk use cases: a reliable all-around stand, a compact aluminum option for phones and small tablets, a rotating stand for video calls and shared viewing, a large-tablet stand that handles up to 15.6&quot;, a portable pick for students who move between locations, a premium arm-style stand, and a budget foldable option.
          </p>
          <p>
            Unless clearly stated otherwise, The Office Journal guides are research-based, not hands-on lab tests. We analyze product specs, public product information, and buyer feedback to help you make a better decision.
          </p>
          <p>
            See also: <Link prefetch={false} href="/guide/best-tablet-stands">Best Tablet Stands (all uses)</Link> | <Link prefetch={false} href="/guide/best-tablet-stands-for-bed">Best Tablet Stands for Bed</Link> | <Link prefetch={false} href="/how-we-review">How We Review</Link>
          </p>
        </div>

        {/* At a Glance */}
        <section id="picks" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Quick Picks</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">All seven picks at a glance — toggle pros and cons to compare before reading full reviews below.</p>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Comparison table */}
        <section className="mb-12 max-w-3xl overflow-x-auto">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Comparison Table</h2>
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold">Best For</th>
                <th className="text-left px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.rank} className={i % 2 === 0 ? "bg-white" : "bg-bg/40"}>
                  <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3 text-ink-secondary">{p.badge}</td>
                  <td className="px-4 py-3 font-bold text-brand">{p.scoreOverall}/10</td>
                  <td className="px-4 py-3">
                    <a href={p.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF9900] text-white text-xs font-bold hover:bg-[#e68900] transition-colors whitespace-nowrap">
                      Amazon
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Product sections */}
        {sections.map((section) => (
          <section key={section.index} className="mb-14">
            <h2 className="text-2xl font-bold text-ink mb-1 tracking-tight">{section.heading}</h2>
            <p className="text-sm text-ink-secondary mb-6 max-w-2xl">{section.sub}</p>
            <div id={`pick-${section.index + 1}`} className="scroll-mt-20">
              <ProductReviewCard {...products[section.index]} />
            </div>
            <div className="mt-5 p-4 bg-bg rounded-xl border border-border max-w-3xl">
              <p className="text-sm text-ink-secondary">
                <strong className="text-ink">Also consider: </strong>
                {section.also}
              </p>
              <a href={section.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#FF9900] text-white text-sm font-bold hover:bg-[#e68900] transition-colors">
                {section.amazonLabel}
              </a>
            </div>
          </section>
        ))}

        {/* How to Choose */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">How to Choose a Tablet Stand for Desk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Start with desk footprint",
                body: "If your desk is small, the base size matters as much as the stand height. A tall stand with a large base can take up space you need for a keyboard, notebook, or desk lamp. For small desks, prioritize a compact base with stable weight distribution.",
              },
              {
                title: "Check portrait mode stability",
                body: "Many tablet stands work fine in landscape mode but feel less stable when the tablet is vertical. This matters if you use your tablet for reading, FaceTime, Zoom, notes, or digital planning. Check whether buyers mention wobble in portrait mode before buying.",
              },
              {
                title: "Think about how much you tap",
                body: "If you mostly watch or read, a lightweight stand is usually enough. If you type, draw, annotate PDFs, or tap frequently, you need a more stable stand with a weighted base, firm hinge, and anti-slip pads.",
              },
              {
                title: "Verify charging clearance",
                body: "A good desk stand should allow charging while the tablet is upright. If the bottom support blocks the charging port, you have to rotate or remove the device every time. Look for cable cutouts or a raised bottom support with enough clearance for USB-C or Lightning.",
              },
            ].map((tip) => (
              <div key={tip.title} className="p-5 bg-white rounded-card border border-border">
                <h3 className="font-bold text-ink text-sm mb-2">{tip.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-0 rounded-card border border-border overflow-hidden">
            {faq.map((item, i) => (
              <div key={i} className={`p-5 ${i < faq.length - 1 ? "border-b border-border" : ""} ${i % 2 === 0 ? "bg-white" : "bg-bg/40"}`}>
                <h3 className="font-bold text-ink text-sm mb-2 leading-snug">{item.question}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Amazon CTA */}
        <div className="max-w-3xl mb-8 p-5 rounded-xl border border-border bg-bg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink mb-1">Browse all tablet stands for desk on Amazon</p>
            <p className="text-sm text-ink-secondary">Current prices, customer photos, and more options.</p>
          </div>
          <a href="https://www.amazon.com/s?k=tablet+stands+for+desk&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold bg-[#FF9900] text-white hover:bg-[#e68900] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z"/></svg>
            Shop on Amazon
          </a>
        </div>

        {/* Internal links */}
        <div className="max-w-3xl mb-6 p-5 bg-white rounded-card border border-border">
          <p className="text-sm font-semibold text-ink mb-3">Related guides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Best Tablet Stands (all uses)", href: "/guide/best-tablet-stands" },
              { label: "Best Tablet Stands for Bed", href: "/guide/best-tablet-stands-for-bed" },
              { label: "Desk Setup Guides", href: "/guide/desk-setup" },
              { label: "Compact Home Office", href: "/guide/compact-home-office" },
              { label: "Budget Finds", href: "/guide/budget-finds" },
            ].map((link) => (
              <Link prefetch={false} key={link.href} href={link.href}
                className="px-3 py-1.5 bg-bg border border-border rounded-badge text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <a href="https://www.worthrated.com/guide/best-easy-to-use-tablets" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 bg-bg border border-border rounded-badge text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors">
              Need a tablet too? Best Easy-to-Use Tablets (WorthRated) ↗
            </a>
          </div>
        </div>

        {/* Methodology note */}
        <div className="max-w-3xl p-5 bg-bg rounded-card border border-border mb-6">
          <p className="text-sm text-ink-secondary leading-relaxed">
            <strong className="text-ink">Evaluation note: </strong>
            Products were assessed on stability, adjustability, build quality, compatibility, portability, and verified buyer feedback from Amazon. We do not claim hands-on product testing.
          </p>
          <Link prefetch={false} href="/how-we-review" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
            Read our full methodology →
          </Link>
        </div>

      </Container>
    </>
  );
}
