/**
 * Confidence scoring v0 (rules-based)
 * 
 * Factors:
 * - Screenshot present: +0.30
 * - Reporter has previous verified reports: +0.20 (if >= 3)
 * - Cross-confirmations (similar reports in last 15 min): +0.25 per match (max +0.50)
 * 
 * Auto-verify threshold: >= 0.75
 */

export interface ScoringContext {
  hasScreenshot: boolean
  reporterVerifiedReportCount: number
  crossConfirmations: number // Count of similar reports in last 15 min
}

export function calculateConfidence(context: ScoringContext): number {
  let score = 0.50 // Base score

  // Screenshot bonus
  if (context.hasScreenshot) {
    score += 0.30
  }

  // Reporter reputation (if has 3+ verified reports)
  if (context.reporterVerifiedReportCount >= 3) {
    score += 0.20
  }

  // Cross-confirmations (similar reports in last 15 min)
  // Max 2 confirmations count (0.25 each, max +0.50)
  const confirmationBonus = Math.min(context.crossConfirmations, 2) * 0.25
  score += confirmationBonus

  // Cap at 1.0
  return Math.min(score, 1.0)
}

export function shouldAutoVerify(confidence: number): boolean {
  return confidence >= 0.75
}

