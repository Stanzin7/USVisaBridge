import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle2, X, Eye, Lock, Zap, Download, Code, Users } from "lucide-react"
import Link from "next/link"
import { CHROME_EXTENSION_URL, GITHUB_REPO_URL } from '@/lib/config/links'

export default function ExtensionPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Browser Extension
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Browser Extension
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our extension is the core technology that enables real-time slot monitoring. 
            Here&apos;s exactly what it does, what permissions it needs, and what it never does.
          </p>
        </div>

        {/* What the Extension Does */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Zap className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">What the Extension Does</h2>
              <p className="text-muted-foreground">
                Our extension helps detect and share visa slot availability in a privacy-first way.
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-muted-foreground ml-6 list-disc">
            <li>Detects when you&apos;re viewing visa appointment availability</li>
            <li>Shows consent dialog before any data collection</li>
            <li>Allows you to preview and share anonymized slot data (opt-in)</li>
            <li>Displays slot availability in a helpful format</li>
            <li>Sends alerts when slots match your preferences</li>
          </ul>
        </Card>

        {/* Permissions Explained */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Permissions Explained</h2>
              <p className="text-muted-foreground">
                We only request the minimum permissions needed for the extension to work.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <h3 className="font-semibold mb-2 text-emerald-400">Read appointment data</h3>
              <p className="text-sm text-muted-foreground">
                Only reads what you can see on screen (user-visible data). This allows us to detect 
                when appointment slots are available.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="font-semibold mb-2 text-blue-400">Storage</h3>
              <p className="text-sm text-muted-foreground">
                Saves your preferences locally (never sent to server). This includes your alert 
                preferences like visa type and location.
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <h3 className="font-semibold mb-2 text-purple-400">Active tab</h3>
              <p className="text-sm text-muted-foreground">
                Only works on visa portal pages (usvisascheduling.com). The extension doesn&apos;t 
                access other websites or tabs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <h3 className="font-semibold mb-2 text-red-400">No access to:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>Passwords or credentials</li>
              <li>Other tabs or websites</li>
              <li>Browsing history</li>
              <li>Personal files</li>
            </ul>
          </div>
        </Card>

        {/* What It Never Does */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <X className="w-8 h-8 text-red-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">What It Never Does</h2>
              <p className="text-muted-foreground">
                We designed our extension with privacy and security in mind from day one.
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-muted-foreground ml-6 list-disc">
            <li>Does not intercept API calls between you and visa portal</li>
            <li>Does not store passwords or credentials</li>
            <li>Does not take screenshots without permission</li>
            <li>Does not collect data automatically without consent</li>
            <li>Does not access other websites or tabs</li>
            <li>Does not modify visa portal functionality</li>
          </ul>
        </Card>

        {/* How Consent Works */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">How Consent Works</h2>
              <p className="text-muted-foreground">
                Every data collection requires your explicit permission.
              </p>
            </div>
          </div>

          <ol className="space-y-4 text-muted-foreground ml-6 list-decimal">
            <li>
              <strong className="text-foreground">Consent dialog appears</strong> before any data collection
            </li>
            <li>
              <strong className="text-foreground">You see a preview</strong> of exactly what will be shared
            </li>
            <li>
              <strong className="text-foreground">You can edit, redact, or cancel</strong> before anything is transmitted
            </li>
            <li>
              <strong className="text-foreground">All personal info automatically removed</strong> before sharing
            </li>
            <li>
              <strong className="text-foreground">Opt-out anytime</strong> in extension settings
            </li>
          </ol>
        </Card>

        {/* Installation */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Download className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Installation</h2>
              <p className="text-muted-foreground">
                Install our extension from Chrome Web Store or view the source code on GitHub.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Install from Chrome Web Store
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                  <Code className="w-5 h-5 mr-2" />
                  View Source Code on GitHub
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">System Requirements:</strong> Chrome, Edge, or Brave (Chromium-based browsers)
            </p>
          </div>
        </Card>

        {/* Open Source */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
          <div className="flex items-start gap-4 mb-6">
            <Code className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">100% Open Source</h2>
              <p className="text-muted-foreground">
                Our extension code is completely open source and available for review.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Code available on GitHub for anyone to review</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>MIT License - free to use, modify, and distribute</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Community audited and verified</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>No hidden functionality - what you see is what you get</span>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" asChild>
              <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Code className="w-4 h-4 mr-2" />
                View Code on GitHub
              </a>
            </Button>
          </div>
        </Card>

        {/* Cross-links */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-primary hover:underline text-sm">
              Privacy Policy
            </Link>
            <Link href="/how-it-works" className="text-primary hover:underline text-sm">
              How It Works
            </Link>
            <Link href="/safety" className="text-primary hover:underline text-sm">
              Safety & Privacy
            </Link>
          </div>
          <Link href="/" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

