/**
 * AI Embeddings utility for OpenAI text-embedding-3-small
 * Production-grade with error handling and type safety
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const EMBEDDING_MODEL = "text-embedding-3-small" // 1536 dimensions
const MAX_INPUT_LENGTH = 8000 // tokens

if (!OPENAI_API_KEY) {
  console.warn("[AI] OPENAI_API_KEY not set - embeddings will fail")
}

type EmbeddingResponse = {
  data: Array<{ embedding: number[]; index: number }>
  model: string
  usage: { prompt_tokens: number; total_tokens: number }
}

/**
 * Create embedding vector from text using OpenAI
 * @param input - Text to embed (will be truncated if too long)
 * @returns 1536-dimensional embedding vector
 */
export async function createEmbedding(input: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set")
  }

  // Truncate input to prevent token limit errors
  const truncatedInput = input.slice(0, MAX_INPUT_LENGTH)

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: truncatedInput,
      encoding_format: "float",
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI Embeddings API error: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as EmbeddingResponse

  if (!data.data || data.data.length === 0) {
    throw new Error("No embedding returned from OpenAI API")
  }

  return data.data[0].embedding
}

/**
 * Build profile summary text for embedding
 */
export function buildProfileSummary(profile: any): string {
  const parts: string[] = []

  if (profile.full_name) parts.push(`Name: ${profile.full_name}`)
  if (profile.location) parts.push(`Location: ${profile.location}`)
  if (profile.experience_years) parts.push(`Experience: ${profile.experience_years} years`)
  if (profile.skills && Array.isArray(profile.skills) && profile.skills.length > 0) {
    parts.push(`Skills: ${profile.skills.join(", ")}`)
  }

  return parts.join(" | ").slice(0, MAX_INPUT_LENGTH)
}

/**
 * Build job summary text for embedding
 */
export function buildJobSummary(job: any): string {
  const parts: string[] = []

  parts.push(`Title: ${job.title}`)
  parts.push(`Company: ${job.company}`)
  if (job.location) parts.push(`Location: ${job.location}`)
  if (job.type) parts.push(`Type: ${job.type}`)
  if (job.description) parts.push(`Description: ${job.description}`)
  if (job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0) {
    parts.push(`Requirements: ${job.requirements.join(", ")}`)
  }

  return parts.join(" | ").slice(0, MAX_INPUT_LENGTH)
}
