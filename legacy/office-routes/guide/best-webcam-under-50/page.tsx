import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, readTime,
  heroImage as fallbackHeroImage, products, atAGlanceItems,
  buyingCriteria, faq,
  type BudgetWebcam,
} from "@/data/guides/best-webcam-under-50";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/best-webcam-under-50",
  image: fallbackHeroImage,
  type: "article",
});

function FitScoreBadge({ score }: { score: number }) {
  const color = score >= 8.5 ? "#5f7a4a" : score >= 8.0 ? "#7c9068" : "#a8875a";
  return (
    <span
      className="inline-flex flex-col items-center justify-center w-14 h-14 rounded-xl border-2 shrink-0"
      style={{ borderColor: color }}
    >
      <span className="text-xl font-bold leading-none tabular-nums" style={{ color }}>{score.toFixed(1)}</span>
      <span className="text-[8px] font-bold uppercase tracking-widest text-ink-muted mt-0.5">Fit Score</span>
    </span>
  );
}

function WebcamSection({ cam }: { cam: BudgetWebcam }) {
  return (
    <section id={cam.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">
          {cam.badge}
        </span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{cam.name}</h2>
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a
            href={cam.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-56 h-48 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={cam.imageUrl}
              alt={cam.name}
              width={210}
              height={190}
              className="object-contain w-full h-full p-3"
              unoptimized
            />
          </a>

          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap items-start gap-3">
              <FitScoreBadge score={cam.fitScore} />
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{cam.resolution} · {cam.fps}</span>
                  {cam.privacyShutter && (
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      🔒 Privacy shutter
                    </span>
                  )}
                  {cam.chromebookOk && (
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      ✓ Chromebook
                    </span>
                  )}
                </div>
                <span className="text-xs text-ink-muted">{cam.bestFor}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{cam.whyItWins}</p>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{cam.bodyParagraph}</p>

            <a
              href={cam.amazonUrl}
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

        <div className="border-t border-border grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-ink mb-3">Specs</p>
            <ul className="space-y-1.5">
              {cam.specs.map((spec, i) => (
                <li key={i} className="text-xs text-ink-secondary">
                  <span className="font-semibold text-ink">{spec.label}:</span> {spec.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {cam.pros.map((pro, i) => (
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
              {cam.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>
                  {con}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border">
              <span className="font-semibold text-ink">Best for:</span> {cam.bestForDetail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestWebcamUnder50Page() {
  const heroImg = fallbackHeroImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideTitle,
    description: metaDescription,
    datePublished: "2026-06-06",
    dateModified: "2026-06-06",
    author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` },
    publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-webcam-under-50` },
    about: [
      { "@type": "Thing", name: "Webcam" },
      { "@type": "Thing", name: "Budget Webcam" },
      { "@type": "Thing", name: "Dorm Room Essentials" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: "Best Webcams Under $50", item: `${SITE_URL}/guide/best-webcam-under-50` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Webcams Under $50 for Small Desks and Dorm Rooms 2026",
    description: "5 budget webcams under $50 evaluated for small-desk fit, plug-and-play compatibility, Chromebook support, and privacy shutter availability.",
    numberOfItems: 5,
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: `${p.name} — ${p.badge}`,
      url: `${SITE_URL}/guide/best-webcam-under-50#${p.id}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Container className="py-12 max-w-4xl">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link>
          <span>/</span>
          <span className="text-ink">Best Webcams Under $50</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Budget Guide</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">{readTime} read</span>
            <span className="text-ink-muted">&middot;</span>
            <span className="text-xs text-ink-muted">Updated June 2026</span>
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
              5 picks — all under $50, all plug-and-play, all Chromebook-compatible
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission — at no extra cost to you. This guide is based on product specs, buyer feedback, use cases, and comparison criteria — not paid placement.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image
            src={heroImg}
            alt="Best webcams under $50 for small desks and dorm rooms"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Quick picks table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Our Top Picks at a Glance</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-center px-4 py-3 font-semibold hidden sm:table-cell">Fit Score</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Resolution</th>
                  <th className="text-center px-4 py-3 font-semibold hidden md:table-cell">Privacy Shutter</th>
                  <th className="text-center px-4 py-3 font-semibold hidden lg:table-cell">Chromebook</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {atAGlanceItems.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3">
                      <a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline whitespace-nowrap">{p.badge}</a>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs whitespace-nowrap">{p.name}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className="text-sm font-bold text-brand tabular-nums">{p.fitScore.toFixed(1)}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden md:table-cell">{p.resolution}</td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {p.privacyShutter ? (
                        <span className="text-emerald-600 font-bold text-xs">Yes</span>
                      ) : (
                        <span className="text-ink-muted text-xs">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className="text-emerald-600 font-bold text-xs">✓</span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={p.amazonUrl}
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
        <section className="mb-12 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>
            Most webcam guides are written by tech reviewers with dedicated home offices, wide monitors, and no budget constraints. The result: roundups that lead with $150 4K cameras and treat &ldquo;budget&rdquo; as anything under $80.
          </p>
          <p>
            This guide is written for people with different constraints: a small desk, a shared dorm room, a laptop that might be a Chromebook, a budget that caps out at $50, and a requirement that the thing just <em>works</em> when plugged in — no driver download on a school-managed machine.
          </p>
          <p>
            Every pick here is under $50, plug-and-play on Chromebook, and evaluated specifically for compact desk setups. No 4K cameras, no AI tracking, no features you&apos;ll never use.
          </p>
        </section>

        {/* Do you actually need a webcam? */}
        <section id="do-you-need-a-webcam" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">Do You Actually Need an External Webcam?</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Most laptop built-in cameras are 720p with poor low-light performance and a wide lens that distorts your face at close range. An external webcam is a genuine upgrade — but it&apos;s not always necessary.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="p-4 rounded-xl border border-cta/30 bg-cta-light/10">
              <p className="text-xs font-bold uppercase tracking-widest text-cta mb-3">Get an external webcam if…</p>
              <ul className="space-y-2">
                {[
                  "You're on video calls daily (remote work or online classes)",
                  "People frequently comment on your video quality",
                  "Your laptop camera produces a yellow or grainy image",
                  "You share a room and want a physical privacy shutter",
                  "Your laptop camera aims upward (thin-and-light angle problem)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                    <span className="w-4 h-4 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px] mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-border bg-bg">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Your built-in camera is fine if…</p>
              <ul className="space-y-2">
                {[
                  "You're on video calls once a week or less",
                  "Your laptop is less than 2 years old with a 1080p built-in",
                  "You have good window lighting directly in front of you",
                  "Calls are audio-first (camera optional in your workflow)",
                  "You're genuinely on a tight budget — save it for something else",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                    <span className="w-4 h-4 rounded-full bg-gray-100 text-ink-muted flex items-center justify-center shrink-0 font-bold text-[9px] mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">Honest benchmark:</strong> A $25 external webcam + natural light from a window in front of you will look noticeably better than a built-in camera in most conditions. The light matters more than the camera. More on this below.
          </div>
        </section>

        {/* Small-desk placement */}
        <section id="small-desk-placement" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">Webcam Placement for Small Desks</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            No competitor guide addresses the physical placement challenge on a small desk. Here&apos;s what matters.
          </p>
          <div className="space-y-4">
            {[
              {
                title: "Eye-level beats top-of-monitor",
                body: "A webcam perched on a monitor that sits below eye level shoots upward — nostrils, ceiling, unflattering angle. On a small desk, your screen is often lower than ideal. Fix it: put a book or stand under your laptop/monitor to raise it so the webcam is level with your eyes, or use an adjustable-arm monitor mount.",
              },
              {
                title: "90° FOV is the right choice at small-desk distances",
                body: "Wider FOVs (110°+) are popular in marketing but show more background — your entire room behind you. At 18–24 inches from a small desk screen, a 90° FOV fills the frame naturally with just your head and shoulders. All five picks use 90° for exactly this reason.",
              },
              {
                title: "Clip-on fits thin bezels without a tool",
                body: "All five picks in this guide clip directly onto your monitor or laptop screen. For thin-bezel laptops (most modern ultrabooks), confirm the clip grip on day one. Logitech's clip mechanism is the most reliable for thin bezels; the NexiGo and EMEET clips are functional but stiffer.",
              },
              {
                title: "Cable length and desk clutter",
                body: "Budget webcams ship with ~1.5m USB-A cables. On a small desk, route the cable behind the monitor stand or use a small cable clip to keep it from occupying surface space. A cable that crosses the desk surface is the primary cause of webcam-related clutter.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-white">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white font-bold text-sm shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-sm font-bold text-ink mb-1">{item.title}</p>
                  <p className="text-sm text-ink-secondary leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Criteria to Look for Before You Buy */}
        <section id="buying-criteria-pre" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Criteria to Look for Before You Buy a Webcam</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6">
            At the under-$50 price point, spec sheets are often misleading. Here&apos;s what actually matters — and what you can safely ignore.
          </p>
          <div className="space-y-3">
            {[
              {
                icon: "📹",
                label: "Resolution: 1080p is the minimum in 2026",
                must: true,
                body: "Skip any webcam labeled 720p — the difference is visible on modern screens and most video platforms support 1080p. Beware of cheap no-name units that advertise \"1080p\" but deliver noticeably softer video. Every pick in this guide is genuine 1080p verified by buyer reports.",
              },
              {
                icon: "🔒",
                label: "Physical privacy shutter",
                must: false,
                body: "A physical lens cover blocks the camera mechanically — software can't override it. Critical for shared dorm rooms and shared home offices. Nice-to-have for everyone else. Two picks in this guide include one (NexiGo N60 and EMEET C960); the Logitech Brio 100 also includes a built-in shutter.",
              },
              {
                icon: "🎤",
                label: "Built-in microphone quality",
                must: false,
                body: "Most budget webcams include a basic mono mic — adequate for weekly calls, not for daily remote work in noisy environments. If audio matters to you, the EMEET C960's dual-mic with noise cancellation is the clear winner at this price point. If audio is critical, consider a separate USB mic instead.",
              },
              {
                icon: "🔌",
                label: "Plug-and-play (no driver required)",
                must: true,
                body: "School-managed laptops and Chromebooks often can't install software. All picks in this guide are UVC-compliant: plug in, use immediately on Windows, macOS, and Chrome OS. Avoid webcams that require companion app installs — they fail on managed devices.",
              },
              {
                icon: "📐",
                label: "Field of view: 78°–90° for small desks",
                must: false,
                body: "Wider FOV (110°+) sounds better on paper but shows more background at typical small-desk distances. At 18–24 inches from your screen, 90° frames you cleanly without exposing your room. All five picks here use 90°.",
              },
              {
                icon: "📎",
                label: "Clip mechanism and thin-bezel compatibility",
                must: true,
                body: "Verify the clip fits your monitor or laptop. Logitech clips are specifically designed for thin bezels. Generic clips on cheap models often droop on modern thin-screen laptops within weeks. If you have an ultra-thin laptop (under 4mm bezel), Logitech is the safest choice.",
              },
              {
                icon: "⚡",
                label: "Frame rate: 30fps is fine for calls, not for streaming",
                must: false,
                body: "Every webcam under $50 caps at 30fps. This is perfectly adequate for Zoom, Teams, and Google Meet. If you need 60fps for smooth streaming or content creation, you need to spend more — the Logitech C920x (~$55–$60) is the entry point for 60fps.",
              },
              {
                icon: "🏷️",
                label: "Brand reliability over spec padding",
                must: false,
                body: "At under $20, generic brands routinely fail at the hinge within 3 months or deliver below-spec video quality. Stick with EMEET, NexiGo, or Logitech — they have real product support and consistent quality. The $5 you save on a no-name unit rarely outlasts a semester.",
              },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-white">
                <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-ink">{c.label}</p>
                    {c.must && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand text-white uppercase tracking-widest">Must-have</span>
                    )}
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
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
                {p.badge}
              </a>
            ))}
            <a href="#buying-criteria-pre" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">What to look for</a>
            <a href="#lighting-tips" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">Lighting tips</a>
            <a href="#buying-criteria" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">How we scored</a>
            <a href="#faq" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">FAQ</a>
          </div>
        </nav>

        {/* Product sections */}
        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top 5 Picks</h2>
        {products.map((cam) => <WebcamSection key={cam.id} cam={cam} />)}

        {/* Lighting tips — unique content gap */}
        <section id="lighting-tips" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">How to Look Good on a Budget Webcam (Without Buying a Ring Light)</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6">
            The single biggest mistake in budget webcam setups: spending $30 on a webcam and sitting in front of a dark wall with overhead fluorescent lighting. The camera is not the problem. Here&apos;s how to fix your image quality for free.
          </p>
          <div className="space-y-4 mb-6">
            {[
              {
                label: "Face a window",
                impact: "Biggest free improvement",
                description: "Natural light from a window directly in front of you — not behind or to the side — transforms any webcam. Even a $18 webcam looks clean with good window light. If the window is behind you, you become a silhouette. Move your desk or flip your chair.",
                color: "#5f7a4a",
              },
              {
                label: "Put a lamp at eye level in front of you",
                impact: "Free if you already have a lamp",
                description: "A desk lamp placed at monitor level, facing you, acts as a basic fill light. Aim for 4000–5000K (cool white or daylight) for a clean, natural look on camera — warm light at 2700K will make you appear orange-toned. Position it slightly to the side, not directly behind the screen.",
                color: "#7c9068",
              },
              {
                label: "Raise your camera to eye level",
                impact: "Free — use books or a stand",
                description: "A webcam that points upward shows ceiling, nostrils, and a generally unflattering angle. Stack books, use a laptop stand, or mount your monitor higher until the webcam lens is level with your eyes. This alone changes how others perceive your setup.",
                color: "#7c3aed",
              },
              {
                label: "Put a light-colored surface or wall behind you",
                impact: "Reflects light back onto face",
                description: "A white or light-grey wall behind your desk reflects ambient light back toward your face, acting as a soft reflector. Dark walls absorb light and deepen shadows. If you can rearrange, sit with the lighter wall behind you.",
                color: "#a8875a",
              },
            ].map((tip, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-white">
                <span className="flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm shrink-0 mt-0.5" style={{ background: tip.color }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-ink">{tip.label}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${tip.color}15`, color: tip.color }}>{tip.impact}</span>
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
            <strong className="text-ink">If you do want a ring light:</strong> A basic 6-inch ring light costs $12–$18 on Amazon. Paired with any webcam in this guide, it&apos;s a complete setup. Look for one with adjustable color temperature (warm to cool) and brightness — you&apos;ll want to adjust it based on your room lighting.
          </div>
        </section>

        {/* Chromebook & laptop compat */}
        <section id="chromebook-compatibility" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-5 tracking-tight">Chromebook and Laptop Compatibility Notes</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            Every pick in this guide works on Chromebook without driver installation. Chrome OS natively supports all UVC-compliant webcams — which includes all mainstream brands. The only webcams that don&apos;t work on Chromebook are those requiring proprietary software (AI tracking cameras, specialized streaming cams).
          </p>
          <div className="overflow-x-auto rounded-xl border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Webcam</th>
                  <th className="text-center px-4 py-3 font-semibold">Windows</th>
                  <th className="text-center px-4 py-3 font-semibold">macOS</th>
                  <th className="text-center px-4 py-3 font-semibold">Chromebook</th>
                  <th className="text-center px-4 py-3 font-semibold hidden sm:table-cell">Driver needed?</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-bold text-xs">✓</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-bold text-xs">✓</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-bold text-xs">✓</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">No — plug and play</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
            <strong className="text-ink">School-managed Chromebooks:</strong> If your Chromebook is managed by your school, camera permissions may be restricted at the policy level — not by the webcam hardware. Check with your IT department if the webcam is not recognized on a managed device. The webcam itself is plug-and-play; restrictions come from device policy, not the camera.
          </div>
        </section>

        {/* Buying criteria / Fit Score explained */}
        <section id="buying-criteria" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">How We Scored These Webcams</h2>
          <p className="text-sm text-ink-secondary mb-6 leading-relaxed">
            The <strong className="text-ink">The Office Journal Fit Score</strong> rates every pick on five criteria weighted toward small-space and student use cases. A $20 webcam that genuinely delivers for its intended use case scores higher than a $40 webcam with overstated specs.
          </p>
          <div className="space-y-3">
            {buyingCriteria.map((c, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-white">
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-sm font-bold text-brand">{c.weight}</span>
                  <span className="text-[9px] text-ink-muted uppercase tracking-widest">weight</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-ink mb-1">{c.label}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 leading-relaxed">
            Scores reflect The Office Journal editorial assessment based on product specifications, verified buyer reports, and structured comparison criteria. They are not crowd-sourced ratings.{" "}
            <Link prefetch={false} href="/how-we-review" className="text-brand hover:underline">How we review →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-white overflow-hidden">
                <div className="flex gap-3 p-5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-muted text-brand font-bold text-xs shrink-0 mt-0.5">Q</span>
                  <div>
                    <p className="text-sm font-bold text-ink mb-2">{item.q}</p>
                    <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related guides */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Buying Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-desk-lamp-under-30", label: "Best Desk Lamps Under $30", description: "Light your desk setup without sacrificing outlet space." },
              { href: "/guide/desk-setup-essentials", label: "Desk Setup Essentials", description: "The complete small-desk setup checklist for students." },
              { href: "/guide/best-docking-stations-for-desk-setup", label: "Best Docking Stations for Desk Setups", description: "One cable to rule all your peripherals." },
              { href: "/guide/best-desk-mat-for-small-desk", label: "Best Desk Mats for Small Desks", description: "Protect your surface and unify your setup." },
            ].map((g) => (
              <Link prefetch={false}
                key={g.href}
                href={g.href}
                className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-white hover:border-brand hover:shadow-card transition-all"
              >
                <span className="text-sm font-semibold text-ink">{g.label}</span>
                <span className="text-xs text-ink-secondary">{g.description}</span>
              </Link>
            ))}
          </div>
        </section>

      </Container>
    </>
  );
}
