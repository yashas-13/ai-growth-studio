'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ensurePersonalWorkspace } from '@/server/auth/workspace-provisioning'

const field = (form: FormData, key: string) => String(form.get(key) ?? '').trim()

function safeInternalPath(value: string, fallback = '/dashboard') {
  return value.startsWith('/') && !value.startsWith('//') && !value.includes('\\\\')
    ? value
    : fallback
}

function appOrigin() {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (!configured) throw new Error('NEXT_PUBLIC_APP_URL must be configured')
  const url = new URL(configured)
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_APP_URL must be a valid HTTP(S) origin')
  }
  return url.origin
}

export async function signInAction(form: FormData) {
  const email = field(form, 'email').toLowerCase()
  const password = String(form.get('password') ?? '')
  const destination = safeInternalPath(field(form, 'next'))

  if (!email || !password) {
    redirect('/login?error=Enter%20email%20and%20password')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    if (error?.code === 'email_not_confirmed' || error?.message.toLowerCase().includes('email not confirmed')) {
      redirect('/login?error=Email%20not%20confirmed.%20Use%20the%20resend%20form%20below%20to%20get%20a%20fresh%20link.')
    }
    redirect('/login?error=Invalid%20email%20or%20password')
  }

  try {
    const workspaceName =
      typeof data.user.user_metadata?.workspace_name === 'string'
        ? data.user.user_metadata.workspace_name
        : 'My Workspace'
    await ensurePersonalWorkspace(supabase, data.user.id, workspaceName)
  } catch {
    await supabase.auth.signOut()
    redirect('/login?error=Unable%20to%20prepare%20your%20workspace.%20Please%20try%20again.')
  }

  const target = destination === '/dashboard' ? '/dashboard?welcome=1' : destination
  redirect(target)
}

export async function signUpAction(form: FormData) {
  const email = field(form, 'email').toLowerCase()
  const password = String(form.get('password') ?? '')
  const fullName = field(form, 'full_name')
  const workspaceName = field(form, 'workspace_name')

  if (!email || password.length < 12 || !workspaceName) {
    redirect('/register?error=Check%20details%20and%20use%20a%2012%2B%20character%20password')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appOrigin()}/auth/callback`,
      data: { full_name: fullName, workspace_name: workspaceName },
    },
  })

  if (error) redirect('/register?error=Unable%20to%20create%20account')

  if (data.session && data.user) {
    try {
      await ensurePersonalWorkspace(supabase, data.user.id, workspaceName)
    } catch {
      await supabase.auth.signOut()
      redirect('/register?error=Account%20created%20but%20workspace%20setup%20failed.%20Please%20sign%20in%20again.')
    }
    redirect('/dashboard?welcome=1')
  }

  redirect('/login?message=Check%20your%20email%20to%20confirm%20your%20account')
}

export async function resendConfirmationAction(form: FormData) {
  const email = field(form, 'email').toLowerCase()
  if (!email || email.length > 254) {
    redirect('/login?message=If%20this%20account%20needs%20confirmation,%20a%20new%20email%20will%20be%20sent.')
  }

  try {
    const supabase = await createClient()
    await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: `${appOrigin()}/auth/callback` },
    })
  } catch {
    // Keep the response generic to avoid account enumeration and hide provider details.
  }

  redirect('/login?message=If%20this%20account%20needs%20confirmation,%20a%20new%20email%20will%20be%20sent.%20Use%20the%20latest%20link%20from%20your%20inbox.')
}

export async function forgotPasswordAction(form: FormData) {
  const email = field(form, 'email').toLowerCase()
  if (!email) redirect('/forgot-password?error=Enter%20your%20email')

  const supabase = await createClient()
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appOrigin()}/auth/callback?next=/settings/security`,
  })

  redirect('/login?message=If%20the%20account%20exists,%20a%20reset%20email%20has%20been%20sent')
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
