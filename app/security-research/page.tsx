import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Lock, Eye, FileText, ExternalLink, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Research | USVisaBridge",
  description: "Educational security research on risky patterns in third-party visa appointment tools. Learn how to protect yourself and identify potential security risks.",
}

export default function SecurityResearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 mb-4">
            Educational Research
          </Badge>
          <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Security Research</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technical analysis of risky patterns in third-party visa appointment tools
          </p>
        </div>

        {/* Not Affiliated Banner */}
        <Card className="p-6 mb-8 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Not Affiliated with the U.S. Government</h3>
              <p className="text-sm text-muted-foreground">
                USVisaBridge is an independent, open-source project. We are not affiliated with, endorsed by, or connected to the U.S. Department of State, U.S. embassies, or any government agency.
              </p>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-8 mb-8 bg-card border-yellow-500/20 border-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Important Disclaimer</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span><strong className="text-foreground">Educational purposes only, not legal advice:</strong> This research is provided for educational and security awareness purposes. It is not legal advice and should not be used as the basis for legal action.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span><strong className="text-foreground">Version-specific findings; tools may change:</strong> Our analysis reflects patterns observed in specific versions of tools at the time of research. Tools may change over time, and our findings may not reflect current versions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span><strong className="text-foreground">We focus on risky patterns; we do not publish accusations:</strong> We document observed patterns and potential risks. We do not make accusations against specific companies or services.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span><strong className="text-foreground">We welcome corrections:</strong> If you believe any information here is inaccurate or outdated, please contact us so we can update our research.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Observed Risky Patterns */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Observed Risky Patterns</h2>
              <p className="text-muted-foreground">
                Evidence-based analysis of patterns observed in some third-party visa appointment tools
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-400" />
                Credential Storage Patterns
              </h3>
              <p className="text-muted-foreground mb-3">
                Some tools appear to request and store U.S. visa application portal credentials (username and password). This pattern could increase security risks:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Credentials stored in third-party systems could increase breach risk</li>
                <li>If a service is compromised, attackers could gain access to government portal accounts</li>
                <li>Users may lose control over who can access their accounts</li>
                <li>This pattern may not align with security best practices</li>
              </ul>
            </div>

            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-400" />
                API Interception Patterns
              </h3>
              <p className="text-muted-foreground mb-3">
                Some tools appear to intercept and monitor API communications between browsers and government servers:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>API requests and responses may be logged and analyzed</li>
                <li>Sensitive data transmitted through APIs could be captured</li>
                <li>This pattern could create a single point of failure for data security</li>
                <li>May not align with user privacy expectations</li>
              </ul>
            </div>

            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-400" />
                Automatic Screenshot Capture Patterns
              </h3>
              <p className="text-muted-foreground mb-3">
                Some tools may automatically capture screenshots of browser sessions or applications:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Screenshots may capture sensitive information without explicit user awareness</li>
                <li>Personal data, confirmation numbers, or other identifiers could be captured</li>
                <li>Users may not be fully aware when screenshots are taken</li>
                <li>Stored screenshots could create long-term data retention risks</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* How to Protect Yourself */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">How to Protect Yourself</h2>
              <p className="text-muted-foreground">
                Steps you can take to stay safe when using third-party tools
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Password Hygiene</h3>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Never share your government portal credentials with any third-party service</li>
                <li>Use strong, unique passwords for your visa application accounts</li>
                <li>Enable two-factor authentication if available</li>
                <li>Regularly review your account activity for unauthorized access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Uninstall Steps</h3>
              <p className="text-muted-foreground mb-3">
                If you&apos;ve installed a tool that requests credentials or intercepts APIs:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Immediately change your government portal password</li>
                <li>Uninstall the tool or browser extension</li>
                <li>Clear browser cache and cookies</li>
                <li>Review your account for any unauthorized changes</li>
                <li>Consider using a password manager to generate new secure passwords</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Report Channels</h3>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Report security concerns to the relevant U.S. embassy or consulate</li>
                <li>File a complaint with the FTC (Federal Trade Commission)</li>
                <li>Contact your local consumer protection agency</li>
                <li>Report to local law enforcement if you&apos;ve been defrauded</li>
                <li>Share security research findings with the security community</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Research Archive */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <FileText className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Research Archive</h2>
              <p className="text-muted-foreground">
                Technical writeups and analysis documents
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Our security research documentation is available in our open-source repository. This includes:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>Detailed technical analysis of observed patterns</li>
              <li>Security best practices for visa appointment monitoring</li>
              <li>Privacy and data protection considerations</li>
              <li>Methodology and research notes</li>
            </ul>
            <div className="pt-4">
              <Button variant="outline" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View Research Archive
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Related Resources */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Anti-Scam Toolkit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to identify and avoid fraudulent visa appointment services
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/anti-scam">
                Visit Anti-Scam Toolkit →
              </Link>
            </Button>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Privacy Policy</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Understand how we handle your data and protect your privacy
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/privacy">
                Read Privacy Policy →
              </Link>
            </Button>
          </Card>
        </div>

        {/* Contact */}
        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Have Security Research to Share?</h2>
            <p className="text-muted-foreground">
              If you have security research findings or corrections to our analysis, we welcome your input.
            </p>
            <Button asChild>
              <Link href="/contact?subject=security-research">
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

