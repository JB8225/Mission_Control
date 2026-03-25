'use client'

import tasksData from '@/data/tasks.json'

const priorityColors: Record<string, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  green: 'bg-green-500',
}

const projectColors: Record<string, string> = {
  GFS: 'bg-blue-500/20 text-blue-400',
  Resolved: 'bg-purple-500/20 text-purple-400',
  'Scam Hotline': 'bg-pink-500/20 text-pink-400',
  Finance: 'bg-yellow-500/20 text-yellow-400',
}

export default function TaskBoard() {
  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-bold mb-6">✅ Task Board</h1>

      <div className="flex gap-4">
        {/* Activity Feed */}
        <div className="w-72 flex-shrink-0">
          <div className="card h-fit">
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Live Activity Feed</h3>
            <div className="space-y-3">
              {tasksData.activityFeed.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-slate-500 flex-shrink-0 text-xs mt-0.5">{item.time}</span>
                  <span className="text-slate-300">{item.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {tasksData.columns.map(col => (
            <div key={col.id}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{col.title}</h3>
                <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">{col.tasks.length}</span>
              </div>
              <div className="space-y-3">
                {col.tasks.map(task => (
                  <div key={task.id} className="card hover:border-gold/30 transition-colors">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${priorityColors[task.priority]}`}></span>
                      <p className="text-sm font-medium">{task.title}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`badge ${projectColors[task.project] || 'bg-slate-600 text-slate-300'}`}>{task.project}</span>
                      <span className="text-xs text-slate-500">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
