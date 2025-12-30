import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Shield, Zap, Clock, Lock, Eye, CheckCircle2, Globe } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0d1a] via-[#111827] to-background">
        {/* Floating Status Indicators */}
        <div className="absolute top-8 right-8 hidden lg:flex gap-3">
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm px-4 py-2 animate-pulse-slow"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping absolute" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
            Live monitoring
          </Badge>
          <Badge
            variant="secondary"
            className="bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm px-4 py-2"
          >
            <Clock className="w-3 h-3 mr-2" />
            Auto-checks every 2 min
          </Badge>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Real-time visa appointment monitoring</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Never Miss a U.S. Visa
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Appointment Again
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Get instant alerts when visa appointments open up.{" "}
              <span className="text-foreground font-medium">No credentials required</span>,{" "}
              <span className="text-foreground font-medium">privacy-first</span>, and completely automated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                asChild
              >
                <Link href="/auth/login">
                  <Bell className="w-5 h-5 mr-2" />
                  Get Instant Alerts
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-border/50 backdrop-blur-sm bg-transparent"
                asChild
              >
                <Link href="/auth/login">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Used by 10,000+ applicants</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>No login required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>2-minute checks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Simple, fast, and completely automated monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-blue-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">1. Set Your Alert</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose your visa type, location, and preferred dates. No account or credentials needed.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">2. We Monitor</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our system checks for available appointments every 2 minutes, 24/7, so you don&apos;t have to.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-purple-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">3. Get Notified</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive instant notifications via email or SMS the moment a slot becomes available.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Visa Types */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Supported Visa Types</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Monitoring all major U.S. visa categories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'B1/B2', desc: 'Tourist & Business', icon: Globe },
              { title: 'F1', desc: 'Student Visa', icon: Globe },
              { title: 'H1B', desc: 'Work Visa', icon: Globe },
              { title: 'O1', desc: 'Extraordinary Ability', icon: Globe },
              { title: 'L1', desc: 'Intra-company Transfer', icon: Globe },
              { title: 'J1', desc: 'Exchange Visitor', icon: Globe },
              { title: 'K1', desc: 'Fiancé(e) Visa', icon: Globe },
              { title: 'E2', desc: 'Investor Visa', icon: Globe },
            ].map((visa, i) => (
              <Card
                key={i}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <visa.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{visa.title}</h3>
                    <p className="text-sm text-muted-foreground">{visa.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Security & Privacy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Your privacy is our priority. We never ask for sensitive information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-10 bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20 backdrop-blur-sm">
              <Shield className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">No Credentials Required</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We never ask for your passport number, visa credentials, or personal login information. Just your email
                to send alerts.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  No password storage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  No government credentials
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  No personal documents
                </li>
              </ul>
            </Card>

            <Card className="p-10 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 border-emerald-500/20 backdrop-blur-sm">
              <Lock className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Privacy-First Approach</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use industry-standard encryption and never share your data with third parties. Your information stays
                secure.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No data sharing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  GDPR compliant
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 md:p-16 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Start Monitoring Today</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Join thousands of applicants who secured their visa appointments with our automated monitoring system.
            </p>
            <Button
              size="lg"
              className="text-lg px-10 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              asChild
            >
              <Link href="/auth/login">
                <Bell className="w-5 h-5 mr-2" />
                Get Started for Free
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-6">No credit card required · Cancel anytime</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="font-semibold text-foreground">Visa Alert</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <p>© 2025 Visa Alert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
