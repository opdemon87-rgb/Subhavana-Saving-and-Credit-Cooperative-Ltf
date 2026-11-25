
'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FileText,
  Headset,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
} from 'lucide-react'

const navigation = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Loan applications', href: '/admin/loans', icon: Wallet },
  { label: 'Support inbox', href: '/admin/support', icon: Headset },
  { label: 'Content', href: '/admin/content', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-secondary text-foreground">
      {/* Sidebar */}
      <aside className="border-b border-sidebar-border bg-sidebar lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r">
        {/* Sidebar Branding */}
        <Link href="/admin" className="flex items-center gap-3 px-5 py-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
            S
          </span>

          <span>
            <span className="block font-bold">Subhavana</span>
            <span className="block text-xs text-muted-foreground">
              Admin workspace
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav
          aria-label="Admin navigation"
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1"
        >
          {navigation.map(({ label, href, icon: Icon }) => {
            const active =
              pathname === href ||
              (href !== '/admin' && pathname.startsWith(href))

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <header className="border-b border-border bg-background px-5 py-4 sm:px-8">
          <p className="text-sm font-medium text-muted-foreground">
            Cooperative administration
          </p>
        </header>

        <main className="mx-auto min-h-[calc(100vh-65px)] max-w-[1600px] p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
