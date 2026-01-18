'use client'

import { useState, useRef } from 'react'
import { VALID_VISA_TYPES, VALID_CONSULATES } from '@/lib/validators'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react'

// OCR Service URL - can be moved to env variable later
const OCR_SERVICE_URL = '/api/ocr'


export default function ReportsPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    consulate: 'Mumbai',
    visa_type: 'B1/B2',
    earliest_date: '',
    latest_date: '',
    slot_count: '',
  })
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ocrProcessing, setOcrProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [ocrResult, setOcrResult] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)

  // Map OCR location to consulate dropdown value
  // const mapLocationToConsulate = (location: string): string => {
  //   const loc = location.toLowerCase()
  //   if (loc.includes('mumbai')) return 'Mumbai'
  //   if (loc.includes('delhi') || loc.includes('new delhi')) return 'Delhi'
  //   if (loc.includes('chennai')) return 'Chennai'
  //   if (loc.includes('hyderabad')) return 'Hyderabad'
  //   if (loc.includes('kolkata')) return 'Kolkata'
  //   if (loc.includes('bengaluru') || loc.includes('bangalore')) return 'Bengaluru'
  //   if (loc.includes('pune')) return 'Pune'
  //   if (loc.includes('ahmedabad')) return 'Ahmedabad'
  //   return 'Mumbai' // default
  // }

  // Parse date from OCR (e.g., "Monday September 16, 2019" or "2024-10-07")
  // const parseDate = (dateString: string): string => {
  //   if (!dateString) return ''
    
  //   // Try ISO format first
  //   if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
  //     return dateString
  //   }

  //   // Try to parse common formats
  //   try {
  //     const date = new Date(dateString)
  //     if (!isNaN(date.getTime())) {
  //       const year = date.getFullYear()
  //       const month = String(date.getMonth() + 1).padStart(2, '0')
  //       const day = String(date.getDate()).padStart(2, '0')
  //       return `${year}-${month}-${day}`
  //     }
  //   } catch (e) {
  //     // Continue to manual parsing
  //   }

  //   // Manual parsing for "Monday September 16, 2019" format
  //   const months: { [key: string]: string } = {
  //     'january': '01', 'february': '02', 'march': '03', 'april': '04',
  //     'may': '05', 'june': '06', 'july': '07', 'august': '08',
  //     'september': '09', 'october': '10', 'november': '11', 'december': '12'
  //   }

  //   const parts = dateString.toLowerCase().split(/\s+/)
  //   for (const part of parts) {
  //     if (months[part]) {
  //       const monthNum = months[part]
  //       // Extract day and year
  //       const dayMatch = dateString.match(/\b(\d{1,2})\b/)
  //       const yearMatch = dateString.match(/\b(20\d{2})\b/)
  //       if (dayMatch && yearMatch) {
  //         const day = dayMatch[1].padStart(2, '0')
  //         const year = yearMatch[1]
  //         return `${year}-${monthNum}-${day}`
  //       }
  //     }
  //   }

  //   return ''
  // }
const processOCR = async (file: File) => {
  setOcrProcessing(true)
  setMessage('')

  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch(OCR_SERVICE_URL, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.message || 'Invalid screenshot')
      return
    }

    const ocr = data.form_data

    setFormData(prev => ({
      ...prev,
      consulate: ocr.consulate ?? prev.consulate,
      visa_type: prev.visa_type, // user input
      earliest_date: ocr.earliest_available_date ?? '',
      latest_date: ocr.latest_available_date ?? '',
      slot_count: ocr.available_slots?.toString() ?? '',
    }))

    setMessage('Form auto-filled from screenshot. Please verify.')
  } catch (err) {
    setMessage('OCR service unavailable. Please fill manually.')
  } finally {
    setOcrProcessing(false)
  }
}

 const handleFileSelect = async (file: File) => {
  setScreenshot(file)

  const reader = new FileReader()
  reader.onloadend = () => setScreenshotPreview(reader.result as string)
  reader.readAsDataURL(file)

  await processOCR(file) 
}


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

