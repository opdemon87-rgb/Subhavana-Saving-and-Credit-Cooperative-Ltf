'use client'

type SupportStatus = 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED'

type SupportCategory =
  | 'Membership'
  | 'Savings'
  | 'Loans'
  | 'Digital Banking'
  | 'General'

type SupportRequest = {
  id: string
  ticketNo: string
  name: string
  email: string
  category: SupportCategory
  subject: string
  message: string
  status: SupportStatus
  createdAt: string
}

const previewRequests: SupportRequest[] = [
  {
    id: '1',
    ticketNo: 'SUP-2082-001',
    name: 'Suman Tamang',
    email: 'suman@example.com',
    category: 'Membership',
    subject: 'Unable to update my member profile',
    message:
      'My phone number changed after moving to another district. I need help updating my profile.',
    status: 'RECEIVED',
    createdAt: '12 Nov 2082 · 10:24 AM',
  },
  {
    id: '2',
    ticketNo: 'SUP-2082-002',
    name: 'Anita Shrestha',
    email: 'anita@example.com',
    category: 'Loans',
    subject: 'Clarification about loan documents',
    message:
      'I submitted an agriculture loan application and want to know which additional documents are required.',
    status: 'IN_PROGRESS',
    createdAt: '11 Nov 2082 · 4:18 PM',
  },
  {
    id: '3',
    ticketNo: 'SUP-2082-003',
    name: 'Anonymous',
    email: 'Not provided',
    category: 'Savings',
    subject: 'Recurring deposit maturity date',
    message:
      'Please clarify when my recurring deposit account will reach maturity.',
    status: 'RESOLVED',
    createdAt: '10 Nov 2082 · 9:40 AM',
  },
]

const statusStyles: Record<SupportStatus, string> = {
  RECEIVED: 'border-amber-200 bg-amber-50 text-amber-800',
  IN_PROGRESS: 'border-blue-200 bg-blue-50 text-blue-800',
  RESOLVED: 'border-emerald-200 bg-accent text-primary',
}

export function SupportInbox() {
  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Member services
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Support inbox
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Review and respond to member support requests.
          </p>
        </div>

        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-amber-900">
          Preview data
        </span>
      </div>
    </div>
  )
}