import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Shield, Lock, Eye, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  // Full 10-row comparison table
  const fullComparison = [
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
      description: "We don't intercept private API communications",
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

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Privacy & Compliance
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Last updated: January 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              At USVisaBridge, we are committed to protecting your privacy and ensuring transparency 
              in how we handle your data. This Privacy Policy explains what information we collect, 
              how we use it, and your rights regarding your personal data.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are a 100% open-source project, which means you can review our code to verify our 
              privacy practices at any time.
            </p>
          </div>
        </Card>

        {/* Full Comparison Table */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Us vs. Competitors</h2>
            <p className="text-muted-foreground">
              Complete comparison with high-risk, non-transparent alternatives
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Feature</TableHead>
                  <TableHead className="text-center">Us (Legal & Transparent)</TableHead>
                  <TableHead className="text-center">Competitors (High-risk / Non-transparent)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fullComparison.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <div>{row.feature}</div>
                      <div className="text-xs text-muted-foreground mt-1">{row.description}</div>
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

        {/* Information We Collect */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Eye className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect minimal information necessary to provide our U.S. visa appointment monitoring service
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Information You Provide</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Email Address:</strong> Used only to send you U.S. visa appointment availability notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Visa Preferences:</strong> U.S. visa type, embassy/consulate location, and date range preferences for alerts</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Information We Never Collect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Passport numbers or personal identification documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>U.S. visa application credentials or passwords</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Payment information</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Social security numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Immigration case details</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Screenshots of your personal information</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* How We Use Information */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use your information only for U.S. visa appointment monitoring
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Send Notifications:</strong> To alert you when U.S. visa appointment slots become available based on your preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Improve Service:</strong> To analyze anonymous usage patterns and improve our U.S. visa appointment monitoring service (no personal data included)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Legal Compliance:</strong> To comply with applicable laws and regulations</span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">We never:</strong> Sell your data, share it with third parties for marketing, 
              or use it for any purpose other than providing the U.S. visa appointment monitoring service.
            </p>
          </div>
        </Card>

        {/* Data Storage and Retention */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Calendar className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Data Storage and Retention</h2>
              <p className="text-muted-foreground">
                We retain your data only as long as necessary for U.S. visa appointment monitoring
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We store your email address and U.S. visa preferences for as long as your alert is active. 
              If you delete your account or request data deletion, we will permanently remove 
              all your personal information within 30 days.
            </p>
            <p>
              Anonymized U.S. visa appointment availability data (with no personal identifiers) may be retained 
              for statistical purposes to improve the service.
            </p>
            <p>
              All data is stored using industry-standard encryption and security measures.
            </p>
          </div>
        </Card>

        {/* Your Rights */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Lock className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Privacy Rights</h2>
              <p className="text-muted-foreground">
                You have full control over your personal data
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Right to Access</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You can request a copy of all personal data we have about you.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact?subject=data-access">
                  Request Data Access →
                </Link>
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Right to Deletion</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You can request deletion of all your personal data at any time.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact?subject=data-deletion">
                  Request Data Deletion →
                </Link>
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Right to Correction</h3>
              <p className="text-sm text-muted-foreground">
                You can update your email address and U.S. visa preferences at any time through your account settings.
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Right to Withdraw Consent</h3>
              <p className="text-sm text-muted-foreground">
                You can unsubscribe from notifications or delete your account at any time.
              </p>
            </div>
          </div>
        </Card>

        {/* GDPR & CCPA Compliance */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 border-primary/20">
          <div className="text-center space-y-6">
            <Shield className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-3xl font-bold">GDPR & CCPA Compliant</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We are fully compliant with the European Union&apos;s General Data Protection Regulation (GDPR) 
              and the California Consumer Privacy Act (CCPA). All data processing for U.S. visa appointment 
              monitoring is conducted in accordance with these regulations.
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

        {/* Contact */}
        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Questions About Privacy?</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Us →
              </Link>
            </Button>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

