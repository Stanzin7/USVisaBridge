import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function DS160Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* Not Affiliated Banner */}
        <Card className="p-6 mb-8 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Not Affiliated with the U.S. Government</h3>
              <p className="text-sm text-muted-foreground">
                USVisaBridge is an independent, open-source project. We are not affiliated with, endorsed by, or connected to the U.S. Department of State, U.S. embassies, or any government agency.
              </p>
            </div>
          </div>
        </Card>

        {/* Scope Disclaimer Banner */}
        <Card className="p-4 mb-8 bg-yellow-500/10 border-yellow-500/30 border-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Scope & Disclaimer:</strong> USVisaBridge provides community availability sightings and educational tools. We do not provide legal advice. We do not submit DS-160 forms or book appointments on your behalf. You must complete and submit all forms yourself through official U.S. government channels.
            </p>
          </div>
        </Card>

        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            DS-160 Assistant
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">DS-160 Form Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Coming soon: Tools to help you prepare your DS-160 application
          </p>
        </div>

        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <FileText className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Feature Coming Soon</h2>
            <p className="text-muted-foreground">
              We&apos;re working on tools to help you prepare your DS-160 form. This will include form guidance, 
              document checklists, and educational resources.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Remember:</strong> You will submit the DS-160 yourself on the official CEAC website.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

