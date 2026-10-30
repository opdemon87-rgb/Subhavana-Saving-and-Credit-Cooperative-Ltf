
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
  // Part 1: Manage calculator state
  const [savings, setSavings] = useState(100_000)
  const [shares, setShares] = useState(25_000)
  const [existingLoan, setExistingLoan] = useState(0)

  // Calculate the available loan eligibility
  // Max Loan = Savings + (Shares × 3) - Existing Loans
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

          {/* Part 2: Left content will be added here */}

          {/* Part 3: Interactive calculator will be added here */}
          <div className="rounded-3xl border bg-secondary/30 p-6 shadow-sm md:p-8">
            <h3 className="text-xl font-bold">
              Eligibility Calculator
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Calculator controls will be added in the next part.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

