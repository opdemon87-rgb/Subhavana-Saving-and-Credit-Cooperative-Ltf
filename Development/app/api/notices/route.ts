import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { ok, handleErr } from '@/lib/api'

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category')
    const notices = await prisma.notice.findMany({
      where: category ? { category } : {},
      orderBy: { publishedAt: 'desc' },
    })
    return ok(notices)
  } catch (e) { return handleErr(e) }
}