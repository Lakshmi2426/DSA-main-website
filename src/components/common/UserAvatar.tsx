import React, { useState, useEffect } from 'react';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBorder?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-lg',
  '2xl': 'w-20 h-20 text-2xl',
};

/**
 * Cleanly derive uppercase initials from a name
 * e.g. "Elena Rostova" -> "ER", "Kenji Takahashi" -> "KT", "Sophia Chen" -> "SC"
 */
export const getInitials = (nameStr: string = ''): string => {
  const trimmed = nameStr.trim();
  if (!trimmed || /^guest$|^anonymous$/i.test(trimmed)) return '';

  // Remove common academic/professional titles for cleaner initials
  const cleanName = trimmed.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '').trim();
  const parts = cleanName.split(/[\s_-]+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  if (parts.length === 1 && parts[0].length === 1) {
    return parts[0].toUpperCase();
  }
  return '';
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name = '',
  size = 'md',
  className = '',
  showBorder = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // Reset image error if src prop changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  const trimmedSrc = (src || '').trim();
  const hasValidPhotoUrl =
    Boolean(trimmedSrc) &&
    !trimmedSrc.includes('unsplash.com') &&
    trimmedSrc !== 'null' &&
    trimmedSrc !== 'undefined' &&
    (trimmedSrc.startsWith('http://') ||
      trimmedSrc.startsWith('https://') ||
      trimmedSrc.startsWith('/') ||
      trimmedSrc.startsWith('data:image/'));

  const showImage = hasValidPhotoUrl && !imageError;
  const initials = getInitials(name);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden select-none ${sizeClass} ${
        showBorder ? 'border-2 border-blue-500/60 shadow-xs' : ''
      } ${className}`}
      title={name.trim() || undefined}
      aria-label={name.trim() || 'User'}
    >
      {showImage ? (
        <img
          src={trimmedSrc}
          alt=""
          role="presentation"
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full"
          onError={() => setImageError(true)}
        />
      ) : initials ? (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold tracking-wider leading-none">
          {initials}
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white/90">
          <UserIcon className="w-1/2 h-1/2" />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
