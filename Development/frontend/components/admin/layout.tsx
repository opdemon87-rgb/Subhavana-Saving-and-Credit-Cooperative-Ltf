import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getSession, isAdminMember } from '@/lib/auth'
import { AdminShell } from '@/frontend/components/admin/admin-shell'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getSession()

  if (!session) redirect('/login')
  if (!(await isAdminMember(session.sub))) redirect('/')

  return <AdminShell>{children}</AdminShell>
}