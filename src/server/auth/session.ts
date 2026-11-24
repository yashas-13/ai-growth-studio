import 'server-only'

export type AuthenticatedSession = {
  user: { id: string; email: string }
  sessionId: string
}

/**
 * Fail-closed integration seam. Replace this implementation with the selected
 * server-side identity provider (Auth.js recommended in ADR-002). Never accept
 * userId, role, or workspace membership from request JSON or client headers.
 */
export async function getAuthenticatedSession(): Promise<AuthenticatedSession | null> {
  return null
}
