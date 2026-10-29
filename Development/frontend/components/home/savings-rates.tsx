
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
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
              Explore our savings accounts, fixed deposits, and loan interest
              rates. Please review the applicable terms before applying.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gold/20 px-3 py-1.5 text-sm font-semibold text-amber-800 md:self-auto">
            <TrendingUp className="size-4 shrink-0" aria-hidden="true" />
            <span>
              Savings {rateHighlights.savingsRange} · Loans {rateHighlights.loanRate}
            </span>
          </span>
        </div>

        {/* Accessible category tabs */}
        <div
          role="tablist"
          aria-label="Interest rate category"
          className="mt-8 flex w-full max-w-full gap-1 overflow-x-auto rounded-xl bg-background p-1 shadow-sm sm:inline-flex sm:w-auto"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`rates-tab-${id}`}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls={`rates-panel-${id}`}
              onClick={() => setTab(id)}
              className={cn(
                'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors sm:px-4',
                tab === id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Savings accounts table */}
        {tab === 'savings' && (
          <div
            id="rates-panel-savings"
            role="tabpanel"
            aria-labelledby="rates-tab-savings"
            tabIndex={0}
            className="mt-6 overflow-hidden rounded-2xl border bg-background shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <caption className="sr-only">
                  Savings account types and their annual interest rates
                </caption>

                <thead className="bg-primary text-xs uppercase tracking-wide text-primary-foreground">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Account Type
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Rate (p.a.)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold"
                    >
                      Min. Deposit
                    </th>
                    <th scope="col" className="px-6 py-4 text-right font-semibold">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {savingsRates.map(
                    ({ type, rate, note, minDeposit, featured }) => (
                      <tr
                        key={type}
                        className={
                          featured
                            ? 'bg-accent/70'
                            : 'transition-colors hover:bg-secondary/60'
                        }
                      >
                        <th scope="row" className="px-6 py-4 font-normal">
                          <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
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

                        <td className="px-6 py-4 tabular-nums">
                          {minDeposit}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <a
                            href="/register"
                            className={cn(
                              'inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
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
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fixed deposit cards */}
        {tab === 'fd' && (
          <div
            id="rates-panel-fd"
            role="tabpanel"
            aria-labelledby="rates-tab-fd"
            tabIndex={0}
            className="mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fixedDepositRates.map(({ tenure, rate, months, featured }) => (
                <li
                  key={tenure}
                  className={cn(
                    'relative flex flex-col rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md',
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
                    Invest now
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Loan rate cards */}
        {tab === 'loans' && (
          <div
            id="rates-panel-loans"
            role="tabpanel"
            aria-labelledby="rates-tab-loans"
            tabIndex={0}
            className="mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loanRates.map(({ type, rate, note }) => (
                <li
                  key={type}
                  className="flex flex-col rounded-2xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{type}</h3>

                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold tabular-nums text-primary">
                      {rate.toFixed(2)}%
                    </span>
                  </div>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {note}
                  </p>

                  <a
                    href="/apply-loan"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Apply now
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rate disclaimer */}
        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            Rates are subject to revision as per Board decision and Department
            of Cooperatives directives. 5% TDS applicable on interest income.
            Please confirm the current rates and terms with the cooperative
            before making a financial decision.
          </span>
        </p>
      </div>
    </section>
  )
}