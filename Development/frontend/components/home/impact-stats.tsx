
import { companyInfo, financials } from '@/lib/subhavana-data'

const stats = [
  { label: 'Total Assets', value: financials.totalAssets },
  { label: 'Total Savings', value: financials.totalSavings },
  { label: 'Loan Portfolio', value: financials.loanPortfolio },
  { label: 'Share Capital', value: financials.shareCapital },
]

export function ImpactStats() {
  return (
    <section className="bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wider">
          {companyInfo.fiscalYear} · Audit Highlights
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          By the numbers, as of Ashadh end
        </h2>

        <p className="mt-2 text-sm opacity-80">
          Figures from the {companyInfo.agm} audited financial statement.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value }) => (
            <li
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-2xl font-bold">
                Rs. {value.toLocaleString('en-IN')}
              </p>
              <p className="mt-2 text-sm">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}