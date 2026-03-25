'use client'

import { useState, useEffect } from 'react'
import sprintData from '@/data/sprint.json'

export default function SprintBoard() {
  const [columns, setColumns] = useState(sprintData.columns)

  useEffect(() => {
    const saved = localStorage.getItem('mc-sprint')
    if (saved) setColumns(JSON.parse(saved))
  }, [])

  const toggleItem = (colIdx: number, itemId: number) => {
    const updated = columns.map((col, ci) => {
      if (ci !== colIdx) return col
      return {
        ...col,
        items: col.items.map(item =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      }
    })
    setColumns(updated)
    localStorage.setItem('mc-sprint', JSON.stringify(updated))
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">🗓️ 30/60/90 Sprint Board</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, colIdx) => {
          const doneCount = col.items.filter(i => i.done).length
          return (
            <div key={col.title}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                <h2 className="text-lg font-semibold">{col.title}</h2>
                <span className="text-xs text-slate-500">{doneCount}/{col.items.length}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(doneCount / col.items.length) * 100}%`, backgroundColor: col.color }}
                />
              </div>
              <div className="space-y-2">
                {col.items.map(item => (
                  <div
                    key={item.id}
                    className="card flex items-center gap-3 cursor-pointer hover:border-gold/30 transition-colors py-3"
                    onClick={() => toggleItem(colIdx, item.id)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      item.done ? 'border-green-500 bg-green-500' : 'border-slate-500'
                    }`}>
                      {item.done && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-sm ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
