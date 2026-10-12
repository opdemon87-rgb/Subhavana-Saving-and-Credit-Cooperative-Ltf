'use client'

import { useState } from 'react'
import { Clock, MapPin, Navigation, Phone, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { branches } from '@/lib/subhavana-data'

const provinces = ['All', ...Array.from(new Set(branches.map((b) => b.province)))]

export function Branches() {
  const [province, setProvince] = useState('All')
  const visible = province === 'All' ? branches : branches.filter((b) => b.province === province)

  return (
    <section id="branches" className="scroll-mt-16 bg-background py-12 md:py-16" aria-labelledby="branches-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Branch Network</p>
            <h2 id="branches-heading" className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Find a branch near you
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">Showing key branches. Visit any branch with your member ID.</p>
        </div>

        <div role="group" aria-label="Filter by province" className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {provinces.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={province === p}
              onClick={() => setProvince(p)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                province === p
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {visible.map((b) => (
            <li
              key={b.name}
              className={cn(
                'flex flex-col rounded-2xl border p-5',
                b.isHeadOffice ? 'border-primary/40 bg-accent/60' : 'bg-background',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{b.name}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {b.province}
                </span>
              </div>
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {b.address}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <a href={`tel:${b.phone.replace(/-/g, '')}`} className="hover:text-primary">
                    {b.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <UserRound className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {b.manager}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {b.hours}
                </li>
              </ul>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address}, Nepal`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Get directions
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
