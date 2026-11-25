
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Headset,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

type OverviewCard = {
  title: string
  value: string
  detail: string
  icon: LucideIcon
  href: string
  accent?: 'gold'
}

const overviewCards: OverviewCard[] = [
  {
    title: 'Registered members',
    value: '525',
    detail: '263 female · 262 male',
    icon: Users,
    href: '/admin/members',
  },
  {
    title: 'Pending KYC',
    value: '18',
    detail: '8 need review today',
    icon: BadgeCheck,
    href: '/admin/members',
    accent: 'gold',
  },
  {
    title: 'Loan applications',
    value: '32',
    detail: '12 awaiting review',
    icon: Wallet,
    href: '/admin/loans',
  },
  {
    title: 'Support requests',
    value: '7',
    detail: '3 received recently',
    icon: Headset,
    href: '/admin/support',
  },
]

export function AdminOverview() {
  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Overview
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Monitor member activity and items that need attention.
          </p>
        </div>

        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-amber-900">
          Preview data
        </span>
      </div>

      {/* Overview Statistics */}
      <section
        aria-label="Overview statistics"
        className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {overviewCards.map(
          ({ title, value, detail, icon: Icon, href, accent }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Card Icon and Link */}
              <div className="flex items-start justify-between">
                <div
                  className={
                    accent === 'gold'
                      ? 'flex size-11 items-center justify-center rounded-xl bg-gold/15 text-amber-800'
                      : 'flex size-11 items-center justify-center rounded-xl bg-accent text-primary'
                  }
                >
                  <Icon aria-hidden="true" className="size-5" />
                </div>

                <Link
                  href={href}
                  aria-label={`View ${title}`}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>

              {/* Card Information */}
              <p className="mt-5 text-sm font-medium text-muted-foreground">
                {title}
              </p>

              <p className="mt-1 text-3xl font-bold tabular-nums text-foreground">
                {value}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {detail}
              </p>
            </article>
          ),
        )}
      </section>

      {/* Additional dashboard sections will be added in Part 2 */}
    </div>
  )
}
