import { prisma } from '@/lib/db'
import { ok, handleErr } from '@/lib/api'

export async function GET() {
  try {
    return ok(await prisma.testimonial.findMany({ take: 6 }))
  } catch (e) { return handleErr(e) }
}