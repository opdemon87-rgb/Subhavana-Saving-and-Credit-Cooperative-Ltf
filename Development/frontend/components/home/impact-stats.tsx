import { Building2, HandCoins, PiggyBank, TrendingDown, Users, Wallet } from 'lucide-react'
import { AnimatedCounter } from './animated-counter'
import { companyInfo, financials } from '@/lib/subhavana-data'

const stats = [
  {
    label: 'Total Assets',
    value: financials.totalAssets,
    prefix: 'Rs. ',
    note: 'Audited balance sheet',
    icon: Building2,
    decimals: 0,
  },
  {
    label: 'Total Savings',
    value: financials.totalSavings,
    prefix: 'Rs. ',
    note: 'Collected from 525 members',
    icon: PiggyBank,
    decimals: 0,
  },
  {
    label: 'Loan Portfolio',
    value: financials.loanPortfolio,
    prefix: 'Rs. ',
    note: 'Active lending across Kathmandu',
    icon: HandCoins,
    decimals: 0,
  },
  {
    label: 'Share Capital',
    value: financials.shareCapital,
    prefix: 'Rs. ',
    note: '525 members · 263 F · 262 M',
    icon: Wallet,
    decimals: 0,
  },
]

export function ImpactStats() {
  return (
    <section
      className="bg-primary py-16 text-primary-foreground md:py-20"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              {companyInfo.fiscalYear} · Audit Highlights
            </p>
            <h2
              id="impact-heading"
              className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            >
              By the numbers, as of Ashadh end
            </h2>
          </div>
          <p className="max-w-sm text-sm text-emerald-100">
            Figures from the {companyInfo.agm} audited financial statement.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, prefix, note, icon: Icon, decimals }) => (
            <li
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-2xl font-bold tabular-nums md:text-3xl">
                <AnimatedCounter value={value} decimals={decimals} prefix={prefix} />
              </p>
              <p className="mt-1 text-sm font-medium">{label}</p>
              <p className="mt-0.5 text-xs text-emerald-200">{note}</p>
            </li>
          ))}
        </ul>

        {/* Transparency note — real financials show a loss this FY */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-gold/10 p-5 md:flex-row md:items-center md:gap-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground">
            <TrendingDown className="size-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              Honest reporting — FY 2081/082 result
            </p>
            <p className="mt-1 text-xs text-emerald-100">
              Annual revenue of {`Rs. ${financials.annualRevenue.toLocaleString('en-IN')}`} against
              a net loss of {`Rs. ${Math.abs(financials.annualLoss).toLocaleString('en-IN')}`} —
              largely attributable to sector-wide liquidity pressure. Recovery plan approved at
              the {companyInfo.agm}.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}