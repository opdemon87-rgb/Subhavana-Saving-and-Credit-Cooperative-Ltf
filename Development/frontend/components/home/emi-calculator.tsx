
'use client'

import { useState } from 'react'
import { formatNPR } from '@/lib/format'

type Unit = 'months' | 'years'

export function EmiCalculator() {
  // Store the user's loan details.
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(12.5)
  const [unit, setUnit] = useState<Unit>('years')
  const [duration, setDuration] = useState(5)

  // Convert the selected duration into months for the EMI formula.
  const months = unit === 'years' ? duration * 12 : duration

  // Calculate the monthly interest rate.
  const monthlyRate = rate / 12 / 100

  // Calculate the monthly installment.
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)

  // Calculate total repayment and total interest.
  const totalPayment = emi * months
  const totalInterest = totalPayment - amount

  // Calculate the principal percentage for the visual breakdown.
  const principalShare =
    totalPayment > 0 ? (amount / totalPayment) * 100 : 0

  // Switch between months and years while keeping a reasonable duration.
  const switchUnit = (next: Unit) => {
    if (next === unit) return

    if (next === 'months') {
      setDuration(Math.min(duration * 12, 240))
    } else {
      setDuration(Math.max(1, Math.round(duration / 12)))
    }

    setUnit(next)
  }

  return (
    <div
      id="emi"
      className="flex h-full flex-col rounded-3xl border bg-background p-6 shadow-sm md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">EMI Calculator</h3>

        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary">
          Live estimate
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {/* Loan amount slider */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="loan-amount" className="text-sm font-medium">
              Loan Amount
            </label>
            <span className="text-sm font-semibold text-primary">
              {formatNPR(amount)}
            </span>
          </div>

          <input
            id="loan-amount"
            type="range"
            min={50000}
            max={10000000}
            step={50000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />

          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Rs. 50K</span>
            <span>Rs. 1 Crore</span>
          </div>
        </div>

        {/* Annual interest rate slider */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="interest-rate" className="text-sm font-medium">
              Interest Rate (p.a.)
            </label>
            <span className="text-sm font-semibold text-primary">
              {rate.toFixed(1)}%
            </span>
          </div>

          <input
            id="interest-rate"
            type="range"
            min={8}
            max={18}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />

          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>8%</span>
            <span>18%</span>
          </div>
        </div>

        {/* Loan duration unit selector */}
        <div>
          <p className="mb-3 text-sm font-medium">Duration unit</p>

          <div
            role="group"
            aria-label="Loan duration unit"
            className="inline-flex rounded-lg bg-secondary p-1"
          >
            {(['months', 'years'] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => switchUnit(u)}
                className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                  unit === u
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Loan duration slider */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="loan-duration" className="text-sm font-medium">
              Loan Duration
            </label>
            <span className="text-sm font-semibold text-primary">
              {duration} {unit === 'years' ? (duration === 1 ? 'Year' : 'Years') : 'Months'}
            </span>
          </div>

          <input
            id="loan-duration"
            type="range"
            min={unit === 'years' ? 1 : 6}
            max={unit === 'years' ? 20 : 240}
            step={unit === 'years' ? 1 : 6}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />

          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{unit === 'years' ? '1 Yr' : '6 Mo'}</span>
            <span>{unit === 'years' ? '20 Yrs' : '240 Mo'}</span>
          </div>
        </div>
      </div>

      {/* Live EMI and repayment summary */}
      <div
        className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground"
        aria-live="polite"
      >
        <p className="text-sm opacity-80">Monthly Installment (EMI)</p>

        <p className="mt-1 text-3xl font-bold tabular-nums">
          {formatNPR(emi)}
        </p>

        {/* Compare principal and interest visually */}
        <div
          className="mt-4 flex h-2 overflow-hidden rounded-full bg-emerald-950/40"
          aria-hidden="true"
        >
          <div
            className="bg-white"
            style={{ width: `${principalShare}%` }}
          />
          <div className="flex-1 bg-amber-400" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
          <div>
            <p className="opacity-80">Principal</p>
            <p className="mt-1 text-sm font-semibold tabular-nums">
              {formatNPR(amount)}
            </p>
          </div>

          <div>
            <p className="opacity-80">Interest</p>
            <p className="mt-1 text-sm font-semibold tabular-nums">
              {formatNPR(totalInterest)}
            </p>
          </div>

          <div>
            <p className="opacity-80">Total Payable</p>
            <p className="mt-1 text-sm font-semibold tabular-nums">
              {formatNPR(totalPayment)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}