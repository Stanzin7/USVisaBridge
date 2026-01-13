import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Starter Plan */}
          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Email alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Monitor 1 visa type</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Continuous availability tracking</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">
                Get Started
              </Button>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 bg-card border-primary/50 hover:border-primary transition-all relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
              Most Popular
            </Badge>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Email + SMS alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Monitor up to 3 visa types</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Enhanced availability tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Priority alerts</span>
                </li>
              </ul>
              <Button className="w-full">Upgrade to Pro</Button>
            </div>
          </Card>

          {/* Plus Plan */}
          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Plus</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$25</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">All alert channels</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited visa types</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Real-time availability tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">
                Upgrade to Plus
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            All plans provide alerts only. We do not book appointments or access government systems.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            Cancel anytime · No long-term contracts · Full refund within 7 days
          </p>
        </div>
      </div>
    </section>
  )
}
