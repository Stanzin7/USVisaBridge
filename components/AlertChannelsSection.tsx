import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Smartphone, BellRing } from "lucide-react"
import { ALERT_CHANNELS } from "@/lib/alertChannels"

// Icon mapping for channels
const channelIcons: Record<string, typeof Mail> = {
  email: Mail,
  sms: MessageSquare,
  whatsapp: BellRing,
  push: Smartphone,
}

// Color mapping for channels
const channelColors: Record<string, { color: string; bgColor: string }> = {
  email: { color: "text-blue-400", bgColor: "bg-blue-500/10" },
  sms: { color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  whatsapp: { color: "text-green-400", bgColor: "bg-green-500/10" },
  push: { color: "text-purple-400", bgColor: "bg-purple-500/10" },
}

export function AlertChannelsSection() {
  const channels = ALERT_CHANNELS.map((ch) => ({
    icon: channelIcons[ch.key] || Mail,
    name: ch.label,
    description: ch.description || "",
    status: ch.status as "available" | "coming-soon",
    ...channelColors[ch.key],
  }))

  return (
    <section className="py-24 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Multiple Alert Channels</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">Get notified the way you prefer</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel, i) => (
            <Card key={i} className="p-6 bg-card border-border hover:border-primary/50 transition-all group relative">
              {channel.status === "coming-soon" && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs"
                >
                  Coming Soon
                </Badge>
              )}
              {channel.status === "available" && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs"
                >
                  Available
                </Badge>
              )}
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl ${channel.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <channel.icon className={`w-6 h-6 ${channel.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{channel.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
