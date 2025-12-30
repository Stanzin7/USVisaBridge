import { z } from 'zod'

// Valid visa types (US consulates)
export const VALID_VISA_TYPES = [
  'B1/B2',
  'F1',
  'H1B',
  'L1',
  'O1',
  'J1',
  'K1',
  'Other',
] as const

// Valid US consulates (major ones)
export const VALID_CONSULATES = [
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Bengaluru',
  'Pune',
  'Ahmedabad',
  'Other',
] as const

export type VisaType = typeof VALID_VISA_TYPES[number]
export type Consulate = typeof VALID_CONSULATES[number]

// Validation schemas
export const visaTypeSchema = z.enum(VALID_VISA_TYPES)
export const consulateSchema = z.enum(VALID_CONSULATES)

export const dateRangeSchema = z.object({
  date_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  date_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
}).refine(
  (data) => {
    if (data.date_start && data.date_end) {
      return new Date(data.date_start) <= new Date(data.date_end)
    }
    return true
  },
  { message: 'End date must be after start date' }
)

export const preferencesSchema = z.object({
  visa_type: visaTypeSchema,
  consulate: consulateSchema,
  date_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  date_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  channels: z.array(z.enum(['email', 'sms', 'push'])).default(['email']),
  quiet_hours_start: z.number().int().min(0).max(23).default(22),
  quiet_hours_end: z.number().int().min(0).max(23).default(8),
})

export const slotReportSchema = z.object({
  consulate: consulateSchema,
  visa_type: visaTypeSchema,
  earliest_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  latest_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
}).refine(
  (data) => {
    if (data.latest_date) {
      return new Date(data.earliest_date) <= new Date(data.latest_date)
    }
    return true
  },
  { message: 'Latest date must be after or equal to earliest date' }
)

// Helper functions
export function isValidVisaType(value: string): value is VisaType {
  return VALID_VISA_TYPES.includes(value as VisaType)
}

export function isValidConsulate(value: string): value is Consulate {
  return VALID_CONSULATES.includes(value as Consulate)
}

export function validateDateRange(start?: string, end?: string): boolean {
  if (!start && !end) return true
  if (!start || !end) return true
  return new Date(start) <= new Date(end)
}

