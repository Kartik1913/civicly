import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  MapPin, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  AlertTriangle,
  Zap,
  Trash2,
  Droplets
} from 'lucide-react';

export default function Report({ onAddReport }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Roads');
  const [location, setLocation] = useState('');
  const [photoPreview, setPhotoPreview] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800');

  // Success State
  const [submittedReport, setSubmittedReport] = useState(null);

  const categoryOptions = [
    { name: 'Roads', icon: AlertTriangle, desc: 'Potholes, cracks, pavement hazards', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { name: 'Electricity', icon: Zap, desc: 'Broken streetlights, wiring hazards', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
    { name: 'Sanitation', icon: Trash2, desc: 'Garbage overflow, illegal dumping', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { name: 'Water', icon: Droplets, desc: 'Pipe leaks, water main bursts', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMockLocation = () => {
    setLocation('4th Ave & Market Street, Downtown');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `CIV-${Math.floor(1040 + Math.random() * 100)}`;
    const newReport = {
      id: newId,
      title: title.trim() || 'Civic Infrastructure Report',
      description: description.trim() || 'Reported hazard logged via citizen mobile reporting portal.',
      category: category,
      location: location.trim() || 'Central Metro District',
      ward: 'Ward 4 (Downtown)',
      priority: 'High',
      status: 'Submitted',
      reportedDate: 'Just now',
      upvotes: 1,
      upvotedByMe: true,
      image: photoPreview,
      resolutionNotes: '',
      resolutionImage: null,
      coordinates: { lat: 37.7749 + (Math.random() - 0.5) * 0.02, lng: -122.4194 + (Math.random() - 0.5) * 0.02 }
    };

    onAddReport(newReport);
    setSubmittedReport(newReport);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      {!submittedReport ? (
        <div>
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400 mb-2 block">
              STEP 0{step} OF 04
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              Report a Civic Issue
            </h1>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Follow 4 simple steps to record civic hazards directly into city maintenance systems.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 max-w-md mx-auto mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-sky-400' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          {/* 4-Step Form Container */}
          <div className="apple-glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">1. What needs attention?</h3>

                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 mb-2 uppercase">Issue Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hazardous deep pothole on Main St"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 mb-2 uppercase">Detailed Description *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the hazard size, danger level, or any immediate public safety risk..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (!title.trim()) return alert('Please enter a title');
                        setStep(2);
                      }}
                      className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wide flex items-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer"
                    >
                      <span>Next: Category</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">2. Choose a category</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categoryOptions.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.name;

                      return (
                        <div
                          key={cat.name}
                          onClick={() => setCategory(cat.name)}
                          className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-[1.02]'
                              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${cat.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="text-lg font-bold text-white mb-1">{cat.name}</h4>
                          <p className="text-xs text-neutral-400">{cat.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full bg-white/10 text-white font-medium text-xs flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wide flex items-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer"
                    >
                      <span>Next: Location</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">3. Where is it?</h3>

                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 mb-2 uppercase">Location Field</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
                      <input
                        type="text"
                        placeholder="e.g. 4th Ave & Main Street, Downtown"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleMockLocation}
                    className="px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold flex items-center gap-2 hover:bg-sky-500/20 transition-all cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Auto-detect Current GPS Coordinates</span>
                  </button>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs text-neutral-400 space-y-1">
                    <p className="text-white font-semibold">📍 Geolocation Accuracy</p>
                    <p>Verified: 37.7749 N, -122.4194 W • Ward 4 (Downtown Central)</p>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-white/10 text-white font-medium text-xs flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wide flex items-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer"
                    >
                      <span>Next: Add Photo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">4. Add a photo</h3>

                  <div className="space-y-4">
                    <label className="block text-xs font-mono font-medium text-neutral-300 uppercase">Image Preview</label>
                    <div className="w-full h-56 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 relative">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs font-mono text-neutral-300">Attached Evidence Preview</span>
                      </div>
                    </div>

                    <label className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-sky-400/50 bg-sky-500/10 text-sky-300 text-xs font-semibold cursor-pointer hover:bg-sky-500/20 transition-all">
                      <Upload className="w-4 h-4" />
                      <span>Upload Custom Image File</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-full bg-white/10 text-white font-medium text-xs flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-9 py-4 rounded-full bg-white text-black font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all cursor-pointer"
                    >
                      Submit Report
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* SUCCESS STATE */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="apple-glass-card rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-4xl font-extrabold text-white tracking-tight">Report received.</h2>
          <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Your issue is now visible to the civic team and has been dispatched to local maintenance crews.
          </p>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 inline-block text-xs font-mono text-sky-400">
            REPORT ID: <span className="font-bold text-white">{submittedReport.id}</span>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/reports')}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wide hover:bg-neutral-200 transition-all cursor-pointer"
            >
              View in My Reports
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-3.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-all cursor-pointer"
            >
              Explore City Feed
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
