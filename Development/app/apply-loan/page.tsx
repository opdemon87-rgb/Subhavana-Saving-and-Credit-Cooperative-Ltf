'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Home,
  Loader2,
  Sprout,
  User,
  Wallet,
} from 'lucide-react'
import { apiPost, ApiError } from '@/lib/api-client'
import { formatNPR } from '@/lib/format'

const LOAN_TYPES = [
  { value: 'Agriculture Loan', icon: Sprout, rate: 11.5, desc: 'Seeds, livestock, equipment' },
  { value: 'Business Loan', icon: Briefcase, rate: 13.5, desc: 'Working capital for SMEs' },
  { value: 'Home Loan', icon: Home, rate: 12.5, desc: 'Long-term housing finance' },
  { value: 'Education Loan', icon: GraduationCap, rate: 11.0, desc: 'Tuition and living costs' },
  { value: 'Personal Loan', icon: Wallet, rate: 14.5, desc: 'Emergency and personal needs' },
] as const

type LoanType = (typeof LOAN_TYPES)[number]['value']

export default function ApplyLoanPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState<Record<string, string[]> | undefined>()
  const [reference, setReference] = useState<string | null>(null)

  const [loanType, setLoanType] = useState<LoanType>('Agriculture Loan')
  const [amount, setAmount] = useState(500_000)
  const [months, setMonths] = useState(24)

  const emi = useMemo(() => {
    const rate = LOAN_TYPES.find((t) => t.value === loanType)?.rate ?? 12
    const r = rate / 12 / 100
    if (amount <= 0 || months <= 0) return 0
    return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  }, [loanType, amount, months])

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
        loanType,
        amount,
        durationMonths: months,
        purpose: String(fd.get('purpose') || '').trim() || undefined,
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

  // ---------- Success state ----------
  if (reference) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Application received</h1>
        <p className="mt-3 text-muted-foreground">
          Our loan officer will contact you within 2 working days. Keep your reference number
          handy for follow-ups.
        </p>
        <div className="mt-8 w-full rounded-2xl border bg-secondary/60 p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Reference number
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-primary">{reference}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Loan type</dt>
              <dd className="font-semibold">{loanType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Amount</dt>
              <dd className="font-semibold tabular-nums">{formatNPR(amount)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Duration</dt>
              <dd className="font-semibold">
                {months} month{months === 1 ? '' : 's'}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Est. EMI</dt>
              <dd className="font-semibold tabular-nums">{formatNPR(Math.round(emi))}</dd>
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
              setMonths(24)
            }}
            className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition hover:bg-secondary"
          >
            Submit another
          </button>
        </div>
      </div>
    )
  }

  // ---------- Form ----------
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Loan Application
        </p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Apply for a loan in 2 minutes
        </h1>
        <p className="mt-3 text-muted-foreground">
          Fill in your details below. No documents needed yet — our officer will collect KYC
          and paperwork after the initial review.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Step 1 — Loan type */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              Choose loan type
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LOAN_TYPES.map(({ value, icon: Icon, rate, desc }) => {
                const active = loanType === value
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setLoanType(value)}
                    aria-pressed={active}
                    className={`group flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                      active
                        ? 'border-primary bg-accent shadow-sm ring-1 ring-primary/30'
                        : 'hover:border-primary/40 hover:bg-secondary/60'
                    }`}
                  >
                    <span
                      className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                      }`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-3 font-semibold">{value}</span>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                    <span className="mt-2 text-xs font-semibold text-primary">
                      from {rate.toFixed(2)}% p.a.
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Step 2 — Amount & duration */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              Amount & duration
            </h2>

            <div className="mt-5 flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Loan amount
                  </label>
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold tabular-nums text-primary">
                    {formatNPR(amount)}
                  </span>
                </div>
                <input
                  id="amount"
                  type="range"
                  min={50_000}
                  max={10_000_000}
                  step={50_000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="range-input mt-3"
                  style={
                    {
                      '--fill': `${((amount - 50_000) / (10_000_000 - 50_000)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>Rs. 50K</span>
                  <span>Rs. 1 Crore</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="months" className="text-sm font-medium">
                    Duration
                  </label>
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold tabular-nums text-primary">
                    {months} month{months === 1 ? '' : 's'}
                  </span>
                </div>
                <input
                  id="months"
                  type="range"
                  min={6}
                  max={240}
                  step={6}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="range-input mt-3"
                  style={
                    {
                      '--fill': `${((months - 6) / (240 - 6)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>6 months</span>
                  <span>20 years</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3 — Your details */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </span>
              Your details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
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
                    placeholder="Sita Shrestha"
                    aria-invalid={!!issues?.fullName}
                    className={`${inputCls} pl-10`}
                  />
                </div>
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

              <div className="sm:col-span-2">
                <label htmlFor="purpose" className="text-sm font-medium">
                  Purpose of loan <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={3}
                  maxLength={1000}
                  placeholder="e.g. Purchase of two buffaloes and animal feed for the upcoming season"
                  className={`mt-1.5 resize-none ${inputCls}`}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              By submitting you agree to our credit policy and KYC requirements.
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
                  Submit application <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-primary p-6 text-primary-foreground shadow-sm">
            <p className="text-sm text-emerald-100">Estimated monthly installment</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">
              {emi > 0 ? formatNPR(Math.round(emi)) : '—'}
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
              <div>
                <dt className="text-emerald-100">Principal</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                  {formatNPR(amount)}
                </dd>
              </div>
              <div>
                <dt className="text-emerald-100">Interest rate</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                  {LOAN_TYPES.find((t) => t.value === loanType)?.rate.toFixed(2)}%
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-emerald-100">
              Indicative only. Final rate depends on credit review and collateral.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border bg-secondary/60 p-5">
            <h3 className="text-sm font-semibold">What happens next?</h3>
            <ol className="mt-4 flex flex-col gap-4">
              {[
                ['Review', 'Loan officer verifies your details within 2 working days.'],
                ['Documents', 'Submit citizenship, PAN and income proof at your branch.'],
                ['Approval', 'Typical turnaround is 5–7 working days after documents.'],
                ['Disbursement', 'Funds credited directly to your savings account.'],
              ].map(([title, sub], i) => (
                <li key={title} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}