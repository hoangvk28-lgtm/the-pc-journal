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
  type PhoneGimbal,
} from "@/data/guides/best-phone-gimbals-for-content-creators";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-phone-gimbals-for-content-creators",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: PhoneGimbal }) {
  const isNativeTracking =
    product.tracking === "Native + app" ||
    product.tracking === "Native DockKit" ||
    product.tracking === "Native AI";

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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.axes}</span>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${isNativeTracking ? "bg-green-100 text-green-700" : "bg-gray-100 text-ink-secondary"}`}>
                {product.tracking}
              </span>
              {product.fillLight && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">Fill Light</span>
              )}
              {product.foldable && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">Foldable</span>
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

export default async function BestPhoneGimbalsPage() {
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
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-phone-gimbals-for-content-creators` },
    about: [
      { "@type": "Thing", name: "Phone Gimbal" },
      { "@type": "Thing", name: "Content Creator Equipment" },
      { "@type": "Thing", name: "Video Stabilizer" },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: "Best Phone Gimbals for Content Creators", item: `${SITE_URL}/guide/best-phone-gimbals-for-content-creators` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Phone Gimbals for Content Creators 2026",
    description: "7 best phone gimbals for content creators from $60 to $200, covering desk setup, home studio, native tracking, fill light, and battery life.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-phone-gimbals-for-content-creators#${p.id}`,
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
          <span className="text-ink">Best Phone Gimbals for Content Creators</span>
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
              7 gimbals evaluated, budget to all-in-one bundle
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
            alt="Best phone gimbals for content creators 2026"
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
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Tracking</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Fill Light</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Battery</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlanceRows.map((row, i) => {
                  const isNative =
                    row.tracking === "Native + app" ||
                    row.tracking === "Native DockKit" ||
                    row.tracking === "Native AI";
                  return (
                    <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3">
                        <a href={`#${row.id}`} className="text-xs font-bold text-brand hover:underline">{row.badge}</a>
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink text-xs">{row.name}</td>
                      <td className="px-4 py-3 text-xs hidden sm:table-cell">
                        <span className={isNative ? "text-green-700 font-bold" : "text-ink-muted"}>
                          {row.tracking}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs hidden sm:table-cell">
                        <span className={row.fillLight ? "text-blue-700 font-bold" : "text-ink-muted"}>
                          {row.fillLight ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">{row.battery}</td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>Most phone gimbal reviews focus on outdoor filming and travel vlogging. This guide covers 7 gimbals specifically evaluated for desk content, product shots, tutorials, and home studio recording: the use cases that desk-based creators actually face.</p>
          <p>The key differences for desk and home studio use are: whether tracking works outside the manufacturer app, whether the gimbal has a fill light for controlled indoor lighting, and whether the folded base works as a stable tripod. If you are building out your full home studio audio setup, see our guide to the <Link prefetch={false} href="/guide/best-headset-for-work" className="text-brand hover:underline">best headsets for work audio</Link>. If you are comparing a gimbal against a fixed camera solution, our <Link prefetch={false} href="/guide/best-webcams-for-home-office" className="text-brand hover:underline">best webcams for home office</Link> guide covers the static alternative.</p>
          <p>Every pick was evaluated for tracking reliability, build quality, battery life under realistic shooting conditions, and whether the spec claims match real-world use reports.</p>
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">What to Look For in a Phone Gimbal</h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Gimbal vs Tripod vs Handheld: Choose by Use Case</h3>
            <p className="text-sm text-ink-secondary mb-3">
              A tripod holds the phone in a fixed position. It costs less than a gimbal and is the right tool for static talking-head shots, podcast recording, or any content where the camera does not move.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              A gimbal adds motorized stabilization and, on most picks in this guide, a built-in tripod mode for static shots. The main reasons to choose a gimbal over a tripod are: you want smooth panning across a desk, you want the camera to follow you automatically as you move, or you want cinematic motion in shots that would otherwise look static.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Handheld-only</strong> shooting without stabilization produces usable footage for social media where slight camera shake reads as authentic, but becomes distracting in longer tutorial or product review formats. A gimbal at $60 removes that variable.
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">3-Axis Explained: What Each Motor Does</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Axis</th>
                    <th className="text-left px-4 py-3 font-semibold">Motion it controls</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Practical effect</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { axis: "Pan (yaw)", motion: "Left and right rotation", effect: "Smooth horizontal panning across a desk or scene" },
                    { axis: "Tilt (pitch)", motion: "Up and down rotation", effect: "Steady zoom-in or zoom-out moves without head bob" },
                    { axis: "Roll", motion: "Side-to-side tilt", effect: "Keeps horizon level when walking or hand shifts" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.axis}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.motion}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-secondary">
              All gimbals on this list are 3-axis, which is the standard for smooth video in any direction. Single-axis or 2-axis stabilizers exist at lower price points but are not covered here as they do not handle the full range of desk content shooting scenarios.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Native Tracking vs App Tracking: The Difference That Matters</h3>
            <p className="text-sm text-ink-secondary mb-3">
              App-only tracking (picks 1 and 2) means the gimbal follows a subject using computer vision processing done inside the manufacturer app on your phone. The moment you switch to your native camera app, TikTok, Instagram Live, or any third-party recording app, tracking stops.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              Native tracking (picks 3 to 7) uses a hardware sensor or dedicated AI chip on the gimbal itself to detect and follow subjects. It works regardless of which app is running on the phone. For creators who shoot in ProRes, record directly to social platforms, or prefer the native iOS or Android camera for quality, native tracking at the $130 price point is a meaningful jump in workflow.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Apple DockKit</strong> (pick 4, Insta360 Flow 2 Pro) is a native iOS API that gives the gimbal control over iPhone camera tracking without any app running. It is the cleanest iPhone-native workflow on this list but only works on iPhone.
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-ink mb-3">Battery Life: What the Spec Actually Means</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Rated battery</th>
                    <th className="text-left px-4 py-3 font-semibold">Real-world estimate</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rated: "8-9h", real: "5-7h active use", notes: "Motor load and ambient temperature reduce spec" },
                    { rated: "10-12h", real: "7-9h active use", notes: "Fill light on drops by 2-3h on average" },
                    { rated: "13.5h", real: "5.5h with fill light on", notes: "Zhiyun Q5 Ultra spec drops significantly with light active" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.rated}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.real}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.notes}</td>
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

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">7 Best Phone Gimbals for Content Creators</h2>
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
              { context: "First gimbal, testing stabilization before committing", id: "zhiyun-smooth-q4", name: "Zhiyun Smooth Q4", verdict: ": 3-axis, foldable, extension rod, ZY Cami app tracking at $60." },
              { context: "Best all-round for most desk creators", id: "dji-osmo-mobile-7p", name: "DJI Osmo Mobile 7P", verdict: ": native tracking in any app, fill light with color temp, tripod mode, phone charging at $130." },
              { context: "iPhone creators recording in ProRes or native iOS apps", id: "insta360-flow-2-pro", name: "Insta360 Flow 2 Pro", verdict: ": Apple DockKit native iOS tracking, 360-degree pan, 12h battery at $150." },
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
          <h2 className="text-xl font-bold text-white mb-2">Browse phone gimbals on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All Prime-eligible. Budget starter to professional bundle options.</p>
          <a
            href="https://www.amazon.com/s?k=best+phone+gimbal+content+creator&tag=theofficejournal-20"
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
