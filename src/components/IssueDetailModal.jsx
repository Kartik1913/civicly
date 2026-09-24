import React, { useState } from 'react';
import { CATEGORIES, STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/mockData';
import { 
  X, 
  ThumbsUp, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Building2,
  Calendar,
  Share2,
  UserCheck
} from 'lucide-react';

export default function IssueDetailModal({ 
  issue, 
  onClose, 
  onToggleUpvote, 
  onAddComment,
  onUpdateStatus,
  isAdmin 
}) {
  const [newCommentText, setNewCommentText] = useState('');
  const [adminStatusSelect, setAdminStatusSelect] = useState(issue.status);
  const [adminNoteText, setAdminNoteText] = useState('');

  const categoryObj = CATEGORIES.find(c => c.id === issue.category) || CATEGORIES[0];
  const statusObj = STATUS_OPTIONS.find(s => s.id === issue.status) || STATUS_OPTIONS[0];
  const priorityObj = PRIORITY_OPTIONS.find(p => p.id === issue.priority) || PRIORITY_OPTIONS[0];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(issue.id, {
      user: isAdmin ? 'City Department Admin' : 'Anita Alvarez',
      avatar: isAdmin ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: newCommentText.trim(),
      date: new Date().toISOString(),
      isOfficial: isAdmin
    });
    setNewCommentText('');
  };

  const handleAdminStatusUpdate = (e) => {
    e.preventDefault();
    onUpdateStatus(issue.id, adminStatusSelect, adminNoteText);
    setAdminNoteText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Issue link copied to clipboard!');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div className="glass-panel animate-slide-up" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: 0,
        boxShadow: 'var(--shadow-lg)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', background: '#0f172a' }}>
          <img 
            src={issue.image} 
            alt={issue.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)'
          }} />

          <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span className="badge" style={{ background: categoryObj.bg, color: categoryObj.color, fontSize: '0.82rem', fontWeight: 700 }}>
              {categoryObj.name}
            </span>
            <span className="badge" style={{ background: statusObj.bg, color: statusObj.color, fontSize: '0.82rem', fontWeight: 700 }}>
              {statusObj.label}
            </span>
            <span className="badge" style={{ background: 'rgba(0,0,0,0.6)', color: priorityObj.color, border: '1px solid ' + priorityObj.color, fontSize: '0.82rem' }}>
              Priority: {priorityObj.label}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ padding: '1.5rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                ISSUE ID: {issue.id}
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', margin: '4px 0 6px' }}>
                {issue.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="var(--color-primary)" /> {issue.address}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> Reported {new Date(issue.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Building2 size={14} /> {issue.assignedDept || categoryObj.dept}
                </span>
              </div>
            </div>

            {/* Upvote & Share Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => onToggleUpvote(issue.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '12px',
                  border: issue.upvotedByMe ? 'none' : '1px solid var(--color-border)',
                  background: issue.upvotedByMe ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: issue.upvotedByMe ? '#fff' : 'var(--color-text)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <ThumbsUp size={16} fill={issue.upvotedByMe ? '#fff' : 'none'} /> {issue.upvotes} Upvotes
              </button>
              <button
                onClick={handleShare}
                style={{
                  padding: '0.6rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  cursor: 'pointer'
                }}
                title="Share Issue Link"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            {issue.description}
          </p>

          {/* Progress Timeline Tracker */}
          <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="var(--color-primary)" /> Resolution Progress Timeline
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
              {issue.timeline?.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: step.status === 'resolved' ? 'var(--color-success)' : 'var(--color-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)' }}>{step.label}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                        {new Date(step.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City Admin Controls Section (Visible if Admin Mode is enabled) */}
          {isAdmin && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid var(--color-accent)',
              padding: '1.25rem',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={18} /> Official Department Admin Actions
              </div>

              <form onSubmit={handleAdminStatusUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Update Status</label>
                    <select
                      value={adminStatusSelect}
                      onChange={(e) => setAdminStatusSelect(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginTop: '4px'
                      }}
                    >
                      <option value="reported">Reported / Pending</option>
                      <option value="in_progress">In Progress / Crew Dispatched</option>
                      <option value="resolved">Resolved / Work Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Official Resolution Note / Dispatch Message</label>
                  <input
                    type="text"
                    placeholder="e.g., Crew dispatched; repair completed on Sept 24."
                    value={adminNoteText}
                    onChange={(e) => setAdminNoteText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      fontSize: '0.85rem',
                      marginTop: '4px'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Publish Official Status Update
                </button>
              </form>
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={18} color="var(--color-primary)" /> Community Discussion ({issue.comments?.length || 0})
            </h4>

            {/* Comment List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {issue.comments?.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  No comments yet. Be the first neighbor to add a remark or update!
                </p>
              ) : (
                issue.comments?.map((c) => (
                  <div key={c.id} style={{ display: 'flex', gap: '0.75rem', background: 'var(--color-surface)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <img src={c.avatar} alt={c.user} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)' }}>{c.user}</span>
                        {c.isOfficial && (
                          <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: 'var(--color-accent)', color: '#fff', fontWeight: 700 }}>
                            OFFICIAL RESPONSE
                          </span>
                        )}
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', marginLeft: 'auto' }}>
                          {new Date(c.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder={isAdmin ? "Add official city update..." : "Add a public comment or update..."}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Send size={15} /> Post
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
