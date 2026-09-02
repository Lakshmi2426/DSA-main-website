import React, { useState, useRef } from 'react';
import {
  MessageCircle,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCheck,
  Star,
  Users,
  MessageSquare,
  Send,
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface TeacherPreviewSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  onQuickAsk?: (prompt: string) => void;
}

// Feature strip — replaces AI feature strip
const FEATURE_STRIP = [
  {
    icon: Users,
    title: 'Real Teachers',
    subtitle: '5 DSA expert educators',
    iconWrap: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
  },
  {
    icon: Clock,
    title: 'Fast Replies',
    subtitle: 'Responses within hours',
    iconWrap: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60',
  },
  {
    icon: BookOpen,
    title: 'Topic-Linked',
    subtitle: 'Questions tied to modules',
    iconWrap: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60',
  },
  {
    icon: CheckCheck,
    title: 'Clear Answers',
    subtitle: 'Step-by-step guidance',
    iconWrap: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
  },
];

// Sample questions students would ask a teacher
const SAMPLE_QUESTIONS = [
  { id: 'q1', label: "Why does Merge Sort have O(n log n) complexity?", icon: MessageSquare },
  { id: 'q2', label: "How do I detect a cycle in a Linked List?", icon: MessageSquare },
  { id: 'q3', label: "What is the difference between BFS and DFS?", icon: MessageSquare },
  { id: 'q4', label: "When should I use a heap vs a sorted array?", icon: MessageSquare },
  { id: 'q5', label: "How does Dijkstra's algorithm handle negative weights?", icon: MessageSquare },
  { id: 'q6', label: "Can you explain the recursion behind Tower of Hanoi?", icon: MessageSquare },
];

// Faint background DSA labels
const BACKGROUND_DSA_TOKENS = [
  { text: 'O(n log n)', top: '12%', left: '8%', rotate: '-6deg' },
  { text: 'stack<int>', top: '24%', left: '88%', rotate: '8deg' },
  { text: 'vector<int>', top: '75%', left: '6%', rotate: '4deg' },
  { text: 'node*', top: '82%', left: '86%', rotate: '-5deg' },
  { text: 'visited[]', top: '48%', left: '3%', rotate: '-12deg' },
  { text: 'queue<>', top: '35%', left: '92%', rotate: '6deg' },
  { text: 'hash[key]', top: '65%', left: '94%', rotate: '-8deg' },
  { text: 'O(log n)', top: '8%', left: '78%', rotate: '5deg' },
  { text: 'O(n)', top: '90%', left: '42%', rotate: '2deg' },
];

