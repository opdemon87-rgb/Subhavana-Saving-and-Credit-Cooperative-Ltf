import { CalendarDays, Clock, FileText, Wallet, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const events = [
  {
    date: 'Kartik 15, 2082',
    title: 'Monthly Savings & Loan EMI Deadline',
    desc: 'Ensure your recurring deposit and loan EMI are cleared by the 15th of every Nepali month to avoid late fees and maintain welfare eligibility.',
    icon: Wallet,
    type: 'Monthly',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    date: 'Kartik 24, 2082',
    title: '17th Annual General Meeting (AGM)',
    desc: 'Venue: Head Office, Maharajgunj. All members are requested to attend with their passbook to discuss the FY 2081/082 audit report and future plans.',
    icon: FileText,
    type: 'Important',
    color: 'bg-red-100 text-red-800 border-red-200',
  },
  {
    date: 'Mangsir 1, 2082',
    title: 'Quarterly Interest Crediting',
    desc: 'Interest on Ordinary, Women, and Senior Citizen savings accounts for the previous quarter will be automatically credited to your account today.',
    icon: CalendarDays,
    type: 'System',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    date: 'Poush 15, 2082',
    title: 'Half-Yearly Financial Review',
    desc: 'The Board of Directors will review the cooperative\'s NPL ratio, liquidity, and member growth. A summary will be published on the Notice Board.',
    icon: Clock,
    type: 'Update',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
]

export default function FinancialCalendarPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Financial Calendar
            </h1>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl">
              Stay updated with important dates, deadlines, AGMs, and cooperative events. 
              Never miss a deposit deadline or interest crediting date again.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="relative border-l border-border ml-6 md:ml-8 space-y-12 pb-12">
            {events.map((event) => (
              <div key={event.title} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <span className="absolute -left-[17px] top-1 flex size-8 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-sm md:-left-[17px]">
                  <event.icon className="size-4" aria-hidden="true" />
                </span>

                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${event.color}`}>
                        {event.type}
                      </span>
                      <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5" /> {event.date}
                      </span>
                    </div>
                    <h2 className="mt-2 text-xl font-bold text-foreground">{event.title}</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-primary/20 bg-secondary/50 p-6 text-center md:p-8">
            <h3 className="text-lg font-bold">Need to calculate your next deposit?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use our Savings Return Calculator to see exactly how much your Fixed Deposit will earn.
            </p>
            <Link
              href="/#savings-calculator"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-emerald-900 transition-colors"
            >
              Go to Calculator <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}