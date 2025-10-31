-- Enable pgvector extension for AI embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to jobs table (1536 dimensions for text-embedding-3-small)
ALTER TABLE IF EXISTS public.jobs
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create index for fast vector similarity search
CREATE INDEX IF NOT EXISTS jobs_embedding_idx ON public.jobs 
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Create match_jobs RPC function for AI-powered job matching
CREATE OR REPLACE FUNCTION public.match_jobs(
  user_vector double precision[], 
  limit_count integer DEFAULT 10
)
RETURNS TABLE(job_id uuid, score float)
LANGUAGE sql STABLE
AS $$
  SELECT 
    id as job_id,
    (1 - (embedding <=> (user_vector::vector)))::float as score
  FROM public.jobs
  WHERE embedding IS NOT NULL
    AND status = 'active'
  ORDER BY embedding <=> (user_vector::vector)
  LIMIT limit_count;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.match_jobs(double precision[], integer) TO authenticated;

-- Add comment for documentation
COMMENT ON FUNCTION public.match_jobs IS 'AI-powered job matching using pgvector cosine similarity. Returns jobs ranked by semantic similarity to user profile embedding.';
