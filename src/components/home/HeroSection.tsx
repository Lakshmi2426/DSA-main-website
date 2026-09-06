import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { NavigationTab } from '../../types';
import heroBgVideo from '../../assets/hero-bg.mp4';

interface HeroSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('[Hero Video] Autoplay delayed or blocked:', err);
          });
        }
      };

      if (video.readyState >= 2) {
        attemptPlay();
      } else {
        video.addEventListener('canplay', attemptPlay, { once: true });
      }
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-start overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-[#070b14] hero">
      {/* LAYER 1: Full-Screen Edge-to-Edge 3D Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => console.log('[Hero Video] Loaded data successfully')}
          onCanPlay={() => console.log('[Hero Video] Can play')}
          onPlay={() => console.log('[Hero Video] Video playing')}
          onError={(e) => console.error('[Hero Video] Load error:', e)}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none hero-video opacity-90"
        >
          <source src={heroBgVideo} type="video/mp4" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LAYER 2: Subtle Readability Vignette & Gradient Overlay */}
      {/* Extremely subtle overlay so the entire video background (left, center, right) remains vividly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent dark:from-[#070b14]/80 dark:via-[#070b14]/35 dark:to-transparent pointer-events-none z-10 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 dark:from-[#070b14]/75 dark:via-transparent dark:to-[#070b14]/40 pointer-events-none z-10" />

      {/* LAYER 3: Hero Content Layer Overlaid Directly On Video */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 hero-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-2xl text-left"
        >
          {/* Royal Blue & Violet Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-blue-950/40">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Algorithmic Mastery</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Master DSA.
            <br />
            Learn. Understand.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 drop-shadow-[0_2px_12px_rgba(99,102,241,0.6)]">
              Conquer.
            </span>
          </h1>

          {/* Subheadline / Description */}
          <p className="text-slate-200 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed font-normal max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Understand essential data structures and algorithms through interactive visualizers, structured curricula, and direct teacher guidance.
          </p>

          {/* Highlighted feature bullets */}
          <div className="grid grid-cols-2 gap-4 mb-10 text-xs sm:text-sm text-slate-200 font-medium max-w-lg">
            <div className="flex items-center gap-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>18 Core DSA Modules</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Interactive Invariants</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Step-by-Step Traversal</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Ask a Teacher Support</span>
            </div>
          </div>

          {/* Primary Action Button (Blue -> Indigo -> Violet gradient) */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setActiveTab('topics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200 flex items-center gap-2.5 shadow-xl shadow-blue-600/40 hover:shadow-blue-500/50 cursor-pointer"
              id="hero-start-learning-btn"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


