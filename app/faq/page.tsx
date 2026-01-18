import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "How is this different from other visa slot trackers?",
      answer:
        "Unlike competitors that violate privacy laws, we&apos;re 100% free, open source, and legally compliant. We never intercept API calls, capture screenshots, store credentials, or collect PII without consent. Our code is open source, so you can verify our privacy practices yourself.",
    },
    {
      question: "How do you monitor visa slots?",
      answer:
        "We notify you when community members upload a recent calendar screenshot showing availability. Community members voluntarily upload screenshots of the appointment calendar (manual, user-initiated). We extract availability data from these screenshots and analyze patterns. We never run code on the visa portal site, never automatically capture screenshots, and never intercept API calls. All uploads are manual and voluntary.",
    },
    {
      question: "Is the code really open source?",
      answer:
        "Yes! Our entire codebase is open source and available on GitHub. You can inspect our code, verify our privacy practices, audit our security measures, and even contribute improvements. We believe transparency is essential for trust.",
    },
    {
      question: "Can I verify your privacy practices?",
      answer:
        "Absolutely! Since our code is open source, anyone can review our implementation to verify that we don&apos;t collect PII, intercept APIs, capture screenshots, or store credentials. We also have a detailed privacy policy that explains exactly what data we collect and how we use it.",
    },
    {
      question: "Do you need my government portal credentials?",
      answer:
        "No, absolutely not. We never ask for or store any government portal credentials, passport numbers, or personal login information. We only need your email address to send you alerts when U.S. visa appointments become available.",
    },
    {
      question: "How does the monitoring work without my credentials?",
      answer:
        "We don&apos;t monitor your account. We rely on community sightings. You always book yourself. When community members share calendar screenshots showing availability, we notify users with matching preferences. This method is safe, legal, and does not require any personal credentials.",
    },
    {
      question: "Is this service affiliated with any government?",
      answer:
        "No, we are an independent third-party monitoring service. We are not affiliated with, endorsed by, or connected to any government, embassy, or consulate. We alert users based on community sightings shared voluntarily through screenshots.",
    },
    {
      question: "What information do you collect?",
      answer:
        "We only collect your email address (with explicit consent), preferred U.S. visa type, location, and date range preferences. We do not collect, store, or access any sensitive personal information, government credentials, or identification documents. Our code is open source so you can verify this yourself.",
    },
    {
      question: "How do you fund this if it's free?",
      answer:
        "This is a community-driven open-source project. We currently operate on free tiers of hosting services. If needed in the future, we may accept optional donations through GitHub Sponsors, but the service will always remain free. We&apos;re committed to keeping this project free and open source.",
    },
    {
      question: "Can I self-host this?",
      answer:
        "Yes! Since our code is open source, you can fork the repository and self-host if you prefer. This gives you complete control over your data. Check our GitHub repository for deployment instructions.",
    },
    {
      question: "What license do you use?",
      answer:
        "We use the MIT License, which is one of the most permissive open-source licenses. This means you&apos;re free to use, modify, and distribute the code for both commercial and personal purposes, as long as you include the license notice.",
    },
    {
      question: "How can I contribute?",
      answer:
        "We welcome contributions! You can contribute code, report bugs, suggest features, improve documentation, or help with design. Check our GitHub repository for the contributing guide and code of conduct. Every contribution, no matter how small, makes a difference.",
    },
    {
      question: "Can you guarantee I will get an appointment?",
      answer:
        "No. We can only notify you when U.S. visa appointments become available. Securing an appointment depends on your ability to book it quickly through the official U.S. visa application channels. Our service increases your chances by alerting you the moment slots open up.",
    },
    {
      question: "Is using this service legal?",
      answer:
        "Yes. We rely on community sightings shared voluntarily through screenshots. We don&apos;t access the portal on your behalf or run any code on the visa portal site. Automation-free by design (manual uploads only). Users are responsible for following the portal&apos;s terms and local rules. We don&apos;t intercept APIs, automatically capture screenshots, or collect PII without consent.",
    },
    {
      question: "How do I know this is not a scam?",
      answer:
        "Legitimate services never ask for government credentials or passport numbers. We only require an email address for alerts. We provide complete transparency about our data usage, our code is open source, the service is completely free, and we never guarantee visa approval or appointments.",
    },
    {
      question: "What if I find a scam service?",
      answer:
        "Report it immediately to the relevant embassy, the FTC (in the US), or your local consumer protection agency. Common red flags include: asking for passport numbers, promising guaranteed appointments, requiring government portal logins, demanding large upfront payments, intercepting API calls, or collecting data without consent.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            FAQ
          </Badge>
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our U.S. visa appointment monitoring service
          </p>
        </div>

        <Card className="p-8 mb-8 bg-card border-border">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-muted/50 border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Still Have Questions?</h2>
            <p className="text-muted-foreground">
              If you couldn&apos;t find the answer you were looking for, feel free to contact us.
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

