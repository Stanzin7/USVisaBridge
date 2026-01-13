import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Bug, ExternalLink } from "lucide-react"
import Link from "next/link"
import { CommunitySection } from "@/components/CommunitySection"

export default function ContributePage() {

  return (
    <main className="min-h-screen bg-background">
      {/* COMMUNITY SECTION */}
      <CommunitySection />

      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Contributing
          </Badge>
          <Github className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-balance">Contributing Guide</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you want to help, contributions can include code, documentation, reporting issues, or flagging unsafe or fraudulent visa services. Completely optional.
          </p>
          <p className="text-sm text-muted-foreground pt-2">
            You don&apos;t need GitHub to use USVisaBridge.
          </p>
        </div>

        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Contributing & Support</h2>
            <p className="text-muted-foreground">
              Find contribution instructions or ask questions using the links below.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/yourusername/visa-slot-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Contributing Guide on GitHub
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/yourusername/visa-slot-tracker/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  Open an Issue
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/yourusername/visa-slot-tracker/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Join Discussions
                </a>
              </Button>
            </div>
            <div className="pt-4">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Donations are optional; using the service is not affected.
          </p>
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

