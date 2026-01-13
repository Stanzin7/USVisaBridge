import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Shield, Lock, CheckCircle2, X, Globe, Clock, Zap, Code, Download } from "lucide-react"
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
    "Screenshots of personal information",
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            How It Works
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">How Our U.S. Visa Appointment Monitoring Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed explanation of our monitoring process for U.S. visa appointments
          </p>
        </div>

        {/* Overview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
          <div className="text-center space-y-4">
            <Eye className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-3xl font-bold">Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We monitor publicly available U.S. visa appointment slot availability data to detect changes in real time. 
              When appointment slots become available, we notify you immediately so you can book through official U.S. 
              government channels.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 pt-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>No login required. No credentials needed. No booking automation.</span>
            </div>
          </div>
        </Card>

        {/* What We Monitor */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Eye className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">What We Monitor</h2>
              <p className="text-muted-foreground">
                We only access publicly available U.S. visa appointment data
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              We monitor publicly accessible information about U.S. visa appointment availability:
            </p>
            <ul className="space-y-3">
              {publicDataWeMonitor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> All data we monitor is publicly available 
                on U.S. embassy and consulate websites. We do not access any private or protected information.
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

        {/* Browser Extension Component */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
          <div className="flex items-start gap-4 mb-6">
            <Code className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Browser Extension: The Core Technology</h2>
              <p className="text-muted-foreground">
                Our browser extension is what makes real-time monitoring possible. Here&apos;s how it works legally.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">How Our Extension Works (Legal Approach)</h3>
              <ol className="space-y-3 text-muted-foreground ml-6 list-decimal">
                <li><strong className="text-foreground">You install the extension</strong> and explicitly grant permission to read publicly visible appointment data</li>
                <li><strong className="text-foreground">You visit the visa portal</strong> to check for available slots (you log in yourself through the official portal)</li>
                <li><strong className="text-foreground">Consent dialog appears</strong> asking if you want to share slot availability data to help others</li>
                <li><strong className="text-foreground">You see a preview</strong> of exactly what data will be shared (location, date count, no personal info)</li>
                <li><strong className="text-foreground">You choose to share or keep private</strong> - full control over your data</li>
                <li><strong className="text-foreground">If you share:</strong> Only anonymized slot availability data is sent (location name, number of available dates, timestamp)</li>
                <li><strong className="text-foreground">Community benefits:</strong> When slots are detected, all users with matching preferences get instant alerts</li>
              </ol>
            </div>

            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <h4 className="font-semibold mb-2 text-emerald-400">Key Legal Principles</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4 list-disc">
                <li><strong className="text-foreground">Explicit consent:</strong> We ask permission BEFORE collecting any data</li>
                <li><strong className="text-foreground">No API interception:</strong> We only read user-visible data, never intercept private communications</li>
                <li><strong className="text-foreground">No credentials:</strong> We never ask for or store your visa portal login credentials</li>
                <li><strong className="text-foreground">Transparency:</strong> You see exactly what data is collected and can opt-out anytime</li>
                <li><strong className="text-foreground">Open source:</strong> Our extension code is publicly available for verification</li>
                <li><strong className="text-foreground">Data minimization:</strong> We only collect what&apos;s necessary (slot availability, not personal info)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What We Do NOT Do (Unlike Illegal Competitors)</h3>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>We do not automatically collect data without consent</li>
                <li>We do not intercept API calls between you and the visa portal</li>
                <li>We do not capture screenshots without explicit permission</li>
                <li>We do not store passwords or credentials (even encrypted)</li>
                <li>We do not send data before asking for consent</li>
                <li>We do not access private information or break into systems</li>
                <li>We do not hide our data collection practices</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Learn more:</strong> See our detailed Extension section on the homepage for a side-by-side comparison 
                of legal vs illegal extension approaches. <Link href="/#extension" className="text-primary hover:underline">View Extension Section →</Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Technical Details */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Zap className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Monitoring Process</h2>
              <p className="text-muted-foreground">
                How slot availability data flows through our system
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Data Flow</h3>
              <ol className="space-y-3 text-muted-foreground ml-6 list-decimal">
                <li>Users voluntarily share slot availability data through our browser extension (with explicit consent)</li>
                <li>Data is anonymized and verified (removes all personal information)</li>
                <li>We detect changes in appointment slot availability in real time</li>
                <li>We compare current availability with previous data to identify new slots</li>
                <li>When new U.S. visa appointment slots are detected, we immediately send notifications to users with matching preferences</li>
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
              <span><strong className="text-foreground">Data Minimization:</strong> We only collect the minimum data necessary for U.S. visa appointment monitoring</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Explicit Consent:</strong> We ask for your permission before collecting any data</span>
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
                We are fully compliant with all applicable privacy regulations
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Our U.S. visa appointment monitoring service is fully compliant with:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li><strong className="text-foreground">GDPR:</strong> European Union General Data Protection Regulation</li>
              <li><strong className="text-foreground">CCPA:</strong> California Consumer Privacy Act</li>
              <li><strong className="text-foreground">Chrome Web Store Policies:</strong> Single purpose, transparent code, privacy policy</li>
            </ul>
            <p className="mt-4">
              We only access publicly available U.S. visa appointment data and do not bypass any security measures 
              or authentication systems. All data processing is conducted in accordance with applicable laws and regulations.
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
                <span>We monitor publicly available U.S. visa appointment slots for you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>You receive instant notifications when slots become available</span>
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

