import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTHORS, authorHref } from "@/lib/authors";
import { AuthorAvatar } from "@/components/pc/article/AuthorBox";
import { articleHref, categoryLabel, publishedArticles } from "@/lib/pc-content";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() { return Object.keys(AUTHORS).map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AUTHORS[slug];
  if (!a) return {};
  return buildMetadata({ title: `${a.name}, ${a.role}`, description: a.bio.slice(0, 158).replace(/\s+\S*$/, "") + ".", path: authorHref(a) });
}

/** Guides credited to this author: Buying Guides use the default guide author. */
const guidesBy = () => publishedArticles
  .filter((x) => x.type === "best-guide")
  .sort((x, y) => (y.updatedAt ?? "").localeCompare(x.updatedAt ?? ""));

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AUTHORS[slug];
  if (!a) notFound();
  const recent = guidesBy().slice(0, 24);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@type": "Person", name: a.name, jobTitle: a.role, description: a.bio, url: `${SITE_URL}${authorHref(a)}`, worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } },
  };
  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="eyebrow">Author</p>
      <div className="mt-4 flex items-center gap-5">
        <AuthorAvatar author={a} size={72} />
        <div>
          <h1 className="text-[2.25rem] leading-tight sm:text-[2.75rem]">{a.name}</h1>
          <p className="mt-1 text-ink-secondary">{a.role}, <Link prefetch={false} href="/about-the-pc-journal">{SITE_NAME}</Link></p>
        </div>
      </div>
      <p className="mt-6 max-w-[68ch] text-[1.0625rem] leading-relaxed">{a.bio}</p>
      <p className="mt-4 text-sm text-ink-secondary">Topics covered: {a.topics.join(", ")}</p>
      <p className="mt-2 text-sm text-ink-secondary">How guides are researched: <Link prefetch={false} href="/how-we-review">our methodology</Link>.</p>

      <section aria-labelledby="recent" className="mt-12">
        <h2 id="recent" className="border-b border-ink pb-3 text-[1.5rem]">Recent guides</h2>
        <ul className="divide-y divide-border">
          {recent.map((r) => (
            <li key={r.slug} className="py-4">
              <p className="eyebrow">{categoryLabel(r.category)}</p>
              <Link prefetch={false} href={articleHref(r)} className="mt-1 block font-[family-name:var(--font-display)] text-[1.125rem] leading-snug !text-ink hover:!text-brand focus-ring">{r.title}</Link>
            </li>
          ))}
        </ul>
        <p className="mt-6"><Link prefetch={false} href="/guides">Browse all guides <span aria-hidden>→</span></Link></p>
      </section>
    </article>
  );
}
