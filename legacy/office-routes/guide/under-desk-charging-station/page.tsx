import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, cableManagementImage,
  products, atAGlanceItems, typesTable, materialsTable, faq,
  type UnderDeskProduct,
} from "@/data/guides/under-desk-charging-station";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/under-desk-charging-station",
  image: fallbackHeroImage, type: "article",
});

function ProductSection({ product }: { product: UnderDeskProduct }) {
  return (
    <section id={product.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">{product.badge}</span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{product.name}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a href={product.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={product.imageUrl} alt={product.name} width={220} height={200} className="object-contain w-full h-full p-3" unoptimized />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-muted text-brand font-bold">{product.mountType}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{product.whyItWins}</p>
            </div>
            {product.bodyParagraphs.map((para, i) => <p key={i} className="text-sm text-ink-secondary leading-relaxed">{para}</p>)}
            <a href={product.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity w-fit mt-auto"
              style={{ background: "#FF9900" }}>
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
              {product.specs.map((spec, i) => (
                <li key={i} className="text-xs text-ink-secondary"><span className="font-semibold text-ink">{spec.label}:</span> {spec.value}</li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>{pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>{con}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border"><span className="font-semibold text-ink">Best for:</span> {product.bestFor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function UnderDeskChargingPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-04", dateModified: "2026-06-04", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/under-desk-charging-station` }, about: [{ "@type": "Thing", name: "Under-Desk Charging Station" }, { "@type": "Thing", name: "Under-Desk Wireless Charger" }, { "@type": "Thing", name: "Desk Cable Management" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Under-Desk Charging Stations", item: `${SITE_URL}/guide/under-desk-charging-station` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Under-Desk Charging Stations 2026", numberOfItems: 5, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/under-desk-charging-station#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Under-Desk Charging Stations</span>
        </nav>

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
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </div>
              <span>Jamie Cole, Lead Product Researcher</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              5 picks -- clamp, wireless, grommet, screw-mount
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best under-desk charging stations and mounts" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10" id="quick-picks">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Mount Type</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Charging</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.mountType}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.charging}</td>
                    <td className="px-4 py-3"><a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>The cleanest possible desk has nothing on it except your monitor, keyboard, and mouse. Everything else -- cables, power bricks, charging stations -- is hidden. Under-desk charging is the category that makes this achievable. Instead of a hub sitting on your desk surface, everything moves underneath.</p>
          <p>This is also the least-covered product category in desk setups. Most reviews focus on what sits on the desk. Almost none explain what goes under it -- which is exactly why buyers searching &quot;charging station under desk&quot; land on generic power strip pages that don&apos;t address their real question.</p>
          <p>This guide covers every under-desk charging format: clamp stations, through-desk wireless chargers, grommet-mounted pads, and screw-mounted strips. Plus: the installation steps nobody else documents, and the materials guide for wireless-through-desk charging.</p>
        </section>

        {/* Types table */}
        <section className="mb-12 scroll-mt-20" id="types">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Types of Under-Desk Charging -- What Exists</h2>
          <p className="text-sm text-ink-secondary mb-5">Before the picks, a quick map of what is available and how each works:</p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Type</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">How it mounts</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">What it does</th>
                <th className="text-left px-4 py-3 font-semibold">Best for</th>
              </tr></thead>
              <tbody>
                {typesTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.type}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.mount}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.does}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10"><h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 5 Picks at a Glance</h2><AtAGlance items={atAGlanceItems} /></section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[{ href: "#types", label: "Types" }, { href: "#best-clamp", label: "Best Clamp" }, { href: "#best-budget-clamp", label: "Budget Clamp" }, { href: "#best-wireless", label: "Through-Desk Wireless" }, { href: "#best-grommet", label: "Grommet Charger" }, { href: "#best-permanent", label: "Screw-Mount" }, { href: "#materials", label: "Materials guide" }, { href: "#installation", label: "Installation" }, { href: "#faq", label: "FAQ" }].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks for Under-Desk Charging</h2>
        {products.map((product) => <ProductSection key={product.id} product={product} />)}

        {/* Materials table */}
        <section id="materials" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Does Your Desk Work with Under-Desk Wireless Charging?</h2>
          <p className="text-sm text-ink-secondary mb-5">This is the most practical question for through-desk wireless charging -- and the one no other guide answers directly.</p>
          <h3 className="text-base font-bold text-ink mb-3">Material Compatibility Table</h3>
          <div className="overflow-x-auto rounded-xl border border-border mb-4">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Desk Material</th>
                <th className="text-left px-4 py-3 font-semibold">Through-Desk Wireless</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Notes</th>
              </tr></thead>
              <tbody>
                {materialsTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-medium text-ink">{row.material}</td>
                    <td className="px-4 py-3 font-bold text-xs" style={{ color: row.works === true ? "#5f7a4a" : row.works === false ? "#dc2626" : "#a8875a" }}>
                      {row.works === true ? "Works fully" : row.works === false ? "Blocked completely" : "Depends on setup"}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">The 30mm rule:</strong> Standard desk tops (IKEA ALEX, most standing desks) are 18--25mm thick. Through-desk wireless charging works reliably for all of these. Thick butcher-block or solid hardwood desks (35mm+) reduce charging speed and may not work at all. <strong className="text-ink">Check your desk:</strong> measure thickness with a ruler at the edge. 25mm or under: any under-desk wireless pad works at full speed.
          </div>
        </section>

        {/* Installation guides */}
        <section id="installation" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">How to Install an Under-Desk Charging Station</h2>
          <div className="space-y-5">
            {[
              {
                label: "Option A -- Clamp (No Tools, 5 Minutes)",
                steps: ["Choose install position -- typically left or right back corner of desk edge", "Open clamp to maximum width, slide over desk edge", "Tighten clamp knob until silicone pads grip firmly (do not over-tighten)", "Route power cord along desk underside to wall outlet", "Use adhesive cable clips to secure cord against underside -- one clip every 30cm"],
                result: "AC + USB accessible from desk edge. Power cord hidden along underside.",
              },
              {
                label: "Option B -- Adhesive Through-Desk Wireless Pad (No Tools, 15 Minutes)",
                steps: ["Measure desk thickness -- confirm it is under 30mm", "Confirm desk material is not metal (use the compatibility table above)", "Clean underside of desk with alcohol wipe -- dust affects adhesion", "Place position marker (included) on desk top surface at desired charging spot", "Peel adhesive backing from wireless pad", "Press pad firmly against underside of desk, centered under position marker", "Hold for 60 seconds -- adhesive cures over 24 hours to full strength", "Route USB-C cable from pad along underside to power source", "To test: place phone on position marker -- charge indicator should appear within 10 seconds"],
                result: null,
              },
              {
                label: "Option C -- Screw Mount (Tools Required, 30 Minutes)",
                steps: ["Plan cable route: where does the power cord exit to the wall?", "Mark drill pilot hole positions (most brackets: 2--3 holes)", "Drill pilot holes -- 3mm bit for wood/MDF", "Screw bracket to underside with included hardware", "Mount power strip into bracket", "Route power cord along underside using cable raceways or clips", "Route peripheral cables up through desk grommet hole or along back edge"],
                result: null,
              },
            ].map((opt, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <h3 className="font-bold text-ink text-base mb-3">{opt.label}</h3>
                <ol className="space-y-2 mb-3">
                  {opt.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-ink-secondary">
                      <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">{j + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                {opt.result && <p className="text-xs text-brand font-semibold bg-brand/5 rounded-lg px-3 py-2"><strong>Result:</strong> {opt.result}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Cable management image + tips */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Under-Desk Charging Setup Tips</h2>
          <div className="rounded-2xl overflow-hidden border border-border mb-6 bg-bg">
            <Image src={cableManagementImage} alt="Under-desk cable management setup" width={900} height={340} className="w-full object-cover max-h-[340px]" unoptimized />
          </div>
          <div className="space-y-4">
            {[
              { num: "1", title: "Plan cable routes before mounting anything", body: "The biggest under-desk mistake: mounting a strip, then realizing the power cord does not reach the wall without crossing the floor. Measure the cord length first, map the path from strip to wall outlet, then mount." },
              { num: "2", title: "Use cable raceways for the floor run", body: "If the power cord must drop from the desk underside to a floor outlet, a cable raceway (J-channel type, ~$8 on Amazon) mounts against the wall and hides the vertical drop. Looks intentional rather than temporary." },
              { num: "3", title: "Match mount position to cable reach of your devices", body: "A wireless through-desk pad does not help if your phone sits 40cm away from the charging zone. Place the pad directly under where your phone naturally rests during work -- not where you think it should go." },
              { num: "4", title: "Test before permanent installation", body: "For clamp options: test for one week before committing to a screw-mount. For wireless pads: tape the pad in position for a day before removing the adhesive backing -- verify the phone location works with your actual workflow." },
            ].map((tip) => (
              <div key={tip.num} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-white">
                <span className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center shrink-0 font-bold text-sm">{tip.num}</span>
                <div><p className="font-bold text-ink text-sm mb-0.5">{tip.title}</p><p className="text-xs text-ink-secondary leading-relaxed">{tip.body}</p></div>
              </div>
            ))}
          </div>
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

        {/* Bottom Line */}
        <section className="mb-14 p-6 rounded-2xl border border-border bg-white">
          <h2 className="text-xl font-bold text-ink mb-5 tracking-tight">Bottom Line</h2>
          <div className="space-y-4">
            {[
              { product: "Anker Nano 10-in-1 Clamp", context: "For most desk setups", verdict: "is the cleanest starting point: no permanent modification, above-deck USB access, below-deck hidden AC outlets, and 70W USB-C charging. Install in five minutes, remove in two.", href: "#best-clamp" },
              { product: "i-VALUX Grommet Wireless Charger", context: "If your desk already has an 80mm grommet hole", verdict: "is the most elegant upgrade -- flush, invisible, and no drilling required.", href: "#best-grommet" },
              { product: "Humanscale NeatCharge", context: "For the ultimate clean setup where no charging hardware is visible from any angle", verdict: "installs under the surface and charges your phone through the desk -- provided the desk is non-metallic and under 30mm thick.", href: "#best-wireless" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary"><strong className="text-ink">{item.context},</strong> the{" "}<a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}</p>
              </div>
            ))}
            <p className="text-sm text-ink-secondary mt-2">Whatever you choose: measure your desk thickness first, plan the cable route before mounting, and use cable clips to keep the underside as clean as the top.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse under-desk charging solutions on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">Clamp, wireless, grommet, and screw-mount options -- all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=under+desk+charging+station&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-charging-stations-for-desk", title: "Best Charging Stations for Desk", desc: "On-desk charging options" },
              { href: "/guide/best-small-desk-charging-stations", title: "Best Small Desk Charging Stations", desc: "When the desk is small but stays on-surface" },
              { href: "/guide/best-charging-station-desk-organizers", title: "Best Charging Station Desk Organizers", desc: "Organizer + charging in one footprint" },
              { href: "/guide/best-docking-stations-for-desk-setup", title: "Best Docking Stations for Desk Setup", desc: "Hide your dock under the desk too" },
            ].map((g) => (
              <Link prefetch={false} key={g.href} href={g.href} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-brand transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <div>
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">{g.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Prices and availability checked at time of writing -- always verify current price on Amazon before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
