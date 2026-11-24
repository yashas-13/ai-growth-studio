import { z } from "zod";

export const createLeadSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().trim().min(1).max(160),
  company: z.string().trim().min(1).max(160),
  email: z.email().max(320).optional(),
  industry: z.string().trim().max(100).optional(),
  score: z.number().int().min(0).max(100).default(0),
  source: z.string().trim().max(120).optional(),
}).strict();

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
