import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { CATEGORIES, STATUS_OPTIONS } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  ShieldCheck, 
  Award,
  Users
} from 'lucide-react';

export default function AnalyticsDashboard({ issues }) {
  const totalCount = issues.length;
  const resolvedCount = issues.filter(i => i.status === 'resolved').length;
  const inProgressCount = issues.filter(i => i.status === 'in_progress').length;
  const pendingCount = issues.filter(i => i.status === 'reported').length;

  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  // Category distribution data for Pie Chart
  const categoryData = CATEGORIES.map(cat => {
    const count = issues.filter(i => i.category === cat.id).length;
    return {
      name: cat.name,
      value: count,
      color: cat.color
    };
  }).filter(c => c.value > 0);

  // Time trend mock dataset
  const trendData = [
    { day: 'Mon', reported: 12, resolved: 8 },
    { day: 'Tue', reported: 19, resolved: 14 },
    { day: 'Wed', reported: 15, resolved: 16 },
    { day: 'Thu', reported: 22, resolved: 20 },
    { day: 'Fri', reported: 18, resolved: 21 },
    { day: 'Sat', reported: 10, resolved: 12 },
    { day: 'Sun', reported: 8, resolved: 11 },
  ];

  // Department workload data
  const deptData = [
    { dept: 'Transportation', open: 14, fixed: 32 },
    { dept: 'Utilities', open: 8, fixed: 24 },
    { dept: 'Sanitation', open: 5, fixed: 48 },
    { dept: 'Parks & Rec', open: 6, fixed: 19 },
    { dept: 'Traffic Eng.', open: 9, fixed: 15 }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
      {/* Dashboard Title Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={24} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)' }}>
            Civic Insights & Department Analytics
          </h1>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Real-time municipal infrastructure performance, response times, and neighborhood statistics
        </p>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Civic Health Index */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>City Health Score</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', margin: '4px 0' }}>
            88 / 100
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +4% efficiency this month
          </div>
        </div>

        {/* Total Issues */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Logged Reports</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', margin: '4px 0' }}>
            {totalCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {pendingCount} awaiting dispatch
          </div>
        </div>

        {/* Active Crews */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Crews Dispatched</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706', margin: '4px 0' }}>
            {inProgressCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>
            Active on site
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Resolution Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)', margin: '4px 0' }}>
            {resolutionRate}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Avg turn-around: 2.1 Days
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Category Pie Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
            Issues by Category Breakdown
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '1rem' }}>
            {categoryData.map((c, i) => (
              <span key={i} className="badge" style={{ background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color }} /> {c.name}: {c.value}
              </span>
            ))}
          </div>
        </div>

        {/* Resolution Area Trend */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
            7-Day Report vs Resolution Velocity
          </h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="reported" stroke="#06b6d4" fillOpacity={1} fill="url(#colorReported)" name="Reported" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Workload Bar Chart & Community Leaderboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
            Department Workload & Performance
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="dept" stroke="var(--color-text-muted)" fontSize={11} />
                <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="open" fill="#d97706" name="Open Cases" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fixed" fill="#10b981" name="Completed Cases" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Community Champions Leaderboard */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={18} color="var(--color-primary)" /> Community Super-Reporters
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { name: 'Anita Alvarez', score: 340, rank: 1, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', badge: 'Neighborhood Champion' },
              { name: 'Elena Rostova', score: 285, rank: 2, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', badge: 'Pothole Patrol' },
              { name: 'Jordan Lee', score: 240, rank: 3, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', badge: 'Water Safety Lead' },
              { name: 'David Kim', score: 195, rank: 4, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', badge: 'Park Guardian' },
            ].map(user => (
              <div key={user.rank} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-surface)', padding: '0.65rem 0.85rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: user.rank === 1 ? '#eab308' : 'var(--color-text-muted)', width: '20px' }}>
                  #{user.rank}
                </span>
                <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)' }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)' }}>{user.badge}</div>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {user.score} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
