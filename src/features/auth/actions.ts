'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ensurePersonalWorkspace } from '@/server/auth/workspace-provisioning'

const field = (form: FormData, key: string) => String(form.get(key) ?? '').trim()

export async function signInAction(form: FormData) {
  const email = field(form, 'email').toLowerCase()
  const password = String(form.get('password') ?? '')

  if (!email || !password) {
    redirect('/login?error=Enter%20email%20and%20password')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
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

  redirect('/dashboard?welcome=1')
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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/auth/callback`,
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

export async function forgotPasswordAction(form: FormData) {
  const email = field(form, 'email').toLowerCase()
  if (!email) redirect('/forgot-password?error=Enter%20your%20email')

  const supabase = await createClient()
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/auth/callback?next=/settings/security`,
  })

  redirect('/login?message=If%20the%20account%20exists,%20a%20reset%20email%20has%20been%20sent')
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
