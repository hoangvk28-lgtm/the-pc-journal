import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: "Privacy information for The PC Journal.", path: "/privacy-policy" });
export default function PrivacyPolicyPage() {
  return <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <p className="pc-section-kicker">Site information</p><h1 className="mt-3 text-4xl font-semibold">Privacy policy</h1>
    <p className="mt-7 leading-8">The PC Journal operates at thepcjournal.com. This site may process standard server request data, such as IP address, user agent and requested pages, for delivery and security. Hosting providers may keep their own access logs under their policies.</p>
    <h2 className="mt-9 text-2xl font-semibold">Analytics and cookies</h2><p className="mt-3 leading-8">The cloned site&apos;s analytics identifier has been removed. Analytics is inactive unless a new property is configured for this publication. Administrative sign-in may use a session cookie when the admin area is enabled.</p>
    <h2 className="mt-9 text-2xl font-semibold">External links</h2><p className="mt-3 leading-8">Links to retailers and other websites are governed by those sites&apos; privacy policies. The PC Journal does not control their data practices.</p>
    <h2 className="mt-9 text-2xl font-semibold">Contact</h2><p className="mt-3 leading-8">A dedicated publisher contact address and data request process must be configured before public launch. This page should be reviewed against the final hosting, analytics and form setup.</p>
  </article>;
}


