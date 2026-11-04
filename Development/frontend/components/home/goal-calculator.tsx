
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

      {/* Calculator Section will be added in the next parts */}
    </div>
  )
}