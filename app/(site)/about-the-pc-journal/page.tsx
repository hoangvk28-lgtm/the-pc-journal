import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About The PC Journal",
  description: "The PC Journal helps readers choose computers, displays and upgrades with clear, practical buying guides.",
  path: "/about-the-pc-journal",
});

export default function AboutPage() {
  return <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
    <p className="pc-section-kicker">About us</p>
    <h1 className="mt-3 text-5xl font-semibold tracking-tight">The PC Journal</h1>
    <p className="mt-6 text-xl leading-relaxed">A practical guide to buying the computer gear that fits your work, your games and your budget.</p>
    <div className="prose mt-10">
      <h2>Clearer choices for PC buyers</h2>
      <p>We organize buying advice around real uses. A tiny home server, a gaming display and an everyday desktop each need different strengths. Our guides explain the specifications, trade-offs and upgrade limits to check before buying.</p>
      <h2>How we choose</h2>
      <p>We review product specifications, current listings and stated use cases, then compare the features that matter for each category. We do not claim hands-on testing unless an article explicitly documents it.</p>
      <h2>Corrections and contact</h2><p>Found an error or an unclear compatibility claim? We welcome corrections. Email <a href="mailto:contact@thepcjournal.com">contact@thepcjournal.com</a> with the guide&apos;s link and what needs checking, and we will review it.</p><h2>How this site is funded</h2>
      <p>Some links may earn us a commission, at no additional cost to you. Affiliate relationships do not determine which products appear in a guide.</p>
    </div>
    <Link prefetch={false} href="/guides" className="mt-8 inline-block bg-brand px-6 py-3 font-semibold text-white">Explore the guides →</Link>
  </main>;
}

