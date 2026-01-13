import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Code, GitBranch, Eye, CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"

export function OpenSourceSection() {
  // TODO: Update these with your actual GitHub repository URL
  const githubRepo = "https://github.com/yourusername/visa-slot-tracker"
  const contributingGuide = `${githubRepo}/blob/main/CONTRIBUTING.md`
  const licenseUrl = `${githubRepo}/blob/main/LICENSE`

  const benefits = [
    {
      icon: Eye,
      title: "Full Transparency",
      description: "Inspect our code, verify our privacy practices, and see exactly how we protect your data.",
    },
    {
      icon: Code,
      title: "Auditable Code",
      description: "Security researchers and privacy advocates can review our implementation to ensure compliance.",
    },
    {
      icon: GitBranch,
      title: "Community Contributions",
      description: "Help improve the project. Report issues, suggest features, or submit pull requests.",
    },
    {
      icon: CheckCircle2,
      title: "No Hidden Agendas",
      description: "Open source means no secret data collection, no hidden functionality, and complete transparency.",
    },
  ]

  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Open Source
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">100% Open Source</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Inspect our code. Verify our privacy practices. Contribute improvements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Github className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">View Our Code on GitHub</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Everything is open source. Review our implementation, audit our privacy practices, 
                and see how we ensure legal compliance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href={githubRepo} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <a href={contributingGuide} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Contributing Guide
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Licensed under{" "}
                <a
                  href={licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  MIT License
                </a>
                {" "}· Free for commercial and personal use
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

