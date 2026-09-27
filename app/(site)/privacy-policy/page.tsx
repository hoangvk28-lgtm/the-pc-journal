import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: "What data The PC Journal processes, how affiliate links and cookies work on this site, and how to contact us about privacy requests.", path: "/privacy-policy" });
export default function PrivacyPolicyPage() {
  return <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <p className="pc-section-kicker">Site information</p><h1 className="mt-3 text-4xl font-semibold">Privacy policy</h1>
    <p className="mt-7 leading-8">The PC Journal operates at www.thepcjournal.com. This page explains what information is processed when you visit the site and the choices you have.</p>
    <h2 className="mt-9 text-2xl font-semibold">Information we process</h2>
    <p className="mt-3 leading-8">We do not ask you to create an account or submit personal information to read the site. Like most websites, our hosting provider processes standard request data, such as IP address, browser type and the pages requested, to deliver pages and protect the site. Hosting providers may keep access logs under their own policies.</p>
    <h2 className="mt-9 text-2xl font-semibold">Analytics and cookies</h2>
    <p className="mt-3 leading-8">The PC Journal does not currently set advertising or analytics cookies. If we add an analytics service in future, such as Google Analytics, we will update this page to name it and describe what it collects before it goes live.</p>
    <h2 className="mt-9 text-2xl font-semibold">Affiliate links</h2>
    <p className="mt-3 leading-8">Some links to retailers, including Amazon, are affiliate links. When you click one, the retailer may set its own cookies to record that the visit came from The PC Journal. Those cookies and any purchase you make are governed by the retailer&apos;s privacy policy, not ours.</p>
    <h2 className="mt-9 text-2xl font-semibold">External links</h2>
    <p className="mt-3 leading-8">Links to other websites are governed by those sites&apos; privacy policies. The PC Journal does not control their data practices.</p>
    <h2 className="mt-9 text-2xl font-semibold">Contact and requests</h2>
    <p className="mt-3 leading-8">For privacy questions or data requests, email <a href="mailto:contact@thepcjournal.com" className="underline underline-offset-2">contact@thepcjournal.com</a>. We will reply as soon as we can.</p>
  </article>;
}
