import React from 'react';
import logoLight from '../../assets/images/logo-light.png';
import logoDark from '../../assets/images/logo-dark.png';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Logo height — keeps the original aspect ratio
  const heightClasses = {
  sm: 'h-7 sm:h-8',
  md: 'h-[34px] sm:h-[38px] lg:h-[40px]',
  lg: 'h-[42px] sm:h-[46px]',
}[size];

  return (
    <div
      className={`inline-flex items-center bg-transparent border-0 shadow-none p-0 select-none ${className}`}
      style={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      }}
    >
      {/* Light Mode Logo */}
      <img
        src={logoLight}
        alt="AlgoLearn - YOUR DSA JOURNEY"
        className={`${heightClasses} w-auto max-w-none object-contain block dark:hidden transition-transform duration-200 group-hover:scale-[1.02]`}
      />

      {/* Dark Mode Logo */}
      <img
        src={logoDark}
        alt="AlgoLearn - YOUR DSA JOURNEY"
        className={`${heightClasses} w-auto max-w-none object-contain hidden dark:block transition-transform duration-200 group-hover:scale-[1.02]`}
      />
    </div>
  );
};

export default BrandLogo;