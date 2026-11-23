
'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, Eye, X } from 'lucide-react'
import { gallery, news } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { MediaFrame } from './media-frame'

export function LatestUpdates() {
  const [showAllNews, setShowAllNews] = useState(false)
  const [showAllGallery, setShowAllGallery] = useState(false)
  const [selectedImage, setSelectedImage] = useState<
    (typeof gallery)[number] | null
  >(null)

  // Close the image viewer when Escape is pressed
  useEffect(() => {
    if (!selectedImage) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedImage])

  const visibleNews = showAllNews ? news : news.slice(0, 3)
  const visibleGallery = showAllGallery ? gallery : gallery.slice(0, 5)

  return (
    <section
      id="news"
      className="scroll-mt-16 bg-secondary py-16 md:py-24"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* News and Events Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              News & Events
            </p>
            <h2
              id="news-heading"
              className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
            >
              Latest Updates
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowAllNews((current) => !current)}
            aria-expanded={showAllNews}
            aria-controls="news-list"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {showAllNews ? 'Show less' : 'All news'}
            <ArrowRight
              className={cn(
                'size-4 transition-transform',
                showAllNews && 'rotate-90'
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* News Cards */}
        <ul id="news-list" className="mt-10 grid gap-6 md:grid-cols-3">
          {visibleNews.map((n) => (
            <li key={n.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-background transition-shadow hover:shadow-lg">
                <MediaFrame
                  src={n.image}
                  alt={n.alt}
                  aspect="aspect-video"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-primary">
                      {n.category}
                    </span>

                    <span className="flex items-center gap-1 text-muted-foreground">
                      <CalendarDays
                        className="size-3.5"
                        aria-hidden="true"
                      />
                      <time dateTime={n.dateISO}>{n.dateBS}</time>
                    </span>
                  </div>

                  <h3 className="mt-3 text-pretty font-semibold leading-snug transition-colors group-hover:text-primary">
                    {n.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {n.excerpt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Photo Gallery */}
        <div className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-xl font-bold">Photo Gallery</h3>

            <button
              type="button"
              onClick={() => setShowAllGallery((current) => !current)}
              aria-expanded={showAllGallery}
              aria-controls="gallery-list"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              {showAllGallery ? 'Show fewer photos' : 'View albums'}
              <ArrowRight
                className={cn(
                  'size-4 transition-transform',
                  showAllGallery && 'rotate-90'
                )}
                aria-hidden="true"
              />
            </button>
          </div>

          <ul
            id="gallery-list"
            className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2"
          >
            {visibleGallery.map((g, i) => (
              <li
                key={g.title}
                className={cn(
                  'group relative',
                  i === 0 && 'col-span-2 md:row-span-2'
                )}
              >
                <figure className="h-full">
                  <MediaFrame
                    src={g.image}
                    alt={g.alt}
                    aspect={
                      i === 0
                        ? 'aspect-square md:aspect-auto md:h-full'
                        : 'aspect-square'
                    }
                    className="rounded-2xl"
                    emptyLabel="Photo upload pending"
                  />

                  {g.image && (
                    <button
                      type="button"
                      onClick={() => setSelectedImage(g)}
                      aria-label={`View image: ${g.title}`}
                      className="absolute inset-0 z-10 flex items-end justify-end p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/75 px-3 py-2 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Eye className="size-4" aria-hidden="true" />
                        View image
                      </span>
                    </button>
                  )}

                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-slate-900/80 to-transparent px-3 pb-3 pt-8 text-xs font-medium text-white">
                    {g.title}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-screen Gallery Image Viewer */}
      {selectedImage?.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-image-title"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-full max-w-5xl rounded-2xl bg-background p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 z-10 rounded-full bg-slate-950/75 p-2 text-white hover:bg-slate-950"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
              className="max-h-[80vh] max-w-full rounded-xl object-contain"
            />

            <p
              id="gallery-image-title"
              className="px-2 pt-3 text-sm font-semibold"
            >
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
