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
  type DocumentCamera,
} from "@/data/guides/best-document-cameras-home-office";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-document-cameras-home-office",
  image: fallbackHeroImage,
  type: "article",
});

function ProductSection({ product }: { product: DocumentCamera }) {
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
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">
                {product.maxCoverage}
              </span>
              {product.hasHdmi && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold">
                  HDMI Output
                </span>
              )}
              {product.hasWireless && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
                  WiFi Wireless
                </span>
              )}
              {product.hasOcr && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 font-bold">
                  OCR Included
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

export default async function BestDocumentCamerasPage() {
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
      "@id": `${SITE_URL}/guide/best-document-cameras-home-office`,
    },
    about: [
      { "@type": "Thing", name: "Document Camera" },
      { "@type": "Thing", name: "Home Office Camera" },
      { "@type": "Thing", name: "Teaching Camera" },
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
        name: "Best Document Cameras for Home Office and Teaching",
        item: `${SITE_URL}/guide/best-document-cameras-home-office`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Document Cameras for Home Office and Teaching 2026",
    description:
      "7 best document cameras from $50 to $200, compared by resolution, coverage area, HDMI, OCR, and wireless capability.",
    numberOfItems: 7,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name}, ${p.badge}`,
      url: `${SITE_URL}/guide/best-document-cameras-home-office#${p.id}`,
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
          <span className="text-ink">Best Document Cameras</span>
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
            Most people discover they need a document camera the first time they
            try to show a printed page on a Zoom call and realize their webcam
            cannot focus at 30 centimeters. This guide covers seven document
            cameras from $50 to $200 for home office workers and teachers.
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
              7 picks evaluated, budget USB to wireless HDMI
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
            alt="Best document cameras for home office and teaching 2026"
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
                    Coverage
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    HDMI
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
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                      {row.maxCoverage}
                    </td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell">
                      <span
                        className={
                          row.hasHdmi
                            ? "text-blue-700 font-bold"
                            : "text-ink-muted"
                        }
                      >
                        {row.hasHdmi ? "Yes" : "No"}
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
            A standard webcam focuses at 50 to 100 centimeters for face capture.
            A document camera focuses at 20 to 40 centimeters to capture what is
            on your desk. That single difference explains why you cannot just
            point your laptop camera at a printed page and expect a readable
            result.
          </p>
          <p>
            This guide covers seven document cameras suited for home office
            workers who occasionally need to share documents, and for teachers
            who use overhead cameras for live demos, object displays, or
            classroom projection. Every pick includes clear guidance on when to
            choose it and when to step up to the next option.
          </p>
          <p>
            If you need a webcam for face capture rather than document display,
            see our{" "}
            <Link prefetch={false}
              href="/guide/best-webcams-for-home-office"
              className="text-brand hover:underline"
            >
              best webcams for home office guide
            </Link>
            . For audio setup recommendations, see our{" "}
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
            What to Look For in a Document Camera
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Document Camera vs Webcam: When You Actually Need One
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Situation
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Use a Webcam
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Use a Document Camera
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      situation: "Video call face capture",
                      webcam: "Yes - optimized for 50-100cm",
                      docCam: "Works but not ideal",
                    },
                    {
                      situation: "Show printed document",
                      webcam: "No - cannot focus at 30cm",
                      docCam: "Yes - designed for this",
                    },
                    {
                      situation: "Demonstrate physical object",
                      webcam: "Partial - poor angle",
                      docCam: "Yes - overhead view",
                    },
                    {
                      situation: "Scan document to file",
                      webcam: "No",
                      docCam: "Yes - with OCR models",
                    },
                    {
                      situation: "Project to classroom screen",
                      webcam: "No",
                      docCam: "Yes - with HDMI models",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.situation}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.webcam}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.docCam}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              HDMI Mode vs USB Mode: What the Spec Actually Means
            </h3>
            <p className="text-sm text-ink-secondary mb-3">
              USB mode connects to your laptop and the camera appears as a video
              source in Zoom, Teams, or any other conferencing software. This is
              how all seven cameras on this list work by default.
            </p>
            <p className="text-sm text-ink-secondary mb-3">
              HDMI mode (available only on the IPEVO VZ-R Ultra and IPEVO VZ-X)
              connects directly to a projector or monitor with no computer
              involved. The camera outputs video signal through HDMI just like a
              media player. This matters for classroom teachers who want to
              project without routing through a laptop, but adds no value for
              home office use where you are always on a computer.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Resolution and Coverage: What You Actually Need
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Resolution
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Best For
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Picks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      res: "8MP",
                      use: "Standard A4 documents, printed text, general demos",
                      picks: "INS-1, V4K PRO, INS-3, VZ-X",
                    },
                    {
                      res: "13MP / 4K",
                      use: "Small handwriting, fine diagrams, A3-size pages",
                      picks: "INS-2, VZ-R Ultra",
                    },
                    {
                      res: "4K wide-angle",
                      use: "Full open textbooks, large reference materials",
                      picks: "V4K PRO 120",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg"}
                    >
                      <td className="px-4 py-3 font-medium text-ink text-xs">
                        {row.res}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">
                        {row.use}
                      </td>
                      <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">
                        {row.picks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-ink mb-3">
              Document Camera for Remote Workers: 3 Real Use Cases
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Reviewing printed contracts or reports on a call",
                  desc:
                    "Position the camera overhead pointing at the page. Participants see the document in real time as you annotate or point. INSWAN INS-2 or IPEVO V4K PRO handle this well.",
                },
                {
                  title: "Digitizing handwritten notes or sketches",
                  desc:
                    "Capture as still image or export frame. INSWAN INS-2 with OCR converts printed text to editable document automatically. For handwriting, export as image and use third-party OCR.",
                },
                {
                  title: "Demonstrating a physical product or hardware",
                  desc:
                    "INSWAN INS-3 detachable design lets you hold the camera and orbit around the object. Standard overhead cameras are limited to top-down view only.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border bg-white"
                >
                  <p className="font-bold text-ink text-sm mb-1">
                    {i + 1}. {item.title}
                  </p>
                  <p className="text-sm text-ink-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
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
          7 Best Document Cameras for Home Office and Teaching
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
                context: "Occasional document sharing on a budget",
                id: "inswan-ins-1",
                name: "INSWAN INS-1",
                verdict:
                  ", plug-and-play USB, 8MP, A4 coverage, under $50.",
              },
              {
                context: "Daily WFH and online teaching",
                id: "ipevo-v4k-pro",
                name: "IPEVO V4K PRO",
                verdict:
                  ", Sony sensor, AI noise-cancelling mic, flexible arm positioning.",
              },
              {
                context: "4K resolution and OCR scanning",
                id: "inswan-ins-2",
                name: "INSWAN INS-2",
                verdict:
                  ", 13MP 4K, A3 coverage, OCR software included, replaces flatbed scanner.",
              },
              {
                context: "Classroom projection without a laptop",
                id: "ipevo-vzr-ultra",
                name: "IPEVO VZ-R Ultra",
                verdict: ", 13MP, HDMI direct-to-projector, USB mode also included.",
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
            Browse document cameras on Amazon
          </h2>
          <p className="text-white/90 text-sm mb-5">
            All Prime-eligible. USB, HDMI, OCR, and wireless options available.
          </p>
          <a
            href="https://www.amazon.com/s?k=best+document+camera+home+office&tag=theofficejournal-20"
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
