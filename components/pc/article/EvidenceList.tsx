import type { EvidenceBasis, EvidenceItem, SourceRef } from "@/lib/pc-content";
import { displayableEvidence } from "@/lib/pc-content/validate";

export const EVIDENCE_LABELS: Record<EvidenceBasis, string> = {
  "manufacturer-spec": "Manufacturer specification",
  "third-party-test": "Third-party test",
  "pcj-measurement": "PC Journal measurement",
  editorial: "Editorial view",
};

/** Shows each claim with its basis. Claims missing a required source or test conditions are not rendered. */
export function EvidenceList({ items, sources, article }: { items: EvidenceItem[]; sources?: SourceRef[]; article: object }) {
  const shown = items.filter((e) => displayableEvidence(e, sources, article));
  if (shown.length === 0) return null;
  return (
    <ul className="space-y-3">
      {shown.map((e, i) => {
        const source = e.sourceId ? sources?.find((s) => s.id === e.sourceId) : undefined;
        return (
          <li key={i} className="text-[0.9375rem] leading-relaxed">
            <span className="mr-2 inline-block rounded-[2px] border border-border bg-surface px-1.5 py-0.5 align-[1px] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-secondary">
              {EVIDENCE_LABELS[e.basis]}
            </span>
            {e.claim}
            {e.conditions && <span className="block text-sm text-ink-secondary">Conditions: {e.conditions}</span>}
            {source && (
              <a href={`#source-${source.id}`} className="ml-1 text-sm focus-ring">
                Source<span className="sr-only">: {source.label}</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
