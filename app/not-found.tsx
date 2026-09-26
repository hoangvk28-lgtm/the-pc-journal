import Link from "next/link";

export default function NotFound() {
  return <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
    <p className="pc-section-kicker">404 / Page not found</p>
    <h1 className="mt-4 text-5xl font-semibold tracking-tight">That page is not part of The PC Journal.</h1>
    <p className="mt-5 text-lg">The address may be incorrect, or the content may not be published here.</p>
    <div className="mt-8 flex flex-wrap gap-3"><Link prefetch={false} href="/" className="bg-brand px-5 py-3 font-semibold text-white">Go home</Link><Link prefetch={false} href="/guides" className="border border-border px-5 py-3 font-semibold text-ink">Browse PC guides</Link></div>
  </main>;
}

