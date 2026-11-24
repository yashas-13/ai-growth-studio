import 'server-only'
import { prisma } from '@/lib/prisma'
import type { LeadStatus } from '@/generated/prisma/client'

export type ListLeadsQuery = { search?: string; status?: LeadStatus; take: number; cursor?: string }

export function listWorkspaceLeads(workspaceId: string, query: ListLeadsQuery) {
  return prisma.lead.findMany({
    where: {
      workspaceId,
      ...(query.status ? { status: query.status } : {}),
      ...(query.search ? { OR: [
        { name: { contains: query.search, mode: 'insensitive' } },
        { company: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ] } : {}),
    },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: query.take + 1,
    ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
  })
}
