// Navigation link definitions - single source of truth for site navigation

export type NavLink = {
  href: string
  label: string
  external?: boolean
  badge?: "Coming Soon"
}

// Logged-out top navigation links
export const PUBLIC_NAV_LOGGED_OUT: NavLink[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/anti-scam", label: "Anti-scam" },
  { href: "/faq", label: "FAQ" },
  { href: "/security-research", label: "Security research" },
]

// Logged-in top navigation links (main items)
export const PUBLIC_NAV_LOGGED_IN: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/preferences", label: "Alerts" },
  { href: "/reports", label: "Submit report" },
]

// Help dropdown links (for logged-in users)
export const PUBLIC_NAV_HELP: NavLink[] = [
  { href: "/faq", label: "FAQ" },
  { href: "/anti-scam", label: "Anti-scam" },
  { href: "/report-scam", label: "Report a scam" },
  { href: "/contact", label: "Contact" },
  { href: "/security-research", label: "Security research" },
]

// Footer link groups
export type FooterLinkGroup = {
  title: string
  links: NavLink[]
}

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/faq", label: "FAQ" },
      { href: "/ds-160", label: "DS-160 (Coming Soon)" },
    ],
  },
  {
    title: "Safety",
    links: [
      { href: "/anti-scam", label: "Anti-scam" },
      { href: "/report-scam", label: "Report a scam" },
      { href: "/security-research", label: "Security research" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/contact?subject=data-deletion", label: "Request Data Deletion" },
      { href: "/contact?subject=data-access", label: "Request Data Access" },
    ],
  },
  {
    title: "Open source",
    links: [
      { href: "https://github.com/yourusername/visa-slot-tracker", label: "GitHub Repository", external: true },
      { href: "/contribute", label: "Contributing" },
      { href: "/license", label: "License" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

