import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CreditCard,
  Download,
  FileText,
  HandCoins,
  Handshake,
  Heart,
  Landmark,
  Lock,
  MessageSquareText,
  PiggyBank,
  ScrollText,
  ShieldCheck,
  Sprout,
  Users,
  Wallet,
} from 'lucide-react'

export type NavItem = {
  label: string
  desc: string
  href: string
  icon: LucideIcon
}

export type NavMenu = {
  label: string
  items: NavItem[]
}

export const navMenus: NavMenu[] = [
  {
    label: 'About',
    items: [
      {
        label: 'Our Story',
        desc: 'Founded 2065 B.S. in Maharajgunj',
        href: '#about',
        icon: Building2,
      },
      {
        label: 'Leadership Team',
        desc: 'Chairman, GM and staff',
        href: '#team',
        icon: Users,
      },
      {
        label: 'Financial Highlights',
        desc: 'FY 2081/082 audit figures',
        href: '#impact',
        icon: Award,
      },
      {
        label: 'Dividend History',
        desc: 'Year-by-year member returns',
        href: '#dividend',
        icon: ScrollText,
      },
    ],
  },
  {
    label: 'Products',
    items: [
      {
        label: 'Savings Accounts',
        desc: 'Ordinary, Regular, Women, Senior, Child',
        href: '#rates',
        icon: PiggyBank,
      },
      {
        label: 'Fixed Deposits',
        desc: '11% – 12% p.a. across 1, 2, 3 years',
        href: '#rates',
        icon: Lock,
      },
      {
        label: 'Loan Products',
        desc: 'Commercial, Agriculture, Personal',
        href: '#rates',
        icon: HandCoins,
      },
      {
        label: 'Loan Eligibility',
        desc: 'Check how much you can borrow',
        href: '#eligibility',
        icon: Handshake,
      },
    ],
  },
  {
    label: 'Member Services',
    items: [
      {
        label: 'Welfare Program',
        desc: 'Relief fund, medical & death benefits',
        href: '/welfare',
        icon: Heart,
      },
      {
        label: 'Digital Services',
        desc: 'SMS banking, portal, statements',
        href: '#digital',
        icon: MessageSquareText,
      },
      {
        label: 'Downloads',
        desc: 'Forms, reports, policies',
        href: '#downloads',
        icon: Download,
      },
      {
        label: 'Notice Board',
        desc: 'AGM, vacancies, rate changes',
        href: '#notices',
        icon: FileText,
      },
    ],
  },
  {
    label: 'Tools',
    items: [
      {
        label: 'EMI Calculator',
        desc: 'Plan your loan repayment',
        href: '#emi',
        icon: Wallet,
      },
      {
        label: 'Savings Return Calculator',
        desc: 'See FD maturity value',
        href: '#savings-calculator',
        icon: CreditCard,
      },
      {
        label: 'Financial Calendar',
        desc: 'AGM, quarter close, dividend',
        href: '#calendar',
        icon: Calendar,
      },
      {
        label: 'KYC Requirements',
        desc: 'What to bring when you join',
        href: '#faq',
        icon: ShieldCheck,
      },
    ],
  },
]