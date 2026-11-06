import {
  ArrowLeftRight,
  Bell,
  FileText,
  Eye,
  Landmark,
  MessageSquareText,
  QrCode,
  Send,
  Smartphone,
  Wallet,
} from 'lucide-react'

const features = [
  {
    title: 'SMS Banking — Free for All Members',
    desc: 'Text SBAL to 4-XXXX and get your savings balance instantly. No internet needed. Works on any phone.',
    icon: MessageSquareText,
  },
  {
    title: 'Online Member Portal',
    desc: 'Log in with your membership number to view savings, share capital, loan schedules and interest earnings.',
    icon: Landmark,
  },
  {
    title: 'eStatement & Interest Certificates',
    desc: 'Download annual statements, TDS certificates and loan repayment schedules as PDFs anytime.',
    icon: FileText,
  },
  {
    title: 'Remittance Collection',
    desc: 'Receive money from IME, Prabhu and Western Union at any Subhavana branch — same-day credit to your account.',
    icon: Send,
  },
  {
    title: 'Mobile Wallet Top-up',
    desc: 'Load eSewa, Khalti and IME Pay wallets directly from your savings balance at the counter.',
    icon: Wallet,
  },
]

const partners = [
  { name: 'NEFSCUN', color: 'bg-emerald-600' },
  { name: 'IME Pay', color: 'bg-blue-600' },
  { name: 'Prabhu', color: 'bg-red-600' },
  { name: 'eSewa', color: 'bg-green-500' },
  { name: 'Khalti', color: 'bg-purple-600' },
  { name: 'Fonepay', color: 'bg-orange-500' },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px] rounded-[2.75rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl">
      <div
        className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-slate-900"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-[2.1rem] bg-secondary">
        {/* Phone Header */}
        <div className="bg-primary px-5 pb-6 pt-10 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-emerald-200">Namaste,</p>
              <p className="text-sm font-semibold">Sunita Maharjan</p>
              <p className="mt-0.5 text-[9px] text-emerald-300">
                Member #SB-0142
              </p>
            </div>
            <Bell className="size-4" aria-hidden="true" />
          </div>

          <div className="mt-5 rounded-2xl bg-white/10 p-4">
            <p className="flex items-center gap-1.5 text-[10px] text-emerald-100">
              Savings Balance <Eye className="size-3" aria-hidden="true" />
            </p>
            <p className="mt-1 text-xl font-bold">Rs. 82,350</p>
            <p className="mt-1 text-[10px] text-gold">
              + Rs. 1,240 interest this quarter
            </p>
          </div>
        </div>

        {/* Phone Body */}
        <div className="-mt-3 rounded-t-2xl bg-secondary px-4 pb-5 pt-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { l: 'SMS', i: MessageSquareText },
              { l: 'Statement', i: FileText },
              { l: 'Loan EMI', i: ArrowLeftRight },
              { l: 'Remit', i: Send },
            ].map(({ l, i: Icon }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="flex size-10 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-[9px] font-medium text-foreground">
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DigitalServices() {
  return (
    <section
      id="digital"
      className="scroll-mt-16 overflow-hidden bg-background py-16 md:py-24"
      aria-labelledby="digital-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div
            role="img"
            aria-label="Subhavana member portal showing savings balance, monthly deposit and remittance activity"
            className="relative"
          >
            <div
              className="absolute inset-0 -z-0 mx-auto size-80 translate-y-10 rounded-full bg-accent blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <PhoneMockup />
            </div>
          </div>
        </div>

        {/* Digital Services Content - To be added */}
      </div>
    </section>
  )
}