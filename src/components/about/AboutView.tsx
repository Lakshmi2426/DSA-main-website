import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code,
  Eye,
  Gamepad2,
  Github,
  Info,
  Linkedin,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { NavigationTab } from '../../types';

// Team Photos
import lakshmiImg from '../../assets/team/lakshmi.jpg';
import ganeshImg from '../../assets/team/ganesh.jpg';
import khalanderImg from '../../assets/team/khalander.jpg';
import kavyaImg from '../../assets/team/kavya.jpg';
import meghanaImg from '../../assets/team/meghana.jpg';

interface AboutViewProps {
  setActiveTab: (tab: NavigationTab) => void;
}

// ─── 10 Team Members (Blue -> Indigo -> Violet Palette) ─────────────────────
const TEAM_MEMBERS = [
  // Row 1
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    role: 'Founder & Developer',
    photo: lakshmiImg,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-600 to-indigo-600',
    initials: 'L',
  },
  {
    id: 'ganesh-reddy',
    name: 'Ganesh Reddy',
    role: 'Team Member',
    photo: ganeshImg,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-600 to-indigo-600',
    initials: 'GR',
  },
  {
    id: 'khalander',
    name: 'Khalander',
    role: 'Team Member',
    photo: khalanderImg,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-indigo-600 to-violet-600',
    initials: 'K',
  },
  {
    id: 'subhash',
    name: 'Subhash',
    role: 'Team Member',
    photo: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-700 to-indigo-600',
    initials: 'S',
  },
  {
    id: 'ramganesh',
    name: 'Ramganesh',
    role: 'Team Member',
    photo: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-600 to-violet-600',
    initials: 'R',
  },
  // Row 2
  {
    id: 'jaswanth',
    name: 'Jaswanth',
    role: 'Team Member',
    photo: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-700 to-indigo-700',
    initials: 'J',
  },
  {
    id: 'kavya',
    name: 'Kavya',
    role: 'Team Member',
    photo: kavyaImg,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-600 to-indigo-600',
    initials: 'K',
  },
  {
    id: 'tanisha',
    name: 'Tanisha',
    role: 'Team Member',
    photo: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-indigo-600 to-violet-600',
    initials: 'T',
  },
  {
    id: 'meghana',
    name: 'Meghana',
    role: 'Team Member',
    photo: meghanaImg,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-600 to-violet-600',
    initials: 'M',
  },
  {
    id: 'yasaswi',
    name: 'Yasaswi',
    role: 'Team Member',
    photo: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradRing: 'from-blue-600 via-indigo-600 to-violet-600',
    avatarBg: 'from-blue-600 to-indigo-700',
    initials: 'Y',
  },
];

// ─── Conceptual Journey Steps (Right Side of Horizontal Box) ───────────────
const CONCEPTUAL_STEPS = [
  {
    title: 'UNDERSTAND',
    desc: 'Grasp concepts with clarity.',
    icon: Eye,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/70 border-blue-200/80 dark:border-blue-800/80',
    glow: 'shadow-[0_0_15px_rgba(37,99,235,0.2)]',
  },
  {
    title: 'EXPERIENCE',
    desc: 'Interact, explore and learn by doing.',
    icon: Gamepad2,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200/80 dark:border-indigo-800/80',
    glow: 'shadow-[0_0_15px_rgba(99,102,241,0.2)]',
  },
  {
    title: 'PRACTICE',
    desc: 'Apply through challenges and real problems.',
    icon: Code,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-950/70 border-violet-200/80 dark:border-violet-800/80',
    glow: 'shadow-[0_0_15px_rgba(124,58,237,0.2)]',
  },
  {
    title: 'MASTER',
    desc: 'Track progress and grow with confidence.',
    icon: Target,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/70 border-blue-200/80 dark:border-blue-800/80',
    glow: 'shadow-[0_0_15px_rgba(37,99,235,0.2)]',
  },
];

