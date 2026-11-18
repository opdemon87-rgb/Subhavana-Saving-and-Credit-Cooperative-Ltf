
import { Quote, Star } from 'lucide-react'
import { testimonials } from '@/lib/subhavana-data'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-accent/5 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative background element */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl"
          >
            What our members say
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Real stories from the people and communities we serve across Nepal.
          </p>
        </div>

        {/* Testimonials cards will be added in Part 2 */}
      </div>
    </section>
  )
}
