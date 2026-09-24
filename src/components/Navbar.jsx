import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Sun, Moon } from 'lucide-react';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--card-border)] py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/"
          className="flex items-center gap-2 group tracking-widest text-lg uppercase font-extrabold"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <span className="font-semibold tracking-widest text-sm text-[var(--text-main)]">
            CIVICLY
          </span>
        </Link>

        {/* Global Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[var(--text-muted)]">
          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `transition-colors duration-200 cursor-pointer ${isActive ? 'text-sky-400 font-semibold' : 'hover:text-[var(--text-main)]'}`
            }
          >
            Explore
          </NavLink>
          <NavLink 
            to="/report" 
            className={({ isActive }) => 
              `transition-colors duration-200 cursor-pointer ${isActive ? 'text-sky-400 font-semibold' : 'hover:text-[var(--text-main)]'}`
            }
          >
            Report
          </NavLink>
          <NavLink 
            to="/reports" 
            className={({ isActive }) => 
              `transition-colors duration-200 cursor-pointer ${isActive ? 'text-sky-400 font-semibold' : 'hover:text-[var(--text-main)]'}`
            }
          >
            My Reports
          </NavLink>
          
          {/* Secondary Link for Staff Operations */}
          <NavLink 
            to="/staff" 
            className={({ isActive }) => 
              `flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-mono transition-all duration-200 ${
                isActive 
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' 
                  : 'bg-black/5 text-[var(--text-muted)] border-[var(--card-border)] hover:text-[var(--text-main)]'
              }`
            }
          >
            <Shield className="w-3 h-3 text-purple-400" />
            <span>Staff Portal</span>
          </NavLink>
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="w-9 h-9 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-main)] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
          </button>

          <button
            onClick={() => navigate('/report')}
            className="relative group overflow-hidden rounded-full bg-[var(--text-main)] text-[var(--bg-main)] font-semibold text-xs tracking-wide px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Report an issue
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
