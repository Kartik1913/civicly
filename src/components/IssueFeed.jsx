import React, { useState } from 'react';
import IssueCard from './IssueCard';
import { CATEGORIES, STATUS_OPTIONS } from '../data/mockData';
import { 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  PlusCircle, 
  SearchX,
  Sparkles
} from 'lucide-react';

export default function IssueFeed({ 
  issues, 
  onSelectIssue, 
  onToggleUpvote, 
  onOpenReportModal,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  isAdmin
}) {
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes' | 'recent' | 'priority'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const filteredIssues = issues.filter(issue => {
    if (selectedCategory !== 'all' && issue.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && issue.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = issue.title.toLowerCase().includes(q);
      const matchDesc = issue.description.toLowerCase().includes(q);
      const matchAddr = issue.address.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAddr) return false;
    }
    return true;
  });

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'priority') {
      const priorityScore = { emergency: 4, high: 3, medium: 2, low: 1 };
      return priorityScore[b.priority] - priorityScore[a.priority];
    }
    return 0;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>
      {/* Header Bar & Control Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={22} color="var(--color-primary)" /> Community Issue Feed
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Track, endorse, and inspect citizen reports across your neighborhood
          </p>
        </div>

        {/* Toolbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-surface)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '0.82rem' }}>
            <ArrowUpDown size={15} color="var(--color-text-muted)" />
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="upvotes" style={{ background: 'var(--color-surface)' }}>Most Upvoted</option>
              <option value="recent" style={{ background: 'var(--color-surface)' }}>Most Recent</option>
              <option value="priority" style={{ background: 'var(--color-surface)' }}>Highest Priority</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div style={{ display: 'flex', background: 'var(--color-surface)', padding: '3px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '5px 8px',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'grid' ? 'var(--color-surface-hover)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '5px 8px',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'list' ? 'var(--color-surface-hover)' : 'transparent',
                color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'none'
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid ' + (selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-border)'),
            background: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-surface)',
            color: selectedCategory === 'all' ? '#fff' : 'var(--color-text-muted)',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          All Categories ({issues.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = issues.filter(i => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid ' + (selectedCategory === cat.id ? cat.color : 'var(--color-border)'),
                background: selectedCategory === cat.id ? cat.color : 'var(--color-surface)',
                color: selectedCategory === cat.id ? '#fff' : 'var(--color-text-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid or Empty View */}
      {sortedIssues.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem' }}>
          <SearchX size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>No matching civic reports found</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
            We couldn't find any issues with your current filter or search parameters. Try changing filters or post a new report!
          </p>
          <button
            onClick={onOpenReportModal}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <PlusCircle size={18} /> Report an Issue Now
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
          gap: '1.25rem'
        }}>
          {sortedIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onSelectIssue={onSelectIssue}
              onToggleUpvote={onToggleUpvote}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
