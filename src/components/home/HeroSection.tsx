import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { HeroAlgorithmCarousel } from './HeroAlgorithmCarousel';
import { NavigationTab } from '../../types';

interface HeroSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Layered Subtle Blue & Violet Ambient Glows for Light & Dark mode */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/12 via-violet-600/8 to-indigo-400/6 blur-[130px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-blue-500/8 to-violet-500/8 dark:bg-blue-600/10 blur-[100px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-gradient-to-tr from-violet-500/6 to-blue-500/6 dark:bg-blue-500/5 blur-[90px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Royal Blue & Violet Accent Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/80 border border-blue-200/90 dark:border-blue-800/80 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-5 w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Interactive Algorithmic Mastery</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-5">
              Master DSA.
              <br />
              Learn. Understand.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
                Conquer.
              </span>
            </h1>

            {/* Subheadline / Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              Understand essential data structures and algorithms through interactive visualizers, structured curricula, and AI-driven coaching.
            </p>

            {/* Highlighted feature bullets (Royal Blue + Violet touches) */}
            <div className="grid grid-cols-2 gap-3.5 mb-9 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>18 Core DSA Modules</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Interactive Invariants</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Step-by-Step Traversal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>AI Reasoning Assistant</span>
              </div>
            </div>

            {/* Primary Action Button (Blue -> Indigo -> Violet gradient) */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  setActiveTab('topics');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200 flex items-center gap-2.5 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 cursor-pointer"
                id="hero-start-learning-btn"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Sliding Hero Algorithm Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[440px]"
          >
            {/* Ambient Card Glow Backdrop */}
            <div className="absolute w-[240px] h-[320px] bg-gradient-to-br from-blue-500/20 to-violet-700/15 rounded-3xl blur-2xl -translate-x-12 opacity-70 pointer-events-none hidden sm:block" />
            <div className="absolute w-[240px] h-[320px] bg-gradient-to-br from-indigo-400/20 to-blue-600/20 rounded-3xl blur-2xl translate-x-12 opacity-70 pointer-events-none hidden sm:block" />

            <HeroAlgorithmCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
