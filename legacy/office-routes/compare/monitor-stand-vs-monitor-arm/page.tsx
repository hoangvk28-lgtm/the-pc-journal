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
  heroImageA,
  heroImageB,
  picks,
  dualArmPick,
  headToHead,
  flowSteps,
  scenarios,
  mistakes,
  faq,
  summaryTable,
  type ComparePick,
} from "@/data/guides/monitor-stand-vs-monitor-arm";

export const revalidate = false;

export const metadata: Metadata = buildMetadata({
  title: compareTitle,
  description: compareDescription,
  path: "/compare/monitor-stand-vs-monitor-arm",
  image: heroImageA,
  type: "article",
});

// ─── Color tokens ─────────────────────────────────────────────────────────────
// "stand" = slate/indigo  |  "arm" = amber/orange
const STAND_BG = "#eef2ff";
const STAND_TEXT = "#3730a3";
const STAND_BORDER = "#c7d2fe";
const ARM_BG = "#fff7ed";
const ARM_TEXT = "#c2410c";
const ARM_BORDER = "#fed7aa";

function categoryStyle(cat: "stand" | "arm" | "tie") {
  if (cat === "stand") return { bg: STAND_BG, text: STAND_TEXT, border: STAND_BORDER, label: "Monitor Stand" };
  if (cat === "arm") return { bg: ARM_BG, text: ARM_TEXT, border: ARM_BORDER, label: "Monitor Arm" };
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
      {/* Category banner */}
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: style.bg }}>
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: style.text }}>
          {pick.category === "stand" ? "Monitor Stand" : "Monitor Arm"}
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
            Limit: {pick.weightLimit} &middot; {pick.adjustability}
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

