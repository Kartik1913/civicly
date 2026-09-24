import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ThumbsUp, Clock, ChevronRight } from 'lucide-react';

export default function IssueCard({ issue, onToggleUpvote }) {
  const navigate = useNavigate();

  const handleUpvoteClick = (e) => {
    e.stopPropagation();
    if (onToggleUpvote) {
      onToggleUpvote(issue.id);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          border: 'border-amber-500/20'
        };
      case 'Acknowledged':
        return {
          bg: 'bg-sky-500/10',
          text: 'text-sky-400',
          border: 'border-sky-500/20'
        };
      case 'Resolved':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/20'
        };
      case 'Submitted':
      default:
        return {
          bg: 'bg-neutral-500/10',
          text: 'text-neutral-300',
          border: 'border-neutral-500/20'
        };
    }
  };

  const statusInfo = getStatusBadge(issue.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/issue/${issue.id}`)}
      className="apple-glass-card rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 cursor-pointer"
    >
      {/* Photo Container */}
      <div className="relative w-full h-52 overflow-hidden bg-neutral-900">
        <img
          src={issue.image || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800'}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-transparent to-transparent opacity-90" />

        {/* Status Pill */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
          ● {issue.status}
        </span>

        {/* Upvote Button (+1 Still a problem) */}
        <button
          onClick={handleUpvoteClick}
          className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 backdrop-blur-md border ${
            issue.upvotedByMe
              ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
              : 'bg-black/70 text-white/90 border-white/10 hover:bg-black/90'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${issue.upvotedByMe ? 'fill-white' : ''}`} />
          <span>{issue.upvotes}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            <span>{issue.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Clock className="w-3 h-3" /> {issue.reportedDate}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
            {issue.title}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-6">
            {issue.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1 truncate max-w-[75%]">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{issue.location}</span>
          </span>
          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
