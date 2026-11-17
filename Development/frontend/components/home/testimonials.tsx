
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

        {/* Cards Grid */}
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <li
              key={t.name}
              className="group relative flex flex-col rounded-3xl border border-border/60 bg-background p-6 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:ring-primary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating + Quote icon */}
              <div className="flex items-start justify-between">
                <div
                  className="flex gap-0.5"
                  role="img"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={
                        i < t.rating
                          ? 'size-4 fill-gold text-gold'
                          : 'size-4 text-slate-300'
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <Quote
                  className="size-9 text-accent/60 transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>

              {/* Quote text */}
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                <p className="text-[15px]">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>

              {/* Author footer and product tag will be added in Part 3 */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
