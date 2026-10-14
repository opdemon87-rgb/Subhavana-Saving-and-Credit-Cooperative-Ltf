import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { ok, handleErr } from '@/lib/api'
import { loanSchema } from '@/lib/validation'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const data = loanSchema.parse(await req.json())
    const session = await getSession()
    const app = await prisma.loanApplication.create({
      data: { ...data, memberId: session?.sub ?? null },
    })
    return ok({ referenceNo: app.referenceNo, status: app.status }, 201)
  } catch (e) { return handleErr(e) }
}