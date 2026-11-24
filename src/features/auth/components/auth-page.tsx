import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { forgotPasswordAction, signInAction, signUpAction } from '@/features/auth/actions'

type Mode = 'login' | 'register' | 'forgot-password'
const copy: Record<Mode, { title: string; subtitle: string; button: string }> = {
  login: { title: 'Welcome back', subtitle: 'Sign in to continue to your growth workspace.', button: 'Sign in' },
  register: { title: 'Create your workspace', subtitle: 'Start organizing your growth operations in one place.', button: 'Create account' },
  'forgot-password': { title: 'Reset your password', subtitle: 'Enter your email to request a password reset.', button: 'Send reset link' },
}

export function AuthPage({
  mode,
  error,
  message,
  next = '/dashboard',
}: {
  mode: Mode
  error?: string
  message?: string
  next?: string
}) {
  const c = copy[mode]
  const action = mode === 'login' ? signInAction : mode === 'register' ? signUpAction : forgotPasswordAction

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link href="/" className="auth-brand"><span><Sparkles size={18} /></span> growthstudio</Link>
        <div className="eyebrow">AI GROWTH PLATFORM</div>
        <h1>{c.title}</h1>
        <p>{c.subtitle}</p>
        {error && <p role="alert" className="auth-error">{error}</p>}
        {message && <p role="status" className="auth-message">{message}</p>}
        <form action={action} className="auth-form">
          {mode === 'login' && <input type="hidden" name="next" value={next} />}
          {mode === 'register' && <label>Full name<input name="full_name" autoComplete="name" maxLength={160} required /></label>}
          <label>Email address<input type="email" name="email" autoComplete="email" required placeholder="you@company.com" /></label>
          {mode !== 'forgot-password' && <label>Password<input type="password" name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={mode === 'login' ? undefined : 12} placeholder={mode === 'login' ? 'Enter your password' : 'At least 12 characters'} /></label>}
          {mode === 'register' && <label>Workspace name<input name="workspace_name" required maxLength={120} placeholder="Your company" /></label>}
          <button className="btn btn-primary btn-md" type="submit">{c.button}</button>
        </form>
        <div className="auth-links">
          {mode === 'login' && <Link href="/forgot-password">Forgot password?</Link>}
          {mode === 'login' ? <Link href="/register">Create an account</Link> : <Link href="/login">Back to sign in</Link>}
        </div>
      </section>
    </main>
  )
}
