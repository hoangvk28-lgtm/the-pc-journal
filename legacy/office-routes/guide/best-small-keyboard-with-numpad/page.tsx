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
  type NumpadKeyboard,
} from "@/data/guides/best-small-keyboard-with-numpad";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-small-keyboard-with-numpad",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: NumpadKeyboard }) {
  const wirelessColor =
    product.wireless === "Tri-mode"
      ? "bg-green-100 text-green-700"
      : product.wireless.startsWith("Bluetooth")
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-ink-secondary";

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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.layout}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{product.widthCm}</span>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${wirelessColor}`}>{product.wireless}</span>
              {product.mechanical && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">Mechanical</span>
              )}
              {product.hotSwap && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">Hot-Swap</span>
              )}
              {product.qmkVia && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">QMK/VIA</span>
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

export default async function BestSmallKeyboardWithNumpadPage() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-17",
    dateModified: "2026-06-17",
    author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` },
    publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-small-keyboard-with-numpad` },
    about: [
      { "@type": "Thing", name: "96% Keyboard" },
      { "@type": "Thing", name: "Compact Keyboard with Numpad" },
      { "@type": "Thing", name: "Wireless Mechanical Keyboard" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: "Best Small Keyboards with Numpad", item: `${SITE_URL}/guide/best-small-keyboard-with-numpad` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Small Keyboards with Numpad 2026",
    description: "7 compact keyboards with numpad in 2026, compared by wireless, hot-swap, layout, and desk footprint.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-small-keyboard-with-numpad#${p.id}`,
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
          <span className="text-ink">Best Small Keyboards with Numpad</span>
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
              7 picks evaluated: 96% layouts, ergonomic split, and separate numpad add-on
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
            alt="Best small keyboards with numpad 2026"
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
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Layout</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Wireless</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Mechanical</th>
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
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.layout}</td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span
                        className={
                          row.wireless === "Tri-mode"
                            ? "text-green-700 font-bold"
                            : row.wireless.startsWith("Bluetooth")
                            ? "text-blue-700 font-medium"
                            : "text-ink-muted"
                        }
                      >
                        {row.wireless}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell">
                      <span className={row.mechanical ? "text-green-700 font-bold" : "text-ink-muted"}>
                        {row.mechanical ? "Yes" : "No"}
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
          <p>
            Most small keyboard guides tell you to give up the numpad. But the numpad is not a luxury for people who use it
            for data entry, Excel, or invoicing. This guide covers 7 options that keep the numpad: six 96% integrated
            keyboards from $25 to $200, and one separate wireless numpad that adds numpad capability to any existing
            compact keyboard.
          </p>
          <p>
            If budget is the main constraint, see our roundup of{" "}
            <Link prefetch={false} href="/guide/best-compact-keyboard-under-50" className="text-brand hover:underline">
              compact keyboards under $50
            </Link>
            . For a broader look at form factors without the numpad requirement, see our guide on the{" "}
            <Link prefetch={false} href="/guide/best-small-keyboards" className="text-brand hover:underline">
              best small keyboards
            </Link>
            .
          </p>
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Two Ways to Have Both: 96% Layout vs Separate Numpad
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Option A: 96% Integrated Layout</h3>
            <p className="text-sm text-ink-secondary mb-3">
              A 96% keyboard packs all 104 keys into a narrower frame by removing the gaps between key clusters. You get
              a full numpad at all times without managing a second device. This is the right choice if you use the numpad
              regularly throughout the day.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Layout</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical Width</th>
                    <th className="text-left px-4 py-3 font-semibold">Has Numpad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { layout: "Full-size (100%)", width: "~44 cm", numpad: "Yes" },
                    { layout: "96%", width: "~38 to 40 cm", numpad: "Yes" },
                    { layout: "TKL (tenkeyless)", width: "~36 cm", numpad: "No" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.layout}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.width}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className={row.numpad === "Yes" ? "text-green-700 font-bold" : "text-ink-muted"}>
                          {row.numpad}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Option B: Compact Keyboard Plus Separate Wireless Numpad</h3>
            <p className="text-sm text-ink-secondary mb-3">
              If you already own a compact keyboard (TKL, 65%, or similar) that you are happy with, a separate wireless
              numpad like the Nulea adds numpad capability without replacing your keyboard. Place it to the right when
              doing data entry and store it when not. This is the most flexible setup for occasional numpad users who do
              not want to give up their current keyboard.
            </p>
            <div className="p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
              <strong className="text-ink">Trade-off:</strong> Two devices to charge and pair. If you use the numpad
              every day, the integrated 96% approach is more seamless.
            </div>
          </div>

          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            What to Look for in a Compact Keyboard with Numpad
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Layout: 96% vs 1800</h3>
            <p className="text-sm text-ink-secondary mb-3">
              The 96% layout is the dominant compact-numpad format in 2026. It places the numpad cluster flush against
              the main keys with no gap. The 1800 layout is similar but retains small spacing between clusters, making
              it fractionally wider. Both are narrower than full-size. For small desk use, 96% is the more compact choice.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Connection Type</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Latency</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Wired USB-C", latency: "Lowest (1 ms)", notes: "Reliable, no battery needed" },
                    { type: "2.4 GHz dongle", latency: "Very low (1-2 ms)", notes: "Stable, needs USB port" },
                    { type: "Bluetooth 5.x", latency: "Low (7-10 ms)", notes: "No dongle, multi-device" },
                    { type: "Tri-mode (all three)", latency: "Depends on mode", notes: "Most flexible, best value" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">{row.type}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{row.latency}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Mechanical vs Membrane</h3>
            <p className="text-sm text-ink-secondary">
              Mechanical keyboards have individual switches under each key, giving tactile feedback and a longer lifespan
              (50 to 100 million keystrokes per switch). Membrane keyboards use a rubber dome layer that is quieter and
              lower cost but provides less feedback. For data-entry-heavy work, mechanical with linear or tactile
              switches reduces finger fatigue over long sessions. For shared quiet offices, silent membrane or
              silent mechanical switches are a better fit.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-ink mb-3">Desk Footprint</h3>
            <p className="text-sm text-ink-secondary">
              A standard full-size keyboard occupies roughly 44 x 15 cm. A 96% keyboard at 38 to 40 cm wide frees up 4
              to 6 cm for mouse movement or desk items. On a 60 cm wide desk that difference is meaningful. The width
              saving from 96% vs full-size is roughly equivalent to placing a full-size mouse pad between the keyboard
              and the desk edge.
            </p>
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
            <a
              href="#faq"
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors"
            >
              FAQ
            </a>
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">7 Best Small Keyboards with Numpad</h2>
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
              {
                context: "For most people",
                id: "keychron-v5-max",
                name: "Keychron V5 Max",
                verdict:
                  ": tri-mode wireless, QMK/VIA programmable, 96% layout with full numpad in a compact frame.",
              },
              {
                context: "For tight budgets",
                id: "amazon-basics-wireless",
                name: "Amazon Basics Wireless",
                verdict:
                  ": numpad included, 2.4 GHz wireless, plug-and-play under $35.",
              },
              {
                context: "Already have a compact keyboard",
                id: "nulea-wireless-numpad",
                name: "Nulea Wireless Numpad",
                verdict:
                  ": add numpad capability to any existing keyboard without replacing it.",
              },
              {
                context: "For wrist strain concerns",
                id: "perixx-periboard-536b",
                name: "Perixx PERIBOARD-536B",
                verdict:
                  ": ergonomic split layout with built-in numpad and detachable wrist rest.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary">
                  <strong className="text-ink">{item.context}:</strong>{" "}
                  <a href={`#${item.id}`} className="font-bold text-ink hover:text-brand transition-colors">
                    {item.name}
                  </a>
                  {item.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">Browse compact keyboards with numpad on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All Prime-eligible. 96% layouts, budget wireless, and ergonomic options.</p>
          <a
            href="https://www.amazon.com/s?k=compact+keyboard+with+numpad&tag=theofficejournal-20"
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
          <p className="text-xs text-ink-muted mt-4 text-center">
            Last updated: June 2026. Verify current Amazon prices before purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
