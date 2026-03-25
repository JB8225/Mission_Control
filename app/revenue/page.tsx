'use client'

const businesses = [
  {
    name: 'GFS Fire Pros',
    revenue: '$19.1M',
    metric: 'EBITDA: $2.94M',
    status: 'Pre-acquisition',
    statusColor: 'text-yellow-400',
    target: '5-yr target: $50M',
    color: '#C9A84C',
  },
  {
    name: 'Resolved Family',
    revenue: '$0 MRR',
    metric: 'Target: $5K/mo',
    status: 'Pre-launch',
    statusColor: 'text-orange-400',
    target: 'Funnel: Built, webhook fix needed',
    color: '#8B5CF6',
  },
  {
    name: 'The Scam Hotline',
    revenue: 'Revenue TBD',
    metric: 'Book written',
    status: 'Monetization TBD',
    statusColor: 'text-slate-400',
    target: 'Sally live',
    color: '#3B82F6',
  },
]

const realEstate = {
  name: 'POCO Investments & Real Estate',
  icon: '🏠',
  status: 'Active',
  description: 'Room rental portfolio + commercial real estate + passive investments',
  monthlyRevenue: 2400,
  target: 5000,
  color: '#10B981',
  properties: [
    { name: 'Poco Court', type: 'Room Rental (8 rooms)', monthlyProfit: 1400, status: 'Active' },
    { name: 'Buffalo Bend', type: 'Room Rental (7 rooms)', monthlyProfit: 1000, status: 'Active' },
    { name: 'WeLoveLucy / Starbucks', type: 'NNN Commercial (11% ownership)', monthlyProfit: 928, status: 'Lease renewal in progress' },
    { name: 'Sober Living Profit Share', type: 'Passive investment', monthlyProfit: 400, status: 'Active' },
    { name: 'Town Bluff', type: 'Managed property (exit pending)', monthlyProfit: 0, status: 'Exiting — $70K bad debt write-off' },
  ],
  totalMonthlyIncome: 3728,
}

const chartData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Apr', value: 500 },
  { month: 'May', value: 1200 },
  { month: 'Jun', value: 2500 },
  { month: 'Jul', value: 5000 },
  { month: 'Aug', value: 8000 },
  { month: 'Sep', value: 12000 },
  { month: 'Oct', value: 18000 },
  { month: 'Nov', value: 25000 },
  { month: 'Dec', value: 35000 },
]

export default function RevenueDashboard() {
  const maxValue = Math.max(...chartData.map(d => d.value))
  const width = 800
  const height = 300
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = chartData.map((d, i) => {
    const x = padding + (i / (chartData.length - 1)) * chartWidth
    const y = padding + chartHeight - (d.value / (maxValue || 1)) * chartHeight
    return `${x},${y}`
  }).join(' ')

  const reUtilPct = Math.round((realEstate.monthlyRevenue / realEstate.target) * 100)

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">📈 Revenue Dashboard</h1>

      {/* Global Cash Flow Headline */}
      <div className="card mb-8 border-l-4 border-l-gold">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Monthly Cash Flow</p>
            <p className="text-3xl font-bold text-white">$3,700 <span className="text-lg text-slate-500 font-normal">/ $25,000</span></p>
            <p className="text-xs text-slate-500 mt-1">24-month goal — before kids finish college</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-red-400">15%</p>
            <p className="text-xs text-slate-500">of target</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-gold" style={{ width: '15%' }}></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-500">$0</span>
            <span className="text-xs text-slate-500">$25K/mo</span>
          </div>
        </div>
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {businesses.map(biz => (
          <div key={biz.name} className="card" style={{ borderTop: `3px solid ${biz.color}` }}>
            <h3 className="font-semibold text-lg mb-3">{biz.name}</h3>
            <p className="text-2xl font-bold text-gold mb-1">{biz.revenue}</p>
            <p className="text-sm text-slate-400 mb-3">{biz.metric}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500">Status:</span>
              <span className={`text-sm font-medium ${biz.statusColor}`}>{biz.status}</span>
            </div>
            <p className="text-xs text-slate-500">{biz.target}</p>
          </div>
        ))}
      </div>

      {/* POCO Real Estate Card */}
      <div className="card mb-8" style={{ borderTop: `3px solid ${realEstate.color}` }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>{realEstate.icon}</span>
              {realEstate.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{realEstate.description}</p>
          </div>
          <span className="badge bg-green-500/20 text-green-400">● {realEstate.status}</span>
        </div>

        {/* Progress toward $5K target */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Monthly Revenue</span>
            <span className="text-white font-semibold">${realEstate.monthlyRevenue.toLocaleString()} / ${realEstate.target.toLocaleString()}</span>
          </div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${reUtilPct}%`, backgroundColor: realEstate.color }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-1">{reUtilPct}% of $5K/mo target</p>
        </div>

        {/* Property Breakdown */}
        <div className="border-t border-slate-700 pt-3">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Property Breakdown</p>
          <div className="space-y-2">
            {realEstate.properties.map(prop => (
              <div key={prop.name} className="flex items-center justify-between py-1.5 border-b border-slate-700/50 last:border-0">
                <div>
                  <p className="text-sm text-white">{prop.name}</p>
                  <p className="text-xs text-slate-500">{prop.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: prop.monthlyProfit > 0 ? '#10B981' : '#EF4444' }}>
                    ${prop.monthlyProfit.toLocaleString()}/mo
                  </p>
                  <p className={`text-xs ${prop.status === 'Active' ? 'text-slate-500' : 'text-yellow-400'}`}>{prop.status}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-2 border-t border-slate-600">
            <span className="text-sm font-semibold text-slate-300">Total Monthly Income</span>
            <span className="text-sm font-bold text-emerald-400">${realEstate.totalMonthlyIncome.toLocaleString()}/mo</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Revenue Over Time (Projected)</h2>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(pct => {
            const y = padding + chartHeight - pct * chartHeight
            return (
              <g key={pct}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#334155" strokeWidth="1" />
                <text x={padding - 5} y={y + 4} textAnchor="end" fill="#64748B" fontSize="10">
                  ${Math.round(maxValue * pct / 1000)}K
                </text>
              </g>
            )
          })}
          {/* X labels */}
          {chartData.map((d, i) => {
            const x = padding + (i / (chartData.length - 1)) * chartWidth
            return (
              <text key={d.month} x={x} y={height - 10} textAnchor="middle" fill="#64748B" fontSize="10">
                {d.month}
              </text>
            )
          })}
          {/* Line */}
          <polyline fill="none" stroke="#C9A84C" strokeWidth="2.5" points={points} />
          {/* Area */}
          <polygon
            fill="url(#goldGradient)"
            points={`${padding},${padding + chartHeight} ${points} ${width - padding},${padding + chartHeight}`}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Dots */}
          {chartData.map((d, i) => {
            const x = padding + (i / (chartData.length - 1)) * chartWidth
            const y = padding + chartHeight - (d.value / (maxValue || 1)) * chartHeight
            return <circle key={i} cx={x} cy={y} r="3" fill="#C9A84C" />
          })}
        </svg>
      </div>
    </div>
  )
}
