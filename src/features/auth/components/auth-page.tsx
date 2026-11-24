import Link from 'next/link'
import { Sparkles } from 'lucide-react'

type AuthMode = 'login' | 'register' | 'forgot-password'

const copy: Record<AuthMode, { title: string; subtitle: string; button: string }> = {
  login: { title: 'Welcome back', subtitle: 'Sign in to continue to your growth workspace.', button: 'Sign in' },
  register: { title: 'Create your workspace', subtitle: 'Start organizing your growth operations in one place.', button: 'Create account' },
  'forgot-password': { title: 'Reset your password', subtitle: 'Enter your email to request a password reset.', button: 'Send reset link' },
}

export function AuthPage({ mode }: { mode: AuthMode }) {
  const content = copy[mode]
  return <main className="auth-shell"><section className="auth-card"><Link href="/" className="auth-brand"><span><Sparkles size={18}/></span> growthstudio</Link><div className="eyebrow">AI GROWTH PLATFORM</div><h1>{content.title}</h1><p>{content.subtitle}</p><form action="#" className="auth-form"><label>Email address<input type="email" name="email" autoComplete="email" required placeholder="you@company.com"/></label>{mode !== 'forgot-password' && <label>Password<input type="password" name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={12} placeholder="At least 12 characters"/></label>}{mode === 'register' && <label>Workspace name<input name="workspace" required maxLength={120} placeholder="Your company"/></label>}<button className="btn btn-primary btn-md" type="submit" disabled>{content.button}</button><div className="auth-disabled">Authentication is not configured yet. Forms are intentionally disabled until the server-side identity provider is integrated.</div></form><div className="auth-links">{mode === 'login' && <Link href="/forgot-password">Forgot password?</Link>}{mode === 'login' ? <Link href="/register">Create an account</Link> : <Link href="/login">Back to sign in</Link>}</div></section></main>
}
