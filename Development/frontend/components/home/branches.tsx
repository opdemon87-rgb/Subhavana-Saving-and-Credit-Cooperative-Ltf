
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

        {/* Branch cards will be added in Part 2 */}
      </div>
    </section>
  )
}
