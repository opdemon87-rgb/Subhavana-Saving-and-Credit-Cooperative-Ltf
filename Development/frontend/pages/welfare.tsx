
import {
  HeartPulse,
  Users,
  ShieldCheck,
  Baby,
  GraduationCap,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    title: 'Member Death Relief',
    amount: 'Rs. 15,000',
    description:
      'Financial assistance provided to the family of a deceased member to help with immediate funeral and family expenses.',
    icon: HeartPulse,
  },
  {
    title: 'Family Death Relief',
    amount: 'Rs. 7,500',
    description:
      'Support provided when an immediate family member of a member passes away.',
    icon: Users,
  },
  {
    title: 'Critical Illness Assistance',
    amount: 'Up to Rs. 7,500',
    description:
      'Financial aid for members suffering from cancer, heart disease, kidney failure, brain tumor, spinal injuries, or mental disorders. Available after Rs. 15,000 in treatment expenses.',
    icon: ShieldCheck,
  },
  {
    title: 'Maternity Support',
    amount: 'Rs. 2,000',
    description:
      'Rs. 1,500 provided directly to the mother, plus Rs. 500 deposited into a piggy bank account for the newborn.',
    icon: Baby,
  },
  {
    title: 'Children Education Scholarship',
    amount: 'Rs. 10,000',
    description:
      'Annual scholarship awarded to 5 top-performing children of members to encourage academic excellence.',
    icon: GraduationCap,
  },
]

const eligibility = [
  'Minimum Rs. 1,000 in share capital',
  'Minimum Rs. 2,000 contribution to Member Welfare Fund',
  'At least 6 months of continuous membership',
  'Regular savings contributions (no missed deposits)',
  'No overdue loan payments',
]

export default function WelfarePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Member Welfare Program
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            We stand with you when life happens
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            As a member-owned cooperative, your welfare is our priority. Our Welfare Fund
            provides financial relief during emergencies, illness, and life&apos;s most
            important moments.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What you&apos;re covered for
            </h2>

            <p className="mt-3 text-muted-foreground">
              Every active member is automatically enrolled in the Welfare Fund, provided
              eligibility criteria are met.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, amount, description, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col rounded-3xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-lg font-semibold">{title}</h3>

                <p className="mt-1 text-2xl font-bold tabular-nums text-primary">
                  {amount}
                </p>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Who is eligible?
              </h2>

              <p className="mt-3 text-muted-foreground">
                Welfare benefits are available to members who maintain active participation
                in the cooperative. The following criteria apply:
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ShieldCheck className="size-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Notes will be added in Part 4 */}
          </div>
        </div>
      </section>
    </div>
  )
}