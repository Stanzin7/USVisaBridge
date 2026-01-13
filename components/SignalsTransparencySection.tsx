import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function SignalsTransparencySection() {
  const usedSignals = [
    "Visa appointment availability",
    "Embassy location data",
    "Appointment date ranges",
    "Visa category information",
    "Public consulate schedules",
  ]

  const neverAccessed = [
    "Passport numbers or personal IDs",
    "Government portal credentials",
    "Payment information",
    "Personal documents or photos",
    "Immigration case details",
    "Social security numbers",
  ]

  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Complete Transparency</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Know exactly what data we use and what we never touch
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* What We Use */}
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
              {usedSignals.map((signal, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{signal}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* What We Never Access */}
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
              {neverAccessed.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
