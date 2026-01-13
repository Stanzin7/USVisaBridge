import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Bell, Shield, CheckCircle2, Lock, Eye, Zap, Download, Play } from 'lucide-react'
import { AlertChannelsSection } from "@/components/AlertChannelsSection"
import { CHROME_EXTENSION_URL } from '@/lib/config/links'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0d1a] via-[#111827] to-background">
        {/* Status Indicators */}
        <div className="absolute top-8 right-8 hidden lg:flex gap-3">
          <span className="inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm px-4 py-2 animate-pulse-slow relative">
            <div className="relative flex items-center mr-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping absolute"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
            Live monitoring
          </span>
          <span className="inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm px-4 py-2">
            <Shield className="w-3 h-3 mr-2" />
            Smart availability monitoring
          </span>
        </div>
        <div className="container mx-auto px-4 pt-32 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Free, Legal, Open-Source</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Get Alerts When U.S. Visa
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Appointments Open
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Install our browser extension to join a community-powered alert system. 
              You book appointments yourself. No passwords. No fees. Fully open source.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                asChild
              >
                <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Install Extension
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-border/50 backdrop-blur-sm bg-transparent"
                asChild
              >
                <Link href="/auth/login">
                  <Bell className="w-5 h-5 mr-2" />
                  Get Started (Email Alerts)
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              No passwords. No screenshots. You book it yourself.
            </p>
          </div>
          
          {/* Feature Banner */}
          <div className="mt-16 border-t border-border/20 pt-8">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">No Credentials Required</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Public Data Only</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">You Book It Yourself</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Privacy-First</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      </section>

      {/* VIDEO PLACEHOLDER SECTION */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Watch How It Works (60 seconds)</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              See exactly what we do — and what we never ask for.
            </p>
          </div>
          
          <Card className="overflow-hidden border-border/50 bg-muted/30">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Play className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Video coming soon</p>
                </div>
              </div>
            </AspectRatio>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Three simple steps to never miss an appointment slot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-7 h-7 text-blue-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">1. Install Extension</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Install our browser extension from Chrome Web Store. We show you exactly what permissions 
                  we need and why.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">2. Choose Visa Type + Location</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us your visa type, which embassy or consulate you need, and your preferred dates. 
                  That&apos;s all we need to send you alerts.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-purple-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">3. Get Alerts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When slots become available (detected by community members who choose to share), you get 
                  an email alert immediately. You book it yourself through the official portal. 
                  Email alerts available now. SMS and WhatsApp coming soon.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CORE TECHNOLOGY SECTION */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
              Core Technology
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Our Browser Extension: The Heart of Our Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our browser extension is what makes real-time slot monitoring possible. Unlike competitors, 
              we built it with privacy, transparency, and legal compliance from day one.
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Why We Need an Extension</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Visa slot availability changes in real-time. To provide instant alerts, we need to monitor 
                  the appointment calendar continuously. Our browser extension allows users to <strong className="text-foreground">voluntarily share</strong> 
                  slot availability data they see, helping the entire community get notified faster.
                </p>
                <Link href="/extension" className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1 mb-4">
                  See permissions & data use →
                </Link>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Real-Time Monitoring</p>
                      <p className="text-sm text-muted-foreground">Detects slot availability the moment it appears</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">No Credentials Required</p>
                      <p className="text-sm text-muted-foreground">Works with publicly visible data only</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Community-Powered</p>
                      <p className="text-sm text-muted-foreground">Users voluntarily share data to help others</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Fully Transparent</p>
                      <p className="text-sm text-muted-foreground">Open source code you can verify</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* IS THIS SAFE? SECTION */}
      <section className="py-24 px-4 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Is This Safe?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Yes. Here&apos;s what we do — and what we never ask for.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">We never ask for your visa password</h3>
                  <p className="text-muted-foreground">
                    You always log in on the official site yourself. We don&apos;t need your login to send alerts.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">We never capture your screen or personal details</h3>
                  <p className="text-muted-foreground">
                    Some unsafe tools capture what&apos;s on your screen. We don&apos;t. We only detect whether a slot is available.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">We only read what you can already see</h3>
                  <p className="text-muted-foreground">
                    We check appointment availability that appears on your screen. We don&apos;t access hidden account data.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/privacy" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
              Learn about safety & privacy →
            </Link>
          </div>
        </div>
      </section>

      {/* IMPORTANT SECURITY REMINDER */}
      <section className="py-8 px-4 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-6 bg-yellow-500/5 border-yellow-500/30 border-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="text-lg font-semibold text-foreground">Important Security Reminder</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Never share your visa account password, passport number, or personal documents with any service, 
                  including this one. Legitimate appointment alert services only need your email address. If a service 
                  asks for your password or passport details, it&apos;s likely a scam.
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  We will never ask for your visa account password, passport number, or any personal documents.
                </p>
                <div className="pt-2">
                  <Link href="/safety" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
                    Learn about safety & privacy →
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ALERT CHANNELS SECTION */}
      <AlertChannelsSection />

      {/* FINAL CTA SECTION */}
      <section className="py-24 px-4 bg-muted/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 md:p-16 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Join thousands of people who got their visa appointments faster with our free alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-10 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                asChild
              >
                <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Install Extension
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-border/50 backdrop-blur-sm bg-transparent"
                asChild
              >
                <Link href="/auth/login">
                  <Bell className="w-5 h-5 mr-2" />
                  Create Account
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card. No passwords. You book it yourself.
            </p>
          </Card>
        </div>
      </section>

    </main>
  )
}
