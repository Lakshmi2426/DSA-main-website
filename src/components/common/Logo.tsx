import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11 lg:w-[48px] lg:h-[48px]',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  }[size];

  const titleTextClasses = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px] lg:text-[28px]',
    lg: 'text-3xl sm:text-4xl',
  }[size];

  const taglineTextClasses = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] sm:text-[10px] lg:text-[10.5px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.25em]',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 bg-transparent border-0 p-0 m-0 select-none ${className}`}>
      {/* Graduation Cap — Blue -> Indigo -> Violet Brand System */}
      <svg
        className={`${iconSizeClasses} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mortarboard Top: Blue -> Indigo -> Violet */}
          <linearGradient id="algoLogoCapTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Cap Body: Deep Blue -> Indigo */}
          <linearGradient id="algoLogoCapBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          {/* Tassel: Blue -> Indigo */}
          <linearGradient id="algoLogoTassel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>

        {/* Cap Body */}
        <path
          d="M25 50V64C25 73 36 80 50 80C64 80 75 73 75 64V50"
          fill="url(#algoLogoCapBase)"
        />

        {/* Mortarboard Diamond */}
        <path
          d="M50 16L93 35L50 54L7 35L50 16Z"
          fill="url(#algoLogoCapTop)"
        />

        {/* Highlight Outline */}
        <path
          d="M50 16L93 35L50 54L7 35Z"
          stroke="#93C5FD"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Center Button */}
        <circle cx="50" cy="35" r="3.5" fill="#4F46E5" />

        {/* Tassel Cord */}
        <path
          d="M50 35C62 38 78 44 80 58V67"
          stroke="url(#algoLogoTassel)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tassel Pendant */}
        <ellipse cx="80" cy="71" rx="3.5" ry="5.5" fill="#6366F1" />
      </svg>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col text-left justify-center leading-none">
        {/* Wordmark */}
        <span className={`${titleTextClasses} font-extrabold tracking-tight font-sans leading-none flex items-baseline`}>
          <span className="text-[#0F172A] dark:text-[#FFFFFF] transition-colors duration-200">
            Algo
          </span>
          {/* "Learn" gradient: Blue -> Indigo -> Violet */}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent ml-0.5">
            Learn
          </span>
        </span>

        {/* Tagline */}
        <span className={`${taglineTextClasses} font-mono font-bold text-[#52627D] dark:text-[#94A3B8] uppercase mt-1 leading-none transition-colors duration-200`}>
          YOUR DSA JOURNEY
        </span>
      </div>
    </div>
  );
};
