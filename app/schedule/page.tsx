'use client'

import { useState, useEffect } from 'react'
import scheduleData from '@/data/schedule.json'

const categoryColors: Record<string, string> = {
  GFS: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Resolved: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Finance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Real Estate': 'bg-green-500/20 text-green-400 border-green-500/30',
  Personal: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  Admin: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
}

const priorityDot: Record<string, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-400',
  green: 'bg-green-500',
}

type Task = {
  id: string
  text: string
  detail: string
  category: string
  priority: string
  done: boolean
}

type Day = {
  id: string
  label: string
  date: string
  tasks: Task[]
}

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri']

function getTodayId() {
  const day = new Date().getDay()
  const map: Record<number, string> = { 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri' }
  return map[day] || 'mon'
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(getTodayId())
  const [showAll, setShowAll] = useState(false)
  const [done, setDone] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem('mc-schedule-done')
    if (saved) setDone(JSON.parse(saved))
  }, [])

  const toggle = (id: string) => {
    const updated = { ...done, [id]: !done[id] }
    setDone(updated)
    localStorage.setItem('mc-schedule-done', JSON.stringify(updated))
  }

  const days: Day[] = scheduleData.days
  const activeData = days.find(d => d.id === activeDay)

  const totalTasks = days.flatMap(d => d.tasks).length
  const completedTasks = days.flatMap(d => d.tasks).filter(t => done[t.id]).length
  const pct = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">🗓️ Weekly Schedule</h1>
        <p className="text-slate-400 mt-1">Week of {scheduleData.weekOf}</p>
      </div>

      {/* Deadline Alert */}
      {scheduleData.deadlines.map(d => d.urgent && (
        <div key={d.text} className="card border border-red-500/40 bg-red-500/10 mb-6 flex items-center gap-3">
          <span className="text-red-400 text-xl">⚠️</span>
          <div>
            <p className="text-red-300 font-semibold text-sm">{d.text}</p>
            <p className="text-red-400/70 text-xs">{d.date}</p>
          </div>
        </div>
      ))}

      {/* Progress */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-slate-400">Week Progress</p>
          <p className="text-sm font-semibold text-white">{completedTasks} / {totalTasks} tasks</p>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-yellow-300 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">{pct}% complete</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShowAll(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!showAll ? 'bg-gold text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          By Day
        </button>
        <button
          onClick={() => setShowAll(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showAll ? 'bg-gold text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          All Tasks
        </button>
      </div>

      {/* All Tasks View */}
      {showAll && (
        <div className="space-y-8 mb-8">
          {days.map(day => (
            <div key={day.id}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>{day.label}</span>
                <span className="text-slate-600">—</span>
                <span className="text-slate-500 font-normal normal-case tracking-normal">{day.date}</span>
                {day.id === getTodayId() && <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">today</span>}
              </h3>
              <div className="space-y-2">
                {day.tasks.map(task => (
                  <div key={task.id} onClick={() => toggle(task.id)} className={`card cursor-pointer transition-all hover:border-gold/30 py-3 ${done[task.id] ? 'opacity-40' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${done[task.id] ? 'bg-gold border-gold' : 'border-slate-500'}`}>
                        {done[task.id] && <span className="text-black text-xs font-bold">✓</span>}
                      </div>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[task.priority]}`} />
                      <p className={`text-sm flex-1 ${done[task.id] ? 'line-through text-slate-500' : 'text-white'}`}>{task.text}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${categoryColors[task.category] || categoryColors.Admin}`}>{task.category}</span>
                    </div>
                    {!done[task.id] && <p className="text-xs text-slate-500 mt-1 ml-9">{task.detail}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Day Tabs */}
      {!showAll && <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {days.map(day => {
          const dayDone = day.tasks.filter(t => done[t.id]).length
          const isToday = day.id === getTodayId()
          return (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeDay === day.id
                  ? 'bg-gold text-black'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span className="block">{day.label}</span>
              <span className="block text-xs mt-0.5 opacity-70">{day.date}</span>
              {dayDone > 0 && (
                <span className={`block text-xs mt-0.5 ${activeDay === day.id ? 'text-black/70' : 'text-green-400'}`}>
                  {dayDone}/{day.tasks.length} done
                </span>
              )}
              {isToday && activeDay !== day.id && (
                <span className="block text-xs mt-0.5 text-gold">today</span>
              )}
            </button>
          )
        })}
      </div>

      </div>}

      {/* Tasks for Active Day */}
      {!showAll && activeData && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">
            {activeData.label} — {activeData.date}
          </h2>
          <div className="space-y-3">
            {activeData.tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggle(task.id)}
                className={`card cursor-pointer transition-all hover:border-gold/30 ${done[task.id] ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    done[task.id] ? 'bg-gold border-gold' : 'border-slate-500'
                  }`}>
                    {done[task.id] && <span className="text-black text-xs font-bold">✓</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[task.priority]}`} />
                      <p className={`font-medium text-sm ${done[task.id] ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.text}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 ml-4">{task.detail}</p>
                  </div>

                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${categoryColors[task.category] || categoryColors.Admin}`}>
                    {task.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!showAll && !activeData && null}
    </div>
  )
}
