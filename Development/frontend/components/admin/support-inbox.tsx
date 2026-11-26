
'use client'

import { useMemo, useState } from 'react'

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
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'ALL' | SupportStatus>('ALL')
  const [category, setCategory] = useState<'ALL' | SupportCategory>('ALL')

  const requests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return previewRequests.filter((request) => {
      const matchesStatus =
        status === 'ALL' || request.status === status

      const matchesCategory =
        category === 'ALL' || request.category === category

      const matchesQuery =
        !normalizedQuery ||
        request.ticketNo.toLowerCase().includes(normalizedQuery) ||
        request.name.toLowerCase().includes(normalizedQuery) ||
        request.subject.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesCategory && matchesQuery
    })
  }, [query, status, category])

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

      {/* Search and Filters */}
      <section
        aria-label="Support request filters"
        className="mt-8 rounded-2xl border border-border bg-card p-4"
      >
        <div className="grid gap-3 md:grid-cols-[minmax(240px,1fr)_180px_180px]">
          {/* Search */}
          <div className="relative">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ticket, name or subject"
              aria-label="Search support requests"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as 'ALL' | SupportStatus)
            }
            aria-label="Filter by status"
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">All statuses</option>
            <option value="RECEIVED">Received</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as 'ALL' | SupportCategory)
            }
            aria-label="Filter by category"
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">All categories</option>
            <option value="Membership">Membership</option>
            <option value="Savings">Savings</option>
            <option value="Loans">Loans</option>
            <option value="Digital Banking">Digital Banking</option>
            <option value="General">General</option>
          </select>
        </div>
      </section>

      {/* Support request list will be added in Part 3 */}
    </div>
  )
}
