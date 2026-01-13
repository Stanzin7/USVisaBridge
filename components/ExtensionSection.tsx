import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, X, Eye, Lock, Zap, Download, AlertTriangle, Code, Users } from "lucide-react"
import Link from "next/link"

export function ExtensionSection() {
  return (
    <section id="extension" className="py-24 px-4 bg-background">
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

        {/* Why Extension is Essential */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
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
                    <p className="font-semibold text-sm">Community-Powered</p>
                    <p className="text-sm text-muted-foreground">Users voluntarily share data to help others</p>
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
                    <p className="font-semibold text-sm">Fully Transparent</p>
                    <p className="text-sm text-muted-foreground">Open source code you can verify</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Legal vs Illegal Comparison */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Legal vs Illegal: The Critical Difference</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Illegal Approach */}
            <Card className="p-6 bg-red-500/5 border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <X className="w-6 h-6 text-red-400" />
                <h4 className="text-xl font-bold text-red-400">Illegal Competitors</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Automatic data collection</strong> without consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Intercepts API calls</strong> between you and visa portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Takes screenshots</strong> automatically without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Stores passwords</strong> in plain text</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Sends data before</strong> asking for consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Closed source</strong> - can't verify what it does</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">No opt-out</strong> mechanism</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-red-400">Violates:</strong> GDPR, CCPA, Chrome Web Store policies, Computer Fraud and Abuse Act
                </p>
              </div>
            </Card>

            {/* Legal Approach */}
            <Card className="p-6 bg-emerald-500/5 border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h4 className="text-xl font-bold text-emerald-400">Our Legal Approach</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Explicit consent</strong> before any data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Reads only user-visible data</strong> - no API interception</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Screenshots only with permission</strong> and preview before sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Never stores credentials</strong> - you log in yourself</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Asks permission first</strong> - you control what's shared</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">100% open source</strong> - verify our code yourself</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Opt-out anytime</strong> - full control over your data</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-emerald-400">Compliant with:</strong> GDPR, CCPA, Chrome Web Store policies, all privacy regulations
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* How Our Extension Works */}
        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">How Our Extension Works (Legally)</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">You Install & Grant Permission</h4>
                    <p className="text-muted-foreground text-sm">
                      You install our extension and explicitly grant permission for it to read publicly visible 
                      appointment data. We show you exactly what permissions we need and why.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">You Visit the Visa Portal</h4>
                    <p className="text-muted-foreground text-sm">
                      When you visit the visa appointment portal to check slots, our extension detects that you're 
                      viewing appointment availability. It only reads what you can see on the screen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Consent Dialog Appears</h4>
                    <p className="text-muted-foreground text-sm">
                      Before collecting any data, a consent dialog appears asking if you want to share slot 
                      availability data to help others. You see exactly what will be shared and can choose to 
                      share or keep it private.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Preview (If You Choose to Share)</h4>
                    <p className="text-muted-foreground text-sm">
                      If you choose to share, you see a preview of exactly what data will be sent. You can edit, 
                      redact, or cancel before anything is transmitted. All personal information is automatically 
                      removed or anonymized.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Anonymized Data Shared (Optional)</h4>
                    <p className="text-muted-foreground text-sm">
                      Only if you explicitly confirm, anonymized slot availability data is shared. This helps 
                      alert other users when slots become available. Your personal information is never included.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">You Get Alerts Too</h4>
                    <p className="text-muted-foreground text-sm">
                      When other users share slot availability data (with their consent), you receive instant 
                      alerts. Everyone benefits from the community-powered monitoring system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Guarantees */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-semibold mb-2">No Credentials Stored</h4>
            <p className="text-sm text-muted-foreground">
              We never ask for or store your visa portal login credentials. You log in yourself through 
              the official portal.
            </p>
          </Card>
          <Card className="p-6 bg-card border-border">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="font-semibold mb-2">Transparent Data Flow</h4>
            <p className="text-sm text-muted-foreground">
              You can see exactly what data is collected, how it's used, and where it goes. Our extension 
              includes a transparency dashboard.
            </p>
          </Card>
          <Card className="p-6 bg-card border-border">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="font-semibold mb-2">Full Control</h4>
            <p className="text-sm text-muted-foreground">
              Opt-out anytime, delete your data on demand, or customize what you share. You're always in control.
            </p>
          </Card>
        </div>

        {/* Open Source Badge */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="w-6 h-6 text-primary" />
            <h4 className="text-xl font-bold">100% Open Source</h4>
          </div>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Our extension code is completely open source. You can review it, verify our privacy practices, 
            audit our security measures, and even contribute improvements. No hidden functionality, no surprises.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified by Community
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Shield className="w-3 h-3 mr-1" />
              Privacy-First Design
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Users className="w-3 h-3 mr-1" />
              Community-Powered
            </Badge>
          </div>
        </Card>

        {/* Warning About Competitors */}
        <Card className="p-6 mt-8 bg-yellow-500/5 border-yellow-500/20">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2 text-yellow-400">Warning: Beware of Illegal Extensions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Many visa slot tracking extensions violate privacy laws by automatically collecting data without consent, 
                intercepting API calls, and storing credentials. If an extension:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Collects data automatically without asking</li>
                <li>Asks for your visa portal password</li>
                <li>Is closed source (can't verify what it does)</li>
                <li>Takes screenshots without permission</li>
                <li>Has no privacy policy or opt-out mechanism</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                <strong className="text-foreground">It's likely violating privacy laws.</strong> Uninstall it immediately and report it to Chrome Web Store.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

