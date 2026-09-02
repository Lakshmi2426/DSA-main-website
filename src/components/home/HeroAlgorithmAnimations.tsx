import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// =========================================================================
// 1. BUBBLE SORT ANIMATION
// Array: [7, 3, 9, 2, 5]
// Multi-step animated adjacent comparisons, physical curved swaps,
// progressive sorted locks, and final array celebration glow
// =========================================================================
export const BubbleSortHeroAnim: React.FC = () => {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: [7, 3, 9, 2, 5] - Compare 7 & 3
  // 1: [3, 7, 9, 2, 5] - Swap 7 & 3
  // 2: [3, 7, 9, 2, 5] - Compare 7 & 9 (no swap)
  // 3: [3, 7, 9, 2, 5] - Compare 9 & 2
  // 4: [3, 7, 2, 9, 5] - Swap 9 & 2
  // 5: [3, 7, 2, 9, 5] - Compare 9 & 5
  // 6: [3, 7, 2, 5, 9] - Swap 9 & 5 -> 9 is locked as sorted!
  // 7: [3, 7, 2, 5, 9] - Next pass compare 7 & 2
  // 8: [3, 2, 7, 5, 9] - Swap 7 & 2
  // 9: [2, 3, 5, 7, 9] - Fully Sorted Array Celebration!
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 10);
    }, 1700);
    return () => clearInterval(timer);
  }, []);

  const getArrayState = () => {
    switch (step) {
      case 0:
        return {
          items: [
            { id: '7', val: 7 },
            { id: '3', val: 3 },
            { id: '9', val: 9 },
            { id: '2', val: 2 },
            { id: '5', val: 5 },
          ],
          comparing: [0, 1],
          swapping: false,
          sortedIds: [],
          status: 'Compare 7 > 3 (Out of order)',
        };
      case 1:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '9', val: 9 },
            { id: '2', val: 2 },
            { id: '5', val: 5 },
          ],
          comparing: [0, 1],
          swapping: true,
          sortedIds: [],
          status: 'Swap 7 and 3',
        };
      case 2:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '9', val: 9 },
            { id: '2', val: 2 },
            { id: '5', val: 5 },
          ],
          comparing: [1, 2],
          swapping: false,
          sortedIds: [],
          status: 'Compare 7 < 9 (In order)',
        };
      case 3:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '9', val: 9 },
            { id: '2', val: 2 },
            { id: '5', val: 5 },
          ],
          comparing: [2, 3],
          swapping: false,
          sortedIds: [],
          status: 'Compare 9 > 2 (Out of order)',
        };
      case 4:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '2', val: 2 },
            { id: '9', val: 9 },
            { id: '5', val: 5 },
          ],
          comparing: [2, 3],
          swapping: true,
          sortedIds: [],
          status: 'Swap 9 and 2',
        };
      case 5:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '2', val: 2 },
            { id: '9', val: 9 },
            { id: '5', val: 5 },
          ],
          comparing: [3, 4],
          swapping: false,
          sortedIds: [],
          status: 'Compare 9 > 5 (Out of order)',
        };
      case 6:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '2', val: 2 },
            { id: '5', val: 5 },
            { id: '9', val: 9 },
          ],
          comparing: [3, 4],
          swapping: true,
          sortedIds: ['9'],
          status: 'Swap 9 and 5 → 9 Locked ✓',
        };
      case 7:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '7', val: 7 },
            { id: '2', val: 2 },
            { id: '5', val: 5 },
            { id: '9', val: 9 },
          ],
          comparing: [1, 2],
          swapping: false,
          sortedIds: ['9'],
          status: 'Pass 2: Compare 7 > 2',
        };
      case 8:
        return {
          items: [
            { id: '3', val: 3 },
            { id: '2', val: 2 },
            { id: '7', val: 7 },
            { id: '5', val: 5 },
            { id: '9', val: 9 },
          ],
          comparing: [1, 2],
          swapping: true,
          sortedIds: ['9'],
          status: 'Swap 7 and 2',
        };
      case 9:
      default:
        return {
          items: [
            { id: '2', val: 2 },
            { id: '3', val: 3 },
            { id: '5', val: 5 },
            { id: '7', val: 7 },
            { id: '9', val: 9 },
          ],
          comparing: [],
          swapping: false,
          sortedIds: ['2', '3', '5', '7', '9'],
          status: 'Array Fully Sorted ✓',
        };
    }
  };

  const { items, comparing, swapping, sortedIds, status } = getArrayState();

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none font-mono">
      {/* Top Status Beam */}
      <div className="flex items-center justify-between text-[10px] px-1">
        <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          Bubble Invariant
        </span>
        <span className="text-slate-700 dark:text-slate-200 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 font-semibold text-[9.5px]">
          {status}
        </span>
      </div>

      {/* Main Bars and Blocks Visualization */}
      <div className="flex items-end justify-center gap-2 h-[112px] px-1 py-1">
        {items.map((item, idx) => {
          const isComparing = comparing.includes(idx);
          const isSorted = sortedIds.includes(item.id);
          const heightPercent = 35 + (item.val / 9) * 55;

          return (
            <motion.div
              key={item.id}
              layout
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 24,
              }}
              className="flex flex-col items-center gap-1 flex-1 max-w-[42px]"
            >
              {/* Dynamic Bar Element */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full min-h-[38px] rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all duration-300 relative ${
                  isSorted
                    ? 'bg-gradient-to-t from-blue-600 via-indigo-600 to-violet-600 text-white ring-2 ring-indigo-300/80 shadow-[0_0_14px_rgba(79,70,229,0.55)] scale-105'
                    : isComparing
                    ? swapping
                      ? 'bg-violet-600 text-white ring-2 ring-violet-300 shadow-[0_0_14px_rgba(124,58,237,0.55)] -translate-y-1 scale-110'
                      : 'bg-blue-600 text-white ring-2 ring-blue-300 shadow-[0_0_12px_rgba(37,99,235,0.45)] scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-2xs'
                }`}
              >
                <span>{item.val}</span>
                {isComparing && (
                  <span className="text-[7px] text-blue-100 uppercase leading-none font-bold">
                    {swapping ? 'SWAP' : 'CMP'}
                  </span>
                )}
                {isSorted && (
                  <span className="text-[7px] text-blue-200 leading-none font-bold">
                    ✓
                  </span>
                )}
              </div>

              {/* Index */}
              <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">[{idx}]</span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Step Progression */}
      <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-100/70 dark:border-slate-800/70 px-1">
        <span>Step {step + 1} / 10</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === step ? 'w-3 bg-blue-600 dark:bg-blue-400' : 'w-1 bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. BINARY SEARCH ANIMATION
// Sorted Array: [3, 7, 12, 18, 25, 34, 48]
// Target: 25
// Midpoint calculation, dynamic interval shrinking, and target discovery pulse
// =========================================================================
export const BinarySearchHeroAnim: React.FC = () => {
  const [phase, setPhase] = useState(0);

  const array = [3, 7, 12, 18, 25, 34, 48];
  const target = 25;

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getSearchState = () => {
    switch (phase) {
      case 0:
        return {
          midIdx: 3, // val 18
          low: 0,
          high: 6,
          eliminated: [],
          matched: false,
          status: 'Mid=18. Target 25 > 18 → Discard Left',
        };
      case 1:
        return {
          midIdx: 5, // val 34
          low: 4,
          high: 6,
          eliminated: [0, 1, 2, 3],
          matched: false,
          status: 'Mid=34. Target 25 < 34 → Discard Right',
        };
      case 2:
        return {
          midIdx: 4, // val 25
          low: 4,
          high: 4,
          eliminated: [0, 1, 2, 3, 5, 6],
          matched: true,
          status: 'Mid=25. Target MATCH! ✓',
        };
      case 3:
        return {
          midIdx: 4,
          low: 4,
          high: 4,
          eliminated: [0, 1, 2, 3, 5, 6],
          matched: true,
          status: 'Found in 3 Steps • O(log N)',
        };
      case 4:
      default:
        return {
          midIdx: 4,
          low: 4,
          high: 4,
          eliminated: [0, 1, 2, 3, 5, 6],
          matched: true,
          status: 'Interval Halved Each Step',
        };
    }
  };

  const { midIdx, low, high, eliminated, matched, status } = getSearchState();

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[10px] px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400">Target:</span>
          <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-[9px] shadow-xs">
            {target}
          </span>
        </div>
        <span className="text-[9.5px] text-blue-600 dark:text-blue-400 font-bold">
          {status}
        </span>
      </div>

      {/* Array Elements Visualizer */}
      <div className="flex items-center justify-between gap-1 px-0.5 my-auto">
        {array.map((val, idx) => {
          const isMid = idx === midIdx;
          const isElim = eliminated.includes(idx);
          const isTargetMatch = matched && idx === 4;
          const isLow = idx === low;
          const isHigh = idx === high;

          return (
            <div key={idx} className="flex flex-col items-center gap-0.5 flex-1">
              {/* Pointer indicator */}
              <div className="h-3.5 flex items-center justify-center">
                {isMid ? (
                  <span className="text-[7.5px] font-bold text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/80 px-1 rounded">
                    MID
                  </span>
                ) : isLow && !isElim ? (
                  <span className="text-[7px] font-bold text-indigo-600 dark:text-indigo-400">L</span>
                ) : isHigh && !isElim ? (
                  <span className="text-[7px] font-bold text-indigo-600 dark:text-indigo-400">R</span>
                ) : null}
              </div>

              {/* Element Box */}
              <motion.div
                animate={
                  isTargetMatch
                    ? {
                        scale: [1, 1.12, 1],
                        boxShadow: [
                          '0 0 0px #3b82f6',
                          '0 0 16px rgba(59,130,246,0.85)',
                          '0 0 0px #3b82f6',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.2, repeat: isTargetMatch ? Infinity : 0 }}
                className={`w-full h-10.5 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isTargetMatch
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white ring-2 ring-blue-300 shadow-md'
                    : isMid
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300 shadow-md scale-105'
                    : isElim
                    ? 'bg-slate-100/40 dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 border border-slate-200/40 dark:border-slate-800/40 line-through opacity-35'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs'
                }`}
              >
                {val}
              </motion.div>

              {/* Index */}
              <span className="text-[8px] text-slate-400">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Footer Range Tracker */}
      <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-100/70 dark:border-slate-800/70 px-1">
        <span>Active Search Window: [{low}..{high}]</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-bold">O(log N) Time</span>
      </div>
    </div>
  );
};

// =========================================================================
// 3. LINKED LIST ANIMATION
// Realistic node insertion between Node [10] and Node [30]
// Dynamic SVG connection lines with flowing dashes and reconnect animations
// =========================================================================
export const LinkedListHeroAnim: React.FC = () => {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: [10] ────────▶ [30] (Initial list)
  // 1: Node [20] allocated above
  // 2: Link breaks & [20] glides into center
  // 3: Reconnecting pointers: [10] -> [20] -> [30]
  // 4: Complete and settled
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[10px] px-1">
        <span className="text-blue-600 dark:text-blue-400 font-bold">Dynamic Node Links</span>
        <span className="text-slate-700 dark:text-slate-300 font-semibold text-[9.5px]">
          {step === 0
            ? 'Initial Chain: 10 → 30'
            : step === 1
            ? 'Allocate Node(20)'
            : step === 2
            ? 'Splitting Old Pointer'
            : step === 3
            ? 'Reconnecting Pointers'
            : 'Insertion Complete ✓'}
        </span>
      </div>

      {/* Nodes and Links Stage with animated SVG connectors */}
      <div className="flex items-center justify-center gap-2 h-[105px] relative px-1">
        {/* Node 1: [10] */}
        <div className="flex flex-col items-center z-10">
          <div className="w-14 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/90 border-2 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-blue-200 flex flex-col justify-between p-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-[10.5px] font-bold">
              <span>10</span>
              <span className="text-[6.5px] bg-blue-200 dark:bg-blue-900 px-1 rounded font-bold">HEAD</span>
            </div>
            <div className="text-[8px] text-blue-500 dark:text-blue-400 flex items-center justify-between border-t border-blue-200 dark:border-blue-800 pt-0.5">
              <span>next</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">●</span>
            </div>
          </div>
        </div>

        {/* Animated Dynamic SVG Pointer 1 */}
        <div className="w-8 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
          <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 16">
            <defs>
              <marker id="arrow1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#3b82f6" />
              </marker>
            </defs>
            <motion.path
              d="M 0 8 L 28 8"
              stroke="#3b82f6"
              strokeWidth="2"
              markerEnd="url(#arrow1)"
              strokeDasharray={step === 2 ? '3 3' : 'none'}
              animate={{
                strokeDashoffset: [0, -10],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        {/* Node 2: [20] (Inserted Node) */}
        <motion.div
          animate={
            step === 0
              ? { opacity: 0, y: -26, scale: 0.8 }
              : step === 1
              ? { opacity: 1, y: -16, scale: 1 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="flex flex-col items-center relative z-20"
        >
          <div
            className={`w-14 h-12 rounded-xl border-2 flex flex-col justify-between p-1.5 shadow-md transition-all duration-300 ${
              step >= 3
                ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white border-violet-300 ring-2 ring-violet-300/70 shadow-[0_0_14px_rgba(124,58,237,0.45)]'
                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border-indigo-400'
            }`}
          >
            <div className="flex justify-between items-center text-[10.5px] font-bold">
              <span>20</span>
              <span className="text-[6.5px] bg-white/25 px-1 rounded font-bold">NEW</span>
            </div>
            <div className="text-[8px] opacity-90 flex items-center justify-between border-t border-white/30 pt-0.5">
              <span>next</span>
              <span className="font-bold">●</span>
            </div>
          </div>
        </motion.div>

        {/* Animated Dynamic SVG Pointer 2 */}
        <div className="w-8 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
          <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 16">
            <defs>
              <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366f1" />
              </marker>
            </defs>
            <motion.path
              d="M 0 8 L 28 8"
              stroke="#6366f1"
              strokeWidth="2"
              markerEnd="url(#arrow2)"
              animate={{
                strokeDashoffset: [0, -10],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        {/* Node 3: [30] */}
        <div className="flex flex-col items-center z-10">
          <div className="w-14 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 flex flex-col justify-between p-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-[10.5px] font-bold">
              <span>30</span>
              <span className="text-[6.5px] bg-slate-200 dark:bg-slate-700 px-1 rounded font-bold">TAIL</span>
            </div>
            <div className="text-[8px] text-slate-400 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-0.5">
              <span>next</span>
              <span className="font-bold">NULL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-100/70 dark:border-slate-800/70 px-1">
        <span>O(1) Link Update Invariant</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">Pointer Chain</span>
      </div>
    </div>
  );
};

// =========================================================================
// 4. STACK (LIFO) ANIMATION
// High-fidelity vertical acrylic chamber
// PUSH drops top item with physics bounce; POP lifts top item upward and away
// =========================================================================
export const StackHeroAnim: React.FC = () => {
  const [phase, setPhase] = useState<'base' | 'pushing' | 'full' | 'popping'>('base');

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'base') return 'pushing';
        if (prev === 'pushing') return 'full';
        if (prev === 'full') return 'popping';
        return 'base';
      });
    }, 1600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none font-mono">
      {/* Header */}
      <div className="flex items-center justify-between text-[10px] px-1">
        <span className="text-blue-600 dark:text-blue-400 font-bold">LIFO Top Boundary</span>
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all ${
            phase === 'pushing' || phase === 'full'
              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300'
          }`}
        >
          {phase === 'pushing' ? 'PUSH(42) ↓' : phase === 'popping' ? 'POP() ↑' : 'Top Pointer'}
        </span>
      </div>

      {/* Stack Chamber */}
      <div className="flex items-center justify-center h-[105px] relative">
        <div className="w-48 border-x-2 border-b-2 border-blue-400 dark:border-blue-500/70 rounded-b-2xl p-1.5 bg-blue-50/40 dark:bg-slate-900/80 flex flex-col justify-end gap-1.5 h-full relative overflow-visible shadow-inner">
          {/* Animated top element [42] */}
          <AnimatePresence>
            {(phase === 'pushing' || phase === 'full') && (
              <motion.div
                initial={{ y: -42, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -42, opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold flex items-center justify-between text-[11px] shadow-sm shadow-blue-500/30 ring-2 ring-indigo-300/60"
              >
                <span>[ 42 : Top Item ]</span>
                <span className="text-[7.5px] bg-white/25 px-1.5 py-0.5 rounded font-mono">
                  TOP →
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Base Element 2 [19] */}
          <div className="w-full py-1 px-3 rounded-xl bg-indigo-100/90 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between text-[11px] font-semibold border border-indigo-200 dark:border-slate-700">
            <span>[ 19 : Node ]</span>
            <span className="text-[8px] text-slate-400 font-mono">
              {phase === 'base' || phase === 'popping' ? 'TOP (idx: 1)' : 'idx: 1'}
            </span>
          </div>

          {/* Base Element 1 [07] */}
          <div className="w-full py-1 px-3 rounded-xl bg-blue-50/70 dark:bg-slate-950 text-slate-700 dark:text-slate-300 flex items-center justify-between text-[10.5px] border border-blue-100 dark:border-slate-900">
            <span>[ 07 : Base ]</span>
            <span className="text-[8px] text-slate-400 font-mono">idx: 0 (Base)</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-100/70 dark:border-slate-800/70 px-1">
        <span>O(1) Push / Pop Operation</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">Strict Top Access</span>
      </div>
    </div>
  );
};

// =========================================================================
// 5. QUEUE (FIFO) ANIMATION
// Smooth horizontal pipeline
// Enqueue at Rear (right) and Dequeue at Front (left)
// =========================================================================
export const QueueHeroAnim: React.FC = () => {
  const [phase, setPhase] = useState(0);

  // 0: [10, 20, 30]
  // 1: [40] enqueues from Rear (right)
  // 2: [10] dequeues from Front (left)
  // 3: [20, 30, 40] shifted steady
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[10px] px-1">
        <span className="text-blue-600 dark:text-blue-400 font-bold">FIFO Queue Stream</span>
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
            phase === 1
              ? 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300'
              : phase === 2
              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {phase === 1 ? 'ENQUEUE(40) →' : phase === 2 ? '← DEQUEUE(10)' : 'Stream Active'}
        </span>
      </div>

      {/* Horizontal Tube */}
      <div className="flex items-center justify-between gap-1.5 h-[98px] px-1 relative">
        {/* Left Dequeue Exit */}
        <div className="flex flex-col items-center justify-center text-[8.5px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
          <span>FRONT</span>
          <span>← OUT</span>
        </div>

        {/* Queue Items Track */}
        <div className="flex-1 flex items-center justify-center gap-1.5 border-y-2 border-blue-300 dark:border-blue-700/60 py-2.5 px-2 rounded-2xl bg-blue-50/30 dark:bg-slate-900/60 overflow-hidden">
          {/* Item 10 */}
          <AnimatePresence>
            {phase !== 2 && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35 }}
                className="w-10 h-11 rounded-xl bg-blue-600 text-white font-bold text-xs flex flex-col items-center justify-center shadow-xs ring-1 ring-white/30"
              >
                <span>10</span>
                <span className="text-[6.5px] text-blue-200 font-bold">FRONT</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Item 20 */}
          <div className="w-10 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-bold text-xs flex flex-col items-center justify-center border border-blue-300 dark:border-blue-800">
            <span>20</span>
          </div>

          {/* Item 30 */}
          <div className="w-10 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-bold text-xs flex flex-col items-center justify-center border border-blue-300 dark:border-blue-800">
            <span>30</span>
          </div>

          {/* Item 40 */}
          <AnimatePresence>
            {(phase === 1 || phase === 2) && (
              <motion.div
                initial={{ x: 40, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-10 h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-xs flex flex-col items-center justify-center shadow-sm shadow-indigo-500/30 ring-1 ring-white/30"
              >
                <span>40</span>
                <span className="text-[6.5px] text-indigo-200 font-bold">REAR</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Enqueue Entry */}
        <div className="flex flex-col items-center justify-center text-[8.5px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
          <span>REAR</span>
          <span>← IN</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-100/70 dark:border-slate-800/70 px-1">
        <span>First-In, First-Out (FIFO)</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">O(1) Operations</span>
      </div>
    </div>
  );
};

// =========================================================================
// 6. BINARY SEARCH TREE (BST) ANIMATION
// Balanced Tree: Root 50, Left 30, Right 70 -> Left 60
// Animated search path 50 -> 70 -> 60 with glowing beam and discovery pulse
// =========================================================================
export const BSTHeroAnim: React.FC = () => {
  const [step, setStep] = useState(0);

  // Step 0: Root 50 active
  // Step 1: Branch right to 70 (60 > 50)
  // Step 2: Branch left to 60 (60 < 70)
  // Step 3: Match 60 found with electric blue/violet pulse!
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none font-mono">
      {/* Header */}
      <div className="flex items-center justify-between text-[10px] px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400">Search:</span>
          <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-[9px] shadow-xs">
            60
          </span>
        </div>
        <span className="text-[9.5px] font-bold text-blue-600 dark:text-blue-400">
          {step === 0
            ? '1. 60 > 50 → Branch Right'
            : step === 1
            ? '2. 60 < 70 → Branch Left'
            : '3. Match 60 Found! ✓'}
        </span>
      </div>

      {/* SVG Tree Graph */}
      <div className="relative w-full h-[105px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 100">
          {/* Branch: 50 -> 30 */}
          <line
            x1="120"
            y1="18"
            x2="65"
            y2="52"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* Branch: 50 -> 70 (Active in step >= 1) */}
          <line
            x1="120"
            y1="18"
            x2="175"
            y2="52"
            stroke={step >= 1 ? '#3b82f6' : '#94a3b8'}
            strokeWidth={step >= 1 ? '2.5' : '1.5'}
            className="transition-colors duration-300"
          />

          {/* Branch: 70 -> 60 (Active in step >= 2) */}
          <line
            x1="175"
            y1="52"
            x2="145"
            y2="84"
            stroke={step >= 2 ? '#6366f1' : '#cbd5e1'}
            strokeWidth={step >= 2 ? '2.5' : '1.5'}
            className="transition-colors duration-300"
          />
          {/* Branch: 70 -> 80 */}
          <line x1="175" y1="52" x2="205" y2="84" stroke="#cbd5e1" strokeWidth="1.5" />
        </svg>

        {/* Level 0: Root 50 */}
        <div
          className={`absolute top-0.5 left-[107px] w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-all duration-300 z-10 ${
            step === 0
              ? 'bg-blue-600 text-white ring-3 ring-blue-300 scale-110 shadow-[0_0_14px_rgba(37,99,235,0.6)]'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
          }`}
        >
          50
        </div>

        {/* Level 1: Left 30 */}
        <div className="absolute top-10 left-[50px] w-6.5 h-6.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[9.5px] font-bold z-10">
          30
        </div>

        {/* Level 1: Right 70 */}
        <div
          className={`absolute top-10 left-[162px] w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-all duration-300 z-10 ${
            step === 1
              ? 'bg-blue-600 text-white ring-3 ring-blue-300 scale-110 shadow-[0_0_14px_rgba(37,99,235,0.6)]'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
          }`}
        >
          70
        </div>

        {/* Level 2 Target: 60 */}
        <motion.div
          animate={
            step >= 2
              ? {
                  scale: [1, 1.16, 1],
                  boxShadow: [
                    '0 0 0px #6366f1',
                    '0 0 18px rgba(99,102,241,0.85)',
                    '0 0 0px #6366f1',
                  ],
                }
              : {}
          }
          transition={{ duration: 1.2, repeat: step >= 2 ? Infinity : 0 }}
          className={`absolute bottom-0 left-[131px] w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-all duration-300 z-20 ${
            step >= 2
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white ring-3 ring-indigo-300'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
          }`}
        >
          60
        </motion.div>

        {/* Level 2: 80 */}
        <div className="absolute bottom-0 left-[193px] w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-[8.5px] z-10">
          80
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-100/70 dark:border-slate-800/70 px-1">
        <span>BST Ordering: Left &lt; Root &lt; Right</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">O(log N) Traversal</span>
      </div>
    </div>
  );
};
