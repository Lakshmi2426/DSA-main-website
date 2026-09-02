import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Mic,
  BrainCircuit,
  ListOrdered,
  FileCode,
  Zap,
  Bot,
  Layers,
  AlertCircle,
  Database,
  Workflow,
  Search,
} from 'lucide-react';
import { AlgoAIIcon } from '../common/AlgoAIIcon';
import { NavigationTab } from '../../types';

interface AIAssistantPreviewSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  onQuickAsk?: (prompt: string) => void;
}

// 6 Medium-difficulty DSA Suggestion Questions
const DSA_SUGGESTIONS = [
  {
    id: 'dijkstra',
    label: "Explain Dijkstra's algorithm with an example",
    icon: Workflow,
  },
  {
    id: 'binary-search',
    label: 'Why does Binary Search run in O(log n)?',
    icon: Search,
  },
  {
    id: 'cycle-detection',
    label: 'Detect a cycle in a Linked List',
    icon: Layers,
  },
  {
    id: 'min-heap',
    label: 'How does a Min Heap work?',
    icon: Database,
  },
  {
    id: 'topological-sort',
    label: 'Explain Topological Sort with an example',
    icon: ListOrdered,
  },
  {
    id: 'lru-cache',
    label: 'How does an LRU Cache work?',
    icon: BrainCircuit,
  },
];

