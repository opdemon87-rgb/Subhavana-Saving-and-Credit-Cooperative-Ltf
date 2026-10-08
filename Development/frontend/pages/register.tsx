'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from 'lucide-react'
import { apiPost, ApiError } from '@/lib/api-client'
import { Logo } from '@/components/home/logo'

const PROVINCES = [
  'Koshi',
  'Madhesh',
  'Bagmati',
  'Gandaki',
  'Lumbini',
  'Karnali',
  'Sudurpashchim',
]

export default function RegisterPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState<Record<string, string[]> | undefined>()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIssues(undefined)

    const fd = new FormData(e.currentTarget)
    const password = String(fd.get('password'))
    const confirm = String(fd.get('confirm'))

    if (password !== confirm) {
      setIssues({ confirm: ['Passwords do not match'] })
      return
    }

    setSubmitting(true)
    try {
      await apiPost('/api/auth/register', {
        fullName: String(fd.get('fullName')).trim(),
        email: String(fd.get('email')).trim(),
        phone: String(fd.get('phone')).trim(),
        password,
        province: String(fd.get('province')) || undefined,
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

  const inputCls =
    'w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400'

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Form */}
      <div className="flex items-center justify-center px-4 py-12 md:px-10">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-8 text-3xl font-bold tracking-tight">Become a member</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Open your savings account in under 2 minutes. No paperwork yet — our staff will
            contact you to verify KYC.
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
              <label htmlFor="fullName" className="text-sm font-medium">
                Full name
              </label>
              <div className="relative mt-1.5">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="fullName"
                  name="fullName"
                  required
                  autoComplete="name"
                  placeholder="Sita Shrestha"
                  aria-invalid={!!issues?.fullName}
                  className={inputCls}
                />
              </div>
              {issues?.fullName && (
                <p className="mt-1 text-xs text-red-600">{issues.fullName[0]}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                    className={inputCls}
                  />
                </div>
                {issues?.email && (
                  <p className="mt-1 text-xs text-red-600">{issues.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Mobile
                </label>
                <div className="relative mt-1.5">
                  <Phone
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="phone"
                    name="phone"
                    required
                    inputMode="numeric"
                    pattern="9\d{9}"
                    placeholder="98XXXXXXXX"
                    aria-invalid={!!issues?.phone}
                    className={inputCls}
                  />
                </div>
                {issues?.phone && (
                  <p className="mt-1 text-xs text-red-600">{issues.phone[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="province" className="text-sm font-medium">
                Province
              </label>
              <div className="relative mt-1.5">
                <Building2
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <select
                  id="province"
                  name="province"
                  defaultValue="Bagmati"
                  className="w-full appearance-none rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
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
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Min 8 characters"
                    aria-invalid={!!issues?.password}
                    className={inputCls}
                  />
                </div>
                {issues?.password && (
                  <p className="mt-1 text-xs text-red-600">{issues.password[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm" className="text-sm font-medium">
                  Confirm password
                </label>
                <div className="relative mt-1.5">
                  <Lock
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    aria-invalid={!!issues?.confirm}
                    className={inputCls}
                  />
                </div>
                {issues?.confirm && (
                  <p className="mt-1 text-xs text-red-600">{issues.confirm[0]}</p>
                )}
              </div>
            </div>

            <label className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                required
                className="mt-0.5 size-4 rounded border accent-[color:var(--primary)]"
              />
              <span>
                I agree to the{' '}
                <a href="#" className="font-medium text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Creating
                  account…
                </>
              ) : (
                <>
                  Create account <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Already a member?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
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
            <Sparkles className="size-3.5" aria-hidden="true" />
            Membership benefits
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight">
            Save more. Borrow smarter. Grow together.
          </h2>
          <ul className="mt-10 flex flex-col gap-5">
            {[
              ['Up to 12% p.a. on fixed deposits', 'Highest rate in the market for 3-year FD'],
              ['Loans from 11.5% p.a.', 'Agriculture, business, home, education'],
              ['12% dividend in FY 2082/83', 'Member-owned — profits return to you'],
              ['Free digital banking', 'QR payments, transfers, bill pay'],
            ].map(([title, sub]) => (
              <li key={title} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-emerald-100">{sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}