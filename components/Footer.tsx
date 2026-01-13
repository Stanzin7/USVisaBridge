import Link from "next/link"

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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Legal Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact?subject=data-deletion" className="hover:text-foreground transition-colors">
                    Request Data Deletion
                  </Link>
                </li>
                <li>
                  <Link href="/contact?subject=data-access" className="hover:text-foreground transition-colors">
                    Request Data Access
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/yourusername/visa-slot-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <Link href="/contribute" className="hover:text-foreground transition-colors">
                    Contributing Guide
                  </Link>
                </li>
                <li>
                  <Link href="/license" className="hover:text-foreground transition-colors">
                    MIT License
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
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

