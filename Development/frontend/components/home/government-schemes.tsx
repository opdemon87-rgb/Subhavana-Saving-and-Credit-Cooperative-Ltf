
import {
  ArrowRight,
  Banknote,
  Briefcase,
  GraduationCap,
  Info,
  Sprout,
  Tractor,
  UserCheck,
} from "lucide-react";

type Scheme = {
  name: string;
  agency: string;
  subsidy: string;
  audience: string;
  description: string;
  icon: typeof Sprout;
  tags: string[];
  featured?: boolean;
};

const schemes: Scheme[] = [
  {
    name: "Prime Minister Agriculture Modernization Project",
    agency: "Ministry of Agriculture & Livestock Development",
    subsidy: "5% subsidized interest",
    audience: "Registered farmers and farmer groups",
    description:
      "Financing support for irrigation systems, improved seeds, livestock farming, greenhouse construction, and post-harvest equipment. Subhavana is an empanelled lender for Maharajgunj ward.",
    icon: Sprout,
    tags: ["Agriculture", "Livestock", "Equipment"],
    featured: true,
  },
  {
    name: "Youth Self-Employment Loan Program",
    agency: "Ministry of Youth & Sports",
    subsidy: "Up to Rs. 7 lakh at 3% subsidized",
    audience: "Nepali citizens aged 18–40",
    description:
      "Startup financing for young entrepreneurs launching small businesses. Applicants need a viable business plan and a 10% personal contribution.",
    icon: Briefcase,
    tags: ["Youth", "Startup", "Small Business"],
  },
  {
    name: "Foreign Employment Loan Scheme",
    agency: "Ministry of Labour, Employment & Social Security",
    subsidy: "Low-interest up to Rs. 10 lakh",
    audience: "Workers migrating for foreign employment",
    description:
      "Financial assistance for visa processing, air tickets, and agency charges for destinations including the Gulf countries, Malaysia, and Japan. The scheme states no collateral is required for loans up to Rs. 3 lakh.",
    icon: UserCheck,
    tags: ["Remittance", "Gulf", "Zero Collateral"],
  },
  {
    name: "Women Entrepreneurship Development Fund",
    agency: "Ministry of Women, Children & Senior Citizens",
    subsidy: "4% subsidized interest",
    audience: "Women-led small enterprises",
    description:
      "Support for women entrepreneurs and cottage industries, with priority for women’s cooperatives and mothers’ groups.",
    icon: GraduationCap,
    tags: ["Women", "Small Scale", "Cottage Industry"],
  },
];

export default function GovernmentSchemes() {
  return (
    <section
      id="schemes"
      className="scroll-mt-16 bg-secondary py-16 md:py-24"
      aria-labelledby="schemes-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Part 2: Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
            <Banknote className="h-4 w-4" aria-hidden="true" />
            Government Partnership
          </span>

          <h2
            id="schemes-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Subsidized schemes through Subhavana
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            As an empanelled cooperative lender, we help members access
            Government of Nepal subsidized credit programs at below-market
            interest rates.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
            <Banknote
              className="h-4 w-4 text-primary"
              aria-hidden="true"
            />
            4 active schemes
          </div>
        </div>

        {/* Part 3: Government scheme cards */}
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;

            return (
              <li key={scheme.name} className="h-full">
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-7 ${
                    scheme.featured
                      ? "border-primary/40 ring-1 ring-primary/10"
                      : "border-border"
                  }`}
                >
                  {scheme.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Popular
                    </span>
                  )}

                  <div className="flex items-start gap-4 pr-16">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium leading-5 text-muted-foreground">
                        {scheme.agency}
                      </p>

                      <h3 className="mt-1 text-lg font-bold leading-snug text-foreground sm:text-xl">
                        {scheme.name}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                      {scheme.subsidy}
                    </span>

                    <span className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                      {scheme.audience}
                    </span>
                  </div>

                  <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">
                    {scheme.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {scheme.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="/apply-loan"
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Apply through Subhavana
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
