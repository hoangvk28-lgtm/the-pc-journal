import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleCardMedium } from "@/components/editorial/ArticleCards";
import { articleHref, categoryHref, categoryLabel } from "@/lib/pc-content";
import { articlesInSubtopic, hubIsLive, liveSubtopics } from "@/lib/pc-content/linking";
import { getSubtopic, subtopicHref } from "@/lib/pc-content/subtopics";
import { toCardView } from "@/lib/pc-content/views";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() { return liveSubtopics().map((s) => ({ slug: s.category, subtopic: s.slug })); }
export const dynamicParams = false;

type Params = Promise<{ slug: string; subtopic: string }>;

function load(slug: string, subtopic: string) {
  const sub = getSubtopic(subtopic);
  return sub && sub.category === slug && hubIsLive(sub) ? sub : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, subtopic } = await params; const sub = load(slug, subtopic);
  if (!sub) return {};
  return buildMetadata({ title: sub.seoTitle, description: sub.metaDescription, path: subtopicHref(sub) });
}

/** How many buying guides get a card; the rest are a plain link list so every guide stays one click from its hub. */
const FEATURED = 6;

export default async function SubtopicPage({ params }: { params: Params }) {
  const { slug, subtopic } = await params; const sub = load(slug, subtopic);
  if (!sub) notFound();
  const all = articlesInSubtopic(sub);
  const explainers = all.filter((a) => a.type !== "best-guide");
  const buying = all.filter((a) => a.type === "best-guide");
  const featured = buying.slice(0, FEATURED);
  const rest = [...buying.slice(FEATURED)].sort((a, b) => a.title.localeCompare(b.title));
  const nearby = sub.compat.map(getSubtopic).filter((s) => s && hubIsLive(s));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: categoryLabel(sub.category), item: `${SITE_URL}${categoryHref(sub.category)}` },
      { "@type": "ListItem", position: 3, name: sub.title, item: `${SITE_URL}${subtopicHref(sub)}` },
    ],
  };

  return <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <Breadcrumbs crumbs={[{ label: categoryLabel(sub.category), href: categoryHref(sub.category) }, { label: sub.title }]} />
    <header className="mt-6 max-w-3xl">
      <p className="eyebrow">{categoryLabel(sub.category)}</p>
      <h1 className="mt-2 text-[2.25rem] leading-tight sm:text-5xl">{sub.title}</h1>
      <p className="mt-4 text-lg leading-relaxed">{sub.intro}</p>
      <p className="mt-3 text-sm text-ink-secondary">{buying.length} buying guides{explainers.length > 0 ? ` and ${explainers.length} explainers` : ""}.</p>
    </header>

    <section aria-labelledby="checklist" className="mt-10 border-t border-border pt-8">
      <h2 id="checklist" className="text-2xl">What to check first</h2>
      <ol className="mt-5 grid gap-4 md:grid-cols-3">{sub.checklist.map((item, index) => <li key={item} className="border border-border bg-surface p-5"><span className="font-mono text-xs text-brand">0{index + 1}</span><p className="mt-3 font-medium text-ink">{item}</p></li>)}</ol>
    </section>

    {explainers.length > 0 && (
      <section aria-labelledby="explainers" className="mt-14">
        <h2 id="explainers" className="border-b border-ink pb-3 text-[1.75rem]">Start here</h2>
        <ul className="mt-2 grid gap-x-8 sm:grid-cols-2">
          {explainers.map((a) => (
            <li key={a.slug} className="border-b border-border py-4">
              <Link prefetch={false} href={articleHref(a)} className="text-[1.0625rem] font-semibold leading-snug !text-ink hover:!text-brand focus-ring">{a.title}</Link>
              {a.teaser && <p className="mt-1.5 line-clamp-2 text-sm text-ink-secondary">{a.teaser}</p>}
            </li>
          ))}
        </ul>
      </section>
    )}

    {featured.length > 0 && (
      <section aria-labelledby="featured" className="mt-14">
        <h2 id="featured" className="border-b border-ink pb-3 text-[1.75rem]">Popular {sub.title.toLowerCase()} guides</h2>
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => <ArticleCardMedium key={a.slug} article={toCardView(a)} />)}
        </div>
      </section>
    )}

    {rest.length > 0 && (
      <section aria-labelledby="all-guides" className="mt-14">
        <h2 id="all-guides" className="border-b border-ink pb-3 text-[1.75rem]">All {sub.title.toLowerCase()} buying guides</h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug} className="border-b border-border py-2.5">
              <Link prefetch={false} href={articleHref(a)} className="text-[0.975rem] leading-snug !text-ink hover:!text-brand focus-ring">{a.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    )}

    {nearby.length > 0 && (
      <nav aria-labelledby="nearby" className="mt-14 border-t border-border pt-8">
        <h2 id="nearby" className="text-2xl">Related topics</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {nearby.map((s) => <li key={s!.slug}><Link prefetch={false} href={subtopicHref(s!)} className="inline-flex min-h-11 items-center border border-border bg-surface px-4 font-medium !text-ink hover:border-brand hover:!text-brand focus-ring">{s!.title}</Link></li>)}
          <li><Link prefetch={false} href={categoryHref(sub.category)} className="inline-flex min-h-11 items-center border border-border bg-surface px-4 font-medium !text-ink hover:border-brand hover:!text-brand focus-ring">All {categoryLabel(sub.category).toLowerCase()}</Link></li>
        </ul>
      </nav>
    )}
  </div>;
}
