import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Users, GitBranch, Heart, MessageSquare, Code, Star, Eye } from "lucide-react"
import Link from "next/link"
import { DONATION_URL } from "@/lib/config/links"

export function CommunitySection() {
  // TODO: Update with actual GitHub repository URL
  const githubRepo = "https://github.com/yourusername/visa-slot-tracker"
  const githubIssues = `${githubRepo}/issues`
  const githubDiscussions = `${githubRepo}/discussions`

  const values = [
    {
      icon: Eye,
      label: "Transparent",
      description: "All code is open and visible",
      color: "text-blue-400",
    },
    {
      icon: Code,
      label: "Open Source",
      description: "Free to use and modify",
      color: "text-emerald-400",
    },
    {
      icon: Users,
      label: "Community-Built",
      description: "Developed by volunteers",
      color: "text-purple-400",
    },
    {
      icon: Heart,
      label: "Mission-Driven",
      description: "Free and ethical by design",
      color: "text-pink-400",
    },
  ]

  const waysToContribute = [
    {
      icon: Code,
      title: "Help With Code",
      description: "Fix bugs, add features, or improve documentation. All skill levels welcome.",
      link: githubRepo,
      linkText: "Browse Code",
    },
    {
      icon: MessageSquare,
      title: "Report an Issue",
      description: "Found something that doesn&apos;t work? Let us know and we&apos;ll look into it.",
      link: githubIssues,
      linkText: "Report Issue",
    },
    {
      icon: Users,
      title: "Share Ideas",
      description: "Have suggestions or questions? Join our community discussions.",
      link: githubDiscussions,
      linkText: "Join Discussion",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Community
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Built by the Community, for the Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            This is an open-source project, which means anyone can see how it works and help improve it. 
            You don&apos;t need to be a developer to use our service — contributions are completely optional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all text-center"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`}>
                  <value.icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <div>
                  <div className="text-lg font-semibold mb-1">{value.label}</div>
                  <div className="text-sm text-muted-foreground">{value.description}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {waysToContribute.map((way, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <way.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{way.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{way.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={way.link} target="_blank" rel="noopener noreferrer">
                      {way.linkText}
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-pink-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold">Support the Mission</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              USVisaBridge exists to help applicants avoid scams and unsafe visa &apos;tracker&apos; services.
              <br />
              This project started after I was scammed during my own visa process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="default" asChild>
                <a href={DONATION_URL} target="_blank" rel="noopener noreferrer">
                  Support the project
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contribute">
                  Contribute code or ideas
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-2 max-w-xl mx-auto">
              Donations are optional. Using the service is not affected.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

