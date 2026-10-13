'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Loader2, Lock, TrendingUp } from 'lucide-react'
import { apiPost, ApiError } from '@/frontend/lib/api-client'
import { formatNPR } from '@/frontend/lib/format'

const FD_PLANS = [
  { months: 12, label: '1 Year', rate: 11.0 },
  { months: 24, label: '2 Years', rate: 11.5 },
  { months: 36, label: '3 Years', rate: 12.0 },
]

export default function OpenFdPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState<Record<string, string[]> | undefined>()
  const [reference, setReference] = useState<string | null>(null)

  const [amount, setAmount] = useState(500_000)
  const [planMonths, setPlanMonths] = useState(36)

  const plan = FD_PLANS.find((p) => p.months === planMonths) ?? FD_PLANS[2]
  const maturity = amount * Math.pow(1 + plan.rate / 100 / 4, 4 * (plan.months / 12))
  const interest = maturity - amount

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIssues(undefined)
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await apiPost<{ referenceNo: string }>('/api/loan-applications', {
        fullName: String(fd.get('fullName')).trim(),
        email: String(fd.get('email')).trim(),
        phone: String(fd.get('phone')).trim(),
        loanType: 'Fixed Deposit',
        amount,
        durationMonths: planMonths,
        purpose: `Fixed Deposit — ${plan.label} at ${plan.rate.toFixed(2)}% p.a.`,
      })
      setReference(res.referenceNo)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
    'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400'

  // Success state
  if (reference) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Fixed Deposit request received</h1>
        <p className="mt-3 text-muted-foreground">
          Our team will contact you within 1 working day to confirm your FD and complete the
          documentation. Keep your reference number handy.
        </p>

        <div className="mt-8 w-full rounded-2xl border bg-secondary/60 p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Reference number
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-primary">{reference}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Plan</dt>
              <dd className="font-semibold">
                {plan.label} · {plan.rate.toFixed(2)}% p.a.
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Deposit</dt>
              <dd className="font-semibold tabular-nums">{formatNPR(amount)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Maturity</dt>
              <dd className="font-semibold tabular-nums">{formatNPR(Math.round(maturity))}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Interest earned</dt>
              <dd className="font-semibold tabular-nums text-primary">
                + {formatNPR(Math.round(interest))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-emerald-900"
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => {
              setReference(null)
              setAmount(500_000)
              setPlanMonths(36)
            }}
            className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition hover:bg-secondary"
          >
            Open another FD
          </button>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Fixed Deposit
        </p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Open a Fixed Deposit in 2 minutes
        </h1>
        <p className="mt-3 text-muted-foreground">
          Lock in up to <span className="font-semibold text-primary">12% p.a.</span> for 3 years.
          Our team will contact you to confirm and complete the paperwork.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Amount + plan */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              Choose amount & tenure
            </h2>

            <div className="mt-5 flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Deposit amount
                  </label>
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold tabular-nums text-primary">
                    {formatNPR(amount)}
                  </span>
                </div>
                <input
                  id="amount"
                  type="range"
                  min={25_000}
                  max={10_000_000}
                  step={25_000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="range-input mt-3"
                  style={
                    {
                      '--fill': `${((amount - 25_000) / (10_000_000 - 25_000)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>Rs. 25K</span>
                  <span>Rs. 1 Crore</span>
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-medium">Tenure</legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {FD_PLANS.map((p) => {
                    const active = p.months === planMonths
                    return (
                      <button
                        type="button"
                        key={p.months}
                        onClick={() => setPlanMonths(p.months)}
                        aria-pressed={active}
                        className={`flex flex-col items-center rounded-xl border p-3 transition-colors ${
                          active
                            ? 'border-primary bg-accent'
                            : 'hover:border-primary/40'
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">{p.label}</span>
                        <span className="text-base font-bold tabular-nums text-primary">
                          {p.rate.toFixed(2)}%
                        </span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            </div>
          </section>

          {/* Details */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              Your details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Sunita Maharjan"
                  aria-invalid={!!issues?.fullName}
                  className={`mt-1.5 ${inputCls}`}
                />
                {issues?.fullName && (
                  <p className="mt-1 text-xs text-red-600">{issues.fullName[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  aria-invalid={!!issues?.email}
                  className={`mt-1.5 ${inputCls}`}
                />
                {issues?.email && (
                  <p className="mt-1 text-xs text-red-600">{issues.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Mobile
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  inputMode="numeric"
                  pattern="9\d{9}"
                  placeholder="98XXXXXXXX"
                  aria-invalid={!!issues?.phone}
                  className={`mt-1.5 ${inputCls}`}
                />
                {issues?.phone && (
                  <p className="mt-1 text-xs text-red-600">{issues.phone[0]}</p>
                )}
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              By submitting you agree to the FD terms and KYC requirements.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Submitting…
                </>
              ) : (
                <>
                  Confirm FD request <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-primary p-6 text-primary-foreground shadow-sm">
            <p className="text-sm text-emerald-100">Maturity value</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">
              {formatNPR(Math.round(maturity))}
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
              <div>
                <dt className="text-emerald-100">Principal</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                  {formatNPR(amount)}
                </dd>
              </div>
              <div>
                <dt className="text-emerald-100">Interest</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-gold">
                  + {formatNPR(Math.round(interest))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 rounded-2xl border bg-secondary/60 p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Lock className="size-4 text-primary" aria-hidden="true" />
              Why Subhavana FD
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                Up to 12% p.a. — highest in Kathmandu Valley
              </li>
              <li className="flex gap-2">
                <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                Quarterly compounding, credited to your account
              </li>
              <li className="flex gap-2">
                <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                DCGF deposit guarantee up to Rs. 5 lakh
              </li>
              <li className="flex gap-2">
                <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                Loan against FD available at 2% above FD rate
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}