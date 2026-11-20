'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Target, ArrowRight, ArrowLeft } from 'lucide-react'
import { formatNPR } from '@/frontend/lib/format'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'

export default function GoalCalculatorPage() {
  const [target, setTarget] = useState(500_000)
  const [years, setYears] = useState(2)

  const months = years * 12
  const monthlyDeposit = target / months

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-emerald-200 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Goal Planner
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-emerald-100">
              Plan your future with our Recurring Deposit (Masanik Bachat). Find
              out how much you need to save each month to reach your target.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Introduction */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                  <Target className="size-3.5" aria-hidden="true" />
                  Systematic Savings
                </span>

                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                  Small deposits, big goals
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Whether it&apos;s for your child&apos;s education, a family
                  wedding, or a new business, a recurring deposit helps you save
                  toward your goal over time.
                </p>

                <ul className="mt-6 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                    Save monthly instead of needing a lump sum.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                    Sample recurring deposit rate: up to 9.5% p.a.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                    Estimate your target using the calculator.
                  </li>
                </ul>
              </div>

              {/* Calculator */}
              <div className="rounded-3xl border bg-secondary/30 p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold">Goal Planner</h2>

                <div className="mt-6 flex flex-col gap-6">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label htmlFor="target" className="text-sm font-medium">
                        Target Amount
                      </label>
                      <span className="font-semibold tabular-nums text-primary">
                        {formatNPR(target)}
                      </span>
                    </div>
                    <input
                      id="target"
                      type="range"
                      min={50_000}
                      max={5_000_000}
                      step={50_000}
                      value={target}
                      onChange={(event) => setTarget(Number(event.target.value))}
                      className="range-input mt-3"
                      style={
                        {
                          '--fill': `${(target / 5_000_000) * 100}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label htmlFor="years" className="text-sm font-medium">
                        Timeframe
                      </label>
                      <span className="font-semibold tabular-nums text-primary">
                        {years} {years === 1 ? 'Year' : 'Years'}
                      </span>
                    </div>
                    <input
                      id="years"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={years}
                      onChange={(event) => setYears(Number(event.target.value))}
                      className="range-input mt-3"
                      style={
                        {
                          '--fill': `${(years / 10) * 100}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>

                {/* Estimate */}
                <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white" aria-live="polite">
                  <p className="text-sm text-slate-300">Estimated Monthly Deposit</p>
                  <p className="mt-1 text-3xl font-bold tabular-nums text-gold">
                    {formatNPR(Math.round(monthlyDeposit))}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Simple estimate over {months} months to reach {formatNPR(target)}.
                    Interest is not included.
                  </p>
                </div>

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
      </main>

      <SiteFooter />
    </>
  )
}