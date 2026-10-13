import React from 'react';

interface SparkLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
}

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
      className={`relative inline-flex items-center justify-center shrink-0 ${container} bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#06B6D4] text-white shadow-md shadow-cyan-900/15 ${
        withGlow ? 'ring-1 ring-white/20' : ''
      } ${className}`}
    >
      {/* Subtle dimensional inner bevel & highlight */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/20 via-transparent to-white/25 pointer-events-none" />

      {/* Lightning-Spark Vector Symbol */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${svg} relative z-10 drop-shadow-sm`}
      >
        <defs>
          <linearGradient id="sparkGradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#E0F2FE" />
            <stop offset="1" stopColor="#67E8F9" />
          </linearGradient>
          <filter id="sparkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic faceted lightning bolt */}
        <path
          d="M13.5 2.5L4.5 13H12L10.5 21.5L19.5 11H12L13.5 2.5Z"
          fill="url(#sparkGradient)"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#sparkGlow)"
        />

        {/* Radiance spark particles */}
        <circle cx="19.5" cy="4.5" r="1.2" fill="#A5F3FC" opacity="0.9" />
        <circle cx="4.5" cy="19.5" r="1" fill="#A5F3FC" opacity="0.8" />
        <circle cx="20.5" cy="16.5" r="0.8" fill="#FFFFFF" opacity="0.7" />
      </svg>
    </div>
  );
};

export const SparkWordmark: React.FC<{ size?: 'sm' | 'md' | 'lg'; subtitle?: boolean }> = ({
  size = 'md',
  subtitle = true
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 leading-none">
        <span
          className={`font-black tracking-tight text-[#0B192C] ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
        >
          Spark
        </span>
        <span
          className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] via-[#0891B2] to-[#06B6D4] ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
        >
          Decoded
        </span>
      </div>
      {subtitle && (
        <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-normal mt-0.5 hidden sm:block">
          Laboratory Intelligence & Doctor Preparation
        </span>
      )}
    </div>
  );
};
