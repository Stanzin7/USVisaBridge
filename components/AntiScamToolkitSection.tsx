import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, FileCheck, Users } from "lucide-react"
import Link from "next/link"

export function AntiScamToolkitSection() {
  const resources = [
    {
      icon: Shield,
      title: "Verify Legitimacy",
      description: "How to identify legitimate visa appointment monitoring services",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Red Flags",
      description: "Warning signs of visa appointment scams and fraudulent services",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: FileCheck,
      title: "Official Resources",
      description: "Links to official embassy and consulate appointment systems",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Users,
      title: "Report Scams",
      description: "How to report fraudulent visa services to authorities",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="p-8 bg-card border-red-500/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">Critical Security Warning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Never share your U.S. visa application portal credentials, passport numbers, or personal documents
                  </strong>{" "}
                  with any third-party service, including this one. Legitimate U.S. visa appointment monitoring services only need
                  your email address to send alerts. Any service asking for sensitive credentials is likely fraudulent.
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  We will <strong className="text-foreground">never</strong> ask for your U.S. visa application login, passport
                  details, or any government portal passwords.
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <Button variant="outline" asChild>
                  <Link href="/anti-scam">
                    Anti-scam toolkit →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
