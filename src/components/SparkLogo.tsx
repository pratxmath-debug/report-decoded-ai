import React from 'react';

interface SparkLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
}

/**
 * Spark Decoded Healthcare Emblem
 * A distinctive medical shield combined with a clinical cross and central clarity spark motif.
 * Uses refined deep forest teal, medical teal, and muted sage accents.
 */
export const SparkLogo: React.FC<SparkLogoProps> = ({
  size = 'md',
  className = '',
  withGlow = true
}) => {
  const sizeMap = {
    sm: { container: 'w-7 h-7 rounded-lg', svg: 'w-4 h-4' },
    md: { container: 'w-10 h-10 rounded-xl', svg: 'w-5 h-5' },
    lg: { container: 'w-14 h-14 rounded-2xl', svg: 'w-7 h-7' },
    xl: { container: 'w-20 h-20 rounded-3xl', svg: 'w-10 h-10' }
  };

  const { container, svg } = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${container} bg-gradient-to-br from-[#124E4A] via-[#1B5B56] to-[#287F78] text-white shadow-md shadow-teal-950/20 border border-[#A8C8BA]/35 ${
        withGlow ? 'ring-1 ring-[#E5F3ED]/40' : ''
      } ${className}`}
    >
      {/* Subtle dimensional inner bevel & highlight */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/25 via-transparent to-white/30 pointer-events-none" />

      {/* Medical Cross + Shield + Spark Vector Emblem */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${svg} relative z-10 drop-shadow-xs`}
      >
        <defs>
          <linearGradient id="crossGradient" x1="6" y1="5" x2="18" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#E5F3ED" />
            <stop offset="1" stopColor="#D4E5DE" />
          </linearGradient>
          <linearGradient id="sparkGradient" x1="10" y1="9" x2="14" y2="14" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#A8C8BA" />
          </linearGradient>
        </defs>

        {/* Outer subtle shield contour */}
        <path
          d="M12 2.5C7.8 2.5 4.5 4.4 4.5 8C4.5 13.8 8 18.2 12 20.5C16 18.2 19.5 13.8 19.5 8C19.5 4.4 16.2 2.5 12 2.5Z"
          stroke="#A8C8BA"
          strokeWidth="0.8"
          strokeDasharray="0.8 1.6"
          opacity="0.4"
        />

        {/* Clinical cross bars (rounded medical geometry) */}
        {/* Vertical cross stem */}
        <rect
          x="10.5"
          y="5.5"
          width="3"
          height="11"
          rx="1.5"
          fill="url(#crossGradient)"
          opacity="0.95"
        />
        {/* Horizontal cross bar */}
        <rect
          x="6.5"
          y="9.5"
          width="11"
          height="3"
          rx="1.5"
          fill="url(#crossGradient)"
          opacity="0.95"
        />

        {/* Central illuminated 4-point clarity spark motif */}
        <path
          d="M12 8.5L12.7 10.3L14.5 11L12.7 11.7L12 13.5L11.3 11.7L9.5 11L11.3 10.3Z"
          fill="#124E4A"
        />
        <circle cx="12" cy="11" r="0.8" fill="#FFFFFF" />

        {/* Precision clarity accent nodes */}
        <circle cx="5" cy="5" r="0.8" fill="#A8C8BA" opacity="0.75" />
        <circle cx="19" cy="5" r="0.8" fill="#A8C8BA" opacity="0.75" />
        <circle cx="12" cy="20" r="0.8" fill="#E5F3ED" opacity="0.6" />
      </svg>
    </div>
  );
};

export const SparkWordmark: React.FC<{ size?: 'sm' | 'md' | 'lg'; subtitle?: boolean }> = ({
  size = 'md',
  subtitle = false
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 leading-none">
        <span
          className={`font-black tracking-tight text-[#124E4A] ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
        >
          Spark
        </span>
        <span
          className={`font-black tracking-tight text-[#287F78] ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
        >
          Decoded
        </span>
      </div>
      {subtitle && (
        <span className="text-[10px] sm:text-[11px] font-medium text-[#667773] tracking-normal mt-0.5 hidden sm:block">
          Clinical Laboratory Intelligence
        </span>
      )}
    </div>
  );
};
