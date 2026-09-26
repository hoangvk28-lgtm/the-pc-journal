import type { PcArticle } from "@/lib/pc-content";
import { GuideTemplate } from "./GuideTemplate";
import { BestGuidePage } from "./BestGuidePage";

export function ArticleTemplate({ article, sample }: { article: PcArticle; sample?: "fixture" | "draft" }) {
  return article.type === "best-guide"
    ? <BestGuidePage article={article} sample={sample} />
    : <GuideTemplate article={article} sample={sample} />;
}
