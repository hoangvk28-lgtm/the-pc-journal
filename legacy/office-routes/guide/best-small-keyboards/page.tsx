import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AtAGlance } from "@/components/product/AtAGlance";
import { ProductReviewCard } from "@/components/product/ProductReviewCard";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  guideDescription, metaTitle, metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  atAGlanceItems,
  faq,
} from "@/data/guides/best-small-keyboards";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-small-keyboards",
  image: fallbackHeroImage,
  type: "article",
});

const layoutByRank: Record<number, string> = {
  1: "75% (84 keys)",
  2: "75% + knob",
  3: "Compact full-size",
  4: "60% (60 keys)",
  5: "TKL (87 keys)",
  6: "Full-size + numpad",
  7: "TKL (87 keys)",
  8: "Mini + touchpad",
};

const connectionByRank: Record<number, string> = {
  1: "BT + USB-C",
  2: "BT + 2.4G + USB-C",
  3: "Bluetooth",
  4: "BT + USB-C",
  5: "Wired",
  6: "2.4 GHz",
  7: "Wired",
  8: "BT + 2.4G",
};

export default async function BestSmallKeyboardsPage() {
  const heroImage = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-27", dateModified: "2026-05-27", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-small-keyboards` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/best-small-keyboards` }] };

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
          <span className="text-ink">Best Small Keyboards</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Buying Guide</span>
            <span className="text-ink-muted">·</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">·</span>
            <span className="text-xs text-ink-muted">Updated {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            {guideDescription}
          </p>

          {/* Author + trust signals */}
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-brand" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <Link prefetch={false} href="/author/deskfinds-editorial-team" className="hover:text-accent hover:underline transition-colors">The Office Journal Editorial Team</Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              8 keyboards evaluated
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              Based on Amazon ratings from verified buyers
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImage}
            alt="Best small keyboards for desk and dorm room"
            width={900}
            height={400}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Intro */}
        <section className="prose prose-slate max-w-none mb-2">
          <p className="text-base text-ink-secondary leading-relaxed">
            A compact keyboard is the most overlooked upgrade for a small desk setup. When you use a laptop stand to raise your screen to eye level, you need a separate keyboard at desk level - and the right compact keyboard determines whether that transition is comfortable or awkward. A good 75% or TKL board gives you full typing functionality at a fraction of a full-size keyboard&apos;s footprint.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed mt-3">
            We compared 8 compact keyboards across layout, switch technology, wireless connectivity, and price. The range covers a mechanical hot-swap daily driver, a budget triple-wireless value pick, Apple&apos;s zero-configuration Mac option, a premium typing board, two gaming TKLs, a slim wireless workhorse, and the most portable option for remote and media setups.
          </p>
        </section>

        {/* At a Glance */}
        <AtAGlance items={atAGlanceItems} />

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: "#what-to-look-for", label: "What to look for" },
            { href: "#reviews", label: "Full reviews" },
            { href: "#comparison", label: "Comparison table" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3.5 py-2 rounded-full border border-border bg-white text-ink-secondary text-sm font-medium hover:border-brand hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* What to look for */}
        <section id="what-to-look-for" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            6 Criteria to Look For Before Buying a Small Keyboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "📐",
                title: "Layout size: 60% vs 75% vs TKL",
                body: "A 75% layout (84 keys) is the best starting point - it keeps the F-row and arrow keys while trimming roughly 30% of the width of a full-size board. A 60% removes the F-row too for the smallest footprint but requires Fn-layer shortcuts. TKL (87 keys) keeps all keys except the numpad and suits gaming well. Choose 75% for productivity, TKL for gaming, 60% for extreme portability.",
              },
              {
                icon: "⌨️",
                title: "Switch technology: mechanical vs membrane",
                body: "Mechanical switches have a consistent actuation point, tactile or clicky feedback, and long keystroke life (50M+ per switch). Membrane switches require bottoming out each key and are cheaper and quieter. Scissor switches (found in Apple keyboards) are low-profile and precise but fixed - not hot-swappable. For extended daily typing, mechanical is the better long-term choice.",
              },
              {
                icon: "📡",
                title: "Wireless: Bluetooth vs 2.4 GHz vs wired",
                body: "2.4 GHz (nano USB receiver) gives lower latency (1ms) than Bluetooth and a more reliable signal - ideal for gaming and fast typing on a single device. Bluetooth supports multi-device switching (up to 4 devices) without a USB receiver. Wired USB-C or USB-A gives zero latency and zero battery management. Triple-mode keyboards (BT + 2.4G + USB-C) are the most flexible for multi-device setups.",
              },
              {
                icon: "🔋",
                title: "Battery life for wireless keyboards",
                body: "For backlit wireless keyboards, expect 30-70 hours of battery life depending on backlight intensity. Turning the backlight off extends runtime 3-4x. Keyboards with replaceable AA/AAA batteries (like the HHKB Type-S) outlast built-in lithium cells long-term since the batteries never degrade. Built-in rechargeable cells are convenient but lose capacity after 2-3 years of daily charging.",
              },
              {
                icon: "🖥️",
                title: "Mac vs Windows compatibility",
                body: "Most keyboards default to Windows key layout (Win key, Alt). For Mac users, look for keyboards that ship with Mac keycaps and macOS profiles (Command, Option), or keyboards with DIP switches that reconfigure the layout. The Keychron K3 V2 ships with both keycap sets. The Apple Magic Keyboard is macOS-only. The HHKB uses DIP switches for instant switching. Gaming keyboards are typically Windows-optimized.",
              },
              {
                icon: "🔧",
                title: "Hot-swap sockets",
                body: "Hot-swappable keyboards let you pull out and replace switches without soldering - a 2-minute process. This matters if you are new to mechanical keyboards and unsure of your preferred switch feel, or if you expect your preference to change. If you already know you want Brown tactile, Red linear, or Blue clicky and are confident in that choice, a non-hot-swap keyboard is a reasonable pick at the same or lower price.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Reviews */}
        <section id="reviews" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Full Reviews: All 8 Compact Keyboards</h2>
          {products.map((product) => (
            <div key={product.rank} id={`product-${product.rank}`} className="scroll-mt-20">
              <ProductReviewCard {...product} />
            </div>
          ))}
        </section>

        {/* Comparison table */}
        <section id="comparison" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Keyboard</th>
                  <th className="text-left px-4 py-3 font-semibold">Layout</th>
                  <th className="text-left px-4 py-3 font-semibold">Connection</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.rank} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">{p.rank}</span>
                        {p.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">{layoutByRank[p.rank]}</td>
                    <td className="px-4 py-3 text-ink-secondary">{connectionByRank[p.rank]}</td>
                    <td className="px-4 py-3 text-center">
                      {p.scoreOverall && (
                        <span
                          className="inline-block text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums"
                          style={{
                            background: p.scoreOverall >= 8.5 ? "#dcfce7" : "#fef9c3",
                            color: p.scoreOverall >= 8.5 ? "#5f7a4a" : "#a8875a",
                          }}
                        >
                          {p.scoreOverall.toFixed(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block"
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
          <p className="text-xs text-ink-muted mt-2 italic">
            Prices are approximate. Check Amazon for current pricing before purchasing.
          </p>
        </section>

        {/* How we evaluated */}
        <section className="mb-12 p-6 rounded-2xl border border-border bg-bg">
          <h2 className="text-lg font-bold text-ink mb-3">How We Evaluated These Keyboards</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Each keyboard was assessed across five criteria weighted for small desk and dorm room use:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Layout efficiency", "How much desk width does the keyboard occupy relative to the keys it provides? A 75% keyboard that retains the F-row and arrow keys scores higher than a TKL that adds more width without more functionality for most users."],
              ["Switch quality and typing experience", "Switch consistency, actuation feel, and noise level relative to price. Hot-swap capability was treated as a significant differentiator at each price tier."],
              ["Wireless reliability and battery", "Bluetooth multi-device support, 2.4 GHz availability, battery capacity, and real-world runtime claims verified against manufacturer documentation and verified buyer feedback."],
              ["Platform compatibility", "Whether the keyboard works on both Mac and Windows without key remapping workarounds, and how much effort the transition requires."],
              ["Value for price", "Features delivered per dollar - the AULA F75 Pro scores highly here due to triple-mode wireless and gasket mount at under $65."],
            ].map(([label, desc]) => (
              <div key={label as string} className="p-4 rounded-xl bg-white border border-border">
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-xs text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            This guide reflects research across published specifications, manufacturer documentation, and analysis of verified Amazon buyer review patterns. Where observations reference buyer experience, they are based on review pattern analysis, not individual testing claims.
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

        {/* Amazon CTA */}
        <div className="my-10 p-8 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #fff7ed, #fff3e0)", border: "1px solid #fed7aa" }}>
          <p className="text-base font-semibold text-ink mb-1">Browse all compact keyboards on Amazon</p>
          <p className="text-sm text-ink-secondary mb-5">See current prices, deals, and Prime shipping options</p>
          <a
            href="https://www.amazon.com/s?k=compact+mechanical+keyboard&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9900" }}
          >
            <svg className="w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z"/>
            </svg>
            Shop Compact Keyboards on Amazon
          </a>
        </div>

        {/* Related guides */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guide/laptop-stands-small-desks", title: "Best Laptop Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/monitor-stands-small-desks", title: "Best Monitor Stands for Small Desks", label: "Desk Setup" },
              { href: "/guide/desk-lamps-small-desks", title: "Best Desk Lamps for Small Desks", label: "Desk Setup" },
            ].map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="group p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all"
              >
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
