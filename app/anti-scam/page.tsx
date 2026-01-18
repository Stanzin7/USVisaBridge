import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, FileCheck, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AntiScamPage() {
  const resources = [
    {
      icon: Shield,
      title: "Verify Legitimacy",
      description: "How to identify legitimate U.S. visa appointment alert services",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      details: [
        "Legitimate services only need your email address",
        "Open source code that you can verify",
        "Clear privacy policies and terms of service",
        "No requests for passport numbers or credentials",
        "Free or transparent pricing",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Red Flags",
      description: "Warning signs of U.S. visa appointment scams and fraudulent services",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      details: [
        "Asking for passport numbers or personal documents",
        "Promising guaranteed appointments or visa approval",
        "Requiring government portal login credentials",
        "Demanding large upfront payments",
        "Intercepting API calls or capturing screenshots",
        "Collecting data without explicit consent",
        "No privacy policy or terms of service",
        "Closed-source or hidden code",
      ],
    },
    {
      icon: FileCheck,
      title: "Official Resources",
      description: "Links to official U.S. embassy and consulate appointment systems",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      details: [
        "Always book appointments through official government channels",
        "Verify any third-party service before sharing information",
        "Check embassy/consulate websites for official appointment systems",
        "Never share credentials with third-party services",
      ],
    },
    {
      icon: Users,
      title: "Report Scams",
      description: "How to report fraudulent U.S. visa services to authorities",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      details: [
        "Report to the relevant U.S. embassy or consulate",
        "File a complaint with the FTC (Federal Trade Commission)",
        "Contact your local consumer protection agency",
        "Report to your local law enforcement if you&apos;ve been defrauded",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">
            Security
          </Badge>
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Anti-Scam Toolkit</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect yourself from U.S. visa appointment fraud and scams
          </p>
        </div>

        {/* Critical Security Warning */}
        <Card className="p-8 mb-8 bg-card border-red-500/50 border-2">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-red-400">Critical Security Warning</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Never share your U.S. visa application portal credentials, passport numbers, or personal documents
                </strong>{" "}
                with any third-party service, including this one. We only need your email address to send alerts. Never share passwords, OTPs, passport numbers, or confirmation pages with any service.
              </p>
              <p className="text-sm text-muted-foreground">
                We will <strong className="text-foreground">never</strong> ask for your U.S. visa application login, passport
                details, or any government portal passwords.
              </p>
            </div>
          </div>
        </Card>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {resources.map((resource, i) => (
            <Card key={i} className="p-8 bg-card border-border">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${resource.bgColor} flex items-center justify-center shrink-0`}>
                    <resource.icon className={`w-6 h-6 ${resource.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {resource.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* How to Spot Legitimate Services */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border-emerald-500/20">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">How to Spot Legitimate Services</h2>
              <p className="text-muted-foreground">
                Signs that a U.S. visa appointment alert service is trustworthy
              </p>
            </div>
          </div>

          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span><strong className="text-foreground">Open Source:</strong> The code is publicly available for review</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span><strong className="text-foreground">Privacy Policy:</strong> Clear and transparent about data collection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span><strong className="text-foreground">No Credentials Required:</strong> Only asks for email address</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span><strong className="text-foreground">Free or Transparent Pricing:</strong> Clear about costs or free</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span><strong className="text-foreground">No Guarantees:</strong> Honest about what the service can and cannot do</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span><strong className="text-foreground">Legal Compliance:</strong> Designed with GDPR/CCPA principles (data minimization, deletion, access) and transparent about practices</span>
            </div>
          </div>
        </Card>

        {/* Official Resources */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <FileCheck className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Official U.S. Visa Resources</h2>
              <p className="text-muted-foreground">
                Always verify information through official channels
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              When booking U.S. visa appointments, always use official government channels:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Official U.S. Department of State visa application website</li>
              <li>U.S. embassy or consulate websites in your country</li>
              <li>Official appointment booking systems provided by the U.S. government</li>
            </ul>
            <p className="mt-4">
              <strong className="text-foreground">Remember:</strong> Never share your U.S. visa application credentials, 
              passport numbers, or personal documents with third-party services, even if they claim to be official.
            </p>
          </div>
        </Card>

        {/* Report Scams Section */}
        <Card className="p-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Users className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Report Scams</h2>
              <p className="text-muted-foreground">
                Help protect others by reporting fraudulent U.S. visa services
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>If you encounter a fraudulent U.S. visa appointment service:</p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Report to the relevant U.S. embassy or consulate in your country</li>
              <li>File a complaint with the FTC (Federal Trade Commission) at ftc.gov/complaint</li>
              <li>Contact your local consumer protection agency</li>
              <li>Report to local law enforcement if you&apos;ve been defrauded</li>
            </ul>
            <p className="mt-4">
              <strong className="text-foreground">Help protect others:</strong> By reporting scams, you help prevent 
              others from falling victim to fraudulent U.S. visa services.
            </p>
          </div>
        </Card>

        {/* Security Research CTA */}
        <Card className="p-8 mt-8 bg-gradient-to-br from-yellow-500/10 to-blue-500/10 border-yellow-500/20">
          <div className="text-center space-y-4">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto" />
            <h2 className="text-2xl font-bold">Security Research</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interested in technical analysis of risky patterns in third-party visa appointment tools? 
              Our security research provides educational insights into common security risks and how to protect yourself.
            </p>
            <Button variant="outline" asChild>
              <Link href="/security-research">
                View Security Research →
              </Link>
            </Button>
          </div>
        </Card>

        {/* Report Scam CTA */}
        <Card className="p-8 mt-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Have You Been Scammed?</h2>
            <p className="text-muted-foreground">
              If you believe you&apos;ve encountered a fraudulent U.S. visa appointment service, please report it 
              to help protect others. We also recommend reporting to official authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/report-scam">
                  Report a Scam →
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Us →
                </Link>
              </Button>
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

