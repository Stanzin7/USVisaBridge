// Shared configuration for alert channels - single source of truth
// This ensures "Coming Soon" status is consistent across homepage, preferences, and other pages

export type AlertChannelStatus = "available" | "coming-soon"

export type AlertChannel = {
  key: string
  label: string
  status: AlertChannelStatus
  description?: string
}

export const ALERT_CHANNELS: AlertChannel[] = [
  {
    key: "email",
    label: "Email",
    status: "available",
    description: "Instant email notifications to your inbox",
  },
  {
    key: "sms",
    label: "SMS",
    status: "coming-soon",
    description: "Text message alerts directly to your phone",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    status: "coming-soon",
    description: "WhatsApp notifications for instant updates",
  },
  {
    key: "push",
    label: "Push Notifications",
    status: "coming-soon",
    description: "Mobile app push notifications",
  },
]

// Helper to get available channels only
export const getAvailableChannels = () =>
  ALERT_CHANNELS.filter((ch) => ch.status === "available")

// Helper to check if a channel is available
export const isChannelAvailable = (key: string): boolean => {
  const channel = ALERT_CHANNELS.find((ch) => ch.key === key)
  return channel?.status === "available" ?? false
}

