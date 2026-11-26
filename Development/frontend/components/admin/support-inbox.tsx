'use client'

import { useMemo, useState } from 'react'
import {
  ChevronRight,
  Headset,
  Inbox,
  Search,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
  RECEIVED:
    'border-amber-200 bg-amber-50 text-amber-800',
  IN_PROGRESS:
    'border-blue-200 bg-blue-50 text-blue-800',
  RESOLVED:
    'border-emerald-200 bg-accent text-primary',
}

export function SupportInbox() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'ALL' | SupportStatus>('ALL')
  const [category, setCategory] = useState<'ALL' | SupportCategory>('ALL')
  const [selected, setSelected] = useState<SupportRequest | null>(null)

  const requests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return previewRequests.filter((request) => {
      const matchesStatus = status === 'ALL' || request.status === status
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

      <section
        aria-label="Support request filters"
        className="mt-8 rounded-2xl border border-border bg-card p-4"
      >
        <div className="grid gap-3 md:grid-cols-[minmax(240px,1fr)_180px_180px]">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ticket, name or subject"
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

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

      <section
        aria-label="Support requests"
        className="mt-6 overflow-hidden rounded-2xl border border-border bg-card"
      >
        {requests.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <Inbox aria-hidden="true" className="size-9 text-muted-foreground" />
            <h2 className="mt-4 font-semibold">No support requests found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try changing the search or filters.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {requests.map((request) => (
              <li key={request.id}>
                <button
                  type="button"
                  onClick={() => setSelected(request)}
                  className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-secondary/60 sm:px-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Headset aria-hidden="true" className="size-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold tabular-nums text-primary">
                        {request.ticketNo}
                      </p>
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                          statusStyles[request.status],
                        )}
                      >
                        {request.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm font-semibold text-foreground">
                      {request.subject}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {request.name} · {request.category}
                    </p>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-xs text-muted-foreground">
                      {request.createdAt}
                    </p>
                  </div>

                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="support-request-heading"
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40"
          onClick={() => setSelected(null)}
        >
          <aside
            className="h-full w-full max-w-lg overflow-y-auto bg-background p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tabular-nums text-primary">
                  {selected.ticketNo}
                </p>
                <h2
                  id="support-request-heading"
                  className="mt-2 text-xl font-bold"
                >
                  {selected.subject}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close support request"
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Member</p>
                <p className="mt-1 font-medium">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="mt-1 font-medium">{selected.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="mt-1 font-medium">{selected.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Received</p>
                <p className="mt-1 font-medium">{selected.createdAt}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">Message</p>
              <p className="mt-2 rounded-xl border border-border p-4 text-sm leading-7 text-muted-foreground">
                {selected.message}
              </p>
            </div>

            <div className="mt-6">
              <label htmlFor="support-status" className="text-sm font-semibold">
                Status
              </label>
              <select
                id="support-status"
                value={selected.status}
                onChange={(event) =>
                  setSelected({
                    ...selected,
                    status: event.target.value as SupportStatus,
                  })
                }
                className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="RECEIVED">Received</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="admin-note" className="text-sm font-semibold">
                Internal admin note
              </label>
              <textarea
                id="admin-note"
                rows={4}
                placeholder="Add a note for the admin team..."
                className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Close
              </button>
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-emerald-900"
              >
                Save preview
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}