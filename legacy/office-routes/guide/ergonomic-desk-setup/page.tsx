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
  products,
  atAGlanceItems,
  auditChecklist,
  diagramRows,
  budgetTiers,
  faq,
  type ErgoProduct,
} from "@/data/guides/ergonomic-desk-setup";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/guide/ergonomic-desk-setup",
  image: fallbackHeroImage,
  type: "article",
});

function ProductCard({ product }: { product: ErgoProduct }) {
  return (
    <div id={product.id} className="my-6 rounded-2xl border border-border bg-white overflow-hidden shadow-card scroll-mt-20">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-bg">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-lg tabular-nums"
          style={{
            background: product.score >= 9.0 ? "#dcfce7" : "#fef9c3",
            color: product.score >= 9.0 ? "#5f7a4a" : "#a8875a",
          }}
        >
          {product.score.toFixed(1)}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-brand flex-1">{product.category}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 p-5">
        {/* Image */}
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="shrink-0 flex items-center justify-center w-full sm:w-52 h-44 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={180}
            className="object-contain w-full h-full p-3"
            unoptimized
          />
        </a>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="font-bold text-ink text-base leading-snug hover:text-brand transition-colors"
            >
              {product.name}
            </a>
            <p className="text-xs text-ink-muted mt-0.5">{product.brand} &middot; Amazon Prime eligible</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-2">Why it works</p>
              <ul className="space-y-1.5">
                {product.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                    <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">
                      +
                    </span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-2">Tradeoffs</p>
              <ul className="space-y-1.5">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                    <span
                      className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[9px]"
                      style={{
                        background: con.severity === "major" ? "#fee2e2" : "#fef9c3",
                        color: con.severity === "major" ? "#dc2626" : "#a8875a",
                      }}
                    >
                      &minus;
                    </span>
                    {con.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-border">
            <p className="text-xs text-ink-muted flex-1">
              <span className="font-semibold text-ink">Skip if:</span> {product.skipIf}
            </p>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: "#FF9900" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.26 18.36C9.18 20.34 4.76 21.38 1 20.16c-.38-.13-.33-.44.08-.35 3.47.67 7.77-.07 10.6-1.82.47-.27.87.17.58.37zm1.06-1.17c-.43-.56-2.85-.27-3.94-.13-.33.04-.38-.25-.08-.46 1.93-1.36 5.1-.97 5.47-.51.37.46-.1 3.63-1.91 5.14-.28.23-.54.11-.42-.2.41-.98 1.32-3.28.88-3.84z" />
              </svg>
              Check price on Amazon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const monitorRiser = products.find((p) => p.id === "monitor-riser")!;
const monitorArm = products.find((p) => p.id === "monitor-arm")!;
const laptopStand = products.find((p) => p.id === "laptop-stand")!;
const footrest = products.find((p) => p.id === "footrest")!;
const deskMat = products.find((p) => p.id === "desk-mat")!;
const monitorLightBar = products.find((p) => p.id === "monitor-light-bar")!;
const deskLamp = products.find((p) => p.id === "desk-lamp")!;

export default async function ErgonomicDeskSetupPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-05-31", dateModified: "2026-05-31", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/ergonomic-desk-setup` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: guideTitle, item: `${SITE_URL}/guide/ergonomic-desk-setup` }] };

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
          <span className="text-ink">Ergonomic Desk Setup</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Ergonomics Guide</span>
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
              7 products evaluated, research-based positioning data
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-border mb-8 bg-bg">
          <Image
            src={heroImg}
            alt="Ergonomic desk setup guide"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Intro */}
        <section className="mb-8 p-5 rounded-xl bg-bg border border-border">
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            Most people adjust their chair to match their desk. That is backwards -- and it is why neck pain, wrist strain, and eye fatigue are so common in home offices. The correct sequence is: set chair height for your elbows, then position the monitor for your eyes, then arrange the keyboard and mouse for your wrists.
          </p>
          <p className="text-base text-ink-secondary leading-relaxed mb-3">
            An ergonomic setup does not require expensive equipment. A $30 footrest and a $26 monitor riser solve the two most common problems. This guide covers six positions you need to get right, the measurements for each, and the specific products that help -- starting with the cheapest fixes.
          </p>
          <p className="text-sm text-ink-muted">
            What this guide covers: ergonomic audit checklist, correct positions with measurements, monitor and chair setup, keyboard and mouse placement, lighting, setup variations for laptop + two monitors + small desks, and a product comparison table.
          </p>
        </section>

        {/* Products at a glance */}
        <section className="mb-10" id="products">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Recommended Products at a Glance</h2>
          <AtAGlance items={atAGlanceItems} />
        </section>

        {/* Jump nav */}
        <nav className="mb-10 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to section</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "#audit", label: "60-sec audit" },
              { href: "#diagram", label: "Correct positions" },
              { href: "#monitor", label: "Monitor" },
              { href: "#chair", label: "Chair" },
              { href: "#keyboard", label: "Keyboard & mouse" },
              { href: "#lighting", label: "Lighting" },
              { href: "#situations", label: "By situation" },
              { href: "#comparison", label: "All products" },
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

        {/* Section 1: 60-Second Audit */}
        <section id="audit" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">The 60-Second Ergonomic Audit</h2>
          <p className="text-sm text-ink-secondary mb-5">Before buying anything, check these five things at your current desk. Each one identifies a specific problem -- and points to the cheapest fix.</p>
          <div className="rounded-xl border border-border overflow-hidden">
            {auditChecklist.map((item, i) => (
              <div key={i} className={`flex items-start gap-4 px-5 py-4 ${i < auditChecklist.length - 1 ? "border-b border-border" : ""} ${i % 2 === 0 ? "bg-white" : "bg-bg"}`}>
                <span className="w-5 h-5 rounded border-2 border-brand shrink-0 mt-0.5 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-sm bg-transparent" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink">{item.label}</p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    <span className="font-medium text-brand">If no:</span> {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-3 px-1">
            If you answered no to three or more: start with chair height adjustment (free), then footrest, then monitor riser. In that order.
          </p>
        </section>

        {/* Section 2: Diagram */}
        <section id="diagram" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Ergonomic Desk Setup Diagram</h2>
          <p className="text-sm text-ink-secondary mb-5">Correct measurements for every position in an ergonomic desk setup. Use this as your reference before making any adjustments.</p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold w-40">Position</th>
                  <th className="text-left px-4 py-3 font-semibold">Correct measurement</th>
                </tr>
              </thead>
              <tbody>
                {diagramRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink align-top">{row.position}</td>
                    <td className="px-4 py-3 text-ink-secondary">{row.correct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted mt-3 px-1">
            These measurements are based on OSHA and NIOSH ergonomic guidelines adapted for home office desk setups.
          </p>
        </section>

        {/* Section 3: Monitor Position */}
        <section id="monitor" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Monitor Position</h2>

          <h3 className="text-lg font-bold text-ink mb-3">How High Should Your Monitor Be?</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            The top of your screen should be at or slightly below eye level. Most people sit with their monitors too low because the monitor is placed flat on the desk surface. This forces the neck into a forward-bent position for hours at a time -- the single most common cause of desk-related neck pain.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            To check: sit in your normal working position, look straight ahead, and mark where your eye line hits the monitor with a piece of tape. If that line falls below the top third of the screen, the monitor needs to go up. A standard monitor riser raises the screen 4 to 6 inches, which covers most gaps.
          </p>

          <h3 className="text-lg font-bold text-ink mb-3">How Far Should Your Monitor Be?</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            The recommended distance is 20 to 28 inches -- roughly arm&apos;s length. The quick test: extend your arm toward the screen. Your fingertips should nearly touch it. Larger monitors (27 inches and above) should sit at the farther end of that range. An ultrawide should be at the same distance as a standard monitor -- there is no reason to sit closer because it is wider.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-2">
            <div className="rounded-xl border border-border bg-bg p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Option A -- Budget fix</p>
              <p className="text-sm font-bold text-ink mb-1">Monitor Riser with Storage</p>
              <p className="text-xs text-ink-muted">Best for: solid desks, no frequent height changes, want storage underneath</p>
            </div>
            <div className="rounded-xl border border-border bg-bg p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Option B -- Full adjustment</p>
              <p className="text-sm font-bold text-ink mb-1">Dual Monitor Arm</p>
              <p className="text-xs text-ink-muted">Best for: thick desk edges, two monitors, need infinite height control</p>
            </div>
          </div>

          <ProductCard product={monitorRiser} />
          <ProductCard product={monitorArm} />
        </section>

        {/* Section 4: Chair & Sitting */}
        <section id="chair" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Chair and Sitting Position</h2>

          <h3 className="text-lg font-bold text-ink mb-3">How to Adjust Your Chair Correctly</h3>
          <div className="space-y-3 mb-5">
            {[
              { step: "1", text: "Adjust seat height first -- elbows should be at 90° when resting on the desk with shoulders relaxed. This is the anchor for everything else." },
              { step: "2", text: "Position lumbar support into the curve of your lower back. If your chair does not have adjustable lumbar, a lumbar cushion ($20--30) fills the gap." },
              { step: "3", text: "Set armrests so shoulders are relaxed and elbows are lightly supported -- not hunched up or dangling down." },
              { step: "4", text: "If feet do not rest flat on the floor after setting chair height for elbows, add a footrest. Do not lower the chair to reach the floor -- that breaks the elbow angle." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white">
                <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  {item.step}
                </span>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-ink mb-3">What If You Do Not Have an Ergonomic Chair?</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            A dedicated ergonomic chair is not a prerequisite for a correct setup. A footrest and a lumbar cushion address the two most common seated posture failures at a fraction of the cost. Reserve budget for a proper ergonomic chair only after you have solved monitor height and keyboard position -- those have more immediate impact on daily discomfort.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            When should you invest in an ergonomic chair? If you sit for more than six hours daily, experience lower back pain that does not improve with footrest and lumbar support, or have a specific medical recommendation.
          </p>

          <ProductCard product={footrest} />
        </section>

        {/* Section 5: Keyboard & Mouse */}
        <section id="keyboard" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Keyboard and Mouse Position</h2>

          <h3 className="text-lg font-bold text-ink mb-3">Where Should Your Keyboard Be?</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            The keyboard should sit at a height where your elbows are at 90 to 110 degrees -- a slightly open angle is actually better than a rigid 90 degrees for most people. Wrists should be neutral: not bent upward (extension) and not bent downward (flexion).
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            Wrist rests exist for resting between typing sessions, not for typing on. Keeping your wrists on a rest while actively typing forces the fingers to reach upward, which creates exactly the sustained extension that contributes to cumulative wrist strain. Use the rest when pausing; lift your wrists when typing.
          </p>

          <h3 className="text-lg font-bold text-ink mb-3">Common Wrist and Shoulder Mistakes</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {[
              { mistake: "Wrists bent upward while typing", cause: "Keyboard on a desk that is too high", fix: "Lower chair height or use a keyboard tray" },
              { mistake: "Mouse too far from the body", cause: "Reaching forward to the mouse pad", fix: "Keep mouse directly beside the keyboard, close to the body" },
              { mistake: "Shoulders raised while typing", cause: "Desk too high for the chair height", fix: "Adjust chair up or use a lower keyboard surface" },
              { mistake: "Leaning forward toward the screen", cause: "Monitor too far or too low", fix: "Move monitor closer or raise it to eye level" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-white">
                <p className="text-sm font-bold text-ink mb-1">{item.mistake}</p>
                <p className="text-xs text-ink-muted mb-1"><span className="font-semibold">Cause:</span> {item.cause}</p>
                <p className="text-xs text-brand font-medium"><span className="font-semibold text-ink">Fix:</span> {item.fix}</p>
              </div>
            ))}
          </div>

          <ProductCard product={deskMat} />
        </section>

        {/* Section 6: Lighting */}
        <section id="lighting" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Lighting and Eye Strain</h2>

          <h3 className="text-lg font-bold text-ink mb-3">The Correct Monitor Lighting Setup</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            Eye strain from a desk setup is almost always caused by contrast -- not by insufficient light. When the screen is significantly brighter or darker than the ambient room light, your eyes constantly adjust between the two. The fix is matching screen brightness to room brightness, not increasing one or decreasing the other.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {[
              { icon: "✗", label: "Monitor facing a window", note: "Direct sunlight causes glare on the screen" },
              { icon: "✗", label: "Window directly behind you", note: "Backlight creates severe contrast against the screen" },
              { icon: "✓", label: "Window to your side (90°)", note: "Natural light without glare or backlight contrast" },
            ].map((item, i) => (
              <div key={i} className={`p-3 rounded-xl border text-center ${i === 2 ? "border-cta bg-cta-light/30" : "border-border bg-white"}`}>
                <p className={`text-lg font-bold mb-1 ${i === 2 ? "text-cta" : "text-red-500"}`}>{item.icon}</p>
                <p className="text-xs font-bold text-ink mb-1">{item.label}</p>
                <p className="text-xs text-ink-muted">{item.note}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-ink mb-3">The 20-20-20 Rule</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            Every 20 minutes, look at something 20 feet away for 20 seconds. This allows the ciliary muscles in the eye to fully relax from near-focus. A monitor light bar reduces glare more effectively than a standard desk lamp because its asymmetric lens directs light downward onto the desk rather than back toward the eyes.
          </p>

          <div className="mb-2 p-3 rounded-xl bg-bg border border-border">
            <p className="text-xs font-bold text-ink mb-1">Which lighting option is right for you?</p>
            <p className="text-xs text-ink-secondary">
              <span className="font-semibold">Monitor light bar:</span> best when you have good ambient room lighting and only need to reduce screen glare. Zero desk footprint. &nbsp;
              <span className="font-semibold">Wide-angle desk lamp:</span> best when the room itself is poorly lit, such as a room with no window or late-evening work.
            </p>
          </div>

          <ProductCard product={monitorLightBar} />
          <ProductCard product={deskLamp} />
        </section>

        {/* Section 7: By Situation */}
        <section id="situations" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">Ergonomic Setup by Situation</h2>

          <h3 className="text-lg font-bold text-ink mb-3">Ergonomic Setup With Laptop Only</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            A laptop on a flat desk puts the screen between 6 and 10 inches below eye level. After two or three hours in this position, the neck is sustaining roughly 40 to 50 pounds of effective load instead of the normal 10 to 12 pounds. A foldable laptop stand raises the screen to monitor height in under 30 seconds.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            The correct combo: laptop stand + external wireless keyboard + wireless mouse. The stand raises the screen, the external keyboard keeps wrists neutral, and the total cost is under $80. This delivers most of the ergonomic benefit of a dedicated monitor for less than the price of a single ergonomic chair.
          </p>

          <ProductCard product={laptopStand} />

          <h3 className="text-lg font-bold text-ink mb-3 mt-8">Ergonomic Setup With Two Monitors</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            The primary monitor goes directly in front of you at eye level. The secondary monitor sits 30 degrees to the side -- turning your head slightly, not your torso. Avoid placing both monitors side by side directly in front: this forces you to look left or right constantly, which adds lateral neck strain on top of the vertical strain from a low monitor.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            If you genuinely use both monitors equally throughout the day, center them and meet them at the midpoint of your natural forward gaze, with each screen angled inward 15 degrees. A dual monitor arm makes this alignment straightforward and keeps the desk surface clear.
          </p>
          <div className="p-4 rounded-xl border border-brand/20 bg-brand/5 mb-6">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Two-monitor rule of thumb</p>
            <p className="text-sm text-ink-secondary">
              The monitor you look at most should be the one in front of you. If you cannot identify which one that is, center both and angle them inward. If one monitor is clearly dominant, keep it centered and treat the second as a reference panel at 30° to the side.
            </p>
          </div>

          <h3 className="text-lg font-bold text-ink mb-3">Ergonomic Setup on a Small Desk</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-3">
            Space constraints require prioritization. In order: (1) monitor height is the highest-impact fix, (2) keyboard and wrist position, (3) mouse reach and foot position. A laptop stand plus external keyboard resolves the first two simultaneously and costs less than $80.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            For monitor stands on thin desks: choose a riser with a storage shelf rather than a monitor arm. Arms require a desk edge of at least one inch to clamp securely. Thin IKEA desktop panels like the LINNMON can crack under clamp pressure over time.
          </p>
          <p className="text-xs text-ink-muted">
            For more small desk setup ideas, see our{" "}
            <Link prefetch={false} href="/guide/small-desk-setup" className="text-brand hover:underline font-medium">
              small desk setup guide
            </Link>.
          </p>
        </section>

        {/* Section 8: Comparison Table */}
        <section id="comparison" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All Recommended Products -- Side by Side</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Solves</th>
                  <th className="text-left px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3">
                      <a href={`#${p.id}`} className="font-semibold text-ink hover:text-brand transition-colors text-sm">
                        {p.name}
                      </a>
                      <p className="text-xs text-ink-muted mt-0.5">{p.category}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-secondary hidden sm:table-cell">{p.solves}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-lg"
                        style={{
                          background: p.score >= 9.0 ? "#dcfce7" : "#fef9c3",
                          color: p.score >= 9.0 ? "#5f7a4a" : "#a8875a",
                        }}
                      >
                        {p.score.toFixed(1)}
                      </span>
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

        {/* How We Evaluated */}
        <section className="mb-14 p-6 rounded-2xl bg-bg border border-border">
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">How We Evaluated These Products</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-secondary">
            {[
              { label: "Ergonomic impact", note: "Does the product directly address a measurable ergonomic position -- monitor height, wrist angle, foot position?" },
              { label: "Setup simplicity", note: "Can a non-technical person set it up correctly without tools or instructions in under 10 minutes?" },
              { label: "Desk compatibility", note: "Does it work on standard home office desks including thin desktop panels and narrow surfaces?" },
              { label: "Value at price point", note: "Does the ergonomic improvement justify the cost relative to alternatives at the same price?" },
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
            Product selections are based on research, product specifications, and customer feedback data. The Office Journal earns a commission on qualifying purchases at no extra cost to you.
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

        {/* Outro / Where to Start */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Where to Start</h2>
          <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
            Fix the highest-impact problem first. For most people, that is monitor height. For people who sit long hours, it is seat height plus a footrest. Start there, let the setup settle for a week, then decide what to add.
          </p>
          <div className="space-y-4">
            {budgetTiers.map((tier, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-bg">
                <span className="shrink-0 text-sm font-bold text-white bg-brand px-3 py-1 rounded-lg mt-0.5">
                  {tier.label}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink mb-0.5">{tier.products.join(" + ")}</p>
                  <p className="text-xs text-ink-secondary">{tier.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amazon CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center"
          style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse ergonomic desk accessories on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">All products are Prime-eligible with free delivery.</p>
          <a
            href="https://www.amazon.com/s?k=ergonomic+desk+accessories&tag=theofficejournal-20"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#FF9900" }}
          >
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/small-desk-setup", title: "Small Desk Setup Ideas", desc: "15 smart ways to build a better small workspace" },
              { href: "/guide/best-desk-mat-for-small-desk", title: "Best Desk Mats for Small Desks", desc: "Top desk mats reviewed and ranked" },
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
