import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { guideSectionHeadings } from "@/lib/guide-headings";
import Image from "next/image";
import { PcQuickPicks } from "@/components/pc/article/PcQuickPicks";
import { PcProductPick } from "@/components/pc/article/PcProductPick";
import { AuthorAvatar, AuthorBox } from "@/components/pc/article/AuthorBox";
import { DEFAULT_GUIDE_AUTHOR, authorHref } from "@/lib/authors";
import { guideHero } from "@/lib/guide-hero";
import { GuideJumpTo, GuideTocSidebar, type TocItem } from "@/components/guide/editorial/GuideToc";
import type { BestGuide } from "@/lib/pc-content";
import { articleHref, categoryHref, categoryLabel, relatedArticles } from "@/lib/pc-content";

/**
 * The Office Journal's Best X template (components/guide/RichGuidePage), adapted for
 * The PC Journal: same markup and editorial components; breadcrumbs follow the primary
 * topic, the byline is the publication, and related guides come from published articles.
 */
export function BestGuidePage({ article, sample }: { article: BestGuide; sample?: "fixture" | "draft" }) {
  const { products, introParagraphs, howWeEvaluated, buyingCriteria, howToChoose, faq, bottomLine } = article;
  const breadcrumbTitle = article.breadcrumbLabel;
  const headings = guideSectionHeadings(breadcrumbTitle);
  const parent = { name: categoryLabel(article.category), href: categoryHref(article.category) };
  const canonicalUrl = `${SITE_URL}${articleHref(article)}`;
  const updated = article.updatedAt ?? article.publishedAt;
  const related = relatedArticles(article, 3).map((r) => ({ href: articleHref(r), title: r.title }));
  const author = DEFAULT_GUIDE_AUTHOR;
  const hero = guideHero(article);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription ?? article.dek,
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(updated ? { dateModified: updated } : {}),
    author: { "@type": "Person", name: author.name, jobTitle: author.role, url: `${SITE_URL}${authorHref(author)}` },
    image: `${SITE_URL}${hero.src}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    about: [{ "@type": "Thing", name: breadcrumbTitle }],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}${parent.href}` },
      { "@type": "ListItem", position: 3, name: breadcrumbTitle, item: canonicalUrl },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: article.title,
    numberOfItems: products.length,
    itemListElement: products.map((p) => ({ "@type": "ListItem", position: p.rank, name: `${p.name} - ${p.badge}`, url: `${canonicalUrl}#${p.id}` })),
  };

  const toc: TocItem[] = [
    { id: "quick-picks", label: "Quick Picks" },
    { id: "our-picks", label: "Our Picks" },
    ...(howWeEvaluated.length > 0 ? [{ id: "how-we-chose", label: "How We Chose" }] : []),
    ...(buyingCriteria.length > 0 ? [{ id: "what-to-look-for", label: "What to Look For" }] : []),
    ...(howToChoose.length > 0 ? [{ id: "comparison", label: "Comparison" }] : []),
    ...(faq.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
  ];
  const sectionTitle = "scroll-mt-32 text-[1.75rem] leading-tight sm:text-[2rem] lg:scroll-mt-24";

  return (
    <>
      {!sample && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        </>
      )}

      <article className="mx-auto w-full max-w-[1120px] px-4 pb-16 pt-5 sm:px-6 lg:px-8 lg:pt-8">
        {sample && (
          <p role="note" className="mb-5 border border-[#c9a227] bg-[#fdf6dc] px-4 py-3 text-sm font-semibold text-ink">
            Draft for editorial review. Not published, not linked from the site and never indexed.
          </p>
        )}
        <header className="max-w-[760px]">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-secondary">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li><Link prefetch={false} href="/" className="!text-ink-secondary hover:!text-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link prefetch={false} href={parent.href} className="!text-ink-secondary hover:!text-ink">{parent.name}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{breadcrumbTitle}</li>
            </ol>
          </nav>
          <p className="eyebrow mt-5">Buying Guide</p>
          <h1 className="mt-3 text-[2.125rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3rem]">{article.title}</h1>
          <p className="mt-3 text-[1.125rem] leading-relaxed sm:text-[1.25rem]">{article.dek}</p>
          <div className="mt-5 flex items-center gap-3 text-sm leading-relaxed text-ink-secondary">
            <AuthorAvatar author={author} size={44} />
            <div>
            <p>By <Link prefetch={false} href={authorHref(author)} rel="author" className="font-medium !text-ink hover:!text-brand">{author.name}</Link><span>, {author.role}</span></p>
            <p>
              {updated && (<><time dateTime={updated}>Updated {formatDate(updated)}</time><span aria-hidden> · </span></>)}
              {article.readTime}
              <span aria-hidden> · </span>
              {products.length} products evaluated
            </p>
            </div>
          </div>
        </header>

        <figure className="mt-7 lg:mt-9">
          <div className="relative aspect-[16/9] overflow-hidden bg-surface">
            <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1120px) 100vw, 1072px" className="object-cover" />
          </div>
          {hero.caption && <figcaption className="mt-2 text-xs text-ink-secondary">{hero.caption}</figcaption>}
        </figure>

        <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[minmax(0,760px)_220px] lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <div className="lg:hidden">
              <GuideJumpTo items={toc} />
            </div>

            {introParagraphs.length > 0 && (
              <div className="mt-6 max-w-[68ch] space-y-5 text-[1.0625rem] leading-[1.75] lg:mt-0">
                {introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                {article.sources?.map((s) => (
                  <p key={s.id} className="text-sm opacity-80">
                    Requirements source: <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline">{s.label}</a>
                  </p>
                ))}
              </div>
            )}

            <section aria-labelledby="quick-picks" className="mt-12">
              <h2 id="quick-picks" className={sectionTitle}>Quick Picks</h2>
              <p className="mt-2 mb-5">Which of the {products.length} picks to look at first. Tap a name for the full analysis.</p>
              <PcQuickPicks products={products} />
            </section>

            <section aria-labelledby="our-picks" className="mt-14">
              <h2 id="our-picks" className={`${sectionTitle} border-b border-ink pb-3`}>Our Picks</h2>
              <div className="mt-6">
                {products.map((product) => <PcProductPick key={product.id} product={product} total={products.length} />)}
              </div>
            </section>

            {howWeEvaluated.length > 0 && (
              <section aria-labelledby="how-we-chose" className="mt-14">
                <h2 id="how-we-chose" className={sectionTitle}>{headings.howWeChose}</h2>
                <p className="mt-2 max-w-[68ch]">{author.name} compared the manufacturer specifications, connectivity, warranty terms and compatibility of every pick. Figures come from the makers unless a third-party source is named; we did not test these products ourselves.</p>
                <dl className="mt-6 divide-y divide-border border-y border-border">
                  {howWeEvaluated.map((item, i) => (
                    <div key={i} className="py-5 sm:grid sm:grid-cols-[200px_1fr] sm:gap-8">
                      <dt className="font-[family-name:var(--font-display)] text-[1.1875rem] font-semibold leading-snug text-ink">{item.title}</dt>
                      <dd className="mt-1.5 text-base leading-relaxed text-ink-secondary sm:mt-0">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {buyingCriteria.length > 0 && (
              <section aria-labelledby="what-to-look-for" className="mt-14">
                <h2 id="what-to-look-for" className={sectionTitle}>{headings.whatToLookFor}</h2>
                <p className="mt-2">Key buying criteria so you get the right fit the first time.</p>
                <ol className="mt-6 divide-y divide-border border-y border-border">
                  {buyingCriteria.map((item, i) => (
                    <li key={i} className="py-6">
                      <h3 className="flex gap-3 text-[1.25rem] leading-snug">
                        <span aria-hidden className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                        {item.criterion}
                      </h3>
                      <div className="mt-3 max-w-[68ch] space-y-4 text-base leading-relaxed">
                        {item.explanation.split("\n\n").map((para, pi) => <p key={pi}>{para}</p>)}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {howToChoose.length > 0 && (
              <section aria-labelledby="comparison" className="mt-14">
                <h2 id="comparison" className={sectionTitle}>{headings.howToChoose}</h2>
                <div className="mt-6 space-y-10">
                  {howToChoose.map((sub, i) => (
                    <div key={i}>
                      <h3 className="text-[1.25rem] leading-snug">{sub.subheading}</h3>
                      {sub.intro && <p className="mt-2 max-w-[68ch] text-base leading-relaxed">{sub.intro}</p>}
                      {sub.table && (
                        <div className="mt-4">
                          <div role="region" aria-label={`${sub.subheading} (table, scrolls sideways)`} tabIndex={0} className="relative -mx-4 overflow-x-auto px-4 focus-ring sm:mx-0 sm:px-0">
                            <table className={`w-full border-collapse text-left ${sub.table.headers.length > 2 ? "min-w-[36rem]" : ""}`}>
                              <thead>
                                <tr className="border-b border-ink">
                                  {sub.table.headers.map((h, hi) => (
                                    <th key={hi} scope="col" className="py-3 pr-5 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-secondary">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {sub.table.rows.map((row, ri) => (
                                  <tr key={ri} className="align-top">
                                    {row.map((cell, ci) => ci === 0
                                      ? <th key={ci} scope="row" className="py-3 pr-5 text-[0.9375rem] font-semibold leading-snug text-ink">{cell}</th>
                                      : <td key={ci} className="py-3 pr-5 text-[0.9375rem] leading-snug text-ink-secondary">{cell}</td>)}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {sub.table.headers.length > 2 && <p className="mt-2 text-sm text-ink-secondary sm:hidden">Scroll sideways to see every column.</p>}
                        </div>
                      )}
                      {sub.cards && (
                        <dl className="mt-4 divide-y divide-border border-y border-border">
                          {sub.cards.map((c, ci) => (
                            <div key={ci} className="py-4 sm:grid sm:grid-cols-[200px_1fr] sm:gap-8">
                              <dt className="font-semibold text-ink">{c.label}</dt>
                              <dd className="mt-1 text-base leading-relaxed text-ink-secondary sm:mt-0">{c.text}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {sub.note && <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{sub.note}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {faq.length > 0 && (
              <section aria-labelledby="faq" className="mt-14">
                <h2 id="faq" className={sectionTitle}>Frequently Asked Questions</h2>
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {faq.map((item, i) => (
                    <div key={i} className="py-5">
                      <h3 className="text-[1.1875rem] leading-snug">{item.q}</h3>
                      <p className="mt-2 max-w-[68ch] text-base leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="bottom-line" className="mt-14 border-t border-ink pt-6">
              <h2 id="bottom-line" className="text-[1.5rem]">Bottom Line</h2>
              <div className="mt-3 max-w-[68ch] space-y-4 text-[1.0625rem] leading-relaxed">
                {bottomLine.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {related.length > 0 && (
              <section aria-labelledby="related" className="mt-14">
                <h2 id="related" className="border-b border-ink pb-3 text-[1.5rem]">Related Guides</h2>
                <ul className="divide-y divide-border">
                  {related.map((g) => (
                    <li key={g.href}>
                      <Link prefetch={false} href={g.href} className="group flex items-baseline justify-between gap-4 py-4 font-[family-name:var(--font-display)] text-[1.125rem] leading-snug !text-ink hover:!text-brand focus-ring">
                        {g.title}
                        <span aria-hidden className="shrink-0 font-[family-name:var(--font-body)] text-ink-secondary transition-transform group-hover:translate-x-0.5">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <AuthorBox author={author} />
          </div>

          <aside className="hidden lg:block">
            <GuideTocSidebar items={toc} />
          </aside>
        </div>
      </article>
    </>
  );
}
