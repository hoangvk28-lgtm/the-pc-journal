import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/pc/article/ArticleTemplate";
import { articleHref, getPublishedArticle, publishedArticles } from "@/lib/pc-content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() { return publishedArticles.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle,
    description: article.metaDescription ?? article.dek,
    path: articleHref(article),
    image: article.hero?.src,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) notFound();
  return <ArticleTemplate article={article} />;
}
