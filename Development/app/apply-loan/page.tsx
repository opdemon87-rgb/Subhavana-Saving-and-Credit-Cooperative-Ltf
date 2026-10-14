
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { apiPost, ApiError } from '@/lib/api-client'
import { formatNPR } from '@/lib/format'

const LOAN_TYPES = [
  { value: 'Agriculture Loan', rate: 11.5 },
  { value: 'Business Loan', rate: 13.5 },
  { value: 'Home Loan', rate: 12.5 },
  { value: 'Education Loan', rate: 11.0 },
  { value: 'Personal Loan', rate: 14.5 },
] as const

type LoanType = (typeof LOAN_TYPES)[number]['value']

export default function ApplyLoanPage() {
  const [loanType, setLoanType] = useState<LoanType>('Agriculture Loan')
  const [amount, setAmount] = useState(500_000)
  const [months, setMonths] = useState(24)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState<Record<string, string[]> | undefined>()
  const [reference, setReference] = useState<string | null>(null)

  const rate = LOAN_TYPES.find((t) => t.value === loanType)?.rate ?? 12
  const r = rate / 1200
  const emi = r > 0
    ? (amount * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1)
    : amount / months

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
          loanType,
          amount,
          durationMonths: months,
          purpose: String(fd.get('purpose') || '').trim() || undefined,
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
    'mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400'

  if (reference) {
    return (
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-bold">Application received</h1>
        <p className="mt-3 text-muted-foreground">
          Keep your reference number handy for follow-ups.
        </p>

        <section className="mt-8 w-full rounded-2xl border p-5 text-left">
          <p className="text-xs uppercase text-muted-foreground">Reference number</p>
          <p className="mt-1 font-mono text-lg font-bold text-primary">{reference}</p>
          <dl className="mt-4 space-y-3 border-t pt-4 text-sm">
            <div className="flex justify-between gap-3">
              <dt>Loan type</dt><dd className="font-semibold">{loanType}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Amount</dt><dd className="font-semibold">{formatNPR(amount)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Duration</dt><dd className="font-semibold">{months} months</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Estimated EMI</dt>
              <dd className="font-semibold">{formatNPR(Math.round(emi))}</dd>
            </div>
          </dl>
        </section>

        <div className="mt-6 flex gap-3">
          <Link href="/" className="rounded-lg bg-primary px-5 py-3 text-primary-foreground">
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => {
              setReference(null)
              setAmount(500_000)
              setMonths(24)
            }}
            className="rounded-lg border px-5 py-3"
          >
            Submit another
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Apply for a Loan</h1>
      <p className="mt-2 text-muted-foreground">
        Complete the form to submit your application.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-2xl border p-6">
          <h2 className="font-semibold">Loan type</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {LOAN_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                aria-pressed={loanType === type.value}
                onClick={() => setLoanType(type.value)}
                className={`rounded-xl border p-3 text-left ${
                  loanType === type.value ? 'border-primary bg-accent' : ''
                }`}
              >
                <span className="block font-medium">{type.value}</span>
                <span className="text-sm text-muted-foreground">{type.rate}% p.a.</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="font-semibold">Amount and duration</h2>
          <div className="mt-5">
            <label htmlFor="amount" className="flex justify-between text-sm">
              Loan amount <span className="font-semibold">{formatNPR(amount)}</span>
            </label>
            <input
              id="amount"
              type="range"
              min={50_000}
              max={10_000_000}
              step={50_000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="months" className="flex justify-between text-sm">
              Duration <span className="font-semibold">{months} months</span>
            </label>
            <input
              id="months"
              type="range"
              min={6}
              max={240}
              step={6}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>
          <div className="mt-6 rounded-xl bg-primary p-5 text-primary-foreground">
            <p className="text-sm">Estimated monthly installment</p>
            <p className="mt-2 text-3xl font-bold">{formatNPR(Math.round(emi))}</p>
            <p className="mt-2 text-sm">Indicative rate: {rate}% p.a.</p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="font-semibold">Your details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="text-sm font-medium">Full name</label>
              <input id="fullName" name="fullName" required className={inputCls} aria-invalid={!!issues?.fullName} />
              {issues?.fullName && <p className="mt-1 text-xs text-red-600">{issues.fullName[0]}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" required className={inputCls} aria-invalid={!!issues?.email} />
              {issues?.email && <p className="mt-1 text-xs text-red-600">{issues.email[0]}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">Mobile</label>
              <input id="phone" name="phone" required pattern="9\d{9}" inputMode="numeric" className={inputCls} aria-invalid={!!issues?.phone} />
              {issues?.phone && <p className="mt-1 text-xs text-red-600">{issues.phone[0]}</p>}
            </div>
            <div>
              <label htmlFor="purpose" className="text-sm font-medium">Loan purpose (optional)</label>
              <textarea id="purpose" name="purpose" rows={3} maxLength={1000} className={inputCls} />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60"
        >
          {submitting ? (
            <><Loader2 className="size-4 animate-spin" /> Submitting…</>
          ) : (
            <>Submit application <ArrowRight className="size-4" /></>
          )}
        </button>
      </form>
    </main>
  )
}