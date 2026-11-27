
'use client'

import { useState } from 'react'
import {
  FileSpreadsheet,
  FileText,
  ScrollText,
  Shield,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Category = 'Reports' | 'Forms' | 'Policies' | 'AGM'

type Doc = {
  title: string
  description: string
  category: Category
  size: string
  updated: string
  href: string
  isNew?: boolean
}

// TODO: Add real PDF files to /public/downloads/
// and update the href values.
const documents: Doc[] = [
  // Reports
  {
    title: 'Audited Financial Statement — FY 2081/082',
    description:
      'Full balance sheet, income statement and audit notes as approved at the 17th AGM.',
    category: 'Reports',
    size: '1.4 MB',
    updated: 'Bhadra 30, 2082',
    href: '#',
    isNew: true,
  },
  {
    title: 'Annual Report — FY 2080/081',
    description:
      'Performance summary, member statistics and board activities for the previous fiscal year.',
    category: 'Reports',
    size: '2.1 MB',
    updated: 'Kartik 15, 2081',
    href: '#',
  },
  {
    title: 'Quarterly Progress Report — Q3 FY 2081/082',
    description:
      'Savings, loan portfolio and member growth for the third quarter.',
    category: 'Reports',
    size: '640 KB',
    updated: 'Baishakh 10, 2082',
    href: '#',
  },

  // Forms
  {
    title: 'Membership Application Form',
    description:
      'Open a new savings account. Requires citizenship copy and one passport photo.',
    category: 'Forms',
    size: '180 KB',
    updated: 'Shrawan 1, 2082',
    href: '#',
  },
  {
    title: 'Loan Application Form',
    description:
      'Apply for any loan type — commercial, agriculture, personal, hire purchase, real estate.',
    category: 'Forms',
    size: '220 KB',
    updated: 'Shrawan 1, 2082',
    href: '#',
  },
  {
    title: 'KYC / Beneficial Owner Declaration',
    description:
      'Mandatory KYC form per Department of Cooperatives directive.',
    category: 'Forms',
    size: '150 KB',
    updated: 'Ashwin 5, 2082',
    href: '#',
  },
  {
    title: 'Withdrawal & Deposit Slip',
    description:
      'Print-friendly slip for cash transactions at any Subhavana branch.',
    category: 'Forms',
    size: '90 KB',
    updated: 'Shrawan 1, 2082',
    href: '#',
  },
  {
    title: 'Nominee Registration Form',
    description:
      'Register or update your nominee for savings, shares and welfare benefits.',
    category: 'Forms',
    size: '110 KB',
    updated: 'Shrawan 1, 2082',
    href: '#',
  },

  // Policies
  {
    title: 'Credit Policy & Loan Rules',
    description:
      'Interest calculation, collateral requirements, penalties and repayment rules.',
    category: 'Policies',
    size: '380 KB',
    updated: 'Bhadra 20, 2082',
    href: '#',
  },
  {
    title: 'Privacy & Data Protection Policy',
    description:
      'How Subhavana collects, stores and shares member data.',
    category: 'Policies',
    size: '240 KB',
    updated: 'Bhadra 20, 2082',
    href: '#',
  },
  {
    title: 'Member Welfare Fund Rules',
    description:
      'Accidental death benefit, medical assistance and scholarship eligibility.',
    category: 'Policies',
    size: '320 KB',
    updated: 'Shrawan 12, 2082',
    href: '#',
  },

  // AGM
  {
    title: '17th AGM Notice & Agenda',
    description:
      'Official notice with venue, time, agenda and proxy forms.',
    category: 'AGM',
    size: '245 KB',
    updated: 'Kartik 10, 2082',
    href: '#',
    isNew: true,
  },
  {
    title: '16th AGM Minutes',
    description:
      'Approved minutes of the previous Annual General Meeting.',
    category: 'AGM',
    size: '410 KB',
    updated: 'Kartik 20, 2081',
    href: '#',
  },
  {
    title: 'Bylaws (Bidhan) — Amended 2081',
    description:
      'Current registered bylaws of Subhavana Saving and Credit Cooperative Ltd.',
    category: 'AGM',
    size: '890 KB',
    updated: 'Ashoj 25, 2081',
    href: '#',
  },
]

const categories: {
  id: Category | 'All'
  label: string
  icon: typeof FileText
}[] = [
  { id: 'All', label: 'All', icon: ScrollText },
  { id: 'Reports', label: 'Reports', icon: FileSpreadsheet },
  { id: 'Forms', label: 'Forms', icon: FileText },
  { id: 'Policies', label: 'Policies', icon: Shield },
  { id: 'AGM', label: 'AGM', icon: Users },
]

export function Downloads() {
  const [active, setActive] = useState<Category | 'All'>('All')

  return (
    <section
      id="downloads"
      className="scroll-mt-16 bg-background py-12 md:py-16"
      aria-labelledby="downloads-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Resources
            </p>

            <h2
              id="downloads-heading"
              className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            >
              Downloads & Documents
            </h2>

            <p className="mt-3 text-muted-foreground">
              Everything members need — audited reports, application forms,
              policies and AGM records. All files are free to download.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Last updated: {documents[0]?.updated ?? 'Kartik 10, 2082'}
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Filter downloads by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map(({ id, label, icon: Icon }) => {
            const isActive = active === id

            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>

        {/* Document grid will be added in Part 3 */}
      </div>
    </section>
  )
}
