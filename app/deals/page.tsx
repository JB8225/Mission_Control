'use client'

import { useState, useEffect } from 'react'
import dealsData from '@/data/deals.json'

export default function DealTracker() {
  const [checklist, setChecklist] = useState(dealsData.checklist)

  useEffect(() => {
    const saved = localStorage.getItem('mc-deal-checklist')
    if (saved) setChecklist(JSON.parse(saved))
  }, [])

  const toggleItem = (id: number) => {
    const updated = checklist.map(c => c.id === id ? { ...c, done: !c.done } : c)
    setChecklist(updated)
    localStorage.setItem('mc-deal-checklist', JSON.stringify(updated))
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">🏗️ Deal Tracker — GFS Fire Pros</h1>

      {/* Pipeline */}
      <div className="card mb-8">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Acquisition Pipeline</h2>
        <div className="flex items-center gap-1">
          {dealsData.pipeline.map((stage, i) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className={`flex-1 py-3 px-4 text-center text-sm font-medium rounded-lg transition-colors ${
                stage.active
                  ? 'bg-gold text-black'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {stage.label}
              </div>
              {i < dealsData.pipeline.length - 1 && (
                <span className="text-slate-600 mx-1">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Checklist */}
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Pre-Qual Checklist</h2>
          <div className="space-y-3">
            {checklist.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  item.done ? 'bg-green-500 border-green-500' : 'border-slate-500'
                }`}>
                  {item.done && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`flex-1 ${item.done ? 'text-slate-500 line-through' : 'text-white'}`}>{item.text}</span>
                {item.blocking && !item.done && (
                  <span className="badge bg-red-500/20 text-red-400">BLOCKING</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deal Stats */}
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Key Deal Stats</h2>
          <div className="space-y-4">
            {dealsData.stats.map(stat => (
              <div key={stat.label} className="flex justify-between items-center border-b border-card-border pb-3 last:border-0 last:pb-0">
                <span className="text-slate-400">{stat.label}</span>
                <span className="text-xl font-bold text-gold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="card">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Key Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dealsData.contacts.map(contact => (
            <div key={contact.name} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-slate-400">{contact.company}</p>
                <p className="text-sm text-gold">{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
