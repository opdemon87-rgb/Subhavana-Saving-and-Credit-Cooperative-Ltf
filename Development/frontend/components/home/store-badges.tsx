import { cn } from '@/lib/utils'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.73c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.81 1.4-.02 2.29-1.27 3.14-2.53.99-1.45 1.4-2.86 1.42-2.93-.03-.01-2.72-1.04-2.73-4.12zM13.79 5.1c.72-.87 1.2-2.07 1.07-3.27-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.46z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#34d399" />
      <path d="m16.7 8.7-3.3 3.3-9.8-10.2c.1 0 .2-.1.3-.1.3 0 .6.1.9.2l11.9 6.8z" fill="#fbbf24" />
      <path d="M16.7 15.3 4.7 22.1c-.3.2-.6.2-.9.2-.1 0-.2 0-.3-.1L13.4 12l3.3 3.3z" fill="#f87171" />
      <path d="m20.4 13.2-3.7 2.1-3.3-3.3 3.3-3.3 3.7 2.1c.8.5.8 1.9 0 2.4z" fill="#60a5fa" />
    </svg>
  )
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <a
        href="#"
        className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2.5 text-white transition-colors hover:bg-slate-800"
      >
        <AppleIcon />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px]">Download on the</span>
          <span className="text-sm font-semibold">App Store</span>
        </span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2.5 text-white transition-colors hover:bg-slate-800"
      >
        <PlayIcon />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px]">Get it on</span>
          <span className="text-sm font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  )
}
