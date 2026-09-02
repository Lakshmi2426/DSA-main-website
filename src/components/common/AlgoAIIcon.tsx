import React from 'react';
import mascotImg from '../../assets/images/algo_ai_mascot_1787828426498.jpg';

interface AlgoAIIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showGlow?: boolean;
  alt?: string;
}

const sizeClasses: Record<string, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16',
};

export const AlgoAIIcon: React.FC<AlgoAIIconProps> = ({
  className = '',
  size = 'md',
  showGlow = false,
  alt = 'Algo AI Mascot Icon',
}) => {
  const sizeClass = sizeClasses[size] || 'w-10 h-10';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden select-none ${sizeClass} ${
        showGlow
          ? 'shadow-[0_0_20px_rgba(59,130,246,0.35)] dark:shadow-[0_0_25px_rgba(99,102,241,0.45)]'
          : ''
      } ${className}`}
    >
      <img
        src={mascotImg}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover rounded-full"
        loading="eager"
      />
    </div>
  );
};

export default AlgoAIIcon;
