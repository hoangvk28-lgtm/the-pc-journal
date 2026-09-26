import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/pc/article/ArticleTemplate";
import { getFixture, validationReport } from "@/lib/pc-content";
import { buildMetadata } from "@/lib/seo";

// Template fixtures: sample data only. Served solely when PCJ_ENABLE_FIXTURES=true
// (see proxy.ts), always noindex, never listed or included in the sitemap.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFixture(slug);
  if (!f) return {};
  return buildMetadata({ title: f.seoTitle, description: f.dek, path: `/dev/fixtures/${slug}`, noIndex: true });
}

export default async function FixturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fixture = getFixture(slug);
  if (!fixture) notFound();
  const issues = validationReport().filter((i) => i.slug === slug);
  return (
    <>
      <ArticleTemplate article={fixture} sample />
      <section className="mx-auto mb-16 w-full max-w-[1280px] px-4 sm:px-6 lg:px-8" aria-labelledby="validation">
        <h2 id="validation" className="text-2xl">Validation report (development only)</h2>
        {issues.length === 0 ? <p className="mt-3">No issues.</p> : (
          <ul className="mt-3 space-y-1 font-mono text-sm">
            {issues.map((i, n) => <li key={n}><strong className={i.severity === "error" ? "text-[#b5543f]" : "text-ink-secondary"}>{i.severity}</strong> {i.field}: {i.message}</li>)}
          </ul>
        )}
      </section>
    </>
  );
}
