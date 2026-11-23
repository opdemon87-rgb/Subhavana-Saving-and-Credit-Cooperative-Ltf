import {
  ArrowLeftRight,
  Baby,
  Briefcase,
  Calculator,
  FileText,
  GraduationCap,
  Headset,
  Home,
  Landmark,
  MapPin,
  MessageCircleQuestion,
  PiggyBank,
  QrCode,
  Send,
  Smartphone,
  UserRound,
  Wallet,
  Wheat,
  type LucideIcon,
} from 'lucide-react'

const unsplash = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export type NavItem = { label: string; desc: string; href: string; icon: LucideIcon }
export type NavMenu = { label: string; items: NavItem[] }

export const navMenus: NavMenu[] = [
  {
    label: 'Accounts',
    items: [
      { label: 'Regular Savings', desc: '8.50% p.a., withdraw anytime', href: '#rates', icon: PiggyBank },
      { label: 'Fixed Deposits', desc: 'Up to 12.00% p.a. guaranteed', href: '#rates', icon: Landmark },
      { label: 'Senior Citizen Savings', desc: 'Extra 1.5% for members 60+', href: '#rates', icon: UserRound },
      { label: 'Child Future Savings', desc: 'Grow a fund until age 18', href: '#rates', icon: Baby },
    ],
  },
  {
    label: 'Loans',
    items: [
      { label: 'Agriculture Loan', desc: 'From 11.50%, harvest-linked EMI', href: '#services', icon: Wheat },
      { label: 'Business & SME Loan', desc: 'Working capital up to Rs. 1 Crore', href: '#services', icon: Briefcase },
      { label: 'Home Loan', desc: 'Up to 15 years tenure', href: '#services', icon: Home },
      { label: 'Education Loan', desc: 'Study in Nepal or abroad', href: '#services', icon: GraduationCap },
      { label: 'EMI Calculator', desc: 'Plan your repayments', href: '#emi', icon: Calculator },
    ],
  },
  {
    label: 'Digital Banking',
    items: [
      { label: 'Sajha Mobile App', desc: 'Bank 24/7 from your phone', href: '#digital', icon: Smartphone },
      { label: 'QR Payments', desc: 'Fonepay & NepalPay merchants', href: '#digital', icon: QrCode },
      { label: 'eSewa & Khalti Load', desc: 'Top up wallets instantly', href: '#digital', icon: Wallet },
      { label: 'Remittance', desc: 'IME, Prabhu, Western Union', href: '#digital', icon: Send },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Notice Board', desc: 'Official circulars & PDFs', href: '#notices', icon: FileText },
      { label: 'FAQs', desc: 'Loans, membership & rates', href: '#faq', icon: MessageCircleQuestion },
      { label: 'Branch Locator', desc: '78 branches in 7 provinces', href: '#branches', icon: MapPin },
      { label: 'Grievance Desk', desc: 'Toll-free 1660-01-23456', href: 'tel:16600123456', icon: Headset },
    ],
  },
]

export type SavingsProduct = {
  type: string
  desc: string
  rate: number
  minDeposit: string
  tenure: string
  icon: LucideIcon
  featured?: boolean
}

export const savingsProducts: SavingsProduct[] = [
  { type: 'Regular Savings', desc: 'Everyday account, no lock-in', rate: 8.5, minDeposit: 'Rs. 100', tenure: 'Flexible', icon: PiggyBank },
  { type: 'Child Future Savings', desc: 'For members below 18', rate: 9.0, minDeposit: 'Rs. 100', tenure: 'Until age 18', icon: Baby },
  { type: 'Mahila Bachat (Women)', desc: 'Women-led households', rate: 9.25, minDeposit: 'Rs. 500', tenure: 'Flexible', icon: UserRound },
  { type: 'Senior Citizen Savings', desc: 'Members aged 60 and above', rate: 10.0, minDeposit: 'Rs. 1,000', tenure: 'Flexible', icon: UserRound },
  { type: 'Recurring Deposit', desc: 'Monthly installment savings', rate: 10.5, minDeposit: 'Rs. 500 / month', tenure: '1 – 5 Years', icon: ArrowLeftRight },
  { type: 'Fixed Deposit', desc: 'Highest guaranteed return', rate: 12.0, minDeposit: 'Rs. 25,000', tenure: '3 Months – 5 Years', icon: Landmark, featured: true },
]

