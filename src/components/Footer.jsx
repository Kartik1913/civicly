import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onOpenReportModal }) {
  return (
    <footer id="footer" className="relative bg-[#050507] pt-28 pb-16 border-t border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* FINAL CTA SECTION */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="apple-glass-card rounded-3xl p-12 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-sky-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BE THE SPARK</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Better cities start with people who speak up.
          </h2>

          <p className="text-base text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
            No long bureaucracy or telephone queues. Take a photo, mark the spot, and watch your neighborhood transform.
          </p>

          <button
            onClick={onOpenReportModal}
            className="group relative inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Report an issue</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-12 relative z-10 text-xs text-neutral-500">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-extrabold text-sm tracking-widest text-white uppercase">CIVICLY</span>
          </div>
          <p className="text-neutral-400 font-normal">
            Accessible civic issue reporting. Your city. Your voice.
          </p>
        </div>

        <div className="flex items-center gap-6 font-medium text-neutral-400">
          <a href="#explore" className="hover:text-white transition-colors">Explore</a>
          <a href="#story" className="hover:text-white transition-colors">How it works</a>
          <a href="#footer" className="hover:text-white transition-colors">Privacy</a>
          <a href="#footer" className="hover:text-white transition-colors">Terms</a>
        </div>

        <div className="flex items-center gap-1 text-neutral-400 font-mono">
          <span>College Mini-Project Build</span>
          <span className="text-neutral-600">•</span>
          <span>Open Source</span>
        </div>
      </div>
    </footer>
  );
}
