import 'server-only'
import type { LeadStatus } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { listWorkspaceLeads } from './lead.repository'
import type { CreateLeadInput } from '@/lib/validation'

export async function getLeads(workspaceId: string, query: { search?: string; status?: LeadStatus; take: number; cursor?: string }) {
  const rows = await listWorkspaceLeads(workspaceId, query)
  const hasMore = rows.length > query.take
  const items = hasMore ? rows.slice(0, query.take) : rows
  return { items, nextCursor: hasMore ? items.at(-1)?.id ?? null : null }
}

export async function addLead(workspaceId: string, actorUserId: string, input: CreateLeadInput) {
  return prisma.$transaction(async (tx) => {
    const lead = await tx.lead.create({
      data: { workspaceId, name: input.name, company: input.company, email: input.email, industry: input.industry, source: input.source, score: 0 },
    })
    await tx.auditEvent.create({
      data: { workspaceId, actorUserId, action: 'lead.created', entityType: 'Lead', entityId: lead.id, metadata: { source: input.source ?? null } },
    })
    return lead
  })
}