export type FdPlan = { id: string; label: string; months: number; rate: number }

export const fdPlans: FdPlan[] = [
  { id: '6m', label: '6 Months', months: 6, rate: 9.5 },
  { id: '1y', label: '1 Year', months: 12, rate: 11.0 },
  { id: '2y', label: '2 Years', months: 24, rate: 11.5 },
  { id: '3y', label: '3 Years', months: 36, rate: 12.0 },
]

export type Notice = {
  title: string
  category: 'Dividend' | 'Interest Rate' | 'AGM' | 'Financial Report' | 'Holiday' | 'Recruitment'
  dateBS: string
  dateISO: string
  size: string
  href: string
  isNew?: boolean
}

export const notices: Notice[] = [
  {
    title: 'Dividend distribution notice for FY 2082/83 (12% on share capital)',
    category: 'Dividend',
    dateBS: 'Ashwin 15, 2083',
    dateISO: '2026-10-01',
    size: '284 KB',
    href: '/downloads/notices/dividend-distribution-2082-83.pdf',
    isNew: true,
  },
  {
    title: 'Revised interest rates on savings & loan products effective Ashwin 1',
    category: 'Interest Rate',
    dateBS: 'Ashwin 02, 2083',
    dateISO: '2026-09-18',
    size: '196 KB',
    href: '/downloads/notices/interest-rate-revision-ashwin-2083.pdf',
    isNew: true,
  },
  {
    title: 'Invitation to the 24th Annual General Meeting — Kartik 08, 2083',
    category: 'AGM',
    dateBS: 'Bhadra 20, 2083',
    dateISO: '2026-09-05',
    size: '412 KB',
    href: '/downloads/notices/24th-agm-invitation.pdf',
  },
  {
    title: 'Audited financial statement FY 2082/83',
    category: 'Financial Report',
    dateBS: 'Bhadra 05, 2083',
    dateISO: '2026-08-21',
    size: '1.8 MB',
    href: '/downloads/reports/audited-financial-statement-2082-83.pdf',
  },
  {
    title: 'Dashain & Tihar branch operating schedule',
    category: 'Holiday',
    dateBS: 'Shrawan 25, 2083',
    dateISO: '2026-08-10',
    size: '120 KB',
    href: '/downloads/notices/festival-branch-schedule-2083.pdf',
  },
  
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: 'Who can become a member of Sajha Bachat?',
    a: 'Any Nepali citizen aged 16 or above residing within our working area can join. You need a citizenship certificate (or birth certificate for minors), two passport-size photos, and a minimum share purchase of Rs. 1,000 plus a one-time entry fee of Rs. 100.',
  },
  {
    q: 'What documents are required to apply for a loan?',
    a: 'Submit a completed loan application, copy of citizenship, recent photos, income proof (salary slip, business PAN/VAT or farm records), and collateral documents such as Lalpurja (land ownership certificate), Naksa (map) and Char Killa. Loans up to Rs. 3 Lakh for regular savers may be approved on group guarantee without collateral.',
  },
  {
    q: 'How long does loan approval take?',
    a: 'Most personal and agriculture loans are approved within 3–5 working days after collateral valuation. Gold-backed and FD-backed loans are disbursed the same day.',
  },
  {
    q: 'How often are interest rates revised?',
    a: 'Interest rates are reviewed quarterly by the Board in line with Department of Cooperatives directives. Revisions are published on the Notice Board and apply to existing flexible accounts from the effective date. Fixed deposit rates stay locked for the full tenure.',
  },
  {
    q: 'When is interest credited to my savings account?',
    a: 'Interest is calculated on the daily closing balance and credited quarterly at the end of Ashwin, Poush, Chaitra and Ashadh. 5% Tax Deducted at Source (TDS) applies as per the Income Tax Act.',
  },
  {
    q: 'Are my deposits insured?',
    a: 'Yes. Savings and fixed deposits up to Rs. 5 Lakh per member are covered under the Deposit and Credit Guarantee Fund (DCGF) scheme for co-operatives.',
  },
]

