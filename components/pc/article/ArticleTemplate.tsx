import type { PcArticle } from "@/lib/pc-content";
import { GuideTemplate } from "./GuideTemplate";
import { BuyingGuideTemplate } from "./BuyingGuideTemplate";

export function ArticleTemplate({ article, sample }: { article: PcArticle; sample?: boolean }) {
  return article.type === "buying-guide"
    ? <BuyingGuideTemplate article={article} sample={sample} />
    : <GuideTemplate article={article} sample={sample} />;
}
