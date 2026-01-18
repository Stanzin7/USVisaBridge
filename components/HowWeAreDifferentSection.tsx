import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Github, Lock, Shield, Eye, Zap } from "lucide-react"

export function HowWeAreDifferentSection() {
  const differences = [
    {
      icon: Shield,
      title: "We don&apos;t intercept API calls",
      description: "We respect privacy and legal boundaries. We only monitor publicly available data without intercepting private communications.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Eye,
      title: "We don&apos;t capture screenshots",
      description: "We never capture screenshots of your personal information. We only collect de-identified slot availability data (personal identifiers removed).",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Lock,
      title: "We don&apos;t store credentials",
      description: "We never ask for or store passwords, security questions, or any login credentials. Your credentials remain yours alone.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Shield,
      title: "We don&apos;t collect PII",
      description: "We never collect personally identifiable information like email addresses, usernames, or portal IDs without explicit consent.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Check,
      title: "We ask permission first",
      description: "Every data collection requires your explicit consent. You control what data is shared and when.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Github,
      title: "We&apos;re 100% open source",
      description: "Our entire codebase is open source. You can inspect our code, verify our privacy practices, and contribute improvements.",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: Zap,
      title: "We&apos;re completely free",
      description: "Our service is 100% free forever. No pricing tiers, no hidden costs, no payment required.",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Ethical Alternative
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">How We&apos;re Different</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            The legal, ethical, and free alternative to privacy-violating visa slot trackers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differences.map((item, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border-emerald-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">Legal, Ethical, and Transparent</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              Unlike competitors who violate privacy laws, we&apos;re fully compliant with GDPR, CCPA, and all applicable regulations. 
              Our code is open source, our practices are transparent, and our service is completely free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
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
                100% Open Source
              </Badge>
              <Badge variant="secondary" className="bg-pink-500/10 text-pink-400 border-pink-500/20">
                <Check className="w-3 h-3 mr-1" />
                Free Forever
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

