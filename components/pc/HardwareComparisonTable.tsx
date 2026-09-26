import type { PcRecommendation } from "@/lib/pc-buying-guide";

/** Product names and column labels remain visible while the table scrolls on phones. */
export function HardwareComparisonTable({ picks, metricLabel, metric }: {
  picks: PcRecommendation[];
  metricLabel: string;
  metric: (pick: PcRecommendation) => string;
}) {
  return <div className="overflow-x-auto border border-border" role="region" aria-label="Hardware comparison" tabIndex={0}>
    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
      <thead className="bg-[#eef1f6] text-ink"><tr>
        <th scope="col" className="sticky left-0 z-10 min-w-40 border-b border-r border-border bg-[#eef1f6] p-4">Model</th>
        <th scope="col" className="min-w-40 border-b border-border p-4">Best for</th>
        <th scope="col" className="min-w-40 border-b border-border p-4">{metricLabel}</th>
        <th scope="col" className="min-w-44 border-b border-border p-4">Check before buying</th>
      </tr></thead>
      <tbody>{picks.map((pick) => <tr key={pick.model} className="border-b border-border last:border-b-0">
        <th scope="row" className="sticky left-0 border-r border-border bg-white p-4 font-semibold text-ink">{pick.model}</th>
        <td className="p-4 align-top">{pick.bestFor}</td>
        <td className="p-4 align-top">{metric(pick)}</td>
        <td className="p-4 align-top">{pick.compatibilityChecks[0]}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}
