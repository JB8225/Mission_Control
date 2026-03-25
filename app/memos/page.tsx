'use client'

import { useState } from 'react'
import memosData from '@/data/memos.json'

const confidenceColors: Record<string, string> = {
  High: 'bg-green-500/20 text-green-400',
  Medium: 'bg-yellow-500/20 text-yellow-400',
  Low: 'bg-red-500/20 text-red-400',
}

export default function RDMemos() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">📊 R&D Memos</h1>
      <p className="text-slate-400 mb-6">Nightly intelligence reports from the R&D team.</p>

      <div className="space-y-4">
        {memosData.memos.map(memo => (
          <div key={memo.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-lg">{memo.topic}</h3>
                  <span className={`badge ${confidenceColors[memo.confidence]}`}>
                    {memo.confidence} Confidence
                  </span>
                </div>
                <p className="text-sm text-slate-500">{memo.date} — {memo.author}</p>
              </div>
            </div>

            {/* Top Recommendation */}
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-3">
              <p className="text-xs text-gold uppercase tracking-wider mb-1">Top Recommendation</p>
              <p className="text-sm text-slate-200">{memo.recommendation}</p>
            </div>

            {/* Expand / Collapse */}
            <button
              onClick={() => setExpandedId(expandedId === memo.id ? null : memo.id)}
              className="text-sm text-gold hover:text-gold/80 transition-colors"
            >
              {expandedId === memo.id ? '▾ Hide full memo' : '▸ Read full memo'}
            </button>

            {expandedId === memo.id && (
              <div className="mt-4 pt-4 border-t border-card-border">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{memo.fullContent}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
