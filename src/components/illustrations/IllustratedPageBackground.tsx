import React from 'react';

interface Props {
  variant?: 'light' | 'subtle' | 'cinematic';
  className?: string;
  children?: React.ReactNode;
}

export const IllustratedPageBackground: React.FC<Props> = ({
  variant = 'light',
  className = '',
  children
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 1: Base Medical Mesh & Organic Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Top-Right Soft Blue Flowing Organic Blob */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#CDEBFA]/50 to-[#EAF7FF]/60 blur-3xl" />

        {/* Top-Left Delicate Teal Glow */}
        <div className="absolute top-20 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-teal-500/10 to-cyan-400/10 blur-3xl" />

        {/* Mid-Page Organic Shape */}
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#CDEBFA]/40 via-[#EAF7FF]/50 to-transparent blur-3xl" />

        {/* Bottom-Left Soft Glow */}
        <div className="absolute -bottom-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#CDEBFA]/50 to-teal-100/30 blur-3xl" />
      </div>

      {/* Layer 2: Subtle Illustrated Healthcare Motif Accents (Edges & Corners) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-40 select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medGridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#BAE6FD" strokeWidth="0.5" opacity="0.35" />
              <circle cx="60" cy="60" r="1" fill="#0D9488" opacity="0.3" />
            </pattern>
          </defs>

          {/* Faint Medical Grid */}
          <rect width="100%" height="100%" fill="url(#medGridPattern)" />

          {/* Top-Left Floating First-Aid Icon */}
          <g transform="translate(40, 60)" opacity="0.6">
            <rect x="0" y="4" width="28" height="22" rx="5" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
            <path d="M9,4 C9,1 19,1 19,4" fill="none" stroke="#087F83" strokeWidth="1.5" />
            <rect x="12" y="10" width="4" height="10" fill="#0D9488" rx="0.5" />
            <rect x="9" y="13" width="10" height="4" fill="#0D9488" rx="0.5" />
          </g>

          {/* Top-Right Floating Capsule Motif */}
          <g transform="translate(1120, 80) rotate(25)" opacity="0.7">
            <rect x="0" y="0" width="32" height="12" rx="6" fill="#06B6D4" stroke="#0284C7" strokeWidth="1" />
            <rect x="16" y="0" width="16" height="12" rx="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          </g>

          {/* Mid-Left Test Tube Motif */}
          <g transform="translate(25, 600) rotate(-15)" opacity="0.5">
            <rect x="0" y="0" width="10" height="42" rx="5" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.2" />
            <path d="M1,20 Q5,22 9,20 L9,37 A4,4 0 0,1 1,37 Z" fill="#06B6D4" opacity="0.7" />
          </g>

          {/* Mid-Right Stethoscope Wire Loop Accent */}
          <g transform="translate(1140, 750)" opacity="0.4">
            <path d="M0,0 C30,40 50,80 20,110 C-10,140 10,180 40,190" fill="none" stroke="#087F83" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="40" cy="190" r="8" fill="#06B6D4" stroke="#087F83" strokeWidth="1" />
          </g>

          {/* Bottom-Right Cross Badge */}
          <g transform="translate(1080, 1400)" opacity="0.5">
            <circle cx="16" cy="16" r="18" fill="#EAF7FF" stroke="#0D9488" strokeWidth="1.5" />
            <rect x="14" y="8" width="4" height="16" rx="1" fill="#0D9488" />
            <rect x="8" y="14" width="16" height="4" rx="1" fill="#0D9488" />
          </g>
        </svg>
      </div>

      {children}
    </div>
  );
};
