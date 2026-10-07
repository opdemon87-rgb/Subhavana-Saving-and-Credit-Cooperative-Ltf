import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Branches
  // ---------- Branches ----------
await prisma.branch.createMany({
  data: [
    {
      name: 'Head Office — Maharajgunj',
      province: 'Bagmati',
      address: 'Ganesh Basti, Ward 4, Maharajgunj, Kathmandu',
      phone: '01-4371234',
      manager: 'Shuman Karki',
      hours: 'Sun–Fri, 10:00 AM – 4:00 PM',
      isHeadOffice: true,
      latitude: 27.7362,
      longitude: 85.3341,
    },
    {
      name: 'Lalitpur Branch',
      province: 'Bagmati',
      address: 'Kumaripati, Ward 6, Lalitpur Metropolitan City',
      phone: '01-5267890',
      manager: 'Sarita Shakya',
      hours: 'Sun–Fri, 10:00 AM – 4:00 PM',
    },
    {
      name: 'Bhaktapur Branch',
      province: 'Bagmati',
      address: 'Suryabinayak, Ward 4, Bhaktapur',
      phone: '01-6612345',
      manager: 'Rajesh Prajapati',
      hours: 'Sun–Fri, 10:00 AM – 4:00 PM',
    },
  ],
})

  // Interest rates
  await prisma.interestRate.createMany({
    data: [
      { product: 'Regular Savings', category: 'SAVINGS', rate: 8.5, minDeposit: 500, description: 'Everyday savings account', iconKey: 'PiggyBank' },
      { product: 'Recurring Deposit', category: 'SAVINGS', rate: 9.5, minDeposit: 1000, tenureMonths: 60, description: 'Monthly deposits for a fixed term', iconKey: 'CalendarClock' },
      { product: 'Fixed Deposit (6 mo)', category: 'FIXED_DEPOSIT', rate: 10.5, minDeposit: 25000, tenureMonths: 6, iconKey: 'Lock' },
      { product: 'Fixed Deposit (1 yr)', category: 'FIXED_DEPOSIT', rate: 11.5, minDeposit: 25000, tenureMonths: 12, iconKey: 'Lock' },
      { product: 'Fixed Deposit (3 yr)', category: 'FIXED_DEPOSIT', rate: 12.0, minDeposit: 25000, tenureMonths: 36, featured: true, iconKey: 'Sparkles' },
      { product: 'Agriculture Loan', category: 'LOAN', rate: 11.5, description: 'Low-interest credit for farmers' },
      { product: 'Business Loan', category: 'LOAN', rate: 13.5, description: 'Working capital for SMEs' },
      { product: 'Home Loan', category: 'LOAN', rate: 12.5, description: 'Long-tenure housing finance' },
    ],
  })

  // Notices
  await prisma.notice.createMany({
    data: [
      { title: '24th Annual General Meeting Notice', category: 'AGM', dateBS: 'Kartik 08, 2083', dateAD: new Date('2026-10-25'), fileSize: '245 KB', isNew: true },
      { title: 'Interest Rate Revision – Effective Ashwin 1, 2083', category: 'Rate Change', dateBS: 'Ashwin 1, 2083', dateAD: new Date('2026-09-17'), fileSize: '182 KB', isNew: true },
      { title: 'Dashain & Tihar Holiday Schedule', category: 'Holiday', dateBS: 'Ashwin 25, 2083', dateAD: new Date('2026-10-11'), fileSize: '120 KB' },
      { title: 'Audited Financial Statement FY 2082/83', category: 'Financial', dateBS: 'Bhadra 15, 2083', dateAD: new Date('2026-08-31'), fileSize: '1.2 MB' },
    ],
  })

  // News
  await prisma.newsPost.createMany({
    data: [
      { title: 'New Birendranagar Branch Opens in Surkhet', slug: 'birendranagar-opens', category: 'Branch', excerpt: 'Expanding our reach to Karnali Province with a full-service branch.', dateBS: 'Kartik 02, 2083', dateAD: new Date('2026-10-19') },
      { title: '12% Dividend Declared for FY 2082/83', slug: 'dividend-2082-83', category: 'Dividend', excerpt: 'The Board of Directors has approved a 12% cash dividend to member share accounts.', dateBS: 'Ashwin 20, 2083', dateAD: new Date('2026-10-06') },
      { title: 'Financial Literacy Drive in Rural Schools', slug: 'financial-literacy', category: 'Community', excerpt: 'Reaching 5,000+ students across 20 districts.', dateBS: 'Bhadra 28, 2083', dateAD: new Date('2026-09-13') },
    ],
  })

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      { name: 'Sunita Tamang', role: 'Small Business Owner', location: 'Pokhara', quote: 'The business loan helped me expand my tailoring shop. Repayment schedule matched my cash flow perfectly.', product: 'Business Loan' },
      { name: 'Bikram Shah', role: 'Farmer', location: 'Chitwan', quote: 'I got agriculture credit at 11.5% and repaid after harvest. No pressure, no hidden fees.', product: 'Agriculture Loan' },
      { name: 'Anita Rai', role: 'Teacher', location: 'Dharan', quote: 'The mobile app makes saving effortless. I can check my interest earnings anytime.', product: 'Savings Account' },
    ],
  })

  // FAQs
  await prisma.faq.createMany({
    data: [
      { question: 'How do I become a member?', answer: 'Visit any branch with your citizenship certificate, a passport-size photo, and PAN card. You can also apply online — our staff will call you within 2 working days.', order: 1 },
      { question: 'What is the minimum deposit for a savings account?', answer: 'You can open a regular savings account with just Rs. 500.', order: 2 },
      { question: 'Are my deposits insured?', answer: 'Yes. Deposits are protected under the Deposit and Credit Guarantee Fund (DCGF) up to Rs. 5 lakh per member.', order: 3 },
      { question: 'How long does loan approval take?', answer: 'Agriculture and business loans are typically approved within 5–7 working days after document verification.', order: 4 },
    ],
  })

  // Demo member — password: demo1234
  await prisma.member.create({
    data: {
      email: 'demo@sajhabachat.coop.np',
      phone: '9800000000',
      fullName: 'Demo Member',
      passwordHash: await bcrypt.hash('demo1234', 10),
      kycStatus: 'VERIFIED',
      province: 'Bagmati',
    },
  })

  console.log('✓ Seeded')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())