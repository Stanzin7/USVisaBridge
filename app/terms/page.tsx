import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertTriangle, CheckCircle2, Shield } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Last updated: January 2025
          </p>
        </div>

        <Card className="p-8 mb-8 bg-card border-border">
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to USVisaBridge. By using our service, you agree to comply with and be bound by 
              the following terms and conditions. Please review these terms carefully. If you do not 
              agree to these terms, you should not use our service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              USVisaBridge provides community availability sightings and educational tools. We are not 
              affiliated with, endorsed by, or connected to any government, embassy, or consulate.
            </p>
          </div>
        </Card>

        {/* Scope & Disclaimer */}
        <Card className="p-8 mb-8 bg-yellow-500/10 border-yellow-500/30 border-2">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-yellow-600 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Scope & Disclaimer</h2>
              <p className="text-muted-foreground">
                What USVisaBridge provides and what it does not
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">USVisaBridge provides:</strong> Community availability sightings and educational tools to help you navigate the U.S. visa application process.
            </p>
            <p>
              <strong className="text-foreground">We do not provide legal advice.</strong> Our service is for informational purposes only. For legal questions about your visa application, please consult with an immigration attorney or official government resources.
            </p>
            <p>
              <strong className="text-foreground">We do not submit DS-160 forms or book appointments on your behalf.</strong> You must complete and submit all forms yourself through official U.S. government channels. We provide tools and guidance to help you prepare, but you are responsible for all submissions and bookings.
            </p>
          </div>
        </Card>

        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Acceptable Use</h2>
              <p className="text-muted-foreground">
                You agree to use our service only for lawful purposes
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>You agree to:</p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Use the service only for receiving alerts about U.S. visa appointment availability</li>
              <li>Provide accurate and truthful information when creating alerts</li>
              <li>Not attempt to abuse, hack, or interfere with our service</li>
              <li>Not use our service for any illegal or unauthorized purpose</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 mb-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <FileText className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Service Description</h2>
              <p className="text-muted-foreground">
                What our service provides and what it does not
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What We Do</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Share community sightings of U.S. visa appointment slot availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Send notifications when verified community sightings match your preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Provide a free, open-source community sighting and alert service</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What We Do Not Do</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">We do not guarantee appointments:</strong> We can only notify you of availability. Booking depends on your ability to secure the slot through official U.S. visa application channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">We do not book appointments:</strong> You must book U.S. visa appointments yourself through official government channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">We are not affiliated with any government:</strong> We are an independent service providing community sightings and alerts.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-8 bg-card border-red-500/10 border-2">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Limitations of Liability</h2>
              <p className="text-muted-foreground">
                Important disclaimers about our service
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Service Availability:</strong> We provide this service 
              &quot;as is&quot; and &quot;as available.&quot; We do not guarantee that the service will be 
              available at all times or that notifications will be delivered without delay.
            </p>
            <p>
              <strong className="text-foreground">No Warranties:</strong> We make no warranties, expressed 
              or implied, regarding the accuracy, reliability, or availability of our service.
            </p>
            <p>
              <strong className="text-foreground">No Appointment Guarantees:</strong> We cannot guarantee 
              that you will receive an appointment notification, that U.S. visa appointments will be available when 
              you check, or that you will successfully book an appointment. Appointment availability 
              depends entirely on official U.S. government systems.
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Questions About Terms?</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Contact Us →
              </button>
            </Link>
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

