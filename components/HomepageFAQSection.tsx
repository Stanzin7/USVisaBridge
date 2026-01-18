import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HomepageFAQSection() {
  const topFAQs = [
    {
      question: "How is this different from other visa slot trackers?",
      answer:
        "Unlike competitors that violate privacy laws, we&apos;re 100% free, open source, and legally compliant. We never intercept API calls, capture screenshots, store credentials, or collect PII without consent. Our code is open source, so you can verify our privacy practices yourself.",
    },
    {
      question: "Do you need my government portal credentials?",
      answer:
        "No, absolutely not. We never ask for or store any U.S. visa application portal credentials, passport numbers, or personal login information. We only need your email address to send you alerts when U.S. visa appointments become available.",
    },
    {
      question: "Is the code really open source?",
      answer:
        "Yes! Our entire codebase is open source and available on GitHub. You can inspect our code, verify our privacy practices, audit our security measures, and even contribute improvements. We believe transparency is essential for trust.",
    },
    {
      question: "Is using this service legal?",
      answer:
        "Yes. We only access publicly available U.S. visa appointment information and do not bypass any security measures or authentication systems. We&apos;re fully compliant with GDPR, CCPA, and all applicable privacy regulations. We don&apos;t intercept APIs, capture screenshots, or collect PII without consent.",
    },
    {
      question: "How do you fund this if it's free?",
      answer:
        "This is a community-driven open-source project. We currently operate on free tiers of hosting services. If needed in the future, we may accept optional donations through GitHub Sponsors, but the service will always remain free. We&apos;re committed to keeping this project free and open source.",
    },
  ]

  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground text-pretty">Common questions about our U.S. visa appointment monitoring service</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4 mb-8">
          {topFAQs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/faq">
              See all FAQs →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
