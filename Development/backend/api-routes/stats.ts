
import { prisma } from '@/backend/lib/db'
import { ok, handleErr } from '@/backend/lib/api'

export const revalidate = 0

export async function GET() {
  try {
    const deposits = await prisma.transaction.aggregate({
      where: { type: 'DEPOSIT' },
      _sum: { amount: true },
    })

    const withdrawals = await prisma.transaction.aggregate({
      where: { type: 'WITHDRAWAL' },
      _sum: { amount: true },
    })

    const loans = await prisma.loan.aggregate({
      where: { status: 'ACTIVE' },
      _sum: { amount: true },
    })

    const shares = await prisma.shareContribution.aggregate({
      _sum: { amount: true },
    })

    const totalSavings =
      (deposits._sum.amount ?? 0) - (withdrawals._sum.amount ?? 0)

    const loanPortfolio = loans._sum.amount ?? 0
    const shareCapital = shares._sum.amount ?? 0
    const totalAssets = totalSavings + shareCapital + loanPortfolio * 0.15

    return ok({
      totalSavings,
      loanPortfolio,
      shareCapital,
      totalAssets,
    })
  } catch (e) {
    return handleErr(e)
  }
}