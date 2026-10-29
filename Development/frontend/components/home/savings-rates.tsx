
'use client'

import { useState } from 'react'
import { ArrowRight, Info, Landmark, PiggyBank, TrendingUp } from 'lucide-react'
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Accounts & Rates
            </p>
            <h2
              id="rates-heading"
              className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            >
              Interest Rate Structure
            </h2>
            <p className="mt-3 text-muted-foreground">
              Effective from the current fiscal year. Interest calculated daily and credited
              quarterly.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gold/20 px-3 py-1.5 text-sm font-semibold text-amber-800 md:self-auto">
            <TrendingUp className="size-4" aria-hidden="true" />
            Savings {rateHighlights.savingsRange} · Loans {rateHighlights.loanRate}
          </span>
        </div>

        {/* Tabs */}
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

        {/* Savings table */}
        {tab === 'savings' && (
          <div className="mt-6 overflow-hidden rounded-2xl border bg-background shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Savings account types with interest rates
              </caption>
              <thead className="bg-primary text-xs uppercase tracking-wide text-primary-foreground">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Account Type
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Rate (p.a.)
                  </th>
                  <th scope="col" className="hidden px-6 py-4 font-semibold md:table-cell">
                    Min. Deposit
                  </th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {savingsRates.map(({ type, rate, note, minDeposit, featured }) => (
                  <tr
                    key={type}
                    className={featured ? 'bg-accent/70' : 'hover:bg-secondary/60'}
                  >
                    <th scope="row" className="px-6 py-4 font-normal">
                      <span className="flex items-center gap-2 font-semibold text-foreground">
                        {type}
                        {featured && (
                          <span className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-bold uppercase text-gold-foreground">
                            Top Rate
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {note}
                      </span>
                    </th>
                    <td className="px-6 py-4 text-lg font-bold tabular-nums text-primary">
                      {rate.toFixed(2)}%
                    </td>
                    <td className="hidden px-6 py-4 tabular-nums md:table-cell">
                      {minDeposit}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="/register"
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors',
                          featured
                            ? 'bg-gold text-gold-foreground hover:bg-amber-400'
                            : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
                        )}
                      >
                        Open Account
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Fixed deposit — card grid */}
        {tab === 'fd' && (
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {fixedDepositRates.map(({ tenure, rate, months, featured }) => (
              <li
                key={tenure}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-background p-6 shadow-sm',
                  featured && 'border-primary/40 ring-1 ring-primary/20',
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold uppercase text-gold-foreground">
                    Best Rate
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {tenure} Fixed Deposit
                </p>
                <p className="mt-3 text-4xl font-bold tabular-nums text-primary">
                  {rate.toFixed(2)}%
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    p.a.
                  </span>
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                  <li>Tenure: {months} months</li>
                  <li>Minimum: Rs. 25,000</li>
                  <li>Interest paid at maturity</li>
                </ul>
                <a
                  href="/apply-loan"
                  className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Invest now <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Loans — list */}
        {tab === 'loans' && (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loanRates.map(({ type, rate, note }) => (
              <li
                key={type}
                className="flex flex-col rounded-2xl border bg-background p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{type}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold tabular-nums text-primary">
                    {rate.toFixed(2)}%
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{note}</p>
                <a
                  href="/apply-loan"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Apply now <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Rates are subject to revision as per Board decision and Department of Cooperatives
          directives. 5% TDS applicable on interest income.
        </p>
      </div>
    </section>
  )
}