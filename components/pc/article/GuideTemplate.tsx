import Link from "next/link";
import type { GuideModule, InformationalGuide } from "@/lib/pc-content";
import { ArticleShell, RelatedArticles, SourcesList, headingId, type TocEntry } from "./ArticleShell";
import { EvidenceList } from "./EvidenceList";

const defaultHeadings: Partial<Record<GuideModule["kind"], string>> = {
  "key-takeaway": "The short answer",
  "check-your-pc": "What to check in your PC",
  compatibility: "Compatibility notes",
  mistakes: "Common mistakes",
  "next-steps": "Next steps",
};

function moduleHeading(m: GuideModule): string | undefined {
  return ("heading" in m && m.heading) || defaultHeadings[m.kind];
}

/** One TOC entry per module; headless step lists contribute one entry per step. */
function buildToc(modules: GuideModule[], hasSources: boolean): TocEntry[] {
  const entries = modules.flatMap((m): TocEntry[] => {
    if (m.kind === "key-takeaway") return [];
    if (m.kind === "steps" && !m.heading) return m.steps.map((s) => ({ id: headingId(s.title), label: s.title }));
    const h = moduleHeading(m);
    return h ? [{ id: headingId(h), label: h }] : [];
  });
  return hasSources ? [...entries, { id: "sources", label: "Sources" }] : entries;
}

const h2 = "scroll-mt-28 text-[1.625rem] leading-tight sm:text-[1.875rem]";
const tableWrap = "relative overflow-x-auto border border-border bg-surface";

function Module({ m, article }: { m: GuideModule; article: InformationalGuide }) {
  const heading = moduleHeading(m);
  const H = heading ? <h2 id={headingId(heading)} className={h2}>{heading}</h2> : null;

  switch (m.kind) {
    case "key-takeaway":
      return (
        <section aria-label={heading} className="border-l-4 border-brand bg-brand-light px-5 py-4">
          <p className="eyebrow">{heading}</p>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{m.body}</p>
        </section>
      );
    case "check-your-pc":
      return (
        <section>
          {H}
          {m.intro && <p className="mt-3">{m.intro}</p>}
          <dl className="mt-5 divide-y divide-border border-y border-border">
            {m.items.map((i) => (
              <div key={i.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-semibold text-ink">{i.label}</dt>
                <dd>{i.how}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "explanation":
      return (
        <section>
          {H}
          <div className="mt-3 space-y-4">{m.paragraphs.map((p, i) => <p key={i} className="leading-8">{p}</p>)}</div>
          {m.evidence && <div className="mt-5"><EvidenceList items={m.evidence} sources={article.sources} article={article} /></div>}
        </section>
      );
    case "steps":
      if (!m.heading) {
        return (
          <div className="space-y-10">
            {m.steps.map((s, i) => (
              <section key={s.title}>
                <p className="font-mono text-xs text-brand">Step {String(i + 1).padStart(2, "0")}</p>
                <h2 id={headingId(s.title)} className={`${h2} mt-1.5`}>{s.title}</h2>
                <p className="mt-3 leading-8">{s.body}</p>
              </section>
            ))}
          </div>
        );
      }
      return (
        <section>
          {H}
          {m.intro && <p className="mt-3">{m.intro}</p>}
          <ol className="mt-5 space-y-6">
            {m.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span aria-hidden className="font-mono text-sm leading-7 text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="text-xl">{s.title}</h3><p className="mt-2 leading-8">{s.body}</p></div>
              </li>
            ))}
          </ol>
        </section>
      );
    case "compatibility":
      return (
        <section>
          {H}
          <ul className="mt-4 space-y-3">
            {m.notes.map((n) => (
              <li key={n} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand" />{n}</li>
            ))}
          </ul>
        </section>
      );
    case "decision-table":
      return (
        <section>
          {H}
          {m.intro && <p className="mt-3">{m.intro}</p>}
          <div className={`${tableWrap} mt-5`} role="region" aria-label={heading} tabIndex={0}>
            <table className="w-full min-w-[520px] border-collapse text-left text-[0.9375rem]">
              <thead className="bg-brand-light"><tr>{m.columns.map((c) => <th key={c} scope="col" className="border-b border-border p-3 font-semibold text-ink">{c}</th>)}</tr></thead>
              <tbody>{m.rows.map((r, i) => <tr key={i} className="border-b border-border last:border-0">{r.map((cell, j) => j === 0 ? <th key={j} scope="row" className="p-3 align-top font-semibold text-ink">{cell}</th> : <td key={j} className="p-3 align-top">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      );
    case "choose-if":
      return (
        <section>
          {H}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {m.options.map((o) => (
              <div key={o.choice} className="border border-border bg-surface p-5">
                <h3 className="text-xl">{o.choice}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink-secondary">Choose this if</p>
                <ul className="mt-3 space-y-2">{o.when.map((w) => <li key={w} className="flex gap-2.5"><span aria-hidden className="text-brand">→</span>{w}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      );
    case "mistakes":
      return (
        <section>
          {H}
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {m.items.map((i) => (
              <li key={i.mistake} className="py-4">
                <p className="font-semibold text-ink">{i.mistake}</p>
                <p className="mt-1"><span className="font-medium text-brand">Instead: </span>{i.instead}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "next-steps":
      return (
        <section>
          {H}
          <ol className="mt-4 space-y-3">
            {m.items.map((i, n) => (
              <li key={i.label} className="flex gap-3">
                <span aria-hidden className="font-mono text-sm leading-7 text-brand">{n + 1}.</span>
                <span>{i.href ? <Link prefetch={false} href={i.href} className="font-semibold focus-ring">{i.label}</Link> : <strong className="text-ink">{i.label}</strong>}{i.text && <> {i.text}</>}</span>
              </li>
            ))}
          </ol>
        </section>
      );
    case "callout":
      return (
        <aside className={`border-l-4 p-5 ${m.tone === "caution" ? "border-[#b5543f] bg-[#fbeeea]" : "border-brand bg-brand-light"}`}>
          {m.heading && <h2 id={headingId(m.heading)} className="scroll-mt-28 text-xl">{m.heading}</h2>}
          <p className="mt-2 leading-relaxed">{m.body}</p>
        </aside>
      );
  }
}

export function GuideTemplate({ article, sample }: { article: InformationalGuide; sample?: "fixture" | "draft" }) {
  const [first, ...rest] = article.modules;
  const lead = first?.kind === "key-takeaway" ? first : undefined;
  const body = lead ? rest : article.modules;
  const toc = buildToc(article.modules, !!article.sources?.length);
  const cites = article.modules.some((m) => m.kind === "explanation" && m.evidence?.length);

  return (
    <ArticleShell
      article={article}
      toc={toc}
      showDisclosure={false}
      sample={sample}
      intro={lead && <Module m={lead} article={article} />}
    >
      <div className="mt-12 max-w-3xl space-y-12">
        {body.map((m, i) => <Module key={i} m={m} article={article} />)}
        <SourcesList sources={article.sources} />
        {!cites && <p className="text-sm text-ink-secondary">
          This guide explains a decision process. It does not contain product rankings, benchmark results or hands-on measurements.{" "}
          <Link prefetch={false} href="/how-we-review" className="focus-ring">How we research</Link></p>}
      </div>
      <div className="mt-14"><RelatedArticles article={article} /></div>
    </ArticleShell>
  );
}
