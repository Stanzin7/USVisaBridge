import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.ALERT_FROM_EMAIL || 'noreply@visaslot.app'

// Initialize Resend only if API key is present
const resend = resendApiKey ? new Resend(resendApiKey) : null

export interface AlertEmailData {
  to: string
  visaType: string
  consulate: string
  earliestDate: string
  latestDate?: string
  reportUrl?: string
}

/**
 * Send alert email to user
 * Falls back to logging in development if Resend is not configured
 */
export async function sendAlertEmail(data: AlertEmailData): Promise<{ success: boolean; error?: string }> {
  const subject = `Visa Slot Alert: ${data.visaType} at ${data.consulate}`
  
  const dateRange = data.latestDate && data.latestDate !== data.earliestDate
    ? `${data.earliestDate} to ${data.latestDate}`
    : data.earliestDate

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Visa Slot Alert</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Visa Slot Alert</h2>
          <p>A new visa slot has been reported:</p>
          <ul>
            <li><strong>Visa Type:</strong> ${data.visaType}</li>
            <li><strong>Consulate:</strong> ${data.consulate}</li>
            <li><strong>Available Dates:</strong> ${dateRange}</li>
          </ul>
          ${data.reportUrl ? `<p><a href="${data.reportUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Report</a></p>` : ''}
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">
            <strong>Important:</strong> This alert is based on user-submitted reports only. 
            We are not affiliated with the US government and do not book appointments. 
            Please verify availability directly with the consulate.
          </p>
          <p style="font-size: 12px; color: #666;">
            To manage your alert preferences, visit your dashboard.
          </p>
        </div>
      </body>
    </html>
  `

  const text = `
Visa Slot Alert

A new visa slot has been reported:
- Visa Type: ${data.visaType}
- Consulate: ${data.consulate}
- Available Dates: ${dateRange}

${data.reportUrl ? `View Report: ${data.reportUrl}` : ''}

Important: This alert is based on user-submitted reports only. We are not affiliated with the US government and do not book appointments. Please verify availability directly with the consulate.

To manage your alert preferences, visit your dashboard.
  `

  // If Resend is not configured, log to console (development mode)
  if (!resend) {
    console.log('[EMAIL] Would send alert email:', {
      to: data.to,
      subject,
      html: html.substring(0, 200) + '...',
    })
    return { success: true }
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: data.to,
      subject,
      html,
      text,
    })
    return { success: true }
  } catch (error) {
    console.error('[EMAIL] Failed to send alert email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

