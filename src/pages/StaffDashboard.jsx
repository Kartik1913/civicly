import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { CATEGORIES, WARDS, STATUSES, PRIORITIES } from '../data/issues';
import { Shield, ArrowRight, Filter, AlertCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StaffDashboard({ issues }) {
  const navigate = useNavigate();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedWard, setSelectedWard] = useState('All Wards');

  const filteredIssues = issues.filter(issue => {
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (selectedStatus !== 'All Statuses' && issue.status !== selectedStatus) return false;
    if (selectedPriority !== 'All Priorities' && issue.priority !== selectedPriority) return false;
    if (selectedWard !== 'All Wards' && issue.ward !== selectedWard) return false;
    return true;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>STAFF OPERATIONS PORTAL</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          Civic Operations
        </h1>
        <p className="text-base text-neutral-400 max-w-xl">
          Municipal dispatch queue. Manage incident tickets, update progress timelines, and assign field repair crews.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Issues" value="128" subtext="Municipal log" icon={AlertCircle} color="sky" />
        <StatCard label="Open Reports" value="42" subtext="Awaiting dispatch" icon={Clock} color="amber" />
        <StatCard label="In Progress" value="31" subtext="Crews on site" icon={AlertTriangle} color="purple" />
        <StatCard label="Resolved" value="55" subtext="Work completed" icon={CheckCircle2} color="emerald" />
      </div>

      {/* Filter Controls Bar */}
      <div className="apple-glass-card rounded-2xl p-6 mb-8 border border-white/10 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mr-2">
          <Filter className="w-3.5 h-3.5 text-sky-400" />
          <span>FILTERS:</span>
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none"
        >
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Priority */}
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none"
        >
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        {/* Ward */}
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none"
        >
          {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>

      {/* Issues Table */}
      <div className="apple-glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono font-semibold uppercase text-neutral-400 bg-white/[0.02]">
                <th className="py-4 px-6">Issue</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Ward</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-white mb-0.5">{issue.title}</div>
                    <div className="text-neutral-400 text-[11px] font-mono">ID: {issue.id} • {issue.location}</div>
                  </td>
                  <td className="py-4 px-6 text-neutral-300">{issue.category}</td>
                  <td className="py-4 px-6 text-neutral-400 font-mono text-[11px]">{issue.ward}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      issue.priority === 'Emergency' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      issue.priority === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      issue.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      issue.status === 'In Progress' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      ● {issue.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-neutral-400 font-mono text-[11px]">{issue.reportedDate}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => navigate(`/staff/issue/${issue.id}`)}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-[11px] transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
