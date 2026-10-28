
'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Info,
  Landmark,
  PiggyBank,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  savingsRates,
  fixedDepositRates,
  loanRates,
  rateHighlights,
} from '@/lib/subhavana-data'

type Tab = 'savings' | 'fd' | 'loans'

const tabs: { id: Tab; label: string; icon: typeof PiggyBank }[] = [
  { id: 'savings', label: 'Savings', icon: PiggyBank },
  { id: 'fd', label: 'Fixed Deposit', icon: Landmark },
  { id: 'loans', label: 'Loans', icon: TrendingUp },
]

export function SavingsRates() {
  const [tab, setTab] = useState<Tab>('savings')

  return (
    <section
      id="rates"
      className="scroll-mt-16 bg-secondary py-16 md:py-24"
      aria-labelledby="rates-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Accounts & Rates
        </p>

        <h2
          id="rates-heading"
          className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
        >
          Interest Rate Structure
        </h2>

        <div
          role="tablist"
          aria-label="Interest rate category"
          className="mt-8 inline-flex rounded-xl bg-background p-1 shadow-sm"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                tab === id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}