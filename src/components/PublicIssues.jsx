import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_ISSUES } from '../data/mockIssues';
import IssueCard from './IssueCard';
import { MapPin, Navigation, Filter, Layers } from 'lucide-react';

export default function PublicIssues() {
  return (
    <section id="explore" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3 block">
            LIVE CITY FEED
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What's happening around your city?
          </h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
          Explore real-time reports submitted by residents in your area. Every report is routed directly to local municipal maintenance teams.
        </p>
      </div>

      {/* Visually Polished Interactive Map Graphic Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0e] shadow-2xl mb-16 group"
      >
        {/* Dark Map Vector Overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Map Top Bar UI */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-xs font-medium text-white pointer-events-auto">
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span>Metro Central District Map</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-xs font-mono text-neutral-300">
              3 ACTIVE REPORTS NEARBY
            </div>
          </div>
        </div>

        {/* Interactive Map Pins Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          {MOCK_ISSUES.map((issue) => (
            <motion.div
              key={issue.id}
              whileHover={{ scale: 1.15 }}
              className="absolute z-10 cursor-pointer group/pin"
              style={{ left: `${issue.coordinates.x}%`, top: `${issue.coordinates.y}%` }}
            >
              {/* Pulse Ring */}
              <div className="absolute -inset-3 rounded-full bg-sky-400/20 animate-ping pointer-events-none" />

              {/* Pin Badge */}
              <div className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl">
                <MapPin className="w-4 h-4 text-sky-400" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white whitespace-nowrap">{issue.title}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">{issue.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Ambient Glow Footer */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0e] to-transparent pointer-events-none" />
      </motion.div>

      {/* 3 Featured Example Issue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_ISSUES.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}
