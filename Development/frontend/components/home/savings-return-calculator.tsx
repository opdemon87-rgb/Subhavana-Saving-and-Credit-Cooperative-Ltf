'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNPR } from '@/lib/format'
import { fdPlans } from '@/lib/site-data'
import { SliderField } from './emi-calculator'

const compoundingOptions = [
  { label: 'Monthly', perYear: 12 },
  { label: 'Quarterly', perYear: 4 },
  { label: 'Annually', perYear: 1 },
]

function maturityValue(principal: number, ratePct: number, months: number, perYear: number) {
  return principal * Math.pow(1 + ratePct / 100 / perYear, perYear * (months / 12))
}

export function SavingsReturnCalculator() {
  const [amount, setAmount] = useState(500_000)
  const [planId, setPlanId] = useState(fdPlans[fdPlans.length - 1].id)
  const [perYear, setPerYear] = useState(4)

  const plan = fdPlans.find((p) => p.id === planId) ?? fdPlans[0]
  const maturity = maturityValue(amount, plan.rate, plan.months, perYear)
  const interest = maturity - amount
  const apy = (Math.pow(1 + plan.rate / 100 / perYear, perYear) - 1) * 100
  const comparisons = fdPlans.map((p) => ({ ...p, value: maturityValue(amount, p.rate, p.months, perYear) }))
  const maxValue = Math.max(...comparisons.map((c) => c.value))

  return (
    <div id="savings-calculator" className="flex h-full scroll-mt-24 flex-col rounded-3xl border bg-background p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Savings Return Calculator</h3>
        <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-amber-800">Fixed Deposit</span>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <SliderField
          label="Deposit Amount"
          display={formatNPR(amount)}
          value={amount}
          min={25_000}
          max={10_000_000}
          step={25_000}
          onChange={setAmount}
          minLabel="Rs. 25K"
          maxLabel="Rs. 1 Crore"
        />

        <fieldset>
          <legend className="text-sm font-medium">Deposit Plan</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {fdPlans.map((p) => (
              <label
                key={p.id}
                className={cn(
                  'flex cursor-pointer flex-col rounded-xl border p-3 text-center transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                  p.id === planId ? 'border-primary bg-accent' : 'hover:border-primary/40',
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
                <span className="text-xs text-muted-foreground">{p.label}</span>
                <span className="text-base font-bold tabular-nums text-primary">{p.rate.toFixed(2)}%</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium" id="compounding-label">
            Interest compounding
          </span>
          <div role="radiogroup" aria-labelledby="compounding-label" className="inline-flex rounded-lg bg-secondary p-1">
            {compoundingOptions.map((o) => (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={perYear === o.perYear}
                onClick={() => setPerYear(o.perYear)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-semibold transition-colors',
                  perYear === o.perYear ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground',
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-slate-300">Maturity Value</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{formatNPR(maturity)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-300">Effective APY</p>
            <p className="text-xl font-bold tabular-nums text-gold">{apy.toFixed(2)}%</p>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
          <div>
            <dt className="text-slate-300">Principal</dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums">{formatNPR(amount)}</dd>
          </div>
          <div>
            <dt className="text-slate-300">Interest Earned (before TDS)</dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums text-gold">+ {formatNPR(interest)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium">Compare plans</p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {comparisons.map((c) => (
            <li key={c.id} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 text-xs">
              <span className={cn('font-medium', c.id === planId ? 'text-primary' : 'text-muted-foreground')}>
                {c.label}
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                <span
                  className={cn('block h-full rounded-full transition-all', c.id === planId ? 'bg-primary' : 'bg-emerald-300')}
                  style={{ width: `${(c.value / maxValue) * 100}%` }}
                />
              </span>
              <span className="font-semibold tabular-nums">{formatNPR(c.value)}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="/open-fd"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Open Fixed Deposit
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  )
}
