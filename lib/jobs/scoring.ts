/**
 * Combined relevance + recency scoring for job search
 * Formula: combined_score = alpha * similarity + beta * recency_score
 */

export interface ScoringWeights {
  alpha: number // Similarity weight (0-1)
  beta: number // Recency weight (0-1)
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  alpha: 0.7, // 70% weight on semantic similarity
  beta: 0.3, // 30% weight on recency
}

/**
 * Calculate recency score (0-1) based on posted date
 * More recent jobs get higher scores
 */
export function calculateRecencyScore(postedDate: Date): number {
  const now = new Date()
  const daysSincePosted = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24))

  // Exponential decay: jobs lose 10% score per day
  // After 30 days, score approaches 0
  const decayRate = 0.1
  const score = Math.exp(-decayRate * daysSincePosted)

  return Math.max(0, Math.min(1, score))
}

/**
 * Combine similarity and recency scores
 */
export function calculateCombinedScore(
  similarity: number,
  postedDate: Date,
  weights: ScoringWeights = DEFAULT_WEIGHTS,
): number {
  const recencyScore = calculateRecencyScore(postedDate)
  const combined = weights.alpha * similarity + weights.beta * recencyScore

  return Math.max(0, Math.min(1, combined))
}

/**
 * Sort jobs by combined score
 */
export interface ScoredJob {
  id: string
  similarity: number
  postedDate: Date
  [key: string]: unknown
}

export function sortJobsByScore(jobs: ScoredJob[], weights?: ScoringWeights): ScoredJob[] {
  return jobs
    .map((job) => ({
      ...job,
      combinedScore: calculateCombinedScore(job.similarity, job.postedDate, weights),
    }))
    .sort((a, b) => b.combinedScore - a.combinedScore)
}
