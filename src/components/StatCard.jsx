import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, subtext, icon: Icon, color = 'sky' }) {
  const colorStyles = {
    sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  };

  const selectedColor = colorStyles[color] || colorStyles.sky;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="apple-glass-card rounded-2xl p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${selectedColor}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
          {value}
        </div>
        {subtext && (
          <div className="text-xs text-neutral-400 font-normal">
            {subtext}
          </div>
        )}
      </div>
    </motion.div>
  );
}
