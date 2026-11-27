
import { Clock, MapPin, Navigation, Phone, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { branches } from '@/lib/subhavana-data'

export function Branches() {
  return (
    <section
      id="branches"
      className="scroll-mt-16 bg-background py-12 md:py-16"
      aria-labelledby="branches-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Branch Network
          </p>

          <h2
            id="branches-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl"
          >
            Find a branch near you
          </h2>
        </div>

        {/* Branch Cards */}
        <ul
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
        >
          {branches.map((b) => (
            <li
              key={b.name}
              className={cn(
                'flex flex-col rounded-2xl border p-5',
                b.isHeadOffice
                  ? 'border-primary/40 bg-accent/60'
                  : 'bg-background',
              )}
            >
              {/* Branch Name */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{b.name}</h3>
              </div>

              {/* Branch Information */}
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {b.address}
                </li>

                <li className="flex items-center gap-2">
                  <Phone
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${b.phone.replace(/-/g, '')}`}
                    className="hover:text-primary"
                  >
                    {b.phone}
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <UserRound
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {b.manager}
                </li>

                <li className="flex items-center gap-2">
                  <Clock
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {b.hours}
                </li>
              </ul>

              {/* Google Maps Directions */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address}, Nepal`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <Navigation
                  className="size-4"
                  aria-hidden="true"
                />
                Get directions
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
