/**
 * Named authors shown on Buying Guides. Bios stay factual: no hands-on testing, credential or
 * years-of-experience claims. Research-based guides describe what the editor compared.
 */
export interface Author {
  slug: string;
  name: string;
  role: string;
  /** One-sentence byline-box bio. */
  shortBio: string;
  /** Longer author-page bio. */
  bio: string;
  topics: string[];
  /** Initials avatar is rendered when no photo is set. */
  photo?: string;
}

export const AUTHORS: Record<string, Author> = {
  "alex-morgan": {
    slug: "alex-morgan",
    name: "Alex Morgan",
    role: "PC Hardware Editor",
    shortBio:
      "Alex covers PC hardware, monitors, components, upgrades and peripherals for The PC Journal, with a focus on helping readers understand specifications, compatibility and meaningful product trade-offs.",
    bio:
      "Alex Morgan is the PC Hardware Editor at The PC Journal, covering monitors, graphics cards, processors, PC components, peripherals, upgrades and compatibility. For research-based buying guides, Alex compares manufacturer specifications, connectivity, warranty terms, compatibility requirements and, where available, independent test findings, which are attributed to the outlet that measured them.",
    topics: ["Monitors", "Graphics cards", "Processors", "PC components", "Peripherals", "Upgrades and compatibility"],
  },
};

export const DEFAULT_GUIDE_AUTHOR = AUTHORS["alex-morgan"];

export const authorHref = (a: Author) => `/author/${a.slug}`;
