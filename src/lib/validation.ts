import { z } from 'zod'

// Tenant identity and lead score are server-owned; never accept either from a browser payload.
export const createLeadSchema = z.object({
  name: z.string().trim().min(1).max(160),
  company: z.string().trim().min(1).max(160),
  email: z.email().max(320).transform((value) => value.toLowerCase()).optional(),
  industry: z.string().trim().max(100).optional(),
  source: z.string().trim().max(120).optional(),
}).strict()

export type CreateLeadInput = z.infer<typeof createLeadSchema>
