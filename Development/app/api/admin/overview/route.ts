import { prisma } from '@/lib/db'
import { fail, handleErr, ok } from '@/lib/api'
import { getSession, isAdminMember } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return fail('Not authenticated', 401)
    }

    if (!(await isAdminMember(session.sub))) {
      return fail('Admin access required', 403)
    }

    const [
      members,
      pendingKyc,
      loanApplications,
      submittedLoanApplications,
      supportRequests,
      receivedSupportRequests,
      activeLoans,
      notices,
    ] = await Promise.all([
      prisma.member.count({ where: { role: 'MEMBER' } }),
      prisma.member.count({ where: { role: 'MEMBER', kycStatus: 'PENDING' } }),
      prisma.loanApplication.count(),
      prisma.loanApplication.count({ where: { status: 'SUBMITTED' } }),
      prisma.supportRequest.count(),
      prisma.supportRequest.count({ where: { status: 'RECEIVED' } }),
      prisma.loan.count({ where: { status: 'ACTIVE' } }),
      prisma.notice.count(),
    ])

    return ok({
      members,
      pendingKyc,
      loanApplications,
      submittedLoanApplications,
      supportRequests,
      receivedSupportRequests,
      activeLoans,
      notices,
    })
  } catch (error) {
    return handleErr(error)
  }
}