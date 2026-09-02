import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Eye,
  Gamepad2,
  Trophy,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface LearningJourneySectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const LearningJourneySection: React.FC<LearningJourneySectionProps> = ({ setActiveTab }) => {
  const steps = [
    {
      step: '01',
      title: 'Learn',
      badge: 'Concepts & Complexity',
      desc: 'Build a strong foundation in data structures and algorithms through clear explanations, core concepts, complexity analysis, and intuitive examples.',
      icon: BookOpen,
      color: '#2563eb', // Royal Blue
      accentGrad: 'from-[#1D4ED8] via-[#2563EB] to-[#6366F1]',
      pillBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200/90 dark:border-blue-800/80',
      targetTab: 'topics' as NavigationTab,
    },
    {
      step: '02',
      title: 'Visualize',
      badge: 'Interactive Tracing',
      desc: 'Watch AI-generated educational videos that explain DSA concepts visually, demonstrate algorithm execution, and make complex ideas easier to understand.',
      icon: Eye,
      color: '#2563eb', // Royal Blue
      accentGrad: 'from-[#1D4ED8] via-[#2563EB] to-[#6366F1]',
      pillBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200/90 dark:border-blue-800/80',
      targetTab: 'topics' as NavigationTab,
    },
    {
      step: '03',
      title: 'Play',
      badge: 'Games & Puzzles',
      desc: 'Learn DSA through interactive games and challenges, with helpful hints and guided solving that make practice engaging and easier to follow.',
      icon: Gamepad2,
      color: '#2563eb', // Royal Blue
      accentGrad: 'from-[#1D4ED8] via-[#2563EB] to-[#6366F1]',
      pillBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200/90 dark:border-blue-800/80',
      targetTab: 'topics' as NavigationTab,
    },
    {
      step: '04',
      title: 'Quiz',
      badge: 'Quiz & Assess',
      desc: 'Test your DSA knowledge with topic-based quizzes, reinforce what you have learned, and track your understanding through interactive assessments.',
      icon: Trophy,
      color: '#2563eb', // Royal Blue
      accentGrad: 'from-[#1D4ED8] via-[#2563EB] to-[#6366F1]',
      pillBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200/90 dark:border-indigo-800/80',
      targetTab: 'topics' as NavigationTab,
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden" id="learning-journey-section">
      {/* Soft Ambient Radial Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-blue-500/10 via-blue-500/8 to-indigo-500/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200/90 dark:border-blue-800/80 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>The Complete AlgoLearn Learning Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How You Learn and Master
          </h2>

          {/* Journey Sub-Ribbon: Learn → Visualize → Play → Quiz */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold font-mono mt-3.5 text-slate-600 dark:text-slate-300">
            <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Learn
            </span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Visualize
            </span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5" /> Play
            </span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> Quiz
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            A scientifically structured 4-phase pedagogical framework engineered to convert abstract data structure theory into intuitive, practical mastery.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Subtle Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[135px] left-12 right-12 h-0.5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-500 -z-10 opacity-30" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => {
                  setActiveTab(item.targetTab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative rounded-3xl bg-white dark:bg-[#0c1633] border border-blue-200/90 hover:border-blue-400 dark:border-slate-800 dark:hover:border-blue-500/50 p-6 sm:p-7 shadow-[0_10px_32px_-4px_rgba(37,99,235,0.08)] hover:shadow-[0_20px_44px_-6px_rgba(37,99,235,0.18)] dark:shadow-none transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                id={`journey-step-card-${item.step}`}
              >
                {/* Subtle top card accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Step Header & Content */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Glowing stage icon container */}
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform bg-gradient-to-br ${item.accentGrad} border border-white/20`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                    </div>

                    {/* Step Number */}
                    <span className="font-mono text-3xl sm:text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-blue-500/30 dark:group-hover:text-blue-400/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Badge */}
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2.5 inline-block border ${item.pillBg}`}
                  >
                    {item.badge}
                  </span>

                  {/* Stage Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              setActiveTab('topics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#6366F1] hover:from-[#1E40AF] hover:to-[#2563EB] text-white text-sm font-bold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            id="start-learning-journey-cta-btn"
          >
            <span>Start the 4-Stage Learning Path</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
