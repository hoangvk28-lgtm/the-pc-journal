import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Affiliate Disclosure", description: "How retail links and commissions work at The PC Journal, including our participation in the Amazon Associates Program.", path: "/affiliate-disclosure" });
export default function AffiliateDisclosurePage() {
  return <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <p className="pc-section-kicker">Transparency</p><h1 className="mt-3 text-4xl font-semibold">Affiliate disclosure</h1>
    <p className="mt-7 border-l-4 border-brand pl-4 text-lg font-medium leading-8">As an Amazon Associate I earn from qualifying purchases.</p>
    <p className="mt-6 leading-8">The PC Journal is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you buy through a retailer link in one of our guides, we may earn a commission at no additional cost to you.</p>
    <h2 className="mt-9 text-2xl font-semibold">How this affects our guides</h2>
    <p className="mt-3 leading-8">Commissions help fund the site. They do not decide which products we recommend or how we rank them: picks are chosen from the specifications and evidence described in each guide, and a product that pays a commission gets no editorial preference over one that does not.</p>
    <p className="mt-5 leading-8">Our guides are research-based. We compare manufacturer specifications and, where noted, independent measurements; we do not claim hands-on testing unless a guide says so. Prices and availability change often, so check the retailer&apos;s page before you buy.</p>
    <h2 className="mt-9 text-2xl font-semibold">Questions</h2>
    <p className="mt-3 leading-8">If you have a question about a link or a recommendation, email us at <a href="mailto:contact@thepcjournal.com" className="underline underline-offset-2">contact@thepcjournal.com</a>. You can read more about our process in <Link prefetch={false} href="/how-we-review" className="underline underline-offset-2">How we review</Link>.</p>
  </article>;
}
