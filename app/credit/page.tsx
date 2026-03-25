'use client'

import { useState, useEffect } from 'react'
import creditData from '@/data/credit.json'

const barColors: Record<string, string> = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
}

export default function CreditCockpit() {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const update = () => {
      const deadline = new Date(creditData.deadline).getTime()
      const now = Date.now()
      const diff = deadline - now
      if (diff <= 0) {
        setCountdown('DEADLINE PASSED')
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setCountdown(`${days}d ${hours}h ${minutes}m`)
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  const ficoPercent = ((creditData.fico.current - 300) / (850 - 300)) * 100
  const ficoTargetPercent = ((creditData.fico.target - 300) / (850 - 300)) * 100

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">💳 Credit Cockpit</h1>

      {/* Credit Cards */}
      <div className="space-y-4 mb-8">
        {creditData.cards.map(card => (
          <div key={card.last4} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{card.name}</h3>
                <span className="text-sm text-slate-500">•••• {card.last4}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  ${card.balance.toLocaleString()} / ${card.limit.toLocaleString()}
                </span>
                <span className={`text-sm font-bold ${
                  card.color === 'red' ? 'text-red-400' : card.color === 'orange' ? 'text-orange-400' : 'text-green-400'
                }`}>
                  {card.utilization}%
                </span>
              </div>
            </div>
            {/* Utilization Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColors[card.color]}`}
                style={{ width: `${card.utilization}%` }}
              />
            </div>
            {card.alert && (
              <div className={`mt-3 text-sm font-medium ${card.color === 'red' ? 'text-red-400' : 'text-orange-400'}`}>
                {card.color === 'red' ? '❌' : '⚠️'} {card.alert}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Utilization */}
        <div className="card text-center">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Overall Utilization</p>
          <p className="text-4xl font-bold text-green-400">{creditData.overallUtilization}%</p>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${creditData.overallUtilization}%` }} />
          </div>
        </div>

        {/* FICO Gauge */}
        <div className="card text-center">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">FICO Score</p>
          <div className="relative">
            <svg viewBox="0 0 200 120" className="w-48 mx-auto">
              {/* Background arc */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
              {/* Score arc */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#C9A84C" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${ficoPercent * 2.51} 251`} />
              {/* Target marker */}
              <circle
                cx={100 + 80 * Math.cos(Math.PI - (ficoTargetPercent / 100) * Math.PI)}
                cy={100 - 80 * Math.sin(Math.PI - (ficoTargetPercent / 100) * Math.PI)}
                r="4" fill="#10B981"
              />
              <text x="100" y="85" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">{creditData.fico.current}</text>
              <text x="100" y="105" textAnchor="middle" fill="#64748B" fontSize="12">Target: {creditData.fico.target}</text>
            </svg>
          </div>
        </div>

        {/* Countdown */}
        <div className="card text-center">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">USAA Deadline</p>
          <p className="text-3xl font-bold text-orange-400">{countdown}</p>
          <p className="text-sm text-slate-500 mt-2">April 14, 2026</p>
        </div>
      </div>
    </div>
  )
}