export type Testimonial = { name: string; role: string; location: string; product: string; quote: string; rating: number }

export const testimonials: Testimonial[] = [
  {
    name: 'Sita Shrestha',
    role: 'Dairy farmer',
    location: 'Dhading',
    product: 'Agriculture Loan',
    quote:
      'With a Rs. 4 Lakh agriculture loan I bought three more cows. The repayment schedule matches my milk income, so I never feel pressured.',
    rating: 5,
  },
  {
    name: 'Ramesh Thapa Magar',
    role: 'Retired teacher',
    location: 'Pokhara',
    product: 'Senior Citizen Savings',
    quote:
      'The 10% senior citizen rate is better than any bank I checked. The staff at Lakeside branch always explain everything patiently.',
    rating: 5,
  },
  {
    name: 'Anjali Karki',
    role: 'Boutique owner',
    location: 'Biratnagar',
    product: 'Business Loan & Mobile App',
    quote:
      'I scan QR payments from customers and transfer to suppliers from the app. My business loan was approved in just four days.',
    rating: 4,
  },
]

export type Branch = {
  name: string
  province: string
  address: string
  phone: string
  manager: string
  hours: string
  isHeadOffice?: boolean
}

export const branches: Branch[] = [
  { name: 'Head Office', province: 'Bagmati', address: 'New Baneshwor-10, Kathmandu', phone: '01-4781234', manager: 'Bishnu Prasad Adhikari', hours: 'Sun–Fri, 10:00–17:00', isHeadOffice: true },
  { name: 'Lalitpur Branch', province: 'Bagmati', address: 'Pulchowk-3, Lalitpur', phone: '01-5521456', manager: 'Sunita Maharjan', hours: 'Sun–Fri, 10:00–17:00' },
  { name: 'Pokhara Lakeside', province: 'Gandaki', address: 'Lakeside-6, Pokhara', phone: '061-465789', manager: 'Hari Bahadur Gurung', hours: 'Sun–Fri, 10:00–17:00' },
  { name: 'Biratnagar Branch', province: 'Koshi', address: 'Main Road-4, Biratnagar', phone: '021-532110', manager: 'Pramila Rai', hours: 'Sun–Fri, 10:00–17:00' },
  { name: 'Butwal Branch', province: 'Lumbini', address: 'Traffic Chowk-8, Butwal', phone: '071-545632', manager: 'Deepak Sharma', hours: 'Sun–Fri, 10:00–17:00' },
  { name: 'Janakpur Branch', province: 'Madhesh', address: 'Bhanu Chowk-1, Janakpurdham', phone: '041-527894', manager: 'Ram Kumar Yadav', hours: 'Sun–Fri, 10:00–17:00' },
  { name: 'Dhangadhi Branch', province: 'Sudurpashchim', address: 'Chauraha-2, Dhangadhi', phone: '091-523647', manager: 'Kamala Bhatta', hours: 'Sun–Fri, 10:00–17:00' },
  { name: 'Birendranagar Branch', province: 'Karnali', address: 'Birendranagar-6, Surkhet', phone: '083-520981', manager: 'Tek Bahadur Shahi', hours: 'Sun–Fri, 10:00–17:00' },
]

export type NewsItem = { title: string; category: string; dateBS: string; dateISO: string; excerpt: string; image?: string; alt: string }

