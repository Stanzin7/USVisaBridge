'use client'

import { useEffect, useState } from 'react'
import { VALID_VISA_TYPES, VALID_CONSULATES } from '@/lib/validators'

interface Preference {
  id: string
  visa_type: string
  consulate: string
  date_start: string | null
  date_end: string | null
  channels: string[]
  quiet_hours_start: number
  quiet_hours_end: number
}

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<Preference[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    visa_type: 'B1/B2',
    consulate: 'Mumbai',
    date_start: '',
    date_end: '',
    channels: ['email'] as string[],
    quiet_hours_start: 22,
    quiet_hours_end: 8,
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const res = await fetch('/api/preferences')
      const data = await res.json()
      if (data.data) {
        setPreferences(data.data)
      }
    } catch (error) {
      console.error('Error fetching preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date_start: formData.date_start || null,
          date_end: formData.date_end || null,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Preference saved successfully!')
        setFormData({
          visa_type: 'B1/B2',
          consulate: 'Mumbai',
          date_start: '',
          date_end: '',
          channels: ['email'],
          quiet_hours_start: 22,
          quiet_hours_end: 8,
        })
        fetchPreferences()
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage('Error saving preference')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this preference?')) return

    try {
      const res = await fetch(`/api/preferences?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setMessage('Preference deleted')
        fetchPreferences()
      }
    } catch (error) {
      setMessage('Error deleting preference')
    }
  }

  const toggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }))
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Alert Preferences</h1>
        <p className="text-gray-600">Configure when and how you receive slot alerts</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Preference</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visa Type
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
                Consulate
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.date_start}
                  onChange={(e) => setFormData({ ...formData, date_start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.date_end}
                  onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Channels
              </label>
              <div className="space-y-2">
                {['email', 'sms', 'push'].map((channel) => (
                  <label key={channel} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.channels.includes(channel)}
                      onChange={() => toggleChannel(channel)}
                      className="mr-2"
                    />
                    <span className="capitalize">{channel}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Save Preference
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

        {/* Existing Preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
          {preferences.length > 0 ? (
            <div className="space-y-4">
              {preferences.map((pref) => (
                <div key={pref.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{pref.visa_type} - {pref.consulate}</p>
                      {pref.date_start && (
                        <p className="text-sm text-gray-600">
                          {new Date(pref.date_start).toLocaleDateString()}
                          {pref.date_end && <> to {new Date(pref.date_end).toLocaleDateString()}</>}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Channels: {pref.channels.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(pref.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No preferences yet. Add one to get started!</p>
          )}
        </div>
      </div>
    </div>
  )
}

