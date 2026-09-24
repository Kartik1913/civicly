import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  ChevronLeft, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Upload,
  AlertCircle
} from 'lucide-react';

export default function StaffIssueDetail({ issues, onUpdateIssueStatus }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issues.find(i => i.id === id) || issues[0];

  const [status, setStatus] = useState(issue?.status || 'Submitted');
  const [resolutionNotes, setResolutionNotes] = useState(issue?.resolutionNotes || '');
  const [resolutionImage, setResolutionImage] = useState(issue?.resolutionImage || null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!issue) {
    return (
      <div className="pt-32 pb-24 px-6 text-center text-white">
        <h2>Issue ticket not found.</h2>
        <button onClick={() => navigate('/staff')} className="mt-4 px-6 py-2 rounded-full bg-white text-black">
          Back to Staff Operations
        </button>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResolutionImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateIssueStatus(issue.id, {
      status,
      resolutionNotes,
      resolutionImage
    });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/staff')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white mb-8 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Operations Queue</span>
      </button>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Citizen Issue Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="apple-glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Issue Image */}
            <div className="relative w-full h-64 bg-neutral-900">
              <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-sky-400 font-bold">
                  {issue.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-neutral-300">
                  ID: {issue.id}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <h1 className="text-2xl font-bold text-white">{issue.title}</h1>
              <p className="text-xs text-neutral-300 leading-relaxed">{issue.description}</p>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-neutral-400">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-neutral-500">Location</span>
                  <span className="text-white font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> {issue.location}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-neutral-500">Ward / Zone</span>
                  <span className="text-white font-medium mt-0.5 block">{issue.ward}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-neutral-500">Priority Level</span>
                  <span className="text-amber-400 font-bold mt-0.5 block">{issue.priority}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-neutral-500">Current Status</span>
                  <span className="text-sky-300 font-bold mt-0.5 block">● {issue.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Staff Management Form */}
        <div className="lg:col-span-5">
          <div className="apple-glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
              <Shield className="w-4 h-4" />
              <span>STAFF DISPATCH ACTION</span>
            </div>

            <h2 className="text-xl font-bold text-white">Update Issue Status</h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Status Selector */}
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2 uppercase">Lifecycle Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-400 font-medium"
                >
                  <option value="Submitted">Submitted (Pending Review)</option>
                  <option value="Acknowledged">Acknowledged (Queued for Inspection)</option>
                  <option value="In Progress">In Progress (Crew Dispatched)</option>
                  <option value="Resolved">Resolved (Work Completed)</option>
                </select>
              </div>

              {/* Resolution Notes */}
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2 uppercase">Resolution / Dispatch Notes</label>
                <textarea
                  rows={4}
                  placeholder="Enter dispatch order details, crew assignment, or completion remarks..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              {/* Resolution Image Upload */}
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2 uppercase">Resolution Evidence Photo</label>
                
                {resolutionImage && (
                  <div className="w-full h-36 rounded-xl overflow-hidden mb-3 border border-white/10">
                    <img src={resolutionImage} alt="Resolution evidence" className="w-full h-full object-cover" />
                  </div>
                )}

                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-purple-400/50 bg-purple-500/10 text-purple-300 text-xs font-semibold cursor-pointer hover:bg-purple-500/20 transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{resolutionImage ? 'Change Evidence Image' : 'Upload Completion Photo'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-neutral-200 transition-all cursor-pointer"
              >
                Update Issue
              </button>

              {isSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center animate-fade-in flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Issue status successfully updated!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
