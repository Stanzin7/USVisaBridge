import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Bell, Shield, CheckCircle2, Lock, Eye, Zap, Play, AlertTriangle } from 'lucide-react'
import { AlertChannelsSection } from "@/components/AlertChannelsSection"

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
          <span className="inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm px-4 py-2">
            <Shield className="w-3 h-3 mr-2" />
            Automation-Free by Design
          </span>
          <span className="inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm px-4 py-2">
            <Eye className="w-3 h-3 mr-2" />
            Proof-Based Sightings
          </span>
        </div>
        <div className="container mx-auto px-4 pt-32 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Free, Automation-Free, Open-Source</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Community Visa Slot Sightings
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Manual, Proof-Based
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Check less. Waste fewer logins. Get alerted when the community just saw availability. 
              Use your limited portal checks only when there&apos;s fresh proof.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                asChild
              >
                <Link href="/auth/login">
                  <Bell className="w-5 h-5 mr-2" />
                  Create Account / Get Started
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              No visa portal password required. No automation. You book it yourself.
            </p>
          </div>
          
          {/* Feature Banner */}
          <div className="mt-16 border-t border-border/20 pt-8">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">No Visa Portal Password Required</span>
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
              Proof-based slot sightings + timing trends — without automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-blue-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">1. Create Account</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sign up with your email address to start receiving visa appointment alerts.
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
                  When community members share sightings, you get alerts: &quot;Last seen 12 minutes ago&quot; 
                  with confidence scores. Alerts show freshness, not guarantees. You book it yourself through the official portal.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT WE ARE / AREN'T SECTION */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">What We Are / Aren&apos;t</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Clear boundaries and honest limitations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-emerald-500/5 border-emerald-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                We Are
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>A community &quot;availability sightings + trends&quot; tool</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Proof-based (cropped screenshots required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Automation-free by design (manual uploads only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Free, open source, transparent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Privacy-first (no passwords, auto-deletion)</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-red-500/5 border-red-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-400" />
                We Are Not
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>A booking service (you book yourself)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>A bot/automation tool (manual only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Affiliated with the government</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>A guarantee service (slots may be gone)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Real-time monitoring (shows &quot;last seen&quot;)</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Honest Limitations */}
          <Card className="p-6 bg-yellow-500/5 border-yellow-500/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Honest Limitations
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">⚠</span>
                <span><strong>Availability can disappear quickly:</strong> Alerts show &quot;last seen X minutes ago&quot; — slots may already be gone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">⚠</span>
                <span><strong>Alerts are not guarantees:</strong> We show community sightings, not confirmed availability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">⚠</span>
                <span><strong>Works best as more people contribute:</strong> More community reports = better pattern detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">⚠</span>
                <span><strong>Users are responsible:</strong> You must follow the portal&apos;s terms and local rules</span>
              </li>
            </ul>
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
                  <h3 className="text-lg font-semibold mb-2">We never automatically capture your screen</h3>
                  <p className="text-muted-foreground">
                    Some unsafe tools automatically capture what&apos;s on your screen. We don&apos;t run any code on the visa portal site. 
                    Users can optionally upload screenshots manually to help the community, but this is always voluntary and user-initiated.
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
              Free alternative to paid intermediaries. Use your limited portal checks only when there&apos;s fresh community proof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-10 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                asChild
              >
                <Link href="/auth/login">
                  <Bell className="w-5 h-5 mr-2" />
                  Create Account
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No visa portal password required. No fees. You book it yourself.
            </p>
          </Card>
        </div>
      </section>

    </main>
  )
}
