import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Database, Clock, Shield, Eye } from "lucide-react"

export function TransparencyDashboardSection() {
  const whatWeMonitor = [
    "Visa appointment availability (public data only)",
    "Embassy location data (public information)",
    "Appointment date ranges (public schedules)",
    "Visa category information (public classifications)",
    "Public consulate schedules (available to all)",
  ]

  const whatWeNeverAccess = [
    "Passport numbers or personal IDs",
    "Government portal credentials",
    "Payment information",
    "Personal documents or photos",
    "Immigration case details",
    "Social security numbers",
    "Email addresses (without explicit consent)",
    "Usernames or portal IDs",
    "Screenshots of personal information",
  ]

  const dataPolicies = [
    {
      icon: Clock,
      title: "Data Retention",
      description: "We automatically delete data after 30 days. You can request immediate deletion at any time.",
    },
    {
      icon: Shield,
      title: "Explicit Consent",
      description: "We only collect data with your explicit opt-in consent. You can withdraw consent anytime.",
    },
    {
      icon: Database,
      title: "Data Minimization",
      description: "We only collect the minimum data necessary for our service. No PII, no credentials, no unnecessary data.",
    },
    {
      icon: Eye,
      title: "Right to Access",
      description: "You can request a copy of all data we have about you. We'll provide it in a machine-readable format.",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Transparency
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Complete Transparency</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Know exactly what data we collect, how we use it, and how you can control it
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-card border-emerald-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold">What We Monitor</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We only access public, non-sensitive information to monitor appointment availability:
            </p>
            <ul className="space-y-3">
              {whatWeMonitor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 bg-card border-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold">What We Never Access</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your sensitive personal information is completely off-limits:
            </p>
            <ul className="space-y-3">
              {whatWeNeverAccess.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dataPolicies.map((policy, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <policy.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{policy.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 border-primary/20 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Shield className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-2xl font-semibold">Your Privacy, Your Control</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              You have the right to access, modify, or delete your data at any time. 
              Contact us if you have questions about your data or our privacy practices.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                <Check className="w-3 h-3 mr-1" />
                GDPR Compliant
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                <Check className="w-3 h-3 mr-1" />
                CCPA Compliant
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                <Check className="w-3 h-3 mr-1" />
                Open Source
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

