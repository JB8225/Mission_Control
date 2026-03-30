'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import commandData from '@/data/command.json'

const quickLinks = [
  { href: '/schedule', icon: '🗓️', label: 'Daily Schedule' },
  { href: '/documents', icon: '📁', label: 'Documents' },
  { href: '/tasks', icon: '✅', label: 'Task Board' },
  { href: '/deals', icon: '🏗️', label: 'Deal Tracker' },
  { href: '/revenue', icon: '📈', label: 'Revenue' },
  { href: '/credit', icon: '💳', label: 'Credit' },
  { href: '/sprint', icon: '🗓️', label: 'Sprint' },
  { href: '/journal', icon: '🧠', label: 'Journal' },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function CommandCenter() {
  const [priorities, setPriorities] = useState(commandData.priorities)
  const [today, setToday] = useState('')

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    const saved = localStorage.getItem('mc-priorities')
    if (saved) setPriorities(JSON.parse(saved))
  }, [])

  const togglePriority = (id: number) => {
    const updated = priorities.map(p => p.id === id ? { ...p, done: !p.done } : p)
    setPriorities(updated)
    localStorage.setItem('mc-priorities', JSON.stringify(updated))
  }

  const statusColor = (s: string) => s === 'warning' ? 'text-yellow-400' : s === 'danger' ? 'text-red-400' : 'text-green-400'

  const cashFlow = commandData.scorecard.find(s => s.label === 'Monthly Cash Flow')
  const otherScorecard = commandData.scorecard.filter(s => s.label !== 'Monthly Cash Flow')

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{getGreeting()}, JB</h1>
        <p className="text-slate-400 mt-1">{today}</p>
      </div>

      {/* Cash Flow Headline */}
      {cashFlow && (
        <div className="card mb-8 border-l-4 border-l-gold">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{cashFlow.label}</p>
              <p className="text-3xl font-bold text-white">{cashFlow.current} <span className="text-lg text-slate-500 font-normal">/ {cashFlow.target}</span></p>
              {cashFlow.note && <p className="text-xs text-slate-500 mt-1">{cashFlow.note}</p>}
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-red-400">15%</p>
              <p className="text-xs text-slate-500">of target</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-gold" style={{ width: '15%' }}></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-500">$0</span>
              <span className="text-xs text-slate-500">$25K/mo</span>
            </div>
          </div>
        </div>
      )}

      {/* Mission Statement */}
      <div className="card mb-8 border-l-4 border-l-gold">
        <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Mission</p>
        <p className="text-lg text-slate-200">{commandData.mission}</p>
      </div>

      {/* Priority Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-gold"></span>
          Priority Actions
        </h2>
        <div className="space-y-3">
          {priorities.map(p => (
            <div key={p.id} className="card flex items-center gap-4 cursor-pointer hover:border-gold/30 transition-colors" onClick={() => togglePriority(p.id)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${p.done ? 'bg-gold border-gold' : 'border-red-500'}`}>
                {p.done && <span className="text-black text-xs">✓</span>}
              </div>
              <span className={`${p.done ? 'line-through text-slate-500' : 'text-white'}`}>{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scorecard */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Scorecard</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {otherScorecard.map(s => (
            <div key={s.label} className="card">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
              <p className={`text-xl font-bold ${statusColor(s.status)}`}>{s.current}</p>
              <p className="text-xs text-slate-500 mt-1">Target: {s.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map(link => (
            <Link key={link.href} href={link.href} className="card text-center hover:border-gold/30 transition-colors">
              <span className="text-2xl">{link.icon}</span>
              <p className="text-sm text-slate-300 mt-2">{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
