import { ShieldCheck, FileBadge, Lock, Landmark } from 'lucide-react'

export function Compliance() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Introduction */}
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="size-12 text-gold" />

          <h2 className="mt-4 text-2xl font-bold md:text-3xl">
            Your money is protected
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-emerald-100">
            Subhavana Saving and Credit Cooperative Ltd. is fully registered and regulated under the laws of Nepal.
          </p>
        </div>

        {/* Compliance Cards - To be added in Part 2 */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Compliance cards will go here */}
        </ul>
      </div>
    </section>
  )
}