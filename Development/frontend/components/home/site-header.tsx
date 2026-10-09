'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogIn, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navMenus } from '@/lib/subhavana-nav'
import { Logo } from './logo'

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenu(null)
    const onPointer = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [openMenu])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navMenus.map((menu) => {
              const isOpen = openMenu === menu.label
              const panelId = `menu-${menu.label.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <li
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                    className={cn(
                      'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground',
                      isOpen ? 'bg-secondary text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {menu.label}
                    <ChevronDown
                      className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                  <div id={panelId} hidden={!isOpen} className="absolute left-0 top-full w-80 pt-2">
                    <ul className="rounded-2xl border bg-background p-2 shadow-xl">
                      {menu.items.map(({ label, desc, href, icon: Icon }) => (
                        <li key={label}>
                          <a
                            href={href}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                              <Icon className="size-4" aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-foreground">{label}</span>
                              <span className="block text-xs text-muted-foreground">{desc}</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
            <li>
  <a
    href="#downloads"
    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
  >
    Downloads
  </a>
</li>
<li>
  <a
    href="/branches"
    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
  >
    Branches
  </a>
</li>
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Member Login
          </a>
          <a
            href="#join"
            className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition-colors hover:bg-amber-400"
          >
            Become a Member
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {navMenus.map((menu) => (
              <li key={menu.label}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary [&::-webkit-details-marker]:hidden">
                    {menu.label}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mb-2 ml-3 border-l pl-3">
                    {menu.items.map(({ label, href, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                        >
                          <Icon className="size-4 text-primary" aria-hidden="true" />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
            <li>
  <a
    href="#downloads"
    onClick={() => setMobileOpen(false)}
    className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary"
  >
    Downloads
  </a>
</li>
<li>
  <a
    href="/branches"
    onClick={() => setMobileOpen(false)}
    className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary"
  >
    Branches
  </a>
</li>
          </ul>
          <div className="mx-auto flex max-w-7xl gap-2 px-4 pb-4">
            <a
              href="/login"
              className="flex-1 rounded-lg border-2 border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary"
            >
              Member Login
            </a>
            // Desktop buttons
<a
  href="/login"
  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
>
  <LogIn className="size-4" aria-hidden="true" />
  Member Login
</a>
<a
  href="/register"
  className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition-colors hover:bg-amber-400"
>
  Become a Member
</a>
          </div>
        </nav>
      )}
    </header>
  )
}