// Feature Strip Items (Strict Blue -> Indigo -> Violet Palette)
const FEATURE_STRIP = [
  {
    icon: BrainCircuit,
    title: 'DSA Focused',
    subtitle: 'Answers only DSA questions',
    iconWrap: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
  },
  {
    icon: ListOrdered,
    title: 'Step-by-Step',
    subtitle: 'Clear explanations',
    iconWrap: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60',
  },
  {
    icon: FileCode,
    title: 'Code Examples',
    subtitle: 'C++ / Java / Python',
    iconWrap: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60',
  },
  {
    icon: Zap,
    title: 'Always Learning',
    subtitle: 'Learn smarter with AI',
    iconWrap: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
  },
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

export const AIAssistantPreviewSection: React.FC<AIAssistantPreviewSectionProps> = ({
  setActiveTab,
  onQuickAsk,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setInputVal(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission denied.');
        } else if (event.error === 'no-speech') {
          setVoiceError('No speech detected. Try speaking again.');
        } else {
          setVoiceError(`Voice recognition: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition initialization failed:', err);
      setVoiceSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggleVoiceRecognition = () => {
    if (!voiceSupported || !recognitionRef.current) {
      setVoiceError('Voice input is not supported in this browser.');
      setTimeout(() => setVoiceError(null), 4000);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      setVoiceError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
        setIsListening(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    if (onQuickAsk) {
      onQuickAsk(inputVal.trim());
    }
    setActiveTab('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSuggestion = (prompt: string) => {
    setInputVal(prompt);
    inputRef.current?.focus();
  };

  return (
    <section
      className="relative py-12 sm:py-16 lg:py-16 bg-[#F6F8FF] dark:bg-[#050816] text-[#0F172A] dark:text-[#F8FAFC] border-t border-[#D8E2F5] dark:border-[#243554] overflow-hidden select-none transition-colors duration-300"
      id="home-ai-assistant-section"
    >
      {/* 1. SUBTLE BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-500/10 via-indigo-500/8 to-purple-500/10 dark:from-blue-600/12 dark:via-indigo-600/10 dark:to-purple-600/8 blur-[140px] rounded-full" />

        {/* Faint Connected Graph Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.035] text-blue-600 dark:text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-graph"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="currentColor" />
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
          <rect width="100%" height="100%" fill="url(#grid-graph)" />
        </svg>

        {/* Faint Code Tokens */}
        {BACKGROUND_DSA_TOKENS.map((token, idx) => (
          <div
            key={idx}
            style={{
              top: token.top,
              left: token.left,
              transform: `rotate(${token.rotate})`,
            }}
            className="absolute font-mono text-[11px] sm:text-xs font-semibold text-blue-800/15 dark:text-indigo-300/12 tracking-wider select-none pointer-events-none hidden md:block"
          >
            {token.text}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* 2. SECTION HEADER (Controlled Size & Spacing) */}
        <div className="max-w-3xl mx-auto mb-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-mono font-semibold tracking-wide uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>AI ASSISTANT</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2.5">
            <span className="text-[#0F172A] dark:text-[#F8FAFC]">Your DSA </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              Learning Companion
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-[#52627D] dark:text-[#A8B6CC] max-w-2xl mx-auto leading-relaxed">
            Ask DSA questions, get step-by-step explanations, see code, and master concepts with AI.
          </p>
        </div>

        {/* 3. FOUR FEATURE CARDS (EXACT SAME Dimensions & Alignment) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 text-left">
          {FEATURE_STRIP.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#0B1224] border border-[#D8E2F5] dark:border-[#243554] flex items-start gap-3 h-full shadow-xs transition-colors duration-200"
                id={`ai-feature-${idx}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl ${item.iconWrap} flex items-center justify-center shrink-0`}
                >
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

        {/* 4. MAIN CHAT WINDOW WITH HIGHLIGHTED BLUE-VIOLET INPUT BORDER */}
        <div className="max-w-4xl mx-auto rounded-[24px] bg-white dark:bg-[#0B1224] border border-[#D8E2F5] dark:border-[#243554] shadow-sm backdrop-blur-xl overflow-hidden text-left relative transition-colors duration-300">
          {/* Top Gradient Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]" />

          {/* Window Header */}
          <div className="px-5 sm:px-6 py-3.5 bg-[#F1F5FF] dark:bg-[#0F172A] border-b border-[#D8E2F5] dark:border-[#243554] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-[1px] shadow-xs">
                <div className="w-full h-full bg-white dark:bg-[#0B1224] rounded-[11px] flex items-center justify-center">
                  <AlgoAIIcon size="xs" className="w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                    AlgoLearn Assistant
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800/60 font-semibold">
                    DSA Expert
                  </span>
                </div>
                <p className="text-[11px] text-[#52627D] dark:text-[#A8B6CC]">
                  Powered by Gemini • DSA-only intelligence
                </p>
              </div>
            </div>

            {/* Online Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Online</span>
            </div>
          </div>

          {/* 5. CHAT CONVERSATION */}
          <div className="p-5 sm:p-6 space-y-4 bg-[#F8FAFF] dark:bg-[#080d1a]">
            {/* User Query */}
            <div className="flex items-start justify-end gap-3">
              <div className="p-3.5 rounded-2xl rounded-tr-xs bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white text-xs sm:text-sm max-w-xl shadow-xs leading-relaxed font-medium">
                How does Merge Sort work, and why is its time complexity O(n log n)?
              </div>
            </div>

            {/* AI Tutor Response */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-[1px]">
                  <div className="w-full h-full bg-white dark:bg-[#0B1224] rounded-[7px] flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-2xl rounded-tl-xs bg-white dark:bg-[#0F172A] border border-[#D8E2F5] dark:border-[#243554] text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] max-w-2xl space-y-3 leading-relaxed shadow-xs">
                <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  Merge Sort is a divide-and-conquer sorting algorithm.
                </p>

                <div>
                  <p className="text-[#52627D] dark:text-[#A8B6CC] font-medium mb-1">
                    It works in three main steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-0.5 text-[#52627D] dark:text-[#A8B6CC] text-xs sm:text-sm pl-1 font-mono">
                    <li>
                      <span className="font-sans text-[#0F172A] dark:text-[#F8FAFC]">
                        <strong>Divide</strong> the array into two halves.
                      </span>
                    </li>
                    <li>
                      <span className="font-sans text-[#0F172A] dark:text-[#F8FAFC]">
                        <strong>Recursively sort</strong> both halves.
                      </span>
                    </li>
                    <li>
                      <span className="font-sans text-[#0F172A] dark:text-[#F8FAFC]">
                        <strong>Merge</strong> the two sorted halves.
                      </span>
                    </li>
                  </ol>
                </div>

                <p className="text-[#52627D] dark:text-[#A8B6CC]">
                  The array is divided <code className="px-1.5 py-0.5 rounded bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] border border-blue-200 dark:border-blue-800/50">log₂(n)</code> times, and each level requires <code className="px-1.5 py-0.5 rounded bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] border border-blue-200 dark:border-blue-800/50">O(n)</code> work to merge.
                </p>

                {/* Complexity Callout Box */}
                <div className="p-2.5 rounded-xl bg-[#F1F5FF] dark:bg-[#162238] border border-[#D8E2F5] dark:border-[#243554] flex flex-wrap items-center gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#52627D] dark:text-[#8FA1BA]">Time Complexity:</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800/60 font-bold">
                      O(n log n)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#52627D] dark:text-[#8FA1BA]">Space Complexity:</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800/60 font-bold">
                      O(n)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. DSA SUGGESTIONS BAR */}
          <div className="px-5 sm:px-6 py-3.5 border-t border-[#D8E2F5] dark:border-[#243554] bg-[#F1F5FF] dark:bg-[#0F172A]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold">✦</span>
              <span className="text-xs font-mono font-semibold text-[#52627D] dark:text-[#A8B6CC] tracking-wide uppercase">
                Try these DSA questions
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {DSA_SUGGESTIONS.map((sug) => {
                const SugIcon = sug.icon;
                return (
                  <button
                    key={sug.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug.label)}
                    className="group px-3 py-1.5 rounded-xl bg-white dark:bg-[#162238] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-[#D8E2F5] dark:border-[#243554] text-[#0F172A] dark:text-[#A8B6CC] hover:text-blue-600 dark:hover:text-white text-xs text-left transition-all duration-200 cursor-pointer flex items-center gap-2"
                    id={`suggestion-btn-${sug.id}`}
                  >
                    <SugIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform" />
                    <span className="truncate">{sug.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. HIGHLIGHTED AI INPUT CONTAINER WITH BLUE -> VIOLET GRADIENT OUTLINE */}
          <div className="p-4 sm:p-5 bg-[#F8FAFF] dark:bg-[#080d1a] border-t border-[#D8E2F5] dark:border-[#243554]">
            {/* Listening Feedback Bar */}
            {isListening && (
              <div className="mb-3 px-3.5 py-2 rounded-xl bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-500/40 flex items-center justify-between text-xs text-red-700 dark:text-red-200 animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="font-semibold">Listening to your voice... Speak your DSA question</span>
                </div>
                <button
                  type="button"
                  onClick={toggleVoiceRecognition}
                  className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-700 text-[11px] font-mono text-white cursor-pointer"
                >
                  Stop Recording
                </button>
              </div>
            )}

            {/* Error / Fallback Notification */}
            {voiceError && (
              <div className="mb-3 px-3.5 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>{voiceError}</span>
              </div>
            )}

            {/* PROMINENT BLUE -> VIOLET GRADIENT OUTLINE CONTAINER */}
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] shadow-xs">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center gap-2 p-1.5 sm:p-2 rounded-[14.5px] bg-white dark:bg-[#0B1224] transition-all"
              >
                {/* Microphone Button */}
                <button
                  type="button"
                  onClick={toggleVoiceRecognition}
                  title={
                    voiceSupported
                      ? isListening
                        ? 'Stop Voice Input'
                        : 'Ask with Voice (Speech to Text)'
                      : 'Voice input is not supported in this browser'
                  }
                  aria-label="Voice input microphone"
                  className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#F1F5FF] dark:bg-[#162238] hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-[#243554]'
                  }`}
                  id="home-ai-mic-btn"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Input Text Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    isListening
                      ? 'Listening... (Speak your DSA question)'
                      : 'Ask any DSA question...'
                  }
                  className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#52627D] dark:placeholder:text-[#A8B6CC] focus:outline-none font-sans"
                  id="home-ai-input"
                />

                {/* Ask AI Submit Button */}
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    inputVal.trim()
                      ? 'bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white shadow-xs hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700/50 cursor-not-allowed'
                  }`}
                  id="home-ai-ask-btn"
                >
                  <span>Ask AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-[#52627D] dark:text-[#A8B6CC] px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Specialized DSA Tutor for Algorithms, Complexity &amp; Code</span>
              </span>
              <span className="hidden sm:inline font-mono text-[#52627D]/80 dark:text-[#8FA1BA]">
                Press Enter ↵ to Ask
              </span>
            </div>
          </div>
        </div>

        {/* Workspace CTA Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              setActiveTab('ai-assistant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-[#162238] hover:bg-blue-100 dark:hover:bg-[#1E2E4A] border border-blue-200 dark:border-[#243554] text-xs sm:text-sm font-semibold text-blue-700 dark:text-[#60A5FA] transition-all cursor-pointer shadow-2xs"
            id="open-full-ai-workspace-btn"
          >
            <span>Open Full Interactive AI Workspace &amp; Code Debugger</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
