'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Target, ArrowRight, ArrowLeft } from 'lucide-react'
import { formatNPR } from '@/frontend/lib/format'

export default function GoalCalculatorPage() {
  const [target, setTarget] = useState(500_000)
  const [years, setYears] = useState(2)

  const months = years * 12
  const monthlyDeposit = target / months

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Goal Planner
            </h1>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl">
              Plan your future with our Recurring Deposit (Masanik Bachat). Find out exactly how much you need to save every month to reach your target.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                <Target className="size-3.5" aria-hidden="true" />
                Systematic Savings
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Small deposits, big goals
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether it's for your child's education, a family wedding, or a new business,
                a recurring deposit helps you get there systematically without needing a lump sum upfront.
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" /> No lump sum required, save monthly.
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" /> Earn up to 9.5% interest p.a.
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" /> Loan against your recurring deposit if needed.
                </li>
              </ul>
            </div>

            {/* Right: The Calculator */}
            <div className="rounded-3xl border bg-secondary/30 p-6 shadow-sm md:p-8">
              <h3 className="text-xl font-bold">Goal Planner</h3>
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Target Amount</label>
                    <span className="font-semibold tabular-nums text-primary">{formatNPR(target)}</span>
                  </div>
                  <input
                    type="range" min={50_000} max={5_000_000} step={50_000} value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="range-input mt-3"
                    style={{ '--fill': `${(target / 5_000_000) * 100}%` } as React.CSSProperties}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Timeframe (Years)</label>
                    <span className="font-semibold tabular-nums text-primary">{years} Years</span>
                  </div>
                  <input
                    type="range" min={1} max={10} step={1} value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="range-input mt-3"
                    style={{ '--fill': `${(years / 10) * 100}%` } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Result Panel */}
              <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">Required Monthly Deposit</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-gold">
                  {formatNPR(Math.round(monthlyDeposit))}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  For {months} months to reach {formatNPR(target)}.
                </p>
              </div>

              {/* Application Link */}
              <Link
                href="/apply-loan"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-emerald-900"
              >
                Open Recurring Deposit
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}