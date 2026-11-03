
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

        {/* Event Cards will be added in Part 2 */}
      </div>
    </section>
  )
}
export default FinancialCalendar