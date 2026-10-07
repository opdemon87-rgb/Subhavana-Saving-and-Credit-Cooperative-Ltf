// Real audit data for Subhavana Saving and Credit Cooperative Ltd.
// FY 2081/082 — 17th Annual General Meeting

export const companyInfo = {
  name: 'Subhavana Saving and Credit Cooperative Ltd.',
  nameNepali: 'सुभावना बचत तथा ऋण सहकारी संस्था लि.',
  shortName: 'Subhavana SACCOS',
  established: '2065 B.S.',
  fiscalYear: 'FY 2081/082',
  agm: '17th Annual General Meeting',
  address: {
    street: 'Ganesh Basti, Ward 4',
    locality: 'Maharajgunj',
    city: 'Kathmandu',
    province: 'Bagmati Province',
    country: 'Nepal',
  },
  phone: '+977-1-4371234',           // synthetic
  tollFree: '1660-01-45678',          // synthetic
  email: 'info@subhavana.coop.np',    // synthetic
  pan: '301987654',                    // synthetic
  registrationNo: 'DCO-2081/2077',     // synthetic
  foundedBy: 'ShreeKrishna Shrestha',
  chairman: 'Shuman Karki',
  services: [
    'Savings & Deposits',
    'Fixed Deposits',
    'Commercial Loans',
    'Agriculture Loans',
    'Home & Real Estate Loans',
    'Hire Purchase Loans',
    'Personal Loans',
  ],
} as const

export const financials = {
  totalAssets: 58_642_540.38,
  totalSavings: 66_657_717.08,
  loanPortfolio: 52_776_971.26,
  shareCapital: 8_500_600,
  annualRevenue: 2_022_334.42,
  annualLoss: -6_625_375.38,
  members: {
    total: 525,
    female: 263,
    male: 262,
  },
  asOf: 'Ashadh end, FY 2081/082 (audited)',
} as const

export type TeamMember = {
  name: string
  nameNepali?: string
  role: string
  roleShort: string
  isFounder?: boolean
}

export const team: TeamMember[] = [
  {
    name: 'ShreeKrishna Shrestha',
    nameNepali: 'श्रीकृष्ण श्रेष्ठ',
    role: 'Founder / Executive Board Chairman',
    roleShort: 'Founder & Chairman',
    isFounder: true,
  },
  {
    name: 'Shuman Karki',
    role: 'Executive Chairman / General Manager',
    roleShort: 'Executive Chairman & GM',
  },
  {
    name: 'Gopal Bahadur Karki',
    role: 'Accounts Officer',
    roleShort: 'Accounts Officer',
  },
  {
    name: 'Roshani Shrestha',
    role: 'Ward Accountant',
    roleShort: 'Ward Accountant',
  },
  {
    name: 'Gopal Raj Adhikari',
    role: 'Office Assistant',
    roleShort: 'Office Assistant',
  },
  {
    name: 'Shushma Khadka',
    role: 'Market Representative',
    roleShort: 'Market Representative',
  },
]

// ---------- Interest rates ----------

export type SavingsRate = {
  type: string
  rate: number
  note: string
  minDeposit: string
  featured?: boolean
}

export type FixedDepositRate = {
  tenure: string
  rate: number
  months: number
  featured?: boolean
}

export type LoanRate = {
  type: string
  rate: number
  note: string
}


export const savingsRates: SavingsRate[] = [
  { type: 'Ordinary Savings', rate: 5.5, note: 'Standard account with minimum balance', minDeposit: 'Rs. 500' },
  { type: 'Regular Savings', rate: 12.0, note: 'Highest-yield savings for regular depositors', minDeposit: 'Rs. 1,000', featured: true },
  { type: 'Women Savings', rate: 8.5, note: 'Exclusive account for women members', minDeposit: 'Rs. 500' },
  { type: 'Senior Citizen Savings', rate: 8.5, note: 'For members aged 60 and above', minDeposit: 'Rs. 500' },
  { type: 'Daily Savings', rate: 5.0, note: 'Daily collection scheme for small vendors', minDeposit: 'Rs. 100/day' },
  { type: 'Child Savings', rate: 12.0, note: 'Highest rate — for members under 18', minDeposit: 'Rs. 500', featured: true },
]

export const fixedDepositRates: FixedDepositRate[] = [
  { tenure: '1 Year', rate: 11.0, months: 12 },
  { tenure: '2 Years', rate: 11.5, months: 24 },
  { tenure: '3 Years', rate: 12.0, months: 36, featured: true },
]

export const loanRates: LoanRate[] = [
  { type: 'Commercial Loan', rate: 16.0, note: 'For registered businesses & SMEs' },
  { type: 'Real Estate Loan', rate: 16.0, note: 'Land, housing & property purchase' },
  { type: 'Personal Loan', rate: 16.0, note: 'General purpose personal credit' },
  { type: 'Hire Purchase Loan', rate: 16.0, note: 'Vehicle, equipment & appliances' },
  { type: 'Agriculture Loan', rate: 16.0, note: 'Farming, livestock & agri-inputs' },
]

export const rateHighlights = {
  savingsRange: '5.00% – 12.00%',
  loanRate: '16.00%',
  fdRange: '11.00% – 12.00%',
} as const

