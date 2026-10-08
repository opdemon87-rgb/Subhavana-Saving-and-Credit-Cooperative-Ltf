'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { apiPost, ApiError } from '@/lib/api-client'
import { Logo } from '@/components/home/logo'

const benefits = [
  { icon: ShieldCheck, text: 'Deposits protected under DCGF up to Rs. 5 lakh' },
  { icon: Smartphone, text: 'Mobile banking — check balance & transfer anytime' },
  { icon: CheckCircle2, text: 'Track loan applications and download statements' },
]

export default function LoginPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState<Record<string, string[]> | undefined>()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIssues(undefined)
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    try {
      await apiPost('/api/auth/login', {
        email: String(fd.get('email')).trim(),
        password: String(fd.get('password')),
      })
      router.push('/')
      router.refresh()
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        setIssues(err.issues)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Form */}
      <div className="flex items-center justify-center px-4 py-12 md:px-10">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-8 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your member account to manage savings, loans, and statements.
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!issues?.email}
                  className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400"
                />
              </div>
              {issues?.email && <p className="mt-1 text-xs text-red-600">{issues.email[0]}</p>}
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1.5">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={!!issues?.password}
                  className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400"
                />
              </div>
              {issues?.password && (
                <p className="mt-1 text-xs text-red-600">{issues.password[0]}</p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="remember"
                className="size-4 rounded border accent-[color:var(--primary)]"
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Become a member
              </Link>
            </p>

            <div className="mt-2 rounded-lg border border-dashed bg-secondary/50 px-3 py-2.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Demo account:</span>{' '}
              <span className="font-mono">demo@sajhabachat.coop.np</span> /{' '}
              <span className="font-mono">demo1234</span>
            </div>
          </form>
        </div>
      </div>

      {/* Marketing panel */}
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-center lg:px-14">
        <div
          className="absolute -right-24 -top-24 size-96 rounded-full bg-gold/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
            Member Portal
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight">
            Your savings, loans and statements — in one place.
          </h2>
          <p className="mt-3 text-sm text-emerald-100">
            Serving 208,000+ members across all 7 provinces since 2058 B.S.
          </p>
          <ul className="mt-10 flex flex-col gap-4">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="pt-1.5 text-emerald-50">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}