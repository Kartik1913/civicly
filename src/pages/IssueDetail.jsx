import React from 'react';
import { useParams, useNavigate } from 'react';
import { motion } from 'framer-motion';
import StatusTimeline from '../components/StatusTimeline';
import { MapPin, Clock, ThumbsUp, ChevronLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function IssueDetail({ issues, onToggleUpvote }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issues.find(i => i.id === id) || issues[0];

  if (!issue) {
    return (
      <div className="pt-32 pb-24 px-6 text-center text-white">
        <h2>Issue not found.</h2>
        <button onClick={() => navigate('/explore')} className="mt-4 px-6 py-2 rounded-full bg-white text-black">
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white mb-8 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Glass Card */}
      <div className="apple-glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Banner Image */}
        <div className="relative w-full h-80 md:h-96 bg-neutral-900">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 backdrop-blur-md text-xs font-mono font-bold text-sky-300">
                {issue.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono text-neutral-300">
                ID: {issue.id}
              </span>
            </div>

            {/* Upvote Button */}
            <button
              onClick={() => onToggleUpvote(issue.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 backdrop-blur-md border cursor-pointer ${
                issue.upvotedByMe
                  ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                  : 'bg-black/80 text-white border-white/20 hover:bg-black'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${issue.upvotedByMe ? 'fill-white' : ''}`} />
              <span>+1 Still a problem ({issue.upvotes})</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              {issue.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 border-b border-white/10 pb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span className="text-white font-medium">{issue.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>Reported {issue.reportedDate}</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-neutral-300 font-mono">
                {issue.ward}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-semibold uppercase text-neutral-400 mb-2">Description</h3>
            <p className="text-base text-neutral-300 leading-relaxed">
              {issue.description}
            </p>
          </div>

          {/* Status Timeline */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase text-neutral-400 mb-4">Municipal Status Timeline</h3>
            <StatusTimeline currentStatus={issue.status} />
          </div>

          {/* Resolution Notes Section */}
          {issue.resolutionNotes && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>MUNICIPAL DISPATCH RESOLUTION NOTES</span>
              </div>
              <p className="text-sm text-emerald-200">{issue.resolutionNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
