'use client'

import { useState } from 'react'
import docsData from '@/data/docs.json'

const typeColors: Record<string, string> = {
  Playbook: 'bg-blue-500/20 text-blue-400',
  Strategy: 'bg-purple-500/20 text-purple-400',
  Reference: 'bg-green-500/20 text-green-400',
  Technical: 'bg-orange-500/20 text-orange-400',
}

const categoryColors: Record<string, string> = {
  GFS: 'bg-gold/20 text-gold',
  Finance: 'bg-yellow-500/20 text-yellow-400',
  Resolved: 'bg-purple-500/20 text-purple-400',
}

export default function DocsLibrary() {
  const [search, setSearch] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<typeof docsData.documents[0] | null>(null)

  const filtered = docsData.documents.filter(doc =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.category.toLowerCase().includes(search.toLowerCase()) ||
    doc.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">📄 Docs Library</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, category, or type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md bg-slate-800 border border-card-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold"
        />
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div
            key={doc.id}
            className="card cursor-pointer hover:border-gold/30 transition-colors"
            onClick={() => setSelectedDoc(doc)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`badge ${categoryColors[doc.category] || 'bg-slate-600 text-slate-300'}`}>{doc.category}</span>
              <span className={`badge ${typeColors[doc.type] || 'bg-slate-600 text-slate-300'}`}>{doc.type}</span>
            </div>
            <h3 className="font-medium text-sm mb-2">{doc.title}</h3>
            <p className="text-xs text-slate-500">{doc.date}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8" onClick={() => setSelectedDoc(null)}>
          <div className="bg-sidebar border border-card-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className={`badge ${categoryColors[selectedDoc.category] || 'bg-slate-600 text-slate-300'}`}>{selectedDoc.category}</span>
                  <span className={`badge ${typeColors[selectedDoc.type] || 'bg-slate-600 text-slate-300'}`}>{selectedDoc.type}</span>
                </div>
                <h2 className="text-xl font-bold">{selectedDoc.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedDoc.date}</p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="border-t border-card-border pt-4">
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedDoc.content}</p>
              {(selectedDoc as any).url && (
                <a
                  href={(selectedDoc as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gold/20 text-gold border border-gold/30 rounded-lg text-sm font-medium hover:bg-gold/30 transition-colors"
                >
                  📄 Open in Google Drive
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
