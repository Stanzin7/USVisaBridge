'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Shield, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ReportScamPage() {
  const [formData, setFormData] = useState({
    category: '',
    country: '',
    url: '',
    description: '',
    requestedItems: [] as string[],
    hasEvidence: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestedItemsOptions = [
    'Passport numbers or personal documents',
    'Government portal login credentials',
    'Payment information',
    'Social security numbers',
    'Other personal information',
  ]

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        requestedItems: [...prev.requestedItems, item]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        requestedItems: prev.requestedItems.filter(i => i !== item)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/report-scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          category: '',
          country: '',
          url: '',
          description: '',
          requestedItems: [],
          hasEvidence: false,
        })
      } else {
        setError(data.error || 'Failed to submit report. Please try again.')
      }
    } catch (err) {
      setError('Error submitting report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">
            Report a Scam
          </Badge>
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Report a Scam</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help protect others by reporting fraudulent U.S. visa services
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="p-6 mb-8 bg-yellow-500/10 border-yellow-500/30 border-2">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Important Disclaimer</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>We do not publish accusations.</strong> We use reports to improve educational guidance and may recommend official reporting channels. Reports are stored privately and used for internal analysis only.
              </p>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        {submitted && (
          <Card className="p-6 mb-8 bg-emerald-500/10 border-emerald-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-emerald-400">Report Submitted</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for your report. We will review it and use it to improve our educational resources. 
                  For official action, please also report to the relevant authorities listed below.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Warning */}
        <Card className="p-6 mb-8 bg-red-500/10 border-red-500/30 border-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2 text-red-700 dark:text-red-300">Do Not Include Sensitive Information</h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Do not include:</strong> Passport numbers, credentials, passwords, payment details, or personal documents. 
                Only provide general information about the service and what was requested.
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select a category</option>
                <option value="credential_request">Requested login credentials</option>
                <option value="passport_request">Requested passport numbers/documents</option>
                <option value="payment_scam">Payment fraud or excessive fees</option>
                <option value="false_promises">False promises (guaranteed appointments, etc.)</option>
                <option value="data_collection">Excessive or suspicious data collection</option>
                <option value="other">Other suspicious activity</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g., India, United States"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                required
                className="mt-2"
              />
            </div>

            {/* URL */}
            <div>
              <Label htmlFor="url">Service URL (optional)</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                If you know the website URL of the suspicious service
              </p>
            </div>

            {/* What Was Requested */}
            <div>
              <Label>What was requested? (select all that apply)</Label>
              <div className="mt-3 space-y-3">
                {requestedItemsOptions.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Checkbox
                      id={item}
                      checked={formData.requestedItems.includes(item)}
                      onCheckedChange={(checked) => handleCheckboxChange(item, checked as boolean)}
                    />
                    <Label
                      htmlFor={item}
                      className="text-sm font-normal cursor-pointer text-muted-foreground"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what happened, what the service claimed to do, and any suspicious behavior..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={6}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide general information only. Do not include personal details, credentials, or sensitive information.
              </p>
            </div>

            {/* Evidence Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="hasEvidence"
                checked={formData.hasEvidence}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasEvidence: checked as boolean }))}
              />
              <Label
                htmlFor="hasEvidence"
                className="text-sm font-normal cursor-pointer text-muted-foreground"
              >
                I have evidence (screenshots, emails, etc.) that I can provide if requested
              </Label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </Button>
          </form>
        </Card>

        {/* Official Reporting Channels */}
        <Card className="p-8 mt-8 bg-card border-border">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-2">Official Reporting Channels</h2>
              <p className="text-muted-foreground">
                For official action, please also report to these authorities
              </p>
            </div>
          </div>

          <div className="space-y-3 text-muted-foreground">
            <p><strong className="text-foreground">U.S. Embassy/Consulate:</strong> Report to the relevant U.S. embassy or consulate in your country</p>
            <p><strong className="text-foreground">FTC:</strong> File a complaint at <a href="https://ftc.gov/complaint" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ftc.gov/complaint</a></p>
            <p><strong className="text-foreground">Local Authorities:</strong> Contact your local consumer protection agency or law enforcement if you&apos;ve been defrauded</p>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/anti-scam" className="text-primary hover:underline">
            ← Back to Anti-Scam Toolkit
          </Link>
        </div>
      </div>
    </main>
  )
}

