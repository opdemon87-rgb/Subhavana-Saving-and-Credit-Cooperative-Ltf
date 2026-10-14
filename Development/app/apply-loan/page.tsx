
'use client'

import { useState } from 'react'
import { formatNPR } from '@/lib/format'

const LOAN_TYPES = [
  { value: 'Agriculture Loan', rate: 11.5 },
  { value: 'Business Loan', rate: 13.5 },
  { value: 'Home Loan', rate: 12.5 },
  { value: 'Education Loan', rate: 11.0 },
  { value: 'Personal Loan', rate: 14.5 },
]

export default function ApplyLoanPage() {
  const [loanType, setLoanType] = useState('Agriculture Loan')
  const [amount, setAmount] = useState(500_000)
  const [months, setMonths] = useState(24)

  const rate = LOAN_TYPES.find((t) => t.value === loanType)?.rate ?? 12
  const r = rate / 1200
  const emi = r > 0
    ? (amount * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1)
    : amount / months

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Apply for a Loan</h1>
      <p className="mt-2 text-muted-foreground">
        Select your loan and provide your contact details.
      </p>

      <form
        className="mt-8 space-y-6 rounded-2xl border p-6"
        onSubmit={(e) => {
          e.preventDefault()
          alert('Basic form completed. API submission will be added in Phase 2.')
        }}
      >
        <fieldset>
          <legend className="font-semibold">Loan type</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {LOAN_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                aria-pressed={loanType === type.value}
                onClick={() => setLoanType(type.value)}
                className={`rounded-xl border p-3 text-left ${
                  loanType === type.value
                    ? 'border-primary bg-accent'
                    : 'hover:border-primary/40'
                }`}
              >
                <span className="block font-medium">{type.value}</span>
                <span className="text-sm text-muted-foreground">
                  {type.rate}% p.a.
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex justify-between gap-3">
            <label htmlFor="amount" className="font-medium">Loan amount</label>
            <span className="font-semibold text-primary">{formatNPR(amount)}</span>
          </div>
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

        <div>
          <div className="flex justify-between gap-3">
            <label htmlFor="months" className="font-medium">Duration</label>
            <span className="font-semibold">{months} months</span>
          </div>
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

        <section className="rounded-xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm">Estimated monthly installment</p>
          <p className="mt-2 text-3xl font-bold">
            {formatNPR(Math.round(emi))}
          </p>
          <p className="mt-2 text-sm">Indicative rate: {rate}% p.a.</p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              className="mt-2 w-full rounded-lg border bg-background p-3"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border bg-background p-3"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium">
              Mobile number
            </label>
            <input
              id="phone"
              name="phone"
              required
              pattern="9\d{9}"
              inputMode="numeric"
              className="mt-2 w-full rounded-lg border bg-background p-3"
              placeholder="98XXXXXXXX"
            />
          </div>
          <div>
            <label htmlFor="purpose" className="text-sm font-medium">
              Loan purpose (optional)
            </label>
            <input
              id="purpose"
              name="purpose"
              className="mt-2 w-full rounded-lg border bg-background p-3"
              placeholder="Reason for the loan"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
        >
          Submit application
        </button>
      </form>
    </main>
  )
}