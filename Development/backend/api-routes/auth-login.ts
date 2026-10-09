import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { ok, fail, handleErr } from '@/lib/api'
import { loginSchema } from '@/lib/validation'
import { createSession, verifyPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = loginSchema.parse(await req.json())
    const member = await prisma.member.findUnique({ where: { email } })
    if (!member) return fail('Invalid credentials', 401)
    if (!(await verifyPassword(password, member.passwordHash)))
      return fail('Invalid credentials', 401)

    await createSession({
      sub: member.id, email: member.email, role: member.role, name: member.fullName,
    })
    return ok({ id: member.id, email: member.email, fullName: member.fullName, role: member.role })
  } catch (e) { return handleErr(e) }
}