const removeScreenshot = () => {
  setScreenshot(null)
  setScreenshotPreview(null)
  setOcrResult(null)
  setMessage('')
  if (fileInputRef.current) {
    fileInputRef.current.value = ''
  }
}


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('consulate', formData.consulate)
      formDataToSend.append('visa_type', formData.visa_type)
      formDataToSend.append('earliest_date', formData.earliest_date)
      if (formData.latest_date) {
        formDataToSend.append('latest_date', formData.latest_date)
      }
      if (screenshot) {
        formDataToSend.append('screenshot', screenshot)
      }

      const res = await fetch('/api/slot-reports', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Report submitted successfully!')
        setFormData({
          consulate: 'Mumbai',
          visa_type: 'B1/B2',
          earliest_date: '',
          latest_date: '',
          slot_count: '',
        })
        setScreenshot(null)
        setScreenshotPreview(null)
        setOcrResult(null)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setMessage(`Error: ${data.error || 'Failed to submit report'}`)
      }
    } catch (error) {
      setMessage('Error submitting report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="p-4 mb-6 bg-blue-500/10 border-blue-500/30">
        <p className="text-sm text-center text-muted-foreground">
          <strong className="text-foreground">USVisaBridge is not affiliated with the U.S. government.</strong> You book and submit forms yourself.
        </p>
      </Card>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit Slot Report</h1>
        <p className="text-muted-foreground text-lg">
          Help the community by reporting available visa slots
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Note:</strong> Please only submit reports for slots you have personally verified. 
              False reports may result in account restrictions.
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-red-500/10 border-red-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <p>
                <strong>Upload ONLY the calendar area.</strong> Do not include names, emails, confirmation pages, passport numbers, barcodes, or receipts.
              </p>
              <p>
                Uploads containing personal identifiers may be rejected. Crop your screenshot to show only the appointment calendar.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Screenshot Upload Section */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Screenshot (Recommended)
            </label>
            {!screenshot ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-muted/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium mb-2">
                  Drag and drop your screenshot here, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:underline"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG or JPEG, max 2MB. We'll extract form data automatically.
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                  ⚠ Crop to calendar area only. No names, emails, or personal info.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {ocrProcessing && (
                  <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Processing screenshot with OCR...
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Extracting visa slot information
                      </p>
                    </div>
                  </div>
                )}
                {ocrResult?.success && !ocrProcessing && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        Form auto-filled! Please verify the extracted data below.
                      </p>
                    </div>
                    {ocrResult.form_data?.available_slots && ocrResult.form_data.available_slots.length > 0 && (
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                          Extracted Slot Information:
                        </p>
                        <div className="space-y-2">
                          {ocrResult.form_data.available_slots.map((slot: any, idx: number) => (
                            slot.count && (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {slot.display || slot.date}
                                </span>
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
                                  {slot.count} slot{slot.count !== 1 ? 's' : ''}
                                </Badge>
                              </div>
                            )
                          ))}
                          {ocrResult.form_data.total_slots && (
                            <div className="pt-2 mt-2 border-t border-blue-500/20 flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Total:</span>
                              <Badge variant="secondary" className="bg-blue-600/20 text-blue-800 dark:text-blue-200 border-blue-600/30 font-semibold">
                                {ocrResult.form_data.total_slots} slots
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="relative inline-block">
                  <img
                    src={screenshotPreview || ''}
                    alt="Screenshot preview"
                    className="max-w-full h-auto max-h-64 rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={removeScreenshot}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {screenshot.name} ({(screenshot.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Visa Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.visa_type}
                onChange={(e) => setFormData({ ...formData, visa_type: e.target.value })}
                className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                required
              >
                {VALID_VISA_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Consulate <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.consulate}
                onChange={(e) => setFormData({ ...formData, consulate: e.target.value })}
                className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                required
              >
                {VALID_CONSULATES.map((consulate) => (
                  <option key={consulate} value={consulate}>
                    {consulate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Earliest Available Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.earliest_date}
                onChange={(e) => setFormData({ ...formData, earliest_date: e.target.value })}
                className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Latest Available Date (optional)
              </label>
              <input
                type="date"
                value={formData.latest_date}
                onChange={(e) => setFormData({ ...formData, latest_date: e.target.value })}
                min={formData.earliest_date}
                className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Leave empty if only one date is available
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Number of Available Slots (optional)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={formData.slot_count}
                onChange={(e) => setFormData({ ...formData, slot_count: e.target.value })}
                placeholder="e.g., 3, 6, 33"
                className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Total number of slots available (will be auto-filled from screenshot if detected)
              </p>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg border ${
              message.includes('Error') || message.includes('must be')
                ? 'bg-destructive/10 border-destructive/30 text-destructive'
                : message.includes('successfully')
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
            }`}>
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || ocrProcessing}
            className="w-full py-6 text-base"
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
    </div>
  )
}
