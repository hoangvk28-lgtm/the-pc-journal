import { marked } from "marked";
import type { LongFormGuide } from "@/lib/pc-content/types";
import { ArticleShell, RelatedArticles } from "./ArticleShell";

export function LongFormGuidePage({ article, sample }: { article: LongFormGuide; sample?: "fixture" | "draft" }) {
  const html = marked.parse(article.body, { async: false, gfm: true });
  return (
    <ArticleShell article={article} toc={[]} showDisclosure={false} sample={sample}>
      <div className="prose mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="mt-12 max-w-3xl"><RelatedArticles article={article} /></div>
    </ArticleShell>
  );
}
