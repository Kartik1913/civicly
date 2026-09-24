import React from 'react';
import { motion } from 'framer-motion';
import IssueCard from '../components/IssueCard';
import StatCard from '../components/StatCard';
import { Sparkles, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function MyReports({ issues, onToggleUpvote }) {
  const totalCount = issues.length;
  const activeCount = issues.filter(i => i.status !== 'Resolved').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-sky-400 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PERSONAL CIVIC LOG</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          Your reports
        </h1>
        <p className="text-base text-neutral-400 max-w-xl">
          Track the lifecycle and current municipal progress of every civic hazard you have submitted.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <StatCard
          label="Total Reports Submitted"
          value={totalCount}
          subtext="Logged in system"
          icon={AlertCircle}
          color="sky"
        />
        <StatCard
          label="Active In Dispatch"
          value={activeCount}
          subtext="Under municipal review or repair"
          icon={Clock}
          color="amber"
        />
        <StatCard
          label="Resolved & Verified"
          value={resolvedCount}
          subtext="Work complete"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Reports Grid */}
      <h2 className="text-xl font-bold text-white mb-6">Submitted Incident Cards</h2>
      
      {issues.length === 0 ? (
        <div className="apple-glass-card rounded-3xl p-12 text-center text-neutral-400">
          <p>No reports submitted yet. Click "Report an issue" to log your first report.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} onToggleUpvote={onToggleUpvote} />
          ))}
        </div>
      )}
    </div>
  );
}
