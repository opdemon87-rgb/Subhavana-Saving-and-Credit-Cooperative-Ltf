import { prisma } from '@/backend/lib/db'
import { ok, handleErr } from '@/backend/lib/api'

export const revalidate = 0 // no cache — always fresh for demo

export async function GET() {
  try {
    const [deposits, withdrawals, activeLoans, shares, memberCount] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: 'DEPOSIT' },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { type: 'WITHDRAWAL' },
        _sum: { amount: true },
      }),
      prisma.loan.aggregate({
        where: { status: 'ACTIVE' },
        _sum: { amount: true },
      }),
      prisma.shareContribution.aggregate({
        _sum: { amount: true },
      }),
      prisma.member.count(),
    ])

    const totalDeposits = deposits._sum.amount ?? 0
    const totalWithdrawals = withdrawals._sum.amount ?? 0
    const totalSavings = totalDeposits - totalWithdrawals
    const loanPortfolio = activeLoans._sum.amount ?? 0
    const shareCapital = shares._sum.amount ?? 0
    const totalAssets = totalSavings + shareCapital + loanPortfolio * 0.15 // simplified

    return ok({
      totalSavings,
      loanPortfolio,
      shareCapital,
      totalAssets,
      memberCount,
      asOf: new Date().toISOString(),
    })
  } catch (e) {
    return handleErr(e)
  }
}