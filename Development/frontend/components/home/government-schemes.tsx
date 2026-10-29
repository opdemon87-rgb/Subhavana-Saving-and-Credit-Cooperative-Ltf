
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
      "Dedicated credit for women entrepreneurs running cottage and small-scale industries. Priority to members of registered women's cooperatives and mothers' groups.",
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
        {/* Section heading */}
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
              As an empanelled cooperative lender, we help members access
              Government of Nepal subsidized credit programs at below-market
              interest rates.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gold/20 px-3 py-1.5 text-sm font-semibold text-amber-800 md:self-auto">
            <Banknote className="size-4" aria-hidden="true" />
            4 active schemes
          </span>
        </div>
      </div>
    </section>
  )
}