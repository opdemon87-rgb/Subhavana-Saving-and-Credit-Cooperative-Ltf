
'use client'

import { FormEvent, useState } from 'react'
import { ApiError, apiGet, apiPost } from '@/lib/api-client'
import { SiteHeader } from '@/components/home/site-header'
import { SiteFooter } from '@/components/home/site-footer'

type Ticket = {
  ticketNo: string
  category: string
  subject: string
  status: string
  createdAt: string
}

const categories = [
  ['ACCOUNT', 'Account'],
  ['SAVINGS', 'Savings'],
  ['LOAN', 'Loan'],
  ['DIGITAL_SERVICE', 'Digital services'],
  ['BRANCH', 'Branch service'],
  ['OTHER', 'Other'],
] as const

const inputClass =
  'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return Object.values(error.issues ?? {}).flat()[0] ?? error.message
  }

  return 'Something went wrong. Please try again.'
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="mt-5 rounded-xl border bg-secondary/50 p-4" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">Ticket: {ticket.ticketNo}</p>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {ticket.status.replaceAll('_', ' ')}
        </span>
      </div>

      <p className="mt-2 text-sm">{ticket.subject}</p>

      <p className="mt-1 text-xs text-muted-foreground">
        {ticket.category.replaceAll('_', ' ')} ·{' '}
        <time dateTime={ticket.createdAt}>
          {new Date(ticket.createdAt).toLocaleDateString('en-NP')}
        </time>
      </p>
    </div>
  )
}

export default function MemberSupportPage() {
  // Support request states
  const [anonymous, setAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null)

  // Ticket tracking states
  const [ticketNo, setTicketNo] = useState('')
  const [tracking, setTracking] = useState(false)
  const [trackError, setTrackError] = useState<string | null>(null)
  const [foundTicket, setFoundTicket] = useState<Ticket | null>(null)

  // Submit support request
  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitError(null)
    setCreatedTicket(null)
    setSubmitting(true)

    const form = new FormData(event.currentTarget)
    const value = (name: string) => String(form.get(name) ?? '').trim()

    try {
      const ticket = await apiPost<Ticket>('/api/member-support', {
        anonymous,
        fullName: anonymous ? undefined : value('fullName'),
        email: anonymous ? undefined : value('email'),
        phone: anonymous ? undefined : value('phone'),
        category: value('category'),
        subject: value('subject'),
        message: value('message'),
      })

      setCreatedTicket(ticket)
    } catch (error) {
      setSubmitError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  // Track existing support ticket
  async function trackTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setTrackError(null)
    setFoundTicket(null)
    setTracking(true)

    try {
      const ticket = await apiGet<Ticket>(
        `/api/member-support?ticketNo=${encodeURIComponent(ticketNo.trim())}`,
      )

      setFoundTicket(ticket)
    } catch (error) {
      setTrackError(getErrorMessage(error))
    } finally {
      setTracking(false)
    }
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Member Services
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Member Support
          </h1>

          <p className="mt-3 text-muted-foreground">
            Send a question or concern to our demo support team, then use your
            ticket number to check its status.
          </p>

          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
            Demo only: use fictional contact details. Do not enter real financial
            or identity information.
          </p>
        </div>

        {/* Support forms will be added in Part 3 and Part 4. */}
      </main>

      <SiteFooter />
    </>
  )
}
