
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { apiPost, ApiError } from '@/frontend/lib/api-client'
import { formatNPR } from '@/frontend/lib/format'

const FD_PLANS = [
  { months: 12, label: '1 Year', rate: 11.0 },
  { months: 24, label: '2 Years', rate: 11.5 },
  { months: 36, label: '3 Years', rate: 12.0 },
]

export default function OpenFdPage() {
  const [amount, setAmount] = useState(500_000)
  const [planMonths, setPlanMonths] = useState(36)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState<Record<string, string[]> | undefined>()
  const [reference, setReference] = useState<string | null>(null)

  const plan =
    FD_PLANS.find((p) => p.months === planMonths) ?? FD_PLANS[2]

  const maturity =
    amount * Math.pow(1 + plan.rate / 100 / 4, 4 * (plan.months / 12))

  const interest = maturity - amount

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIssues(undefined)
    setSubmitting(true)

    const fd = new FormData(e.currentTarget)

    try {
      const res = await apiPost<{ referenceNo: string }>(
        '/api/loan-applications',
        {
          fullName: String(fd.get('fullName')).trim(),
          email: String(fd.get('email')).trim(),
          phone: String(fd.get('phone')).trim(),
          loanType: 'Fixed Deposit',
          amount,
          durationMonths: planMonths,
          purpose: `Fixed Deposit — ${plan.label} at ${plan.rate.toFixed(2)}% p.a.`,
        },
      )

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
    'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400'

  if (reference) {
    return (
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />

        <h1 className="mt-6 text-3xl font-bold">
          Fixed Deposit request received
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your request has been submitted. Keep your reference number handy.
        </p>

        <section className="mt-8 w-full rounded-2xl border bg-secondary/60 p-5 text-left">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Reference number
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-primary">
            {reference}
          </p>

          <dl className="mt-4 space-y-3 border-t pt-4 text-sm">
            <div className="flex justify-between gap-3">
              <dt>Plan</dt>
              <dd className="font-semibold">
                {plan.label} · {plan.rate.toFixed(2)}% p.a.
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Deposit</dt>
              <dd className="font-semibold">{formatNPR(amount)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Maturity</dt>
              <dd className="font-semibold">
                {formatNPR(Math.round(maturity))}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Interest earned</dt>
              <dd className="font-semibold text-primary">
                + {formatNPR(Math.round(interest))}
              </dd>
            </div>
          </dl>
        </section>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
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
            className="rounded-lg border px-5 py-2.5 text-sm font-semibold"
          >
            Open another FD
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Open a Fixed Deposit</h1>
      <p className="mt-2 text-muted-foreground">
        Choose a plan and provide your contact details.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <section className="rounded-2xl border p-6">
          <h2 className="font-semibold">1. Choose amount and tenure</h2>

          <div className="mt-5">
            <div className="flex justify-between gap-3">
              <label htmlFor="amount" className="text-sm font-medium">
                Deposit amount
              </label>
              <span className="font-semibold text-primary">
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
              className="mt-3 w-full"
            />
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Tenure</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {FD_PLANS.map((p) => (
                <button
                  key={p.months}
                  type="button"
                  aria-pressed={planMonths === p.months}
                  onClick={() => setPlanMonths(p.months)}
                  className={`rounded-xl border p-3 ${
                    planMonths === p.months
                      ? 'border-primary bg-accent'
                      : 'hover:border-primary/40'
                  }`}
                >
                  <span className="block text-xs">{p.label}</span>
                  <span className="font-bold text-primary">
                    {p.rate.toFixed(2)}%
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="font-semibold">2. Your details</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                placeholder="Your full name"
                aria-invalid={!!issues?.fullName}
                className={`mt-1.5 ${inputCls}`}
              />
              {issues?.fullName && (
                <p className="mt-1 text-xs text-red-600">
                  {issues.fullName[0]}
                </p>
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
                <p className="mt-1 text-xs text-red-600">
                  {issues.email[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                Mobile number
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
                <p className="mt-1 text-xs text-red-600">
                  {issues.phone[0]}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm">Estimated maturity value</p>
          <p className="mt-2 text-3xl font-bold">
            {formatNPR(Math.round(maturity))}
          </p>
          <p className="mt-3 text-sm">Principal: {formatNPR(amount)}</p>
          <p className="text-sm">
            Interest earned: {formatNPR(Math.round(interest))}
          </p>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              Confirm FD request
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </main>
  )
}