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
} from "@/data/guides/best-tablet-stands-for-bed";

export const revalidate = 604800;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Best Tablet Stands for Bed: Pillow, Gooseneck & Lap Picks",
    description:
      "Compare the best tablet stands for bed, including pillow stands, gooseneck holders, lap stands, and adjustable options for reading, streaming, and hands-free use.",
    path: "/guide/best-tablet-stands-for-bed",
    image: fallbackHeroImage,
    type: "article",
  }),
  keywords: [
    mainKeyword,
    "tablet stands for bed",
    "tablet pillow stand",
    "tablet stand pillow",
    "tablet stand lap",
    "tablet holder bed",
    "tablet holder in bed",
    "adjustable tablet stands",
    "portable tablet stands",
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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-tablet-stands-for-bed` },
  image: fallbackHeroImage,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
    { "@type": "ListItem", position: 3, name: "Best Tablet Stands", item: `${SITE_URL}/guide/best-tablet-stands` },
    { "@type": "ListItem", position: 4, name: guideTitle, item: `${SITE_URL}/guide/best-tablet-stands-for-bed` },
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

export default async function BestTabletStandsForBedPage() {
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
            { label: "For Bed" },
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
            Using a tablet in bed without a stand means holding it up with your arms - which causes fatigue fast. The right tablet stand for bed lets you read, stream, or video call completely hands-free, whether you are sitting up against pillows or lying flat.
          </p>
          <p>
            There are four main types: <strong>pillow stands</strong> (soft cushion base, no hardware), <strong>gooseneck holders</strong> (clamp to headboard or nightstand, fully adjustable), <strong>lap desks</strong> (rigid platform for active use), and <strong>arm mounts</strong> (C-clamp with long reach for bedside tables). Each suits a different use case - this guide covers the best option in each category.
          </p>
          <p>
            See also: <Link prefetch={false} href="/guide/best-tablet-stands">Best Tablet Stands (all uses)</Link> | <Link prefetch={false} href="/guide/dorm-essentials">Dorm Essentials</Link> | <Link prefetch={false} href="/guide/compact-home-office">Compact Home Office</Link>
          </p>
        </div>

        {/* At a Glance */}
        <section id="picks" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Quick Picks</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">All five picks at a glance - toggle pros and cons to compare before reading full reviews below.</p>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Comparison table */}
        <section className="mb-12 max-w-3xl overflow-x-auto">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Comparison Table</h2>
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold">Type</th>
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

        {/* Section 1 - Pillow Stand */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-1 tracking-tight">Best Pillow Tablet Stand for Bed</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">
            Pillow stands need no tools or clamps - ideal if you want something you can grab, position, and put away in seconds.
          </p>
          <div id={`pick-1`} className="scroll-mt-20">
            <ProductReviewCard {...products[0]} />
          </div>
          <div className="mt-5 p-4 bg-bg rounded-xl border border-border max-w-3xl">
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">Also consider: </strong>
              KDD Tablet Pillow Holder ($24.99) adds storage pockets and a stylus slot - better if you use a stylus regularly. ERGONOV Pillow Stand ($15.98) includes a snack bowl and rotating clip for extra versatility at a lower price.
            </p>
            <a href="https://www.amazon.com/s?k=tablet+pillow+stand&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#FF9900] text-white text-sm font-bold hover:bg-[#e68900] transition-colors">
              Browse Pillow Tablet Stands on Amazon
            </a>
          </div>
        </section>

        {/* Section 2 - Gooseneck */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-1 tracking-tight">Best Gooseneck Tablet Holder for Bed</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">
            Gooseneck holders give you true hands-free viewing. The clamp attaches to a headboard, nightstand, or bed frame - the flexible arm positions your tablet exactly where you need it.
          </p>
          <div id="pick-2" className="scroll-mt-20">
            <ProductReviewCard {...products[1]} />
          </div>
          <div className="mt-5 p-4 bg-bg rounded-xl border border-border max-w-3xl">
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">Also consider: </strong>
              Lamicall Gooseneck Phone Holder ($28.98) is optimized for phones (up to 7&quot;) if you mainly use a smartphone in bed. KDD Gooseneck Tablet Stand ($29.99) has a more rigid arm that handles larger iPads with less sag.
            </p>
            <a href="https://www.amazon.com/s?k=gooseneck+tablet+holder+for+bed&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#FF9900] text-white text-sm font-bold hover:bg-[#e68900] transition-colors">
              Browse Gooseneck Tablet Holders on Amazon
            </a>
          </div>
        </section>

        {/* Section 3 - Lap Stand */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-1 tracking-tight">Best Lap Tablet Stand for Bed and Couch</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">
            Lap desks work well when you want a stable surface for both typing and viewing - better for active use than pure pillow stands, and more flexible than gooseneck clamps.
          </p>
          <div id="pick-3" className="scroll-mt-20">
            <ProductReviewCard {...products[2]} />
          </div>
          <div className="mt-5 p-4 bg-bg rounded-xl border border-border max-w-3xl">
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">Also consider: </strong>
              SAIJI Adjustable Laptop Stand ($31.99) adds 5 height levels and 4 tilt angles - better ergonomics for longer work sessions. The Foldable Lap Desk with Cup Holder ($57.99) is a larger 23&quot; surface with a built-in drink slot.
            </p>
            <a href="https://www.amazon.com/s?k=tablet+stand+lap&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#FF9900] text-white text-sm font-bold hover:bg-[#e68900] transition-colors">
              Browse Lap Tablet Stands on Amazon
            </a>
          </div>
        </section>

        {/* Section 4 - Adjustable Bedside */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-1 tracking-tight">Best Adjustable Tablet Stand for Bedside Use</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">
            A long-arm C-clamp mount attaches to your nightstand and reaches overhead - the most versatile setup for reading in bed without needing a headboard mount.
          </p>
          <div id="pick-4" className="scroll-mt-20">
            <ProductReviewCard {...products[3]} />
          </div>
          <div className="mt-5 p-4 bg-bg rounded-xl border border-border max-w-3xl">
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">Also consider: </strong>
              Lamicall Tablet Floor Stand ($24.99) is a freestanding gooseneck on a weighted base - 63&quot; tall, adjustable from sitting to standing, no clamp needed.
            </p>
            <a href="https://www.amazon.com/s?k=adjustable+tablet+stands&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#FF9900] text-white text-sm font-bold hover:bg-[#e68900] transition-colors">
              Browse Adjustable Tablet Stands on Amazon
            </a>
          </div>
        </section>

        {/* Section 5 - Foldable / Dorm */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-1 tracking-tight">Best Foldable Tablet Stand for Small Bedrooms and Dorm Beds</h2>
          <p className="text-sm text-ink-secondary mb-6 max-w-2xl">
            Dorm rooms need stands that take up minimal space, clamp to a standard dorm desk, and work equally well at a desk or bedside.
          </p>
          <div id="pick-5" className="scroll-mt-20">
            <ProductReviewCard {...products[4]} />
          </div>
          <div className="mt-5 p-4 bg-bg rounded-xl border border-border max-w-3xl">
            <p className="text-sm text-ink-secondary">
              <strong className="text-ink">Also consider: </strong>
              Amazon Basics Multi-Angle Portable Stand ($7.99) is the simplest foldable option - no clamp, fits in a bag, adjusts to multiple angles. Best if you want a pack-and-go solution that works on any flat surface.
            </p>
            <a href="https://www.amazon.com/s?k=foldable+tablet+stand&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#FF9900] text-white text-sm font-bold hover:bg-[#e68900] transition-colors">
              Browse Foldable Tablet Stands on Amazon
            </a>
          </div>
        </section>

        {/* How to Choose */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">How to Choose a Tablet Stand for Bed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "How you use your tablet in bed",
                body: "Lying flat and watching hands-free? Get a gooseneck. Sitting up reading occasionally? A pillow stand is enough. Working or typing? A lap desk handles both tablet and keyboard.",
              },
              {
                title: "Your bed setup",
                body: "Have a headboard with a flat top edge? Any gooseneck clamp works. Only a nightstand? Use a long-arm C-clamp mount. No clampable surface? Use a pillow stand or freestanding floor stand.",
              },
              {
                title: "Tablet size and weight",
                body: "iPads 11\" and under work with almost every type. For iPad Pro 12.9\" or larger, choose a reinforced gooseneck or rigid arm mount - pillow stands handle them but goosenecks need to be rated for heavier devices.",
              },
              {
                title: "Portability needs",
                body: "Travel frequently or use it in multiple rooms? A foldable stand or pillow stand packs away easily. A C-clamp arm mount stays on one nightstand - less flexible but more stable for daily use.",
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
            <p className="font-semibold text-ink mb-1">Browse all tablet stands for bed on Amazon</p>
            <p className="text-sm text-ink-secondary">See current prices, customer photos, and more options.</p>
          </div>
          <a href="https://www.amazon.com/s?k=tablet+stands+for+bed&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
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
              { label: "Desk Setup Guides", href: "/guide/desk-setup" },
              { label: "Dorm Essentials", href: "/guide/dorm-essentials" },
              { label: "Compact Home Office", href: "/guide/compact-home-office" },
              { label: "Budget Finds", href: "/guide/budget-finds" },
            ].map((link) => (
              <Link prefetch={false} key={link.href} href={link.href}
                className="px-3 py-1.5 bg-bg border border-border rounded-badge text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <a href="https://www.worthrated.com/guide/best-tablets-for-reading" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 bg-bg border border-border rounded-badge text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors">
              Need a tablet too? Best Tablets for Reading (WorthRated) ↗
            </a>
          </div>
        </div>

        {/* Methodology note */}
        <div className="max-w-3xl p-5 bg-bg rounded-card border border-border mb-6">
          <p className="text-sm text-ink-secondary leading-relaxed">
            <strong className="text-ink">Evaluation note: </strong>
            Products in this guide were assessed on comfort for in-bed use, stability, compatibility with common tablets, value for money, and verified buyer feedback patterns from Amazon. We do not claim hands-on product testing.
          </p>
          <Link prefetch={false} href="/how-we-review" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
            Read our full methodology →
          </Link>
        </div>

      </Container>
    </>
  );
}
