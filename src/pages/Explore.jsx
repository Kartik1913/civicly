import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MapView from '../components/MapView';
import IssueCard from '../components/IssueCard';
import { CATEGORIES } from '../data/issues';
import { Sparkles, Map, Filter, Search } from 'lucide-react';

export default function Explore({ issues, onToggleUpvote }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIssues = issues.filter(issue => {
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.description.toLowerCase().includes(q) ||
        issue.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Page Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-sky-400 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME MUNICIPAL FEED</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          What's happening around you?
        </h1>
        <p className="text-base text-neutral-400 max-w-xl">
          Explore civic issues reported by neighbors in your area. Every report is verified and dispatched directly to local municipal teams.
        </p>
      </div>

      {/* Dark Premium Map Interface */}
      <div className="mb-14">
        <MapView issues={filteredIssues} height="480px" />
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-white/[0.04] text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search reports, streets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400"
          />
        </div>
      </div>

      {/* Issue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} onToggleUpvote={onToggleUpvote} />
        ))}
      </div>
    </div>
  );
}
