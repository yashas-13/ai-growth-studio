import { redirect } from 'next/navigation'
import { AuthPage } from '@/features/auth/components/auth-page'
import { createClient } from '@/lib/supabase/server'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()

  if (data?.claims?.sub) redirect('/dashboard')

  const next =
    params.next?.startsWith('/') && !params.next.startsWith('//') && !params.next.includes('\\\\')
      ? params.next
      : '/dashboard'

  return <AuthPage mode="login" error={params.error} message={params.message} next={next} />
}
