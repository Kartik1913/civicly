import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

const STAGES = [
  { key: 'Submitted', label: 'SUBMITTED', icon: AlertCircle },
  { key: 'Acknowledged', label: 'ACKNOWLEDGED', icon: Clock },
  { key: 'In Progress', label: 'IN PROGRESS', icon: ShieldCheck },
  { key: 'Resolved', label: 'RESOLVED', icon: CheckCircle2 }
];

export default function StatusTimeline({ currentStatus }) {
  const getStageIndex = (status) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Acknowledged': return 1;
      case 'In Progress': return 2;
      case 'Resolved': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="w-full py-6 px-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between relative">
        {/* Connecting Progress Line */}
        <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-6 h-[2px] bg-gradient-to-r from-sky-400 via-purple-400 to-emerald-400 -translate-y-1/2 z-0 transition-all duration-700"
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 90}%` }}
        />

        {/* Stage Circles */}
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isPassed = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                  isCurrent
                    ? 'bg-sky-500 text-white border-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-110'
                    : isPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-neutral-900 text-neutral-600 border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className={`text-[10px] font-mono font-bold tracking-wider ${
                isCurrent ? 'text-sky-300' : isPassed ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
