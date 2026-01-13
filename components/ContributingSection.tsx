import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Code, FileText, GitBranch, CheckCircle2, ExternalLink } from "lucide-react"

export function ContributingSection() {
  // TODO: Update with actual GitHub repository URL
  const githubRepo = "https://github.com/yourusername/visa-slot-tracker"
  const contributingGuide = `${githubRepo}/blob/main/CONTRIBUTING.md`
  const codeOfConduct = `${githubRepo}/blob/main/CODE_OF_CONDUCT.md`

  const steps = [
    {
      number: "1",
      title: "Fork the Repository",
      description: "Start by forking our GitHub repository to your account.",
    },
    {
      number: "2",
      title: "Create a Branch",
      description: "Create a feature branch for your changes.",
    },
    {
      number: "3",
      title: "Make Your Changes",
      description: "Write code, fix bugs, or improve documentation.",
    },
    {
      number: "4",
      title: "Submit a Pull Request",
      description: "Open a pull request with a clear description of your changes.",
    },
  ]

  const contributionTypes = [
    {
      icon: Code,
      title: "Code",
      description: "Fix bugs, implement features, improve performance",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Improve docs, fix typos, add examples",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: GitBranch,
      title: "Design",
      description: "Improve UI/UX, design new features",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: CheckCircle2,
      title: "Testing",
      description: "Add tests, improve test coverage",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Contributing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">We Welcome Contributions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Help make visa appointment tracking more accessible, ethical, and transparent
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {steps.map((step, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all text-center"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contributionTypes.map((type, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-xl ${type.bgColor} flex items-center justify-center`}>
                  <type.icon className={`w-6 h-6 ${type.color}`} />
                </div>
                <h3 className="font-semibold">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 bg-card border-border">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Contributing Guide</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Read our detailed contributing guide to learn about our development process, coding standards, and workflow.
                </p>
                <Button variant="outline" asChild>
                  <a href={contributingGuide} target="_blank" rel="noopener noreferrer">
                    Read Guide
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Code of Conduct</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We&apos;re committed to providing a welcoming and inclusive environment for all contributors.
                </p>
                <Button variant="outline" asChild>
                  <a href={codeOfConduct} target="_blank" rel="noopener noreferrer">
                    Read Code of Conduct
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 mt-12 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Github className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-2xl font-semibold">Ready to Contribute?</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every contribution, no matter how small, makes a difference. Join us in building the most 
              ethical and transparent visa slot tracking tool.
            </p>
            <Button size="lg" className="mt-4" asChild>
              <a href={githubRepo} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Get Started on GitHub
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

