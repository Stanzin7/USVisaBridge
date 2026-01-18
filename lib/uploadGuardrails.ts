import sharp from 'sharp'
import crypto from 'crypto'

export interface GuardrailResult {
  passed: boolean
  reason?: string
  imageHash?: string
  processedImageBuffer?: Buffer
  dimensions?: { width: number; height: number }
}

export interface GuardrailConfig {
  maxWidth: number
  maxHeight: number
  maxMegapixels: number
  maxFileSize: number // in bytes
}

const DEFAULT_CONFIG: GuardrailConfig = {
  maxWidth: 1400,
  maxHeight: 900,
  maxMegapixels: 1.5,
  maxFileSize: 2 * 1024 * 1024, // 2MB
}

// PII detection patterns
const PII_PATTERNS = [
  // Email addresses
  /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  // Common PII keywords
  /\b(passport|receipt|confirmation|UID|CGI|MRV|barcode|qr\s*code)\b/i,
  // Long alphanumeric IDs (10+ chars)
  /[A-Z0-9]{10,}/,
  // Long digit sequences (8+ digits)
  /\d{8,}/,
  // Common visa portal identifiers
  /\b[A-Z]{2,3}\d{8,}/, // e.g., "MRV12345678"
]

/**
 * Calculate SHA256 hash of image buffer
 */
function calculateImageHash(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

/**
 * Check if text contains PII patterns
 */
function detectPII(text: string): boolean {
  const normalizedText = text.toLowerCase()
  return PII_PATTERNS.some(pattern => pattern.test(normalizedText))
}

/**
 * Server-side guardrails for screenshot uploads
 * - Strips EXIF metadata
 * - Validates dimensions and megapixels
 * - Performs PII detection on OCR text (if provided)
 * - Returns processed image buffer and hash
 */
export async function validateAndProcessImage(
  imageBuffer: Buffer,
  ocrText?: string,
  config: Partial<GuardrailConfig> = {}
): Promise<GuardrailResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  try {
    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata()
    const width = metadata.width || 0
    const height = metadata.height || 0
    const megapixels = (width * height) / 1_000_000

    // Check dimensions
    if (width > finalConfig.maxWidth) {
      return {
        passed: false,
        reason: `Image width (${width}px) exceeds maximum allowed (${finalConfig.maxWidth}px). Please crop tighter to calendar only.`,
      }
    }

    if (height > finalConfig.maxHeight) {
      return {
        passed: false,
        reason: `Image height (${height}px) exceeds maximum allowed (${finalConfig.maxHeight}px). Please crop tighter to calendar only.`,
      }
    }

    // Check megapixels
    if (megapixels > finalConfig.maxMegapixels) {
      return {
        passed: false,
        reason: `Image size (${megapixels.toFixed(2)}MP) exceeds maximum allowed (${finalConfig.maxMegapixels}MP). Please crop tighter to calendar only.`,
      }
    }

    // PII detection on OCR text if provided
    if (ocrText && detectPII(ocrText)) {
      return {
        passed: false,
        reason: 'Image appears to contain personal identifiers (names, emails, confirmation numbers, etc.). Please crop tighter to calendar only.',
      }
    }

    // Strip EXIF and process image
    const processedBuffer = await sharp(imageBuffer)
      .removeAlpha() // Remove alpha channel if present
      .jpeg({ quality: 85, mozjpeg: true }) // Convert to JPEG, strip EXIF
      .toBuffer()

    // Check final file size
    if (processedBuffer.length > finalConfig.maxFileSize) {
      return {
        passed: false,
        reason: `Processed image size (${(processedBuffer.length / 1024).toFixed(1)}KB) exceeds maximum allowed (${(finalConfig.maxFileSize / 1024).toFixed(0)}KB). Please crop tighter to calendar only.`,
      }
    }

    // Calculate hash
    const imageHash = calculateImageHash(processedBuffer)

    return {
      passed: true,
      imageHash,
      processedImageBuffer: processedBuffer,
      dimensions: { width, height },
    }
  } catch (error) {
    console.error('[Guardrails] Error processing image:', error)
    return {
      passed: false,
      reason: 'Failed to process image. Please ensure it is a valid image file.',
    }
  }
}

/**
 * Convert File/Blob to Buffer (for use in API routes)
 */
export async function fileToBuffer(file: File | Blob): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

