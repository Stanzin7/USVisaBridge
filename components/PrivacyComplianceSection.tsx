import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Shield, Lock, Eye, FileText } from "lucide-react"
import Link from "next/link"

export function PrivacyComplianceSection() {
  const comparisonData = [
    {
      feature: "Explicit Consent",
      us: true,
      competitors: false,
      description: "We ask permission before collecting any data",
    },
    {
      feature: "Open Source",
      us: true,
      competitors: false,
      description: "100% open source code for transparency",
    },
    {
      feature: "No PII Collection",
      us: true,
      competitors: false,
      description: "We never collect personally identifiable information",
    },
    {
      feature: "No API Interception",
      us: true,
      competitors: false,
      description: "We don&apos;t intercept private API communications",
    },
    {
      feature: "No Screenshot Capture",
      us: true,
      competitors: false,
      description: "We never capture screenshots of your data",
    },
    {
      feature: "No Credential Storage",
      us: true,
      competitors: false,
      description: "We never ask for or store login credentials",
    },
    {
      feature: "Free",
      us: true,
      competitors: false,
      description: "100% free forever, no pricing tiers",
    },
    {
      feature: "GDPR Compliant",
      us: true,
      competitors: false,
      description: "Fully compliant with GDPR regulations",
    },
    {
      feature: "CCPA Compliant",
      us: true,
      competitors: false,
      description: "Fully compliant with CCPA regulations",
    },
    {
      feature: "Data Deletion",
      us: true,
      competitors: false,
      description: "Easy data deletion on request",
    },
  ]

  const complianceFeatures = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with EU General Data Protection Regulation",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Lock,
      title: "CCPA Compliant",
      description: "Full compliance with California Consumer Privacy Act",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Eye,
      title: "Transparent Practices",
      description: "Open source code and clear privacy policy",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: FileText,
      title: "Legal Compliance",
      description: "No unauthorized access or data interception",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Privacy & Compliance
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Privacy-First & Legally Compliant</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            We&apos;re fully compliant with GDPR, CCPA, and all applicable privacy regulations
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="p-8 mb-12 bg-card border-border">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Us vs. Competitors</h3>
            <p className="text-muted-foreground">
              See how we compare to privacy-violating alternatives
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Feature</TableHead>
                  <TableHead className="text-center">Us (Legal)</TableHead>
                  <TableHead className="text-center">Competitors (Illegal)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{row.feature}</div>
                        <div className="text-xs text-muted-foreground mt-1">{row.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {row.us ? (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          <Check className="w-3 h-3 mr-1" />
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                          <X className="w-3 h-3 mr-1" />
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.competitors ? (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          <Check className="w-3 h-3 mr-1" />
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                          <X className="w-3 h-3 mr-1" />
                          No
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Compliance Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {complianceFeatures.map((feature, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Legal Links */}
        <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 border-primary/20 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <Shield className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-2xl font-semibold">Your Privacy Rights</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              You have the right to access, modify, or delete your data at any time. 
              We&apos;re committed to transparency and legal compliance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/privacy"
                className="text-sm text-primary hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link
                href="/terms"
                className="text-sm text-primary hover:underline"
              >
                Terms of Service
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link
                href="/contact?subject=data-deletion"
                className="text-sm text-primary hover:underline"
              >
                Request Data Deletion
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link
                href="/contact?subject=data-access"
                className="text-sm text-primary hover:underline"
              >
                Request Data Access
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

