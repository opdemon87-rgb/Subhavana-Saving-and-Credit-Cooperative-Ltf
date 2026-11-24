
'use client'

import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/api-client'

type Overview = {
  members: number
  pendingKyc: number
  loanApplications: number
  submittedLoanApplications: number
  supportRequests: number
  receivedSupportRequests: number
  activeLoans: number
  notices: number
}

const cards: { label: string; key: keyof Overview }[] = [
  { label: 'Members', key: 'members' },
  { label: 'Pending KYC', key: 'pendingKyc' },
  { label: 'Loan applications', key: 'loanApplications' },
  {
    label: 'Submitted loan applications',
    key: 'submittedLoanApplications',
  },
]

export function AdminDashboard() {
  const [data, setData] = useState<Overview | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch dashboard statistics from the API
  useEffect(() => {
    let active = true

    apiGet<Overview>('/api/admin/overview')
      .then((result) => {
        if (active) setData(result)
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : 'Could not load dashboard'
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Overview
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Counts are read from the cooperative database.
        </p>

        {/* Error Message */}
        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </p>
        )}

        {/* Dashboard Statistics */}
        <section
          aria-label="Database summary"
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map(({ label, key }) => (
            <article
              key={key}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <h2 className="text-sm font-medium text-slate-600">
                {label}
              </h2>

              <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900">
                {data ? data[key].toLocaleString() : '—'}
              </p>

              {!data && !error && (
                <p className="mt-2 text-xs text-slate-500">
                  Loading…
                </p>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
