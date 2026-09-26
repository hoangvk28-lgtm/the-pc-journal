import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata } from "@/lib/seo";
import {
  compareTitle,
  compareDescription,
  lastUpdated,
  readTime,
  heroImage,
  sapo,
  picks,
  headToHead,
  flowSteps,
  scenarios,
  mistakes,
  faq,
  summaryTable,
  type ComparePick,
} from "@/data/guides/usb-c-hub-vs-docking-station";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: compareTitle,
  description: compareDescription,
  path: "/compare/usb-c-hub-vs-docking-station",
  image: heroImage,
  type: "article",
});

// ─── Color tokens ─────────────────────────────────────────────────────────────
// "hub" = blue/indigo  |  "dock" = emerald/green
const HUB_BG = "#eef2e8";
const HUB_TEXT = "#5c6f4b";
const HUB_BORDER = "#bfdbfe";
const DOCK_BG = "#ecfdf5";
const DOCK_TEXT = "#047857";
const DOCK_BORDER = "#a7f3d0";

function categoryStyle(cat: "hub" | "dock" | "tie") {
  if (cat === "hub") return { bg: HUB_BG, text: HUB_TEXT, border: HUB_BORDER, label: "USB-C Hub" };
  if (cat === "dock") return { bg: DOCK_BG, text: DOCK_TEXT, border: DOCK_BORDER, label: "Docking Station" };
  return { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb", label: "Tie" };
}

function ScoreChip({ score }: { score: number }) {
  const bg = score >= 9.0 ? "#dcfce7" : score >= 8.5 ? "#fef9c3" : "#f3f4f6";
  const color = score >= 9.0 ? "#5f7a4a" : score >= 8.5 ? "#a8875a" : "#374151";
  return (
    <span className="text-sm font-bold px-2 py-0.5 rounded-lg tabular-nums" style={{ background: bg, color }}>
      {score.toFixed(1)}
    </span>
  );
}

function PickCard({ pick }: { pick: ComparePick }) {
  const style = categoryStyle(pick.category);
  return (
    <div id={pick.id} className="rounded-2xl border bg-white overflow-hidden scroll-mt-24" style={{ borderColor: style.border }}>
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: style.bg }}>
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: style.text }}>
          {style.label}
        </span>
        {pick.badge && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: style.text }}>
            {pick.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className="sm:w-36 sm:shrink-0">
          <Image
            src={pick.imageUrl}
            alt={pick.name}
            width={144}
            height={144}
            className="w-full sm:w-36 h-36 object-contain rounded-xl bg-gray-50"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <p className="font-bold text-ink text-base leading-snug">{pick.name}</p>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <ScoreChip score={pick.score} />
              <a
                href={pick.amazonUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
                style={{ background: "#FF9900" }}
              >
                View on Amazon
              </a>
            </div>
          </div>
          <p className="text-xs text-ink-muted mb-3">
            {pick.ports} &middot; PD: {pick.powerDelivery}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Why it works</p>
              <ul className="space-y-1">
                {pick.whyItWorks.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500 shrink-0 mt-0.5">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold text-ink uppercase tracking-wide mb-1.5">Tradeoffs</p>
              <ul className="space-y-1">
                {pick.tradeoffs.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-amber-400 shrink-0 mt-0.5">
                      <path d="M6 2v5M6 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {pick.redditNote && (
            <p className="mt-3 text-xs text-ink-muted italic bg-gray-50 rounded-lg px-3 py-2">
              <span className="font-semibold not-italic">Reddit:</span> {pick.redditNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UsbCHubVsDockingStationPage() {
  const hubPicks = picks.filter((p) => p.category === "hub");
  const dockPicks = picks.filter((p) => p.category === "dock");
  const hubWins = headToHead.filter((h) => h.winner === "hub").length;
  const dockWins = headToHead.filter((h) => h.winner === "dock").length;

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <Container className="py-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-white/60 mb-6">
            <Link prefetch={false} href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <span>/</span>
            <span className="text-white/80">USB-C Hub vs Docking Station</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-white/10 mb-3">
                <Image src={heroImage} alt="USB-C Hub" width={112} height={112} className="w-full h-full object-contain p-2" unoptimized priority />
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: HUB_BG, color: HUB_TEXT }}>
                USB-C Hub
              </div>
              <p className="text-2xl font-black">{hubWins}<span className="text-base font-normal text-white/60"> wins</span></p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                <span className="text-xl font-black text-white">VS</span>
              </div>
              <div className="text-xs text-white/50 text-center">{headToHead.length} criteria</div>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-white/10 mb-3">
                <Image src={heroImage} alt="Docking Station" width={112} height={112} className="w-full h-full object-contain p-2" unoptimized />
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: DOCK_BG, color: DOCK_TEXT }}>
                Docking Station
              </div>
              <p className="text-2xl font-black">{dockWins}<span className="text-base font-normal text-white/60"> wins</span></p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center leading-tight mb-3">
            {compareTitle}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
            <span>Updated {lastUpdated}</span>
            <span>&middot;</span>
            <span>{readTime} read</span>
            <span>&middot;</span>
            <span>{picks.length} products compared</span>
          </div>
        </Container>
      </div>

      <Container className="py-10 max-w-4xl space-y-14">
        {/* ── Hero image ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <Image
            src={heroImage}
            alt={compareTitle}
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* ── Sapo ────────────────────────────────────────────────────────── */}
        <p className="text-base text-ink-secondary leading-relaxed border-l-4 border-brand pl-4 py-1">
          {sapo}
        </p>

        {/* ── Affiliate Disclosure ────────────────────────────────────────── */}
        <p className="text-xs text-ink-muted bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          We may earn a commission when you buy through Amazon links. This guide is based on product specs, buyer feedback, use cases, and comparison criteria — not paid placement.{" "}
          <Link prefetch={false} href="/affiliate-disclosure" className="underline hover:text-ink">Learn more</Link>.
        </p>

        {/* ── Quick answer ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4">Quick Answer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border p-5" style={{ borderColor: HUB_BORDER, background: HUB_BG }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: HUB_TEXT }}>Get a USB-C Hub if...</p>
              <ul className="space-y-1.5 text-sm text-ink-secondary">
                <li>✓ You commute or work from multiple locations</li>
                <li>✓ You only need one external monitor</li>
                <li>✓ Your budget is under $60</li>
                <li>✓ You want minimal desk clutter</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-5" style={{ borderColor: DOCK_BORDER, background: DOCK_BG }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: DOCK_TEXT }}>Get a Docking Station if...</p>
              <ul className="space-y-1.5 text-sm text-ink-secondary">
                <li>✓ You use two or more external monitors</li>
                <li>✓ You connect 6+ peripherals daily</li>
                <li>✓ You want a one-cable desk setup</li>
                <li>✓ You have a permanent desk setup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Head-to-head ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-6">Head-to-Head: {headToHead.length} Criteria</h2>
          <div className="space-y-4">
            {headToHead.map((h, i) => {
              const style = categoryStyle(h.winner);
              return (
                <div key={i} className="rounded-2xl border bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <p className="font-bold text-ink text-sm">{h.criterion}</p>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: style.bg, color: style.text }}>
                      {h.winnerLabel}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-ink-secondary mb-4">{h.summary}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl p-3" style={{ background: HUB_BG }}>
                        <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: HUB_TEXT }}>Hub</p>
                        <p className="text-xs text-ink-secondary">{h.hubSummary}</p>
                      </div>
                      <div className="rounded-xl p-3" style={{ background: DOCK_BG }}>
                        <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: DOCK_TEXT }}>Dock</p>
                        <p className="text-xs text-ink-secondary">{h.dockSummary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Decision flowchart ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Which One Should You Get?</h2>
          <p className="text-sm text-ink-muted mb-6">Answer these questions in order to find your match.</p>
          <div className="space-y-3">
            {flowSteps.map((step, i) => {
              const yesStyle = step.yesAnswer ? categoryStyle(step.yesAnswer) : null;
              return (
                <div key={i} className="rounded-2xl border bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-ink-muted flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-ink text-sm mb-3">{step.question}</p>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="text-xs font-bold px-3 py-1.5 rounded-full border"
                          style={yesStyle ? { background: yesStyle.bg, color: yesStyle.text, borderColor: yesStyle.border } : { background: "#f3f4f6", color: "#374151", borderColor: "#e5e7eb" }}
                        >
                          {step.yesLabel} {yesStyle ? `→ ${yesStyle.label}` : "→ next"}
                        </span>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full border bg-gray-50 text-ink-muted border-gray-200">
                          {step.noLabel} {step.terminal ? "" : "→ next"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Hub picks ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Best USB-C Hubs</h2>
          <p className="text-sm text-ink-muted mb-6">Portable, bus-powered, and ideal for one-monitor setups.</p>
          <div className="space-y-4">
            {hubPicks.map((p) => <PickCard key={p.id} pick={p} />)}
          </div>
        </section>

        {/* ── Dock picks ──────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Best Docking Stations</h2>
          <p className="text-sm text-ink-muted mb-6">Permanent desk setups, dual monitors, and full port coverage.</p>
          <div className="space-y-4">
            {dockPicks.map((p) => <PickCard key={p.id} pick={p} />)}
          </div>
        </section>

        {/* ── Scenarios ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-6">Recommendations by Use Case</h2>
          <div className="space-y-4">
            {scenarios.map((s, i) => {
              const style = categoryStyle(s.pick);
              const product = picks.find((p) => p.id === s.productId);
              return (
                <div key={i} className="rounded-2xl border bg-white overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100" style={{ background: style.bg }}>
                    <p className="font-bold text-ink text-sm">{s.title}</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: style.text, color: "#fff" }}>
                      {style.label}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col sm:flex-row gap-4">
                    {product && (
                      <div className="sm:w-24 sm:shrink-0">
                        <Image src={product.imageUrl} alt={product.name} width={96} height={96} className="w-24 h-24 object-contain rounded-xl bg-gray-50" unoptimized />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="font-bold text-ink text-sm">{s.productName}</p>
                      </div>
                      <p className="text-sm text-ink-secondary mb-3">{s.detail}</p>
                      {s.exception && (
                        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                          <span className="font-semibold">Note:</span> {s.exception}
                        </p>
                      )}
                      {product && (
                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="inline-block mt-3 text-xs font-bold px-4 py-2 rounded-lg text-white"
                          style={{ background: "#FF9900" }}
                        >
                          View on Amazon
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Summary table ───────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4">Summary: Hub vs Dock</h2>
          <div className="rounded-2xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "#f6f1e9" }}>
                  <th className="text-left px-4 py-3 font-bold text-ink text-xs uppercase tracking-wide">Factor</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide" style={{ color: HUB_TEXT }}>USB-C Hub</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide" style={{ color: DOCK_TEXT }}>Docking Station</th>
                </tr>
              </thead>
              <tbody>
                {summaryTable.map((row, i) => (
                  <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="px-4 py-3 font-medium text-ink text-xs">{row.factor}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.hub}</td>
                    <td className="px-4 py-3 text-ink-secondary text-xs">{row.dock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Mistakes ────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4">Common Mistakes to Avoid</h2>
          <div className="space-y-3">
            {mistakes.map((m, i) => (
              <div key={i} className="rounded-2xl border bg-white p-5">
                <p className="font-bold text-ink text-sm mb-1.5">{m.title}</p>
                <p className="text-sm text-ink-secondary">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="rounded-2xl border bg-white p-5">
                <p className="font-bold text-ink text-sm mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related guides ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/compare/monitor-stand-vs-monitor-arm", label: "Monitor Stand vs Monitor Arm" },
              { href: "/guide/best-webcam-under-50", label: "Best Webcams Under $50" },
              { href: "/compare/desk-mat-vs-mouse-pad", label: "Desk Mat vs Mouse Pad" },
            ].map((link) => (
              <Link prefetch={false}
                key={link.href}
                href={link.href}
                className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 hover:border-gray-400 transition-colors text-ink-secondary hover:text-ink"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
