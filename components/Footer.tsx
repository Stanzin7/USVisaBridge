import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FOOTER_LINK_GROUPS } from "@/lib/navigation"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-muted/20 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-semibold" style={{ letterSpacing: '-0.01em' }}>
                  <span className="text-foreground">USVisa</span>
                  <span className="text-primary">Bridge</span>
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free alerts for U.S. visa appointments. No passwords. No fees.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="font-semibold text-foreground">{group.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors inline-flex items-center gap-2"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="hover:text-foreground transition-colors inline-flex items-center gap-2"
                        >
                          {link.label}
                          {link.badge === "Coming Soon" && (
                            <Badge variant="secondary" className="text-xs">
                              Coming Soon
                            </Badge>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © 2025 USVisaBridge
            </p>
            <p className="text-center md:text-right">
              Not affiliated with the U.S. Government.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