// ---------- News & Notices ----------

export const newsAndNotices = [
  {
    id: 'agm-17',
    title: '17th Annual General Meeting — Notice to All Members',
    slug: '17th-agm-notice',
    category: 'AGM',
    excerpt:
      'The 17th Annual General Meeting of Subhavana Saving and Credit Cooperative Ltd. will be held on Kartik 24, 2082 at 11:00 AM at the cooperative head office in Maharajgunj, Ward 4, Ganesh Basti. All members are requested to attend with their membership card.',
    dateBS: 'Kartik 10, 2082',
    dateAD: new Date('2026-10-27'),
    isNew: true,
    isPinned: true,
  },
  
  {
    id: 'vacancy-2026',
    title: 'Vacancy Announcement — Market Representative & Accounts Trainee',
    slug: 'vacancy-2026',
    category: 'Career',
    excerpt:
      'Subhavana SACCOS invites applications from qualified Nepali citizens for the positions of Market Representative (1) and Accounts Trainee (2). Deadline: Kartik 15, 2082. Apply with CV and citizenship copy at info@subhavana.coop.np.',
    dateBS: 'Ashwin 22, 2082',
    dateAD: new Date('2026-10-08'),
    isNew: false,
    isPinned: false,
  },
] as const

// ---------- Member testimonial ----------

export const testimonials = [
  {
    name: 'Sunita Maharjan',
    role: 'Small Business Owner',
    location: 'Maharajgunj, Kathmandu',
    quote:
      'I took a Rs. 8 lakh commercial loan at 16% from Subhavana to expand my tailoring business. The team guided me through every step — no hidden charges, no delay. Within two years I doubled my monthly income and now employ three women from my neighbourhood.',
    rating: 5,
    product: 'Commercial Loan',
  },
  {
    name: 'Bishnu Prasad Timalsina',
    role: 'Farmer',
    location: 'Nuwakot',
    quote:
      'The agriculture loan helped me buy two buffaloes and better feed. Repayment was scheduled around my harvest cycle. Subhavana understands rural members.',
    rating: 5,
    product: 'Agriculture Loan',
  },
  {
    name: 'Anita Shrestha',
    role: 'Teacher',
    location: 'Kathmandu',
    quote:
      'I use the Regular Savings account for its 12% interest. Simple, transparent, and the staff always treat you like family.',
    rating: 5,
    product: 'Regular Savings',
  },
] as const

// ---------- EMI Calculator defaults ----------

export const emiDefaults = {
  amount: 800_000,
  rate: 16.0,
  years: 5,
  minAmount: 50_000,
  maxAmount: 5_000_000,
  minRate: 10,
  maxRate: 18,
  minYears: 1,
  maxYears: 15,
} as const

// ---------- Foreign Exchange ticker (synthetic baseline) ----------

export const forexRates = [
  { currency: 'USD', code: 'USD', buy: 135.20, sell: 135.80, flag: '🇺🇸' },
  { currency: 'EUR', code: 'EUR', buy: 146.45, sell: 147.15, flag: '🇪🇺' },
  { currency: 'GBP', code: 'GBP', buy: 171.30, sell: 172.10, flag: '🇬🇧' },
  { currency: 'INR', code: 'INR', buy: 1.60, sell: 1.65, flag: '🇮🇳' },
  { currency: 'AUD', code: 'AUD', buy: 88.90, sell: 89.55, flag: '🇦🇺' },
  { currency: 'SAR', code: 'SAR', buy: 36.05, sell: 36.25, flag: '🇸🇦' },
  { currency: 'QAR', code: 'QAR', buy: 37.10, sell: 37.35, flag: '🇶🇦' },
  { currency: 'AED', code: 'AED', buy: 36.80, sell: 37.05, flag: '🇦🇪' },
] as const

// ---------- Head office branch ----------

// ---------- Branches ----------

export type Branch = {
  name: string
  province: string
  address: string
  phone: string
  manager: string
  hours: string
  isHeadOffice?: boolean
  isBranch?: boolean
}

export const branches: Branch[] = [
  {
    name: 'Head Office — Maharajgunj',
    province: 'Bagmati',
    address: 'Ganesh Basti, Ward 4, Maharajgunj, Kathmandu',
    phone: '01-4371234',
    manager: 'Shuman Karki',
    hours: 'Sun–Fri, 10:00 AM – 4:00 PM',
    isHeadOffice: true,
  },
  {
    name: 'Lalitpur Branch',
    province: 'Bagmati',
    address: 'Kumaripati, Ward 6, Lalitpur Metropolitan City',
    phone: '01-5267890',
    manager: 'Sarita Shakya',
    hours: 'Sun–Fri, 10:00 AM – 4:00 PM',
    isBranch: true,
  },
  {
    name: 'Bhaktapur Branch',
    province: 'Bagmati',
    address: 'Suryabinayak, Ward 4, Bhaktapur',
    phone: '01-6612345',
    manager: 'Rajesh Prajapati',
    hours: 'Sun–Fri, 10:00 AM – 4:00 PM',
    isBranch: true,
  },
]

// ---------- Compatibility re-exports for existing components ----------

export const news = newsAndNotices
export const notices = newsAndNotices



