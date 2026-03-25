'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', icon: '🎯', label: 'Command Center' },
  { href: '/tasks', icon: '✅', label: 'Task Board' },
  { href: '/deals', icon: '🏗️', label: 'Deal Tracker' },
  { href: '/revenue', icon: '📈', label: 'Revenue Dashboard' },
  { href: '/credit', icon: '💳', label: 'Credit Cockpit' },
  { href: '/sprint', icon: '🗓️', label: '30/60/90 Sprint' },
  { href: '/journal', icon: '🧠', label: 'Memory Journal' },
  { href: '/docs', icon: '📄', label: 'Docs Library' },
  { href: '/team', icon: '👥', label: 'Team' },
  { href: '/memos', icon: '📊', label: 'R&D Memos' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-card-border flex flex-col z-50">
      <div className="p-5 border-b border-card-border">
        <h1 className="text-lg font-bold text-gold tracking-wide">MISSION CONTROL</h1>
        <p className="text-xs text-slate-500 mt-1">One Buck Capital</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-gold/10 text-gold border-r-2 border-gold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-card-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">JB</div>
          <div>
            <p className="text-sm font-medium">JB</p>
            <p className="text-xs text-slate-500">CEO, One Buck Capital</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