export default function MonitorStandVsArmPage() {
  const standPicks = picks.filter((p) => p.category === "stand");
  const armPicks = picks.filter((p) => p.category === "arm");
  const standWins = headToHead.filter((h) => h.winner === "stand").length;
  const armWins = headToHead.filter((h) => h.winner === "arm").length;

  return (
    <main>
      {/* ── Hero: VS banner ───────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <Container className="py-10 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-6">
            <Link prefetch={false} href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <span>/</span>
            <span className="text-white/80">Monitor Stand vs Monitor Arm</span>
          </div>

          {/* VS layout */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            {/* Side A — Stand */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-white/10 mb-3">
                <Image src={heroImageA} alt="Monitor Stand" width={112} height={112} className="w-full h-full object-contain p-2" unoptimized />
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: STAND_BG, color: STAND_TEXT }}>
                Monitor Stand
              </div>
              <p className="text-2xl font-black">{standWins}<span className="text-base font-normal text-white/60"> wins</span></p>
            </div>

            {/* VS badge */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                <span className="text-xl font-black text-white">VS</span>
              </div>
              <div className="text-xs text-white/50 text-center">6 criteria</div>
            </div>

            {/* Side B — Arm */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-white/10 mb-3">
                <Image src={heroImageB} alt="Monitor Arm" width={112} height={112} className="w-full h-full object-contain p-2" unoptimized />
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: ARM_BG, color: ARM_TEXT }}>
                Monitor Arm
              </div>
              <p className="text-2xl font-black">{armWins}<span className="text-base font-normal text-white/60"> wins</span></p>
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
            <span>By Jamie Cole</span>
          </div>
        </Container>
      </div>

      <Container className="py-10 max-w-3xl">

        {/* ── 30-second summary table ─────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">The 30-Second Answer</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-3 font-bold text-ink bg-gray-50 border-b border-border">Factor</th>
                  <th className="text-left p-3 font-bold border-b border-border" style={{ background: STAND_BG, color: STAND_TEXT }}>Monitor Stand</th>
                  <th className="text-left p-3 font-bold border-b border-border" style={{ background: ARM_BG, color: ARM_TEXT }}>Monitor Arm</th>
                </tr>
              </thead>
              <tbody>
                {summaryTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-3 font-semibold text-ink border-b border-border text-xs">{row.factor}</td>
                    <td className="p-3 text-ink-secondary border-b border-border text-xs">{row.stand}</td>
                    <td className="p-3 text-ink-secondary border-b border-border text-xs">{row.arm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-ink-secondary">
            <span className="font-bold text-ink">Quick verdict: </span>
            If your main problem is <strong>monitor height + storage</strong> → get a stand. If your main problem is <strong>desk space or ergonomic positioning</strong> → get an arm. Both are available under $50.
          </div>
        </section>

        {/* ── Head-to-head ─────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-6">Head-to-Head: 6 Criteria</h2>
          <div className="space-y-4">
            {headToHead.map((h, i) => {
              const winStyle = categoryStyle(h.winner);
              return (
                <div key={i} className="rounded-2xl border border-border bg-white overflow-hidden">
                  {/* Criterion header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-border">
                    <p className="font-bold text-ink">{i + 1}. {h.criterion}</p>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: winStyle.bg, color: winStyle.text, border: `1px solid ${winStyle.border}` }}>
                      {h.winnerLabel}
                    </span>
                  </div>
                  {/* Summary */}
                  <div className="px-5 py-3">
                    <p className="text-sm text-ink-secondary mb-3">{h.summary}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl text-xs" style={{ background: STAND_BG, border: `1px solid ${STAND_BORDER}` }}>
                        <p className="font-bold mb-1" style={{ color: STAND_TEXT }}>Monitor Stand</p>
                        <p className="text-ink-secondary">{h.standSummary}</p>
                      </div>
                      <div className="p-3 rounded-xl text-xs" style={{ background: ARM_BG, border: `1px solid ${ARM_BORDER}` }}>
                        <p className="font-bold mb-1" style={{ color: ARM_TEXT }}>Monitor Arm</p>
                        <p className="text-ink-secondary">{h.armSummary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Best Picks: Stands ───────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-8 rounded-full" style={{ background: STAND_TEXT }} />
            <h2 className="text-xl font-bold text-ink">Best Monitor Stands Under $50</h2>
          </div>
          <div className="space-y-4">
            {standPicks.map((p) => <PickCard key={p.id} pick={p} />)}
          </div>
        </section>

        {/* ── Best Picks: Arms ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-8 rounded-full" style={{ background: ARM_TEXT }} />
            <h2 className="text-xl font-bold text-ink">Best Monitor Arms Under $50</h2>
          </div>
          <div className="space-y-4">
            {armPicks.map((p) => <PickCard key={p.id} pick={p} />)}
          </div>
        </section>

        {/* ── Full comparison table ────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">All 6 Products Compared</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Product</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Score</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Weight</th>
                  <th className="text-left p-3 font-bold text-ink border-b border-border">Adjust</th>
                </tr>
              </thead>
              <tbody>
                {picks.map((p, i) => {
                  const s = categoryStyle(p.category);
                  return (
                    <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="p-3 border-b border-border">
                        <a href={`#${p.id}`} className="font-semibold text-ink hover:text-amber-600 transition-colors text-xs">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5" style={{ background: s.bg, color: s.text }}>{p.category === "stand" ? "Stand" : "Arm"}</span>
                          {p.name}
                        </a>
                      </td>
                      <td className="p-3 border-b border-border"><ScoreChip score={p.score} /></td>
                      <td className="p-3 text-xs text-ink-secondary border-b border-border">{p.weightLimit}</td>
                      <td className="p-3 text-xs text-ink-secondary border-b border-border">{p.adjustability}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Decision Flowchart ───────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-6">Decision Flowchart: Stand or Arm?</h2>
          <div className="rounded-2xl border border-border bg-gray-50 p-6">
            <div className="space-y-3">
              {flowSteps.map((step, i) => {
                const isLast = i === flowSteps.length - 1;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    {/* Question node */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-white rounded-xl border border-border p-3">
                        <p className="font-semibold text-ink text-sm">{step.question}</p>
                      </div>
                    </div>
                    {/* Answer branches */}
                    <div className="ml-10 grid grid-cols-2 gap-2">
                      {/* Yes branch */}
                      <div className="flex items-center gap-2">
                        <div className="w-px h-6 bg-border ml-3 shrink-0" />
                        <div className="flex-1">
                          {step.yesAnswer ? (
                            <div className="flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold" style={step.yesAnswer === "stand" ? { background: STAND_BG, color: STAND_TEXT } : { background: ARM_BG, color: ARM_TEXT }}>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {step.yesLabel} → {step.yesAnswer === "stand" ? "Get a Stand" : "Get an Arm"}
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                              {step.yesLabel} → Continue
                            </div>
                          )}
                        </div>
                      </div>
                      {/* No branch */}
                      <div className="flex items-center gap-2">
                        <div className="w-px h-6 bg-border ml-3 shrink-0" />
                        <div className="flex-1">
                          {isLast ? (
                            <div className="p-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
                              {step.noLabel}
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-gray-100 text-gray-500 text-xs">
                              {step.noLabel} → Next question
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Connector */}
                    {!isLast && (
                      <div className="ml-3.5 w-px h-3 bg-border" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Specific Scenarios ───────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-5">Best Choice by Scenario</h2>
          <div className="space-y-3">
            {scenarios.map((s, i) => {
              const style = categoryStyle(s.pick);
              return (
                <div key={i} className="rounded-xl border bg-white overflow-hidden" style={{ borderColor: style.border }}>
                  <div className="flex items-center justify-between px-4 py-2.5" style={{ background: style.bg }}>
                    <p className="font-bold text-ink text-sm">{s.title}</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: style.text }}>
                      {s.pickLabel} wins
                    </span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm text-ink-secondary mb-2">{s.detail}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-ink">Pick:</span>
                      <a href={`#${s.productId}`} className="text-xs font-bold hover:underline" style={{ color: style.text }}>{s.productName}</a>
                    </div>
                    {s.exception && (
                      <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                        <span className="font-semibold">Exception:</span> {s.exception}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Dual monitor scenario */}
            <div className="rounded-xl border bg-white overflow-hidden" style={{ borderColor: ARM_BORDER }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: ARM_BG }}>
                <p className="font-bold text-ink text-sm">Dual Monitor Setup</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: ARM_TEXT }}>Monitor Arm wins</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm text-ink-secondary mb-2">
                    Two separate stands consume roughly 400 square inches of desk space. A dual arm holds both monitors from a single clamp. Budget dual arms start at $35–$45.
                  </p>
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                    <span className="font-semibold">Note:</span> Dual arms at this price point have more wobble than single arms. Tighten tension bolts carefully during setup.
                  </p>
                </div>
                <div className="sm:w-28 sm:shrink-0 flex flex-col items-center gap-2">
                  <Image src={dualArmPick.imageUrl} alt={dualArmPick.name} width={112} height={80} className="w-full h-20 object-contain rounded-lg bg-gray-50" unoptimized />
                  <a href={dualArmPick.amazonUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white w-full text-center" style={{ background: "#FF9900" }}>
                    View Dual Arm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Common Mistakes ──────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">5 Mistakes to Avoid</h2>
          <div className="space-y-3">
            {mistakes.map((m, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <p className="font-bold text-ink text-sm mb-1">{m.title}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-white">
                <p className="font-bold text-ink mb-2">{item.q}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final Verdict ────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-ink mb-4">Final Verdict</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stand verdict */}
            <div className="rounded-2xl p-5 border" style={{ background: STAND_BG, borderColor: STAND_BORDER }}>
              <p className="font-bold mb-2" style={{ color: STAND_TEXT }}>Get a Monitor Stand if:</p>
              <ul className="space-y-1.5 mb-4">
                {[
                  "Monitor isn't VESA compatible",
                  "Desk is glass, fragile, or beveled",
                  "Just need the monitor 4–6 in higher",
                  "Want 2-minute setup, no tools",
                  "Want storage underneath",
                  "Budget is under $25",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5" style={{ color: STAND_TEXT }}>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#bamboo-riser-drawer" className="block text-center text-xs font-bold px-3 py-2 rounded-xl" style={{ background: STAND_TEXT, color: "white" }}>
                Best Stand: Bamboo Riser
              </a>
            </div>

            {/* Arm verdict */}
            <div className="rounded-2xl p-5 border" style={{ background: ARM_BG, borderColor: ARM_BORDER }}>
              <p className="font-bold mb-2" style={{ color: ARM_TEXT }}>Get a Monitor Arm if:</p>
              <ul className="space-y-1.5 mb-4">
                {[
                  "You use a standing desk",
                  "Desk is under 48 inches wide",
                  "Neck, shoulder, or eye strain",
                  "Want portrait mode (rotation)",
                  "Need to pull closer or push back",
                  "Want maximum desk surface",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5" style={{ color: ARM_TEXT }}>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#vivo-v001-arm" className="block text-center text-xs font-bold px-3 py-2 rounded-xl" style={{ background: ARM_TEXT, color: "white" }}>
                Best Arm: VIVO V001
              </a>
            </div>
          </div>

          {/* Honest truth box */}
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-ink text-sm mb-2">The honest truth</p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              At the under-$50 price point, both options are solid. A $35 arm gives you dramatically more adjustability than a $35 stand &mdash; but it also takes 15 minutes to install and requires a compatible monitor and desk. A $25 stand gives you 80% of what most people need (height elevation + storage) with zero hassle. The right choice isn&apos;t about which is &quot;better&quot; &mdash; it&apos;s about which problem you&apos;re actually solving.
            </p>
          </div>
        </section>

        {/* ── Related guides ───────────────────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-3">Related Guides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Best Monitor Stands for Small Desks", href: "/guide/monitor-stands-small-desks" },
              { label: "12 Best Small Desk Accessories", href: "/guide/best-small-desk-accessories" },
              { label: "Best Under Desk Cable Trays", href: "/guide/best-under-desk-cable-trays" },
              { label: "Small Desk Organization Ideas", href: "/guide/small-desk-organization-ideas" },
            ].map((link) => (
              <Link prefetch={false} key={link.href} href={link.href} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-white text-ink-secondary hover:border-amber-400 hover:text-ink transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

      </Container>
    </main>
  );
}
