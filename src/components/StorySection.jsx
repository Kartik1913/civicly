import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { STORY_STAGES } from '../data/mockIssues';
import { Eye, Camera, Clock, CheckCircle2 } from 'lucide-react';

export default function StorySection() {
  const [activeStage, setActiveStage] = useState(0);

  const stageIcons = [Eye, Camera, Clock, CheckCircle2];

  return (
    <section id="story" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3 block">
          THE CIVICLY JOURNEY
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          How simple action drives real change.
        </h2>
      </div>

      {/* Story Stages Grid / Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Stage Selector List */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {STORY_STAGES.map((stage, idx) => {
            const Icon = stageIcons[idx];
            const isActive = activeStage === idx;

            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveStage(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? 'bg-white/[0.06] border-white/20 shadow-2xl backdrop-blur-xl'
                    : 'bg-transparent border-transparent hover:bg-white/[0.02] opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-neutral-400">
                    STAGE {stage.number}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: isActive ? stage.accentColor + '20' : 'rgba(255,255,255,0.05)',
                      color: isActive ? stage.accentColor : '#888'
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {stage.title} — <span className="font-normal text-neutral-300">{stage.headline}</span>
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Stage Visual Showcase Area */}
        <div className="lg:col-span-7">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="apple-glass-card rounded-3xl p-8 min-h-[440px] flex flex-col justify-between relative overflow-hidden border border-white/10"
          >
            {/* Ambient Stage Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
              style={{ backgroundColor: STORY_STAGES[activeStage].accentColor + '25' }}
            />

            {/* Top Stage Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: STORY_STAGES[activeStage].accentColor }} />
                <span className="text-xs font-mono text-neutral-300 font-semibold tracking-wider">
                  STAGE 0{activeStage + 1} — {STORY_STAGES[activeStage].title}
                </span>
              </div>
              <span className="text-xs text-sky-400 font-mono font-semibold">CIVIC DISPATCH PREVIEW</span>
            </div>

            {/* Stage Visual Content */}
            <div className="flex-1 flex flex-col items-center justify-center my-6 text-center">
              {activeStage === 0 && (
                <div className="w-full max-w-md p-6 rounded-2xl bg-black/70 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mx-auto mb-4 text-sky-400">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Pothole Hazard Identified</h4>
                  <p className="text-xs text-neutral-400 mb-4">4th Ave & Main Street • High Severity</p>
                  <div className="w-full h-32 rounded-xl overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600" 
                      alt="Pothole" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-mono text-sky-300">📍 Geo-tagged 37.7749 N, -122.4194 W</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStage === 1 && (
                <div className="w-full max-w-md p-6 rounded-2xl bg-black/70 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Instant Photo Capture & Submit</h4>
                  <p className="text-xs text-neutral-400 mb-4">Zero registration needed • Direct municipal routing</p>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2">
                    <div className="flex justify-between text-neutral-300 font-mono">
                      <span>Category:</span>
                      <span className="text-amber-400 font-semibold">Public Works</span>
                    </div>
                    <div className="flex justify-between text-neutral-300 font-mono">
                      <span>Routing:</span>
                      <span className="text-neutral-200">Department of Transportation</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStage === 2 && (
                <div className="w-full max-w-md p-6 rounded-2xl bg-black/70 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto mb-4 text-purple-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Live Progress Tracker</h4>
                  <div className="w-full space-y-3 text-left">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-emerald-300 font-medium">Verified by Dispatch</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                      <span className="text-purple-300 font-medium">Asphalt Crew Assigned & Dispatched</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStage === 3 && (
                <div className="w-full max-w-md p-6 rounded-2xl bg-black/70 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Issue Resolved & Published</h4>
                  <p className="text-xs text-neutral-400 mb-4">Neighborhood impact score +25 pts</p>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                    ✓ Repair completed and inspected by City Engineers
                  </div>
                </div>
              )}
            </div>

            {/* Stage Progress Bar Footer */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-white/10">
              <span>Stage 0{activeStage + 1} of 04</span>
              <div className="flex gap-2">
                {STORY_STAGES.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      i === activeStage ? 'w-8 bg-white' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
