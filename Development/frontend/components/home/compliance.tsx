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

        {/* Compliance Cards */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'DCO Registered',
              desc: 'Dept. of Cooperatives Reg No. DCO-2081/2077',
              icon: Landmark,
            },
            {
              title: 'DCGF Guaranteed',
              desc: 'Deposits insured up to Rs. 5 Lakh by the Deposit & Credit Guarantee Fund',
              icon: Lock,
            },
            {
              title: 'NEFSCUN Member',
              desc: 'Affiliated with the National Federation of Savings & Credit Co-ops',
              icon: FileBadge,
            },
            {
              title: 'Audited Annually',
              desc: 'Independent audits presented at every AGM',
              icon: ShieldCheck,
            },
          ].map((item) => (
            <li
              key={item.title}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <item.icon
                className="size-8 text-gold"
                aria-hidden="true"
              />

              <h3 className="mt-4 font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-xs text-emerald-100">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}