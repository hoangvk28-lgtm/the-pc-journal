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
  lamps,
  atAGlance,
  evaluationCriteria,
  buyingCriteria,
  clipVsBase,
  faq,
  type ClipLamp,
} from "@/data/guides/best-clip-on-desk-lamp";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-clip-on-desk-lamp",
  image: fallbackHeroImage,
  type: "article",
});

const powerColor: Record<string, { bg: string; text: string; label: string }> = {
  usb: { bg: "#eef2e8", text: "#5c6f4b", label: "USB" },
  battery: { bg: "#eef3e7", text: "#48602f", label: "Battery" },
  "plug-in": { bg: "#fff7ed", text: "#c2410c", label: "Plug-In" },
};

function ScoreChip({ score }: { score: number }) {
  const bg = score >= 9.0 ? "#dcfce7" : score >= 8.5 ? "#fef9c3" : "#f3f4f6";
  const color = score >= 9.0 ? "#5f7a4a" : score >= 8.5 ? "#a8875a" : "#374151";
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums" style={{ background: bg, color }}>
      {score.toFixed(1)}
    </span>
  );
}

function LampCard({ lamp }: { lamp: ClipLamp }) {
  const ps = powerColor[lamp.power];
  return (
    <div id={lamp.id} className="rounded-2xl border border-border bg-white overflow-hidden scroll-mt-20">
      {/* Badge banner */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-border">
        <span className="text-xs font-bold text-ink-muted">#{lamp.rank}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand text-white">{lamp.badge}</span>
        <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: ps.bg, color: ps.text }}>
          {ps.label}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 p-5">
        {/* Image */}
        <div className="sm:w-40 sm:shrink-0">
          <Image
            src={lamp.imageUrl}
            alt={lamp.name}
            width={160}
            height={160}
            className="w-full sm:w-40 h-40 object-contain rounded-xl bg-gray-50"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-ink text-base leading-snug">{lamp.name}</h3>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <ScoreChip score={lamp.score} />
              <a
                href={lamp.amazonUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
                style={{ background: "#FF9900" }}
              >
                Check price
              </a>
            </div>
          </div>

          {/* Standout callout */}
          <p className="text-sm text-ink-secondary leading-relaxed mb-3 italic border-l-2 border-brand pl-3">
            {lamp.standout}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Why it works */}
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Why it earns its space</p>
              <ul className="space-y-1">
                {lamp.whyItWorks.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500 shrink-0 mt-0.5">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Specs</p>
              <ul className="space-y-1">
                {lamp.specs.map((s, i) => (
                  <li key={i} className="text-xs text-ink-secondary">
                    <span className="font-semibold text-ink">{s.label}:</span> {s.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-ink-muted italic bg-gray-50 rounded-lg px-3 py-2">
            <span className="font-semibold not-italic text-ink">Best for:</span> {lamp.bestFor}
          </p>

          {lamp.caveat && (
            <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              <span className="font-semibold">Note:</span> {lamp.caveat}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function BestClipOnDeskLampPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-clip-on-desk-lamp` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-clip-on-desk-lamp` }] };

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
          <span className="text-ink">Best Clip-On Desk Lamps</span>
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
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
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
              8 clip-on lamps evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a14.996 14.996 0 0 1-3 0" />
              </svg>
              Small desks &amp; dorms focus
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImg}
            alt="Best clip-on desk lamps for small desks and dorm rooms"
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
            If your desk is under 40 inches wide, a base lamp is often a bad idea. It eats 6-8 square inches of surface permanently, and if you share a dorm room, it throws light everywhere -- including onto your roommate&apos;s side at 2 a.m.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed">
            A clip-on desk lamp solves all of that. It attaches to the edge of your desk, shelf, or headboard, takes zero surface space, and puts light exactly where you&apos;re working. We evaluated eight options specifically for small desks and dorm rooms -- rated on clamp strength, brightness range, cord management, and value.
          </p>
        </section>

        {/* At a Glance */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-4">Our Top 8 Picks at a Glance</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlance.map((item, i) => (
                  <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-ink-muted text-sm font-semibold">{item.rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="w-10 h-10 object-contain rounded-lg bg-gray-50 shrink-0" unoptimized />
                        <a href={`#${item.id}`} className="font-semibold text-ink hover:text-brand transition-colors text-sm">{item.name}</a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-sm">{item.badge}</td>
                    <td className="px-4 py-3 text-center"><ScoreChip score={item.score} /></td>
                    <td className="px-4 py-3">
                      <a href={item.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>
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
          {[
            { href: "#what-to-look-for", label: "What to look for" },
            { href: "#reviews", label: "Full reviews" },
            { href: "#clip-vs-base", label: "Clip vs. base" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors">
              {label}
            </a>
          ))}
        </div>

        {/* What to Look For */}
        <section id="what-to-look-for" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            6 Things to Look For Before You Buy
          </h2>
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
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Reviews: All 8 Clip-On Desk Lamps
          </h2>
          <div className="space-y-5">
            {lamps.map((lamp) => <LampCard key={lamp.id} lamp={lamp} />)}
          </div>
        </section>

        {/* Clip vs Base table */}
        <section id="clip-vs-base" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Clip-On vs. Base Lamp -- Which Is Right for You?</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Situation</th>
                  <th className="text-left px-4 py-3 font-semibold">Go with</th>
                  <th className="text-left px-4 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody>
                {clipVsBase.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 text-ink font-medium">{row.situation}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.pick.startsWith("Clip") ? "bg-brand text-white" : "bg-gray-200 text-gray-700"}`}>
                        {row.pick}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-brand-muted border border-brand/20 text-sm text-ink-secondary">
            <span className="font-semibold text-ink">Bottom line: </span>
            If you&apos;re a student or anyone working in a room under 150 sq ft, a clip-on lamp almost always makes more sense than a base lamp -- not just for desk space, but for keeping light targeted and not lighting up the entire room when you only need to see your notebook.
          </div>
        </section>

        {/* How We Evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Lamps</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Every lamp was evaluated against five criteria weighted for small-desk and dorm use. We specifically tested clamp jaw width for compatibility with common desk thicknesses and power source flexibility.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evaluationCriteria.map((c) => (
              <div key={c.label} className="flex gap-3 p-4 rounded-xl bg-white border border-border">
                <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">{c.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            This guide reflects research across published specifications, manufacturer documentation, and analysis of verified Amazon buyer review patterns.
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
            <div className="p-5 rounded-2xl border border-green-200 bg-green-50">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Best Overall</p>
              <a href="#voncerus-led-clamp" className="font-bold text-ink text-sm hover:underline">Voncerus LED Clamp</a>
              <p className="text-xs text-ink-secondary mt-1">Metal arm, 10 brightness levels, 3 color modes. Use it freshman year and still use it in your first apartment.</p>
            </div>
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Best Budget</p>
              <a href="#dpower-48-led" className="font-bold text-ink text-sm hover:underline">Dpower 48-LED</a>
              <p className="text-xs text-ink-secondary mt-1">Nearly the same feature set as the Voncerus at under $20. Best value if budget is the priority.</p>
            </div>
            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Best Cordless</p>
              <a href="#deeplite-battery-powered" className="font-bold text-ink text-sm hover:underline">DEEPLITE Battery</a>
              <p className="text-xs text-ink-secondary mt-1">When outlets are maxed out. Stepless dimming is noticeably better than preset-level alternatives.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-ink-secondary leading-relaxed">
              At $10-$35 for most options, a clip-on desk lamp is one of the cheapest small-desk upgrades that makes a visible difference every day -- in every sense of the word.
            </p>
          </div>
        </section>

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all clip-on desk lamps on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=clip+on+desk+lamp&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
            </svg>
            Shop Clip-On Desk Lamps on Amazon
          </a>
        </div>

        {/* Related Guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/best-small-desk-accessories", title: "12 Best Small Desk Accessories That Actually Save Space", label: "Desk Setup" },
              { href: "/guide/best-headphone-stand-desk", title: "Best Headphone Stands for Desk Setups", label: "Desk Setup" },
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
