'use client'

import docsData from '@/data/documents.json'

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/30 hover:border-blue-400/50',
  yellow: 'border-yellow-500/30 hover:border-yellow-400/50',
  green: 'border-green-500/30 hover:border-green-400/50',
  purple: 'border-purple-500/30 hover:border-purple-400/50',
  slate: 'border-slate-500/30 hover:border-slate-400/50',
}

const headerColorMap: Record<string, string> = {
  blue: 'text-blue-400',
  yellow: 'text-yellow-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  slate: 'text-slate-300',
}

export default function DocumentsPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">📁 Documents</h1>
        <p className="text-slate-400 mt-1">Every key document — one tap to open</p>
      </div>

      <div className="space-y-10">
        {docsData.categories.map(cat => (
          <div key={cat.id}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${headerColorMap[cat.color]}`}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full font-normal">{cat.docs.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.docs.map(doc => (
                <a
                  key={doc.title}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card border ${colorMap[cat.color]} transition-all group`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white group-hover:text-gold transition-colors text-sm">{doc.title}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{doc.desc}</p>
                    </div>
                    <span className="text-slate-600 group-hover:text-gold transition-colors flex-shrink-0 mt-0.5">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
