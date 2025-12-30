// Database type definitions (simplified - Supabase generates these)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      preferences: {
        Row: {
          id: string
          user_id: string
          visa_type: string
          consulate: string
          date_start: string | null
          date_end: string | null
          channels: string[]
          quiet_hours_start: number
          quiet_hours_end: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          visa_type: string
          consulate: string
          date_start?: string | null
          date_end?: string | null
          channels?: string[]
          quiet_hours_start?: number
          quiet_hours_end?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          visa_type?: string
          consulate?: string
          date_start?: string | null
          date_end?: string | null
          channels?: string[]
          quiet_hours_start?: number
          quiet_hours_end?: number
          created_at?: string
          updated_at?: string
        }
      }
      slot_reports: {
        Row: {
          id: string
          reporter_id: string | null
          consulate: string
          visa_type: string
          earliest_date: string
          latest_date: string | null
          screenshot_path: string | null
          source: string
          confidence: number
          status: 'pending' | 'verified' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reporter_id?: string | null
          consulate: string
          visa_type: string
          earliest_date: string
          latest_date?: string | null
          screenshot_path?: string | null
          source?: string
          confidence?: number
          status?: 'pending' | 'verified' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string | null
          consulate?: string
          visa_type?: string
          earliest_date?: string
          latest_date?: string | null
          screenshot_path?: string | null
          source?: string
          confidence?: number
          status?: 'pending' | 'verified' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      report_verification: {
        Row: {
          id: string
          report_id: string
          reviewer_id: string | null
          decision: 'verified' | 'rejected'
          reason_codes: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          reviewer_id?: string | null
          decision: 'verified' | 'rejected'
          reason_codes?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          reviewer_id?: string | null
          decision?: 'verified' | 'rejected'
          reason_codes?: string[] | null
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          report_id: string
          channel: 'email' | 'sms' | 'push'
          status: 'pending' | 'sent' | 'failed'
          error: string | null
          sent_at: string | null
          dedupe_key: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          report_id: string
          channel: 'email' | 'sms' | 'push'
          status?: 'pending' | 'sent' | 'failed'
          error?: string | null
          sent_at?: string | null
          dedupe_key: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          report_id?: string
          channel?: 'email' | 'sms' | 'push'
          status?: 'pending' | 'sent' | 'failed'
          error?: string | null
          sent_at?: string | null
          dedupe_key?: string
          created_at?: string
        }
      }
      audit_events: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          meta: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          meta?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string | null
          action?: string
          meta?: Record<string, any> | null
          created_at?: string
        }
      }
    }
  }
}

