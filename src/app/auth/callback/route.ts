import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { ensurePersonalWorkspace } from '@/server/auth/workspace-provisioning'

const allowedOtpTypes = new Set<EmailOtpType>(['signup', 'email', 'invite', 'recovery', 'email_change', 'magiclink'])

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\\\')) {
    return '/dashboard'
  }
  return value
}

function loginError(request: NextRequest, message: string) {
  const url = new URL('/login', request.url)
  url.searchParams.set('error', message)
  return NextResponse.redirect(url)
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const rawType = searchParams.get('type')
  const next = safeNextPath(searchParams.get('next'))

  // Supabase can redirect failed/expired confirmation links back with error parameters.
  if (searchParams.has('error')) {
    return loginError(request, 'This confirmation link is invalid or has expired. Request a new confirmation email and use the latest link.')
  }

  const supabase = await createClient()
  let verificationError: { message: string } | null = null

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    verificationError = error
  } else if (tokenHash && rawType && allowedOtpTypes.has(rawType as EmailOtpType)) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: rawType as EmailOtpType,
    })
    verificationError = error
  } else {
    return loginError(request, 'The confirmation link is incomplete. Request a new confirmation email.')
  }

  if (verificationError) {
    return loginError(request, 'This confirmation link is invalid or has expired. Request a new confirmation email and use the latest link.')
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return loginError(request, 'Your email could not be verified. Request a new confirmation email and try again.')
  }

  if (!user.email_confirmed_at) {
    return loginError(request, 'Supabase did not confirm this email. Request a new confirmation email and use the latest link.')
  }

  try {
    const workspaceName =
      typeof user.user_metadata?.workspace_name === 'string'
        ? user.user_metadata.workspace_name
        : 'My Workspace'
    await ensurePersonalWorkspace(supabase, user.id, workspaceName)
  } catch {
    // The email is verified and the session is valid; preserve it and let the
    // authenticated workspace bootstrap handle a transient provisioning failure.
    const url = new URL('/dashboard', request.url)
    url.searchParams.set('workspace_setup', 'retry')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL(next, request.url))
}
