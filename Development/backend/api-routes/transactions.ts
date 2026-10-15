import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/backend/lib/db'
import { ok, handleErr } from '@/backend/lib/api'
import { getSession } from '@/backend/lib/auth'

const txSchema = z.object({
  type: z.enum(['DEPOSIT', 'WITHDRAWAL']),
  amount: z.number().positive().max(10_000_000),
  note: z.string().max(200).optional(),
  memberId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const data = txSchema.parse(await req.json())
    const session = await getSession()

    const tx = await prisma.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        note: data.note,
        memberId: data.memberId ?? session?.sub ?? null,
      },
    })
    return ok(tx, 201)
  } catch (e) {
    return handleErr(e)
  }
}

export async function GET(req: NextRequest) {
  try {
    const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? 20), 100)
    const items = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        member: { select: { fullName: true, email: true } },
      },
    })
    return ok(items)
  } catch (e) {
    return handleErr(e)
  }
}