export const AIAssistantPreviewSection: React.FC<TeacherPreviewSectionProps> = ({
  setActiveTab,
  onQuickAsk,
}) => {
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectSuggestion = (label: string) => {
    setInputVal(label);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    // Navigate to the teacher workspace
    if (onQuickAsk) onQuickAsk(inputVal.trim());
    setActiveTab('ask-teacher');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-14 sm:py-18 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#F0F4FE] dark:bg-[#060c1d] transition-colors duration-300" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-500/10 via-indigo-500/8 to-violet-500/10 dark:from-blue-600/12 dark:via-indigo-600/10 dark:to-violet-600/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-indigo-500/5 dark:bg-blue-600/6 blur-[120px] rounded-full" />

        {/* Grid dot pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.04] text-blue-600 dark:text-blue-400">
          <defs>
            <pattern id="grid-graph-teacher" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              <circle cx="100" cy="20" r="2" fill="currentColor" />
              <circle cx="60" cy="80" r="2.5" fill="currentColor" />
              <path
                d="M 20 20 L 100 20 M 20 20 L 60 80 M 100 20 L 60 80"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="2 4"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-graph-teacher)" />
        </svg>

        {/* Faint DSA tokens */}
        {BACKGROUND_DSA_TOKENS.map((token, idx) => (
          <div
            key={idx}
            style={{ top: token.top, left: token.left, transform: `rotate(${token.rotate})` }}
            className="absolute font-mono text-[11px] sm:text-xs font-semibold text-blue-800/15 dark:text-indigo-300/12 tracking-wider select-none pointer-events-none hidden md:block"
          >
            {token.text}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-mono font-semibold tracking-wide uppercase mb-3 shadow-2xs">
            <MessageCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Ask a Teacher</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2.5">
            <span className="text-[#0F172A] dark:text-[#F8FAFC]">Have a question? </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
              Ask a Teacher.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-[#52627D] dark:text-[#A8B6CC] max-w-2xl mx-auto leading-relaxed">
            Stuck on a concept? Our DSA teachers are here to help. Send your question and get a clear, step-by-step answer.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 text-left">
          {FEATURE_STRIP.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#0B1224] border border-[#D8E2F5] dark:border-[#243554] flex items-start gap-3 h-full shadow-xs transition-colors duration-200"
                id={`teacher-feature-${idx}`}
              >
                <div className={`w-8 h-8 rounded-xl ${item.iconWrap} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#52627D] dark:text-[#A8B6CC] leading-tight mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Preview Window */}
        <div className="max-w-4xl mx-auto rounded-[24px] bg-white dark:bg-[#0B1224] border border-[#D8E2F5] dark:border-[#243554] shadow-sm backdrop-blur-xl overflow-hidden text-left relative transition-colors duration-300">
          {/* Top gradient line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]" />

          {/* Window Header */}
          <div className="px-5 sm:px-6 py-3.5 bg-[#F1F5FF] dark:bg-[#0F172A] border-b border-[#D8E2F5] dark:border-[#243554] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-[1px] shadow-xs">
                <div className="w-full h-full bg-white dark:bg-[#0B1224] rounded-[11px] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                    Dr. Priya Sharma
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800/60 font-semibold">
                    DSA Expert
                  </span>
                </div>
                <p className="text-[11px] text-[#52627D] dark:text-[#A8B6CC]">
                  Data Structures & Algorithms · Trees & Graphs
                </p>
              </div>
            </div>

            {/* Online Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Online</span>
            </div>
          </div>

          {/* Demo Chat */}
          <div className="p-5 sm:p-6 space-y-4 bg-[#F8FAFF] dark:bg-[#080d1a]">
            {/* Student question */}
            <div className="flex items-start justify-end gap-3">
              <div className="p-3.5 rounded-2xl rounded-tr-xs bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white text-xs sm:text-sm max-w-xl shadow-xs leading-relaxed font-medium">
                Why does Merge Sort have O(n log n) time complexity? I'm having trouble understanding the recursion tree.
              </div>
            </div>

            {/* Teacher reply */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-[1px]">
                  <div className="w-full h-full bg-white dark:bg-[#0B1224] rounded-[7px] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 font-mono">PS</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-2xl rounded-tl-xs bg-white dark:bg-[#0F172A] border border-[#D8E2F5] dark:border-[#243554] text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] max-w-2xl space-y-3 leading-relaxed shadow-xs">
                <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  Great question! Let me walk you through it step by step.
                </p>
                <div>
                  <p className="text-[#52627D] dark:text-[#A8B6CC] font-medium mb-1">
                    Merge Sort works in two main phases:
                  </p>
                  <ol className="list-decimal list-inside space-y-0.5 text-[#52627D] dark:text-[#A8B6CC] text-xs sm:text-sm pl-1 font-mono">
                    <li>
                      <span className="font-sans text-[#0F172A] dark:text-[#F8FAFC]">
                        <strong>Divide</strong> — splits the array into halves (log n levels deep)
                      </span>
                    </li>
                    <li>
                      <span className="font-sans text-[#0F172A] dark:text-[#F8FAFC]">
                        <strong>Merge</strong> — merges them back in sorted order (O(n) per level)
                      </span>
                    </li>
                  </ol>
                </div>
                <p className="text-[#52627D] dark:text-[#A8B6CC]">
                  Since the recursion tree has <code className="px-1.5 py-0.5 rounded bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] border border-blue-200 dark:border-blue-800/50">log₂(n)</code> levels and each level does <code className="px-1.5 py-0.5 rounded bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] border border-blue-200 dark:border-blue-800/50">O(n)</code> work, the total is <code className="px-1.5 py-0.5 rounded bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] border border-blue-200 dark:border-blue-800/50">O(n log n)</code>.
                </p>
                {/* Teacher attribution */}
                <div className="flex items-center gap-1.5 pt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span className="text-[10px] text-slate-400 font-mono">Dr. Priya Sharma · 2 min ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Bar */}
          <div className="px-5 sm:px-6 py-3.5 border-t border-[#D8E2F5] dark:border-[#243554] bg-[#F1F5FF] dark:bg-[#0F172A]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold">✦</span>
              <span className="text-xs font-mono font-semibold text-[#52627D] dark:text-[#A8B6CC] tracking-wide uppercase">
                Sample questions to ask
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SAMPLE_QUESTIONS.map((sug) => {
                const SugIcon = sug.icon;
                return (
                  <button
                    key={sug.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug.label)}
                    className="group px-3 py-1.5 rounded-xl bg-white dark:bg-[#162238] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-[#D8E2F5] dark:border-[#243554] text-[#0F172A] dark:text-[#A8B6CC] hover:text-blue-600 dark:hover:text-white text-xs text-left transition-all duration-200 cursor-pointer flex items-center gap-2"
                    id={`teacher-suggestion-${sug.id}`}
                  >
                    <SugIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform" />
                    <span className="truncate">{sug.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Container */}
          <div className="p-4 sm:p-5 bg-[#F8FAFF] dark:bg-[#080d1a] border-t border-[#D8E2F5] dark:border-[#243554]">
            {/* Gradient outline input */}
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] shadow-xs">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center gap-2 p-1.5 sm:p-2 rounded-[14.5px] bg-white dark:bg-[#0B1224] transition-all"
              >
                {/* Input text field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type your DSA question to ask a teacher..."
                  className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#52627D] dark:placeholder:text-[#A8B6CC] focus:outline-none font-sans"
                  id="teacher-preview-input"
                />

                {/* Send button */}
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    inputVal.trim()
                      ? 'bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white shadow-xs hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700/50 cursor-not-allowed'
                  }`}
                  id="teacher-preview-ask-btn"
                >
                  <span>Send Question</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-[#52627D] dark:text-[#A8B6CC] px-1">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Questions answered by real DSA teachers — not AI</span>
              </span>
              <span className="hidden sm:inline font-mono text-[#52627D]/80 dark:text-[#8FA1BA]">
                Press Enter ↵ to Send
              </span>
            </div>
          </div>
        </div>

        {/* Workspace CTA Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              setActiveTab('ask-teacher');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-[#162238] hover:bg-blue-100 dark:hover:bg-[#1E2E4A] border border-blue-200 dark:border-[#243554] text-xs sm:text-sm font-semibold text-blue-700 dark:text-[#60A5FA] transition-all cursor-pointer shadow-2xs"
            id="open-teacher-workspace-btn"
          >
            <span>Open Teacher Chat &amp; Ask Your Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