export const news: NewsItem[] = [
  {
    title: 'Sajha Mobile App 3.0 launches with Fonepay QR and wallet loading',
    category: 'Digital Banking',
    dateBS: 'Ashwin 10, 2083',
    dateISO: '2026-09-26',
    excerpt: 'Members can now scan any Fonepay QR, load eSewa and Khalti wallets, and download e-statements directly from the app.',
    image: unsplash('1563013544-824ae1b704d3', 800),
    alt: 'Person making a digital payment on a laptop with a card',
  },
  {
    title: 'Financial literacy camp reaches 500 women entrepreneurs in Dhading',
    category: 'Community',
    dateBS: 'Bhadra 28, 2083',
    dateISO: '2026-09-13',
    excerpt: 'A three-day program on budgeting, savings discipline and micro-enterprise credit was held across five wards.',
    image: unsplash('1521791136064-7986c2920216', 800),
    alt: 'Two people shaking hands after a meeting',
  },
  {
    title: 'Interest subsidy on agriculture loans extended for Gandaki farmers',
    category: 'Loans',
    dateBS: 'Bhadra 12, 2083',
    dateISO: '2026-08-28',
    excerpt: 'Eligible farmers can access loans at 9.5% effective rate under the provincial subsidy program until Chaitra end.',
    image: unsplash('1500382017468-9049fed747ef', 800),
    alt: 'Green farm fields at sunrise',
  },
  {
    title: 'Members complete financial literacy workshop in Kathmandu',
    category: 'Member Education',
    dateBS: 'Bhadra 05, 2083',
    dateISO: '2026-08-21',
    excerpt: 'The cooperative hosted a practical session on household budgeting, responsible borrowing, and building a regular savings habit.',
    image: unsplash('1521737711867-e3b97375f902', 800),
    alt: 'Community members taking part in a financial education workshop',
  },
  {
    title: 'Youth members present ideas at annual cooperative gathering',
    category: 'Community',
    dateBS: 'Shrawan 22, 2083',
    dateISO: '2026-08-07',
    excerpt: 'Young members shared ideas for digital services and community programs during a discussion hosted at the head office.',
    image: unsplash('1511632765486-a01980e01a18', 800),
    alt: 'A group of community members gathered for a discussion',
  },
  {
    title: 'Local small businesses join cooperative savings program',
    category: 'Savings',
    dateBS: 'Shrawan 08, 2083',
    dateISO: '2026-07-24',
    excerpt: 'Small business owners met with cooperative staff to learn about sample savings products and responsible access to credit.',
    image: unsplash('1517248135467-4c7edcad34c4', 800),
    alt: 'Small business owners meeting around a table',
  },
]

export type GalleryItem = { title: string; image?: string; alt: string }

export const gallery: GalleryItem[] = [
  { title: '23rd Annual General Meeting', image: unsplash('1450101499163-c8848c66ca85', 900), alt: 'Members signing documents at a meeting table' },
  { title: 'Internal audit review 2083', image: unsplash('1554224155-6726b3ff858f', 600), alt: 'Calculator and financial documents on a desk' },
  { title: 'Savings week campaign', image: unsplash('1579621970563-ebec7560ff3e', 600), alt: 'Coins stacked with a small growing plant' },
  { title: 'Staff digital training', image: unsplash('1460925895917-afdab827c52f', 600), alt: 'Laptop displaying financial analytics charts' },
  { title: 'Tihar celebration 2083', alt: 'Tihar celebration photo — upload pending' },
  { title: 'Financial literacy workshop', image: unsplash('1521737711867-e3b97375f902', 900), alt: 'Community members taking part in a financial education workshop' },
  { title: 'Youth members gathering', image: unsplash('1511632765486-a01980e01a18', 600), alt: 'A group of community members gathered for a discussion' },
  { title: 'Small business member meeting', image: unsplash('1517248135467-4c7edcad34c4', 600), alt: 'Small business owners meeting around a table' },
]
