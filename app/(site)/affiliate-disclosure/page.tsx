import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Affiliate Disclosure", description: "How retail links and potential commissions work at The PC Journal.", path: "/affiliate-disclosure" });
export default function AffiliateDisclosurePage() {
  return <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <p className="pc-section-kicker">Transparency</p><h1 className="mt-3 text-4xl font-semibold">Affiliate disclosure</h1>
    <p className="mt-7 leading-8">The PC Journal may earn a commission when readers buy through qualifying retailer links, at no additional cost to them. A dedicated affiliate tag for this publication has not yet been configured, so current links are not presented as tracked PC Journal affiliate links.</p>
    <p className="mt-5 leading-8">When Amazon affiliate links are enabled, the required disclosure will apply: “As an Amazon Associate I earn from qualifying purchases.” Affiliate relationships will not determine the editorial reasoning in a guide.</p>
    <p className="mt-5 leading-8">Our current guides are research-based and do not claim hands-on product testing. Prices and availability should be checked with the retailer before buying.</p>
  </article>;
}
