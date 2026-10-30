
'use client'

import { useState, useMemo } from 'react'
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { formatNPR } from '@/frontend/lib/format'
import { cn } from '@/frontend/lib/utils'

export function LoanEligibility() {
  // Part 1: Calculator state
  const [savings, setSavings] = useState(100_000)
  const [shares, setShares] = useState(25_000)
  const [existingLoan, setExistingLoan] = useState(0)

  // Calculate available loan eligibility
  const eligibility = useMemo(() => {
    const maxLimit = savings + shares * 3
    const available = Math.max(0, maxLimit - existingLoan)

    return {
      maxLimit,
      available,
    }
  }, [savings, shares, existingLoan])

  return (
    <section
      id="eligibility"
      className="scroll-mt-16 bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Part 2: Introduction and member benefits */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck
                className="size-3.5"
                aria-hidden="true"
              />
              Member Exclusive
            </span>

            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              How much can you borrow?
            </h2>

            <p className="mt-3 text-muted-foreground">
              Your borrowing limit is directly tied to your savings and
              share capital. As a member, you can borrow up to{' '}
              <strong>3x your share capital</strong> plus your accumulated
              savings, minus any active loans.
            </p>

            <ul className="mt-8 flex flex-col gap-5">
              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Wallet className="size-5" aria-hidden="true" />
                </span>

                <div>
                  <h3 className="font-semibold text-foreground">
                    No hidden limits
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your savings act as collateral. The more you save,
                    the more you can borrow.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Calculator className="size-5" aria-hidden="true" />
                </span>

                <div>
                  <h3 className="font-semibold text-foreground">
                    Instant pre-approval estimate
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use this tool to plan your loan before visiting
                    the branch. Final approval is subject to CIB
                    check and income verification.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Part 3: Interactive calculator */}
          <div className="rounded-3xl border bg-secondary/30 p-6 shadow-sm md:p-8">
            <h3 className="text-xl font-bold">
              Eligibility Calculator
            </h3>

            <div className="mt-6 flex flex-col gap-6">

              {/* Total Savings slider */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="savings-slider"
                    className="text-sm font-medium"
                  >
                    Total Savings
                  </label>

                  <span className="font-semibold tabular-nums text-primary">
                    {formatNPR(savings)}
                  </span>
                </div>

                <input
                  id="savings-slider"
                  type="range"
                  min={10_000}
                  max={2_000_000}
                  step={10_000}
                  value={savings}
                  onChange={(e) =>
                    setSavings(Number(e.target.value))
                  }
                  className="range-input mt-3"
                  style={
                    {
                      '--fill': `${(savings / 2_000_000) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
