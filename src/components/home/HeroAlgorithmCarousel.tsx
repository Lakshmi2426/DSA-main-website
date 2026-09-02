import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  BarChart3,
  Search,
  Link2,
  ListOrdered,
  GitBranch,
} from 'lucide-react';
import {
  StackHeroAnim,
  BubbleSortHeroAnim,
  BinarySearchHeroAnim,
  LinkedListHeroAnim,
  QueueHeroAnim,
  BSTHeroAnim,
} from './HeroAlgorithmAnimations';

interface CarouselCardData {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

const CAROUSEL_CARDS: CarouselCardData[] = [
  {
    id: 'stack',
    title: 'Stack (LIFO)',
    category: 'LINEAR STRUCTURE',
    desc: 'Elements enter and leave exclusively from the top, powering call frames and undo buffers.',
    icon: Layers,
    component: StackHeroAnim,
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'SORTING ALGORITHM',
    desc: 'Iteratively compares adjacent elements and physically swaps out-of-order pairs.',
    icon: BarChart3,
    component: BubbleSortHeroAnim,
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'SEARCH ALGORITHM',
    desc: 'Halves the search range on every comparison step within sorted collections.',
    icon: Search,
    component: BinarySearchHeroAnim,
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    category: 'DYNAMIC STRUCTURE',
    desc: 'Sequence of dynamically allocated nodes connected via pointer references.',
    icon: Link2,
    component: LinkedListHeroAnim,
  },
  {
    id: 'queue',
    title: 'Queue (FIFO)',
    category: 'LINEAR STRUCTURE',
    desc: 'First-In, First-Out buffer where items enqueue at the rear and dequeue at the front.',
    icon: ListOrdered,
    component: QueueHeroAnim,
  },
  {
    id: 'binary-search-tree',
    title: 'Binary Search Tree',
    category: 'TREE STRUCTURE',
    desc: 'Enforces sorted invariant: left subtree contains smaller keys, right subtree larger keys.',
    icon: GitBranch,
    component: BSTHeroAnim,
  },
];

export const HeroAlgorithmCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Smooth auto-advance every 5.5s, pauses when hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_CARDS.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_CARDS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  // Calculate circular offset relative to currentIndex (-2, -1, 0, 1, 2)
  const getCardOffset = (index: number) => {
    const total = CAROUSEL_CARDS.length;
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className="relative w-full max-w-[390px] sm:max-w-[420px] h-[460px] sm:h-[480px] flex flex-col items-center justify-between select-none mx-auto py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      id="hero-algorithm-carousel"
    >
      {/* Background Soft Ambient Glow Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-violet-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D Stack Stage */}
      <div className="relative w-[310px] sm:w-[330px] h-[400px] sm:h-[415px] flex items-center justify-center">
        {CAROUSEL_CARDS.map((card, index) => {
          const offset = getCardOffset(index);
          const isCenter = offset === 0;
          const isLeft1 = offset === -1;
          const isLeft2 = offset === -2;
          const isRight1 = offset === 1;
          const isRight2 = offset === 2;
          const isVisible = isCenter || isLeft1 || isLeft2 || isRight1 || isRight2;

          if (!isVisible) return null;

          const AnimComponent = card.component;
          const IconComp = card.icon;

          // Compute exact layered translation, scaling, opacity, and z-index matching reference screenshot
          let translateX = 0;
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;

          if (isLeft1) {
            translateX = -82;
            scale = 0.88;
            zIndex = 20;
            opacity = 0.48;
          } else if (isLeft2) {
            translateX = -154;
            scale = 0.78;
            zIndex = 10;
            opacity = 0.25;
          } else if (isRight1) {
            translateX = 82;
            scale = 0.88;
            zIndex = 20;
            opacity = 0.48;
          } else if (isRight2) {
            translateX = 154;
            scale = 0.78;
            zIndex = 10;
            opacity = 0.25;
          }

          // Subtle floating motion offset per card
          const floatDelay = (index % 3) * 0.8;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: translateX,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.55,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute inset-0 w-full h-full cursor-pointer"
              onClick={() => {
                if (!isCenter) setCurrentIndex(index);
              }}
            >
              {/* Gentle Floating Motion */}
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 4.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelay,
                }}
                className="w-full h-full"
              >
                {/* Outer Card Shell with Gradient Outline */}
                <div
                  className={`w-full h-full rounded-[28px] p-[1.5px] bg-gradient-to-b ${
                    isCenter
                      ? 'from-blue-600 via-indigo-600 to-violet-600 shadow-[0_18px_38px_-8px_rgba(37,99,235,0.25),0_0_24px_rgba(124,58,237,0.18)] dark:shadow-[0_0_30px_rgba(37,99,235,0.3)]'
                      : 'from-blue-200/50 to-indigo-200/50 dark:from-blue-900/40 dark:to-indigo-900/40 shadow-sm'
                  } transition-all duration-300`}
                >
                  <div className="w-full h-full bg-white/95 dark:bg-[#0c1633] backdrop-blur-xl rounded-[26.5px] p-4 flex flex-col justify-between relative overflow-hidden text-left border border-white/60 dark:border-blue-900/40">
                    {/* Top Glow Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-90" />

                    {/* Top Row: Category Badge & Gradient Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
                        {card.category}
                      </span>
                      <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Topic Title & Description */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    {/* High-Fidelity Algorithm Visualization Box */}
                    <div className="w-full h-[205px] sm:h-[215px] rounded-2xl bg-blue-50/50 dark:bg-slate-950/80 border border-blue-200/70 dark:border-blue-900/50 p-1.5 relative overflow-hidden shadow-inner flex items-center justify-center">
                      <AnimComponent />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Controls Row: [ < ] [ •••••• ] [ > ] Exactly as in Reference Screenshot */}
      <div className="flex items-center justify-center gap-3 z-30 pt-1">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous algorithm"
          className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          id="carousel-prev-btn"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Center Pagination Track with Active Capsule */}
        <div className="bg-blue-50/90 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
          {CAROUSEL_CARDS.map((card, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={card.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to ${card.title}`}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-5 h-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-xs'
                    : 'w-1.5 h-1.5 rounded-full bg-blue-200 dark:bg-slate-700 hover:bg-blue-400'
                }`}
              />
            );
          })}
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next algorithm"
          className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          id="carousel-next-btn"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
