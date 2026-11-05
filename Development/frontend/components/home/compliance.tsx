import { ShieldCheck, FileBadge, Lock, Landmark } from 'lucide-react'

export function Compliance() {
  return (
    
    <section className="border-t bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="size-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            Your money is protected
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Subhavana Saving and Credit Cooperative Ltd. is fully registered and regulated under the laws of Nepal.
          </p>
        </div>

        {/* Compliance items grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'DCO Registered', desc: 'Dept. of Cooperatives Reg No. DCO-2081/2077', icon: Landmark },
            { title: 'DCGF Guaranteed', desc: 'Deposits insured up to Rs. 5 Lakh by the Deposit & Credit Guarantee Fund', icon: Lock },
            { title: 'NEFSCUN Member', desc: 'Affiliated with the National Federation of Savings & Credit Co-ops', icon: FileBadge },
            { title: 'Audited Annually', desc: 'Independent audits presented at every AGM', icon: ShieldCheck },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center rounded-2xl border bg-secondary/50 p-6 text-center transition-colors hover:bg-secondary">
              <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm border">
                <item.icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}