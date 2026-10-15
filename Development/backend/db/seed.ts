import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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

  // ---------- Interest rates ----------
  await prisma.interestRate.createMany({
    data: [
      // Savings
      { product: 'Ordinary Savings', category: 'SAVINGS', rate: 5.5, minDeposit: 500, description: 'Standard account with minimum balance', iconKey: 'Wallet' },
      { product: 'Regular Savings', category: 'SAVINGS', rate: 12.0, minDeposit: 1000, description: 'Highest-yield savings for regular depositors', iconKey: 'PiggyBank', featured: true },
      { product: 'Women Savings', category: 'SAVINGS', rate: 8.5, minDeposit: 500, description: 'Exclusive account for women members', iconKey: 'Heart' },
      { product: 'Senior Citizen Savings', category: 'SAVINGS', rate: 8.5, minDeposit: 500, description: 'For members aged 60 and above', iconKey: 'UserRound' },
      { product: 'Daily Savings', category: 'SAVINGS', rate: 5.0, minDeposit: 100, description: 'Daily collection scheme for small vendors', iconKey: 'CalendarClock' },
      { product: 'Child Savings', category: 'SAVINGS', rate: 12.0, minDeposit: 500, description: 'Highest rate — for members under 18', iconKey: 'Sparkles', featured: true },

      // Fixed Deposit
      { product: 'Fixed Deposit (1 yr)', category: 'FIXED_DEPOSIT', rate: 11.0, minDeposit: 25000, tenureMonths: 12, iconKey: 'Lock' },
      { product: 'Fixed Deposit (2 yr)', category: 'FIXED_DEPOSIT', rate: 11.5, minDeposit: 25000, tenureMonths: 24, iconKey: 'Lock' },
      { product: 'Fixed Deposit (3 yr)', category: 'FIXED_DEPOSIT', rate: 12.0, minDeposit: 25000, tenureMonths: 36, featured: true, iconKey: 'Sparkles' },

      // Loans (uniform 16%)
      { product: 'Commercial Loan', category: 'LOAN', rate: 16.0, description: 'For registered businesses & SMEs' },
      { product: 'Real Estate Loan', category: 'LOAN', rate: 16.0, description: 'Land, housing & property purchase' },
      { product: 'Personal Loan', category: 'LOAN', rate: 16.0, description: 'General purpose personal credit' },
      { product: 'Hire Purchase Loan', category: 'LOAN', rate: 16.0, description: 'Vehicle, equipment & appliances' },
      { product: 'Agriculture Loan', category: 'LOAN', rate: 16.0, description: 'Farming, livestock & agri-inputs' },
    ],
  })

  // ---------- Notices ----------
  await prisma.notice.createMany({
    data: [
      { title: '17th Annual General Meeting — Notice to All Members', category: 'AGM', dateBS: 'Kartik 10, 2082', dateAD: new Date('2026-10-27'), fileSize: '245 KB', isNew: true },
      { title: 'Mobile Banking & QR Payment Now Live for Members', category: 'Digital Banking', dateBS: 'Ashwin 18, 2082', dateAD: new Date('2026-10-04'), fileSize: '180 KB', isNew: true },
      { title: 'Vacancy Announcement — Market Representative & Accounts Trainee', category: 'Career', dateBS: 'Ashwin 22, 2082', dateAD: new Date('2026-10-08'), fileSize: '120 KB' },
      { title: 'Audited Financial Statement FY 2081/082', category: 'Financial', dateBS: 'Bhadra 30, 2082', dateAD: new Date('2026-09-15'), fileSize: '1.4 MB' },
    ],
  })

  // ---------- News ----------
  await prisma.newsPost.createMany({
    data: [
      { title: '17th Annual General Meeting — Notice to All Members', slug: '17th-agm-notice', category: 'AGM', excerpt: 'The 17th AGM will be held on Kartik 24, 2082 at 11:00 AM at the head office in Maharajgunj, Ward 4, Ganesh Basti.', dateBS: 'Kartik 10, 2082', dateAD: new Date('2026-10-27') },
      { title: 'Mobile Banking & QR Payment Now Live for Members', slug: 'mobile-banking-launch', category: 'Digital Banking', excerpt: 'Members can now check balances, transfer funds, and pay at partner merchants across Nepal through our new app.', dateBS: 'Ashwin 18, 2082', dateAD: new Date('2026-10-04') },
      { title: 'Vacancy Announcement — Market Representative & Accounts Trainee', slug: 'vacancy-2026', category: 'Career', excerpt: 'Applications open for Market Representative (1) and Accounts Trainee (2). Deadline: Kartik 15, 2082.', dateBS: 'Ashwin 22, 2082', dateAD: new Date('2026-10-08') },
    ],
  })

  // ---------- Testimonials ----------
  await prisma.testimonial.createMany({
    data: [
      { name: 'Sunita Maharjan', role: 'Small Business Owner', location: 'Maharajgunj, Kathmandu', quote: 'I took a Rs. 8 lakh commercial loan at 16% from Subhavana to expand my tailoring business. Within two years I doubled my monthly income and now employ three women from my neighbourhood.', product: 'Commercial Loan', rating: 5 },
      { name: 'Bishnu Prasad Timalsina', role: 'Farmer', location: 'Nuwakot', quote: 'The agriculture loan helped me buy two buffaloes and better feed. Repayment was scheduled around my harvest cycle.', product: 'Agriculture Loan', rating: 5 },
      { name: 'Anita Shrestha', role: 'Teacher', location: 'Kathmandu', quote: 'I use the Regular Savings account for its 12% interest. Simple, transparent, and the staff always treat you like family.', product: 'Regular Savings', rating: 5 },
    ],
  })

  // ---------- FAQs ----------
  await prisma.faq.createMany({
    data: [
      { question: 'How do I become a member of Subhavana?', answer: 'Visit our head office at Ganesh Basti, Ward 4, Maharajgunj with your citizenship certificate, a passport-size photo, and PAN card. Membership is open to all Nepali citizens above 18.', order: 1 },
      { question: 'What is the minimum deposit to open a savings account?', answer: 'Ordinary, Women, Senior Citizen, and Child savings accounts start at Rs. 500. Regular Savings requires Rs. 1,000.', order: 2 },
      { question: 'Are my deposits insured?', answer: 'Yes. Deposits are protected under the Deposit and Credit Guarantee Fund (DCGF) up to Rs. 5 lakh per member.', order: 3 },
      { question: 'What interest rates do you offer on loans?', answer: 'All our loans — Commercial, Real Estate, Personal, Hire Purchase, and Agriculture — are currently offered at 16% p.a.', order: 4 },
      { question: 'How long does loan approval take?', answer: 'Most loans are approved within 5–7 working days after document verification and collateral assessment.', order: 5 },
    ],
  })

  // ---------- Demo member ----------
  const demoMember = await prisma.member.upsert({
    where: { email: 'demo@subhavana.coop.np' },
    update: {},
    create: {
      email: 'demo@subhavana.coop.np',
      phone: '9800000000',
      fullName: 'Demo Member',
      passwordHash: await bcrypt.hash('demo1234', 10),
      kycStatus: 'VERIFIED',
      province: 'Bagmati',
    },
  })

  // ---------- Transactions (drives live Impact Stats) ----------
  await prisma.transaction.createMany({
    data: [
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 45_000, note: 'Initial savings — Sunita Maharjan' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 82_000, note: 'Monthly deposit — Bishnu Timalsina' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 120_000, note: 'FD opening — Anita Shrestha' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 35_000, note: 'Regular savings deposit' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 60_000, note: 'Child savings — opened by parent' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 25_000, note: 'Women savings deposit' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 150_000, note: 'Fixed Deposit — 3 year' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 18_000, note: 'Senior citizen savings' },
      { memberId: demoMember.id, type: 'DEPOSIT', amount: 92_000, note: 'Recurring deposit installment' },
      { memberId: demoMember.id, type: 'WITHDRAWAL', amount: 15_000, note: 'Partial withdrawal — emergency' },
      { memberId: demoMember.id, type: 'WITHDRAWAL', amount: 8_500, note: 'ATM withdrawal' },
    ],
  })

  // ---------- Loans (active portfolio) ----------
  await prisma.loan.createMany({
    data: [
      { memberId: demoMember.id, amount: 800_000, status: 'ACTIVE' },
      { memberId: demoMember.id, amount: 250_000, status: 'ACTIVE' },
      { memberId: demoMember.id, amount: 1_500_000, status: 'ACTIVE' },
      { memberId: demoMember.id, amount: 400_000, status: 'ACTIVE' },
      { memberId: demoMember.id, amount: 320_000, status: 'ACTIVE' },
      { memberId: demoMember.id, amount: 180_000, status: 'CLOSED' },
    ],
  })

  // ---------- Share contributions ----------
  await prisma.shareContribution.createMany({
    data: [
      { memberId: demoMember.id, amount: 5_000 },
      { memberId: demoMember.id, amount: 5_000 },
      { memberId: demoMember.id, amount: 10_000 },
      { memberId: demoMember.id, amount: 5_000 },
      { memberId: demoMember.id, amount: 25_000 },
      { memberId: demoMember.id, amount: 50_000 },
    ],
  })

  console.log('✓ Seeded Subhavana data + transactions + loans + shares')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())