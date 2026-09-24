import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import PublicIssues from './components/PublicIssues';
import Footer from './components/Footer';

// Pages
import Explore from './pages/Explore';
import Report from './pages/Report';
import MyReports from './pages/MyReports';
import IssueDetail from './pages/IssueDetail';
import StaffDashboard from './pages/StaffDashboard';
import StaffIssueDetail from './pages/StaffIssueDetail';

import { INITIAL_ISSUES } from './data/issues';

// Scroll To Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Landing Page Wrapper
function LandingPage({ onOpenReportModal, issues, onToggleUpvote }) {
  return (
    <>
      <Hero onOpenReportModal={onOpenReportModal} />
      <StorySection />
      <PublicIssues issues={issues} onToggleUpvote={onToggleUpvote} />
      <Footer onOpenReportModal={onOpenReportModal} />
    </>
  );
}

export default function App() {
  // Theme state persistent in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('civicly_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Shared mock issue state
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('civicly_app_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  // Sync theme class on HTML document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('civicly_theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('civicly_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Save to localStorage when issues state changes
  useEffect(() => {
    localStorage.setItem('civicly_app_issues', JSON.stringify(issues));
  }, [issues]);

  // Handle Upvoting
  const handleToggleUpvote = (issueId) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          const upvoted = issue.upvotedByMe;
          return {
            ...issue,
            upvotes: upvoted ? issue.upvotes - 1 : issue.upvotes + 1,
            upvotedByMe: !upvoted
          };
        }
        return issue;
      })
    );
  };

  // Handle Adding New Report
  const handleAddReport = (newReport) => {
    setIssues(prev => [newReport, ...prev]);
  };

  // Handle Staff Status & Resolution Update
  const handleUpdateIssueStatus = (issueId, { status, resolutionNotes, resolutionImage }) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            status,
            resolutionNotes,
            resolutionImage: resolutionImage || issue.resolutionImage
          };
        }
        return issue;
      })
    );
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-sky-500/30 font-sans transition-colors duration-300">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                onOpenReportModal={() => window.location.href = '/report'}
                issues={issues}
                onToggleUpvote={handleToggleUpvote}
              />
            }
          />
          <Route
            path="/explore"
            element={<Explore issues={issues} onToggleUpvote={handleToggleUpvote} />}
          />
          <Route
            path="/report"
            element={<Report onAddReport={handleAddReport} />}
          />
          <Route
            path="/reports"
            element={<MyReports issues={issues} onToggleUpvote={handleToggleUpvote} />}
          />
          <Route
            path="/issue/:id"
            element={<IssueDetail issues={issues} onToggleUpvote={handleToggleUpvote} />}
          />
          <Route
            path="/staff"
            element={<StaffDashboard issues={issues} />}
          />
          <Route
            path="/staff/issue/:id"
            element={
              <StaffIssueDetail
                issues={issues}
                onUpdateIssueStatus={handleUpdateIssueStatus}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
