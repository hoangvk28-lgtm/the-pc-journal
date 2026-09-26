import { isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  HomepageSettings,
  GlobalSettings,
  AffiliateSettings,
  FooterSettings,
} from "@/lib/site-settings-store";

// ── Defaults - match current hardcoded website copy ──────────────────────────

export const DEFAULT_HOMEPAGE_SETTINGS: HomepageSettings = {
  hero: {
    eyebrow: "Home Office Guides",
    headline: "Create a workspace",
    headlineAccent: "you love working in.",
    subtitle:
      "Thoughtful home office guides, workspace ideas, and carefully selected products for calmer, more comfortable workdays.",
    primaryCtaText: "Explore Workspace Guides",
    primaryCtaHref: "/guide",
    secondaryCtaText: "How We Review",
    secondaryCtaHref: "/how-we-review",
    searchPlaceholder: "What are you setting up? Chairs, desks, lighting, monitor arms…",
    badgeText: "Independent recommendations. Clear trade-offs. No paid rankings.",
    heroImageUrl: "",
    heroImageAlt: "",
    featuredProductSlugs: [],
  },
  trustBar: {
    items: [
      { number: "14", unit: "products", label: "Evaluated for real home offices", description: "Every product scored on five criteria - specs, buyer feedback, value, build, and comfort." },
      { number: "6", unit: "buying guides", label: "With side-by-side comparisons", description: "Practical recommendations built around real workspace constraints." },
      { number: "5", unit: "scoring criteria", label: "Tuned for daily comfort", description: "Comfort, build quality, ease of setup, value, and buyer feedback - all weighted for people who work at this desk every day." },
      { number: "1–10", unit: "score scale", label: "Consistent across all products", description: "The same rubric for every product we evaluate - so scores are genuinely comparable across guides." },
    ],
  },
  featuredGuideSlug: "desk-lamps-small-desks",
  sections: {
    guides: {
      title: "Popular Guides",
      description: "Carefully evaluated product comparisons for better home workdays - no padding, just our honest picks.",
      limit: 6,
      featuredSlugs: [
        "best-monitor-arms",
        "ergonomic-desk-setup",
        "best-office-chair-under-100",
        "best-standing-desk-under-500",
        "small-desk-organization-ideas",
        "best-desk-lamp-under-30",
      ],
    },
    deals: {
      title: "Editor Picks",
      description: "Products worth checking right now, curated by value score.",
    },
    categories: {
      title: "Build Your Setup",
      description: "Desk, chair, monitor, lighting, accessories - find the piece you need next.",
    },
  },
  newsletter: {
    enabled: true,
    eyebrow: "The Cocoon",
    title: "One workspace upgrade every week.",
    description:
      "A workspace idea, a productivity tip, and a product worth seeing - no spam, no sponsored content, no fluff.",
    inputPlaceholder: "you@example.com",
    buttonText: "Notify me",
    disclaimer: "No account required. Unsubscribe anytime. We'll never share your email.",
  },
};

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  siteName: "The PC Journal",
  siteTagline: "A Calmer Way to Work at Home",
  header: {
    logoText: "The PC Journal",
    showDealsButton: true,
    dealsButtonText: "Today's Deals",
  },
};

export const DEFAULT_AFFILIATE_SETTINGS: AffiliateSettings = {
  disclosureShort:
    "The PC Journal earns a small commission on qualifying Amazon purchases at no extra cost to you.",
  disclosureFull:
    "The PC Journal is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click a product link and make a purchase, we may earn a small commission at no additional cost to you. Our editorial opinions are independent and are never influenced by affiliate relationships.",
  disclosureBannerText:
    "We may earn a commission when you buy through Amazon links. Our recommendations are based on product specs, buyer feedback, use cases, and clear comparison criteria.",
  amazonTag: "", // TODO: replace with the real Amazon Associates tag once approved for this domain
};

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  description:
    "Research-based guidance for PC builds and upgrades.",
  copyrightText: "The PC Journal. All rights reserved.",
  showAffiliateDisclosure: true,
};

// ── Public helpers with fallback ──────────────────────────────────────────────

async function safeFetch<T>(fetcher: () => Promise<T | null>, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    const result = await fetcher();
    return result ?? fallback;
  } catch (e) {
    console.warn("[public-settings] Supabase error:", (e as Error).message);
    return fallback;
  }
}

export async function getPublicHomepageSettings(): Promise<HomepageSettings> {
  const { getHomepageSettings } = await import("@/lib/site-settings-store");
  return safeFetch(getHomepageSettings, DEFAULT_HOMEPAGE_SETTINGS);
}

export async function getPublicGlobalSettings(): Promise<GlobalSettings> {
  const { getGlobalSettings } = await import("@/lib/site-settings-store");
  return safeFetch(getGlobalSettings, DEFAULT_GLOBAL_SETTINGS);
}

export async function getPublicAffiliateSettings(): Promise<AffiliateSettings> {
  const { getAffiliateSettings } = await import("@/lib/site-settings-store");
  return safeFetch(getAffiliateSettings, DEFAULT_AFFILIATE_SETTINGS);
}

export async function getPublicFooterSettings(): Promise<FooterSettings> {
  const { getFooterSettings } = await import("@/lib/site-settings-store");
  return safeFetch(getFooterSettings, DEFAULT_FOOTER_SETTINGS);
}

