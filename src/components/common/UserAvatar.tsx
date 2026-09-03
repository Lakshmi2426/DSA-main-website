import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-lg',
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

  // Clean and validate photo URL: ignore mock unsplash URLs or empty strings
  const validPhoto = src && !src.includes('unsplash.com') && !imageError;

  // Derive initials if a real name is available and not guest/anonymous
  const trimmedName = name.trim();
  const isAnonymous = !trimmedName || /^guest$|^anonymous$/i.test(trimmedName);

  let initials = '';
  if (!isAnonymous) {
    const parts = trimmedName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      initials = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden select-none ${sizeClass} ${
        showBorder ? 'border-2 border-blue-500/60 shadow-xs' : ''
      } ${className}`}
    >
      {validPhoto ? (
        <img
          src={src}
          alt={trimmedName || 'User'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full"
          onError={() => setImageError(true)}
        />
      ) : initials ? (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold font-mono tracking-wider">
          {initials}
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center text-white/90">
          <UserIcon className="w-1/2 h-1/2" />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
