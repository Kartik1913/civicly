import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CATEGORIES, 
  PRIORITY_OPTIONS, 
  SAMPLE_SAMPLE_IMAGES 
} from '../data/mockData';
import { 
  X, 
  MapPin, 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function ReportIssueModal({ 
  onClose, 
  onSubmitIssue, 
  initialLocation 
}) {
  const [step, setStep] = useState(1); // 1: Category, 2: Location, 3: Details & Photo

  const [category, setCategory] = useState('pothole');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [address, setAddress] = useState(initialLocation ? `Lat: ${initialLocation.lat.toFixed(4)}, Lng: ${initialLocation.lng.toFixed(4)}` : 'Market St & 5th St, San Francisco');
  const [lat, setLat] = useState(initialLocation?.lat || 37.7749);
  const [lng, setLng] = useState(initialLocation?.lng || -122.4194);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(SAMPLE_SAMPLE_IMAGES[0].url);
  const [customFilePreview, setCustomFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomFilePreview(reader.result);
        setSelectedPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out the title and description.');
      return;
    }

    const newIssue = {
      id: `CIV-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      description: description.trim(),
      category: category,
      priority: priority,
      status: 'reported',
      lat: lat,
      lng: lng,
      address: address.trim(),
      reportedBy: 'Anita Alvarez',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date().toISOString(),
      upvotes: 1,
      upvotedByMe: true,
      image: selectedPhotoUrl,
      assignedDept: CATEGORIES.find(c => c.id === category)?.dept || 'Public Works',
      timeline: [
        { status: 'reported', label: 'Reported by Citizen', date: new Date().toISOString(), note: 'Ticket filed with city dispatch system.' }
      ],
      comments: []
    };

    // Confetti celebration effect!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    onSubmitIssue(newIssue);
    onClose();
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div className="glass-panel animate-slide-up" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Step {step} of 3
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '2px' }}>
            Report a Civic Issue
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Help your city identify and fix public infrastructure problems quickly.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: s <= step ? 'var(--color-primary)' : 'var(--color-border)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* STEP 1: CATEGORY SELECT */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
              1. What type of issue are you reporting?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
              {CATEGORIES.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: '14px',
                    border: '2px solid ' + (category === cat.id ? cat.color : 'var(--color-border)'),
                    background: category === cat.id ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <span className="badge" style={{ background: cat.bg, color: cat.color, width: 'fit-content' }}>
                    {cat.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Routed to: {cat.dept}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Next: Location <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
              2. Where is this issue located?
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Provide an approximate street address or landmark so maintenance crews can locate it.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Street Address / Landmark</label>
              <div style={{ position: 'relative', marginTop: '4px' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 5th Ave & Pine Street"
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.3rem',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              📍 <strong>GPS Coordinates:</strong> Latitude {lat.toFixed(4)}, Longitude {lng.toFixed(4)}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '0.65rem 1.2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ChevronLeft size={18} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Next: Details <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DETAILS & PHOTO */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>
              3. Describe the issue & upload photo
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Issue Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Deep Pothole damaging vehicles"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontSize: '0.9rem',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the exact hazard, size, severity, and any immediate public safety concerns..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontSize: '0.88rem',
                    marginTop: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Priority Radio selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Urgency Level</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '6px' }}>
                  {PRIORITY_OPTIONS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        borderRadius: '8px',
                        border: '1px solid ' + (priority === p.id ? p.color : 'var(--color-border)'),
                        background: priority === p.id ? p.color : 'var(--color-surface)',
                        color: priority === p.id ? '#fff' : 'var(--color-text-muted)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload & Sample Select */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Attach Photo Evidence</label>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '6px', alignItems: 'center' }}>
                  {/* Local Upload */}
                  <label style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    border: '1px dashed var(--color-primary)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Upload size={16} /> Choose Image File
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>

                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>or select sample photo below:</span>
                </div>

                {/* Sample Photo selector */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '10px', paddingBottom: '4px' }}>
                  {SAMPLE_SAMPLE_IMAGES.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={img.label}
                      onClick={() => {
                        setSelectedPhotoUrl(img.url);
                        setCustomFilePreview(null);
                      }}
                      style={{
                        width: '70px',
                        height: '55px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: selectedPhotoUrl === img.url ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        opacity: selectedPhotoUrl === img.url ? 1 : 0.65
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  padding: '0.65rem 1.2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ChevronLeft size={18} /> Back
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.65rem 1.6rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <Sparkles size={18} /> Submit Issue Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
