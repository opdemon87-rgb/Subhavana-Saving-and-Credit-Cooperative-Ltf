import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { fail, handleErr, ok } from '@/lib/api'
import { getSession } from '@/lib/auth'
import { supportRequestSchema } from '@/lib/validation'

export async function POST(req: NextRequest) {
  try {
    const data = supportRequestSchema.parse(await req.json())
    const session = await getSession()

    const supportRequest = await prisma.supportRequest.create({
      data: {
        anonymous: data.anonymous,
        fullName: data.anonymous ? null : data.fullName ?? null,
        email: data.anonymous ? null : data.email ?? null,
        phone: data.anonymous ? null : data.phone ?? null,
        category: data.category,
        subject: data.subject,
        message: data.message,
        memberId: data.anonymous ? null : session?.sub ?? null,
      },
      select: {
        ticketNo: true,
        category: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    })

    return ok(supportRequest, 201)
  } catch (error) {
    return handleErr(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const ticketNo = req.nextUrl.searchParams.get('ticketNo')?.trim()

    if (!ticketNo || ticketNo.length > 64) {
      return fail('Enter a valid ticket number')
    }

    const supportRequest = await prisma.supportRequest.findUnique({
      where: { ticketNo },
      select: {
        ticketNo: true,
        category: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    })

    if (!supportRequest) {
      return fail('Ticket not found', 404)
    }

    return ok(supportRequest)
  } catch (error) {
    return handleErr(error)
  }
}