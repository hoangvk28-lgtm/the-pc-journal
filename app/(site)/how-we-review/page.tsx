import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How We Research PC Hardware",
  description: "How The PC Journal checks compatibility, evaluates evidence and distinguishes research from hands-on testing.",
  path: "/how-we-review",
});

const sections = [
  { title: "Start with the reader's workload", body: "A useful recommendation starts with the applications, games, display target, budget and existing system. We define the decision before comparing products. A part that fits one build may be a poor choice in another." },
  { title: "Use source documents for compatibility", body: "We use manufacturer manuals, support lists, specification sheets and firmware notes for model-specific claims. CPU support may depend on board revision and BIOS version. Memory, storage, power, cooling and case fit also require checks against the exact models. If those details cannot be verified, we say so and do not claim compatibility." },
  { title: "Evaluate each category on its own terms", body: "A graphics card needs relevant game or application evidence, memory capacity and physical and power checks. A power supply needs model-specific documentation and connector verification. A monitor needs display measurements under known conditions. We do not apply one office-product scoring formula to unrelated PC categories." },
  { title: "Separate claims from measurements", body: "Manufacturer specifications describe product design and stated capabilities. Third-party benchmarks are attributed and interpreted in context, including resolution, settings and test system where material. We do not combine unrelated tests into a controlled ranking or invent FPS, temperatures, noise or power figures." },
  { title: "State what we did", body: "Current PC Journal guides are research-based. They are not hands-on reviews. We use AI assistance for drafting and organization, and review published wording for factual support and clarity. We do not claim a lab, technical credentials or physical testing that has not been documented for an article." },
  { title: "Explain limits and trade-offs", body: "We describe why an option may fit, who should skip it, what must be checked before purchase and what evidence is missing. When evidence is too thin for a product ranking, we publish a decision guide instead." },
  { title: "Funding, updates and corrections", body: "Retail links may earn a commission when a publisher affiliate account is configured. Affiliate status does not establish product merit. Prices, firmware support and availability change; substantive updates should be reviewed against current sources. Readers can report errors through the publisher contact channel once it is configured for launch." },
];

export default function MethodologyPage() {
  return <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
    <p className="pc-section-kicker">Editorial policy</p><h1 className="mt-3 text-5xl font-semibold tracking-tight">How we research PC hardware</h1>
    <p className="mt-6 text-xl leading-relaxed">Our job is to make build and upgrade decisions clearer while showing where the evidence ends.</p>
    <div className="mt-12 space-y-10">{sections.map((section, index) => <section key={section.title} className="border-t border-border pt-7">
      <p className="font-mono text-xs text-brand">0{index + 1} / METHOD</p><h2 className="mt-2 text-2xl font-semibold">{section.title}</h2><p className="mt-3 leading-8">{section.body}</p>
    </section>)}</div>
  </article>;
}
