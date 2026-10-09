import { ArrowRight, Download, FileText, Plus } from 'lucide-react'
import { faqs, notices } from '@/lib/site-data'

export function Notices() {
  return (
    <section id="notices" className="scroll-mt-16 bg-secondary py-16 md:py-24" aria-labelledby="resources-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Member Resources</p>
          <h2 id="resources-heading" className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Notices & answers in one place
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-3xl border bg-background p-4 md:p-6">
            <div className="flex items-center justify-between gap-4 px-2">
              <h3 className="text-lg font-semibold">Notice Board</h3>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                View archive <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-3 divide-y">
              {notices.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    download
                    className="group flex items-start gap-4 rounded-xl px-2 py-4 transition-colors hover:bg-secondary"
                  >
                    <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <FileText className="size-4" aria-hidden="true" />
                      <span className="text-[9px] font-bold">PDF</span>
                    </span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                          {n.category}
                        </span>
                        {n.isNew && (
                          <span className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-bold uppercase text-gold-foreground">
                            New
                          </span>
                        )}
                      </span>
                      <span className="mt-1.5 block text-sm font-medium text-foreground group-hover:text-primary">
                        {n.title}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        <time dateTime={n.dateISO}>{n.dateBS}</time> · {n.size}
                      </span>
                    </span>
                    <Download
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Download PDF</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="faq" className="scroll-mt-24 rounded-3xl border bg-background p-4 md:p-6">
            <h3 className="px-2 text-lg font-semibold">Frequently Asked Questions</h3>
            <div className="mt-3 flex flex-col gap-2">
              {faqs.map((f, i) => (
                <details
                  key={f.q}
                  name="faq"
                  open={i === 0}
                  className="group rounded-2xl border bg-background transition-colors open:border-primary/30 open:bg-accent/50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                      <Plus className="size-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-4 px-2 text-sm text-muted-foreground">
              Still have questions? Call toll-free{' '}
              <a href="tel:16600123456" className="font-semibold text-primary hover:underline">
                1660-01-23456
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
