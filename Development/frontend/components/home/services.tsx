import { ArrowUpRight, Briefcase, HeartPulse, PiggyBank, Send, Smartphone, Wheat } from 'lucide-react'

const services = [
  {
    title: 'Regular Savings',
    desc: 'Flexible savings with daily interest calculation and quarterly payouts. No minimum balance worries.',
    icon: PiggyBank,
  },
  {
    title: 'Agriculture Loans',
    desc: 'Low-interest credit for seeds, livestock, irrigation and equipment with harvest-aligned repayment.',
    icon: Wheat,
  },
  {
    title: 'Business Loans',
    desc: 'Working capital and expansion loans for small and medium enterprises with quick approval.',
    icon: Briefcase,
  },
  {
    title: 'Digital App Banking',
    desc: 'Check balances, transfer funds, pay bills and scan QR codes anytime from your phone.',
    icon: Smartphone,
  },
  {
    title: 'Remittance',
    desc: 'Receive money from abroad instantly through our partner networks at any branch.',
    icon: Send,
  },
  {
    title: 'Health & Insurance',
    desc: 'Member welfare fund, medical support and life insurance cover for you and your family.',
    icon: HeartPulse,
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-secondary py-12 md:py-16" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Services</p>
          <h2 id="services-heading" className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Financial services built for every member
          </h2>
          <p className="mt-3 text-muted-foreground">
            From your first savings account to growing your business — we are with you at every step.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, desc, icon: Icon }) => (
            <li key={title}>
              <a
                href="#"
                className="group flex h-full flex-col rounded-2xl border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