// ─── 4 Differentiators (Equal Columns with Dividers) ───────────────────────────
const DIFFERENTIATORS = [
  {
    title: 'Visual-First Learning',
    desc: 'See algorithms and data structures come to life with interactive visualizations.',
    icon: Eye,
    color: 'text-blue-600 dark:text-blue-400',
    bgIcon: 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80',
  },
  {
    title: 'Structured & Focused',
    desc: 'Follow a carefully designed learning path from basics to advanced mastery.',
    icon: Zap,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgIcon: 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80',
  },
  {
    title: 'Active & Engaging',
    desc: 'Learn through practice, challenges, gamified activities and quizzes.',
    icon: Zap,
    color: 'text-violet-600 dark:text-violet-400',
    bgIcon: 'bg-violet-50 dark:bg-violet-950/60 border border-violet-200/80 dark:border-violet-800/80',
  },
  {
    title: 'AI-Powered Guidance',
    desc: 'Get instant help, hints and explanations whenever you get stuck.',
    icon: BrainCircuit,
    color: 'text-blue-600 dark:text-blue-400',
    bgIcon: 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80',
  },
];

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  const handleStartLearning = () => {
    setActiveTab('topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F6F8FF] dark:bg-[#050816] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-300 overflow-x-hidden">
      {/* ── ATMOSPHERIC BACKGROUND DECORATION ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        {/* Soft Ambient Radial Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-r from-blue-500/10 via-indigo-500/8 to-violet-500/10 dark:from-blue-600/14 dark:via-indigo-600/10 dark:to-violet-600/12 blur-[160px] rounded-full" />
        <div className="absolute top-[35%] -left-32 w-[550px] h-[550px] bg-blue-500/6 dark:bg-blue-600/8 blur-[150px] rounded-full" />
        <div className="absolute top-[65%] -right-32 w-[600px] h-[600px] bg-indigo-500/6 dark:bg-indigo-600/8 blur-[160px] rounded-full" />

        {/* Low-opacity Node Connection Net Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.045] dark:opacity-[0.035] text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="node-grid-net" width="160" height="160" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="3" fill="currentColor" />
              <circle cx="130" cy="30" r="3" fill="currentColor" />
              <circle cx="80" cy="120" r="3.5" fill="currentColor" />
              <path d="M 30 30 L 130 30 M 30 30 L 80 120 M 130 30 L 80 120" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#node-grid-net)" />
        </svg>

        {/* Low-opacity Notation Labels */}
        <div className="absolute top-[12%] left-[4%] font-mono text-[11px] text-blue-800/15 dark:text-blue-300/10 tracking-widest hidden lg:block">O(log n)</div>
        <div className="absolute top-[18%] right-[5%] font-mono text-[11px] text-indigo-800/15 dark:text-indigo-300/10 tracking-widest hidden lg:block">O(n)</div>
        <div className="absolute top-[45%] left-[3%] font-mono text-[11px] text-indigo-800/15 dark:text-indigo-300/10 tracking-widest hidden lg:block">node → next</div>
        <div className="absolute top-[52%] right-[4%] font-mono text-[11px] text-blue-800/15 dark:text-blue-300/10 tracking-widest hidden lg:block">O(n log n)</div>
        <div className="absolute top-[78%] left-[5%] font-mono text-[11px] text-indigo-800/15 dark:text-indigo-300/10 tracking-widest hidden lg:block">root → left</div>
        <div className="absolute top-[82%] right-[6%] font-mono text-[11px] text-violet-800/15 dark:text-violet-300/10 tracking-widest hidden lg:block">dp[i][j]</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-22 pb-16 space-y-10 sm:space-y-12 lg:space-y-14">

        {/* ═════════════════════════════════════════════════════════════════════
            1. ABOUT HERO
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 dark:bg-blue-500/15 border border-blue-200/90 dark:border-blue-500/30 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 shadow-2xs">
            <span>ABOUT ALGOLEARN</span>
          </div>

          {/* Compact Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.18] text-[#0F172A] dark:text-white">
            Built for learners.<br />
            Designed for{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
              understanding.
            </span>
          </h1>

          {/* Compact Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto pt-1">
            AlgoLearn is an interactive Data Structures and Algorithms learning platform that helps you truly understand concepts through visualization, practice, and guidance.
          </p>
        </motion.div>

        {/* ═════════════════════════════════════════════════════════════════════
            2. LARGE HORIZONTAL ABOUT ALGOLEARN DESCRIPTION BOX
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-white dark:bg-[#0B1224] border border-blue-200/80 dark:border-blue-900/40 p-7 sm:p-10 shadow-[0_10px_35px_-5px_rgba(37,99,235,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.18)] relative overflow-hidden backdrop-blur-xl transition-colors duration-300"
        >
          {/* Top Accent Stripe: Blue -> Indigo -> Violet */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Info className="w-3.5 h-3.5" />
                <span>ABOUT ALGOLEARN</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                Learning DSA should be{' '}
                <span className="text-blue-600 dark:text-blue-400 font-bold">understood</span>, not{' '}
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">memorized.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We bring structured learning, visual explanations, interactive challenges, quizzes, and intelligent guidance together in one focused experience to turn complex concepts into real clarity.
              </p>
            </div>

            {/* Right Content: 4 Connected Conceptual Icon Nodes */}
            <div className="lg:col-span-6 lg:border-l lg:border-blue-100 dark:lg:border-blue-900/40 lg:pl-8 pt-6 lg:pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
                {/* Connecting Dotted Line (Desktop) */}
                <div className="hidden sm:block absolute top-7 left-8 right-8 h-px border-t-2 border-dashed border-blue-200 dark:border-blue-800/60 z-0" />

                {CONCEPTUAL_STEPS.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.title} className="flex flex-col items-center text-center space-y-2 relative z-10 group">
                      <div className={`w-14 h-14 rounded-full border ${step.bgColor} ${step.glow} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 bg-white dark:bg-[#0c1530]`}>
                        <StepIcon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════════════════════
            3. OUR MISSION
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-indigo-50/70 dark:from-[#0a1128]/95 dark:via-[#0c1432]/90 dark:to-[#0f173d]/95 border border-blue-200/90 dark:border-blue-900/40 p-7 sm:p-10 shadow-[0_10px_35px_-5px_rgba(37,99,235,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.18)] relative overflow-hidden backdrop-blur-xl transition-colors duration-300"
        >
          {/* Subtle Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* LEFT — MISSION STATEMENT */}
            <div className="lg:col-span-6 text-left">
              {/* Mission Label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl sm:text-5xl text-blue-500/40 dark:text-blue-400/40 font-serif leading-none">
                  “
                </span>
                <span className="relative inline-flex items-center text-sm font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400 pb-1">
                  OUR MISSION
                  <span className="absolute bottom-0 left-0 w-9 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
                </span>
              </div>

              {/* Main Mission Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] dark:text-white tracking-[-0.035em] leading-[1.08]">
                We don't just teach DSA.
                <br />
                We make you{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
                  experience it.
                </span>
              </h2>
            </div>

            {/* RIGHT — SUPPORTING MESSAGE */}
            <div className="lg:col-span-6 lg:border-l lg:border-blue-200/90 dark:lg:border-blue-900/40 lg:pl-10 text-left">
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-7">
                We believe understanding comes from seeing, interacting,
                practicing, and challenging yourself. That's why AlgoLearn
                combines visual learning, active participation, and intelligent
                assistance to turn complex concepts into real clarity.
              </p>

              {/* Supporting Line */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-7 pt-5 border-t border-blue-200/70 dark:border-blue-900/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Learn it.</span>
                </div>

                <div className="h-4 w-px bg-blue-200 dark:bg-blue-900/60" />

                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <Eye className="w-4 h-4" />
                  <span>See it.</span>
                </div>

                <div className="h-4 w-px bg-blue-200 dark:bg-blue-900/60" />

                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play it.</span>
                </div>

                <div className="h-4 w-px bg-indigo-200 dark:bg-indigo-900/60" />

                <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                  <Trophy className="w-4 h-4" />
                  <span>Prove it.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════════════════════
            4. WHAT MAKES ALGOLEARN DIFFERENT?
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 text-center"
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 block">
              WHAT MAKES US DIFFERENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              More than just another DSA platform
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              A learning experience crafted to help you think, explore and master.
            </p>
          </div>

          {/* One Horizontal Container with 4 Columns & Vertical Dividers */}
          <div className="rounded-3xl bg-white dark:bg-[#0B1224] border border-blue-200/80 dark:border-blue-900/40 p-6 sm:p-8 shadow-[0_10px_35px_-5px_rgba(37,99,235,0.08)] dark:shadow-none transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-blue-100 dark:divide-blue-900/40">
              {DIFFERENTIATORS.map((diff, idx) => {
                const DiffIcon = diff.icon;
                return (
                  <div
                    key={diff.title}
                    className={`flex flex-col items-center text-center p-4 lg:px-6 space-y-3 ${idx !== 0 ? 'pt-6 sm:pt-4 lg:pt-0' : ''
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${diff.bgIcon} flex items-center justify-center shadow-xs mb-1`}>
                      <DiffIcon className={`w-5 h-5 ${diff.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white tracking-tight">
                      {diff.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════════════════════
            5. MEET THE TEAM
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 text-center"
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 block">
              MEET THE TEAM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Meet{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-300 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
          </div>

          {/* 5-Column Grid on Desktop (2 rows of 5) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                id={`team-member-${member.id}`}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B1224] border border-blue-100/90 dark:border-blue-900/40 hover:border-violet-500/80 dark:hover:border-violet-500/80 transition-all duration-200 flex flex-col items-center text-center space-y-3 group shadow-[0_4px_16px_-4px_rgba(37,99,235,0.06)] hover:shadow-[0_10px_28px_-6px_rgba(37,99,235,0.15)] dark:shadow-none hover:-translate-y-1"
              >
                {/* Circular Avatar with Gradient Ring */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.gradRing} p-[2px] shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0`}
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover bg-white dark:bg-[#090d1f]"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white font-bold text-lg font-mono shadow-inner`}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-2 pt-1 text-slate-400 dark:text-slate-500">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════════════════════
            6. FINAL CTA
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 dark:from-[#060d26] dark:via-[#0c1436] dark:to-[#0f173d] border border-blue-700/40 dark:border-blue-600/30 p-7 sm:p-10 shadow-[0_15px_40px_-5px_rgba(37,99,235,0.25)] text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Subtle Decorative Rocket Icon Glow */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0 shadow-lg shadow-blue-500/20">
              <Rocket className="w-7 h-7" />
            </div>
            <div className="text-left space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Ready to experience<br className="hidden sm:inline" />
                <span className="text-blue-300 font-bold"> DSA differently?</span>
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/80">
                Join thousands of learners and take your skills to the next level.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleStartLearning}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              id="about-cta-start-learning-btn"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleStartLearning}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
              id="about-cta-explore-topics-btn"
            >
              Explore Topics
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
