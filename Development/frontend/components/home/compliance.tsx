import { ShieldCheck, FileBadge, Lock, Landmark } from 'lucide-react'

export function Compliance() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center text-center">
          {/* Changed icon color to primary */}
          <ShieldCheck className="size-12 text-primary" />
          <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
            Your money is protected
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Subhavana Saving and Credit Cooperative Ltd. is fully registered and regulated under the laws of Nepal. 
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'DCO Registered', desc: 'Dept. of Cooperatives Reg No. DCO-2081/2077', icon: Landmark },
            { title: 'DCGF Guaranteed', desc: 'Deposits insured up to Rs. 5 Lakh by the Deposit & Credit Guarantee Fund', icon: Lock },
            { title: 'NEFSCUN Member', desc: 'Affiliated with the National Federation of Savings & Credit Co-ops', icon: FileBadge },
            { title: 'Audited Annually', desc: 'Independent audits presented at every AGM', icon: ShieldCheck },
          ].map((item) => (
            /* Changed cards to white background with border to pop against the gray secondary background */
            <li key={item.title} className="flex flex-col items-center rounded-2xl border bg-background p-6 text-center shadow-sm">
              <item.icon className="size-8 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}