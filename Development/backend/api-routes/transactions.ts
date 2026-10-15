
import { NextRequest } from 'next/server'
import { prisma } from '@/backend/lib/db'
import { ok, handleErr } from '@/backend/lib/api'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const tx = await prisma.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        note: data.note,
        memberId: data.memberId ?? null,
      },
    })

    return ok(tx, 201)
  } catch (e) {
    return handleErr(e)
  }
}

export async function GET() {
  try {
    const items = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return ok(items)
  } catch (e) {
    return handleErr(e)
  }
}