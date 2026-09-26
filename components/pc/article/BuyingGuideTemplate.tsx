import Image from "next/image";
import Link from "next/link";
import type { BuyingGuide, ProductRecommendation, SpecColumn } from "@/lib/pc-content";
import { resolveRetailerHref } from "@/lib/pc-content/validate";
import { ArticleShell, RelatedArticles, SourcesList, headingId, type TocEntry } from "./ArticleShell";
import { EvidenceList } from "./EvidenceList";

const h2 = "scroll-mt-28 text-[1.625rem] leading-tight sm:text-[1.875rem]";

function formatSpec(col: SpecColumn, p: ProductRecommendation): string | undefined {
  const v = p.specs[col.key]?.value;
  if (v === undefined || v === "") return undefined;
  return col.unit ? `${v} ${col.unit}` : String(v);
}

/** Only columns that at least one product fills, so a category never shows a table of empty cells. */
function usedColumns(a: BuyingGuide): SpecColumn[] {
  return a.specColumns.filter((c) => a.products.some((p) => formatSpec(c, p)));
}

function ComparisonTable({ article }: { article: BuyingGuide }) {
  const cols = usedColumns(article);
  return (
    <section>
      <h2 id="comparison" className={h2}>Comparison table</h2>
      <p className="mt-2 text-sm text-ink-secondary">Specifications are manufacturer-listed values; see each product&apos;s sources. Scroll sideways on small screens.</p>
      <div className="mt-4 overflow-x-auto border border-border bg-surface" role="region" aria-label="Product comparison" tabIndex={0}>
        <table className="w-full border-collapse text-left text-[0.9375rem]" style={{ minWidth: `${Math.max(560, 200 + cols.length * 130)}px` }}>
          <thead className="bg-brand-light text-ink">
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-48 border-b border-r border-border bg-brand-light p-3 font-semibold">Model</th>
              {cols.map((c) => <th key={c.key} scope="col" className="border-b border-border p-3 font-semibold">{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {article.products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <th scope="row" className="sticky left-0 z-10 w-48 border-r border-border bg-surface p-3 align-top font-semibold text-ink">
                  <a href={`#${headingId(p.model)}`} className="!text-ink hover:!text-brand focus-ring">{p.model}</a>
                </th>
                {cols.map((c) => {
                  const v = formatSpec(c, p);
                  return <td key={c.key} className="p-3 align-top tabular-nums">{v ?? <><span aria-hidden className="text-ink-muted">–</span><span className="sr-only">Not listed</span></>}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function List({ items, tone }: { items: string[]; tone: "pro" | "con" | "check" }) {
  const mark = tone === "pro" ? "+" : tone === "con" ? "–" : "✓";
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5 text-[0.9375rem] leading-relaxed">
          <span aria-hidden className={`w-3 shrink-0 font-semibold ${tone === "con" ? "text-[#b5543f]" : "text-brand"}`}>{mark}</span>{i}
        </li>
      ))}
    </ul>
  );
}

function ProductSection({ p, article, index }: { p: ProductRecommendation; article: BuyingGuide; index: number }) {
  const cols = article.specColumns.filter((c) => formatSpec(c, p));
  const retailerHref = resolveRetailerHref(p.retailer);
  const score = article.scoringSystem && p.score !== undefined ? p.score : undefined;

  return (
    <section aria-labelledby={headingId(p.model)} className="border-t border-ink pt-8">
      <div className={`grid gap-6 ${p.image ? "md:grid-cols-[minmax(0,1fr)_16rem]" : ""}`}>
        <div className="min-w-0">
          <p className="font-mono text-xs text-ink-secondary">{String(index + 1).padStart(2, "0")}</p>
          {p.label && <p className="eyebrow mt-1">{p.label}</p>}
          <h2 id={headingId(p.model)} className={`${h2} mt-1.5 break-words`}>{p.model}</h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">{p.verdict}</p>
          {p.label && p.labelReason && <p className="mt-2 text-sm text-ink-secondary">Why this label: {p.labelReason}</p>}
          {score !== undefined && (
            <p className="mt-3 text-sm">
              <span className="font-semibold text-ink">{score.toFixed(1)}/{article.scoringSystem!.scale}</span>{" "}
              <Link prefetch={false} href={article.scoringSystem!.methodologyUrl} className="focus-ring">{article.scoringSystem!.name}</Link>
            </p>
          )}
        </div>
        {p.image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#ebe7df] md:order-none">
            <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 768px) 100vw, 256px" className="object-cover" />
          </div>
        )}
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border border-border bg-surface p-4"><dt className="text-sm font-semibold uppercase tracking-wider text-brand">Best for</dt><dd className="mt-1.5">{p.bestFor}</dd></div>
        <div className="border border-border bg-surface p-4"><dt className="text-sm font-semibold uppercase tracking-wider text-ink-secondary">Skip if</dt><dd className="mt-1.5">{p.skipIf}</dd></div>
      </dl>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {cols.length > 0 && (
          <div>
            <h3 className="text-lg">Key specifications</h3>
            <dl className="mt-3 divide-y divide-border border-y border-border text-[0.9375rem]">
              {cols.map((c) => (
                <div key={c.key} className="flex justify-between gap-4 py-2">
                  <dt className="text-ink-secondary">{c.label}</dt>
                  <dd className="text-right font-medium tabular-nums text-ink">
                    {formatSpec(c, p)}
                    <a href={`#source-${p.specs[c.key].sourceId}`} className="ml-1.5 text-xs font-normal focus-ring" aria-label={`Source for ${c.label}`}>src</a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        <div>
          <h3 className="text-lg">Check before buying</h3>
          <div className="mt-3"><List items={p.compatibilityChecks} tone="check" /></div>
        </div>
      </div>

      {p.evidence.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg">Evidence</h3>
          <div className="mt-3"><EvidenceList items={p.evidence} sources={article.sources} article={article} /></div>
        </div>
      )}

      {(p.pros.length > 0 || p.cons.length > 0) && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {p.pros.length > 0 && <div><h3 className="text-lg">Pros</h3><div className="mt-3"><List items={p.pros} tone="pro" /></div></div>}
          {p.cons.length > 0 && <div><h3 className="text-lg">Cons</h3><div className="mt-3"><List items={p.cons} tone="con" /></div></div>}
        </div>
      )}

      {p.alternative && (
        <p className="mt-6 border-l-2 border-border pl-4 text-[0.9375rem]">
          <span className="font-semibold text-ink">Alternative: </span>
          {p.alternative.href ? <Link prefetch={false} href={p.alternative.href} className="focus-ring">{p.alternative.model}</Link> : p.alternative.model}. {p.alternative.tradeOff}
        </p>
      )}

      {retailerHref && (
        <a href={retailerHref} rel="noopener noreferrer sponsored" target="_blank" className="mt-6 inline-flex min-h-11 items-center gap-2 bg-cta px-5 text-sm font-semibold !text-white hover:bg-cta-dark focus-ring">
          {p.retailer?.label ?? "Check current price"}<span aria-hidden>→</span><span className="sr-only"> for {p.model} (opens retailer site)</span>
        </a>
      )}
    </section>
  );
}

function CardGrid({ id, title, items }: { id: string; title: string; items: { title: string; body: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 id={id} className={h2}>{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((i) => <div key={i.title} className="border border-border bg-surface p-5"><h3 className="text-lg">{i.title}</h3><p className="mt-2 text-[0.9375rem] leading-relaxed">{i.body}</p></div>)}
      </div>
    </section>
  );
}

export function BuyingGuideTemplate({ article, sample }: { article: BuyingGuide; sample?: boolean }) {
  const showDisclosure = article.products.some((p) => resolveRetailerHref(p.retailer));
  const toc: TocEntry[] = [
    { id: "at-a-glance", label: "At a glance" },
    { id: "comparison", label: "Comparison table" },
    ...article.products.map((p) => ({ id: headingId(p.model), label: p.model })),
    { id: "compatibility-checklist", label: "Compatibility checklist" },
    ...(article.howWeChose.length ? [{ id: "how-we-chose", label: "How we chose" }] : []),
    ...(article.whatToLookFor.length ? [{ id: "what-to-look-for", label: "What to look for" }] : []),
    ...(article.alsoConsidered?.length ? [{ id: "also-considered", label: "Also considered" }] : []),
    { id: "bottom-line", label: "The bottom line" },
    { id: "sources-and-limits", label: "Sources and limitations" },
  ];

  const intro = (
    <div className="grid gap-4 border border-border bg-surface p-5 sm:grid-cols-2">
      <div><p className="eyebrow">Scope</p><p className="mt-1.5 text-[0.9375rem] leading-relaxed">{article.scope}</p></div>
      <div>
        <p className="eyebrow">Research basis</p>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{article.researchBasis}</p>
        <p className="mt-2 text-sm font-medium text-ink">{article.testingRecord ? `Includes our own measurements: ${article.testingRecord.method}` : "Research-based. No hands-on testing is claimed."}</p>
      </div>
    </div>
  );

  return (
    <ArticleShell article={article} toc={toc} showDisclosure={showDisclosure} sample={sample} intro={intro}>
      <div className="mt-12 max-w-4xl space-y-14">
        <section>
          <h2 id="at-a-glance" className={h2}>At a glance</h2>
          <ol className="mt-5 divide-y divide-border border-y border-border">
            {article.products.map((p) => (
              <li key={p.id} className="group relative grid gap-1 py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6">
                <div className="min-w-0">
                  {p.label && <p className="eyebrow">{p.label}</p>}
                  <a href={`#${headingId(p.model)}`} className="mt-0.5 block break-words font-semibold !text-ink group-hover:!text-brand focus-ring after:absolute after:inset-0">{p.model}</a>
                </div>
                <p className="text-[0.9375rem]">{p.bestFor}</p>
              </li>
            ))}
          </ol>
        </section>

        <ComparisonTable article={article} />

        <div className="space-y-14">
          {article.products.map((p, i) => <ProductSection key={p.id} p={p} article={article} index={i} />)}
        </div>

        <section className="border-l-4 border-brand bg-brand-light p-5 sm:p-6">
          <h2 id="compatibility-checklist" className={h2}>Compatibility checklist</h2>
          <div className="mt-4"><List items={article.compatibilityChecklist} tone="check" /></div>
        </section>

        <CardGrid id="how-we-chose" title="How we chose" items={article.howWeChose} />
        <CardGrid id="what-to-look-for" title="What to look for" items={article.whatToLookFor} />

        {article.alsoConsidered && article.alsoConsidered.length > 0 && (
          <section>
            <h2 id="also-considered" className={h2}>Also considered</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {article.alsoConsidered.map((a) => <li key={a.model} className="py-3"><span className="font-semibold text-ink">{a.model}.</span> {a.reason}</li>)}
            </ul>
          </section>
        )}

        <section>
          <h2 id="bottom-line" className={h2}>The bottom line</h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed">{article.conclusion.summary}</p>
          {article.conclusion.paths.length > 0 && (
            <div className="mt-5 overflow-x-auto border border-border bg-surface" role="region" aria-label="Decision paths" tabIndex={0}>
              <table className="w-full min-w-[420px] border-collapse text-left text-[0.9375rem]">
                <thead className="bg-brand-light"><tr><th scope="col" className="border-b border-border p-3">If</th><th scope="col" className="border-b border-border p-3">Consider</th></tr></thead>
                <tbody>{article.conclusion.paths.map((r) => <tr key={r.if} className="border-b border-border last:border-0"><td className="p-3 align-top">{r.if}</td><td className="p-3 align-top font-semibold text-ink">{r.then}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 id="sources-and-limits" className={h2}>Sources and limitations</h2>
          {article.limitations.length > 0 && <div className="mt-4"><List items={article.limitations} tone="con" /></div>}
          <div className="mt-8"><SourcesList sources={article.sources} /></div>
        </section>
      </div>
      <div className="mt-14"><RelatedArticles article={article} /></div>
    </ArticleShell>
  );
}
