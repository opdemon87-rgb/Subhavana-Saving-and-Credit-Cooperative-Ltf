'use client'

import { useId, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNPR } from '@/lib/format'

type Unit = 'months' | 'years'

export function SliderField({
  label,
  display,
  value,
  min,
  max,
  step,
  onChange,
  minLabel,
  maxLabel,
}: {
  label: string
  display: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  minLabel: string
  maxLabel: string
}) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold tabular-nums text-primary">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-input mt-3"
        style={{ '--fill': `${fill}%` } as React.CSSProperties}
        aria-valuetext={display}
      />
      <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

export function EmiCalculator() {
  const [amount, setAmount] = useState(1_000_000)
  const [rate, setRate] = useState(12.5)
  const [unit, setUnit] = useState<Unit>('years')
  const [duration, setDuration] = useState(5)

  const months = unit === 'years' ? duration * 12 : duration
  const monthlyRate = rate / 12 / 100
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = emi * months
  const totalInterest = totalPayment - amount
  const principalShare = (amount / totalPayment) * 100

  const switchUnit = (next: Unit) => {
    if (next === unit) return
    setDuration(next === 'months' ? Math.min(duration * 12, 240) : Math.max(1, Math.round(duration / 12)))
    setUnit(next)
  }

  return (
    <div id="emi" className="flex h-full scroll-mt-24 flex-col rounded-3xl border bg-background p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">EMI Calculator</h3>
        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary">Live estimate</span>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <SliderField
          label="Loan Amount"
          display={formatNPR(amount)}
          value={amount}
          min={50_000}
          max={10_000_000}
          step={50_000}
          onChange={setAmount}
          minLabel="Rs. 50K"
          maxLabel="Rs. 1 Crore"
        />
        <SliderField
          label="Interest Rate (p.a.)"
          display={`${rate.toFixed(1)}%`}
          value={rate}
          min={8}
          max={18}
          step={0.1}
          onChange={setRate}
          minLabel="8%"
          maxLabel="18%"
        />
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium" id="unit-label">
              Duration unit
            </span>
            <div role="radiogroup" aria-labelledby="unit-label" className="inline-flex rounded-lg bg-secondary p-1">
              {(['months', 'years'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  role="radio"
                  aria-checked={unit === u}
                  onClick={() => switchUnit(u)}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors',
                    unit === u ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground',
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <SliderField
            label="Loan Duration"
            display={`${duration} ${unit === 'years' ? (duration === 1 ? 'Year' : 'Years') : 'Months'}`}
            value={duration}
            min={unit === 'years' ? 1 : 6}
            max={unit === 'years' ? 20 : 240}
            step={unit === 'years' ? 1 : 6}
            onChange={setDuration}
            minLabel={unit === 'years' ? '1 Yr' : '6 Mo'}
            maxLabel={unit === 'years' ? '20 Yrs' : '240 Mo'}
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground" aria-live="polite">
        <p className="text-sm text-emerald-100">Monthly Installment (EMI)</p>
        <p className="mt-1 text-3xl font-bold tabular-nums">{formatNPR(emi)}</p>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-emerald-950/40" aria-hidden="true">
          <div className="bg-white" style={{ width: `${principalShare}%` }} />
          <div className="flex-1 bg-gold" />
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
          <div>
            <dt className="flex items-center gap-1.5 text-emerald-100">
              <span className="size-2 rounded-full bg-white" aria-hidden="true" />
              Principal
            </dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums">{formatNPR(amount)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-emerald-100">
              <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
              Interest
            </dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums">{formatNPR(totalInterest)}</dd>
          </div>
          <div>
            <dt className="text-emerald-100">Total Payable</dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums">{formatNPR(totalPayment)}</dd>
          </div>
        </dl>
      </div>

      <a
        href="/apply-loan"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition-colors hover:bg-amber-400"
      >
        Apply Now
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  )
}
