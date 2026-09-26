/** Editorial contract for future "Best X" hardware articles. */
export interface SourceReference {
  label: string;
  url: string;
  kind: "manufacturer" | "independent-test" | "hands-on-record";
  context?: string; // test system, settings, driver, firmware, revision, etc.
}

export interface PcRecommendation {
  model: string;
  asin?: string;
  whyItFits: string;
  bestFor: string;
  skipIf: string;
  compatibilityChecks: string[];
  limitations: string[];
  alternatives: string[];
  sources: SourceReference[];
}

export interface PcBuyingGuide {
  slug: string;
  title: string;
  summary: string;
  workload: string;
  budgetContext: string;
  existingSystem: string;
  systemRequirements: string[];
  evaluationCriteria: { label: string; reason: string }[];
  evidenceSummary: string;
  recommendations: PcRecommendation[];
  updatedAt: string;
  reviewStatus: "draft" | "ready";
}

export function isPublishablePcGuide(guide: PcBuyingGuide): boolean {
  return guide.reviewStatus === "ready"
    && !!guide.workload.trim()
    && !!guide.budgetContext.trim()
    && !!guide.existingSystem.trim()
    && guide.evaluationCriteria.length > 0
    && guide.recommendations.length > 0
    && guide.recommendations.every((pick) =>
      !!pick.whyItFits.trim()
      && !!pick.bestFor.trim()
      && !!pick.skipIf.trim()
      && pick.compatibilityChecks.length > 0
      && pick.sources.length > 0
    );
}
