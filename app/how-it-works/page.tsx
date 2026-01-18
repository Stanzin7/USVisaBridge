import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Shield, Lock, CheckCircle2, X, Globe, Clock, Zap } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const publicDataWeMonitor = [
    "U.S. visa appointment availability slots",
    "Embassy/consulate location data",
    "Appointment date ranges",
    "U.S. visa category information",
    "Public consulate schedules",
  ]

  const sensitiveDataWeNeverAccess = [
    "Passport numbers or personal IDs",
    "U.S. visa application portal credentials",
    "Payment information",
    "Personal documents or photos",
    "Immigration case details",
    "Social security numbers",
    "Login credentials or passwords",
    "Private API communications",
    "Automatically captured screenshots (we never run code on the visa portal site)",
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* Not Affiliated Banner */}
        <Card className="p-4 mb-8 bg-yellow-500/10 border-yellow-500/30 border">
          <p className="text-sm text-center text-muted-foreground">
            <strong className="text-foreground">USVisaBridge is not affiliated with the U.S. government.</strong> You book and submit forms yourself.
          </p>
        </Card>
        
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            How It Works
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">How Our U.S. Visa Appointment Alerts Work</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed explanation of how community sightings help you find available appointments
          </p>
        </div>

        {/* Overview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
          <div className="text-center space-y-4">
            <Eye className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-3xl font-bold">Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Community members voluntarily share availability snapshots through manual screenshot uploads. 
              We analyze patterns and timing trends. When community members report sightings, you get alerts: 
              &quot;Last seen X minutes ago&quot; so you can check the official portal yourself.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 pt-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>No login required. No credentials needed. No booking automation.</span>
            </div>
          </div>
        </Card>

        {/* What We Use */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Eye className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">What We Use (Community Data)</h2>
              <p className="text-muted-foreground">
                Cropped screenshots of the appointment calendar that users upload voluntarily
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              We extract only calendar information from user-uploaded screenshots:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Location (embassy/consulate)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Available date(s)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Timestamp (when screenshot was taken)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Confidence score (verification level)</span>
              </li>
            </ul>
            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> We do not access your account, portal pages, or hidden APIs. 
                We only process screenshots that you choose to upload voluntarily.
              </p>
            </div>
          </div>
        </Card>

        {/* What We Never Access */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <X className="w-8 h-8 text-red-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">What We Never Access</h2>
              <p className="text-muted-foreground">
                Your sensitive personal information is completely off-limits
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              We never access, collect, or store any sensitive personal information:
            </p>
            <ul className="space-y-3">
              {sensitiveDataWeNeverAccess.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Security:</strong> We will never ask for your U.S. visa 
                application credentials, passport numbers, or any personal documents. If any service asks for 
                this information, it is likely a scam.
              </p>
            </div>
          </div>
        </Card>


        {/* Technical Details */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Zap className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">How Community Sightings Work</h2>
              <p className="text-muted-foreground">
                How verified community sightings turn into alerts
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">How It Works</h3>
              <ol className="space-y-3 text-muted-foreground ml-6 list-decimal">
                <li>User sees calendar availability in their own portal</li>
                <li>User optionally uploads cropped calendar-only screenshot</li>
                <li>OCR extracts dates and location from screenshot</li>
                <li>Admin or trust scoring verifies the report</li>
                <li>Alerts go out as &quot;Last seen X minutes ago&quot; to users with matching preferences</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Security Measures */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Security Measures</h2>
              <p className="text-muted-foreground">
                How we protect your data and ensure legal compliance
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Encryption:</strong> All data is encrypted in transit and at rest</span>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Data Minimization:</strong> We only collect the minimum data necessary for community sighting alerts</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Voluntary Uploads:</strong> You choose what to submit; uploads are voluntary. We don&apos;t collect portal data automatically</span>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Open Source:</strong> Our code is publicly available for security audits</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Data Retention:</strong> We retain data only as long as necessary and delete it when requested</span>
            </div>
          </div>
        </Card>

        {/* Legal Compliance */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 border-primary/20">
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Legal Compliance</h2>
              <p className="text-muted-foreground">
                Designed with GDPR/CCPA principles (data minimization, deletion, access)
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Our U.S. visa appointment monitoring service is designed with privacy principles from:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li><strong className="text-foreground">GDPR:</strong> European Union General Data Protection Regulation</li>
              <li><strong className="text-foreground">CCPA:</strong> California Consumer Privacy Act</li>
              <li><strong className="text-foreground">Chrome Web Store Policies:</strong> Single purpose, transparent code, privacy policy</li>
            </ul>
            <p className="mt-4">
              We rely on community sightings shared voluntarily through screenshots. We don&apos;t access the portal on your behalf or automatically collect data. 
              All data processing follows data minimization, deletion rights, and access principles.
            </p>
          </div>
        </Card>

        {/* How You Use It */}
        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">How You Use Our Service</h2>
            <p className="text-muted-foreground">
              Using our U.S. visa appointment monitoring service is simple:
            </p>
            <ol className="space-y-3 text-muted-foreground text-left max-w-2xl mx-auto mt-6">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Set up an alert with your U.S. visa preferences (visa type, location, dates)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>We don&apos;t check the portal for you. Alerts are based on community sightings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>You receive alerts when community members share sightings: &quot;Last seen X minutes ago&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">4.</span>
                <span>You book the appointment yourself through official U.S. government channels</span>
              </li>
            </ol>
            <p className="text-sm text-muted-foreground mt-6">
              <strong className="text-foreground">Important:</strong> We do not book appointments for you. 
              When you receive a notification, you must book the U.S. visa appointment yourself through 
              the official U.S. visa application system.
            </p>
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

