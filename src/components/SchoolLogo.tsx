import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { GraduationCap } from 'lucide-react';

interface SchoolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = false,
}) => {
  const { config } = useSchool();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32,
    xl: 44,
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {config.logoUrl ? (
        <img
          src={config.logoUrl}
          alt={config.name}
          className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} object-contain rounded-lg shadow-xs`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-md relative overflow-hidden shrink-0`}
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor || '#1e3a8a'}, #0f172a)`,
            border: `2px solid ${config.secondaryColor || '#f59e0b'}`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '8px 8px',
            }}
          />
          <GraduationCap
            size={iconSizes[size]}
            className="text-amber-400 drop-shadow-sm"
          />
        </div>
      )}

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif-heading font-bold leading-tight tracking-tight ${
              size === 'sm'
                ? 'text-sm'
                : size === 'md'
                ? 'text-base sm:text-lg'
                : size === 'lg'
                ? 'text-xl sm:text-2xl'
                : 'text-2xl sm:text-3xl'
            } ${lightText ? 'text-white' : 'text-slate-900'}`}
          >
            {config.name}
          </span>
          {config.motto && (
            <span
              className={`text-xs italic tracking-wide truncate max-w-[240px] sm:max-w-[320px] ${
                lightText ? 'text-amber-300/90' : 'text-amber-700 font-medium'
              }`}
            >
              {config.motto}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
