import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle,
  metaTitle,
  metaDescription,
  lastUpdated,
  readTime,
  heroImage as fallbackHeroImage,
  products,
  atAGlanceRows,
  faq,
  relatedGuides,
  type HomeOfficeWebcam,
} from "@/data/guides/best-webcams-for-home-office";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-webcams-for-home-office",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: HomeOfficeWebcam }) {
  const fpsNum = parseInt(product.fps, 10);
  const fpsHighlight = fpsNum >= 60;

  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {product.badge}
        </span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">
          {product.name}
        </h2>
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.resolution}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                  fpsHighlight
                    ? "bg-green-100 text-green-700 font-bold"
                    : "bg-gray-100 text-ink-secondary"
                }`}
              >
                {product.fps}fps
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.fov}
              </span>
              {product.certified && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-cta-light text-cta font-bold">
                  {product.certified}
                </span>
              )}
              {product.privacyCover && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                  Privacy Cover
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">
                Why it works
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {product.whyItWorks}
              </p>
            </div>
            {product.tradeoffs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1">
                  Trade-offs
                </p>
                <ul className="space-y-1">
                  {product.tradeoffs.map((t, i) => (
                    <li key={i} className="text-xs text-ink-secondary">
                      &middot; {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-ink-muted">
              <span className="font-semibold text-ink">Skip if:</span>{" "}
              {product.skipIf}
            </p>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity w-fit mt-auto"
              style={{ background: "#FF9900" }}
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
              </svg>
              Check price on Amazon
            </a>
          </div>
        </div>
        <div className="border-t border-border grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">
              Pros
            </p>
            <ul className="space-y-1.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">
                    +
                  </span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">
              Cons
            </p>
            <ul className="space-y-1.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">
                    &minus;
                  </span>
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

export default async function BestWebcamsForHomeOfficePage() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: lastUpdated,
    dateModified: lastUpdated,
    author: {
      "@type": "Person",
      name: "Jamie Cole",
      url: `${SITE_URL}/author/jamie-cole`,
    },
    publisher: {
      "@type": "Organization",
      name: "The Office Journal",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/best-webcams-for-home-office`,
    },
    about: [
      { "@type": "Thing", name: "Webcam" },
      { "@type": "Thing", name: "Home Office Webcam" },
      { "@type": "Thing", name: "Video Conferencing Camera" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buying Guides",
        item: `${SITE_URL}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best Webcams for Home Office",
        item: `${SITE_URL}/guide/best-webcams-for-home-office`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Webcams for Home Office 2026",
    description:
      "7 best home office webcams from $35 to $180, tested for Zoom, Teams, and Google Meet.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-webcams-for-home-office#${p.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Container className="py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">
            Buying Guides
          </Link>
          <span>/</span>
          <span className="text-ink">Best Webcams for Home Office</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Buying Guide
            </span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated June 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-4">
            {guideTitle}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
            Most webcam guides start at $70 and climb fast. But if your day is
            back-to-back meetings, a $35 Teams-certified webcam does 95% of what
            a $200 camera does. The gap only starts to matter when you record
            locally, teach live, or move around your desk a lot.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <div className="w-7 h-7 rounded-full bg-brand-muted flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              7 picks evaluated, budget 720p to 4K
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains
          affiliate links. If you buy through our links, we may earn a small
          commission at no extra cost to you. As an Amazon Associate, The Office Journal
          earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">
            Affiliate disclosure
          </Link>
          .
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best webcams for home office 2026"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Quick Picks table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">
            Quick Picks
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    Resolution
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                    FPS
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Certified
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlanceRows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3">
                      <a
                        href={`#${row.id}`}
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        {row.badge}
                      </a>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.resolution}
                    </td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell">
                      <span
                        className={
                          parseInt(row.fps, 10) >= 60
                            ? "text-green-700 font-bold"
                            : "text-ink-secondary"
                        }
                      >
                        {row.fps}fps
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">
                      {row.certified}
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
            The real question with webcams is not which one has the best specs.
            It is which one matches how you actually use it. A person with 3
            calls per day and a well-lit desk needs a completely different camera
            from someone who teaches live classes from a standing desk or
            records content in the evenings.
          </p>
          <p>
            This guide covers seven webcams across five price points from $35 to
            $180, tested across Zoom, Teams, and Google Meet. Each pick includes
            clear guidance on when it makes sense and when to step up.
          </p>
          <p>
            If your calls require showing documents rather than just your face,
            see our{" "}
            <Link prefetch={false}
              href="/guide/best-document-cameras-home-office"
              className="text-brand hover:underline"
            >
              best document cameras for home office guide
            </Link>
            . For audio setup, see our{" "}
            <Link prefetch={false}
              href="/guide/best-headset-for-work"
              className="text-brand hover:underline"
            >
              best headset for work guide
            </Link>
            .
          </p>
        </section>

        {/* Buying Guide */}
        <section className="mb-12 scroll-mt-20" id="buying-guide">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            What Actually Matters in a Webcam
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Resolution</h3>
            <p className="text-sm text-ink-secondary mb-3">
              Zoom and Teams both cap live video delivery at 1080p. A 4K webcam
              produces better 1080p video because it downsamples from a higher
              resolution source, but the difference is marginal compared to
              lighting improvements. For meetings only, 1080p is sufficient. For
              local recording or streaming, 4K matters.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Certified vs Compatible
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              Certified means the manufacturer worked with Microsoft or Zoom to
              qualify the hardware. Certified cameras get plug-and-play driver
              support, hardware button integration (mute, call answer), and
              coordinated firmware updates. Compatible cameras work as standard
              USB devices. For personal home offices, compatible is usually fine.
              For IT-managed enterprise setups, certification reduces support
              friction significantly.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">Camera</th>
                    <th className="text-left px-4 py-3 font-semibold">Teams</th>
                    <th className="text-left px-4 py-3 font-semibold">Zoom</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Meet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Microsoft LifeCam Cinema",
                      teams: "Certified",
                      zoom: "Certified",
                      meet: "Compatible",
                    },
                    {
                      name: "Anker PowerConf C200",
                      teams: "Compatible",
                      zoom: "Certified",
                      meet: "Compatible",
                    },
                    {
                      name: "Logitech C920S",
                      teams: "Certified",
                      zoom: "Certified",
                      meet: "Compatible",
                    },
                    {
                      name: "Logitech Brio 300",
                      teams: "Certified",
                      zoom: "Certified",
                      meet: "Certified",
                    },
                    {
                      name: "OBSBOT Meet SE",
                      teams: "Certified",
                      zoom: "Certified",
                      meet: "Compatible",
                    },
                    {
                      name: "Anker PowerConf C300",
                      teams: "Compatible",
                      zoom: "Certified",
                      meet: "Compatible",
                    },
                    {
                      name: "Insta360 Link 2C",
                      teams: "Certified",
                      zoom: "Certified",
                      meet: "Certified",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span
                          className={
                            row.teams === "Certified"
                              ? "text-cta font-bold"
                              : "text-ink-muted"
                          }
                        >
                          {row.teams}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span
                          className={
                            row.zoom === "Certified"
                              ? "text-cta font-bold"
                              : "text-ink-muted"
                          }
                        >
                          {row.zoom}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs hidden sm:table-cell">
                        <span
                          className={
                            row.meet === "Certified"
                              ? "text-cta font-bold"
                              : "text-ink-muted"
                          }
                        >
                          {row.meet}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">Privacy Shutter</h3>
            <p className="text-sm text-ink-secondary mb-3">
              Every camera on this list includes a physical privacy cover.
              Hardware shutters that block the lens physically are more reliable
              than software disable, since they work even when the OS or driver
              has issues. If privacy cover is important to you, all seven picks
              qualify.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Field of View
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              Wider field of view captures more of your background and is useful
              for shared workspaces or when you sit further from your monitor.
              Narrower FOV is better for single-person close-up shots where you
              want less background visible. A 78-degree FOV is the general
              standard for solo home office use. The Anker C200 and C300 let you
              adjust FOV via software, which is useful if your distance from the
              camera varies.
            </p>
          </div>

          <div className="mb-4 p-4 rounded-xl bg-brand/5 border border-brand/20">
            <h3 className="text-base font-bold text-ink mb-2">
              The Lighting Rule
            </h3>
            <p className="text-sm text-ink-secondary">
              Lighting improvement returns more value than camera upgrades in
              most cases. A $20 USB LED ring or panel placed in front of your
              face will outperform upgrading from a $70 camera to a $200 camera
              in the same poor lighting. Fix your light source before upgrading
              your camera.
            </p>
          </div>
        </section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">
            Jump to pick
          </p>
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

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">
          7 Best Webcams for Home Office
        </h2>
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}

        {/* FAQ */}
        <section id="faq" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-bold text-ink text-sm mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">
            Bottom Line
          </h2>
          <div className="space-y-4">
            {[
              {
                context: "Tightest budget with Teams certification",
                id: "microsoft-lifecam-cinema",
                name: "Microsoft LifeCam Cinema",
                verdict: ", 720p, certified at driver level, under $35.",
              },
              {
                context: "Reliable all-rounder for most WFH setups",
                id: "logitech-c920s",
                name: "Logitech C920S HD Pro",
                verdict: ", 1080p, glass lens, Teams and Zoom certified.",
              },
              {
                context: "Mac users and multi-platform Teams, Zoom, and Meet",
                id: "logitech-brio-300",
                name: "Logitech Brio 300",
                verdict: ", USB-C, certified for all three platforms, auto light correction.",
              },
              {
                context: "Standing desk or teaching with movement",
                id: "obsbot-meet-se",
                name: "OBSBOT Meet SE",
                verdict: ", 1080p at 100fps, AI auto-framing, staggered HDR.",
              },
              {
                context: "Meetings and content creation or streaming",
                id: "insta360-link-2c",
                name: "Insta360 Link 2C",
                verdict: ", 4K, 1/2-inch sensor, motorized AI tracking, certified for all three platforms.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary">
                  <strong className="text-ink">{item.context}:</strong>{" "}
                  <a
                    href={`#${item.id}`}
                    className="font-bold text-ink hover:text-brand transition-colors"
                  >
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
          <h2 className="text-xl font-bold text-white mb-2">
            Browse webcams for home office on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. Budget, 1080p, 4K, and AI-framing options
            available.
          </p>
          <a
            href="https://www.amazon.com/s?k=best+webcam+home+office&tag=theofficejournal-20"
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
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">
            Related Guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedGuides.map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">
                    {g.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 text-center">
            Last updated: June 2026. Verify current Amazon prices before
            purchasing.
          </p>
        </section>
      </Container>
    </>
  );
}
