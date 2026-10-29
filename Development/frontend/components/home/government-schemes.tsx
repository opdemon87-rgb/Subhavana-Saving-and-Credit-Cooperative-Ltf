
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