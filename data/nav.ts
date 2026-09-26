export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const departmentNav = [
  { label: "Components", href: "/topics/components", description: "CPUs, graphics cards, memory, storage and power" },
  { label: "PC Builds", href: "/topics/pc-builds", description: "Plan a complete system for your workload" },
  { label: "Upgrades", href: "/topics/upgrades", description: "Improve the PC you already own" },
  { label: "Monitors", href: "/topics/monitors", description: "Displays for work and games" },
  { label: "Peripherals", href: "/topics/peripherals", description: "Input devices and useful setup gear" },
];
export const secondaryNav = [{ label: "Guides", href: "/guides" }, { label: "Methodology", href: "/how-we-review" }];
export const companyNav = [
  { label: "About", href: "/about-the-pc-journal" },
  { label: "Methodology", href: "/how-we-review" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy", href: "/privacy-policy" },
];
export const mainNav: NavItem[] = departmentNav.map(({ label, href }) => ({ label, href }));
export const footerNav = { categories: departmentNav.map(({ label, href }) => ({ label, href })), company: companyNav.slice(0, 2), legal: companyNav.slice(2) };
