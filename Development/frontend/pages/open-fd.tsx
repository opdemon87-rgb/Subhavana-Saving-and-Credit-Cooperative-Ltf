
'use client'

import { useState } from 'react'
import { formatNPR } from '@/frontend/lib/format'

const FD_PLANS = [
  { months: 12, label: '1 Year', rate: 11.0 },
  { months: 24, label: '2 Years', rate: 11.5 },
  { months: 36, label: '3 Years', rate: 12.0 },
]

export default function OpenFdPage() {
  const [amount, setAmount] = useState(500_000)
  const [planMonths, setPlanMonths] = useState(36)

  const plan =
    FD_PLANS.find((p) => p.months === planMonths) ?? FD_PLANS[2]

  const maturity =
    amount * Math.pow(1 + plan.rate / 100 / 4, 4 * (plan.months / 12))

  const interest = maturity - amount

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">
        Open a Fixed Deposit
      </h1>
      <p className="mt-2 text-muted-foreground">
        Choose your deposit amount and preferred tenure.
      </p>

      <form
        className="mt-8 grid gap-6 rounded-2xl border p-6"
        onSubmit={(e) => {
          e.preventDefault()
          alert('Basic form submitted. Backend submission will be added later.')
        }}
      >
        <section>
          <label htmlFor="amount" className="text-sm font-medium">
            Deposit amount
          </label>

          <p className="mt-2 font-semibold text-primary">
            {formatNPR(amount)}
          </p>

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

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Rs. 25,000</span>
            <span>Rs. 1 Crore</span>
          </div>
        </section>

        <fieldset>
          <legend className="text-sm font-medium">Choose tenure</legend>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {FD_PLANS.map((p) => (
              <button
                key={p.months}
                type="button"
                aria-pressed={planMonths === p.months}
                onClick={() => setPlanMonths(p.months)}
                className={`rounded-xl border p-4 ${
                  planMonths === p.months
                    ? 'border-primary bg-accent'
                    : 'hover:border-primary/40'
                }`}
              >
                <span className="block text-sm">{p.label}</span>
                <span className="mt-1 block font-bold text-primary">
                  {p.rate.toFixed(2)}%
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              placeholder="Your full name"
              className="mt-2 w-full rounded-lg border bg-background p-3"
            />
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
              className="mt-2 w-full rounded-lg border bg-background p-3"
            />
          </div>

          <div className="sm:col-span-2">
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
              className="mt-2 w-full rounded-lg border bg-background p-3"
            />
          </div>
        </section>

        <section className="rounded-xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm">Estimated maturity value</p>
          <p className="mt-2 text-3xl font-bold">
            {formatNPR(Math.round(maturity))}
          </p>
          <p className="mt-3 text-sm">
            Principal: {formatNPR(amount)}
          </p>
          <p className="text-sm">
            Interest earned: {formatNPR(Math.round(interest))}
          </p>
        </section>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
        >
          Submit FD request
        </button>
      </form>
    </main>
  )
}