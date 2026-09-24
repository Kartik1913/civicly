import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 80;

const TEXT_PHASES = [
  {
    range: [0, 0.25],
    headline: "Your city.\nYour voice.",
    sub: "Report civic issues, track what happens next, and make visible change in your neighborhood."
  },
  {
    range: [0.25, 0.50],
    headline: "See something wrong?",
    sub: "Spot potholes, dark streetlights, or broken utilities on your daily route."
  },
  {
    range: [0.50, 0.75],
    headline: "Make it visible.",
    sub: "Snap a photo, auto-tag location, and submit directly to city dispatch."
  },
  {
    range: [0.75, 1.0],
    headline: "Track the change.",
    sub: "Follow your report live from municipal assignment to completed repair."
  }
];

export default function ScrollCitySequence({ onOpenReportModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNumber, setCurrentFrameNumber] = useState(1);
  const [activeFrameSrc, setActiveFrameSrc] = useState('');

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // 1. Robust Frame Preloader with SVG Data URL decoding fallback
  useEffect(() => {
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const padIndex = String(i).padStart(3, '0');
      const url = `/civicly-city/frame_${padIndex}.webp`;

      fetch(url)
        .then((res) => res.text())
        .then((text) => {
          const img = new Image();
          let imageSrc = url;

          // If the file contains raw SVG text (even with .webp extension), parse as SVG Data URL
          if (text.trim().startsWith('<svg') || text.includes('<svg')) {
            imageSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
          }

          img.src = imageSrc;

          img.onload = () => {
            img.dataUrlSrc = imageSrc;
            imagesRef.current[i - 1] = img;
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

            if (i === 1) {
              setActiveFrameSrc(imageSrc);
              setFirstFrameLoaded(true);
            }
          };

          img.onerror = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            if (i === 1) setFirstFrameLoaded(true);
          };
        })
        .catch(() => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (i === 1) setFirstFrameLoaded(true);
        });
    }
  }, []);

  // 2. Scroll Progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;

      if (totalHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);

      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Smooth Lerp & Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;

    const render = () => {
      if (prefersReducedMotion) {
        currentFrameRef.current = 40;
      } else {
        currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.2;
      }

      const frameIndex = Math.min(
        Math.max(Math.round(currentFrameRef.current), 0),
        TOTAL_FRAMES - 1
      );

      const frameNum = frameIndex + 1;
      setCurrentFrameNumber(frameNum);

      let img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = imagesRef.current[0]; // Fallback to frame 1
      }

      if (img && img.dataUrlSrc) {
        setActiveFrameSrc(img.dataUrlSrc);
      }

      // Render to Canvas
      if (canvas && img && img.complete && img.naturalWidth !== 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const rect = canvas.getBoundingClientRect();

          if (rect.width > 0 && rect.height > 0) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const imgRatio = 16 / 9;
            const canvasRatio = rect.width / rect.height;

            let drawWidth = rect.width;
            let drawHeight = rect.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
              drawHeight = rect.width / imgRatio;
              offsetY = (rect.height - drawHeight) / 2;
            } else {
              drawWidth = rect.height * imgRatio;
              offsetX = (rect.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [prefersReducedMotion]);

  const currentPhase = TEXT_PHASES.find(
    (p) => scrollProgress >= p.range[0] && scrollProgress <= p.range[1]
  ) || TEXT_PHASES[0];

  const scrollToNextSection = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[280vh]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-[#08080a] select-none">

        {/* Layer 1: Hardware-Accelerated Frame Image */}
        {activeFrameSrc && (
          <img
            src={activeFrameSrc}
            alt="Civicly City Frame"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 pointer-events-none"
            style={{ opacity: firstFrameLoaded ? 0.95 : 0 }}
          />
        )}

        {/* Layer 2: Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-1 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: firstFrameLoaded ? 1 : 0 }}
        />

        {/* Loading Spinner */}
        {!firstFrameLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#08080a] text-neutral-400 font-mono text-xs gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
            <span>LOADING CINEMATIC CITY SEQUENCE...</span>
          </div>
        )}

        {/* Subtle Ambient Readability Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60 pointer-events-none z-10" />

        {/* Top Badge */}
        <div className="relative z-20 pt-28 px-6 md:px-12 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-xs font-medium text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="tracking-widest uppercase font-mono text-[11px]">CIVICLY CINEMATIC SEQUENCE</span>
          </div>
        </div>

        {/* Scroll-Synchronized Text Headlines */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.05] whitespace-pre-line mb-6 drop-shadow-2xl">
                {currentPhase.headline}
              </h1>

              <p className="text-lg md:text-xl text-neutral-200 font-normal max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-md">
                {currentPhase.sub}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenReportModal}
                  className="w-full sm:w-auto group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Report an issue</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={scrollToNextSection}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/70 border border-white/20 hover:bg-white/10 text-white font-medium text-sm transition-all duration-300 cursor-pointer backdrop-blur-md"
                >
                  Explore issues
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Debug Badge & Scroll Progress Bar */}
        <div className="relative z-20 pb-8 px-6 flex flex-col items-center gap-3">
          <div className="px-4 py-1.5 rounded-full bg-black/90 border border-sky-400/50 backdrop-blur-md text-[11px] font-mono font-bold text-sky-400 shadow-2xl">
            CITY FRAME: {String(currentFrameNumber).padStart(3, '0')} / {TOTAL_FRAMES} ({loadProgress}% LOADED)
          </div>

          <div className="w-48 h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-md">
            <div
              className="h-full bg-sky-400 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          <button
            onClick={scrollToNextSection}
            className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>SCROLL TO EXPLORE CINEMATIC CAMERA ↓</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>

      </div>
    </div>
  );
}
