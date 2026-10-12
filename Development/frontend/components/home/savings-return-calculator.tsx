
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatNPR } from '@/lib/format'
import { fdPlans } from '@/lib/site-data'

const compoundingOptions = [
  { label: 'Monthly', perYear: 12 },
  { label: 'Quarterly', perYear: 4 },
  { label: 'Annually', perYear: 1 },
]

// Calculate maturity using the selected compounding frequency.
function maturityValue(
  principal: number,
  ratePct: number,
  months: number,
  perYear: number,
) {
  return principal * Math.pow(
    1 + ratePct / 100 / perYear,
    perYear * (months / 12),
  )
}

export function SavingsReturnCalculator() {
  // Track the deposit amount, selected plan, and compounding frequency.
  const [amount, setAmount] = useState(500000)
  const [planId, setPlanId] = useState(fdPlans[0].id)
  const [perYear, setPerYear] = useState(4)

  // Get the selected plan's interest rate and duration.
  const plan = fdPlans.find((p) => p.id === planId) ?? fdPlans[0]

  // Calculate maturity and interest whenever inputs change.
  const maturity = maturityValue(
    amount,
    plan.rate,
    plan.months,
    perYear,
  )
  const interest = maturity - amount

  return (
    <div
      id="savings-calculator"
      className="rounded-3xl border bg-background p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-bold">Savings Return Calculator</h3>

      {/* Deposit amount slider */}
      <div className="mt-6">
        <div className="flex justify-between gap-3">
          <label htmlFor="deposit-amount" className="text-sm font-medium">
            Deposit Amount
          </label>
          <span className="text-sm font-semibold text-primary">
            {formatNPR(amount)}
          </span>
        </div>

        <input
          id="deposit-amount"
          type="range"
          min={25000}
          max={10000000}
          step={25000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-3 w-full accent-primary"
        />
      </div>

      {/* Let the user choose a fixed deposit plan */}
      <fieldset className="mt-6">
        <legend className="text-sm font-medium">Deposit Plan</legend>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {fdPlans.map((p) => (
            <label
              key={p.id}
              className={cn(
                'flex cursor-pointer flex-col rounded-xl border p-3 text-center',
                p.id === planId
                  ? 'border-primary bg-accent'
                  : 'hover:border-primary/40',
              )}
            >
              <input
                type="radio"
                name="fd-plan"
                value={p.id}
                checked={p.id === planId}
                onChange={() => setPlanId(p.id)}
                className="sr-only"
              />
              <span className="text-xs text-muted-foreground">
                {p.label}
              </span>
              <span className="text-base font-bold text-primary">
                {p.rate.toFixed(2)}%
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Choose how frequently interest is compounded */}
      <div className="mt-6">
        <p className="text-sm font-medium">Interest Compounding</p>

        <div className="mt-3 inline-flex rounded-lg bg-secondary p-1">
          {compoundingOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={perYear === option.perYear}
              onClick={() => setPerYear(option.perYear)}
              className={cn(
                'rounded-md px-3 py-2 text-xs font-semibold',
                perYear === option.perYear
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show the live maturity calculation */}
      <div
        className="mt-8 rounded-2xl bg-slate-900 p-5 text-white"
        aria-live="polite"
      >
        <p className="text-sm text-slate-300">Maturity Value</p>
        <p className="mt-2 text-3xl font-bold">
          {formatNPR(maturity)}
        </p>

        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-sm text-slate-300">Principal</p>
          <p className="font-semibold">{formatNPR(amount)}</p>

          <p className="mt-3 text-sm text-slate-300">Interest Earned</p>
          <p className="font-semibold text-amber-300">
            + {formatNPR(interest)}
          </p>
        </div>
      </div>
    </div>
  )
}