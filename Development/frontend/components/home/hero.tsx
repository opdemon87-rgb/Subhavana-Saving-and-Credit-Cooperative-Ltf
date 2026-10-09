import Image from 'next/image'
import { ArrowRight, Calculator, HandCoins, PiggyBank, ShieldCheck, Smartphone } from 'lucide-react'

const quickActions = [
  { title: 'Open Savings', desc: 'Start in 10 minutes', icon: PiggyBank, href: '#rates' },
  { title: 'Apply for Loan', desc: 'Quick approval', icon: HandCoins, href: '#services' },
  { title: 'Calculate EMI', desc: 'Plan repayments', icon: Calculator, href: '#emi' },
  { title: 'Download App', desc: 'Bank on the go', icon: Smartphone, href: '#digital' },
]

export function Hero() {
  return (
    <section id="about" className="relative bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-12 md:pb-28 md:pt-16 lg:grid-cols-2 lg:pb-36">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-semibold text-primary">
  <ShieldCheck className="size-3.5" aria-hidden="true" />
  Registered under Department of Cooperatives · Est. 2065 B.S.
</span>
          <h1 className="mt-5 text-pretty text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
  सुभावना बचत तथा ऋण सहकारी संस्था लि.{' '}
  <span className="text-primary">सदस्यको सहकारी</span>
</h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
  Serving Maharajgunj and Greater Kathmandu since 2065 B.S. with competitive savings rates,
  affordable credit, and member-first cooperative banking.
</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
           href="/register"
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition-colors hover:bg-amber-400"
          >
          Become a Member
        </a>
            <a
              href="/rates"
              className="inline-flex items-center rounded-lg border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View Interest Rates
            </a>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
  <div>
    <dt className="text-xs text-muted-foreground">Savings up to</dt>
    <dd className="text-2xl font-bold text-foreground">12% p.a.</dd>
  </div>
  <div className="border-l pl-8">
    <dt className="text-xs text-muted-foreground">Loans at</dt>
    <dd className="text-2xl font-bold text-foreground">16% p.a.</dd>
  </div>
  <div className="sm:border-l sm:pl-8">
    <dt className="text-xs text-muted-foreground">Member-owned since</dt>
    <dd className="text-2xl font-bold text-foreground">2065 B.S.</dd>
  </div>
</dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/hero-community.png"
              alt="Members of Subhavana Saving and Credit Cooperative, Maharajgunj"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border bg-background p-4 shadow-lg sm:left-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-amber-700">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Deposits protected</p>
              <p className="text-xs text-muted-foreground">Under DCGF savings guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-8 px-4 pb-10 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:translate-y-1/2 md:pb-0">
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {quickActions.map(({ title, desc, icon: Icon, href }) => (
            <li key={title}>
              <a
                href={href}
                className="group flex h-full flex-col gap-3 rounded-2xl border bg-background p-4 shadow-lg transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl md:p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground md:text-base">{title}</span>
                  <span className="block text-xs text-muted-foreground">{desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
