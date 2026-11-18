
'use client'

import { SiteHeader } from '@/components/home/site-header'


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
            Send a question or concern to our support team, then use your
            ticket number to check its status.
          </p>

          
        </div>
      </main>

      
    </>
  )
}
