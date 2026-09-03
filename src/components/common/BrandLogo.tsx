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
  // Height sizing: target around 48px visually balanced with navbar, maintaining aspect ratio
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-[42px] sm:h-[46px] lg:h-[48px]',
    lg: 'h-[50px] sm:h-[54px]',
  }[size];

  return (
    <div
      className={`inline-flex items-center bg-transparent border-0 shadow-none p-0 select-none ${className}`}
      style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
    >
      {/* Light mode brand logo: Graduation cap, AlgoLearn, YOUR DSA JOURNEY */}
      <img
        src={logoLight}
        alt="AlgoLearn - YOUR DSA JOURNEY"
        className={`${heightClasses} w-auto max-w-none object-contain block dark:hidden transition-transform duration-200 group-hover:scale-[1.02]`}
        style={{ height: undefined, width: 'auto' }}
      />
      {/* Dark mode brand logo: Graduation cap, AlgoLearn, YOUR DSA JOURNEY */}
      <img
        src={logoDark}
        alt="AlgoLearn - YOUR DSA JOURNEY"
        className={`${heightClasses} w-auto max-w-none object-contain hidden dark:block transition-transform duration-200 group-hover:scale-[1.02]`}
        style={{ height: undefined, width: 'auto' }}
      />
    </div>
  );
};

export default BrandLogo;
