'use client'

import { useState } from 'react'
import journalData from '@/data/journal.json'

export default function MemoryJournal() {
  const [selectedDate, setSelectedDate] = useState(journalData.entries[0]?.date || '')
  const [activeTab, setActiveTab] = useState<'journal' | 'memory'>('journal')

  const selectedEntry = journalData.entries.find(e => e.date === selectedDate)

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">🧠 Memory Journal</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'journal' ? 'bg-gold text-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          Daily Journal
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'memory' ? 'bg-gold text-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          Long-Term Memory
        </button>
      </div>

      {activeTab === 'journal' ? (
        <div className="flex gap-6">
          {/* Date List */}
          <div className="w-64 flex-shrink-0">
            <div className="card">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Entries</h3>
              <div className="space-y-1">
                {journalData.entries.map(entry => (
                  <button
                    key={entry.date}
                    onClick={() => setSelectedDate(entry.date)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedDate === entry.date
                        ? 'bg-gold/10 text-gold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <p className="font-medium">{new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{entry.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Journal Entry */}
          <div className="flex-1">
            {selectedEntry ? (
              <div className="card" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #334155 31px, #334155 32px)', backgroundPositionY: '8px' }}>
                <div className="mb-4 pb-4 border-b border-card-border">
                  <h2 className="text-xl font-semibold text-gold">{selectedEntry.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(selectedEntry.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <p className="text-slate-300 leading-8 whitespace-pre-wrap">{selectedEntry.content}</p>
              </div>
            ) : (
              <div className="card text-center py-20 text-slate-500">
                Select a date to view the journal entry
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Long-Term Memory */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journalData.longTermMemory.map(section => (
            <div key={section.category} className="card">
              <h3 className="text-gold font-semibold mb-3">{section.category}</h3>
              <ul className="space-y-2">
                {section.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-gold mt-0.5">•</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
