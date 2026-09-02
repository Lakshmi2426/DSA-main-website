import React from 'react';
import logoLight from '../../assets/images/logo-light.png';
import logoDark from '../../assets/images/logo-dark.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11 lg:h-12',
    lg: 'h-13 sm:h-15',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Light mode logo — exact attached AlgoLearn brand logo */}
      <img
        src={logoLight}
        alt="AlgoLearn - YOUR DSA JOURNEY"
        className={`${heightClasses} w-auto max-w-none object-contain block dark:hidden transition-transform duration-200 group-hover:scale-102`}
      />
      {/* Dark mode logo — exact attached AlgoLearn brand logo for dark backgrounds */}
      <img
        src={logoDark}
        alt="AlgoLearn - YOUR DSA JOURNEY"
        className={`${heightClasses} w-auto max-w-none object-contain hidden dark:block transition-transform duration-200 group-hover:scale-102`}
      />
    </div>
  );
};
