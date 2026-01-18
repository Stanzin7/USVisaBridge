"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Trash2, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

function ContactForm() {
  const searchParams = useSearchParams()
  const subject = searchParams.get("subject")
  
  const [formData, setFormData] = useState({
    email: "",
    subject: subject || "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (subject) {
      setFormData(prev => ({ ...prev, subject: subject }))
      // Pre-fill message based on subject
      if (subject === "data-deletion") {
        setFormData(prev => ({
          ...prev,
          message: "I would like to request deletion of all my personal data from your system. Please confirm once this has been completed."
        }))
      } else if (subject === "data-access") {
        setFormData(prev => ({
          ...prev,
          message: "I would like to request a copy of all personal data you have stored about me. Please provide this information in a machine-readable format."
        }))
      }
    }
  }, [subject])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const getSubjectIcon = () => {
    switch (formData.subject) {
      case "data-deletion":
        return <Trash2 className="w-6 h-6" />
      case "data-access":
        return <FileText className="w-6 h-6" />
      default:
        return <MessageSquare className="w-6 h-6" />
    }
  }

  const getSubjectTitle = () => {
    switch (formData.subject) {
      case "data-deletion":
        return "Request Data Deletion"
      case "data-access":
        return "Request Data Access"
      default:
        return "Contact Us"
    }
  }

  const getSubjectDescription = () => {
    switch (formData.subject) {
      case "data-deletion":
        return "Request deletion of all your personal data from our system. We will process your request within 30 days as required by GDPR and CCPA."
      case "data-access":
        return "Request a copy of all personal data we have stored about you. We will provide this information in a machine-readable format within 30 days."
      default:
        return "Have a question or need help? We&apos;re here to assist you."
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Support
          </Badge>
          <div className="flex justify-center mb-4">
            {getSubjectIcon()}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">{getSubjectTitle()}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {getSubjectDescription()}
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <Card className="p-6 mb-8 bg-emerald-500/10 border-emerald-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-emerald-400">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve received your message and will respond within 48 hours.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Contact Form */}
        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                We&apos;ll only use this to respond to your inquiry
              </p>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="general">General Inquiry</option>
                <option value="data-deletion">Request Data Deletion</option>
                <option value="data-access">Request Data Access</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="security">Security Issue</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please provide details about your inquiry..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={8}
                className="mt-2"
              />
              {formData.subject === "data-deletion" && (
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Note:</strong> After submitting this request, we will verify your identity 
                  and permanently delete all your personal data within 30 days as required by GDPR and CCPA.
                </p>
              )}
              {formData.subject === "data-access" && (
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Note:</strong> After submitting this request, we will verify your identity 
                  and provide you with all personal data we have stored about you within 30 days.
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Mail className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </form>
        </Card>

        {/* Additional Resources */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {formData.subject === "data-deletion" && (
            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-2">About Data Deletion</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We will delete all personal data within 30 days</li>
                <li>• This includes your email, preferences, and alert settings</li>
                <li>• De-identified statistical data (with no personal identifiers) may be retained</li>
                <li>• You can request deletion at any time</li>
              </ul>
            </Card>
          )}

          {formData.subject === "data-access" && (
            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-2">About Data Access</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We will provide all personal data within 30 days</li>
                <li>• Data will be provided in JSON or CSV format</li>
                <li>• This includes your email, preferences, and alert history</li>
                <li>• You can request access at any time</li>
              </ul>
            </Card>
          )}

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy →
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service →
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary hover:underline">
                  Frequently Asked Questions →
                </Link>
              </li>
            </ul>
          </Card>
        </div>

        {/* Response Time */}
        <Card className="p-6 mt-8 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond to inquiries within 48 hours. For data deletion and access 
                requests, we will process your request within 30 days as required by GDPR and CCPA.
              </p>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-96 bg-muted rounded mt-8"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <ContactForm />
    </Suspense>
  )
}

