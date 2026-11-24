import 'server-only'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/server/http/app-error'
import { getAuthenticatedSession } from './session'

export type WorkspacePermission = 'workspace:read' | 'workspace:write' | 'workspace:admin'
const rolePermissions: Record<string, WorkspacePermission[]> = {
  OWNER: ['workspace:read', 'workspace:write', 'workspace:admin'],
  ADMIN: ['workspace:read', 'workspace:write', 'workspace:admin'],
  MEMBER: ['workspace:read', 'workspace:write'],
  VIEWER: ['workspace:read'],
}

export async function requireWorkspaceAccess(workspaceId: string, permission: WorkspacePermission) {
  const session = await getAuthenticatedSession()
  if (!session) throw new AppError('UNAUTHENTICATED', 'Authentication is required')

  const membership = await prisma.membership.findUnique({
    where: { userId_workspaceId: { userId: session.user.id, workspaceId } },
    select: { role: true, workspaceId: true },
  })
  if (!membership) throw new AppError('FORBIDDEN', 'You do not have access to this workspace')
  if (!rolePermissions[membership.role]?.includes(permission)) {
    throw new AppError('FORBIDDEN', 'Your workspace role does not allow this action')
  }
  return { userId: session.user.id, workspaceId, role: membership.role }
}
