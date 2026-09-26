import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, TWITTER_HANDLE } from "@/lib/seo";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTopButton } from "@/components/BackToTopButton";

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/pc-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/pc-apple-icon.png", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE } : {}),
  },
  robots: {
    index: process.env.SITE_LAUNCHED === "true",
    follow: process.env.SITE_LAUNCHED === "true",
    googleBot: { index: process.env.SITE_LAUNCHED === "true", follow: process.env.SITE_LAUNCHED === "true" },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to this site's own Search Console token.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Analytics must only fire in production so local development does not pollute
  // the site's reports. The GA measurement ID is public and belongs to this site.
  const isProd = process.env.NODE_ENV === "production";
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <html lang="en" className="h-full">
      <head>
        {isProd && GOOGLE_ANALYTICS_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}');
            `}} />
          </>
        )}
        {isProd && clarityId && (
          <script dangerouslySetInnerHTML={{ __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}} />
        )}
      </head>
      <body className="antialiased">
        <ScrollToTop />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}



