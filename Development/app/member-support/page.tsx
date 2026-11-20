
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
        {/* Page Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Member Services
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Member Support
          </h1>

          <p className="mt-3 text-muted-foreground">
            Send a question or concern to our support team, then use your
            ticket number to check its status.
          </p>

          
        </div>

        {/* Support Forms */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Submit Support Request */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Submit a request</h2>

            <form onSubmit={submitRequest} className="mt-5 flex flex-col gap-4">
              {submitError && (
                <p role="alert" className="text-sm text-red-700">
                  {submitError}
                </p>
              )}

              

              {/* Member Contact Details */}
              <fieldset
                disabled={anonymous}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    required={!anonymous}
                    className={`mt-1.5 ${inputClass}`}
                    placeholder="Ram Bahadur Shrestha"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Mobile
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    required={!anonymous}
                    inputMode="numeric"
                    pattern="9\d{9}"
                    className={`mt-1.5 ${inputClass}`}
                    placeholder="98XXXXXXXX"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-muted-foreground">(optional)</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`mt-1.5 ${inputClass}`}
                    placeholder="demo@gmail.com"
                  />
                </div>
              </fieldset>

              {/* Support Category */}
              <div>
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  className={`mt-1.5 ${inputClass}`}
                >
                  {categories.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Request Subject */}
              <div>
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  required
                  minLength={4}
                  maxLength={160}
                  className={`mt-1.5 ${inputClass}`}
                  placeholder="What do you need help with?"
                />
              </div>

              {/* Request Details */}
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Details
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  className={`mt-1.5 ${inputClass}`}
                  placeholder="Describe your question or concern."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit request'}
              </button>
            </form>

            {/* Created Ticket Confirmation */}
            {createdTicket && (
              <div className="mt-5">
                <p className="text-sm font-medium text-primary">
                  Request received. Save this ticket number to check its status:
                </p>

                <TicketCard ticket={createdTicket} />
              </div>
            )}
          </section>

          {/* Track Existing Ticket */}
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Track a ticket</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter the ticket number shown after submitting your request.
            </p>

            <form onSubmit={trackTicket} className="mt-5 flex flex-col gap-4">
              {trackError && (
                <p role="alert" className="text-sm text-red-700">
                  {trackError}
                </p>
              )}

              <div>
                <label htmlFor="ticketNo" className="text-sm font-medium">
                  Ticket number
                </label>

                <input
                  id="ticketNo"
                  value={ticketNo}
                  onChange={(event) => setTicketNo(event.target.value)}
                  required
                  className={`mt-1.5 ${inputClass}`}
                  placeholder="Paste your ticket number"
                />
              </div>

              <button
                type="submit"
                disabled={tracking}
                className="rounded-lg border border-primary px-5 py-3 text-sm font-semibold text-primary disabled:opacity-60"
              >
                {tracking ? 'Checking…' : 'Check status'}
              </button>
            </form>

            {/* Ticket Tracking Result */}
            {foundTicket && <TicketCard ticket={foundTicket} />}
          </section>

        </div>
      </main>

      <SiteFooter />
    </>
  )
}
