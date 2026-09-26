import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DISCLOSURE_SHORT } from "@/lib/affiliate";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { PcArticle, SourceRef } from "@/lib/pc-content";
import { articleHref, categoryHref, categoryLabel, relatedArticles } from "@/lib/pc-content";

export interface TocEntry {
  id: string;
  label: string;
}

export function headingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const typeLabel = { guide: "Guide", "buying-guide": "Buying Guide" } as const;

function ArticleSchema({ article, path }: { article: PcArticle; path: string }) {
  const url = `${SITE_URL}${path}`;
  const isPublisher = !article.author || article.author.name === SITE_NAME;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription ?? article.dek,
      mainEntityOfPage: url,
      ...(article.hero ? { image: `${SITE_URL}${article.hero.src}` } : {}),
      ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
      ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
      author: isPublisher
        ? { "@id": `${SITE_URL}/#organization` }
        : { "@type": "Person", name: article.author!.name, ...(article.author!.url ? { url: `${SITE_URL}${article.author!.url}` } : {}) },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: categoryLabel(article.category), item: `${SITE_URL}${categoryHref(article.category)}` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];
  if (article.type === "buying-guide") {
    graph.push({
      "@type": "ItemList",
      itemListElement: article.products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.model, url: `${url}#${headingId(p.model)}` })),
    });
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 4) return null;
  return (
    <nav aria-labelledby="toc-heading" className="border-y border-border py-5">
      <h2 id="toc-heading" className="eyebrow !text-ink-secondary">In this article</h2>
      <ol className="mt-3 grid gap-x-8 sm:grid-cols-2">
        {entries.map((e, i) => (
          <li key={e.id} className="flex gap-3 border-b border-border/70">
            <span aria-hidden className="w-5 shrink-0 py-2.5 font-mono text-xs leading-6 text-brand">{String(i + 1).padStart(2, "0")}</span>
            <a href={`#${e.id}`} className="min-h-11 flex-1 py-2.5 text-[0.9375rem] leading-6 !text-ink hover:!text-brand focus-ring">{e.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SourcesList({ sources }: { sources?: SourceRef[] }) {
  if (!sources?.length) return null;
  const kind = { manufacturer: "Manufacturer documentation", "third-party-test": "Third-party test", "pcj-measurement": "PC Journal measurement", reference: "Reference" } as const;
  return (
    <section aria-labelledby="sources" className="scroll-mt-28">
      <h2 id="sources" className="text-2xl">Sources</h2>
      <ol className="mt-4 space-y-3 text-[0.9375rem]">
        {sources.map((s) => (
          <li key={s.id} id={`source-${s.id}`} className="scroll-mt-28 border-l-2 border-border pl-4">
            <a href={s.url} rel="noopener noreferrer" target="_blank" className="font-medium break-words focus-ring">{s.label}</a>
            <span className="block text-sm text-ink-secondary">
              {[s.publisher, kind[s.kind], s.accessed ? `accessed ${formatDate(s.accessed)}` : ""].filter(Boolean).join(" · ")}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RelatedArticles({ article }: { article: PcArticle }) {
  const items = relatedArticles(article);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related" className="border-t border-ink pt-6">
      <h2 id="related" className="text-2xl">Related guides</h2>
      <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={r.slug} className="group relative border-b border-border py-4">
            <p className="eyebrow">{categoryLabel(r.category)}</p>
            <Link prefetch={false} href={articleHref(r)} className="mt-1 block text-[1.0625rem] font-semibold leading-snug !text-ink group-hover:!text-brand focus-ring after:absolute after:inset-0">
              {r.title}
            </Link>
            {r.teaser && <p className="mt-1.5 line-clamp-2 text-sm text-ink-secondary">{r.teaser}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AffiliateNote() {
  return (
    <p className="border-l-2 border-brand bg-brand-light px-4 py-3 text-sm leading-relaxed">
      {DISCLOSURE_SHORT}{" "}
      <Link prefetch={false} href="/affiliate-disclosure" className="font-medium focus-ring">How this works</Link>
    </p>
  );
}

/** Shared frame for both templates: breadcrumbs, header, optional hero, disclosure, TOC, body, closing sections. */
export function ArticleShell({
  article,
  toc,
  showDisclosure,
  sample,
  intro,
  children,
}: {
  article: PcArticle;
  toc: TocEntry[];
  showDisclosure: boolean;
  sample?: boolean;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  const path = sample ? `/dev/fixtures/${article.slug}` : articleHref(article);
  const meta = [
    article.author ? <span key="a">By {article.author.url ? <Link prefetch={false} href={article.author.url} className="!text-ink font-medium focus-ring">{article.author.name}</Link> : article.author.name}</span> : null,
    article.publishedAt ? <span key="p">Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></span> : null,
    article.updatedAt ? <span key="u">Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span> : null,
    article.readTime ? <span key="r">{article.readTime}</span> : null,
  ].filter(Boolean);

  return (
    <article className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {!sample && <ArticleSchema article={article} path={path} />}
      {sample && (
        <p role="note" className="mb-6 border border-[#c9a227] bg-[#fdf6dc] px-4 py-3 text-sm font-semibold text-ink">
          Development fixture: sample data with fictional products. Not an editorial article, never indexed.
        </p>
      )}
      <Breadcrumbs crumbs={[{ label: categoryLabel(article.category), href: categoryHref(article.category) }, { label: article.title }]} />

      <header className={`mt-6 grid gap-8 ${article.hero ? "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-12" : "max-w-3xl"}`}>
        <div className="min-w-0">
          <p className="eyebrow">
            <Link prefetch={false} href={categoryHref(article.category)} className="focus-ring">{categoryLabel(article.category)}</Link>
            <span aria-hidden className="mx-2 text-border-dark">/</span>
            <span className="text-ink-secondary">{typeLabel[article.type]}</span>
          </p>
          <h1 className="mt-3 text-[2rem] leading-[1.12] [text-wrap:balance] sm:text-[2.5rem] lg:text-[2.75rem]">{article.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">{article.dek}</p>
          {meta.length > 0 && (
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-4 text-sm text-ink-secondary">{meta}</p>
          )}
        </div>
        {article.hero && (
          <figure className="min-w-0">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[#ebe7df]">
              <Image src={article.hero.src} alt={article.hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 540px" className="object-cover" />
            </div>
            {article.hero.caption && <figcaption className="mt-2 text-xs text-ink-muted">{article.hero.caption}</figcaption>}
          </figure>
        )}
      </header>

      <div className="mt-10 max-w-3xl space-y-10">
        {showDisclosure && <AffiliateNote />}
        {intro}
        <TableOfContents entries={toc} />
      </div>
      {children}
    </article>
  );
}
