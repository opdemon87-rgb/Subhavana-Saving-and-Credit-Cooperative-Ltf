import {
  ArrowRight,
  Banknote,
  Briefcase,
  GraduationCap,
  Info,
  Sprout,
  Tractor,
  UserCheck,
} from 'lucide-react'

type Scheme = {
  name: string
  agency: string
  subsidy: string
  audience: string
  description: string
  icon: typeof Sprout
  tags: string[]
  featured?: boolean
}

const schemes: Scheme[] = [
  {
    name: 'Prime Minister Agriculture Modernization Project',
    agency: 'Ministry of Agriculture & Livestock Development',
    subsidy: '5% subsidized interest',
    audience: 'Registered farmers and farmer groups',
    description:
      'Subsidized credit for irrigation, seeds, livestock, greenhouse and post-harvest equipment. Subhavana is an empanelled lender for the Maharajgunj ward.',
    icon: Sprout,
    tags: ['Agriculture', 'Livestock', 'Equipment'],
    featured: true,
  },
  {
    name: 'Youth Self-Employment Loan Program',
    agency: 'Ministry of Youth & Sports',
    subsidy: 'Up to Rs. 7 lakh at 3% subsidized',
    audience: 'Nepali citizens aged 18–40',
    description:
      'Startup and small-business financing for young entrepreneurs. Requires a business plan and 10% owner contribution. Ideal for retail, tailoring, food stalls and small workshops.',
    icon: Briefcase,
    tags: ['Youth', 'Startup', 'Small Business'],
  },
  {
    name: 'Foreign Employment Loan Scheme',
    agency: 'Ministry of Labour, Employment & Social Security',
    subsidy: 'Low-interest up to Rs. 10 lakh',
    audience: 'Workers migrating for foreign employment',
    description:
      'Covers visa fees, air tickets and agency charges for workers going to Gulf countries, Malaysia or Japan. No collateral required for amounts up to Rs. 3 lakh.',
    icon: UserCheck,
    tags: ['Remittance', 'Gulf', 'Zero Collateral'],
  },
  {
    name: 'Women Entrepreneurship Development Fund',
    agency: 'Ministry of Women, Children & Senior Citizens',
    subsidy: '4% subsidized interest',
    audience: 'Women-led small enterprises',
    description:
      'Dedicated credit for women entrepreneurs running cottage and small-scale industries. Priority to members of registered women\'s cooperatives and mothers\' groups.',
    icon: GraduationCap,
    tags: ['Women', 'Small Scale', 'Cottage Industry'],
  },
]

export function GovernmentSchemes() {
  return (
    <section
      id="schemes"
      className="scroll-mt-16 bg-secondary py-16 md:py-24"
      aria-labelledby="schemes-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Government Partnership
            </p>
            <h2
              id="schemes-heading"
              className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            >
              Subsidized schemes through Subhavana
            </h2>
            <p className="mt-3 text-muted-foreground">
              As an empanelled cooperative lender, we help members access Government of Nepal
              subsidized credit programs at below-market interest rates.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gold/20 px-3 py-1.5 text-sm font-semibold text-amber-800 md:self-auto">
            <Banknote className="size-4" aria-hidden="true" />
            4 active schemes
          </span>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {schemes.map(
            ({ name, agency, subsidy, audience, description, icon: Icon, tags, featured }) => (
              <li
                key={name}
                className={`relative flex flex-col rounded-2xl border bg-background p-6 transition-shadow hover:shadow-md ${
                  featured ? 'border-primary/40 ring-1 ring-primary/20' : ''
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold uppercase text-gold-foreground">
                    Popular
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                      featured
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-primary'
                    }`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      {name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{agency}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary">
                    {subsidy}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {audience}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-dashed px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <a
                    href="/apply-loan"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Apply through Subhavana
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </li>
            ),
          )}
        </ul>

        {/* Info banner */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-dashed bg-background p-5 md:flex-row md:items-center md:gap-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
            <Info className="size-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              How to apply for a government-subsidized loan
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Bring your citizenship, project proposal, ward recommendation letter and (for
              agriculture) land ownership certificate to the head office. Our loan officer
              will guide you through the agency approval process. Typical turnaround is
              10–14 working days.
            </p>
          </div>
          <a
            href="/apply-loan"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-emerald-900 md:self-auto"
          >
            Start application
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
          <Tractor className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Subsidy percentages are set by the respective ministries and may change each fiscal
          year. Final eligibility is decided by the government agency, not Subhavana.
        </p>
      </div>
    </section>
  )
}