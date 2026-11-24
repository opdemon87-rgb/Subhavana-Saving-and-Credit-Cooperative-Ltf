import { redirect } from 'next/navigation'
import { getSession, isAdminMember } from '@/lib/auth'
import { AdminDashboard } from '@/frontend/components/admin/admin-dashboard'

export default async function AdminPage() {
  const session = await getSession()

  if (!session) redirect('/login')
  if (!(await isAdminMember(session.sub))) redirect('/')

  return <AdminDashboard />
}