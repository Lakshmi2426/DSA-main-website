import React from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import { NavigationTab } from '../../types';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60 transition-colors pt-16 pb-12 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none"
            >
              <Logo />
            </button>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Interactive Data Structures & Algorithms platform designed for deep conceptual intuition, step-by-step visualizations, and AI-accelerated mastery.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              18 Core DSA Modules • Gemini 3.7 Online
            </div>
          </div>

          {/* Core Curriculum Links (From approved 18 topics) */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white font-mono mb-4">
              Curriculum
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('topics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Linear & Binary Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('topics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Stack & Queue
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('topics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  SLL, DLL & Circular Lists
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('topics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Trees & Binary Search Tree
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('topics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Hashing & Collision Resolution
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white font-mono mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('topics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  All 18 DSA Topics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('ask-teacher');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Ask a Teacher
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('leaderboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Learner Leaderboard
                </button>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white font-mono mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About AlgoLearn
                </button>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Privacy & Terms</span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Curriculum Standards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© 2026 AlgoLearn Platform. Essential Data Structures & Algorithms.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              TypeScript & React
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              18 Official DSA Topics
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
