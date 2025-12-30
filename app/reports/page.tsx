'use client'

import { useState } from 'react'
import { VALID_VISA_TYPES, VALID_CONSULATES } from '@/lib/validators'
import { useRouter } from 'next/navigation'

export default function ReportsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    consulate: 'Mumbai',
    visa_type: 'B1/B2',
    earliest_date: '',
    latest_date: '',
  })
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
        })
        setScreenshot(null)
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage('Screenshot must be less than 2MB')
        return
      }
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        setMessage('Screenshot must be PNG or JPEG')
        return
      }
      setScreenshot(file)
      setMessage('')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Slot Report</h1>
        <p className="text-gray-600">Help the community by reporting available visa slots</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Please only submit reports for slots you have personally verified. 
            False reports may result in account restrictions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visa Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.visa_type}
                onChange={(e) => setFormData({ ...formData, visa_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consulate <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.consulate}
                onChange={(e) => setFormData({ ...formData, consulate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Earliest Available Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.earliest_date}
                onChange={(e) => setFormData({ ...formData, earliest_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latest Available Date (optional)
              </label>
              <input
                type="date"
                value={formData.latest_date}
                onChange={(e) => setFormData({ ...formData, latest_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty if only one date is available
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Screenshot (optional, max 2MB)
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {screenshot && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {screenshot.name} ({(screenshot.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded ${
              message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

