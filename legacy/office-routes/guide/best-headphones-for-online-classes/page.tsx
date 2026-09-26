import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AtAGlance } from "@/components/product/AtAGlance";
import {
  guideTitle, guideDescription, metaTitle, metaDescription, lastUpdated, readTime,
  heroImage as fallbackHeroImage, products, atAGlanceItems,
  headphoneVsHeadsetRows, classByTypeRows, faq,
  type ClassHeadphone,
} from "@/data/guides/best-headphones-for-online-classes";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: metaTitle, description: metaDescription,
  path: "/guide/best-headphones-for-online-classes",
  image: fallbackHeroImage, type: "article",
});

function HeadphoneSection({ hp }: { hp: ClassHeadphone }) {
  return (
    <section id={hp.id} className="mb-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-brand shrink-0">{hp.badge}</span>
        <h2 className="text-2xl font-bold text-ink tracking-tight min-w-0 break-words">{hp.name}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card">
        <div className="flex flex-col sm:flex-row gap-5 p-5">
          <a href={hp.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="shrink-0 flex items-center justify-center w-full sm:w-60 h-52 rounded-xl border border-border bg-gray-50 overflow-hidden hover:opacity-90 transition-opacity">
            <Image src={hp.imageUrl} alt={hp.name} width={220} height={200} className="object-contain w-full h-full p-3" unoptimized />
          </a>
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-ink-secondary font-medium">{hp.bestFor}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">Why it wins</p>
              <p className="text-sm text-ink-secondary leading-relaxed">{hp.whyItWins}</p>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{hp.bodyParagraph}</p>
            <a href={hp.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer"
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
              {hp.specs.map((spec, i) => <li key={i} className="text-xs text-ink-secondary"><span className="font-semibold text-ink">{spec.label}:</span> {spec.value}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-3">Pros</p>
            <ul className="space-y-1.5">
              {hp.pros.map((pro, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cta-light text-cta flex items-center justify-center shrink-0 font-bold text-[9px]">+</span>{pro}</li>)}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-dark mb-3">Cons</p>
            <ul className="space-y-1.5">
              {hp.cons.map((con, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-ink"><span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-[9px]">&minus;</span>{con}</li>)}
            </ul>
            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border"><span className="font-semibold text-ink">Best for:</span> {hp.bestForDetail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BestHeadphonesOnlineClassesPage() {
  const heroImg = fallbackHeroImage;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guideTitle, description: metaDescription, datePublished: "2026-06-04", dateModified: "2026-06-04", author: { "@type": "Person", name: "Jamie Cole", url: `${SITE_URL}/author/jamie-cole` }, publisher: { "@type": "Organization", name: "The Office Journal", url: SITE_URL }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/best-headphones-for-online-classes` }, about: [{ "@type": "Thing", name: "Headphones for Online Classes" }, { "@type": "Thing", name: "Student Audio Equipment" }, { "@type": "Thing", name: "Dorm Room Essentials" }] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: "Best Headphones for Online Classes", item: `${SITE_URL}/guide/best-headphones-for-online-classes` }] };
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Headphones for Online Classes 2026", numberOfItems: 6, itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} -- ${p.badge}`, url: `${SITE_URL}/guide/best-headphones-for-online-classes#${p.id}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Container className="py-12 max-w-4xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link prefetch={false} href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
          <Link prefetch={false} href="/guide" className="hover:text-brand transition-colors">Buying Guides</Link><span>/</span>
          <span className="text-ink">Best Headphones for Online Classes</span>
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
              6 picks -- lecture clarity, mic quality, all-day comfort
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 rounded-xl bg-bg border border-border text-xs text-ink-secondary">
          <strong className="text-ink">Quick note:</strong> This page contains affiliate links. If you buy through our links, we may earn a small commission -- at no extra cost to you. As an Amazon Associate, The Office Journal earns from qualifying purchases.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="text-brand hover:underline">Affiliate disclosure</Link>.
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-10 bg-bg">
          <Image src={heroImg} alt="Best headphones for online classes" width={900} height={420} className="w-full h-auto object-contain" priority unoptimized />
        </div>

        {/* Quick Picks */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Quick Picks</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Pick</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Best For</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3"><a href={`#${p.id}`} className="text-xs font-bold text-brand hover:underline">{p.badge}</a></td>
                    <td className="px-4 py-3 font-semibold text-ink text-xs">{p.name}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{p.bestFor}</td>
                    <td className="px-4 py-3"><a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap inline-block" style={{ background: "#FF9900" }}>Check price</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10 space-y-4 text-base text-ink-secondary leading-relaxed">
          <p>Online classes have specific audio needs that general headphone reviews consistently miss. You need to hear your professor clearly -- which means good speaker quality and sound isolation. You need a mic that does not make you sound like you are calling from a bathroom -- which means understanding which mic types actually work on Zoom. And you need something that does not hurt after two hours of lectures.</p>
          <p>This guide is written specifically for online class use. Every pick is evaluated on three criteria: <strong className="text-ink">lecture clarity, mic quality for participation, and comfort for multi-hour sessions</strong> -- the three things that matter most.</p>
        </section>

        {/* Headphones vs Headset */}
        <section className="mb-12 scroll-mt-20" id="headphone-vs-headset">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Headphones vs Headset for Online Classes -- Which Do You Need?</h2>
          <p className="text-sm text-ink-secondary mb-5">This is the first question most guides skip. <strong className="text-ink">Headphones</strong> have built-in microphones (usually on the cable or earcup) -- better sound, often wireless, better for listening to lectures. <strong className="text-ink">Headsets</strong> (like the Logitech H390) have a dedicated boom microphone -- meaningfully better for calls because proximity matters.</p>
          <div className="overflow-x-auto rounded-xl border border-border mb-4">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold"></th>
                <th className="text-left px-4 py-3 font-semibold">Headphones (built-in mic)</th>
                <th className="text-left px-4 py-3 font-semibold">Headset (boom mic)</th>
              </tr></thead>
              <tbody>
                {headphoneVsHeadsetRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.feature}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.headphone}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs font-medium">{row.headset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-bg border border-brand/20 text-sm text-ink-secondary">
            <strong className="text-ink">The honest rule:</strong> If you mostly listen in class with occasional mic use -- headphones. If you are in small seminars, group discussions, or frequent call participation -- headset.
          </div>
        </section>

        {/* Wired vs Wireless */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Wired vs Wireless for Online Classes</h2>
          <p className="text-sm text-ink-secondary mb-4">Every competitor article covers wired vs wireless for music use. None of them address the class-specific tradeoffs.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {[
              { label: "Wired headphones for class", items: ["Never die mid-lecture", "Zero connection delay (no audio lag on Zoom)", "Plug in and use immediately -- no pairing", "Cheaper at same quality level", "Cable can tangle, restrict movement"] },
              { label: "Wireless headphones for class", items: ["Freedom from desk during breaks", "Can step away briefly without unplugging", "Works with any device, no dongle needed", "Battery must be charged before long sessions", "Rare but real: Bluetooth dropout during a call is embarrassing"] },
            ].map((col, i) => (
              <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "border-cta/30 bg-cta-light/20" : "border-amber-200 bg-amber-50"}`}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: i === 0 ? "#5f7a4a" : "#a8875a" }}>{col.label}</p>
                <ul className="space-y-1.5">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: j < 4 && i === 0 ? "#5f7a4a" : j >= 4 && i === 0 ? "#dc2626" : j < 3 ? "#a8875a" : "#dc2626" }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-bg border border-border text-sm text-ink-secondary">
            <strong className="text-ink">For online classes specifically:</strong> The battery risk is real. A wireless headphone dying 90 minutes into a 3-hour lecture is a worse outcome than dealing with a cable. If you go wireless, charge every night as a rule. The Sony WH-CH520&apos;s 50-hour battery makes this concern nearly irrelevant in practice.
          </div>
        </section>

        {/* AtAGlance */}
        <section className="mb-10"><h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">All 6 Picks at a Glance</h2><AtAGlance items={atAGlanceItems} /></section>

        {/* Jump nav */}
        <nav className="mb-12 p-4 rounded-xl bg-bg border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {[{ href: "#headphone-vs-headset", label: "Headphone vs Headset" }, { href: "#best-overall", label: "Best Overall" }, { href: "#best-wired-mic", label: "Best Mic" }, { href: "#best-anc", label: "Best ANC" }, { href: "#best-budget", label: "Best Budget" }, { href: "#best-long-classes", label: "Long Classes" }, { href: "#best-wired-audio", label: "Best Audio" }, { href: "#tips", label: "Tips" }, { href: "#faq", label: "FAQ" }].map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-border text-ink-secondary hover:text-brand hover:border-brand transition-colors">{item.label}</a>
            ))}
          </div>
        </nav>

        <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Our Top Picks</h2>
        {products.map((hp) => <HeadphoneSection key={hp.id} hp={hp} />)}

        {/* What Competitors Don't Tell You */}
        <section id="tips" className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-ink mb-6 tracking-tight">What Competitors Don&apos;t Tell You About Class Headphones</h2>
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-border bg-white">
              <h3 className="font-bold text-ink text-base mb-3">Mic Quality: Why &quot;Built-in Mic&quot; Varies So Much</h3>
              <p className="text-sm text-ink-secondary mb-3">The factor nobody explains: <strong className="text-ink">mic-to-mouth distance.</strong> A mic on the earcup is 20--30cm from your mouth. A boom mic (H390) is 5--7cm. Sound drops off with distance -- a closer mic captures your voice before room noise overwhelms it. This is why the H390 boom mic sounds cleaner than built-in mics costing $200+ more.</p>
              <div className="p-3 rounded-lg bg-bg border border-border text-xs text-ink-secondary">
                <strong className="text-ink">If you use wireless headphones with a built-in mic:</strong> Sit in a quiet room, lower ambient sounds before joining, and use &quot;background noise suppression&quot; in Zoom settings (Settings → Audio → &quot;Suppress background noise&quot;).
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-white">
              <h3 className="font-bold text-ink text-base mb-3">ANC for Classes: What It Does and Doesn&apos;t Block</h3>
              <p className="text-sm text-ink-secondary mb-3">ANC is marketed as blocking &quot;all background noise.&quot; The reality:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "ANC blocks well", items: ["Constant low-frequency noise (HVAC, fan, traffic hum)", "Steady mid-frequency noise (crowd murmur, office background)"] },
                  { label: "ANC does not block", items: ["Intermittent noise (someone talking nearby)", "Sudden loud noise (door slam, alarm)", "Roommate at normal volume at close range"] },
                ].map((col, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${i === 0 ? "border-cta/30 bg-cta-light/20" : "border-red-200 bg-red-50"}`}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: i === 0 ? "#5f7a4a" : "#dc2626" }}>{col.label}</p>
                    <ul className="space-y-1.5">
                      {col.items.map((item, j) => <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: i === 0 ? "#5f7a4a" : "#dc2626" }} />{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-white">
              <h3 className="font-bold text-ink text-base mb-3">On-Ear vs Over-Ear for Long Classes</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "On-ear (Sony CH520, JLab Studio)", items: ["Lighter weight, more portable", "Less heat buildup", "Some users find them uncomfortable after 2+ hours (pressure on ear cartilage)"] },
                  { label: "Over-ear (Q20i, JLab Studio Pro, ATH-M20x)", items: ["More comfortable for long sessions (no pressure on ear)", "Better passive noise isolation", "Heavier, bulkier"] },
                ].map((col, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border bg-bg">
                    <p className="font-bold text-ink text-xs mb-2">{col.label}</p>
                    <ul className="space-y-1.5">
                      {col.items.map((item, j) => <li key={j} className="flex items-start gap-1.5 text-xs text-ink-secondary"><span className="w-1 h-1 rounded-full bg-brand mt-1.5 shrink-0" />{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-muted mt-3">For classes over 2 hours: the JLab Studio Pro or Anker Q20i over-ear designs are worth the extra weight.</p>
            </div>
          </div>
        </section>

        {/* By class type */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-4 tracking-tight">Choosing by Class Type</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-brand text-white">
                <th className="text-left px-4 py-3 font-semibold">Class type</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">What you need</th>
                <th className="text-left px-4 py-3 font-semibold">Best pick</th>
              </tr></thead>
              <tbody>
                {classByTypeRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.classType}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs hidden sm:table-cell">{row.need}</td>
                    <td className="px-4 py-3"><a href={`#${row.id}`} className="text-xs font-bold text-brand hover:underline">{row.pick}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              { product: "Sony WH-CH520", context: "For most students", verdict: "-- wireless, 50-hour battery, lightweight, fits in a bag, adequate for lectures and occasional participation.", href: "#best-overall" },
              { product: "Logitech H390", context: "For participation-heavy classes", verdict: "-- the boom mic makes a real, audible difference on calls. Under $35, wired, no charging.", href: "#best-wired-mic" },
              { product: "Soundcore Q20i", context: "For noisy dorms", verdict: "-- ANC actually blocks dorm background noise that passive isolation cannot handle.", href: "#best-anc" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                <p className="text-sm text-ink-secondary"><strong className="text-ink">{item.context}:</strong> the{" "}<a href={item.href} className="font-bold text-ink hover:text-brand transition-colors">{item.product}</a>{" "}{item.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14 p-6 rounded-2xl flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #FF9900 0%, #e68900 100%)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Browse student headphones on Amazon</h2>
          <p className="text-white/90 text-sm mb-5">Wireless, wired, and ANC options -- all Prime-eligible.</p>
          <a href="https://www.amazon.com/s?k=headphones+for+online+classes+students&tag=theofficejournal-20" target="_blank" rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:bg-gray-50 transition-colors" style={{ color: "#FF9900" }}>
            Shop on Amazon &rarr;
          </a>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4 tracking-tight">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/best-dorm-items-under-25", title: "Best Dorm Items Under $25", desc: "25 high-impact dorm essentials on a student budget" },
              { href: "/guide/best-desk-lamp-under-30", title: "Best Desk Lamp Under $30", desc: "Dorm-friendly desk lamps for studying" },
              { href: "/guide/desk-setup-essentials", title: "Desk Setup Essentials", desc: "15 must-have items for any desk setup" },
              { href: "/guide/ergonomic-desk-setup", title: "Ergonomic Desk Setup", desc: "The correct way to position everything at your desk" },
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
          <p className="text-xs text-ink-muted mt-4 text-center">Last updated: June 2026. Prices checked at time of writing -- verify current Amazon price before purchasing.</p>
        </section>
      </Container>
    </>
  );
}
