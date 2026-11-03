
import { CalendarDays, Clock, FileText, Wallet } from 'lucide-react'

const events = [
  {
    date: 'Kartik 15',
    title: 'Monthly Savings Deposit Deadline',
    desc: 'Ensure your recurring deposit and loan EMI are cleared to avoid penalties.',
    icon: Wallet,
    status: 'Upcoming',
    color: 'bg-amber-100 text-amber-800',
  },
  {
    date: 'Kartik 24',
    title: '17th Annual General Meeting (AGM)',
    desc: 'Venue: Head Office, Maharajgunj. Members are requested to attend with their passbook.',
    icon: FileText,
    status: 'Important',
    color: 'bg-red-100 text-red-800',
  },
  {
    date: 'Mangsir 1',
    title: 'Quarterly Interest Crediting',
    desc: 'Interest on Ordinary, Women, and Senior Citizen savings will be credited to accounts.',
    icon: CalendarDays,
    status: 'System',
    color: 'bg-emerald-100 text-emerald-800',
  },
]

export function FinancialCalendar() {
  return (
    <section
      id="calendar"
      className="scroll-mt-16 bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Schedule
            </p>

            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Financial Calendar
            </h2>

            <p className="mt-3 text-muted-foreground">
              Stay updated with important dates, deadlines, and cooperative events.
            </p>
          </div>
        </div>

        {/* Event Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {events.map((e) => (
            <div
              key={e.title}
              className="flex flex-col rounded-2xl border bg-background p-6 shadow-sm"
            >
              {/* Date and Status */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Clock className="size-4" aria-hidden="true" />
                  {e.date}
                </span>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${e.color}`}
                >
                  {e.status}
                </span>
              </div>

              {/* Event Icon */}
              <span className="mt-4 flex size-10 items-center justify-center rounded-xl bg-secondary text-foreground">
                <e.icon className="size-5" aria-hidden="true" />
              </span>

              {/* Event Details */}
              <h3 className="mt-4 font-semibold text-foreground">
                {e.title}
              </h3>

              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {e.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default FinancialCalendar