
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
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-emerald-200 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Goal Planner
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-emerald-100">
              Plan your future with our Recurring Deposit (Masanik Bachat).
              Find out exactly how much you need to save every month to reach your target.
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
                Whether it&apos;s for your child&apos;s education, a family wedding, or a new business,
                a recurring deposit helps you get there systematically without needing a lump sum upfront.
              </p>

              <ul className="mt-6 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  No lump sum required, save monthly.
                </li>

                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  Earn up to 9.5% interest p.a.
                </li>

                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  Loan against your recurring deposit if needed.
                </li>
              </ul>
            </div>

            {/* Right: The Calculator */}
            <div className="rounded-3xl border bg-secondary/30 p-6 shadow-sm md:p-8">
              <h3 className="text-xl font-bold">Goal Planner</h3>

              <div className="mt-6 flex flex-col gap-6">

                {/* Target Amount */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Target Amount
                    </label>

                    <span className="font-semibold tabular-nums text-primary">
                      {formatNPR(target)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={50_000}
                    max={5_000_000}
                    step={50_000}
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="range-input mt-3"
                    style={{
                      '--fill': `${(target / 5_000_000) * 100}%`,
                    } as React.CSSProperties}
                  />
                </div>

                {/* Timeframe */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Timeframe (Years)
                    </label>

                    <span className="font-semibold tabular-nums text-primary">
                      {years} Years
                    </span>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="range-input mt-3"
                    style={{
                      '--fill': `${(years / 10) * 100}%`,
                    } as React.CSSProperties}
                  />
                </div>

              </div>

              {/* Monthly Deposit Result and Application Button will be added in Part 4 */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}