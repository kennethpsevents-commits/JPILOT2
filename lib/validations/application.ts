import { z } from "zod"

export const applicationSchema = z.object({
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters")
    .max(2000, "Cover letter must be less than 2000 characters"),
})

export type ApplicationInput = z.infer<typeof applicationSchema>
