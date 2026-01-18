import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Shield, Lock, Eye, FileText, Calendar, AlertCircle, Globe, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | USVisaBridge",
  description: "Privacy policy for USVisaBridge - Learn how we collect, use, and protect your data. Designed with GDPR/CCPA principles.",
}

export default function PrivacyPage() {
  // Full 10-row comparison table
  const fullComparison = [
    {
      feature: "Explicit Consent",
      us: true,
      competitors: false,
      description: "We collect data only when you choose to provide it (signup, preferences, optional uploads)",
    },
    {
      feature: "Open Source",
      us: true,
      competitors: false,
      description: "100% open source code for transparency",
    },
    {
      feature: "Minimal PII",
      us: true,
      competitors: false,
      description: "Email only (for login + alerts). No passport numbers, IDs, or documents",
    },
    {
      feature: "No API Interception",
      us: true,
      competitors: false,
      description: "We don't intercept private API communications",
    },
    {
      feature: "No Automatic Screenshot Capture",
      us: true,
      competitors: false,
      description: "We never automatically capture screenshots. Users may upload screenshots manually (optional)",
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
      feature: "GDPR/CCPA Principles",
      us: true,
      competitors: false,
      description: "Designed with GDPR/CCPA principles (data minimization, deletion, access)",
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

        {/* TL;DR Box */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-primary/20">
          <div className="flex items-start gap-4 mb-4">
            <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
            <h2 className="text-2xl font-bold">TL;DR</h2>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">What we collect:</strong> Email, preferences, optional cropped calendar screenshots</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">What we never collect:</strong> Passport numbers, portal credentials, confirmation pages</span>
            </li>
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Screenshot handling:</strong> Calendar-only; user-initiated upload; retention rule</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Retention rule:</strong> Delete raw screenshots after verification or within 7 days, whichever is sooner; rejected deleted promptly</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">What we keep:</strong> Extracted availability fields + minimal moderation logs</span>
            </li>
            <li className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">User rights:</strong> Delete/export your data at any time</span>
            </li>
          </ul>
        </Card>

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

        {/* How We're Different */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">How We&apos;re Different</h2>
            <p className="text-muted-foreground">
              Our approach compared to high-risk patterns common in some tools
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Feature</TableHead>
                  <TableHead className="text-center">USVisaBridge</TableHead>
                  <TableHead className="text-center">High-risk patterns (common in some tools)</TableHead>
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
                        <span className="text-xs text-muted-foreground">Some tools may do this</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">We do not do this</span>
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

        {/* Screenshots */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <FileText className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Screenshots</h2>
              <p className="text-muted-foreground">
                How we handle user-uploaded calendar screenshots
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Screenshots (calendar-only) are optional and must be cropped to the appointment calendar only.</strong> Uploads should contain only the appointment calendar area.
            </p>
            <p>
              <strong className="text-foreground">We use screenshots to extract availability data and verify community reports.</strong> Uploads that contain personal identifiers (names, emails, confirmation numbers, passport numbers, barcodes, or receipts) may be rejected.
            </p>
            <p>
              <strong className="text-foreground">Retention:</strong> We delete raw screenshots after verification or within 7 days of upload (whichever is sooner). If a screenshot is rejected, we delete it promptly. You can request deletion of your uploaded screenshots at any time.
            </p>
            <p>
              <strong className="text-foreground">What we keep:</strong> Extracted availability fields (location, date range, timestamp, confidence) and minimal moderation logs for abuse prevention. No passports, confirmation pages, or visa portal credentials are stored.
            </p>
            <p>
              All screenshots are stored using industry-standard encryption and security measures. Only admins reviewing reports can access screenshots during the retention period.
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
              <strong className="text-foreground">Email & Preferences:</strong> We store your email address and U.S. visa preferences for as long as your alert is active. 
              If you delete your account or request data deletion, we will permanently remove 
              all your personal information within 30 days.
            </p>
            <p>
              <strong className="text-foreground">Extracted Data:</strong> Extracted availability fields (location, date range, timestamp, confidence) with no personal identifiers may be retained 
              for statistical purposes to improve the service. Raw screenshots are deleted according to our retention policy.
            </p>
            <p>
              <strong className="text-foreground">Export Format:</strong> Data export requests will be provided in JSON or CSV format within 30 days.
            </p>
            <p>
              All data is stored using industry-standard encryption and security measures.
            </p>
          </div>
        </Card>

        {/* Security & Abuse Prevention Logs */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Security & Abuse Prevention Logs</h2>
              <p className="text-muted-foreground">
                Minimal logging for security and abuse prevention
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We maintain minimal logs for security and abuse prevention purposes. These logs may include:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>IP addresses (anonymized/hashed) for rate limiting and abuse detection</li>
              <li>Timestamps of actions for security monitoring</li>
              <li>Minimal moderation logs for abuse prevention (no personal identifiers)</li>
            </ul>
            <p>
              These logs are retained only as long as necessary for security purposes and are not used for tracking or analytics.
            </p>
          </div>
        </Card>

        {/* Where Data is Processed */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Globe className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Where Data is Processed</h2>
              <p className="text-muted-foreground">
                Information about data processing locations
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Our service uses third-party service providers for hosting and data storage. Data may be processed in the United States and other jurisdictions where our service providers operate.
            </p>
            <p>
              We use Supabase for database hosting and Vercel for application hosting. These providers maintain industry-standard security measures and compliance certifications.
            </p>
            <p>
              By using our service, you acknowledge that your data may be transferred to and processed in jurisdictions outside your country of residence.
            </p>
          </div>
        </Card>

        {/* Changes to This Policy */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Clock className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                How we communicate policy updates
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
            <p>
              When we make material changes to this policy, we will:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Update the &quot;Last updated&quot; date at the top of this page</li>
              <li>Notify users via email if you have an active account</li>
              <li>Post a notice on our website for significant changes</li>
            </ul>
            <p>
              Your continued use of our service after any changes indicates your acceptance of the updated Privacy Policy.
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
            <h2 className="text-3xl font-bold">Designed with GDPR/CCPA Principles</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our U.S. visa appointment monitoring service is designed with privacy principles from the European Union&apos;s General Data Protection Regulation (GDPR) 
              and the California Consumer Privacy Act (CCPA). We implement data minimization, access rights, and deletion rights in our data processing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                <Check className="w-3 h-3 mr-1" />
                GDPR Principles
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                <Check className="w-3 h-3 mr-1" />
                CCPA Principles
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

