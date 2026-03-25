'use client'

import teamData from '@/data/team.json'

export default function TeamPage() {
  const executives = teamData.agents.filter((a: any) => a.tier === 'executive')
  const rndAgents = teamData.agents.filter((a: any) => a.tier === 'rnd')

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">👥 Team</h1>

      {/* Mission Banner */}
      <div className="card mb-8 border-l-4 border-l-gold text-center py-6">
        <p className="text-lg text-slate-200 italic">&ldquo;{teamData.mission}&rdquo;</p>
      </div>

      {/* Executive Team */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-slate-400 uppercase tracking-wider text-center">Executive Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {executives.map((agent: any) => (
            <div key={agent.id} className="card" style={{ borderTop: `3px solid ${agent.color}` }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: agent.color + '20' }}>
                  <span className="text-2xl">{agent.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: agent.color + '30', color: agent.color }}>
                      {agent.letter}
                    </span>
                    <h3 className="text-xl font-bold" style={{ color: agent.color }}>{agent.name}</h3>
                  </div>
                  <p className="text-sm text-slate-300">{agent.role}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{agent.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="badge bg-green-500/20 text-green-400">● {agent.status}</span>
                    <span className="badge bg-slate-700 text-slate-300">{agent.model}</span>
                  </div>
                  {agent.primaryFocus && (
                    <p className="text-xs mt-3 px-2 py-1 rounded bg-gold/10 text-gold/80">🎯 {agent.primaryFocus}</p>
                  )}
                  {agent.trigger && (
                    <p className="text-xs mt-2 text-slate-500 italic">⏰ {agent.trigger}</p>
                  )}
                </div>
              </div>

              {/* Bruce's Agreement Rules */}
              {agent.agreement && (
                <div className="mt-4 border-t border-slate-700 pt-3">
                  <p className="text-xs font-semibold text-emerald-400 uppercase mb-2">💰 Bruce&apos;s Rules</p>
                  <ul className="space-y-1.5">
                    {agent.agreement.map((rule: string, i: number) => (
                      <li key={i} className="text-xs text-slate-300 flex gap-2">
                        <span className="text-emerald-500 mt-0.5">▸</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* R&D Team */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-slate-400 uppercase tracking-wider text-center">R&D Team</h2>
        <p className="text-center text-sm text-slate-500 mb-4">Nightly analysis &amp; recommendations</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {rndAgents.map((agent: any) => (
            <div key={agent.id} className="card text-center" style={{ borderTop: `3px solid ${agent.color}` }}>
              <span className="text-3xl">{agent.emoji}</span>
              <h3 className="font-semibold mt-2">{agent.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{agent.role}</p>
              <p className="text-xs text-slate-500 mt-2 italic leading-relaxed">&ldquo;{agent.description}&rdquo;</p>
              <span className="badge bg-slate-700 text-slate-400 mt-2 text-xs">{agent.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      {teamData.comingSoon && teamData.comingSoon.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-slate-400 uppercase tracking-wider text-center">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {teamData.comingSoon.map((agent: any) => (
              <div key={agent.letter} className="card text-center border border-dashed border-slate-700 bg-slate-800/30">
                <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-slate-400">{agent.letter}</span>
                </div>
                <h3 className="font-semibold text-slate-400">{agent.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{agent.role}</p>
                <p className="text-xs text-slate-600 mt-1">{agent.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
